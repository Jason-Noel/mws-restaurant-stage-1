const staticCacheName = 'restaurant-review-v2';

//Install cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                '/',
                'css/styles.css',
                'data/restaurants.json',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'img/1-small.jpg',
                'img/2-small.jpg',
                'img/3-small.jpg',
                'img/4-small.jpg',
                'img/5-small.jpg',
                'img/6-small.jpg',
                'img/7-small.jpg',
                'img/8-small.jpg',
                'img/9-small.jpg',
                'img/10-small.jpg',
                'img/1-large.jpg',
                'img/2-large.jpg',
                'img/3-large.jpg',
                'img/4-large.jpg',
                'img/5-large.jpg',
                'img/6-large.jpg',
                'img/7-large.jpg',
                'img/8-large.jpg',
                'img/9-large.jpg',
                'img/10-large.jpg'
            ]);
        })
    );
});

//Remove caches related to old sw
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-review-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//Fetch logic referenced from https://stackoverflow.com/questions/47160929/progressive-web-app-uncaught-in-promise-typeerror-failed-to-fetch?rq=1
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(staticCacheName)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // log the error
                console.log('An error occurred fetching the site online: ', err);
              });
          }
        })
    );
  });