# Web Components

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

