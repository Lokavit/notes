# 优化

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

