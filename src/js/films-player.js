// Films Video Player - Completely Rebuilt
class FilmsPlayer {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.videoContainer = document.getElementById('videoContainer');
        this.closeBtn = document.querySelector('.video-modal-close');
        this.currentPlayer = null;
        
        this.init();
    }
    
    init() {
        // Add click listeners to all film cards
        const filmCards = document.querySelectorAll('.film-card');
        filmCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const videoId = card.getAttribute('data-video-id');
                if (videoId) {
                    this.openVideo(videoId);
                }
            });
        });
        
        // Close modal listeners
        this.closeBtn.addEventListener('click', () => this.closeVideo());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeVideo();
            }
        });
        
        // Keyboard listener for escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideo();
            }
        });
        
        console.log('Films Player initialized successfully');
    }
    
    openVideo(videoId) {
        if (!videoId) {
            console.error('No video ID provided');
            return;
        }
        
        console.log('Opening video:', videoId);
        
        // Create YouTube iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        // Clear container and add iframe
        this.videoContainer.innerHTML = '';
        this.videoContainer.appendChild(iframe);
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Video modal opened for:', videoId);
    }
    
    closeVideo() {
        console.log('Closing video modal');
        
        // Hide modal
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear video container after transition
        setTimeout(() => {
            this.videoContainer.innerHTML = '';
        }, 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FilmsPlayer();
    console.log('Films page loaded and ready');
});

// Export for debugging
window.FilmsPlayer = FilmsPlayer;
