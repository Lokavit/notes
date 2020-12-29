# 正则

```
console\.log\(.*?\);
console\.warn\(.*?\);
```

# DD PWA

## 文件夹

- src:项目源码
- notes:技术.所有和技术相关的文章
- novel:创作.所有与技术无关的文章
- eg:示例.技术文章中的一些示例
- img:图库.存放以上所需图像资源

## 页面布局

- 侧栏:
- - Github 拉取的头像、昵称及座右铭
- - 示例库:技术相关一堆示例
- - 搜索:支持模糊搜索栏中文章标题。
- - 列表:展示所有文章标题<nav>不分类(每次创建向第一元素之前添加元素)
- 内容:负责显示侧栏选定项具体内容<article>
- - 具体内容:标题、正文

## 实现

- 正文:markdown 解析、代码高亮

## Progressive Web Apps 渐进式网络应用

### App shell 程序外壳

- 尽快加载最小的用户界面并缓存它，以便后续访问可以离线使用.然后加载应用趁墟的所有内容。下次从设备访问时，UI 立即从缓存加载，并从服务器请求新的内容(如果它已在缓存中不可用)
- 用户立即看到内容，而非加载动画或空白页，感觉很快，且可离线。
- 通过 service worker 控制从服务器请求的内容以及从缓存中检索的内容。
- 添加到主屏幕或推送通知，更像原生应用。

```html
<head>
  <meta property="og:image" content="icons/icon-512.png" />
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="stylesheet" href="style.css" />
  <!-- web manifest文件 -->
  <link rel="manifest" href="js13kpwa.webmanifest" />
  <!-- 数据 数组对象 用于填充到 content -->
  <script src="data/games.js" defer></script>
  <!-- 整个程序的初始化工作，会在app.js中完成 -->
  <script src="app.js" defer></script>
</head>
<!-- html页面，除本行之外，全是App shell程序外壳 -->
<section id="content"></section>
```

```css
/* 响应式布局 */
```

```js
/* app.js */
// 模板字符串
// 注册 service worker
// 点击按钮时请求用户权限，用来向用户推送通知
// 创建通知,随机展示列表中的一个项目

/* sw.js */
// 引入 game.js文件 (也就是数据 数据对象)
self.importScripts("data/games.js");
// 程序对app shell和主体内容(content)里面的数据创建一个缓存列表
// 配置service worker，缓存 列表的工作在此执行
// 如果条件允许，service worker将从缓存中请求content中所需的数据，从而提供离线应用功能
```

### Service Workers

- 是浏览器和网络之间的虚拟代理。正确缓存网站资源并使其在用户设备离线时可用。
- API 是非阻塞的，且可以在不同上下文之间发送和接收通信
- 分配给 SW 一些任务，并在使用基于 Promise 的方法当任务完成时收到结果
- 主要:离线功能、处理通知、在单独的线程上执行繁重的计算
- 控制网络请求，修改网络请求，返回缓存的自定义响应，或合成响应。
- 需使用 HTTPS，使用 web storage 无效，因其不返回 Promise。
- 独立于主线程、在后台运行的脚本。不能直接操纵 dom
- 被 install 后就永远存在，除非被手动卸载
- 可编程拦截请求和返回，缓存文件。sw 可以通过 fetch 这个 api，来拦截网络和处理网络请求，再配合 cacheStorage 来实现 web 页面的缓存管理以及与前端 postMessage 通信。
- 异步实现，sw 大量使用 promise。
- “离线优先”或“缓存优先”模式是向用户提供内容的最流行策略。 如果资源已缓存且可脱机使用，请在尝试从服务器下载资源之前先将其返回。 如果它已经不在缓存中，请下载并缓存以备将来使用。

- service worker 的生命周期
  service worker 从代码的编写，到在浏览器中的运行，主要经过下面几个阶段 installing -> installed -> activating -> activated -> redundant;

installing：这个状态发生在 service worker 注册之后，表示开始安装。在这个过程会触发 install 事件回调指定一些静态资源进行离线缓存。
installed：sw 已经完成了安装，进入了 waiting 状态，等待其他的 Service worker 被关闭（在 install 的事件回调中，可以调用 skipWaiting 方法来跳过 waiting 这个阶段）
activating： 在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。
activated： 在这个状态会处理 activate 事件回调，并提供处理功能性事件：fetch、sync、push。（在 acitive 的事件回调中，可以调用 self.clients.claim()）
redundant：废弃状态，这个状态表示一个 sw 的使命周期结束

### 版本更新

```js
contentToCache.push("/notes/pwa/js13kpwa/icons/icon-32.png");
// ...
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("js13kPWA-v2").then(function (cache) {
      return cache.addAll(contentToCache);
    })
  );
});
```

### 其它用途

可以把比较耗时的计算从主线程中提取出来，在 SW 中计算完成，从 SW 中取得计算结果；可以在 SW 中对即将使用的资源进行预加载。

### 从设备启动

- js13kpwa.webmanifest：清单文件，列举网站所有信息

```html
<link rel="manifest" href="js13kpwa.webmanifest" />
```

## WebComponents 另一种使用方式

- 尝试将 WebComponents 的类组件形式，实现 Modal 的类形式
- 如果以上成立，则可以将页面组件拆分，分别以类的形式实现
- 最终页面为拼接类组件形式展现

##

- 在清除 DOM 节点内容时，更高效的做法永远是：textContent('');
- 按位操作符高效准确判断

## 原生实现 状态管理

- 订阅发布/观察者模式 当对象的某种状态发生改变,所有依赖它的对象都将得到通知,触发已经注册的事件

## 前端应用分类

### 数据驱动

- 最多让用户填几个表单和验证码的应用。如购物网站/购票网站
- MboX

### 事件驱动

- 用户的输入事件，大量不同类型异步事件可以任意排列组合。web 编辑器/游戏等
- RxJS

### Generator

```js
/** 封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息 */
function* gen() {
  const URL = `https://api.github.com/users/Lokavit`;
  // 启动生成器之后就开始请求数据
  let result = yield fetch(URL);
  console.log("* gen() result:", result);
  let res = yield result.json();
  // console.log("yield result.json() :", result.json());
  // let res = yield result;
  // 从第二次调用 next(data)中输出指定结果，
  console.log("请求结果:", result.name);
}
// 执行以上生成器函数 获取遍历器对象
let g = gen();
// 执行异步任务的第一阶段。相当于启动 gen()生成器
let result = g.next();
console.log("result:", result); // 1.最先输出该语句
// 继续向下执行 .value中是一个promise，所以在.then中调用下一个next()方法
result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    // 2. 其次输出该语句
    console.log("data:", data);
    // 表示执行 gen()生成器 的
    g.next(data);
  });
```

---

改变笔记形式

```结构
algorithm
    filter.html 每一个的文件，在README.md表格的对应位置直接链接至此
design-patterns
    command.html 命令模式，链接方式同上
pixijs 一个webgl2d库
    每个示例.html
web-components
    每个自定义组件最终使用处.html
markdown 存放不适合或无必要转化为html的笔记
    csharp.md

jslib 放所有收集js代码的地方，.md文件罗列所有？



// or
一级全部以文件夹分类
每种分类下，包含其文件及md文件
README.md做链接时:以下方式选一
1.每个md链接，单元格对应index.html链接
2.将md引入html，解析。
3.单元格链接.md，该文件内，链接示例。此方式可以去掉每个分类的index.html,改为写在md里
```

```js
// Intl.DateTimeFormat() constructor
/** 将 2020-07-30T04:00:00Z 转换为 2020年7月30日 */
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
console.log(formatDate(new Date())); // 2020年7月30日
```

<!-- ## SEO & JSON-LD & structured-data
- 也就是在搜索引擎搜索时，网站在前且有效果。可以做推送
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Example",
    "url": "http://www.example.com",
    "logo": "http://www.example.com/images/logo.png"
  }
</script> -->

检测网络、浏览器、WebGL、操作系统

- runtimecheck

<!-- PC端
浏览器平台（操作系统）:Win32
浏览器的应用程序名称:Netscape
浏览器的应用程序代码名称:Mozilla
浏览器引擎的产品名称:Gecko
有关浏览器的版本信息:5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 Edg/84.0.522.48
由浏览器发送到服务器的用户代理报头:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 Edg/84.0.522.48
浏览器语言:zh-CN
浏览器联网状态:true
 -->

<!-- 手机端
浏览器平台（操作系统）:Linux armv8l
浏览器的应用程序名称:Netscape
浏览器的应用程序代码名称:Mozilla
浏览器引擎的产品名称:Gecko
有关浏览器的版本信息:5.0 (Linux; Android 6.0; vivo Y67) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.0 Mobile Safari/537.36 EdgA/44.11.2.4122
由浏览器发送到服务器的用户代理报头:Mozilla/5.0 (Linux; Android 6.0; vivo Y67) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.0 Mobile Safari/537.36 EdgA/44.11.2.4122
浏览器语言:zh-TW
浏览器联网状态:true
 -->

<!--
Device                           OS               window.navigator.platform
---------------------------------------------------------------------------
iPhone 4                         iOS 7.1          iPhone
iPhone 5                         iOS 7.1.1        iPhone
iPhone 5c                        iOS 7.1          iPhone
iPhone 5s                        iOS 7.1          iPhone

Samsung Galaxy S2                Android 4.1.2    Linux armv7l
Samsung Galaxy S3 Mini           Android 4.1.2    Linux armv7l
Samsung Galaxy S3                Android 4.3      Linux armv7l
Samsung Galaxy S4                Android 4.4.2    Linux armv7l
Samsung Galaxy Note 3            Android 4.4.2    Linux armv7l
Samsung Galaxy S6                Android 5        Linux aarch64

Nexus 4                          Android 4.4.2    Linux armv7l
Nexus 5                          Android 4.4.2    Linux armv7l

HTC One                          Android 4.4.2    Linux armv7l
Sony Xperia Z                    Android 4.2.2    Linux armv7l
Motorola Moto G                  Android 4.4.2    Linux armv7l

Nokia Lumia 1520                 Windows 8.1      Win32

Device                           OS               window.navigator.platform
---------------------------------------------------------------------------
iPad 2nd generation              iOS 6.1.3        iPad
iPad 2nd generation              iOS 7.0.3        iPad
iPad 4th generation              iOS 6.1.2        iPad
iPad 4th generation              iOS 6.1.3        iPad
iPad mini (non retina)           iOS 6.1.3        iPad
iPad mini (retina)               iOS 7.0.3        iPad

Samsung Galaxy Tab 2 7"          Android 4.0.3    Linux armv7l
Samsung Galaxy Tab 3 7"          Android 4.1.2    Linux armv7l
Samsung Galaxy Tab 3             Android 4.2.2    Linux i686
Samsung Galaxy Note 10.1 (2012)  Android 4.1.2    Linux armv7l
Samsung Galaxy Note 10.1 (2014)  Android 4.3      Linux armv7l

Nexus 7 (2012) 7"                Android 4.4.3    Linux armv7l
Nexus 7 (2013) 7"                Android 4.3      Linux armv7l
Nexus 10                         Android 4.4.2    Linux armv7l

Lenovo Yoga                      Android 4.2.2    Linux armv7l
Sony Xperia Z                    Android 4.3      Linux armv7l
Tesco Hudl 7"                    Android 4.2.2    Linux armv7l
Kindle Fire 7" (2012)            Unknown          Linux armv7l
Kindle Fire HDX 7" (2013)        Unknown          Linux armv7l

Asus Transformer Pad TF300T      Android 4.0.3    Linux armv7l

Nokia Lumia 2520                 Windows RT 8.1   Win32
MS Surface Tablet Pro            Windows 8.1 Pro  Win64

Desktop PC (HP)                  Windows 7 Ent.   Win32
Desktop PC (iMac)                OSX 10.8.5       MacIntel

+-----+--------------+--------------------------------------+
| iid | item         | value                                |
+-----+--------------+--------------------------------------+
| 448 | nav_platform | Linux armv7l                         |
| 454 | nav_platform | ARM                                  |
| 455 | nav_platform | Linux x86_64                         |
| 457 | nav_platform | PlayStation 4                        |
| 459 | nav_platform | masking-agent                        |
| 460 | nav_platform | OpenBSD amd64                        |
| 464 | nav_platform | FreeBSD amd64                        |
| 465 | nav_platform | Linux armv5tejl                      |
| 466 | nav_platform | Symbian OS                           |
| 467 | nav_platform | New Nintendo 3DS                     |
| 470 | nav_platform | Linux armv6l                         |
| 471 | nav_platform | FreeBSD                              |
| 472 | nav_platform | Symbian                              |
| 473 | nav_platform | Linux MSM8960_V3.2.1.1_N_R069_Rev:18 |
| 476 | nav_platform | Linux aarch64                        |
| 479 | nav_platform | Linux i686 on x86_64                 |
| 480 | nav_platform | Linux ppc64                          |
+-----+--------------+--------------------------------------+
 -->

### classList

```html
<div id="el"></div>
<script>
  const el = document.querySelector("#el");
  // Add a class
  el.classList.add("open");

  // Add many classes
  el.classList.add("this", "little", "piggy");
  let classes = ["is-message", "is-warning"];
  el.classList.add(...classes);

  // Remove a class
  el.classList.remove("open");

  // Remove multiple classes
  el.classList.remove("this", "little", "piggy");

  // Loop over each class
  el.classList; // DOMTokenList (pretty much an array)
  el.classList.forEach((className) => {
    // don't use "class" as that's a reserved word
    console.log(className);
  });
  // $0.classList 从控制台更新其属性
  for (let className of $0.classList) {
    console.log(className);
  }

  el.classList.length; // integer of how many classes there are

  // Replace a class (replaces first with second)
  el.classList.replace("is-big", "is-small");

  // Toggle a class (if it's there, remove it, if it's not there, add it)
  el.classList.toggle("open");
  // Remove the class
  el.classList.toggle("open", false);
  // Add the class
  el.classList.toggle("open", true);
  // Add the class with logic
  el.classList.toggle("raining", weather === "raining");

  // Check if element has class (returns true or false)
  el.classList.contains("open");

  // Look at individual classes <div class="hot dog">
  el.classList.item(0); // hot
  el.classList.item(1); // dog
  el.classList.item(2); // null
  el.classList[1]; // dog
</script>
```

```js
let btn = document.querySelector(".btn");
console.log(btn.classList);
// ["btn", "show", value: "btn show"]

console.log(btn.classList[1]); // show

// 向元素添加一个或多个类
btn.classList.add("xxx", "yyy");
// 元素中是否存在指定类
console.log(btn.classList.contains("show")); // true
// 获取指定索引的类
console.log(btn.classList.item(2)); // yyy
// 向元素移除一个或多个类
btn.classList.remove("show", "make", "me");

// 切换 toggle
if (btn.classList.contains("yyy")) {
  btn.classList.remove("xxx");
} else {
  btn.classList.add("show");
}

/** 点击按钮，如果没有test就加上，有就移除test */
btn.addEventListener("click", () => {
  btn.classList.toggle("test");
});

// 使用展开语法添加或移除多个类值
const cls = ["foo", "bar"];
btn.classList.add(...cls);
btn.classList.remove(...cls);

// 将类值 "foo" 替换成 "bar"
btn.classList.replace("foo", "bar");
```
