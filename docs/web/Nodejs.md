一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

Node 支持 WebAssembly

## nodejs 服务端

```js
const fs = require("fs"); // 文件系统
const http = require("http"); // HTTP
const path = require("path"); // 路径

const HOST = "http://localhost"; // http://127.0.0.1
const PORT = 1111; // 端口号

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
      // 'Access-Control-Allow-Origin': "*"
    });
    // if (request.url == "/favicon.ico") {
    //     console.log('站点图标：', request.url);
    // }
    response.write(file); // 写入响应变量中
    response.end(); // 结束读写操作
  }
  // 如果是找不到的页面，跳转到404
  else {
    let errorHTML = fs.readFileSync("./client/src/404.html");
    response.writeHead(404, {
      "Content-Type": "text/html",
    });
    response.write(errorHTML);
    response.end(); // 结束读写操作
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("ERRPR:", err);
    throw err;
  }
  console.log(`服务器已启动: ${HOST}:${PORT}`);
});
```

## 优化角色获取创建等请求操作，带路由方式

```js
// api/role.js
/** 角色相关 API */

const fs = require("fs");
// JSON文件路径
const fileJSON = "D:/Git/Lokavit/Satya/Concept/role/roleback.json";

const roleAPI = {
  /**
   * 创建字段为 '/create'的方法
   * 用于稍后处理POST方式提交过来的数据，后续操作亦在内中
   * 此处只写函数名，具体实现罗列在下方。
   */
  "/create": createRole,
  "/getrole": getRoles,
  "/getroleinfo": getRoleInfo,
};

/** 获取角色列表 */
function getRoles(request, response) {
  // 读取JSON
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    // 写入响应头
    response.writeHead(200, {
      // 内容类型: 指定字符编码，防止乱码
      "Content-Type": "text/plain;charset=utf-8",
    });
    // 把读取到的JSON文件内容写入响应。必须转换
    response.write(JSON.stringify(roles));
    response.end();
  });
}

/** 获取指定角色信息详情 */
function getRoleInfo(request, response) {
  console.log("请求携带的参数 query:", request.query);
  /** 读取JSON
   * 参数一：读取的文件路径
   * 参数二：回调函数。其中参数一为error对象(为null表示成功)，参数二为数据(可为<string>|<Buffer>)
   */
  // fs.readFile(`./${request.url}`, (error, buffer) => {
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    const temp = roles.find((item) => item.name == request.query.rolename);
    console.log("TEMP:", temp);

    // 写入响应头
    response.writeHead(200, {
      // 内容类型: 指定字符编码，防止乱码
      "Content-Type": "text/plain;charset=utf-8",
    });

    if (!temp) {
      response.write(
        JSON.stringify({
          msg: "输入有误",
        })
      );
      response.end();
    } else {
      // 向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起
      // 把读取到的JSON文件内容写入响应。必须转换
      response.write(JSON.stringify(temp));
      response.end();
    }
  });
}

/** 创建新角色 */
function createRole(request, response, data) {
  //  读取JSON
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    // 从读取的JSON中，遍历判断是否有重复名字的对象
    const nameIndex = roles.findIndex((item) => {
      return data.name === item.name;
    });
    if (nameIndex > 0) {
      // 写入响应头
      response.writeHead(200, {
        // 内容类型: 指定字符编码，防止乱码
        "Content-Type": "text/plain;charset=utf-8",
      });
      // 把读取到的JSON文件内容写入响应。必须转换
      response.write(
        JSON.stringify({
          msg: "角色名重复",
        })
      );
      response.end();
    } else {
      roles.push(data); // 前台来的数据，加到 数据集中,用于写入JSON文件
      /**
       * 向文件写入信息，若文件不存在，则自动创建。 把JSON以字符串形式写入
       * 参数一：写入的文件路径
       * 参数二：写入内容(可为<string> | <Buffer> | <TypedArray> | <DataView>)
       * 参数三：回调函数，传入数据为error对象，其为null表示成功。
       */
      fs.writeFile(fileJSON, JSON.stringify(roles), () => {
        // 写入响应头
        response.writeHead(200, {
          // 内容类型: 指定字符编码，防止乱码
          "Content-Type": "text/plain;charset=utf-8",
          // 允许跨域
          "Access-Control-Allow-Origin": "http://localhost:1111",
        });
        // 把读取到的JSON文件内容写入响应。必须转换
        response.write(
          JSON.stringify({
            msg: "写入成功",
          })
        );
        console.log(`文件写入成功`);
        response.end();
      });
    }
  });
  console.log("创建角色：！！！！ data:", data);
}

module.exports = {
  roleAPI,
};
```

```js
// api/routes.js
/**
 * 路由表 API
 * 解构所有模块 API
 */
const { roleAPI } = require("./role");

const routes = {
  ...roleAPI,
};

module.exports = {
  routes,
};
```

```js
// router.js
// 路由表
const fs = require("fs");
const urlParse = require("url").parse;
const { routes } = require("./api/routes"); // 路由表 API

/**
 * 路由表函数
 * @param {*} request 请求体
 * @param {*} response 响应体
 */
function route(request, response) {
  // 在 request对象中，可以获取请求URL，通过URL判断请求的资源
  console.log(`请求方式:${request.method},请求的URL:${request.url}`); // URL:/
  // 使用url.parse解析get数据
  let { pathname, query } = urlParse(request.url, true);
  // 输出结果为：/getrole  QUERY: [Object: null prototype] {}
  console.log(`路由表中参数:${pathname}`, "QUERY:", query);

  /**
   *  如果有，路由表API对象中，pathname属性
   */
  if (routes[pathname]) {
    // 如果是 POST 请求
    if (request.method == "POST") {
      // request 的监听方法 data事件 ,
      let bufferArray = []; // 用于存储data事件获取的Buffer数据
      request.on("data", (buffer) => {
        bufferArray.push(buffer); // 将buffer数据存储在数据中
      });
      // 等到数据接收完之后，end 事件触发
      request.on("end", () => {
        // Buffer 类是一个全局变量，使用时无需 require('buffer').Buffer。
        // Buffer.concat方法用于合并Buffer数组。
        let buffer = Buffer.concat(bufferArray);
        // 已知Buffer数据只是字符串，则可以直接用toString将其转换成字符串。
        postData = JSON.parse(buffer.toString());
        // 执行 routes(路由表API)中， 当前 pathname的函数,并将所有参数传过去
        routes[pathname](request, response, postData);
      });
    }
    // 如果是 POST 请求
    if (request.method == "GET") {
      request.query = query; // 请求携带的参数。
      console.log("GET请求，参数:", request.query);
      // 执行 routes(路由表API)中， 当前 pathname的函数,并将所有参数传过去
      routes[pathname](request, response);
    }
  }

  // GET / 返回 index.html主页面内容
  if (pathname == "/") {
    pathname += "index.html"; // 指向 index.html
    fs.readFile(`.${pathname}`, (error, buffer) => {
      if (error) response.writeHead(400);
      // 向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起
      else response.write(buffer);
      // 注：必须调用该方法结束请求，否则前端一直处于等待状态，亦可向前端返回数据
      response.end();
    });
  }
}

module.exports = {
  route,
};
```

```js
// Server.js
const http = require("http"); // 内置 http模块
// const childProcess = require('child_process'); // 内置模块，用于设置默认浏览器打开URL

const HOST = "localhost"; // 域
const PORT = "1111"; // 端口号

/** 启动服务器 */
function start(route) {
  /**
   * 创建一个服务器
   * @param {*} request 请求体
   * @param {*} response 响应体
   */
  function onRequest(request, response) {
    /**
     * 路由函数 (请求体，响应体)
     * 该函数为 router.js模块中函数
     */
    route(request, response);
  }
  /**
   * 创建一个服务器
   * onRequest: 上一步的函数
   */
  http
    .createServer(onRequest)
    // 开启监听
    .listen(PORT, () => {
      console.log(`服务器启动成功:${HOST}:${PORT}`);
      // 使用默认浏览器打开
      // childProcess.exec(`start http://${HOST}:${PORT}/`);
    });
}

module.exports = {
  start,
};
```

```js
// index.js
// 主文件。启动服务器
const server = require("./server");
const router = require("./router");

server.start(router.route);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>页面触发GET角色，GET指定角色，POST新建角色</title>
  </head>

  <body>
    名字：<input type="text" name="name" id="name" /><br />
    信息：<input type="text" name="info" id="info" /><br />
    <input type="button" value="新增" id="create" />
    <input type="button" value="获取" id="getrole" />
    <input type="button" value="获取单个角色" id="getroleinfo" />

    <p id="roles"></p>
    <p id="roles_info"></p>

    <script>
      // 获取单个角色
      document
        .querySelector("#getroleinfo")
        .addEventListener("click", async function () {
          let name = "satya";
          const response = await fetch(`/getrole/${name}`);
          const result = await response.json();
          console.log("单个角色信息：", result);
          // 获取单个角色信息， 将其显示在 p标签区域
          let roleShow = document.querySelector("#roles_info");
          roleShow.innerHTML = JSON.stringify(result);
        });
      // 获取所有角色信息
      document
        .querySelector("#getrole")
        .addEventListener("click", async function () {
          // const response = await fetch(`/getrole?name=${document.querySelector('#name').value}&info=${document.querySelector('#info').value}`)
          // 获取当前所有角色
          const response = await fetch(`/getrole`);
          const result = await response.json();

          // 测试获取角色信息， 将其显示在 p标签区域
          let roleShow = document.querySelector("#roles");
          roleShow.innerHTML = JSON.stringify(result);
          console.log(result);
        });
      // 登录
      document
        .querySelector("#create")
        .addEventListener("click", async function () {
          const response = await fetch(`/create`, {
            method: "POST",
            body: JSON.stringify({
              name: document.querySelector("#name").value,
              info: document.querySelector("#info").value,
            }),
          });
          const result = await response.json();
          console.log(result);
          alert(result.msg);
        });
    </script>
  </body>
</html>
```

## nodejs 读取本地文件

```js
/** requestHandlers.js */
// 处理HTTP请求
const querystring = require("querystring"); // 处理URL中的查询字符串
const fs = require("fs");

function getText(response) {
  var text = "输出text";
  console.log(text);
  response.writeHead(200, {
    "Content-Type": "text/plain;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  });
  response.write(text);
  response.end();
}

function getImage(response) {
  console.log("getImage");
  // fs.readFile("./images/avatar.jpg", "binary", function(error, file) {
  //"../../Book/avatar.jpg"
  fs.readFile("D:/Book/avatar.jpg", "binary", function (error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "image/jpg",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

function getBigImage(response) {
  console.log("getBigImage");
  fs.readFile("D:/Book/jfd.jpg", "binary", function (error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "image/jpg",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

// 后追加 获取JSON文件
function getJSON(response) {
  console.log("getJSON");
  // fs.readFile("./images/avatar.jpg", "binary", function(error, file) {
  //"../../Book/avatar.jpg" "D:/Book/avatar.jpg"
  fs.readFile(
    "D:/Git/Lokavit/Satya/Concept/role/roleback.json",
    "binary",
    function (error, file) {
      if (error) {
        response.writeHead(500, {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        });
        response.write(error + "\n");
        response.end();
      } else {
        response.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        response.write(file, "binary");
        response.end();
      }
    }
  );
}

function get(query, response) {
  console.log("query: " + query);
  var queryObj = querystring.parse(query);
  for (key in queryObj) {
    console.log("key: " + key + ", value: " + queryObj[key]);
  }
  var type = queryObj["type"];
  switch (type) {
    case "text":
      getText(response);
      break;

    case "image":
      getImage(response);
      break;

    case "bigimage":
      getBigImage(response);
      break;
    case "json":
      getJSON(response);
      break;

    default:
      var text = "type " + type + " is unknown.";
      console.log(text);
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });
      response.write(text);
      response.end();
      break;
  }
}

function hello(query, response) {
  console.log("Hello World");
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });
  response.write("Hello World");
  response.end();
}

exports.get = get;
exports.hello = hello;

/** router.js */
// 将HTTP请求转发给处理函数(requestHandlers.js)
function route(pathname, request, handle, response) {
  console.log("route for " + pathname);
  if (typeof handle[pathname] === "function") {
    handle[pathname](request, response);
  } else {
    console.log(`未找到请求处理程序:${pathname}`);
    response.writeHead(404, {
      "Content-Type": "text/plain",
    });
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;

/** server.js */
// 创建HTTP服务器
const http = require("http");
const url = require("url");

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 端口号

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    // console.log("Request for " + pathname + " received." + " query: " + query);
    console.log(`请求:${pathname}已收到,query为${query}。`);

    route(pathname, query, handle, response);
  }

  http.createServer(onRequest).listen(PORT, (err) => {
    if (err) {
      console.log("ERRPR:", err);
      throw err;
    }
    console.log(`服务器已启动: ${HOST}:${PORT}`);
  });
  console.log("Server has started.");
}

exports.start = start;

/** index.js */
// 服务器主文件
const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

const handle = {};
handle["/"] = requestHandlers.hello;
handle["/get"] = requestHandlers.get;

server.start(router.route, handle);
```

## Stream 流

- 解决 File System 模块占用那次及资源使用效率低的问题

```js
const fs = require("fs"); // 内置 文件系统
// 创建一个可读流
const readStream = fs.createReadStream("./temp.txt");
// 创建一个可写流
const writeStream = fs.createWriteStream("./temp2.txt");
// 将可读流读取的数据，通过管道pipe推送到写入流中，即temp.txt=>temp2.txt
readStream.pipe(writeStream);
// 读取出现错误，触发error事件
readStream.on("error", (error) => {
  console.error(error);
});
// 写入完成时，触发finish事件
writeStream.on("finish", () => {
  console.log("finish 写入完成");
});
```

#### 使用 Zlib 压缩文件

```js
const fs = require("fs"); // 内置 文件系统
const zlib = require("zlib"); // 内置 压缩文件
// 创建一个可读流
const readStream = fs.createReadStream("./zl.jpg");
// 创建一个可写流
const writeStream = fs.createWriteStream("./zl.jpg.gz");
// 创建一个Gzip对象，用于将文件压缩从.gz文件
const gzip = zlib.createGzip();
// 将可读流读取的数据，通过管道pipe推送到gzip中，再推入到写入流中。
// 即，先压缩可读流数据，再推送到可写流
readStream.pipe(gzip).pipe(writeStream);
// 读取出现错误，触发error事件
readStream.on("error", (error) => {
  console.error(error);
});
// 写入完成时，触发finish事件
writeStream.on("finish", () => {
  console.log("finish 写入完成");
});
```

## Ajax 跨域处理

- 在实际项目中，不可以简单地设置 res.setHeader('Access-Control-Allow-Origin', '\*')，而是要通过 req.headers.origin 判断发起请求的域名是否合法，再设置 Access-Control-Allow-Origin 属性，以免出现安全问题。

## url

- 用于对 URL 的解析，常用的是 url.parse 方法。

```js
const url = require("url");
const str = "http://localhost:8080/a/b?x=1&y=2&y=3&y=4";
console.log(url.parse(str)); // 可以看到url的信息如端口号、域名、query参数等都被解析出来了。
// 如需将query参数转为对象，则可以为url.parse函数的第二个参数传true，
// 如console.log(url.parse(str, true))
// 输出：query: [Object: null prototype] { x: '1', y: [ '2', '3', '4' ] },

// 通过构造函数URL，创建一个实例，其中带有解析后的数据。
const { URL } = require("url");
const urlObj = new URL(str);
console.log(urlObj);
console.log(urlObj.toString()); // 实例有一个toString方法，可以将实例解析为字符串url。
```

## path 路径

- 主要用来对文件路径进行处理，比如提取路径、后缀，拼接路径等。

```js
const path = require("path");
const str = "/root/a/b/1.txt";
console.log(path.dirname(str)); // 获取文件目录：/root/a/b
console.log(path.basename(str)); // 获取文件名：1.txt
console.log(path.extname(str)); // 获取文件后缀：.txt
// path.resolve方法，它可以接收任意个参数，然后根据每个路径参数之间的关系，将路径最终解析为一个绝对路径。
console.log(path.resolve(str, "../c", "build", "strict")); // 将路径解析为绝对路径：C:\root\a\b\c\build\strict
console.log(path.resolve(str, "../c", "build", "strict", "../..", "assets")); // 将路径解析为绝对路径：C:\root\a\b\c\assets
// __dirname指的是当前模块所在的绝对路径名称，它的值会自动根据当前的绝对路径变化，等同于path.dirname(__dilename)的结果。
console.log(path.resolve(__dirname, "build")); // 将路径解析为绝对路径：C:\projects\nodejs-tutorial\lesson12\build
```

## querystring 解析和格式化 URL 查询字符串

```js
// querystring用来对url中的query字符串进行解析，常用的方法有querystring.parse和querystring.stringify。
const querystring = require("querystring");
/**
 * querystring.parse方法用于解析URL 查询字符串。
 * 解析结果为： { foo: 'bar', abc: [ 'xyz', '123' ] }
 */
console.log(querystring.parse("foo=bar&abc=xyz&abc=123"));
/**
 * querystring.stringify用于将对象转换为URL查询字符串。
 * 解析结果为: foo=bar&baz=qux&baz=quux&corge=
 */
console.log(
  querystring.stringify({ foo: "bar", baz: ["qux", "quux"], corge: "" })
);
```

### 处理接受到的 GETorPOST 数据

- GET:获取数据。数据放在 HTTP 请求 Header 中，通过 URL 进行传递
- POST:发送数据。数据放在 HTTP 请求 body 中，容量大。
- Nodejs 自带的 url 和 querystring 模块处理接收到的 GET 数据
- 通过 request 的 data 事件获取每次传输的数据，在 end 事件调用时处理所有获取的数据

```js 页面触发GET获取角色及指定角色信息，POST新增角色
const http = require("http"); // 内置 http模块

const HOST = "localhost"; // 域
const PORT = "1111"; // 端口号

const fs = require("fs"); // 内置 文件系统
// 解析和格式化 URL 查询字符串
const querystring = require("querystring");
const url = require("url");

// JSON文件路径
const fileJSON = "D:/Git/Lokavit/Satya/Concept/role/roleback.json";

/**
 * 创建一个服务器
 * requset:请求体
 * response:响应体
 */
const server = http.createServer((request, response) => {
  // 在 request对象中，可以获取请求URL，通过URL判断请求的资源
  console.log(`请求的URL:${request.url}`); // URL:/
  console.log("请求方式：", request.method); // GET
  let path = ""; // 路径
  let postData = {}; // 存储 处理接收到的POST数据

  if (request.method == "POST") {
    console.log("POST请求");
    path = request.url;
    let bufferArray = []; // 用于存储data事件获取的Buffer数据
    request.on("data", (buffer) => {
      bufferArray.push(buffer); // 将buffer数据存储在数据中
    });
    // 注：必须调用该方法结束请求，否则前端一直处于等待状态，亦可向前端返回数据
    request.on("end", () => {
      // Buffer 类是一个全局变量，使用时无需 require('buffer').Buffer。
      // Buffer.concat方法用于合并Buffer数组。
      let buffer = Buffer.concat(bufferArray);
      // 已知Buffer数据只是字符串，则可以直接用toString将其转换成字符串。
      postData = JSON.parse(buffer.toString());
      console.log("处理接受到的POST数据:", postData);
    });
  }

  if (request.method == "GET") {
    console.log("GET请求");
    // 使用url.parse解析get数据
    const { pathname, query } = url.parse(request.url, true);
    path = pathname;
    get = query;
    if (path == "/") {
      console.log("非 /create");
      path += "index.html"; // 指向 index.html
      fs.readFile(`.${path}`, (error, data) => {
        if (error) response.writeHead(400);
        // 向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起
        else response.write(data);
        // 注：必须调用该方法结束请求，否则前端一直处于等待状态，亦可向前端返回数据
        response.end();
      });
    }
  }

  // 获取单个角色信息
  if (path == "/getrole/satya") {
    console.log("获取单个角色信息 PATH:", path);

    /** 读取JSON
     * 参数一：读取的文件路径
     * 参数二：回调函数。其中参数一为error对象(为null表示成功)，参数二为数据(可为<string>|<Buffer>)
     */
    // fs.readFile(`./${request.url}`, (error, data) => {
    fs.readFile(fileJSON, (error, data) => {
      if (error) {
        // 若读取错误，则向前端返回404状态码，以及内容 Not Found
        response.writeHead(404);
        response.write("Not Found");
        console.log(`文件读取失败:${error}`);
        // 注：必须调用该方法结束请求，否则前端一直处于等待状态，亦可向前端返回数据
        response.end();
      } else {
        const roles = JSON.parse(data.toString());
        console.log("读取JSON的数据结果：", roles);

        const temp = roles.find((item) => item.name == "satya");
        console.log("TEMP:", temp);

        // 写入响应头
        response.writeHead(200, {
          // 内容类型: 指定字符编码，防止乱码
          "Content-Type": "text/plain;charset=utf-8",
        });
        // 向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起
        // 把读取到的JSON文件内容写入响应。必须转换
        response.write(JSON.stringify(temp));
        response.end();
      }
    });
  }

  // 获取角色数据集
  if (path == "/getrole") {
    console.log("获取所有角色,PATH：", path);
    // 读取JSON
    fs.readFile(fileJSON, (error, data) => {
      if (error) {
        // 若读取错误，则向前端返回404状态码，以及内容 Not Found
        response.writeHead(404);
        response.write("Not Found");
        console.log(`文件读取失败:${error}`);
        response.end();
      } else {
        const roles = JSON.parse(data.toString());
        console.log("读取JSON的数据结果：", roles);
        // 写入响应头
        response.writeHead(200, {
          // 内容类型: 指定字符编码，防止乱码
          "Content-Type": "text/plain;charset=utf-8",
        });
        // 把读取到的JSON文件内容写入响应。必须转换
        response.write(JSON.stringify(roles));
        response.end();
      }
    });
  }

  // 创建角色 POST提交过来
  if (path == "/create") {
    console.log("PATH:", path);

    // 读取JSON
    fs.readFile(fileJSON, (error, data) => {
      if (error) {
        // 若读取错误，则向前端返回404状态码，以及内容 Not Found
        response.writeHead(404);
        response.write("Not Found");
        console.log(`文件读取失败:${error}`);
        response.end();
      } else {
        const roles = JSON.parse(data.toString());
        console.log("读取JSON的数据结果：", roles);

        // 从读取的JSON中，遍历判断是否有重复名字的对象
        const nameIndex = roles.findIndex((item) => {
          return postData.name === item.name;
        });
        if (nameIndex > 0) {
          // 写入响应头
          response.writeHead(200, {
            // 内容类型: 指定字符编码，防止乱码
            "Content-Type": "text/plain;charset=utf-8",
          });
          // 把读取到的JSON文件内容写入响应。必须转换
          response.write(
            JSON.stringify({
              msg: "角色名重复",
            })
          );
          response.end();
        } else {
          roles.push(postData); // 前台来的数据，加到 数据集中,用于写入JSON文件
          /**
           * 向文件写入信息，若文件不存在，则自动创建。 把JSON以字符串形式写入
           * 参数一：写入的文件路径
           * 参数二：写入内容(可为<string> | <Buffer> | <TypedArray> | <DataView>)
           * 参数三：回调函数，传入数据为error对象，其为null表示成功。
           */
          fs.writeFile(fileJSON, JSON.stringify(roles), (error) => {
            if (error) {
              response.writeHead(404);
              response.write("Not Found");
              console.log(`文件写入失败:${error}`);
              response.end();
            } else {
              // 写入响应头
              response.writeHead(200, {
                // 内容类型: 指定字符编码，防止乱码
                "Content-Type": "text/plain;charset=utf-8",
              });
              // 把读取到的JSON文件内容写入响应。必须转换
              response.write(
                JSON.stringify({
                  msg: "写入成功",
                })
              );
              console.log(`文件写入成功`);
              response.end();
            }
          });
        }
      }
    });
  }
});

// 开启监听
server.listen(PORT, () => {
  console.log(`服务器启动成功:${HOST}:${PORT}`);
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>页面触发GET角色，GET指定角色，POST新建角色</title>
  </head>

  <body>
    名字：<input type="text" name="name" id="name" /><br />
    信息：<input type="text" name="info" id="info" /><br />
    <input type="button" value="新增" id="create" />
    <input type="button" value="获取" id="getrole" />
    <input type="button" value="获取单个角色" id="getroleinfo" />

    <p id="roles"></p>
    <p id="roles_info"></p>

    <script>
      // 获取单个角色
      document
        .querySelector("#getroleinfo")
        .addEventListener("click", async function () {
          let name = "satya";
          const response = await fetch(`/getrole/${name}`);
          const result = await response.json();
          console.log("单个角色信息：", result);
          // 获取单个角色信息， 将其显示在 p标签区域
          let roleShow = document.querySelector("#roles_info");
          roleShow.innerHTML = JSON.stringify(result);
        });
      // 获取所有角色信息
      document
        .querySelector("#getrole")
        .addEventListener("click", async function () {
          // const response = await fetch(`/getrole?name=${document.querySelector('#name').value}&info=${document.querySelector('#info').value}`)
          // 获取当前所有角色
          const response = await fetch(`/getrole`);
          const result = await response.json();

          // 测试获取角色信息， 将其显示在 p标签区域
          let roleShow = document.querySelector("#roles");
          roleShow.innerHTML = JSON.stringify(result);
          console.log(result);
        });
      // 登录
      document
        .querySelector("#create")
        .addEventListener("click", async function () {
          const response = await fetch(`/create`, {
            method: "POST",
            body: JSON.stringify({
              name: document.querySelector("#name").value,
              info: document.querySelector("#info").value,
            }),
          });
          const result = await response.json();
          console.log(result);
          alert(result.msg);
        });
    </script>
  </body>
</html>
```

> #### 服务器需具备的基本功能
>
> - 响应请求。根据客户端请求做出回应，如返回静态文件
> - 数据交互。定义接口，客户端根据接口，与服务端进行数据交互。
> - - 如:在购物流程中，客户端向服务端请求商品数据，展现给客户，客户购买时，客户端将购买的商品信息发送给服务端处理。
> - 数据库。对数据库中存储的数据进行读写操作。

### http 和 fs 读取写入指定 JSON 文件

```js
const http = require("http"); // 内置 http模块

const HOST = "localhost"; // 域
const PORT = "1111"; // 端口号

const fs = require("fs"); // 内置 文件系统

// 待写入数据
let newRole = {
  name: "Satya",
  info: "详情",
};

// JSON文件路径
const fileJSON = "D:/Git/Lokavit/Satya/Concept/role/roleback.json";

/**
 * 创建一个服务器
 * requset:请求体
 * response:响应体
 */
const server = http.createServer((request, response) => {
  // 读取JSON
  fs.readFile(fileJSON, (error, data) => {
    if (error) {
      // 若读取错误，则向前端返回404状态码，以及内容 Not Found
      response.writeHead(404);
      response.write("Not Found");
      console.log(`文件读取失败:${error}`);
      response.end();
    } else {
      const roles = JSON.parse(data.toString());
      console.log("读取JSON的数据结果：", roles);
      // // 写入响应头
      // response.writeHead(200, {
      //     // 内容类型: 指定字符编码，防止乱码
      //     'Content-Type': "text/plain;charset=utf-8",
      // })
      // // 把读取到的JSON文件内容写入响应。必须转换
      // response.write(JSON.stringify(roles));
      // response.end();

      roles.push(newRole);
      // 把JSON以字符串形式写入
      fs.writeFile(fileJSON, JSON.stringify(roles), (error) => {
        if (error) {
          response.writeHead(404);
          response.write("Not Found");
          console.log(`文件写入失败:${error}`);
          response.end();
        } else {
          // 写入响应头
          response.writeHead(200, {
            // 内容类型: 指定字符编码，防止乱码
            "Content-Type": "text/plain;charset=utf-8",
          });
          response.write(
            JSON.stringify({
              msg: "写入成功",
            })
          );
          console.log(`文件写入成功`);
          response.end();
        }
      });
    }
  });
});

// 开启监听
server.listen(PORT, () => {
  console.log(`服务器启动成功:${HOST}:${PORT}`);
});
```

### 结合 http 和 fs 实现简易服务器

- 创建 index.html。读取本地指定文件夹中图片到页面
- 达到在浏览器访问 1.html;读取到 01/1.html,由 HTML 文件发起对 01/zl.jpg 的请求;网页显示 HTML 内容和图片
- **注**:此处读到的是 1.html 文件 ，而非 zl.jpg。jpg 由 HTML 文件自主发起。

```js
const http = require("http"); // 内置 http模块
const fs = require("fs"); // 内置 文件系统
const HOST = "localhost"; // 域
const PORT = "1111"; // 端口号
/**
 * 创建一个服务器
 * requset:请求体
 * response:响应体
 */
const server = http.createServer((request, response) => {
  // 在 request对象中，可以获取请求URL，通过URL判断请求的资源
  console.log(`请求的URL:${request.url}`);
  /**
   * 参数一：读取的文件路径
   * 参数二：回调函数。其中参数一为error对象(为null表示成功)，参数二为数据(可为<string>|<Buffer>)
   */
  fs.readFile(`./01${request.url}`, (error, buffer) => {
    if (error) {
      // 若读取错误，则向前端返回404状态码，以及内容 Not Found
      response.writeHead(404);
      response.write("Not Found");
      console.log(`文件读取失败:${error}`);
    }
    // 若需要传输给浏览器可以直接用Buffer,机器之间通信是直接用Buffer数据。
    else {
      response.write(buffer);
      console.log(`文件读取成功`);
    }
    response.end(); // 关闭链接
  });
});

// 开启监听
server.listen(PORT, () => {
  console.log(`服务器启动成功:${HOST}:${PORT}`);
});
```

### FileSystem 文件系统

- 异步文件读取 fs.readFile、异步文件写入 fs.writeFile、同步文件读取 fs.readFileSync、同步文件写入 fs.writeFileSync。由于同步可能造成阻塞，通常使用异步操作。
- **注**:两者同在，根据输出结果可见，先执行读取，后执行写入

```js
const fs = require("fs"); // 内置 文件系统

let text = "被写入内容"; // 待写入的内容
/**
 * 向文件写入信息，若文件不存在，则自动创建。
 * 参数一：写入的文件路径
 * 参数二：写入内容(可为<string> | <Buffer> | <TypedArray> | <DataView>)
 * 参数三：回调函数，传入数据为error对象，其为null表示成功。
 */
fs.writeFile("./temp.txt", text, (error) => {
  if (error) console.log(`文件写入失败:${error}`);
  else console.log(`文件写入成功`); // 内中结果为 [object Object]
});

/**
 * 参数一：读取的文件路径
 * 参数二：回调函数。其中参数一为error对象(为null表示成功)，参数二为数据(可为<string>|<Buffer>)
 */
fs.readFile("./temp.txt", (error, data) => {
  if (error) console.log(`文件读取失败:${error}`);
  // 此处确定读取的为字符串，可直接用toString()将Buffer转为字符串
  // 若需要传输给浏览器可以直接用Buffer,机器之间通信是直接用Buffer数据。
  else console.log(`文件读取成功`, data.toString());
});
```

### 简易启动服务器

```js
const http = require("http"); // 内置 http模块
const childProcess = require("child_process"); // 内置模块，用于设置默认浏览器打开URL

const HOST = "localhost"; // 域
const PORT = "1111"; // 端口号

/**
 * 创建一个服务器
 * request:请求体
 * response:响应体
 */
const server = http.createServer((request, response) => {
  console.log(`状态码:${response.statusCode}`);
  // 写入响应头
  response.writeHead(200, {
    // 内容类型: 指定字符编码，防止乱码
    "Content-Type": "text/plain;charset=utf-8",
  });
  // 向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起
  response.write("写入");
  // 注：必须调用该方法结束请求，否则前端一直处于等待状态，亦可向前端返回数据
  response.end("响应内容");
});

// 开启监听
server.listen(PORT, () => {
  console.log(`服务器启动成功:${HOST}:${PORT}`);
  // 使用默认浏览器打开
  childProcess.exec(`start http://${HOST}:${PORT}/`);
});
```

## 合并 GET 和 POST 获取数据的方法

```js 改造版
```

```js 基础版
const http = require("http"); // http模块
const fs = require("fs"); // 文件系统
const url = require("url"); // url
const path = require("path"); // 路径

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 端口号

/**
 * 创建 路由对象 。
 */
const routes = {
  /**
   * 创建字段为 '/get' 的方法
   * 用于稍后处理GET方式提交过来的数据。后续操作亦在内中
   * 如：传数据给其他静态页面，或把数据存储到数据库
   */
  "/get": (request, response) => {
    let name = request.query.name;
    let age = request.query.age;
    //设置响应的头部。状态值 content-Type 响应数据内容的类型
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    response.end(`Name:${name},Age:${age}`);
  },
  /**
   * 创建字段为 '/post'的方法
   * 用于稍后处理POST方式提交过来的数据，后续操作亦在内中
   * 如：传数据给其他静态页面，或把数据存储到数据库
   */
  "/post": (request, response) => {
    let obj = {};
    request.msg.split("&").forEach((item, index) => {
      obj[item.split("=")[0]] = item.split("=")[1];
    });
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    // response.end(`Name:${obj.name},Age:${obj.age}`);
    response.end(JSON.stringify(obj)); // 写入响应内容 (该内容输出在了页面上)
  },
};

/**
 * http模块提供了createServer函数,这个函数会返回一个对象，将返回的对象赋值给server。
 * request:接收到的数据
 * response:响应数据
 */
const server = http.createServer((request, response) => {
  /**
   * request.url请求的链接（这里输出的是/index.html）
   * url.parse方法，解析请求的url，解决链接"\"和"/"的差异问题。
   * 解析后的request.url是个对象。
   */
  const pathObj = url.parse(request.url, true);

  /**
   * 处理路由的代码
   * 通过 [pathObj.pathname] 获取到请求链接的url,
   * 然后再 routes对象中寻找是否存在这个“字段”,
   */
  const handleFn = routes[pathObj.pathname];
  // 如果有，该字段方法赋值给handleFn
  if (handleFn) {
    // 通过pathObj.query获取到从get方式提交过来的数据，并执行该方法
    // 获取 从GET方式提交过来的数据
    request.query = pathObj.query;

    // 通过 data书简，获取到从post方式持续提交过来的数据
    let msg = "";
    // request 的监听方法 data ,chunk为Buffer
    request
      .on("data", (chunk) => {
        msg += chunk; // 拼接获取到的后数据
      })
      // 等到数据接收完之后，end 事件触发
      .on("end", () => {
        // 数据接收完触发
        request.msg = msg; // MSG:name=Sayta&age=15
        handleFn(request, response);
      });
  } else {
    // 如果找不到字段，就查找静态文件
    /**
     * __dirname是全局变量,可以直接获取。表示当前执行脚本所在的目录。（这里是D:\Git\……）
     * path.join方法，拼接目录地址
     * staticPath拼接后的目录地址，为了跳到自己项目所在那个目录。（这里是D:\Git\……\view）
     */
    const staticPath = path.join(__dirname, "view");
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
  }
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

## 处理前端提交的 POST 请求

```js
const http = require("http"); // http模块
const fs = require("fs"); // 文件系统
const url = require("url"); // url
const path = require("path"); // 路径

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 端口号

/**
 * 创建 路由对象 。
 */
const routes = {
  /**
   * 创建字段为 '/get' 的方法
   * 用于稍后处理GET方式提交过来的数据。后续操作亦在内中
   * 如：传数据给其他静态页面，或把数据存储到数据库
   */
  "/get": (request, response) => {
    //设置响应的头部。状态值 content-Type 响应数据内容的类型
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    let name = request.query.name;
    let age = request.query.age;
    response.end(`Name:${name},Age:${age}`);
  },
  /**
   * 创建字段为 '/post'的方法
   * 用于稍后处理POST方式提交过来的数据，后续操作亦在内中
   * 如：传数据给其他静态页面，或把数据存储到数据库
   */
  "/post": (request, response) => {
    let obj = {};
    request.msg.split("&").forEach((item, index) => {
      obj[item.split("=")[0]] = item.split("=")[1];
    });
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    response.end(`Name:${obj.name},Age:${obj.age}`);
  },
};

/**
 * http模块提供了createServer函数,这个函数会返回一个对象，将返回的对象赋值给server。
 * request:接收到的数据
 * response:响应数据
 */
const server = http.createServer((request, response) => {
  /**
   * request.url请求的链接（这里输出的是/index.html）
   * url.parse方法，解析请求的url，解决链接"\"和"/"的差异问题。
   * 解析后的request.url是个对象。
   */
  const pathObj = url.parse(request.url, true);

  /**
   * 处理路由的代码
   * 通过 [pathObj.pathname] 获取到请求链接的url,
   * 然后再 routes对象中寻找是否存在这个“字段”,
   */
  const handleFn = routes[pathObj.pathname];
  // 如果有，该字段方法赋值给handleFn
  if (handleFn) {
    // 通过pathObj.query获取到从get方式提交过来的数据，并执行该方法
    // // 获取 从GET方式提交过来的数据
    // request.query = pathObj.query;
    // handleFn(request, response);

    // 通过 data书简，获取到从post方式持续提交过来的数据
    let msg = "";
    // request 的监听方法 data ,chunk为Buffer
    request
      .on("data", (chunk) => {
        msg += chunk; // 拼接获取到的后数据
      })
      // 等到数据接收完之后，end 事件触发
      .on("end", () => {
        // 数据接收完触发
        request.msg = msg; // MSG:name=Sayta&age=15
        handleFn(request, response);
      });
  } else {
    // 如果找不到字段，就查找静态文件
    /**
     * __dirname是全局变量,可以直接获取。表示当前执行脚本所在的目录。（这里是D:\Git\……）
     * path.join方法，拼接目录地址
     * staticPath拼接后的目录地址，为了跳到自己项目所在那个目录。（这里是D:\Git\……\view）
     */
    const staticPath = path.join(__dirname, "view");
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
  }
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

## 处理前端提交的 GET 请求

- 运行服务器，输入内容，点击提交，可见效果

```js
const http = require("http"); // http模块
const fs = require("fs"); // 文件系统
const url = require("url"); // url
const path = require("path"); // 路径

const HOST = "127.0.0.1"; // http://127.0.0.1
const PORT = 1113; // 端口号

/**
 * 创建 路由对象 。
 */
const routes = {
  /**
   * 创建字段为 '/get' 的方法
   * 用于稍后处理GET方式提交过来的数据。后续操作亦在内中
   * 如：传数据给其他静态页面，或把数据存储到数据库
   */
  "/get": (request, response) => {
    //设置响应的头部。状态值 content-Type 响应数据内容的类型
    response.writeHead(200, {
      "Content-Type": "text-plain; charset=utf-8",
    });
    let name = request.query.name;
    let age = request.query.age;
    response.end(`Name:${name},Age:${age}`);
  },
};

/**
 * http模块提供了createServer函数,这个函数会返回一个对象，将返回的对象赋值给server。
 * request:接收到的数据
 * response:响应数据
 */
const server = http.createServer((request, response) => {
  /**
   * request.url请求的链接（这里输出的是/index.html）
   * url.parse方法，解析请求的url，解决链接"\"和"/"的差异问题。
   * 解析后的request.url是个对象。
   */
  const pathObj = url.parse(request.url, true);

  /**
   * 处理路由的代码
   * 通过 [pathObj.pathname] 获取到请求链接的url,
   * 然后再 routes对象中寻找是否存在这个“字段”,
   * 如果有，该字段方法赋值给handleFn
   * 通过pathObj.query获取到从get方式提交过来的数据，并执行该方法
   */
  const handleFn = routes[pathObj.pathname];
  if (handleFn) {
    // 获取 从GET方式提交过来的数据
    request.query = pathObj.query;
    handleFn(request, response);
  } else {
    // 如果找不到字段，就查找静态文件
    /**
     * __dirname是全局变量,可以直接获取。表示当前执行脚本所在的目录。（这里是D:\Git\……）
     * path.join方法，拼接目录地址
     * staticPath拼接后的目录地址，为了跳到自己项目所在那个目录。（这里是D:\Git\……\view）
     */
    const staticPath = path.join(__dirname, "view");
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
  }
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

## 搭建可访问本地文件的服务器

```js 异步读取
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

```js 同步读取
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
  /**
   * 从解析后的对象中获取到pathname(这里pathObj.pathname是/index.html)
   * path.join方法，拼接完整项目目录地址。
   */
  const filePath = path.join(staticPath, pathObj.pathname);
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

## 搭建本地服务器

- 简易版

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

---

## fileDisplay

- 递归遍历文件夹中所有文件

```js
const path = require("path"); // 路径
const fs = require("fs"); // 文件系统
// 一个路径或路径片段解析成一个绝对路径，返回解析后的路径字符串
const filePath = path.resolve("src"); // 本地文件，从根盘符至指定文件夹的绝对路径
const pathDist = "./dist"; // 编译完输出的html文件的文件夹

fileDisplay(filePath); //

/**
 * 使用递归实现遍历文件夹中所有文件
 * @param {*} filePath 需遍历的文件夹
 */
function fileDisplay(filePath) {
  // 读取目录下面的文件，返回目录下的文件列表对象，如果传入的是个文件，返回这个文件
  fs.readdir(filePath, (err, files) => {
    if (err) return;
    files.forEach((filename) => {
      // 获取当前文件的绝对路径 ，本地的话，针对于磁盘
      let fileDir = path.join(filePath, filename);
      // 根据文件路径，获取文件信息，返回一个 fs.Stats对象
      fs.stat(fileDir, (error, stats) => {
        if (error) return;
        // 如果是文件夹，继续向下遍历
        if (stats.isDirectory()) {
          // 过滤掉 include 文件夹 不处理
          if (fileDir.includes("include")) return;
          fileDisplay(fileDir); // 调用递归，继续向下遍历文件夹及文件
        }
        // 如果是文件， 需要进行某些操作
        if (stats.isFile()) {
          // 处理文件名，剩下文件扩展名，含句点 , 找出 .html文件
          if (path.extname(filename) == ".html") {
            compileHTML(fileDir, filename, filePath, pathDist);
          }
          if (path.extname(filename) == ".css") {
            console.log("CSS文件");
          }
          if (path.extname(filename) == ".js") {
            console.log("JS文件");
          }
        }
      });
    });
  });
}
```

## compileHTML

- 可指定过滤文件夹，可分辨处理逻辑

```js
/** 文件结构示例
 * 源代码: src/views/demo.html  src/views/include/header.html
 * 编译后: dist/views/demo.html
 */
```

```js
/**
 * 编译HTML文件 (如在每个有 import页面，加上 header.html和footer.html)
 * @param {*} fileDir 当前文件绝对路径
 * @param {*} filename 文件名，带后缀名
 * @param {*} src 相对路径 [src]源码
 * @param {*} dist  输出文件时，所需的根路径[docs/dist]
 */
function compileHTML(fileDir, filename, src, dist) {
  // 读取文件  readFile带有回调 ，readFileSync 不带回调
  fs.readFile(fileDir, "utf-8", (err, data) => {
    let dataReplace = data.replace(
      /<link\srel="import"\shref="(.*)">/gi,
      (matchs, m1) => {
        // 返回读取的文件内容
        return fs.readFileSync(path.join(src, m1), "utf-8");
      }
    );
    fs.writeFile(dist + "/views/" + filename, dataReplace, "utf-8", (err) => {
      if (err) return console.log("文件写入错误 ERROR:", err);
    });
  });
}
```

## Server

- 因为 Chrome 的 CORS 问题，所以使用 Nodejs 本地启一个服务来解决

```js
/**
 * run.js 使用: $ node run 启动，点击url
 */
const fs = require("fs"); // 文件系统
const http = require("http"); // HTTP
const path = require("path"); // 路径

const HOST = "http://localhost"; // http://127.0.0.1
const POST = 1111; // 端口号

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
