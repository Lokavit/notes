/*
 * @Author: Satya
 * @Date: 2020-08-11 17:07:58
 * @Last Modified by:   Satya
 * @Last Modified time: 2020-08-11 17:07:58
 * doc: 主文件。启动服务器
 */

const server = require("./server");
const router = require("./router");

server.start(router.route);
