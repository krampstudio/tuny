const name = 'tuny';
const version = '0.1.1';
const cacheName = `${name}-${version}`;

const runtime = [
    './index.html',
    './img/logo-small.png'
];
self.addEventListener('install', event => {
    console.log('The service worker is being installed.');

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('CACHE FILL', runtime);
            return cache.addAll(runtime);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(function(matching) {
                if (matching) {

                    console.log('CACHE HIT', event.request.url);
                    return matching;
                }

                console.log('CACHE MISS', event.request.url);

                //clone the reuest
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(response => {

                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // clone the response too
                    console.log('CACHE ADD', event.request.url);
                    cache.put(event.request, response.clone());

                    return response;
                });
            });
        })
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => {
                    const tokens = name.split('-');
                    return tokens.length !== 2 || tokens[1] !== version;
                })
                .map(name => {
                    console.log('CACHE REMOVE', name);
                    return caches.delete(name);
                })
            );
        })
    );
});
