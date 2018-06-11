if('service-worker' in navigator) {
    navigator.serviceWorker
            .register('/sw.js')
            .then(function() { console.log('Service Worker Registered'); });
}

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('restaurant_review').then(function(cache) {
            return cache.addAll([
                '/'
                //TODO - add other files
            ])
        })
    );
});