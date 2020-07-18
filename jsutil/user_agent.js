/*
 * @Author: Satya
 * @Date: 2020-06-25 19:50:55
 * @Last Modified by:   Satya
 * @Last Modified time: 2020-06-25 19:50:55
 * doc:获取浏览器，并对其做一些处理
 */

const UserAgent = new Object();

/** 获取浏览器请求头信息 */
UserAgent._rawUpper = navigator.userAgent.toUpperCase();

/**
 * 是否包含当前浏览器名
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

export default UserAgent;
