## 优化

- 在清除 DOM 节点内容时，更高效的做法永远是：textContent('');
- 按位操作符高效准确判断
- 样式放在 header 中，脚本放在</body>之前（最好的方式：使用动态创建 script 的方式加载，当动态创建 script，浏览器会分配一个线程去下载 src 指向的资源，多个 script 也是同步下载的）
- 查找元素:id 查找 > 样式类查找 > 属性查找
- 样式优先使用 .class
- 操作 dom 时，优先使用#id 及 dataset
- obj.name 比 obj.xxx.name 访问更快，访问属性的速度，与其在对象中的深度有关。[.]操作的次数直接影响着访问对象属性的耗时。

- 预解析 CDN 的地址的 DNS
- preload:对于当前页面很有必要的资源使用.对浏览器指示预先请求当前页需要的资源（关键的脚本，字体，主要图片）
- prefetch:对于可能在将来的页面中使用的资源使用.用户将来可能在其他部分（比如视图或页面）使用到的资源
- preload 和 prefetch 都被存储在 HTTP 缓存中

```html
<!-- 预解析CDN的地址的DNS  -->
<link rel="dns-prefetch" href="//example.com" />
<!-- 立刻开始下载main.js(不阻塞parser)，并放在内存中，但不会执行其中的JS语句 -->
<link rel="preload" href="/main.js" as="script" />
<!-- 浏览器会在空闲的时候，下载main.js, 并缓存到disk。当有页面使用的时候，直接从disk缓存中读取。其实就是把决定是否和什么时间加载这个资源的决定权交给浏览器。如果prefetch还没下载完之前，浏览器发现script标签也引用了同样的资源，浏览器会再次发起请求，这样会严重影响性能的，加载了两次，，所以不要在当前页面马上就要用的资源上用prefetch，要用preload。 -->
<link href="main.js" rel="prefetch" />

<!-- 首先，Parser在遇到head中preload时开始下载JS，读到script标签的时候，如果已经下载完了，直接按顺序执行之。如果没下载完，则会等到下载完再执行。这样就可以在刚进入页面时开始非阻塞的下载JS代码了。其次，页面会在空闲时，加载prefetch的JS，如果之后页面发生跳转，跳转的目标页面引入了prefetch.js，浏览器会直接从disk缓存中读取执行。将script标签依然放在</body>之前，并增加defer标签，确保老浏览器兼容，并在所有DOM元素解析完成之后执行其中的代码。 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Faster</title>
    <link rel="dns-prefetch" href="//cdn.com/" />
    <link rel="preload" href="//js.cdn.com/currentPage-part1.js" as="script" />
    <link rel="preload" href="//js.cdn.com/currentPage-part2.js" as="script" />
    <link rel="preload" href="//js.cdn.com/currentPage-part3.js" as="script" />

    <link rel="prefetch" href="//js.cdn.com/prefetch.js" />
  </head>
  <body>
    <script
      type="text/javascript"
      src="//js.cdn.com/currentPage-part1.js"
      defer
    ></script>
    <script
      type="text/javascript"
      src="//js.cdn.com/currentPage-part2.js"
      defer
    ></script>
    <script
      type="text/javascript"
      src="//js.cdn.com/currentPage-part3.js"
      defer
    ></script>
  </body>
</html>
```

## DOM 操作

- 增删改查
- - 尽量使用 DocumentFragment
- - 处理节点时可以使用 cloneNode()复制一份
- - 若要对 DOM 进行直接修改，请先将其 display:none;
- 指明操作 DOM 的 context[context.getElementsByTagName()]
- 拆分方法，一个方法解决一件事。

## Be Lazy（使脚本尽可能少地运行，或者不运行。）　　

- 短路表达式应用
- 基于事件去写相应的处理方法
- 惰性函数

## 流控制

- 在 if 语句中，将经常会发生的条件，放在靠上的位置
- if 的条件为连续的区间时，可以使用二分法的方式来拆分
- 较多离散值的判断，可以使用 switch 来替代
- 使用数组查询的方式
- 要注意隐式的类型转换
- 小心递归

## Reflow 回流

- 减少不必要的 DOM 深度。
- 精简 css，去除没有用处的 css
- 避免不必要的复杂的 css 选择符，尤其是使用子选择器，或消耗更多的 CPU 去做选择器匹配。
- 如果需要复杂的表现发声改变(动画效果),在流线外实现，使用绝对定位。

### 逻辑与 && 运算方式

- 如果逻辑与运算符左边的值布尔转换后为 true，那么返回右边的值（不管右边的值是真还是假）。
- 如果逻辑与运算符左边的值布尔转换后为 false，那么返回左边的值，
- 当逻辑与的左边为 null/NaN/undefined ，结果就会得到 null/NaN/undefined。

```js
let a = 5 && 6;
console.log(a); //返回的结果为 6

let a = false && 6;
console.log(a); //返回的结果为 false
```

### 逻辑或 || 运算方式

- 如果逻辑或运算符左边的值布尔转换后为 false，那么返回右边的值（不管右边的值是真还是假）。
- 如果逻辑或运算符左边的值布尔转换后为 true，那么返回左边的值。
- 如果两个操作数都是是 null（NaN/undefined），返回 null（NaN/undefined）

```js
let a = false || 6;
console.log(a); //返回的结果为 6

let a = true || 6;
console.log(a); //返回的结果为 true
```

### 短路表达式

- 作为逻辑表达式进行求值是从左到右，它们是为可能的“短路”的出现而使用以下规则进行测试：
- false && anything // 被短路求值为 false
- true || anything // 被短路求值为 true
- anything 部分不会被求值，所以这样做不会产生任何副作用。

```js
// 当val值<=0时，返回&&右边的值
val <= 0 && (val = 0); /* &&短路表达式写法 */
if (val <= 0) val = 0; /* 翻译以上代码 */

// 如果foo存在，值不变，否则把bar的值赋给foo
foo = foo || bar; /* 短路表达式写法 */
if (!foo) foo = bar; /* 翻译以上代码 */
if (!!foo)
  //更为严谨，!!可将其他类型的值转换为boolean类型

  // 求1+2+...+n的值,使用短路逻辑与运算+递归 写法
  function sum(n) {
    let result = n;
    result && (result += sum(n - 1));
    return result;
  }
console.log(sum(100));
```

```js
divUpdate.innerHTML = "";
for (var i = 0; i < 100; i++) {
  divUpdate.innerHTML += "<SPAN>This is a slower method! </SPAN>";
}
// 改为如下方式:
var str = "";
for (var i = 0; i < 100; i++) {
  str += "<SPAN>This is faster because it uses a string! </SPAN>";
}
divUpdate.innerHTML = str;
```

- DOM 样式类改变，减少不必要的操作

```js
var el = document.getElementById("mydiv");
el.style.borderLeft = "1px";
el.style.borderRight = "2px";
el.style.padding = "5px";

var el = document.getElementById("mydiv");
el.style.cssText = "border-left: 1px; border-right: 2px; padding: 5px;";
```

- 批量修改 DOM:从文档流摘除该元素,对其应用多重改变，将元素带回文档中

```js
// 具体方法:
// 1. 隐藏元素,进行修改，然后再显示它。
// 2.将原始元素拷贝到一个脱离文档的节点中，修改副本，然后覆盖原始元素。
```

## js 创建 DOM 节点

· crateAttribute(name)：　　　　　 　　用指定名称 name 创建特性节点
· createComment(text)：　　　　　　　创建带文本 text 的注释节点
· createDocumentFragment()：　　　　创建文档碎片节点
· createElement(tagname)：　　　　　 创建标签名为 tagname 的节点
· createTextNode(text)：　　　　　　 创建包含文本 text 的文本节点

### createDocumentFragment()，创建一个空白文档片段

- 非主 DOM 一部分。通常创建文档片段，将元素附加到文档片段，然后将文档片段加到 DOM 树，于树中，文档片段被其所有的子元素所代替。
- 因文档片段在内存中，将子元素插入到文档片段时不会引起页面回流。

```js
// 数据一万:[41,54,50],[47,53,53],[51,54,52]
// 数据五万:[109,134,97],[142,129,123],[99,137,123]
// 数据十万: [345,237,213],[312,243,214],[318,245,208]
// 经测试，单次操作元素达十万，优选使用[createDocumentFragment]
// 若单次操作元素在一万以下，区别不大。
```
