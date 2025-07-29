// This file handles the functionality related to displaying and managing the gallery of art, videos, and poetry, including loading assets and user interactions.

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');

    // Function to load gallery items
    function loadGalleryItems() {
        // Placeholder for loading logic
        const items = [
            { type: 'art', src: 'path/to/art1.jpg', title: 'Art Piece 1' },
            { type: 'video', src: 'path/to/video1.mp4', title: 'Video 1' },
            { type: 'poetry', content: 'This is a poem.', title: 'Poem 1' }
        ];

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('gallery-item');

            if (item.type === 'art') {
                itemElement.innerHTML = `<img src="${item.src}" alt="${item.title}"><h3>${item.title}</h3>`;
            } else if (item.type === 'video') {
                itemElement.innerHTML = `<video controls><source src="${item.src}" type="video/mp4"></video><h3>${item.title}</h3>`;
            } else if (item.type === 'poetry') {
                itemElement.innerHTML = `<p>${item.content}</p><h3>${item.title}</h3>`;
            }

            galleryContainer.appendChild(itemElement);
        });
    }

    loadGalleryItems();
});