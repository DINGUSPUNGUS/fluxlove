// Video Player JavaScript
class VideoPlayer {
  constructor() {
    this.modal = null;
    this.currentVideo = null;
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'video-modal';
    this.modal.innerHTML = `
      <div class="video-modal-content">
        <button class="video-modal-close">&times;</button>
        <div class="video-embed" id="modal-video-container"></div>
      </div>
    `;
    document.body.appendChild(this.modal);
  }

  bindEvents() {
    // Close modal events
    this.modal.querySelector('.video-modal-close').addEventListener('click', () => {
      this.closeModal();
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  // Extract video ID from various URL formats
  extractVideoId(url, platform) {
    switch (platform) {
      case 'youtube':
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch = url.match(youtubeRegex);
        return youtubeMatch ? youtubeMatch[1] : null;

      case 'vimeo':
        const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
        const vimeoMatch = url.match(vimeoRegex);
        return vimeoMatch ? vimeoMatch[1] : null;

      case 'dailymotion':
        const dailymotionRegex = /(?:dailymotion\.com\/video\/)([^_]+)/;
        const dailymotionMatch = url.match(dailymotionRegex);
        return dailymotionMatch ? dailymotionMatch[1] : null;

      default:
        return null;
    }
  }

  // Detect platform from URL
  detectPlatform(url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    } else if (url.includes('dailymotion.com')) {
      return 'dailymotion';
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return 'direct';
    }
    return 'unknown';
  }

  // Create embed HTML for different platforms
  createEmbed(url, options = {}) {
    const platform = this.detectPlatform(url);
    const videoId = this.extractVideoId(url, platform);

    if (!videoId && platform !== 'direct') {
      console.error('Could not extract video ID from URL:', url);
      return '<p>Invalid video URL</p>';
    }

    const { width = '100%', height = '100%', autoplay = false } = options;

    switch (platform) {
      case 'youtube':
        const youtubeParams = new URLSearchParams({
          rel: '0',
          modestbranding: '1',
          autoplay: autoplay ? '1' : '0'
        });
        return `<iframe src="https://www.youtube.com/embed/${videoId}?${youtubeParams}" 
                         width="${width}" height="${height}" 
                         frameborder="0" allowfullscreen></iframe>`;

      case 'vimeo':
        const vimeoParams = new URLSearchParams({
          autoplay: autoplay ? '1' : '0',
          title: '0',
          byline: '0',
          portrait: '0'
        });
        return `<iframe src="https://player.vimeo.com/video/${videoId}?${vimeoParams}" 
                         width="${width}" height="${height}" 
                         frameborder="0" allowfullscreen></iframe>`;

      case 'dailymotion':
        const dailymotionParams = new URLSearchParams({
          autoplay: autoplay ? '1' : '0'
        });
        return `<iframe src="https://www.dailymotion.com/embed/video/${videoId}?${dailymotionParams}" 
                         width="${width}" height="${height}" 
                         frameborder="0" allowfullscreen></iframe>`;

      case 'direct':
        return `<video width="${width}" height="${height}" controls ${autoplay ? 'autoplay' : ''}>
                  <source src="${url}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>`;

      default:
        return '<p>Unsupported video platform</p>';
    }
  }

  // Embed video in a container
  embedVideo(containerId, url, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    const embedHTML = this.createEmbed(url, options);
    container.innerHTML = embedHTML;
  }

  // Play video in modal
  playInModal(url, title = '') {
    const modalContainer = this.modal.querySelector('#modal-video-container');
    const embedHTML = this.createEmbed(url, { autoplay: true });
    
    modalContainer.innerHTML = embedHTML;
    this.modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  closeModal() {
    this.modal.classList.remove('active');
    
    // Clear video content to stop playback
    const modalContainer = this.modal.querySelector('#modal-video-container');
    modalContainer.innerHTML = '';
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Create video thumbnail with play button
  createVideoThumbnail(url, thumbnailUrl, title, description, options = {}) {
    const { width = '300px', onClick = null } = options;
    
    const thumbnailHTML = `
      <div class="video-thumbnail" style="width: ${width}">
        <img src="${thumbnailUrl}" alt="${title}" />
        <div class="video-play-overlay"></div>
        <div class="video-info">
          <h3 class="video-title">${title}</h3>
          <p class="video-description">${description}</p>
        </div>
      </div>
    `;

    const thumbnailElement = document.createElement('div');
    thumbnailElement.innerHTML = thumbnailHTML;
    
    const thumbnail = thumbnailElement.firstElementChild;
    thumbnail.addEventListener('click', () => {
      if (onClick) {
        onClick(url, title);
      } else {
        this.playInModal(url, title);
      }
    });

    return thumbnail;
  }

  // Create video grid from array of video objects
  createVideoGrid(containerId, videos) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    container.className = 'video-grid';
    container.innerHTML = '';

    videos.forEach(video => {
      const thumbnail = this.createVideoThumbnail(
        video.url,
        video.thumbnail,
        video.title,
        video.description
      );
      container.appendChild(thumbnail);
    });
  }

  // Get YouTube thumbnail URL
  getYouTubeThumbnail(url, quality = 'maxresdefault') {
    const videoId = this.extractVideoId(url, 'youtube');
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    }
    return null;
  }

  // Get Vimeo thumbnail URL (requires API call)
  async getVimeoThumbnail(url) {
    const videoId = this.extractVideoId(url, 'vimeo');
    if (videoId) {
      try {
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        const data = await response.json();
        return data[0].thumbnail_large;
      } catch (error) {
        console.error('Error fetching Vimeo thumbnail:', error);
        return null;
      }
    }
    return null;
  }
}

// Initialize video player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.videoPlayer = new VideoPlayer();
});

// Utility function to embed a single video
function embedVideo(containerId, url, options = {}) {
  if (window.videoPlayer) {
    window.videoPlayer.embedVideo(containerId, url, options);
  }
}

// Utility function to create video grid
function createVideoGrid(containerId, videos) {
  if (window.videoPlayer) {
    window.videoPlayer.createVideoGrid(containerId, videos);
  }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VideoPlayer;
}
