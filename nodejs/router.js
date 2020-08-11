/*
 * @Author: Satya
 * @Date: 2020-08-11 17:07:14
 * @Last Modified by:   Satya
 * @Last Modified time: 2020-08-11 17:07:14
 */

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
