# jsutil
`javascript library`

## 规范
- 函数式编程，类编程
- 文件名:全小写-全小写
- 类名函数名模块名:单词首字母大写
- 外部使用:Commonjs.模块名
- const 全大写_全大写
- let 全小写_全小写

```bash
$ npm link # 将该库链接至全局，便于任何项目中使用
```

## TODO

- [x] Aria 前缀
- [x] Colour 颜色处理
- [x] Coordinate 坐标位置处理
- [x] userAgent 媒介确认

- [] math 数字处理




```js
/* m 起始点(x y) 如：startX=300;startY=27.27
a 的参数：
rx x半径
ry y半径
x-axis-rotation x轴旋转角度
large-arc-flag 1,表示大角弧度，大于180度；0,表示小角弧度，小于180度。
sweep-flag 1,表示从起点到终点绕中心顺时针方向；0,表示逆时针方向。
x 弧线终点x坐标
y 弧线终点y坐标
比如，a的rx ry值为(startX-startY)
*/

function drawAWACurve () {
    var AWA = +this.model.get('AWA');
    var sweepFlag = AWA >= 0 ? 1 : 0; //1 顺时针，0逆时针
    var deg = Math.abs(AWA);
    var startX = 300; var startY = 27.27;
    var r = 272.73;
    var x = 0, y = 0; //终点坐标
    // 计算终点的坐标 deg是角度,Math.sin(arc) arc = 2Math.PI / 360
    var arc = Math.sin(2 * Math.PI / 360 * deg);
    if (sweepFlag == 1) {
        x = startX + r * Math.sin(2 * Math.PI / 360 * deg);
        y = startY + r - r * Math.cos(2 * Math.PI / 360 * deg);
    } else {
        x = startX - r * Math.sin(2 * Math.PI / 360 * deg);
        y = startY + r - r * Math.cos(2 * Math.PI / 360 * deg);
    }
    var d = 'M' + startX + ' ' + startY + ' A' + r + ' ' + r + ' 0 0 ' + sweepFlag + ' ' + x + ' ' + y + ' ';
    var id = this.config.panelId + '_AWACurve';
    var pathNode = SVG.get('#' + id);
    if (!pathNode) { return; }
    var color = sweepFlag == 1 ? 'lime' : 'red';
    pathNode.attr({ 'd': d });
    pathNode.animate(700, '<>').attr({ 'stroke': color });
},
```


```js

/**
 * 生成uid时，可用的字符
 */
const SOUP =
  "!#%()*+,-./:;=?@[]^_`{|}~" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * 生成UID函数
 * @returns 生成的uid
 */
export function GenerateUID() {
  let id = [];
  for (let i = 0; i < 20; i++) {
    id[i] = SOUP.charAt(Math.random() * SOUP.length);
  }
  return id.join("");
}

export const Add = () => {
  console.log("函数式编程");
};


import * as ConvertTypes from "./convert-types";
import * as Uid from "./uid";
import Colour from "./colour";

// // export const promise = new Promise((resolve, reject) => {
// //   console.log("promise");
// // });

// export default { ConvertTypes, Uid, Colour /** promise */ };

/** 此处一定是一个 function  */
export function TestDemo() {}
TestDemo.prototype = Object.create(null); // 无上层__proto__
// TestDemo.prototype = new Object(); // 带上层__proto__
// 输出:  ƒ TestDemo() {}
console.log("创建对象:", TestDemo);
TestDemo.prototype.ABC = "abc";
TestDemo.prototype.add = function (a, b) {
  console.log(a, b);
  return a + b;
};
/** 输出: __proto__内中包含以上prototype */
console.log("对象:", new TestDemo());

console.log("对象:", TestDemo);
```