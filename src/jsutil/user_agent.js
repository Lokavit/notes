/*
 * @Author: Satya
 * @Date: 2020-06-25 19:50:55
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-30 14:36:58
 * doc:获取浏览器信息，并对其做一些处理
 * 当前浏览器
 * 当前操作系统
 */

const UserAgent = new Object();

/** 获取浏览器请求头信息 */
UserAgent._rawUpper = navigator.userAgent.toUpperCase();

/**
 * 是否包含当前指定字符串
 * @param {*} name
 */
UserAgent.has = function (name) {
  return UserAgent._rawUpper.indexOf(name.toUpperCase()) != -1;
};

/** Browsers 浏览器 */
/** IE */
UserAgent.IE = UserAgent.has("Trident") || UserAgent.has("MSIE");
/** EDGE 注意:Edge浏览器的请求头信息,缺少一个e */
UserAgent.EDGE = UserAgent.has("Edg");

UserAgent.JAVA_FX = UserAgent.has("JavaFX");

UserAgent.CHROME =
  (UserAgent.has("Chrome") || UserAgent.has("CriOS")) && !UserAgent.EDGE;

/** Engines 引擎 */
UserAgent.WEBKIT = UserAgent.has("WebKit") && !UserAgent.EDGE;
UserAgent.GECKO =
  UserAgent.has("Gecko") &&
  !UserAgent.WEBKIT &&
  !UserAgent.IE &&
  !UserAgent.EDGE;

/** Platforms 平台类 */
UserAgent.ANDROID = UserAgent.has("Android");
UserAgent.IPAD = UserAgent.has("iPad");
UserAgent.IPOD = UserAgent.has("iPod");
UserAgent.IPHONE =
  UserAgent.has("iPhone") && !UserAgent.IPAD && !UserAgent.IPOD;
UserAgent.MAC = UserAgent.has("Macintosh");
UserAgent.WINDOWS = UserAgent.has("WINDOWS");

/** Devices 设备 */
UserAgent.TABLET =
  UserAgent.IPAD ||
  (UserAgent.ANDROID && !UserAgent.has("Mobile")) ||
  UserAgent.has("Silk");
UserAgent.MOBILE =
  !UserAgent.TABLET &&
  (UserAgent.IPOD ||
    UserAgent.IPHONE ||
    UserAgent.ANDROID ||
    UserAgent.has("IEMobile"));

UserAgent.getOS = function (value) {
  let result = "";
  switch (value) {
    case value == UserAgent.WINDOWS:
      result = "WINDOWS NT 10.0; WIN64; X64";
      break;
    case value == UserAgent.MAC:
      result = "MAC X64";
      break;
    default:
      result = "未知操作系统";
      break;
  }
  return result;
};
