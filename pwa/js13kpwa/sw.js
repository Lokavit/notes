// 引入 game.js文件file
self.importScripts("data/games.js");

// Files to cache 对app shell和主体内容（content）里面的数据创建一个缓存列表
var cacheName = "js13kPWA-v1";
var appShellFiles = [
  "/pwa/js13kpwa/",
  "/pwa/js13kpwa/index.html",
  "/pwa/js13kpwa/app.js",
  "/pwa/js13kpwa/style.css",
  "/pwa/js13kpwa/fonts/graduate.eot",
  "/pwa/js13kpwa/fonts/graduate.ttf",
  "/pwa/js13kpwa/fonts/graduate.woff",
  "/pwa/js13kpwa/favicon.ico",
  "/pwa/js13kpwa/img/js13kgames.png",
  "/pwa/js13kpwa/img/bg.png",
  "/pwa/js13kpwa/icons/icon-32.png",
  "/pwa/js13kpwa/icons/icon-64.png",
  "/pwa/js13kpwa/icons/icon-96.png",
  "/pwa/js13kpwa/icons/icon-128.png",
  "/pwa/js13kpwa/icons/icon-168.png",
  "/pwa/js13kpwa/icons/icon-192.png",
  "/pwa/js13kpwa/icons/icon-256.png",
  "/pwa/js13kpwa/icons/icon-512.png",
];
var gamesImages = [];
for (var i = 0; i < games.length; i++) {
  gamesImages.push("data/img/" + games[i].slug + ".jpg");
}
// 合并数组
var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker 监听install事件
self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  // service worker会等到 waitUntil 里面的代码执行完毕之后才开始安装。返回一个promise
  e.waitUntil(
    // caches 是一个特殊的 CacheStorage 对象，它能在Service Worker指定的范围内提供数据存储的能力（service worker在注册时，第二个参数是选填的，可以被用来指定你想让 service worker 控制的内容的子目录
    // 在service worker中使用web storage 将不会有效果，因为web storage的执行是同步的（此处理解为web storage并不返回一个promise.使用Cache API作为替代
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker 如果条件允许，service worker将从缓存中请求content中所需的数据，从而提供离线应用功能
// 每次当我们的应用发起一个http请求时，我们还有一个fetch 事件可以使用。这个事件对我们来说非常有用，它允许我们拦截请求并对请求作出自定义的响应
// 当缓存存在时，我们使用缓存来提供服务而不是重新请求数据。不管当前应用是在线还是离线，我们都这么做。当请求的文件不在缓存中时，我们会在响应之前将数据添加到缓存中
self.addEventListener("fetch", function (e) {
  // 接管响应控制，它会作为服务器和应用之间的代理服务。它允许我们对每一个请求作出我们想要的任何响应：Service Worker会处理这一切，从缓存中获取这些数据，并在需要的情况下对它们进行修改
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
