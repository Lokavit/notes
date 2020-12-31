// Generating content based on the template
var template =
  "<article>\n\
	<img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>\n\
	<h3>#POS. NAME</h3>\n\
	<ul>\n\
	<li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
	<li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
	<li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
	<li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
	<li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
	</ul>\n\
</article>";
var content = "";
for (var i = 0; i < games.length; i++) {
  var entry = template
    .replace(/POS/g, i + 1)
    .replace(/SLUG/g, games[i].slug)
    .replace(/NAME/g, games[i].name)
    .replace(/AUTHOR/g, games[i].author)
    .replace(/TWITTER/g, games[i].twitter)
    .replace(/WEBSITE/g, games[i].website)
    .replace(/GITHUB/g, games[i].github);
  entry = entry.replace("<a href='http:///'></a>", "-");
  content += entry;
}
document.getElementById("content").innerHTML = content;

/**
 * 注册新 Service Worker
 * 如果浏览器支持 service worker API 对该站点进行注册
 * 此处注意，需已根路径为起始，如本项目在notes下，就需加上
 * 其内容在 sw.js 文件中，在注册成功后执行。 它是 app.js 文件中唯一的SW代码;
 * 其他关于 Service Worker 的内容都写在 sw.js 文件中
 * 第二个参数选填，用来指定需SW控制的内容的子目录
 */
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/notes/pwa/sw.js").then(function () {
    console.log("Service Worker Registered");
  });

// 点击按钮时请求用户授权，用来向用户推送通知
var button = document.getElementById("notifications");
button.addEventListener("click", function (e) {
  Notification.requestPermission().then(function (result) {
    if (result === "granted") {
      randomNotification();
    }
  });
});

// 创建通知 随机展示游戏列表中的一个项目
function randomNotification() {
  var randomItem = Math.floor(Math.random() * games.length);
  var notifTitle = games[randomItem].name;
  var notifBody = "Created by " + games[randomItem].author + ".";
  var notifImg = "data/img/" + games[randomItem].slug + ".jpg";
  var options = {
    body: notifBody,
    icon: notifImg,
  };
  var notif = new Notification(notifTitle, options);
  // 每30秒创建一个通知
  setTimeout(randomNotification, 30000);
}

// Progressive loading images 渐进式加载图像
var imagesToLoad = document.querySelectorAll("img[data-src]");
var loadImages = function (image) {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = function () {
    image.removeAttribute("data-src");
  };
};
//  Intersection Observer API 确保只有当图片出现在可见区域时，它才会被加载
if ("IntersectionObserver" in window) {
  var observer = new IntersectionObserver(function (items, observer) {
    items.forEach(function (item) {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach(function (img) {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach(function (img) {
    loadImages(img);
  });
}
