// 引入 game.js文件 (也就是数据 数据对象)
self.importScripts("data/games.js");

/**
 * 创建一个作为缓存的名字的变量
 * 当应用有新版本，并且包含一些可用的新资源,把版本号更新到v2。
 * SW会将所有的文件（包括那些新的文件）添加到一个新的缓存中
 */
var cacheName = "cache-v1";
// app shell所需的文件被记录在一个数组上
var appShellFiles = [
  "/notes/pwa/",
  "/notes/pwa/index.html",
  "/notes/pwa/app.js",
  "/notes/pwa/style.css",
  "/notes/pwa/fonts/graduate.eot",
  "/notes/pwafonts/graduate.ttf",
  "/notes/pwa/fonts/graduate.woff",
  "/notes/pwa/favicon.ico",
  "/notes/pwa/img/js13kgames.png",
  "/notes/pwa/img/bg.png",
  "/notes/pwa/icons/icon-32.png",
  "/notes/pwa/icons/icon-64.png",
  "/notes/pwa/icons/icon-96.png",
  "/notes/pwa/icons/icon-128.png",
  "/notes/pwa/icons/icon-168.png",
  "/notes/pwa/icons/icon-192.png",
  "/notes/pwa/icons/icon-256.png",
  "/notes/pwa/icons/icon-512.png",
];
// 从data/game.js的内容中解析图片链接，赋值到另一个数组上
var gamesImages = [];
for (var i = 0; i < games.length; i++) {
  gamesImages.push("data/img/" + games[i].slug + ".jpg");
}
// 合并数组
var contentToCache = appShellFiles.concat(gamesImages);

/**  此处触发时缓存资源
 * 为关键事件添加事件监听器 - 第一个是 install 事件：
 * 初始化缓存以及添加离线应用时所需的文件
 */
self.addEventListener("install", function (extendableEvent) {
  console.log("[Service Worker] Install");
  // sw会等到 waitUntil 里面的代码执行完,才开始安装.返回一个promise
  extendableEvent.waitUntil(
    // 特殊的 CacheStorage 对象,能在SW指定的范围内提供数据存储的能力
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

// activate 事件 ,通常用来删除已经不需要的文件或者做一些清理工作。(暂时未用)
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

/**  此处触发时返回缓存中的资源
 * 当应用发起一个http请求时,有一个fetch 事件可以使用.它允许拦截请求并对请求作出自定义的响应
 * 请求的响应可以是任何想要的东西：请求过的文件缓存副本，或一段做具体操作的js代码，等。
 * 当缓存存在时，使用缓存来提供服务而不是重新请求数据；无视当前是否离线。
 * 当请求的文件不在缓存中时，在响应之前将数据添加到缓存中；为离线等做备用。
 */
self.addEventListener("fetch", function (event) {
  /**
   * 接管响应控制，作为服务器和应用之间的代理服务。
   * 允许对每一个请求作出想要的任何响应：SW会处理一切，从缓存中获取数据，并在需要的情况下对它们进行修改
   */
  event.respondWith(
    caches.match(event.request).then(function (r) {
      console.log("[Service Worker] Fetching resource: " + event.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            console.log(
              "[Service Worker] Caching new resource: " + event.request.url
            );
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
