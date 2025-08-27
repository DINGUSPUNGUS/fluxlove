/**
 * ✨ FLUXLOVE - Service Worker for PWA Support ✨
 * Google-level caching and performance optimization
 */

const CACHE_NAME = 'fluxlove-v2.0.0';
const STATIC_CACHE = 'fluxlove-static-v2.0.0';
const DYNAMIC_CACHE = 'fluxlove-dynamic-v2.0.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/src/css/performance.css',
    '/src/css/hero.css',
    '/src/css/portfolio.css',
    '/src/css/animations-optimized.css',
    '/src/js/core.js',
    '/manifest.json'
];

// Resources to cache on demand
const CACHEABLE_ORIGINS = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
];

// Cache strategies
const CACHE_STRATEGIES = {
    // Critical resources: Cache first, fallback to network
    critical: 'cache-first',
    // Static assets: Stale while revalidate
    static: 'stale-while-revalidate',
    // Dynamic content: Network first, fallback to cache
    dynamic: 'network-first',
    // Images: Cache first with fallback
    images: 'cache-first'
};

/**
 * Install event - Cache critical resources
 */
self.addEventListener('install', event => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Caching critical resources...');
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                console.log('✅ Critical resources cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Failed to cache critical resources:', error);
            })
    );
});

/**
 * Activate event - Clean up old caches
 */
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Delete old caches
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activated');
                return self.clients.claim();
            })
    );
});

/**
 * Fetch event - Implement caching strategies
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(handleRequest(request));
});

/**
 * Handle different types of requests with appropriate strategies
 */
async function handleRequest(request) {
    const url = new URL(request.url);
    
    try {
        // Critical resources (HTML, CSS, JS)
        if (isCriticalResource(request)) {
            return await cacheFirst(request, STATIC_CACHE);
        }
        
        // Images
        if (isImageRequest(request)) {
            return await cacheFirst(request, DYNAMIC_CACHE);
        }
        
        // Fonts
        if (isFontRequest(request)) {
            return await staleWhileRevalidate(request, STATIC_CACHE);
        }
        
        // External resources (like Google Fonts)
        if (isExternalResource(request)) {
            return await staleWhileRevalidate(request, STATIC_CACHE);
        }
        
        // Dynamic content
        return await networkFirst(request, DYNAMIC_CACHE);
        
    } catch (error) {
        console.error('❌ Request failed:', request.url, error);
        
        // Return offline fallback for navigation requests
        if (request.mode === 'navigate') {
            return await getOfflineFallback();
        }
        
        // Return cached version or throw error
        const cached = await caches.match(request);
        return cached || new Response('Offline', { status: 503 });
    }
}

/**
 * Cache First Strategy
 */
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    const response = await fetch(request);
    
    if (response.status === 200) {
        cache.put(request, response.clone());
    }
    
    return response;
}

/**
 * Network First Strategy
 */
async function networkFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    
    try {
        const response = await fetch(request);
        
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        return cached || Promise.reject(error);
    }
}

/**
 * Stale While Revalidate Strategy
 */
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    // Fetch in background to update cache
    const fetchPromise = fetch(request).then(response => {
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => {
        // Silently fail background update
    });
    
    // Return cached version immediately, or wait for fetch
    return cached || fetchPromise;
}

/**
 * Resource type detection
 */
function isCriticalResource(request) {
    const url = new URL(request.url);
    return CRITICAL_RESOURCES.some(resource => 
        url.pathname === resource || url.pathname.endsWith(resource)
    );
}

function isImageRequest(request) {
    return request.destination === 'image' ||
           /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(request.url);
}

function isFontRequest(request) {
    return request.destination === 'font' ||
           /\.(woff|woff2|ttf|eot)$/i.test(request.url);
}

function isExternalResource(request) {
    const url = new URL(request.url);
    return CACHEABLE_ORIGINS.some(origin => url.origin === origin);
}

/**
 * Offline fallback
 */
async function getOfflineFallback() {
    const cache = await caches.open(STATIC_CACHE);
    return await cache.match('/index.html') || 
           new Response('You are offline', { 
               status: 503,
               headers: { 'Content-Type': 'text/plain' }
           });
}

/**
 * Background sync for offline actions
 */
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Implement background sync logic here
    // For example: send queued analytics, sync user data, etc.
    console.log('📊 Performing background sync...');
}

/**
 * Push notifications
 */
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const options = {
        body: event.data.text(),
        icon: '/src/assets/images/icon-192.png',
        badge: '/src/assets/images/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore Portfolio',
                icon: '/src/assets/images/explore-icon.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/src/assets/images/close-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('fluxlove Portfolio', options)
    );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

/**
 * Cache size management
 */
async function limitCacheSize(cacheName, maxEntries) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxEntries) {
        const entriesToDelete = keys.slice(0, keys.length - maxEntries);
        await Promise.all(
            entriesToDelete.map(key => cache.delete(key))
        );
    }
}

// Periodic cache cleanup
self.addEventListener('message', event => {
    if (event.data.action === 'CLEAN_CACHE') {
        event.waitUntil(
            Promise.all([
                limitCacheSize(DYNAMIC_CACHE, 50),
                limitCacheSize(STATIC_CACHE, 30)
            ])
        );
    }
});

console.log('✨ fluxlove Service Worker loaded successfully');
