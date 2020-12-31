/*
 * @Author: Satya
 * @Date: 2020-06-28 08:55:23
 * @Last Modified by: Satya
 * @Last Modified time: 2020-06-28 09:27:28
 * doc:坐标操作的实用方法
 */

/**
 * 表示坐标和位置
 * @param {*} x Left
 * @param {*} y Top
 */
const Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
};

/**
 * 比较坐标是否相等.
 * @param {Coordinate} a A Coordinate.
 * @param {Coordinate} b B Coordinate.
 * @return {boolean} 如果坐标相等或为空，则为真
 */
Coordinate.equals = function (a, b) {
  if (a == b) return true;

  if (!a || !b) return false;

  return a.x == b.x && a.y == b.y;
};

/**
 * 返回两个坐标之间的距离.
 * @param {!Coordinate} a A Coordinate.
 * @param {!Coordinate} b A Coordinate.
 * @return {number} a和b之间的距离.
 */
Coordinate.distance = function (a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * 返回坐标的大小.
 * @param {!Coordinate} a A Coordinate.
 * @return {number} 原点和`a'之间的距离.
 */
Coordinate.magnitude = function (a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};

/**
 * 返回两个坐标之间的差作为新坐标.
 * @param {!Coordinate|!SVGPoint} a An x/y coordinate.
 * @param {!Coordinate|!SVGPoint} b An x/y coordinate.
 * @return {!Coordinate} 表示“ a”和“ b”之间差异的坐标.
 */
Coordinate.difference = function (a, b) {
  return new Coordinate(a.x - b.x, a.y - b.y);
};

/**
 * 返回两个坐标的和作为新坐标.
 * @param {!Coordinate|!SVGPoint} a An x/y coordinate.
 * @param {!Coordinate|!SVGPoint} b An x/y coordinate.
 * @return {!Coordinate} 代表两个坐标之和的坐标.
 */
Coordinate.sum = function (a, b) {
  return new Coordinate(a.x + b.x, a.y + b.y);
};

/**
 * 按给定的比例因子缩放此坐标.
 * @param {number} s 用于x和y尺寸的比例因子.
 * @return {!Coordinate} 缩放后此坐标.
 */
Coordinate.prototype.scale = function (s) {
  this.x *= s;
  this.y *= s;
  return this;
};

/**
 * 用给定的偏移量平移此坐标.
 * @param {number} tx The value to translate x by.
 * @param {number} ty The value to translate y by.
 * @return {!Coordinate} 平移后的坐标.
 */
Coordinate.prototype.translate = function (tx, ty) {
  this.x += tx;
  this.y += ty;
  return this;
};

export default Coordinate;
