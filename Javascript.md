# JavaScript

- [函数式编程入门经典](#函数式编程入门经典)
- - [纯函数](#纯函数)
- - [高阶函数](#高阶函数)
- - [数组的函数式编程](#数组的函数式编程)
- [Document](#Document)
- - [浏览器事件](#浏览器事件)
- [Class 类](#Class类)
- - [extends](#extends)
- - [super](#super)
- [destructuring 解构](#destructuring-解构)
- [Module](#Module)
- [Promise](#Promise)
- [AJAX](#AJAX)
- [Array 数组方法](#Array数组方法)
- [GitHub API](#GitHub)

### js module 的区别

- 未标记[type="module"]的 js 会优先且完整执行。
- 若皆标记[type="module"]则视为 js 模块，按照书写顺序执行。

```html
<script src="./recursion.js" type="module"></script>
<script src="./filter.js"></script>
```

```js IIFE 立即调用函数表达式
// 因IIFE是一个函数，函数会创建新的变量作用域，常用于声明不会影响IIFE外代码的变量
var a = 15;
(function IIFE(){
  var a = 11;
  console.log(a); // 11;
})();
console.log(a) // 15;

// 也可以是返回值形式
var x = (function IIFE{
  return 13;
})();
console.log(x) // 13;

```


```html
<body>
  <script>
    // 封装请求函数 返回请求结果
    function getData() {
      return fetch("http://xxx.xxx.xx.xx:1111/roles").then(result => result.json());
    }

    // 异步函数 return只能是promise 所以数据在内部处理
    async function fetchData() {
      let res = await getData();

      console.warn(res.content);

      let _div = document.createElement("div");
      _div.innerHTML = res.content;
      document.body.appendChild(_div);
    }

    // 调用异步函数
    fetchData();
  </script>
</body>
```

```js
var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  },
};
console.log(a == 1 && a == 2); //true
```

```js
/**
 * Normalize 8-bit color (RGB / RGBA) to [0, 1]. If A is missing, use 1.0.
 */
export function normalize8bitColor(color8bit: Vec3 | Vec4): Vec4 {
  return [...color8bit.map(x => x / 255), 1.0].slice(0, 4) as Vec4
}
```

```js 计时
const startTime = new Date().getTime(); // 开始时间
const endTime = new Date().getTime(); // 结束时间
let myTime = endTime - startTime; // 计算出来耗时
```

```html
<label id="label1" for="test">Label 1</label>
<input id="test" />
<label id="label2" for="test">Label 2</label>
<script>
  // HTMLInputElement.labels 为只读属性，它返回一个NodeList 实例，绑定当前的<input> 节点的<label> 元素。
  window.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("test");
    for (var i = 0; i < input.labels.length; i++) {
      console.log(input.labels[i].textContent); // "Label 1" and "Label 2"
    }
  });
</script>
```

```js
/** 表单验证 */

console.log("找到所有带验证的", demo);
demo.setAttribute("novalidate", true);

document.addEventListener(
  "blur",
  event => {
    let error = hasError(event.target);
    console.log("错误:", error);
  },
  true,
);

let hasError = field => {
  console.log("处理错误:", field);
  // Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (field.disabled || field.type === "file" || field.type === "reset" || field.type === "submit" || field.type === "button") return;

  // Get validity
  let validity = field.validity;
  console.log("validity:", validity);
};
```

## 性能优化

- 样式放在 header 中，脚本放在</body>之前
- 查找元素:id 查找 > 样式类查找 > 属性查找
- DOM 添加修改删除,避免不必要的渲染

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

## Web Components

- 自己的 js 类
- DOM 结构,该只由自己的类管理，无法被外部代码操作
- CSS 样式，作用在组件上
- API:事件，类方法等，让组件可以与其他组件交互
- lifecycle callbacks 生命周期回调[主要四个函数]
- ShadowDOM 用于封装 HTML、CSS、JS
- 对象和数组需要以 JSON 格式的字符串形式传递。
- 为自定义元素设置全局样式:host{}
- 传递属性，监听属性变化，get/set 属性，传递事件(监听器),生命周期回调
- html.js 和 css.js 因为都是``形式，所以可以任意加上变量，如 css 使用了全局某个 color:#222。

```js 封装的目录结构
/*  组件命名方式: c-button c-dropdown
  compoments 
    common 通用的css.js文件 只用于封装组件 
      global-style.js 存放所有全局的样式设置
    button 按钮
      button-html.js 结构文件
      button-css.js  样式文件
      button.js 封装组件文件
    dropdown  下拉
      dropdown-html.js 结构文件
      dropdown-css.js  样式文件
      dropdown.js 封装组件文件
    

*/
```

```js 执行顺序
/*  非嵌套情况下:


*/

/*  嵌套情况下： [自定义组件嵌套自定义组件]
  子组件  指定监听的属性，以及对应get/set static get observedAttributes(){return['','']}
  父组件  指定监听的属性，以及对应get/set static get observedAttributes(){return['','']}

  子组件  构造函数中shadowDOM子级添加克隆的模板内容
  子组件  自定义元素加入页面时，被调用 connectedCallback(){} // 此时，子组件在父组件中渲染完成

  父组件  构造函数中shadowDOM子级添加克隆的模板内容  
  父组件  属性发生变化时，被调用 attributeChangedCallback(name,oldValue,newValue){}
  父组件  执行渲染函数
  父组件  get option()属性值:option2 // 即外部使用组件元素时,option设置的对象属性option2

  子组件  自定义元素属性发生变化时被调用 attributeChangedCallback(name, oldValue, newValue){}
  子组件  获取label的最新属性值 get label(){} // 即外部元素设置的option='option2'的label值 [Option 2]
  子组件  因属性值改变，在内中调用渲染函数，进行重新渲染

  父组件  get option()属性值:option2 // 此处，输出了4遍
  父组件  属性变更后，重新渲染
  父组件  自定义元素加入页面时，被调用 [以上逻辑全部处理完成，才将本组件添加到页面]

//======  点击button,显示下拉列表  =========//
  button.js 添加事件监听器
  dropdown.js 触发状态切换函数，状态切换函数结束

//======  于下拉列表中，选择一项  =========//
  父组件  属性发生变化时，被调用 attributeChangedCallback(name,oldValue,newValue){}
  父组件  执行渲染函数
  父组件  get option()属性值:option1 // 也就是外部使用,js代码部分options对象中的option1对象

  子组件  自定义元素属性发生变化时被调用 attributeChangedCallback(name, oldValue, newValue){}
  子组件  获取label的最新属性值Option 1。// 该值为option1对象的label值，并将其赋值给button的label属性。
  子组件  因属性值改变，在内中调用渲染函数，进行重新渲染

  父组件  get option()属性值:option1 // 此处，输出了4遍
  父组件  因属性值改变，在内中调用渲染函数，进行重新渲染
  父组件  set option()属性值:option1 // 选中的项
  父组件  单个选项点击事件  option1对象
  父组件  触发状态切换函数，函数执行结束

  外部使用时，选项变更:option1

  父组件  执行渲染函数
  父组件  get option()属性值:option1 

  子组件  自定义元素属性发生变化时被调用 attributeChangedCallback(name, oldValue, newValue){}
  子组件  获取label的最新属性值Option 1。// 该值为option1对象的label值，并将其赋值给button的label属性。
  子组件  因属性值改变，在内中调用渲染函数，进行重新渲染

  父组件  get option()属性值:option1 // 此处，输出了4遍

*/
```

```js 事件监听器的多种方式
// 添加事件监听器  组件.js构造函数内
this._button.addEventListener("click", () => {
  console.log(`添加事件监听器`);
  this.onClick("Hello from within the Custom Element");
});
// 外部使用事件监听器
document.querySelector("my-button").onClick = value => console.log(`外部的事件监听器${value}`);

/* ============================== */

// 添加事件监听器 组件.js构造函数内
this._button.addEventListener("click", () => {
  console.log(`添加事件监听器`);
});
// 外部使用事件监听器
document.querySelector("my-button").addEventListener("click", value => console.log(`外部的事件监听器`, value));

/* ============================== */
// 添加事件监听器 组件.js构造函数内
// 添加事件监听器
this._button.addEventListener("click", () => {
  console.log(`添加事件监听器`);
  this.dispatchEvent(
    new CustomEvent("onClick", {
      detail: "Hello from within the Custom Element",
    }),
  );
});
// 外部使用事件监听器
document.querySelector("my-button").addEventListener("onClick", value => console.log(`外部的事件监听器`, value));
```

- 于自定义组件元素上添加特性

```js
// 获取容器元素 组件.js构造函数内
this._container = this._shadowRoot.querySelector('.container');
connectedCallback() {
  console.log(`自定义元素加入页面时，被调用`);
  // 如果 该自定义元素有 as-atom属性，则执行内部代码
  if (this.hasAttribute('as-atom')) this._container.style.padding = '0px';
}
// 外部使用 设置as-atom与 未设置时，页面style效果不一。
<my-button as-atom></my-button>
```

```js
/* 由以下几种方式推论，想要实现 component(html,css,js)文件形式。
因最终是将自定义组件的js文件，创建出来自定义的组件。以下为暂行方式: */
// 自定义组件从创建<template>标签开始
const template = document.createElement("template");
// html.js和css.js字符串文件。 此处也可以是 .html和.css文件读取，再进行拼接
template.innerHTML = ``;
// 将该模板插入到 影子根节点中
this.shadowRoot.appendChild(template.conten.cloneNode(true));

// 最终根据 组件.js文件，创建出来一个组件。若是在其它js文件中使用：
import Dropdown from "./dropdown/dropdown.js"; // 引入 自定义的下拉组件
const dropdown = new Dropdown(); // 组件实例化

// 注:直接在html中使用时，需写作，指定类型为模块
<script type="module" src="./组件名.js"></script>;
```

```js
/**
 * 定义一个 名为 word-count的自定义元素
 * 这个元素叫做 word-count，它的类对象是 WordCount, 继承自 <p> 元素
 */
customElements.define("word-count", WordCount, {
  extends: "p",
});

/** 定义个类元素 ，继承自 HTML段落元素 */
class WordCount extends HTMLParagraphElement {}
```

```html
<!-- Autonomous custom elements 独立元素，继承自 HTMLElement 抽象类，不继承其他内建HTML。
创建类元素语法:class PopUpInfo extends HTMLElement{/*内部函数*/}
元素语法: <popup-info>
js创建: document.createElement("popup-info")
-->
<!-- Customized built-in elements 继承内置的 HTML 元素，必须指定扩展元素。
创建类元素语法:class HelloButton extends HTMLButtonElement{/*内部函数*/}
html使用元素语法：<p is="word-count">
js创建:document.createElement("p", { is: "word-count" })
-->
```

### Shadow DOM

创建组件级别 DOM 的一种方法。为组件创造内部 DOM，它对外部是不可见的。

- 在每个元素中，只能创建一个 shadow root。
- 有自己的 id 空间。
- 对主文档的 JavaScript 选择器隐身，比如 querySelector。
- 只使用 shadow tree 内部的样式，不使用主文档的样式
- 有 shadow root 的元素叫做「shadow tree host」，可以通过 shadow root 的 host 属性访问：

```js
// 假设 {mode: "open"}，否则 elem.shadowRoot 是 null
alert(elem.shadowRoot.host === elem); // true
```

---

### 代码优化

```js
// 隐式 return 写法
export const createElement = element => document.createElement(element);
// 显示 return 写法
export const createElement = element => {
    return document.createElement(element);
}
```

## 函数式编程入门经典

- 函数的原则:小,更小。
- 引用透明性
- 声明式，抽象

### 函数与方法的区别

```js
// 函数
let simple = a => {
  return a;
};
simple(5);

// 方法
let obj = {
  simple: a => {
    return a;
  },
};
obj.simple(5); // 用其名称及其关联对象调用。
```

### 纯函数

- 产生可测试的代码
- 不应改变任意一个外部变量，就能马上理解其中含义
- 纯函数总能够根据输入来做缓存

```js
// 非纯函数
let number = 1;
const increment = () => (number += 1);
increment(); // 2

// 纯函数
const increment = n => n + 1;
increment(1); // 2

// 纯函数 ，加法计算。
const sum = (a, b) => a + b;
sum(3, sum(5, 8)); // 16
sum(1, sum(2, sum(3, 4))); // 10
```

### 高阶函数

- 函数把其他函数当做参数传递使用或者返回一个函数
- 最常见的应用如 map, reduce. 都是以传入不同的函数来以不同的方式操作数组元素

#### 函数作为返回值输出

- isType 函数:判断类型的时候可以通过 Object.prototype.toString.call 来获取对应对象返回的字符串

```js
let isString = obj => Object.prototype.toString.call(obj) === "[object String]";
let isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";
let isNumber = obj => Object.prototype.toString.call(obj) === "[object Number]";

// 封装成一个判断类型的方法
let isType = type => obj => {
  return Object.prototype.toString.call(obj) === "[object " + type + "]";
};
isType("String")("123"); // true
isType("Array")([1, 2, 3]); // true
isType("Number")(123); // true
// 这里就是一个高阶函数，因为 isType 函数将 obj => { ... } 这一函数作为返回值输出。
```

```js
// 加法
const sum = (x, y) => x + y;
const calculate = (fn, x, y) => fn(x, y);
calculate(sum, 1, 2); // 3

// filter
let students = [{ name: "Asura", grade: 6 }, { name: "Satya", grade: 4 }, { name: "Shakya", grade: 9 }];
const isApproved = student => student.grade >= 6; // filter
const byName = obj => obj.name; // map
// 链式 使用 filter 和 map
console.log(students.filter(isApproved).map(byName));

// Reduce
const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
totalGrades; // 19

// 对象排序 [逆序则将减号左右的xy互换]
[{ id: 1, name: "one" }, { id: 3, name: "three" }, { id: 2, name: "two" }, { id: 5, name: "five" }, { id: 4, name: "four" }].sort((x, y) => x.id - y.id);
```

```js 命令式&声明式
// 命令式 命令式的循环要求你必须先实例化一个数组，而且执行完这个实例化语句之后，解释器才继续执行后面的代码。然后再直接迭代 cars 列表，手动增加计数器，把各种零零散散的东西都展示出来
var makes = [];
for (i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}
// 声明式
var makes = cars.map(function(car) {
  return car.make;
});

// compose 表达式只是简单地指出了这样一个事实：用户验证是 toUser 和 logIn 两个行为的组合。

// 命令式
var authenticate = function(form) {
  var user = toUser(form);
  return logIn(user);
};
// 声明式
var authenticate = compose(
  logIn,
  toUser,
);
```

```js
// 命令式   获取数组中所有偶数
const even = n => n % 2 == 0;
const listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
listOfNumbers.filter(even); // [0, 2, 4, 6, 8, 10]

/** 声明式
 *  可以理解为，将filter的条件提取出来，声明一下，然后在filter中使用
 */
// 获取数组中<3的数
function smaller(number) {
  return number < this;
}
function filterArray(x, listOfNumbers) {
  // filter函数中的第二个参数表示上面 this， 也就是 x 值
  return listOfNumbers.filter(smaller, x);
}
let numbers = [10, 9, 8, 2, 7, 5, 1, 3, 0];
filterArray(3, numbers); // [2, 1, 0]

// 找出age>21的人
const olderThan21 = person => person.age > 21;
const overAge = people => people.filter(olderThan21);
overAge(people); // [{ name: 'TK', age: 26 }, { name: 'Kazumi', age: 30 }]

// 购物车里类型为 books的总数
let shoppingCart = [{ productTitle: "Functional Programming", type: "books", amount: 10 }, { productTitle: "Kindle", type: "eletronics", amount: 30 }, { productTitle: "Shoes", type: "fashion", amount: 20 }, { productTitle: "Clean Code", type: "books", amount: 60 }];
// 一个reduce就可以搞定：
let sum = shoppingCart.reduce((item, next) => {
  return next.type === "books" ? item + next.amount : item;
}, 0);
console.log(sum);
```

### curry 柯里化

- 传递给函数一部分参数来调用它，返回一个函数去处理剩下的参数
- 一个函数有多个参数,把每个参数通过链式的形式返回下一个函数,直到最后返回结果

```js
// 加法函数柯里化   [ES6写法，也是比较正统的函数式写法]
const add = x => y => x + y;
const increment = add(1);
const addFive = add(5);
increment(3); //4
addFive(10); // 15

//比较容易读懂的ES5写法
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

// 对象柯里化
const student = name => grade => `Name: ${name} | Grade: ${grade}`;
student("Matt")(8); // Name: Matt | Grade: 8

// 柯里化函数接口
var multiple = function(a) {
  return function(b) {
    return +b * a + "";
  };
};
var plus = function(a) {
  return function(b) {
    return +b + a + "";
  };
};
var concatArray = function(chars, stylishChar) {
  return chars.map(stylishChar).reduce(function(a, b) {
    return a.concat(b);
  });
};
console.log(concatArray(["1", "2", "3"], multiple(2)));
console.log(concatArray(["1", "2", "3"], plus(2)));

// 写一个函数，可以连接字符串数组 如 f(['1','2']) => '12'
var concatArray = function(chars) {
  return chars.reduce(function(a, b) {
    return a.concat(b);
  });
};
concat(["1", "2", "3"]); // => '123'
// 将所有数字+1
var concatArray = function(chars, inc) {
  return chars
    .map(function(char) {
      return +char + inc + "";
    })
    .reduce(function(a, b) {
      return a.concat(b);
    });
};
console.log(concatArray(["1", "2", "3"], 1)); // => '234'
// 所有数字乘以2
var multiple = function(a, b) {
  return +a * b + "";
};
var concatArray = function(chars, inc) {
  return chars
    .map(function(char) {
      return multiple(char, inc);
    })
    .reduce(function(a, b) {
      return a.concat(b);
    });
};
console.log(concatArray(["1", "2", "3"], 2)); // => '246'
```

```js
const changeGender = gender => () => (user.gender = gender);
$("input[value=male]").onChange(changeGender("male"));
$("input[value=female]").onChange(changeGender("female"));
```

### Compose 代码组合

- 通过组合两个或更多的函数生成一个新的函数

```js
// 组合两个函数生成一个新的函数
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const angry = compose(
  exclaim,
  toUpperCase,
);
angry("stop this"); // STOP THIS!

// 组合三个函数生成一个新的
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const moreExclaim = x => `${x}!!!!!`;
const reallyAngry = compose(
  exclaim,
  compose(
    toUpperCase,
    moreExclaim,
  ),
);
reallyAngry("stop this"); // STOP THIS!!!!!!

// 结合律: （associativity）  无论是把 g 和 h 分到一组，还是把 f 和 g 分到一组都不重要
// var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// 因调用分组不重要，结果一样。所以可以写一个可变的组合

groupedTasks = [[{ completed: false, id: 1 }, { completed: true, id: 2 }], [{ completed: false, id: 4 }, { completed: true, id: 3 }]];
var completedAndSorted = compose(
  sortBy(task => task.id),
  filter(task => task.completed === true),
);
map(completedAndSorted, groupedTasks);
```

### 解构

- 从数组中提取数据或对象使用一种语法混合数组和对象文本的建设。或“模式匹配”。

```js
// Select from pattern
const foo = () => [1, 2, 3];
const [a, b] = foo();
console.log(a, b); // 1 2

// 接收 rest 值
const [a, ...b] = [1, 2, 3];
console.log(a, b); // 1 [2, 3]

// 可选参数
const ajax = ({ url = "localhost", port: p = 80 }, ...data) => console.log("Url:", url, "Port:", p, "Rest:", data);
ajax({ url: "someHost" }, "additional", "data", "hello");
// Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
ajax({}, "additional", "data", "hello");
// Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
```

#### pointfree 模式

- 函数无须提及将要操作的数据是什么

```js
// 非 pointfree，因为提到了数据：word
var snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/gi, "_");
};

// pointfree
var snakeCase = compose(
  replace(/\s+/gi, "_"),
  toLowerCase,
);
```

#### 获取所有偶数

```js
// 该函数接收一个断言[值为true or false]
const unless = (predicate, fn) => {
  if (!predicate) fn();
};
// 查找列表中的偶数
const times = (times, fun) => {
  for (let i = 0; i < times; i++) {
    fun(i);
  }
};
/**
 * 参数一:传入一个 number类型的数值
 * 参数二:一个参数为n的函数
 * 使用[unless]函数，其中参数如下:
 * 参数一:[n%2]得偶数
 * 参数二:一个匿名无参函数
 * output:最终输出[number]内所有偶数
 */
times(100, n => {
  unless(n % 2, () => {
    console.log(`${n} is even`);
  });
});
```

- every 检查数组的所有元素是否为 true

```js
/** [实际上低效,应该在遇到第一个不匹配条件的元素时就停止迭代数组]
 * @param {*} arr 传入的数组
 * @param {*} fn 传入的fn需返回一个布尔值
 * 使用[&&]运算确保所有的数组内容遵循fn给出的条件
 */
const every = (arr, fn) => {
  let result = true;
  for (let i = 0; i < arr.length; i++) result = result && fn(arr[i]);
  return result;
};

console.log(every([NaN, NaN, NaN], isNaN)); // true
console.log(every([NaN, NaN, 4], isNaN)); // false
```

- sortBy 排序

```js
/* 接收一个属性，并返回另一个函数 */
const sortBy = property => {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result;
  };
};
// 使用。接收一个属性，并返回另一个函数,返回函数作为[比较函数]传给sort
arr.sort(sortBy("firstName"));
```

- unary 函数

```js
let array = ["1", "2", "3"];
/* 由于[parseInt]接收两个参数(parse,radix)如果可能该函数会把传入的[parse]转换为数字.
    如果把[parseInt]传给map函数,map会把index的值传给parseInt的tadix参数。导致结果如下: */
array.map(parseInt); // 输出结果为: [1,NaN,NaN]

/**
 * 改善以上，使其正确输出。把parseInt函数转换为另一个只接受一个参数的函数。
 * @param {*} fn
 * 接受一个给定的多参数函数，并把它转换为一个只接受一个参数的函数
 * 检查fn是否有一个长度为1的参数列表,如果没有，就返回一个新函数
 * 它只接受一个参数arg，并用该参数调用fn
 */
const unary = fn => (fn.length === 1 ? fn : arg => fn(arg));
/* 返回了一个新函数(parseInt的克隆体),只接受一个参数。
如此,map函数传入的index,arr参数就不会对程序产生影响 */
array.map(unary(parseInt)); // [1, 2, 3]
```

- once 函数 控制函数被调用的次数

```js
/* 接受一个参数fn并通过调用它的apply方法返回结果 
    声明一个done变量，初始值为false。返回的函数会形成一个覆盖它的闭包作用域.
    返回的函数会访问并检查done是否为true，是则返回undefined,否则将done设置为true[阻止下次执行] 
    并用必要的参数调用函数fn */
const once = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};
let doPayment = once(() => {
  console.log("Payment is done");
});
doPayment();
console.log("模拟二次调用:", doPayment()); // undefined
```

- memoized 函数 使函数能够记住其计算结果

```js
const memoized = fn => {
  const lookupTable = {};
  /* 返回函数将接受一个参数并检查它是否存在 [lookupTable]中
        如果存在，返回对应值;否则，使用新的输入作为key，fn的结果作为value，更新[lookupTable]对象 */
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

let fastFactorial = memoized(n => {
  if (n === 0) return 1;
  return n * fastFactorial(n - 1);
});

console.log(fastFactorial(5)); // 120
console.log(fastFactorial(3)); // 6
console.log(fastFactorial(7)); //5040
```

### 数组的函数式编程

### SVG

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// 这条路径将先移动到点 (M10 10) 然后再水平移动80个单位(h 80)，然后下移8个单位 (v 8)，接着左移80个单位 (h -80)，再回到起点处 (z)。
let p = new Path2D("M10 10 h 80 v 8 h -80 Z");
ctx.fill(p);
```

```js
let percentValue = 5;
let calculateTax = value => {
  return (value / 100) * (100 + percentValue);
};

/** 优化以上代码
 * 将 [percentValue] 作为函数的参数
 */
let calculateTax2 = (value, percentValue) => {
  return (value / 100) * (100 + percentValue);
};

// 引用透明性
let identity = i => {
  return i;
};
// 用命令式方法迭代数组
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// 用声明方式迭代数组
arr.forEach(element => console.log(element));

const sortBy = property => {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result;
  };
};
// 使用
// arr.sort(sortBy('firstName'));

// page:75

const double = n => n * 2;
const increment = n => n + 1;

// 没有用管道操作符
double(increment(double(5))); // 22

let Chain = {
  sav: "",
  a1: function(val) {
    this.sav = this.sav + val;
    return this;
  },
};
Chain.a1("aaa")
  .a1("bbb")
  .a1("ccc");
console.log(Chain.sav); //返回 aaabbbccc
```

## Document

- 常用节点类型:DOM 入口点，元素节点，文本节点，注释[<!-- comment -->不显示,但 js 可以从 DOM 读取它]
- DOM 集合非数组，只读，实时，可用 for..of 迭代，不要 for..in 来遍历

```js
<html> = document.documentElement
<body> = document.body 值可能为null[脚本无法访问在运行时不存在的元素]
<head> = document.head
childNodes, 集合提供了对所有子节点包括其中文本节点的访问
firstChild, lastChild:访问第一个和最后一个子元素的快捷方式
elem.hasChildNodes() 用于检测节点是否有子节点
for (let node of document.body.childNodes) {
  alert(node); // shows all nodes from the collection
}
parentNode:父节点;nextSibling:下一个兄弟节点;previousSibling:上一个兄弟节点
只考虑元素节点时更多的导航链接:
children —— 只获取类型为元素节点的子节点。
firstElementChild，lastElementChild —— 第一个和最后一个子元素。
previousElementSibling，nextElementSibling —— 兄弟元素。
parentElement —— 父元素。
for (let elem of document.body.children) { // 只显示元素
  alert(elem); // DIV, UL, DIV, SCRIPT
}
table:除了以上，还有自己的属性:
table.rows — 用于表示表中 <tr> 元素的集合。
table.caption/tHead/tFoot — 用于访问元素 <caption>、<thead>、<tfoot>
table.tBodies — <tbody> 元素的集合（根据标准该元素数量可以很多）
<thead>、<tfoot>、<tbody> 元素提供了 rows 属性:tbody.rows — 表内部 <tr> 元素的集合。
<tr>：
tr.cells — 在给定 <tr> 元素下 <td> 和 <th> 单元格的集合。
tr.sectionRowIndex — 在封闭的 <thead>/<tbody> 中 <tr> 的编号。
tr.rowIndex — 在表中 <tr> 元素的编号。
<td> 和 <th>：td.cellIndex — 在封闭的 <tr> 中单元格的编号。
```

```js
<table id="table">
  <tr><td>one</td><td>two</td></tr>
  <tr><td>three</td><td>four</td></tr>
</table>
<script>
  // 获取第一行中第二个单元格的内容
  alert( table.rows[0].cells[1].innerHTML ) // "two"
</script>
```

```js
elem.querySelectorAll(css) 的调用将返回与给定 CSS 选择器匹配 elem 中的所有元素
<ul><li>The</li><li>test</li></ul>
<ul><li>has</li><li>passed</li></ul>
let elements = document.querySelectorAll('ul > li:last-child');
for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
CSS 选择器的伪类，如 :hover 和 :active
document.querySelectorAll(':hover')

elem.matches(css) 用于检查 elem 与给定的 CSS 选择器是否匹配。
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>
<script>
  // 不一定是 document.body.children，也可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
elem.closest(css) 用于查找与给定 CSS 选择器相匹配的最近的祖先。elem 本身也会被检查。
<h1>Contents</h1>
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>
<script>
  let chapter = document.querySelector('.chapter'); // LI
  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV
  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```

```js
// hidden 指定元素是否可见
<div hidden>With the attribute "hidden"</div>
<div id="elem">JavaScript assigned the property "hidden"</div>
<script>
  elem.hidden = true;
</script>

所有以 “data-” 开头的特性值可以给编程人员正常使用，同时它还是 dataset 合法值。
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
<style>
  .order[data-order-state="new"] {color: green;}
  .order[data-order-state="pending"] {color: blue;}
  .order[data-order-state="canceled"] {color: red;}
</style>
<div id="order" class="order" data-order-state="new">A new order.</div>
<script>
  // 读取
  alert(order.dataset.orderState); // new
  // 修改
  order.dataset.orderState = "pending"; // (*)
</script>
```

## 浏览器事件

- 函数应该作为 test 进行分发，而不是 test(),添加括号将是函数执行的结果

```js
button.onclick = test; // right
button.onclick = test(); // wrong
```

```html
<div class="book" id="zfem">
  <img src="https://raw.githubusercontent.com/…………/master/IMG/zfem.jpg" alt="ZFEM" />
</div>
<script>
  let zfemBtn = document.getElementById("zfem");
  zfemBtn.onclick = event => {
    console.log("EVENT:", event.target.alt);
    getZFEMContent(event.target.alt);
  };

  async function getZFEMContent(book) {
    const res = await httpGet(BASE_URL + book);
    console.log("RES:", JSON.parse(res));
  }
</script>
```

## Mixin 模式

- 一个包含许多供其它类使用的方法的类，而且这个类不必是其它类的父类。

### instanceof 类型检测

- 类型检查，在检测中会将原型链考虑在内
- 在涉及多层类结构的场合中比较实用，这种情况下需要将类的继承关系考虑在内。
- typeof [用于:]基本数据类型
- {}.toString [用于:]基本数据类型、内置对象以及包含 Symbol.toStringTag 属性的对象 [返回:string]
- instanceof 任意对象 [返回:true/false]

```js
class Rabbit {}
let rabbit = new Rabbit();
// rabbit 是 Rabbit 类的实例对象吗?
alert(rabbit instanceof Rabbit); // true

// 构造函数而非 class
function Rabbit() {}
alert(new Rabbit() instanceof Rabbit); // true

let arr = [1, 2, 3];
alert(arr instanceof Array); // true
alert(arr instanceof Object); // true
```

### 使用 Object 的 toString 方法来揭示类型

- 一个普通对象被转化为字符串时为 [object Object]

```js
/*
按照 规范 上所讲，内置的 toString 方法可以从对象中提取出来，以其他值作为上下文（context）对象进行调用，调用结果取决于传入的上下文对象。
如果传入的是 number 类型，返回 [object Number]
如果传入的是 boolean 类型，返回 [object Boolean]
如果传入 null，返回 [object Null]
传入 undefined，返回 [object Undefined]
传入数组，返回 [object Array]
…等等（例如一些自定义类型）
*/
let obj = {};
alert(obj); // [object Object]
alert(obj.toString()); // 同上

// 保存 toString 方法的引用，方便后面使用
let objectToString = Object.prototype.toString;
// 猜猜是什么类型？
let arr = [];
alert(objectToString.call(arr)); // [object Array]

//  装饰和转发，call/apply 里提到的 call 方法来调用 this=arr 上下文的方法 objectToString。
let s = Object.prototype.toString;
alert(s.call(123)); // [object Number]
alert(s.call(null)); // [object Null]
alert(s.call(alert)); // [object Function]

// 对象的 toString 方法可以使用 Symbol.toStringTag 这个特殊的对象属性进行自定义输出。
let user = {
  [Symbol.toStringTag]: "User",
};
alert({}.toString.call(user)); // [object User]
```

## Class 类

- class, extends, super
- class import export 多种写法

```js
/**
 * 写法一:
 */
/* demo.js */
class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
export default Demo;
/* use.js 具体使用 */
import Demo from "./demo.js";
let demo = new Demo(); // 实例化类
demo.test(); // output: demo.js Demo test()!

/**
 * 写法二:
 */
/* demo.js */
class Demo {
    test() {
        console.log('demo.js Demo test()!');
    }
}
export default new Demo(); // 导出时候就实例化
/* use.js 具体使用 */
import Demo from "./demo.js";
Demo.test(); // 无需实例化，直接使用

/**
 * 写法三:
 */
/* demo.js */
export default class Demo {
    test() {
        console.log('demo.js Demo test()!');
    }
}
/* use.js 具体使用 */
import Demo from './demo.js';
let demo = new Demo();
demo.test();
```

### 构造函数

- getter,setter

```js
export class Demo {
  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    // 调用 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

/* use.js 具体使用 */
let demo = new Demo("satya");
// let demo = new Demo(''); // Name too short.
alert(demo.name);
```

### extends

- 意味着 Child.prototype.**proto** 将是 Parent.prototype，所以方法被继承

```js
/**
 * 写法四: 一个js里，多个需要导出的 or 导出继承的
 */
/* demo.js */
export class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }

  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 类继承 [extends]
 */
export class DemoChild extends Demo {
  hide() {
    alert(`${this.name}hides!`);
  }
}
/* use.js 具体使用 */
import { Demo, DemoChild } from "./demo.js";
let demo = new Demo("satya");
demo.test();
demo.run(10);
let demoChild = new DemoChild("shakya");
demoChild.hide();
```

### super

- 继承父类函数，将其功能性扩展
- 执行 super.method(...) 调用父类方法
- 执行 super(...) 调用父类构造函数（只能在子类的构造函数中运行）。
- 箭头函数没有自己的 this 或 super

```js
/* demo.js */
export class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }

  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 类继承 [extends]
 */
export class DemoChild extends Demo {
  hide() {
    alert(`${this.name}hides!`);
  }

  stop() {
    super.stop(); // 调用父类的stop函数
    this.hide();
  }
}

/* use.js 具体使用 */
import { Demo, DemoChild } from "./demo.js";
let demo = new Demo("satya");
demo.test();
demo.run(10);
let demoChild = new DemoChild("shakya");
demoChild.stop();
```

### 重写构造函数

- 如果一个类继承了另一个类并且没有 constructor，那么将生成“空” constructor
- 继承类的构造函数必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用

```js
class DemoChild extends Demo {
  // 为没有构造函数的继承类生成以下的构造函数
  // 调用了父类的 constructor，并传递了所有的参数
  constructor(...args) {
    super(...args);
  }
}
```

```js
export class Demo {
  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 类继承 [extends]
 */
export class DemoChild extends Demo {
  /**
   * 重写构造函数
   * @param {*} name
   * @param {*} earLength
   */
  constructor(name, earLength) {
    // 继承类的构造函数必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用
    // this.name = name;
    super(name); // super必须在 this.xxx= xxx 之前
    this.earLength = earLength;
  }

  hide() {
    alert(`${this.name}hides!`);
  }

  stop() {
    super.stop(); // 调用父类的stop函数
    this.hide();
  }
}
```

## destructuring 解构

### ES6 解构赋值

```js
let cat = "ken";
let dog = "lili";
let zoo = { cat, dog };
console.log(zoo); //Object {cat: "ken", dog: "lili"}

let dog = { type: "animal", many: 2 };
let { type, many } = dog;
console.log(type, many); //animal 2
```

## default, Rest parameters 剩余参数

- 如果函数的最后一个命名参数以...为前缀，则它将成为一个由剩余参数组成的真数组，其中从 0（包括）到 theArgs.length（排除）的元素由传递给函数的实际参数提供
- 只包含那些没有对应形参的实参,是真正的 Array，可用直接使用所有的数组方法，比如 sort，map，forEach 或 pop

- 当需要对对象中某一个或几个属性进行再处理时

```js
let { a, b, c, ...other } = this.form;
this.form = {
  a: "a的值",
  b: "b的值",
  c: "c的值",
  ...other,
};
```

- 当需要对传入的对象参数进行处理时

```js
/**
  * 获取当前页面列表数据集
  * page: 当前页
  * size: 每页数据集条数
  * search: 于查询框输入的值,当其为对象时，使用[...search]解构
  */
async fetchData(page, size, search = {}) {
  let params = {
    page: page > 0 ? page - 1 : 0,
    size: this.tableData.size,
    ...search // 解构赋值
  };
  this.loading = true;
  try {
    let res = await getActivities(params);
    console.log("中日程列表数据集:", res);
    this.tableData = res;
    this.loading = false;
  } catch (err) {
    this.loading = false;
  }
},
```

- 当 剩余参数作为函数参数的时候

```js
// 计算传入不定参数结果
function sum(...theArgs) {
  alert(theArgs.length); // 可以使用length属性得到剩余参数的个数
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}
console.log(sum(1, 2, 3)); // expected output: 6
console.log(sum(1, 2, 3, 4)); // expected output: 10

// 解构剩余参数
function f(...[a, b, c]) {
  return a + b + c;
}
f(1); // NaN (b and c are undefined)
f(1, 2, 3); // 6
f(1, 2, 3, 4); // 6 (the fourth parameter is not destructured)

// 剩余参数包含了从第二个到最后的所有实参，然后用第一个实参依次乘以它们
function multiply(multiplier, ...theArgs) {
  return theArgs.map(function(element) {
    return multiplier * element;
  });
}
var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]

// 在剩余参数上使用任意数组方法
function sortRestArgs(...theArgs) {
  var sortedArgs = theArgs.sort();
  return sortedArgs;
}
alert(sortRestArgs(5, 3, 7, 1)); // 弹出 1,3,5,7
```

## Module

- 天然严格模式
- import 关键字允许从其他模块中导入一些诸如函数之类的功能等等。[取代 require]
- export 关键字表示在当前模块之外可以访问的变量和功能。[取代 module.exports]
- 如果模块只有一个输出值，就使用 export default，多个则在 function 前加[export],不要同时使用
- 不要在模块导入中使用通配符。确保模块之中，有一个默认输出（export default）

### 无凭证

如果请求来自同一个源（域名一样），大多数基于 CORS 的 API 将发送凭证（如 cookie 等），但 fetch()和模块脚本是例外 – 除非您要求，否则它们不会发送凭证。

- crossorigin:HTML 属性,可以明确<script>以及<img>等可外链元素在获取资源时候，是否带上凭证。
- anonymous:元素的跨域资源请求不需要凭证标志设置。
- use-credentials:元素的跨域资源请求需要凭证标志设置，意味着该请求需要提供凭证。
- 只要 crossOrigin 的属性值不是 use-credentials，全部都会解析为 anonymous

```html
<!-- ① 获取资源会带上凭证（如cookie等） 传统JS加载，都是默认带凭证的 -->
<script src="1.js"></script>

<!-- ② 获取资源不带凭证 module模块加载默认不带凭证 -->
<script type="module" src="1.mjs"></script>

<!-- ③ 获取资源带凭证 -设置crossOrigin为匿名anonymous，将带凭证 ->
<script type="module" crossorigin src="1.mjs?"></script>

<!-- ④ 获取资源不带凭证  import模块跨域，则设置crossOrigin为anonymous不带凭证 -->
<script type="module" crossorigin src="//cdn.zhangxinxu.com/.../1.mjs"></script>

<!-- ⑤ 获取资源带凭证 import模块跨域，且明确设置crossOrigin为使用凭证use-credentials，则带凭证 -->
<script type="module" crossorigin="use-credentials" src="//cdn.zhangxinxu.com/.../1.mjs?"></script>
```

```JavaScript
import * as myObject './importModule'; // bad
import myObject from './importModule'; // good

// 如果模块默认输出一个函数，函数名的首字母应该小写。
function makeStyleGuide() { }
export default makeStyleGuide;

// 如果模块默认输出一个对象，对象名的首字母应该大写。
const StyleGuide = { es6: { } };
export default StyleGuide;
```

#### Chrome 遇到的问题

- live server 插件启个服务来解决【带 html 及 js 的页面动态更新】
- 使用 nodejs 写个简易服务来解决
- file 协议:访问本地计算机中的文件,类似资源管理器中打开文件
- http:访问本地 html,相当于将本机作为 http 服务器,动态解析拿到文件。

## async/await

- async:函数前面的「async」：该函数总是返回一个 promise。允许在函数内部使用 await。
- await:让 JS 引擎等待直到 promise 完成并返回结果

```js
async function f() {
  return 1;
}
f().then(alert); // 1

async function f() {
  return Promise.resolve(1); // 显式返回一个 promise
}
f().then(alert); // 1

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  let result = await promise; // 等待直到 promise 决议 (*)
  alert(result); // "done!" // 一秒后显示的
}
f();

// 包裹在一个匿名 async 函数中
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

## Promise

- 异步编程的一种解决方案，比传统的——回调函数和事件——更合理更强大

```js
/** HTTP 请求封装 */
class HTTP {
  /** 构造函数 */
  constructor() {}

  /**
   * get 请求
   * @param {*} url 请求的url
   * @param {*} responseType  响应类型
   * return Promise
   * use: HTTP.get(BASE_URL_RAW + 'novel.json').then(data => rendererBook(Object.values(JSON.parse(data))));
   */
  get(url, responseType = "") {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          // Success
          resolve(this.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function() {
        reject(new Error("XMLHttpRequest Error: " + this.statusText));
      };
      request.open("GET", url);
      request.responseType = responseType;
      request.send();
    });
  }
}
export default new HTTP(); // 导出 HTTP类实例化

/* ues.js 具体使用 */
import HTTP from "./common/http.js";
const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 文件url
HTTP.get(roleJSONURL).then(data => console.log("DATA:", JSON.parse(data)));

/**
 * 请求一个json，根据指定属性值，请求数据集，渲染至页面
 */
loadContent(BASE_URL_RAW);
async function loadContent(url) {
  const data = await HTTP.get(url + "novel.json");
  const content = await HTTP.get(BASE_URL + JSON.parse(data).kgyy.folder);
  return render(JSON.parse(content));
}
```

```js
// 第一种方式
export function getMaterial(params) {
  return http({
    url: '/materials',
    method: 'get',
    params
  })
}
// 第二种方式
export function getMaterial(query) {
  return http({
    url: '/materials',
    method: 'get',
    params:query
  })
}
```

```js
async function asyncFunc() {
  return new Promise((resolve, reject) => {
    resolve(123);
  });
}
asyncFunc().then(x => console.log(x));
```

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 用法： loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// 用法： loadScriptPromise('path/script.js').then(...)
```

## fetch

```js
// 可以是链式
function loadJson(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => alert(data.name));
}
// 该代码块为vscode建议写法,效果与上相同
async function loadJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return alert(data.name);
}
```

```js
async function fetchJson(url) {
  try {
    let request = await fetch(url);
    let text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
fetchJson("http://example.com/some_file.json").then(obj => console.log(obj));
```

```js
/** 进阶版  */
const roleJSONURL = `${BASE_URL}/Concept/role/hong.json`;
async function showAvatar() {
  // 读取JSON文件
  let response = await fetch(roleJSONURL);
  let user = await response.json();

  // 读取Github用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${name}`);
  let githubUser = await githubResponse.json();

  // 显示头像
  let img = document.createElement("img");
  img.src = githubUser.avatar_url; // 传入用户的头像地址
  img.className = "promise-avatar-example";
  document.body.append(img); // 添加到body下

  // 等待3秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  img.remove(); // 移除img元素
  return githubUser;
}
showAvatar();

/* 使用 async/await 重写以下示例 */

const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 文件url
/**
 * 向指定URL发送请求,并从服务器加载内容
 * @param {*} url 请求的url
 * 使用 response.json() 把远程内容解析为 JSON
 * 注：编辑器建议使用 async/await方式
 */
async function loadJson(url) {
  const response = await fetch(url);
  console.log("RES:", response);
  return await response.json();
}

/**
 * 发一个请求到 GitHub，加载用户信息
 * @param {*} name 用户名
 */
async function loadGithubUser(name) {
  const response = await fetch(`https://api.github.com/users/${name}`);
  console.log("RES:", response);
  return await response.json();
}

/**
 * 根据上一步请求得到的用户信息，获取其中的头像url
 * 于页面创建img元素，显示用户头像
 * @param {*} githubUser 用户信息
 * 注：作为一个规律，一个异步动作应该永远返回一个 promise。
 */
async function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url; // 传入用户的头像地址
    img.className = "promise-avatar-example";
    document.body.append(img); // 添加到body下

    setTimeout(() => {
      img.remove(); // 移除img元素？
      /**
             * 为了使链可扩展，我们需要在头像结束显示时返回一个 resolved 状态的 promise。
            在 setTimeout 后运行 img.remove()，然后调用 resolve(githubUser)，这样链中的控制流程走到下一个 .then 并传入用户数据。作为一个规律，一个异步动作应该永远返回一个 promise。这让它规划下一步动作成为可能。虽然现在我们没打算扩展链，我们可能在日后需要它。
             */
      resolve(githubUser); // 该行，对应使用时的最后一个.then，alert一个字符串。
    }, 3000);
  });
}

/** 使用以上封装好的函数 达到链式操作效果 */
loadJson(roleJSONURL)
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  // showAvatar函数中，setTimeout中的 [resolve]
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

```js
/* 向指定URL发送请求,并从服务器加载内容 
发一个请求到 GitHub，加载用户信息并显示头像
alert之后，移除加载的头像元素 */

const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 文件url

/* 加载指定url的内容 */
function loadJson(url) {
  return fetch(url).then(response => response.json());
}
/* 根据传入name，加载指定用户信息 */
function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then(response => response.json());
}
/* 根据传入用户名，获取并显示头像于页面 */
function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// 使用它们
loadJson(roleJSONURL)
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

#### 请求错误

```js
const roleJSONURLERROR = `${BASE_URL}/Satya/master/Concept/role/role.json`;
/**
 * 检查具有HTTP状态的[response.status]属性,非200抛出错误
 * 为 HTTP 错误创建一个自定义类用于区分 HTTP 错误和其他类型错误
 * 构造函数接受 response 对象，并将其保存到 error 中,能够获得响应数据
 */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}
/**
 * 将请求（requesting）和错误处理代码包装进一个函数，它能够 fetch url 并 将所有状态码不是 200 视为错误
 */
async function loadJsonAddHttpError(url) {
  const response = await fetch(url);
  // 添加对状态码进行判断
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

loadJsonAddHttpError(roleJSONURLERROR).catch(alert);
```

```js
/**
 * 创建请求，如果得到 404 就可以告知用户修改信息
 * 从 GitHub 加载给定名称的用户。如果没有这个用户，它将告知用户填写正确的名称
 * 如果有加载指示（load-indication），.finally 是一个很好的处理程序，在 fetch 完成时停止它
 */
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  document.body.style.opacity = 0.3; // (1) 开始指示（indication）调暗文档指示加载

  return loadJson(`https://api.github.com/users/${name}`)
    .finally(() => {
      // (2) 停止指示（indication） fetch成功or错误，触发终止加载
      document.body.style.opacity = "";
      // 浏览器技巧 (*) 是从 finally 返回零延时（zero-timeout）的 promise
      return new Promise(resolve => setTimeout(resolve)); // (*)
    })
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

```js
// 浏览器里，可以使用 unhandledrejection 事件来捕获这类错误
window.addEventListener("unhandledrejection", function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - 产生错误的 promise
  alert(event.reason); // Error: Whoops! - 未处理的错误对象
});

new Promise(function() {
  throw new Error("Whoops!");
}); // 没有 catch 处理错误
//如果发生错误且没有 .catch 捕获，unhandledrejection 处理程序就会被触发并获取具有相关错误信息的 event 对象，此时我们就能做一些处理了。通常这种错误是不可恢复的，所以我们最好的办法是告知用户有关问题的信息，并可能将事件报告给服务器。
```

#### Promise.all

```js
const BASE_URL_DICT = `${BASE_URL}/Dict/zh/`;
let fileNames = ["surname.txt", "cn.txt", "baijiaxing.txt", "qianziwen.txt", "idiom.txt"];

let requests = fileNames.map(fileName => fetch(BASE_URL_DICT + fileName));

Promise.all(requests)
  .then(responses => {
    // 所有响应都就绪时，显示HTTP状态码
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每个url都显示200
    }
    return responses;
  })
  // 映射 responses 数组到 response.text()中读取它们的内容
  .then(responses => Promise.all(responses.map(res => res.text())));
```

```js
let names = ["iliakan", "remy", "jeresig"];
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // 所有响应都就绪时，我们可以显示 HTTP 状态码
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每个 url 都显示 200
    }

    return responses;
  })
  // 映射 response 数组到 response.json() 中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析：“users” 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
```

#### fetch 封装

- response.json() —— 将 response 解析为 JSON 对象，
- response.text() —— 以文本形式返回 response
- 未能解决以上两种,如何区分调用。

```js
"use strict";

class HTTP {
  constructor() {}
  /**
   * get 请求
   * @param {*} url
   * use: 具体使用js。需先 import HTTP from './common/http.js';
   * HTTP.get(BASE_URL).then(data => console.log('HTTP.js DATA:', data)).catch(err => console.log(err));
   */
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /**
   * post 请求
   * @param {*} url
   * @param {*} data
   */
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /**
   * put 请求
   * @param {*} url
   * @param {*} data
   */
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /**
   * delete 请求
   * @param {*} url
   * @param {*} data
   */
  delete(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then((data = resolve(data)))
        .catch(err => reject(err));
    });
  }
}
export default new HTTP(); // 导出时直接 类实例化
```

```js
/* 使用以上封装 */
import HTTP from "./common/http.js"; //引入

const BASE_URL = "https://……………………";
// get请求数据
HTTP.get(BASE_URL)
  .then(data => console.log("HTTP.js DATA:", data))
  .catch(err => console.log(err));

// post传输数据
const data = {
  name: "candy",
  username: "candy",
  email: "htmlcs@163.com",
};
//post user
HTTP.post("http://jsonplaceholder.typicode.com/users", data)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// update user ,修改后会发现修改后ID为2的数据会变成上页面定义的data
HTTP.put("http://jsonplaceholder.typicode.com/users/2", data)
  .then(data => console.log(data))
  .catch(err => console.log(err));

//delete user 删除下标为2里的数据

HTTP.delete("http://jsonplaceholder.typicode.com/users/2", data)
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### 基础示例

```js
/**
 * 返回一个 promise
 * @param {*} src  script的url
 */
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");

promise.then(script => alert(`${script.src} is loaded!`), error => alert(`Error: ${error.message}`));

promise.then(script => alert("One more handler to do something else!"));
```

## AJAX

- 使用 XMLHttpRequest 对象与服务器通信
- JSON,XML,HTML 和 text 文本等格式发送和接受数据
- 异步:不刷新页面的情况下与服务器通信，交换数据或更新页面

```js
/**
 *  原生 请求 json文件
 */
var httpRequest;
document.getElementById("ajaxBtn").addEventListener("click", getAJAXTest);

function getAJAXTest() {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert("Giving up :( Cannot create an XMLHTTP instance");
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  // httpRequest.open('GET', 'https://raw.githubusercontent.com/Lokavit/Learn/master/JS/JS_INFO/surname.txt');
  // httpRequest.open('GET', 'https://raw.githubusercontent.com/Lokavit/Learn/master/JS/JS_INFO/role.json');
  httpRequest.open("GET", "https://raw.githubusercontent.com/Lokavit/Learn/master/JS/JS_INFO/cn.txt");
  // httpRequest.open('GET', 'https://api.github.com/repos/Lokavit/Learn/contents/JS/JS_INFO');
  httpRequest.send();
}

/**  */
function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      // console.log(httpRequest.responseText.split(','));
      // window.localStorage.setItem('surname', httpRequest.responseText);

      console.log("RES:", httpRequest.responseText.split(","));
      // console.log('String转 JSON:', JSON.parse(httpRequest.responseText));
      // reander(JSON.parse(httpRequest.responseText).roles);
    } else {
      alert("There was a problem with the request.");
    }
  }
}
```

```HTML
<!DOCTYPE html>
<html>
<head>
    <title>AJAX JSON </title>
<script>
    // 加载JSON函数
function loadJSON(){
    let dataFile ='https://github.com/Lokavit/Preta/blob/master/package.json';
    // let dataFile ='';
    let httpRequest =new XMLHttpRequest();
    // 请求状态
    httpRequest.onreadystatechange =function(){
        if(httpRequest.readyState==4){
            let jsonObj =JSON.parse(httpRequest.responseText);
            // alert(jsonObj);
            console.log(jsonObj);
            document.getElementById('Name').innerHTML =jsonObj.name;
            document.getElementById('Author').innerHTML =jsonObj.author;
        }
    }
    httpRequest.open('GET',dataFile,true);
    httpRequest.send();
}
</script>
</head>
<body>
    <table>
        <tr><th>Name</th><th>Author</th></tr>
        <tr>
            <td><div id='Name'>Sachin</div></td>
            <td><div id='Author'>India</div></td>
        </tr>
    </table>
    <button type="button" onclick='loadJSON()'>更新！</button>
</body>
</html>
```

### 制作快速加载的 HTML 页面

- 减小页面的大小[排除不必要空格，注释，动态内嵌脚本，和放入外部文件的 CSS 等]
- 最小化文件数量，减少域名查找，缓存重用的内容，高效地排列页面组件，减少内联脚本的数量
- 使用现代 CSS 和合法标记
- 给内容分块[用 <div> 替代基于 TABLE 的布局或者将 TABLE 拆分为更小的 TABLE]

### 异步加载脚本：Defer/Async

- defer 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后
- async 该布尔属性指示浏览器是否在允许的情况下异步执行该脚本
- 以上属性对于内联脚本无作用 (即没有 src 属性的脚本）

```html
<script src="one.js" async></script>
<!--异步执行-->
<script src="one.js" defer></script>
<!--延迟执行-->
```

# Array&Object

```js
export default function groupBy(array, f) {
  const groups = {};
  array.forEach(function(o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}
```

```js
let array = [1, 2, 1, 4, 5, 3, "1"];
console.log("数组去重", [...new Set(array)]);

// （2） 实现并集、交集、差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x))); // set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x))); // Set {1}
```

- for…of 迭代

```js
// 输出对象种每个 key-value ，若内中有数组，则依然输出数组
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value); // 每个 key value
}

// 将每个key-value作为数组形式输出["key","value"],遇到对象数组,照例输出
console.log(Object.entries(obj));
```

### 两个对象或数组是否相等

```js
// 如果键值对相等，则两个对象相等
let obj1 = { a: 1, b: 2 };
let obj2 = { b: 2, a: 1 };
equalObject(obj1, obj2); // true
equalObject({ a: [] }, { a: [] }); // false

// 如果数组项一样，则两个数组相等
let arr1 = [1, 2, 5, 7, 9];
let arr2 = [1, 2, 5, 7, 9];
euqalObject([1, 2], [1, 2]); // true
euqalObject([1, 2], ["1", "2"]); // false

// 实现一个方法，只要内容形态一致，则数组或对象相等
let obj1 = { a: [1, "2"], b: 2 };
let obj2 = { b: 2, a: [1, "2"] };
let arr1 = [1, 2, { a: 1, b: 2 }, 9];
let arr2 = [1, 2, { b: 2, a: 1 }, 9];
euqal(obj1, obj2); // true
euqal(arr1, arr2); // true
euqal(obj1, arr1); // false

// 补充，应该再加上类型一致性判断，否则[1, 2] 和 {'0': 1, '1': 2} 会认为相等。

let equalObject = (o1, o2) => {
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every(v => o1[v] === o2[v]);
};

let equalArray = equalObject;

let equal = (o1, o2) => {
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every(v => {
    if (o1[v] instanceof Object) {
      return equal(o1[v], o2[v]);
    } else {
      return o1[v] === o2[v];
    }
  });
};
```

## Array 数组方法

- from() 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
- forEach、map、filter、find、every、some、reduce
- forEach(),遍历，无返回值。
- forEach 与 map 最大区别，前者没有返回值
- filter(),返回根据条件过滤后的数组
- find(),返回找到的符合条件的第一个元素
- findIndex(),返回第一个符合条件的索引
- every(),当所有元素满足条件时，返回 true,否则返回 false
- some(), 当所有元素中，有一个以上满足条件时,返回 true,否则返回 false
- reduce(),递归累计,返回计算结果.
- reduceRight(),以上，从又至左

### from()

- 第一个参数允许任意可迭代对象。

```js
// 类数组中每项*2
const someNumbers = { "0": 10, "1": 15, length: 2 };
console.log(Array.from(someNumbers, value => value * 2)); // [20,30]
```

```js
/** 将类数组对象转换成数组
  * 通常的类数组对象:
  *    函数的 arguments 关键字
  *    DOM集合
  */
// 对函数的参数求和
sumArguments() {
  return Array.from(arguments).reduce((sum, num) => sum + num);
},
// 类数组转换数组 之 对函数的参数求和
console.log(this.sumArguments(1, 2, 3));

// 对DOM集合的操作
testDOM() {
  // document.getElementsByTagName("li");
  let li = this.$el.getElementsByTagName("li");
  console.log("LI:", li); // 所有<li>标签
  let newLI = Array.from(li).filter(item => item.textContent != "B");
  console.log("newLI:", newLI); // 输出结果：AC
}
```

```js
// 数组最大值
[1, 4, 6].reduce(function(a, b) {
  return Math.max(a, b);
}); //6

// 遍历
numbers = [1, 2, 3, 4, 5];
numbers.forEach(number => {
  console.log(number); //1 2 3 4 5
});

// 将数组中所有数字相加（这里用了函数抽离的方式）
numbers = [1, 2, 3, 4, 5];
var sum = 0;
function add(num) {
  sum += num;
}
numbers.forEach(add);
console.log(sum); //15

// map() 原数组被“映射”成对应新数组,返回一个新数组
// 案例1将原数组的每个数字都*2

var numbers = [1, 2, 3, 4, 5];
var doublnumbers = numbers.map(number => {
  return number * 2;
});
console.log(doublnumbers); //[2,4,6,8,10]

// 将A对象数组中某个属性存到B数组中
let building = [{ name: "the Great Wall", location: "BeiJing" }, { name: "Eiffel Tower", location: "Paris " }];
let citys = building.map(item => {
  return item.location;
});
console.log(citys); //["BeiJing", "Paris "]

// 案例2假定有两个数组(A,B),根据A中id值,过滤掉B数组不等于A中id的数据

var post = { id: 4, title: "Javascript" };
var comments = [{ postId: 4, content: "Angular4" }, { postId: 2, content: "Vue.js" }, { postId: 3, content: "Node.js" }, { postId: 4, content: "React.js" }];
function commentsForPost(post, comments) {
  return comments.filter(function(comment) {
    return comment.postId === post.id;
  });
}

console.log(commentsForPost(post, comments)); //[ {postId:4,content:"Angular4"},{postId:4,content:"React.js"}]

// 案例2假定有两个数组(A,B),根据A中id值,找到B数组等于A中id的数据

var post = { id: 4, title: "Javascript" };
var comments = [{ postId: 4, content: "Angular4" }, { postId: 2, content: "Vue.js" }, { postId: 3, content: "Node.js" }, { postId: 4, content: "React.js" }];
function commentsForPost(post, comments) {
  return comments.find(function(comment) {
    return comment.postId === post.id;
  });
}

console.log(commentsForPost(post, comments)); // {postId:4,content:"Angular4"}
```

```js
/**
 * 静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
 */
const object1 = {
  property1: 42,
  property2: 13,
};
var array1 = [];
console.log(Reflect.ownKeys(object1));
// expected output: Array ["property1", "property2"]
console.log(Reflect.ownKeys(array1));
// expected output: Array ["length"]
```

# JS_INFO

## 属性的 getter 和 setter

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  // age 是由当前日期和生日计算出来的
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
}
let john = new User("John", new Date(1992, 6, 1));
alert(john.birthday); // birthday 是可访问的
alert(john.age); // ...age 也是可访问的
```

## 属性的标志和描述符

### Object.getOwnPropertyDescriptor 方法允许查询有关属性的完整信息

```js
// 语法:  obj需要获取信息的对象  propertyName属性的名称
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

let user = { name: "Satya" };
let descriptor = Object.getOwnPropertyDescriptor(user, "name");
alert(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "Satya",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

### Object.defineProperty 修改标志

```js
/** 语法:
 * @param: obj，propertyName 要处理的对象和属性
 *         descriptor:将被定义或修改属性的描述符
 * @return: 被传递给函数的对象
 * 如果该属性存在，则 defineProperty 更新其标志。否则，它会创建具有给定值和标志的属性；在这种情况下，如果没有提供标志，则会假定它是 false。
 */
Object.defineProperty(obj, propertyName, descriptor);
```

```js
// 使用所有的伪造标志创建一个属性 name
let user = {};
Object.defineProperty(user, "name", { value: "Satya" });
let descriptor = Object.getOwnPropertyDescriptor(user, "name");
alert(JSON.stringify(descriptor, null, 2));
/* 注意，以下全为 false
{
  "value": "Satya",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */
```

### writable 是否可写

```js
// 修改 writable 标志来把 user.name 设置为只读
let user = { name: "Satya" };
Object.defineProperty(user, "name", { writable: false });
user.name = "Pete"; // 错误：不能设置只读属性'name'...

// 属性不存在的话
let user = {};
Object.defineProperty(user, "name", {
  value: "Pete",
  // 对于新的属性，需要明确的列出哪些为 true
  enumerable: true,
  configurable: true,
});

alert(user.name); // Pete
user.name = "Alice"; // Error
```

### enumerable 是否可枚举

- 通常，对象的内置 toString 是不可枚举的，它不会显示在 for..in 中。但是如果添加自己的 toString，那么默认情况下它将显示在 for..in 中

```js
let user = {
  name: "John",
  toString() {
    return this.name;
  },
};

Object.defineProperty(user, "toString", {
  enumerable: false, // 设置，则不会出现在for..in中
});

// 默认情况下，我们的两个属性都会列出：
for (let key in user) alert(key); // name, toString
```

### configurable 是否可配置

- 不可配置的属性不能被 defineProperty 删除或修改
- 使属性不可配置是一条单行道。不能将其改回，因 defineProperty 不适用于不可配置的属性

```js
// 将 user.name 设为【永久封闭】的常量
let user = {};
Object.defineProperty(user, "name", {
  value: "John",
  writable: false, // 不可写
  configurable: false, // 不可配置
});

// 不能修改 user.name 或 它的标志
// 下面的所有操作都不起作用：
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", { writable: true }); // 错误
```

### Object.defineProperties(obj, descriptors)，允许一次定义多个属性

```js
// 语法
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2,
  // ...
});
// 示例
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

### Object.getOwnPropertyDescriptors(obj) 获取所有属性描述符

- 返回包含 symbolic 属性在内的所有属性描述符

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
for (let key in user) {
  clone[key] = user[key];
}
```

## 链表

- 存储一个有序的对象列表,快速插入、删除元素
- 链表元素是一个被递归定义的对象

```js
/**
 * value
 * next 属性引用下一个链表元素或者代表末尾的 null
 */
// list 是链条的第一个对象，顺着 next 指针，我们可以抵达任何元素
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
// 列表可以很容易被分为几个部分，然后重新组装回去
let secondList = list.next.next;
list.next.next = null;
list.next.next = secondList; // 合并
// 将新值添加到列表头部
list = { value: "new item", next: list };
// 为了移除中间的一个值，修改前一个元素的 next：
list.next = list.next.next;
```

## Objects 对象

- 排序:数字从小至大;非数字由创建顺序决定
- 对象的属性键只能是 String 类型或者 Symbol 类型

```js
let a = new Object(); // 构造函数的语法
let b = {}; // 字面量的语法

// 创建对象，添加属性及属性值
let c = {
  name: "Satya",
  age: 15,
};
alert(c.name); // 读取属性值
c.isBoy = true; // 添加 boolean类型的属性
delete c.isBoy; // 移除一个属性

/**
 * 计算属性:在对象字面量中使用方括号
 */
let e = prompt("WHT?", "E");
let f = {
  [e]: 5, // 属性名从 e 变量中计算
};
alert(f.E); // 5 如果输入E 结果为5

/**
 * "key" in object // 存在值检查
 */
let g = {
  age: 15,
};
let key = "age";
alert(key in g); // 检查g 里是否有key属性

/**
 * for……in 循环
 * for(key in object){}
 */
let h = {
  name: "Satya",
  age: 15,
};
for (let key in h) {
  alert(key); //
  alert(h[key]);
}

/**
 * Object.assign 复制和合并
 * 语法:Object.assign(dest[, src1, src2, src3...])
 * 复制src1-srcN所有对象到dest
 * 如果接收的对象已经有了同样属性名的属性，前面的会被覆盖
 */
let user = {
  name: "John",
};
let permissions1 = {
  canView: true,
};
let permissions2 = {
  canEdit: true,
};
// 把 permissions1 和 permissions2 的所有属性都拷贝给 user
Object.assign(user, permissions1, permissions2);
// 现在 user = { name: "John", canView: true, canEdit: true }
```

### Symbol 类型

- 值表示唯一的标识符,无法自动转换;
- 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个不影响任何东西的标签。
- 隐藏对象属性，属性不参与 for..in 循环
-

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();
// id 是描述为 "id" 的 Symbol
let id = Symbol("id");
let id1 = Symbol("id");
let id2 = Symbol("id");
alert(id1 == id2); // false

let id3 = Symbol("id");
alert(id3.toString()); // Symbol(id)

/**
 * 全局 symbol
 * 全局 symbol 注册表
 */
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert(id === idAgain); // true

/**
 * 通过全局 symbol 返回一个名称
 * 语法： Symbol.keyFor(sym)
 */
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 从 symbol 中获取 name
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

### 对象方法和 this

- 对象方法：存储在对象中的函数
- 方法可以将该对象引用为 this
- this 不受限制，可以用于任何函数
- this 在运行时求职，可以为任何值
- 箭头函数没有自己的 this

```js
/**
 * 对象方法
 */
let user = {
  name: "Satya",
  age: 15,
};
// user.sayHi = function () {
//   alert("Hello!");
// }
// 箭头函数写法
user.sayHi = () => alert("Hello!");
user.sayHi();

/**
 * 方法简写
 */
let use = {
  sayHi() {
    alert("Hello!!");
  },
};
use.sayHi(); // 调用

/**
 * 方法中的 this
 * 为了访问该对象，方法中可以使用 this 关键字
 * this 的值就是在点之前的这个对象，即调用该方法的对象
 */
let us = {
  name: "Satya",
  age: 15,
  sayHi() {
    alert(this.name); // this=us对象
  },
};

/**
 * 不同对象调用同一函数，this值不同
 */
let user1 = {
  name: "Satya",
};
let user2 = {
  name: "Shakya",
};

function sayHi() {
  alert(this.name);
}
// 在两个对象中使用同一个函数
user1.f = sayHi;
user2.f = sayHi;
// 它们调用时有不同的 this 值。
// 函数内部的 "this" 是点之前的这个对象。
user1.f(); // Satya (this=user1)
user2.f(); // Shakya (this=user2)

/**
 * 严格模式下：this = undefined
 * 非严格模式: this = 全局对象[浏览器的window]
 */
function sayHi() {
  alert(this);
}
sayHi(); // undefined
```

### 构造函数和操作符【new】

- 大写字母命名，只能用[new]操作符来执行
- 构造函数的主要目的 — 实现可重用的对象创建代码
- 通常构造函数没有 return 语句

```js
/**
 * 构造函数
 * 当函数作为 new User()执行时，步骤如下：
 * 1.一个新的空对象被创建并分配给this
 * 2.函数体执行，通常会修改this,为其添加新属性
 * 3.返回this的值
 */
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this.sayHi = () => alert("Say Hi!");
}
// 创建新对象，分配给this
let user = new User("Satya");
alert(user.name);
alert(user.isAdmin);
user.sayHi();
```

### 数字类型

- 所有数字函数（包括 isFinite）中的空字符串或空格字符串均被视为 0

```js
/**
 * 数字类型 科学计数
 * "e" 把数字乘以 1 后面跟着指定数量的 0
 * e 后面的负数表示除以 1 后面跟着给定数量的 0
 */
let num1 = 1e3; // 1*1000
let num2 = 1.23e6; // 1.23*1000000
let num3 = 1e-3; // 1/1000(=0.001)
let num4 = 1.23e-6; //1.23/1000000(=0.00000123)

/**
 * toString(base)
 * 返回带有给定base的进制中的字符串表示
 * base可以从2变到36，默认为10
 * base=16 用于十六进制颜色，字符编码等，数字可以是 0..9 或 A..F。
 * base=2 主要用于调试按位操作，数字可以是 0 或 1
 * base=36 是最大值，数字可以是 0..9 或 A..Z
 */
let num5 = 255;
alert(num5.toString(16)); // ff
alert(num5.toString(2)); // 11111111
// 需要将一个较长的数字标识符变成较短，如做一个简短的URL。可以简单地用基数为 36 的数字系统表示：
alert((123456).toString(36)); // 2n9c // 直接在数字上调用方法需要两个点

alert(0.1 + 0.2 == 0.3); // false
alert(0.1 + 0.2); // 0.30000000000000004
/**
 * 损失精度的解决方式
 * toFixed 总是返回一个字符串。它确保它在小数点后有 2 位数字
 */
let sum = 0.1 + 0.2;
alert(sum.toFixed(2)); // 0.30
alert(+sum.toFixed(2)); // 0.3 使用一元加号，强制为一个数字
alert((0.1 * 10 + 0.2 * 10) / 10); // 0.3

// Hello! I'm a self-increasing number!
alert(9999999999999999); // shows 10000000000000000

/**
 * isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN
 * 值 “NaN” 是独一无二的，它不等于任何东西，包括它本身
 */
alert(isNaN(NaN)); // true
alert(isNaN("str")); // true
alert(NaN === NaN); // false

/**
 * isFinite(value) 将其参数转换为数字，如果是常规数字，则返回 true，而不是 NaN / Infinity / -Infinity
 */
alert(isFinite("15")); // true
alert(isFinite("str")); // false, because a special value: NaN
alert(isFinite(Infinity)); // false, because a special value: Infinity
// 验证字符串值是否为常规数字
let num = +prompt("Enter a number", "");
alert(isFinite(num)); // 结果会是 true，除非输入无穷或不是数字

/**
 * parseInt 和 parseFloat
 * 从字符串中读取数字
 * parseInt() 函数有一个可选的第二个参数，可以解析十六进制数字，二进制数字等字符串
 */
alert(parseInt("100px")); // 100
alert(parseFloat("12.5em")); // 12.5
alert(parseInt("0xff", 16)); // 255
alert(parseInt("ff", 16)); // 255, without 0x also works
alert(parseInt("2n9c", 36)); // 123456

/**
 * 其它常用Math
 */
alert(Math.random()); // 随机数 0-1,不含1
alert(Math.max(3, 5, -10, 0, 1)); // 5 返回最大值
alert(Math.min(1, 2)); // 1 返回最小值
// 返回经过 n 进制转换的 power 值
alert(Math.pow(2, 10)); // 2 in power 10 = 1024
```

### 交互 alert prompt confirm

```js
/**
 * alert 浏览器弹出信息，并赞同脚本，直到用户点击确定
 */
alert("alert");

/**
 * prompt 浏览器显示带有文本消息的模态框，还有input和确定取消按钮
 * 语法：result = prompt(title[, default]);
 * title:显示给用户的文本
 * default:可选参，指定input的初始值
 * result:返回输入的文本，取消输入返回null
 */
let age = prompt("How old are you?", 100);
alert(`You are ${age} years old!`);

/**
 * confirm 显示一个带有question和两个按钮的模态框[确定|取消]
 * 点击确定返回true,点击取消返回false
 * 语法：result = confirm(question);
 */
let isBoss = confirm("Are you the boss?");
alert(isBoss);

/**
 * 输入 name 并输出它。
 */
let name = prompt("Input your name", "user");
alert(`My name is:${name}`);
```

### 条件

```js
let age = prompt("age?", 18);

let message = age < 3 ? "Hi, baby!" : age < 18 ? "Hello!" : age < 100 ? "Greetings!" : "What an unusual age!";

alert(message);
```

### Proxy 对象

- 用于定义基本操作的自定义行为(属性查找，赋值，枚举，函数调用等)

```js
/* 语法：
 * target:需拦截的对象，用Proxy包装的目标对象(可以是任何类型的对象,包括原生数组，函数，甚至另一个代理(proxy))
 * handler:定制拦截行为，一个对象，其属性是当执行一个操作时定义代理的行为的函数。
 */
let p = new Proxy(target, handler);
```

针对对象
不需要对 keys 进行遍历。这解决 Object.defineProperty() 的第二个问题.Proxy 是针对整个 obj 的。所以 obj 内部包含的所有的 key ，都可以走进 set。(省了一个 Object.keys() 的遍历)

```js
let obj = {
  name: "Eason",
  age: 30,
};
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    // Reflect 内置对象,提供拦截js操作的方法。
    // 获取对象身上某个属性的值，类似于 target[name]
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    // 将值分配给属性的函数,返回一个Boolean，如果更新成功，则返回true。
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
proxy.name = "Zoe"; // set name Zoe
proxy.age = 18; // set age 18
```

#### 支持数组

```js
let arr = [1, 2, 3];
let proxy = new Proxy(arr, {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
});
proxy.push(4);
// 能够打印出很多内容
// get push     (寻找 proxy.push 方法)
// get length   (获取当前的 length)
// set 3 4      (设置 proxy[3] = 4)
// set length 4 (设置 proxy.length = 4)
```

嵌套支持
Proxy 也是不支持嵌套的，这点和 Object.defineProperty() 是一样的。因此也需要通过逐层遍历来解决。Proxy 的写法是在 get 里面递归调用 Proxy 并返回

```js
let obj = {
  info: {
    name: "eason",
    blogs: ["webpack", "babel", "cache"],
  },
};
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    // 递归创建并返回
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
// 以下两句都能够进入 set
proxy.info.name = "Zoe";
proxy.info.blogs.push("proxy");
```

```js
let cur = 0;
Object.defineProperty(window, "x", {
  get() {
    cur++;
    console.log(cur);
    return cur;
  },
});
console.log(x === 1 && x === 2 && x === 3); // true
```

```js
/* 实现：(a == 1 && a == 2 && a == 3) */
let a = {
  i: 1,
  toString: function() {
    return a.i++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log("Hello World!");
  console.log(a); // Object对象 Object:{i:4,toString:function(){return a.i++;}}
  console.log(a.i); // 4
  console.log(a.toString); // function(){return a.i++}
}
```

## 事件流分析

- 冒泡流，支持 IE6+
- window[1]-document[2]-body[3]-div[4]-[5](text)[6]-div[7]-body[8]-document[9]-window[10]
- 1-5 捕獲過程,5-6 目標過程,6-10 冒泡過程
- 以下先輸出[btn1],後輸出[content]

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div style="width:200px;height:200px;background:lightblue" id="content">
      <div style="width:100px;height:100px;background: lightyellow;" id="btn1"></div>
    </div>
  </body>
  <script type="text/javascript">
    var content = document.getElementById("content");
    var btn1 = document.getElementById("btn1");
    btn1.onclick = function() {
      alert("btn1"); // 先执行
    };
    content.onclick = function() {
      alert("content"); // 后执行
    };
  </script>
</html>
```

### 自定义对象

- 基于原型的编程语言,没有 class,把函数用作类;

**Example** 姓名的示例

```Javascript
// 人名函数 (名,姓)
function PersonName(first, last) {
    return {
        first: first,
        last: last,
        // 全名
        fullName: function () {
            return this.first + ' ' + this.last;
        },
        // 名姓 翻转
        fullNameReversed: function () {
            return this.last + ',' + this.first;
        }
    }
}

var p1 = PersonName("Lokavit", "Shakya");
console.log(p1); // 返回的是对象
console.log(p1.fullName()); // Lokavit Shakya
console.log(p1.fullNameReversed()); // Shakya,Lokavit


// this
s = PersonName("Simon", "Willison");
var fullName = s.fullName;
fullName(); // undefined undefined(因为指向了全局)

// 使用this 改进PersonName函数:
// this的特定函数不会返回任何值,只会修改this对象本身
function PersonName2(first, last) {
    this.first = first;
    this.last = last;
    // 全名
    this.fullName = function () {
        return this.first + ' ' + this.last;
    }
    // 名姓 翻转
    this.fullNameReversed = function () {
        return this.last + ',' + this.first;
    }
}

var p2 =new PersonName2("Lokavit", "Shakya");


// 创建一次方法函数,在构造函数中引用:
function PersonName3(first,last){
    this.first =first;
    this.last =last;
}
// 返回全名
// prototype:可以被所有PersonName3实例共享的对象;
PersonName3.prototype.fullName =function(){
    return this.first+' '+this.last;
}
// 返回名姓翻转
PersonName3.prototype.fullNameReversed =function(){
    return this.last +','+this.first;
}


// 运行时,给已存在的对象添加额外方法:
var p3 =new PersonName3("Lokavit", "Shakya");
// 给新实例添加一个 名转大写的函数
PersonName3.prototype.firstNameCaps =function(){
    return this.first.toUpperCase();
}
p3.firstNameCaps(); // LOKAVIT


// 将对象转换成字符串:
var p4 =new PersonName3("Lokavit", "Shakya");

PersonName3.prototype.toString =function(){
    return '<Person:'+this.fullName()+'>';
}
// <Person:Lokavit Shakya>
console.log(p4.toString());


// 使用call():设置this,但它带有一个扩展的参数列表，非数组
function lastNameCaps(){
    return this.last.toUpperCase();
}

var p5 =new PersonName3("Lokavit", "Shakya");
lastNameCaps.call(p5); // SHAKYA
// 和以下方式等价
p5.lastNameCaps =lastNameCaps;
p5.lastNameCaps();
```

---

## GitHub

```js
// 个人主信息
let url = "https://api.github.com/users/用户名";
// 个人所有repo
let url = "https://api.github.com/users/用户名/repos";
// repo详细信息
let url = "https://api.github.com/repos/用户名/仓库名";
// 获取某个repo的内容列表
let url = "https://api.github.com/repos/用户名/仓库名/contents";
// 获取repo中子目录的内容列表 获取repo中某文件信息（不包括内容）
let url = "https://api.github.com/repos/用户名/仓库名/contents/子文件夹/子子文件夹";
// 获取某文件的原始内容（Raw） 也就是每个.md文件的内容
let url = "https://raw.githubusercontent.com/用户名/仓库名/master/子文件夹/子子文件夹/文件名.md";
let url = "https://raw.githubusercontent.com/用户名/仓库名/master/子文件夹/子子文件夹/" + title;
```
