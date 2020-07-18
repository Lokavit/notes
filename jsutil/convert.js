/*
 * @Author: Satya
 * @Date: 2020-06-28 09:45:22
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-18 22:37:48
 * doc:类型转换
 */

/**
 * 样式对象转string形式
 * @param {*} styleObj 传入的样式对象数据
 * 如：{height:360,width:480} 转换为 height:360px;width:480px
 * @returns 字符串
 */

const Convert = function () {};

Convert.StyleToString = (styleObj) => {
  let str = "";
  for (let i = 0; i < Object.entries(styleObj).length; i++) {
    // 如果 某一key:value转为的数组长度不等于2
    if (Object.entries(styleObj)[i].length != 2) return;
    str +=
      Object.entries(styleObj)[i][0] +
      ":" +
      Object.entries(styleObj)[i][1] +
      "px;";
  }
  return str;
};

export default Convert;
