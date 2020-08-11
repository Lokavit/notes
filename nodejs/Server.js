/*
 * @Author: Satya
 * @Date: 2020-08-11 17:07:37
 * @Last Modified by:   Satya
 * @Last Modified time: 2020-08-11 17:07:37
 */
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
