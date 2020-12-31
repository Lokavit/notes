```js
function draw() {
  var canvas = document.getElementById("tutorial");
  // 检查支持性
  if (canvas.getContext) {
    // getContext()用来获得渲染上下文和它的绘画功能.参数为上下文的格式
    var ctx = canvas.getContext("2d");
  }
}
```

栅格:原点左上角(0,0),实际元素距离原点 xy 轴用(x,y)

### 绘制矩形

```js
// x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸
fillRect(x, y, width, height); // 绘制填充矩形
strokeRect(x, y, width, height); // 绘制矩形边框
clearRect(x, y, width, height); // 清除指定矩形区域，让清除部分完全透明
// 绘制一个左上角坐标为（x,y），宽高为width以及height的矩形
rect(x, y, width, height);
```

### 绘制路径

- 创建起始点，画出路径，路径封闭，通过描边或填充路径区域来渲染图形

```js
beginPath(); // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
moveTo(x, y); // 移动笔触，笔尖一个点到另一个点的移动过程，将笔触移动到指定的坐标x以及y上
closePath(); // 闭合路径之后图形绘制命令又重新指向到上下文中。
stroke(); // 通过线条来绘制图形轮廓。
fill(); // 通过填充路径的内容区域生成实心的图形。
// 调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。
```

### 绘制线

```js
lineTo(x, y); // 绘制一条从当前位置到指定x以及y位置的直线。 x以及y ，代表坐标系中直线结束的点
```

### 绘制圆弧

```js
// 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成
// 该方法有六个参数：x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向
// arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式: 弧度=(Math.PI/180)*角度。
arc(x, y, radius, startAngle, endAngle, anticlockwise);
```

### 二次贝塞尔曲线及三次贝塞尔曲线

```js
// 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
quadraticCurveTo(cp1x, cp1y, x, y);
// 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

### Path2D 对象

- 用来缓存或记录绘画命令，能快速地回顾路径
- Path2D()会返回一个新初始化的 Path2D 对象
- 所有的路径方法比如 moveTo, rect, arc 或 quadraticCurveTo 等，皆可在 Path2D 中使用
- Path2D API 添加了 addPath 作为将 path 结合起来的方法

```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
// 添加了一条路径到当前路径（可能添加了一个变换矩阵）
Path2D.addPath(path [, transform])​
```

### Colors 色彩

- fillStyle = color 设置图形的填充颜色
- strokeStyle = color 设置图形轮廓的颜色。
- globalAlpha = transparencyValue 在需要绘制大量拥有相同透明度的图形时候相当高效

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

### Line styles 线型

- lineWidth = value 设置线条宽度。
- lineCap = type 设置线条末端样式。
- lineJoin = type 设定线条与线条间接合处的样式。
- miterLimit = value 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
- getLineDash() 返回一个包含当前虚线样式，长度为非负偶数的数组。
- setLineDash(segments) 设置当前虚线样式。
- lineDashOffset = value 设置虚线样式的起始偏移量。

```js
ctx.lineWidth = 1 + i;
ctx.lineWidth = 15;
var lineCap = ["butt", "round", "square"];
ctx.lineCap = lineCap[i];
var lineJoin = ["round", "bevel", "miter"];
ctx.lineJoin = lineJoin[i];
ctx.setLineDash([4, 2]);
ctx.lineDashOffset = -offset; // var offset = 0;
```

### 绘制文本

```js
fillText(text, x, y [, maxWidth]) // 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
strokeText(text, x, y [, maxWidth]) // 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

// 当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。
font = value
// 文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
textAlign = value
// 基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
textBaseline = value
// 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
direction = value

```

### 变形

- save() 保存画布所有状态
- restore() 恢复画布状态
- 状态即当前画面应用的所有样式和变形的一个快照。

```js
// translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量
translate(x, y);
ctx.translate(10 + j * 50, 10 + i * 50);

// 旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值
rotate(angle);
ctx.rotate(); // 旋转

scale(x, y);
ctx.scale(3, 3); // 缩放 三倍大小
```

```html
<!-- <canvas id="tutorial2" width="150" height="150"></canvas>
    <canvas id="tutorial3" width="150" height="150"></canvas>
    <canvas id="tutorial4" width="150" height="150"></canvas>
    <canvas id="tutorial5" width="150" height="150"></canvas>
    <canvas id="tutorial6" width="150" height="150"></canvas>
    <canvas id="tutorial7" width="150" height="200"></canvas>
    <canvas id="tutorial8" width="150" height="150"></canvas>
    <canvas id="tutorial9" width="150" height="150"></canvas>
    <canvas id="tutorial10" width="150" height="150"></canvas>
    <canvas id="tutorial11" width="150" height="150"></canvas>
    <canvas id="tutorial12" width="150" height="150"></canvas>
    <canvas id="tutorial13" width="150" height="150"></canvas>
    <canvas id="tutorial14" width="150" height="150"></canvas> -->
<canvas id="linkLine" width="300" height="300"></canvas>
<canvas id="demo" width="300" height="300"></canvas>

<span id="demo15"></span>
```

```js
"use strict";

drawLinkLine();
drawTriangle();

    demoRotate(ctx) {
        /*
         * 绘制一个旋转图形的步骤：
         * 1、先平移坐标轴到图形的中心
         * 2、旋转坐标轴
         * 3、绘制图形( 需要注意，平移旋转之后，坐标体系变化，不能按照之前定好的坐标来绘制旋转图形 )
         * */

        // 正常情况下的参考矩形
        ctx.fillStyle = 'pink';
        ctx.fillRect(100, 100, 50, 50);

        // 平移到矩形的中心
        ctx.translate(125, 125);
        // 旋转坐标系
        ctx.rotate(Math.PI / 180 * 45);
        // 绘制图形
        ctx.fillStyle = 'blue';
        ctx.fillRect(-25, -25, 50, 50); //旋转一般让图形中心画在坐标轴原点上。(旋转会绕着图形中心旋转)
    }

/** 绘制箭头 */
    drawArrow(ctx) {
        ctx.beginPath();
        ctx.moveTo(310, 135);
        ctx.lineTo(350, 135);
        ctx.lineTo(350, 120);
        ctx.lineTo(370, 140);
        ctx.lineTo(350, 160);
        ctx.lineTo(350, 145);
        ctx.lineTo(310, 145);
        //context.lineTo(100,350);
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "#058";

        ctx.fill();
        ctx.stroke();
    }

    /** 绘制圆角矩形 */
    roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();

        ctx.lineWidth = 2;
        ctx.lineJoin = "round"
        ctx.fillStyle = "#333";
        ctx.strokeStyle = "#058";
        ctx.font = "16px serif";
        ctx.fillText('明文明文明文明文明文明文明文明文', 30, 50);
        ctx.textAlign="left"; // 文字起始位置[左中右]
        ctx.textBaseline= "middle"; // 文本基线
        ctx.stroke();
    }

            // 直角在右下
        // triangle.moveTo(125, 125);
        // triangle.lineTo(125, 65); // 右侧垂直线top点[距顶距左]
        // triangle.lineTo(65, 125); // 底边水平线左侧的点[距顶距左]

        // 直角在左上
        // triangle.moveTo(120, 120);
        // triangle.lineTo(120, 210);
        // triangle.lineTo(210, 120);
        // triangle.closePath(); // 闭合路径

/** 绘制连接线 */
function drawLinkLine() {
  let ctx = document.getElementById("linkLine").getContext("2d");

  //圆角矩形
  function roundRect(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    // ctx.arcTo(x + w, y + h, x, y + h, r);
    // ctx.arcTo(x, y + h, x, y, r);
    // ctx.arcTo(x, y, x + w, y, r);
    // ctx.closePath();
  }
  roundRect(100, 150, 100, 60, 10);
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "#058";

  ctx.stroke();
}

// arrow 箭头
// Triangle 三角
function drawTriangle() {
  let ctx = document.getElementById("demo").getContext("2d");
  let triangle = new Path2D();
  // 直角在右下
  // triangle.moveTo(125, 125);
  // triangle.lineTo(125, 65); // 右侧垂直线top点[距顶距左]
  // triangle.lineTo(65, 125); // 底边水平线左侧的点[距顶距左]

  // 指教在左上
  triangle.moveTo(12, 12);
  triangle.lineTo(12, 21);
  triangle.lineTo(21, 12);
  triangle.closePath(); // 闭合路径
  // ctx.rotate((Math.PI/180)*45);
  ctx.scale(3, 3); // 缩放
  ctx.stroke(triangle);
  // ctx.fill(triangle);
}

// //圆角矩形
// function roundRect(ctx, x, y, w, h, r) {
//     if (w < 2 * r) r = w / 2;
//     if (h < 2 * r) r = h / 2;
//     ctx.beginPath();
//     ctx.moveTo(x + r, y);
//     ctx.arcTo(x + w, y, x + w, y + h, r);
//     ctx.arcTo(x + w, y + h, x, y + h, r);
//     ctx.arcTo(x, y + h, x, y, r);
//     ctx.arcTo(x, y, x + w, y, r);
//     ctx.closePath();
// }

function draw14() {
  var ctx = document.getElementById("tutorial14").getContext("2d");

  ctx.beginPath();
  ctx.moveTo(10, 35);
  ctx.lineTo(50, 35);
  ctx.lineTo(50, 20);
  ctx.lineTo(70, 40);
  ctx.lineTo(50, 60);
  ctx.lineTo(50, 45);
  ctx.lineTo(10, 45);
  //context.lineTo(100,350);
  ctx.closePath();

  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "#058";

  ctx.fill();
  ctx.stroke();
}

function draw13() {
  var ctx = document.getElementById("tutorial13").getContext("2d");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      ctx.strokeStyle = "rgb(0," + Math.floor(255 - 42.5 * i) + "," + Math.floor(255 - 42.5 * j) + ")";
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
}

function draw12() {
  var ctx = document.getElementById("tutorial12").getContext("2d");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      ctx.fillStyle = "rgb(" + Math.floor(255 - 42.5 * i) + "," + Math.floor(255 - 42.5 * j) + ",0)";
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}

/*
在这个例子中，我们创造了一个矩形和一个圆。它们都被存为Path2D对象，后面再派上用场。随着新的Path2D API产生，几种方法也相应地被更新来使用Path2D对象而不是当前路径。在这里，带路径参数的stroke和fill可以把对象画在画布上。
 */
function draw11() {
  var canvas = document.getElementById("tutorial11");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}

function draw2() {
  var canvas = document.getElementById("tutorial2");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 55, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 55, 50);
  }
}

function draw3() {
  var canvas = document.getElementById("tutorial3");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}

function draw4() {
  var canvas = document.getElementById("tutorial4");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}

function draw5() {
  var canvas = document.getElementById("tutorial5");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
    ctx.stroke();
  }
}

function draw6() {
  var canvas = document.getElementById("tutorial6");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill(); // 填充，路径会自动闭合

    // 描边三角形
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath(); // 闭合路径
    ctx.stroke(); // 因为描边不会闭合路径
  }
}

function draw7() {
  var canvas = document.getElementById("tutorial7");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.beginPath();
        var x = 25 + j * 50; // x 坐标值
        var y = 25 + i * 50; // y 坐标值
        var radius = 20; // 圆弧半径
        var startAngle = 0; // 开始点
        var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
        var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}

function draw8() {
  var canvas = document.getElementById("tutorial8");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
  }
}

function draw9() {
  var canvas = document.getElementById("tutorial9");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
  }
}

function draw10() {
  var canvas = document.getElementById("tutorial10");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    roundedRect(ctx, 12, 12, 150, 150, 15);
    roundedRect(ctx, 19, 19, 150, 150, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    for (var i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }

    for (i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }

    for (i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

// 封装的一个用于绘制圆角矩形的函数.
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.stroke();
}
```
