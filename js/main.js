document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set the theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update button icon (moon vs sun)
        if (theme === 'dark') {
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'; // Sun icon
        } else {
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'; // Moon icon
        }
    };

    // Check for saved theme preference or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        // Default to light as requested
        setTheme('light');
    }

    // Listen for toggle click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Dynamic Projects Loading
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        fetch('data/projects.json')
            .then(response => response.json())
            .then(data => {
                const projects = data.projects || [];
                projectsContainer.innerHTML = ''; // clear loading state
                
                projects.forEach(project => {
                    // Create tags HTML
                    let tagsHtml = '';
                    if (project.tags) {
                        const tagsList = project.tags.split(',').map(t => t.trim());
                        tagsHtml = `
                            <div class="tag-container" style="position: absolute; bottom: 2.5rem;">
                                ${tagsList.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        `;
                    }
                    
                    // Create media/presentation HTML
                    let mediaHtml = '';
                    if (project.presentation || project.thumbnail) {
                        mediaHtml = `
                            <div class="presentation-thumbnail-wrapper" style="width: 100%; margin: 2rem 0; border: 1px solid var(--ink); box-shadow: 4px 4px 0 0 var(--ink); overflow: hidden; position: relative; cursor: pointer;">
                                <img src="${project.thumbnail || ''}" 
                                     alt="Presentation Thumbnail" 
                                     class="presentation-thumbnail" 
                                     data-presentation-url="${project.presentation || ''}"
                                     style="width: 100%; aspect-ratio: 16/9; background-color: var(--line); object-fit: cover; display: block;">
                            </div>
                        `;
                    }

                    // Build Card HTML
                    const cardHtml = `
                        <div class="editorial-card">
                            <span class="kicker" style="margin-bottom: 1rem; color: var(--accent);">${project.category || ''}</span>
                            <h3>${project.title || ''}</h3>
                            <p>${project.description || ''}</p>
                            ${mediaHtml}
                            ${tagsHtml}
                        </div>
                    `;
                    
                    projectsContainer.innerHTML += cardHtml;
                });
                
                // Re-bind the lightbox logic to the newly injected thumbnails
                bindLightbox();
            })
            .catch(error => console.error('Error loading projects:', error));
    }

    // Carousel Logic
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const prevBtn = wrapper.querySelector('.prev-btn');
        const nextBtn = wrapper.querySelector('.next-btn');
        
        if(prevBtn && nextBtn && track) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -320, behavior: 'smooth' });
            });
            
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    });

    // Global Lightbox (Modal) Logic
    const mediaModal = document.getElementById('media-modal');
    if (mediaModal) {
        // Find the inject zone, fallback to modal-content-container if not found
        const injectZone = mediaModal.querySelector('#modal-inject-zone') || mediaModal.querySelector('.modal-content-container');
        const closeBtn = mediaModal.querySelector('.modal-close-btn');
        
        // Function to close modal and clear content
        const closeModal = () => {
            mediaModal.classList.remove('active');
            injectZone.innerHTML = ''; // Clear everything to stop videos
        };

        closeBtn.addEventListener('click', closeModal);
        mediaModal.addEventListener('click', (e) => {
            if (e.target === mediaModal || e.target === mediaModal.querySelector('.modal-content-container')) {
                closeModal();
            }
        });

        // Abstracted into a function so it can be called after dynamic content loads
        window.bindLightbox = function() {
            // 1. Click listeners for standard media (Global Lightbox for ALL photos and videos except profile photo)
            const clickableMedia = document.querySelectorAll('img:not(.portrait-img), video');
            
            // Remove old listeners to prevent duplicates if called multiple times
            clickableMedia.forEach(media => {
                const clone = media.cloneNode(true);
                if(media.parentNode) media.parentNode.replaceChild(clone, media);
            });

            const freshClickableMedia = document.querySelectorAll('img:not(.portrait-img), video');
            freshClickableMedia.forEach(media => {
                media.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const isVideo = media.tagName.toLowerCase() === 'video';
                    const presentationUrl = media.getAttribute('data-presentation-url');
                    let modalMediaElement;

                    if (presentationUrl) {
                        modalMediaElement = document.createElement('iframe');
                        modalMediaElement.src = presentationUrl;
                        modalMediaElement.className = 'modal-media-rich'; // use the rich class for iframe sizing
                        modalMediaElement.style.border = 'none';
                        modalMediaElement.style.backgroundColor = 'var(--bg-paper)';
                        modalMediaElement.title = "Presentation Viewer";
                    } else if (isVideo) {
                        modalMediaElement = document.createElement('video');
                        modalMediaElement.src = media.src;
                        modalMediaElement.className = 'modal-media';
                        modalMediaElement.autoplay = true;
                        modalMediaElement.loop = true;
                        modalMediaElement.playsInline = true;
                        modalMediaElement.controls = true; 
                        
                        const isReel = media.closest('#reels-track') !== null;
                        if (isReel) {
                            modalMediaElement.muted = false;
                        } else {
                            modalMediaElement.muted = true;
                        }
                    } else {
                        modalMediaElement = document.createElement('img');
                        modalMediaElement.src = media.src;
                        modalMediaElement.alt = media.alt || '';
                        modalMediaElement.className = 'modal-media';
                    }

                    injectZone.innerHTML = '';
                    injectZone.appendChild(modalMediaElement);
                    mediaModal.classList.add('active');
                });
            });

            // 2. Click listeners for Home Page Highlights (Rich Modals)
            const highlightCards = document.querySelectorAll('.highlight-card');
            highlightCards.forEach(card => {
                card.addEventListener('click', () => {
                    const highlightId = card.getAttribute('data-highlight');
                    const template = document.getElementById(`${highlightId}-content`);
                    
                    if (template) {
                        injectZone.innerHTML = '';
                        const clone = template.cloneNode(true);
                        
                        // Ensure videos in clone play and have controls
                        const vids = clone.querySelectorAll('video');
                        vids.forEach(v => {
                            v.autoplay = true;
                            v.controls = true;
                        });
                        
                        injectZone.appendChild(clone);
                        mediaModal.classList.add('active');
                    }
                });
            });
        };
        
        // Initial bind
        bindLightbox();
    }

    // Draggable Marquee Logic
    const marquee = document.querySelector('.marquee-container');
    if (marquee) {
        marquee.style.overflowX = 'auto';
        marquee.style.scrollbarWidth = 'none'; // Firefox
        marquee.style.cursor = 'grab';
        
        const content = marquee.querySelector('.marquee-content');
        if (content) {
            // Disable CSS animation so JS can control scroll
            content.style.animation = 'none';
            // Clone items to ensure enough scrollable space
            for(let i=0; i<4; i++) {
                content.appendChild(content.children[0].cloneNode(true));
            }
        }

        let isDown = false;
        let startX;
        let scrollLeft;

        marquee.addEventListener('mousedown', (e) => {
            isDown = true;
            marquee.style.cursor = 'grabbing';
            startX = e.pageX - marquee.offsetLeft;
            scrollLeft = marquee.scrollLeft;
        });
        
        marquee.addEventListener('mouseleave', () => {
            isDown = false;
            marquee.style.cursor = 'grab';
        });
        
        marquee.addEventListener('mouseup', () => {
            isDown = false;
            marquee.style.cursor = 'grab';
        });
        
        marquee.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - marquee.offsetLeft;
            const walk = (x - startX) * 2; // scroll speed multiplier
            marquee.scrollLeft = scrollLeft - walk;
        });
        
        // Auto-scroll loop
        setInterval(() => {
            if(!isDown) marquee.scrollLeft += 1;
        }, 20);
    }
});
