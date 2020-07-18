/*
 * @Author: Satya
 * @Date: 2020-06-30 18:33:48
 * @Last Modified by: Satya
 * @Last Modified time: 2020-06-30 18:40:44
 * doc: 关于dom的操作
 * 为指定元素添加/移除/检查指定类名
 */

const Dom = new Object();

/**
 * 为指定元素添加样式.
 * @param {!Element} element
 * @param {string} className
 * @return {boolean}
 */
Dom.addClass = function (element, className) {
  let classes = element.getAttribute("class") || "";
  if ((" " + classes + " ").indexOf(" " + className + " ") != -1) return false;
  if (classes) classes += " ";
  element.setAttribute("class", classes + className);
  return true;
};

/**
 * 为指定元素移除样式
 * @param {!Element} element
 * @param {string} className
 * @return {boolean}
 */
Dom.removeClass = function (element, className) {
  let classes = element.getAttribute("class");
  if ((" " + classes + " ").indexOf(" " + className + " ") == -1) return false;

  let classList = classes.split(/\s+/);
  for (let i = 0; i < classList.length; i++) {
    if (!classList[i] || classList[i] == className) {
      classList.splice(i, 1);
      i--;
    }
  }

  classList.length
    ? element.setAttribute("class", classList.join(" "))
    : element.removeAttribute("class");
  return true;
};

/**
 * 为指定元素检查是否有指定样式
 * @param {!Element} element
 * @param {string} className
 * @return {boolean}
 */
Dom.hasClass = function (element, className) {
  let classes = element.getAttribute("class");
  return (" " + classes + " ").indexOf(" " + className + " ") != -1;
};

export default Dom;
