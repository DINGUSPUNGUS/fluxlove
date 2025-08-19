/**
 * Professional Film Showcase with Working Video Functionality
 */

class FilmShowcase {
    constructor() {
        this.currentFilter = 'all';
        this.videoData = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.initializeVideoData();
        this.setupCategoryFilters();
        this.setupVideoPlayers();
        this.loadAllVideos();
        
        this.isInitialized = true;
    }

    initializeVideoData() {
        // Video data mapping using the actual assets from src/assets/Films
        this.videoData = {
            documentary: [
                {
                    url: 'https://youtu.be/REJqvWDosLc',
                    title: 'The Art of Becoming',
                    description: 'Japan: Introduction - A personal documentary exploring the transformation from student to professional artist',
                    duration: '15:32',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/ko5IeRL1ku8',
                    title: 'Growing Local', 
                    description: 'Koyasan - Documentary series following urban farmers creating sustainable communities',
                    duration: '22:18',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/Qv77Jtzh83M',
                    title: 'Koyasan Snowy Morning',
                    description: 'A serene winter morning at the sacred mountain monastery',
                    duration: '8:45',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/XsXQPQPtHUs',
                    title: 'Wakayama Castle',
                    description: 'Historic castle and architectural marvel exploration',
                    duration: '12:30',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/2h0qJOv9MvE',
                    title: 'Fushimi Inari Taisha',
                    description: 'Thousand torii gates shrine experience',
                    duration: '15:20',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/CeLAaLn2MEY',
                    title: 'Bullet Train',
                    description: 'High-speed rail journey through Japan',
                    duration: '6:15',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/5CNyMCCsL4A',
                    title: 'Singapore Artscience Museum',
                    description: 'Modern architecture and cultural exploration',
                    duration: '10:45',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/cXHVQ77rAXs',
                    title: 'Bishan Park Singapore',
                    description: 'Urban nature and park landscapes',
                    duration: '7:30',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/kayjRiO_dNo',
                    title: 'West Java Indonesia',
                    description: 'Cultural exploration of West Java landscapes',
                    duration: '14:20',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/A2xZQwJoyAQ',
                    title: 'Gunung Padang',
                    description: 'Ancient archaeological site exploration',
                    duration: '11:45',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/Oy4sr1zuKCw',
                    title: 'Bali',
                    description: 'Island paradise and cultural immersion',
                    duration: '18:30',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/Hc2qVy5iUts',
                    title: 'Mok Fa Waterfall Thailand',
                    description: 'Natural beauty and waterfall exploration',
                    duration: '9:15',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/mZxkkjcjU54',
                    title: 'Haartebeespoort Part 1',
                    description: 'South African landscapes and culture exploration',
                    duration: '13:20',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/Hu-iJUzUzIw',
                    title: 'Haartebeespoort Part 2',
                    description: 'Continued journey through South African beauty',
                    duration: '16:45',
                    year: '2023'
                }
            ],
            narrative: [
                {
                    url: 'https://youtu.be/1ufRKmfpHrQ',
                    title: 'Stuffing',
                    description: 'A narrative exploration of comfort, tradition, and family dynamics',
                    duration: '8:15',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/3vqPtvDG-bU',
                    title: 'Shame',
                    description: 'An intimate portrait examining vulnerability and human emotion',
                    duration: '12:45',
                    year: '2024'
                },
                {
                    url: 'https://youtu.be/2oIAy_Cpy2U',
                    title: "You're So Nice",
                    description: 'A character study exploring kindness and social interaction',
                    duration: '7:30',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/tMzbOvr8FU8',
                    title: 'Powerless',
                    description: 'A dramatic piece examining themes of agency and control',
                    duration: '9:20',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/hRbZKgEQcMs',
                    title: 'GAIA',
                    description: 'An environmental narrative connecting humanity with nature',
                    duration: '11:15',
                    year: '2024'
                }
            ],
            animation: [
                {
                    url: 'https://www.youtube.com/watch?v=V9FW4nOweGM',
                    title: 'Spaghetti Dance',
                    description: 'Creative animation exploring movement and rhythm through playful character motion',
                    duration: '3:15',
                    year: '2024'
                }
            ],
            experimental: [
                {
                    url: 'https://youtu.be/tMzbOvr8FU8',
                    title: 'Powerless',
                    description: 'A dramatic experimental piece examining themes of agency and control',
                    duration: '9:20',
                    year: '2023'
                },
                {
                    url: 'https://youtu.be/hRbZKgEQcMs',
                    title: 'GAIA',
                    description: 'An experimental environmental narrative connecting humanity with nature',
                    duration: '11:15',
                    year: '2024'
                }
            ]
        };
    }

    setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('.showcase-filter');
        const filmCards = document.querySelectorAll('.film-card');
        
        if (!filterButtons.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.dataset.filter;
                this.currentFilter = filter;
                
                // Filter film cards
                this.filterFilmCards(filter, filmCards);
            });
        });
    }

    filterFilmCards(filter, filmCards) {
        filmCards.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(20px)';
                
                // Staggered animation
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, index * 100);
                
            } else {
                card.style.transition = 'all 0.3s ease-out';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    setupVideoPlayers() {
        const filmCards = document.querySelectorAll('.film-card');
        
        filmCards.forEach(card => {
            const playButton = card.querySelector('.play-button');
            const category = card.dataset.category;
            
            if (playButton) {
                playButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.playVideo(card, category);
                });
            }
            
            // Make entire card clickable for video
            card.addEventListener('click', () => {
                this.playVideo(card, category);
            });
        });
    }

    playVideo(card, category) {
        const title = card.querySelector('h3').textContent.trim();
        const videos = this.videoData[category];
        
        if (!videos) {
            console.warn(`No videos found for category: ${category}`);
            return;
        }
        
        // Find matching video with more flexible matching
        let video = videos.find(v => 
            v.title.toLowerCase() === title.toLowerCase() ||
            v.title.toLowerCase().includes(title.toLowerCase()) ||
            title.toLowerCase().includes(v.title.toLowerCase()) ||
            this.fuzzyMatch(v.title, title)
        );
        
        // If no exact match, use the first video in the category as fallback
        if (!video && videos.length > 0) {
            video = videos[0];
            console.log(`Using fallback video for "${title}" in category "${category}": ${video.title}`);
        }
        
        if (video) {
            this.openVideoModal(video);
        } else {
            console.error(`No video found for "${title}" in category "${category}"`);
        }
    }
    
    fuzzyMatch(str1, str2) {
        // Simple fuzzy matching - check if key words match
        const words1 = str1.toLowerCase().split(/\s+/);
        const words2 = str2.toLowerCase().split(/\s+/);
        
        let matches = 0;
        words1.forEach(word1 => {
            if (words2.some(word2 => word1.includes(word2) || word2.includes(word1))) {
                matches++;
            }
        });
        
        return matches >= Math.min(words1.length, words2.length) * 0.5;
    }

    openVideoModal(video) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3>${video.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="video-container">
                    <iframe 
                        src="${this.getEmbedUrl(video.url)}" 
                        frameborder="0" 
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                </div>
                <div class="video-info">
                    <p>${video.description}</p>
                    <div class="video-meta">
                        <span>Duration: ${video.duration}</span>
                        <span>Year: ${video.year}</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeVideoModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeVideoModal(modal);
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideoModal(modal);
            }
        });
        
        // Animate in
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    closeVideoModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    getEmbedUrl(url) {
        // Convert YouTube URLs to embed format
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        return url;
    }

    loadAllVideos() {
        // Update film cards with actual video data
        const filmCards = document.querySelectorAll('.film-card');
        
        filmCards.forEach(card => {
            const category = card.dataset.category;
            const videos = this.videoData[category];
            
            if (videos && videos.length > 0) {
                // Update card with first video from category
                const video = videos[0];
                const titleElement = card.querySelector('h3');
                const descElement = card.querySelector('.film-info p');
                const durationElement = card.querySelector('.film-duration');
                
                if (titleElement && video.title !== titleElement.textContent) {
                    // Only update if different to preserve custom descriptions
                    const yearSpan = card.querySelector('.year');
                    if (yearSpan) {
                        yearSpan.textContent = video.year;
                    }
                    
                    if (durationElement) {
                        durationElement.textContent = video.duration;
                    }
                }
            }
        });
    }
}

// Video Modal CSS
const videoModalCSS = `
.video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
}

.video-modal-content {
    background: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    max-width: 90vw;
    max-height: 90vh;
    width: 800px;
}

.video-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.video-modal-header h3 {
    margin: 0;
    color: var(--text-primary);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
    padding: 0.5rem;
    line-height: 1;
}

.modal-close:hover {
    color: var(--text-primary);
}

.video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.video-info {
    padding: 1.5rem;
}

.video-info p {
    margin: 0 0 1rem 0;
    color: var(--text-muted);
    line-height: 1.6;
}

.video-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: var(--text-muted);
}

.video-meta span {
    padding: 0.3rem 0.8rem;
    background: var(--section-bg);
    border-radius: 12px;
}

@media (max-width: 768px) {
    .video-modal-content {
        width: 95vw;
        margin: 1rem;
    }
    
    .video-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
}
`;

// Add modal CSS to document
const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = videoModalCSS;
document.head.appendChild(modalStyleSheet);

// Initialize film showcase when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const filmShowcase = new FilmShowcase();
});

// Export for potential external use
window.FilmShowcase = FilmShowcase;
