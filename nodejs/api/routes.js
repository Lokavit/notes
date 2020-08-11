/*
 * @Author: Satya
 * @Date: 2020-08-11 17:06:49
 * @Last Modified by:   Satya
 * @Last Modified time: 2020-08-11 17:06:49
 * doc:
 */
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
