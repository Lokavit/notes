<!--
title:Server
dir:nodejs
-->

# 搭建可访问本地文件的服务器

- 同步读取及异步读取

```js
const http = require("http"); // http模块
const fs = require("fs"); // 文件系统
const url = require("url"); // url
const path = require("path"); // 路径

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 端口号

/**
 * http模块提供了createServer函数,这个函数会返回一个对象，将返回的对象赋值给server。
 * request:接收到的数据
 * response:响应数据
 * 通常使用response.write方法向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起。
 * 必须调用response.end方法结束请求，否则前端会一直处于等待状态，该方法也可以用来向前端返回数据
 */
const server = http.createServer((request, response) => {
  /**
   * __dirname是全局变量,可以直接获取。表示当前执行脚本所在的目录。（这里是D:\Git\……）
   * path.join方法，拼接目录地址
   * staticPath拼接后的目录地址，为了跳到自己项目所在那个目录。（这里是D:\Git\……\view）
   */
  const staticPath = path.join(__dirname, "view");
  /**
   * request.url请求的链接（这里输出的是/index.html）
   * url.parse方法，解析请求的url，解决链接"\"和"/"的差异问题。
   * 解析后的request.url是个对象。
   */
  const pathObj = url.parse(request.url, true);

  // 如果没有后缀，默认显示 index.html
  if (pathObj.pathname == "/") pathObj.pathname += "index.html";

  /**
   * 从解析后的对象中获取到pathname(这里pathObj.pathname是/index.html)
   * path.join方法，拼接完整项目目录地址。
   */
  const filePath = path.join(staticPath, pathObj.pathname);
  /**
   * fileContent拼接后的项目目录名字（这里是 D:\Git\……\view\index.html）
   * fs.readFile 方法，异步读取文件数据
   * 读取拼接完整后的目录中的文件， 'binary'表示二进制方式读取
   */
  fs.readFile(filePath, "binary", (err, fileContent) => {
    if (err) {
      response.writeHead(404, "Not Found");
      response.end("<h1>404 Not Found</h1>");
    } else {
      response.writeHead(200, "OK");
      response.write(fileContent, "binary");
      response.end();
    }
  });

  /**
   * fileContent拼接后的项目目录名字（这里是 D:\Git\……\view\index.html）
   * fs.readFileSync方法，同步读取文件信息
   * 读取拼接完整后的目录中的文件， 'binary'表示二进制方式读取
   */
  const fileContent = fs.readFileSync(filePath, "binary");
  response.write(fileContent, "binary");
  response.end();
});
// 指定服务器端口号，打开地址时，服务器会接收数据，并且响应数据
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`服务器已启动: ${HOST}:${PORT}`);
});
```

# 返回 HTML 版

```js
/**
 * run.js 使用: $ node run 启动，点击url
 */
const fs = require("fs"); // 文件系统
const http = require("http"); // HTTP
const path = require("path"); // 路径

const HOST = "http://localhost"; // http://127.0.0.1
const POST = 1111; // 端口号

const FAVICON = path.join(__dirname, "asset", "favicon.ico");

// 多用途互联网邮件扩展类型 用于写入响应头
const MIMETYPE = {
  css: "text/css",
  html: "text/html",
  ico: "image/x-icon",
  jpg: "image/jpeg",
  png: "image/png",
  js: "text/javascript",
  json: "application/json",
  ttf: "application/x-font-ttf",
  txt: "text/plain",
  // 以下暂未用到
  // 'gif': 'image/gif',
  // 'jpeg': 'image/jpeg',
  // 'webp': 'image/webp',
  // 'pdf': 'application/pdf',
  // 'svg': 'image/svg+xml',
  // 'swf': 'application/x-shockwave-flash',
  // 'woff': 'application/font-woff',
  // 'woff2': 'application/font-woff2',
  // 'eot': 'application/vnd.ms-fontobject',
  // 'wav': 'audio/x-wav',
  // 'mp3': 'audio/mpeg3',
  // 'mp4': 'video/mp4',
  // 'xml': 'text/xml'
};

/**
 *  创建一个服务
 * request： 请求变量 ，客户端请求服务器
 * response： 响应变量，服务器响应客户端
 */
const server = http.createServer((request, response) => {
  // 文件路径 输出 index.html  以及 ./xxx/xxx/xxx
  let fileURL = request.url === "/" ? "index.html" : "." + request.url;
  // 判断文件是否存在
  if (fs.existsSync(fileURL)) {
    // path.extname  返回 path 的扩展名 ，没有则返回空字符串  // 返回 .js .html
    let ext = path.extname(fileURL).slice(1); // 得到 文件后缀名，去掉点,用来判断用哪个响应头
    // 读取文件 返回 path(文件名或文件描述符) 的内容
    let file = fs.readFileSync(fileURL);
    let contentType = MIMETYPE[ext] || "text/plain"; // 获取内容类型,用于写入响应头
    // 向请求发送响应头
    response.writeHead(200, {
      "Content-Type": contentType,
    });
    // if (request.url == "/favicon.ico") continue; // 跳过加载 favicon.ico
    response.write(file); // 写入响应变量中
    response.end(); // 结束读写操作
  }
  // 如果是找不到的页面，跳转到404
  else {
    let errorHTML = fs.readFileSync("./src/404.html");
    response.writeHead(404, {
      "Content-Type": "text/html",
    });
    response.write(errorHTML);
    response.end(); // 结束读写操作
  }
});

server.listen(POST, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`服务器已启动，端口号为:${POST}  ${HOST}:${POST}`);
});
```

# 搭建本地服务器 简易版

```js
const http = require("http"); // http模块
const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 端口号

/**
 * http模块提供了createServer函数,这个函数会返回一个对象，将返回的对象赋值给server。
 * request:接收到的数据
 * response:响应数据
 */
const server = http.createServer((request, response) => {
  //设置响应的头部。状态值 content-Type 响应数据内容的类型
  response.writeHead(200, {
    "Content-Type": "text-plain; charset=utf-8",
  });
  // response.write("写入响应的内容"); // 响应内容 ,当启动服务器后，该内容写入页面上
  response.end("写入响应的内容"); // 写在这里也行，效果同上
});
// 指定服务器端口号，打开地址时，服务器会接收数据，并且响应数据
server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`服务器已启动: ${HOST}:${PORT}`);
});
```
