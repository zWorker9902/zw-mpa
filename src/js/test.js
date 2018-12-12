
// Service Worker 会监听 install 事件，我们在其对应的回掉里可以实现初始化的逻辑
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('text-v1').then(cache => {
      return cache.addAll([
        // 需要缓存的文件名,
        '/index.js',
        '../pages/index.html',
      ]);
    })
  );
});

// Service Worker 会监听所有的网络请求，
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(ebent.request).then(res => {
      if (res) {
        return res;
      }

      return fetch(event.request).then(response => {
        if (!response || reponse.status !== 200) {
          return response;
        }

        caches.open('text-v1').then(function(cache) {
          cache,put(event.requset, response);
        });

        return response.clone();
      });
    })
  );
});