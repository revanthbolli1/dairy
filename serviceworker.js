const staticdevmilkzone = "milkzone-v1"
CACHE_NAME = "milkzon-v1"
self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then(cache => cache.addAll([
    '/',
    '/templates/login.html',
    '/templates/changepassword.html',
    '/templates/home.html',
    '/static/styles/login.css',
    '/static/styles/home.css',
    '/static/styles/nav.css',
    '/static/scripts/login.js',
    '/static/scripts/changepassword.js',
    '/static/images/icon.png',
    '/static/images/background2.jpg',
    '/static/images/changepassword.jpg',
    '/static/images/records.png',
    '/static/images/view.jpg',
    '/static/images/logout.png',
    '/static/images/add.jpeg',              
]))
);
});

self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request)
          .then(response => response || fetch(event.request))
  );
});
