/*
 * @Author: Satya
 * @Date: 2020-06-27 20:29:35
 * @Last Modified by: Satya
 * @Last Modified time: 2020-06-28 09:45:34
 * doc:
 */

const Colour = new Object();

/**
 * 解析字符串中的颜色. 规则如下:
 * .parse('red') -> '#ff0000'
 * .parse('#f00') -> '#ff0000'
 * .parse('#ff0000') -> '#ff0000'
 * .parse('0xff0000') -> '#ff0000'
 * .parse('rgb(255, 0, 0)') -> '#ff0000'
 * @param {string|number} str 某些CSS格式的颜色.
 * @return {?string} 包含颜色的十六进制表示形式的字符串；如果无法解析，则返回null.
 */
Colour.parse = function (str) {
  str = String(str).toLowerCase().trim();
  let hex = Colour.names[str];
  /** e.g. 'red' */
  if (hex) return hex;
  hex = str.substring(0, 2) == "0x" ? "#" + str.substring(2) : str;
  hex = hex[0] == "#" ? hex : "#" + hex;
  /** e.g. '#00ff88' */
  if (/^#[0-9a-f]{6}$/.test(hex)) return hex;
  /** e.g. '#0f8' */
  if (/^#[0-9a-f]{3}$/.test(hex))
    return ["#", hex[1], hex[1], hex[2], hex[2], hex[3], hex[3]].join("");

  let rgb = str.match(/^(?:rgb)?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (rgb) {
    // e.g. 'rgb(0, 128, 255)'
    let r = Number(rgb[1]);
    let g = Number(rgb[2]);
    let b = Number(rgb[3]);
    if (r >= 0 && r < 256 && g >= 0 && g < 256 && b >= 0 && b < 256)
      return Colour.rgbToHex(r, g, b);
  }
  return null;
};

/**
 * 将颜色从RGB转换为十六进制表示.
 * @param {number} r Amount of red, int between 0 and 255.
 * @param {number} g Amount of green, int between 0 and 255.
 * @param {number} b Amount of blue, int between 0 and 255.
 * @return {string} 颜色的十六进制表示.
 */
Colour.rgbToHex = function (r, g, b) {
  let rgb = (r << 16) | (g << 8) | b;
  if (r < 0x10) return "#" + (0x1000000 | rgb).toString(16).substr(1);

  return "#" + rgb.toString(16);
};

/**
 * 将十六进制颜色转换为RGB.
 * @param {string} colour 以任何颜色格式表示颜色的字符串('#ff0000', 'red', '0xff000', etc).
 * @return {!Array.<number>} RGB 颜色值.
 */
Colour.hexToRgb = function (colour) {
  let hex = Blockly.utils.colour.parse(colour);
  if (!hex) return [0, 0, 0];

  let rgb = parseInt(hex.substr(1), 16);
  let r = rgb >> 16;
  let g = (rgb >> 8) & 255;
  let b = rgb & 255;

  return [r, g, b];
};

/**
 * 将HSV三元组转换为十六进制表示形式.
 * @param {number} h Hue 色相值[0, 360].
 * @param {number} s Saturation 饱和度值[0, 1].
 * @param {number} v Value 明度[0, 255].
 * @return {string} 颜色的十六进制表示.
 */
Colour.hsvToHex = function (h, s, v) {
  let red = 0;
  let green = 0;
  let blue = 0;
  if (s == 0) {
    red = v;
    green = v;
    blue = v;
  } else {
    let sextant = Math.floor(h / 60); // 六分仪
    let remainder = h / 60 - sextant; // 余数
    let val1 = v * (1 - s);
    let val2 = v * (1 - s * remainder);
    let val3 = v * (1 - s * (1 - remainder));
    switch (sextant) {
      case 1:
        red = val2;
        green = v;
        blue = val1;
        break;
      case 2:
        red = val1;
        green = v;
        blue = val3;
        break;
      case 3:
        red = val1;
        green = val2;
        blue = v;
        break;
      case 4:
        red = val3;
        green = val1;
        blue = v;
        break;
      case 5:
        red = v;
        green = val1;
        blue = val2;
        break;
      case 6:
      case 0:
        red = v;
        green = val3;
        blue = val1;
        break;
    }
  }
  return Colour.rgbToHex(Math.floor(red), Math.floor(green), Math.floor(blue));
};

/**
 * 使用指定的因子将两种颜色混合在一起，以指示赋予第一种颜色的权重.
 * @param {string} colour1 第一种颜色.
 * @param {string} colour2 第二色.
 * @param {number} factor 赋予colour1高于colour2的权重。值范围[0, 1].
 * @return {?string} hex 组合颜色以十六进制表示.
 */
Colour.blend = function (colour1, colour2, factor) {
  let hex1 = Colour.parse(colour1);
  if (!hex1) return null;

  let hex2 = Colour.parse(colour2);
  if (!hex2) return null;

  let rgb1 = Colour.hexToRgb(hex1);
  let rgb2 = Colour.hexToRgb(hex2);
  let r = Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0]));
  let g = Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1]));
  let b = Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2]));
  return Colour.rgbToHex(r, g, b);
};

/**
 * W3C定义的16个基本颜色关键字的映射:
 * keys : 颜色的小写"可读"名
 * values : the "hex" values.
 * @type {!Object<string, string>}
 */
Colour.names = {
  aqua: "#00ffff",
  black: "#000000",
  blue: "#0000ff",
  fuchsia: "#ff00ff",
  gray: "#808080",
  green: "#008000",
  lime: "#00ff00",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  purple: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  teal: "#008080",
  white: "#ffffff",
  yellow: "#ffff00",
};

export default Colour;
