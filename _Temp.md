## 原生实现 状态管理

- 订阅发布/观察者模式 当对象的某种状态发生改变,所有依赖它的对象都将得到通知,触发已经注册的事件

## 前端应用分类

### 数据驱动

- 最多让用户填几个表单和验证码的应用。如购物网站/购票网站
- MboX

### 事件驱动

- 用户的输入事件，大量不同类型异步事件可以任意排列组合。web 编辑器/游戏等
- RxJS


<!-- 

 -->

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
