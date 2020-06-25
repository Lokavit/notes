# HTML 入门

超文本编辑语言，作为页面的结构。Emmet:快速构建 HTML 结构的快捷语法。

## 文件和网站结构

- 标题、导航、主要内容、侧边栏、页脚;
- 结构化，使用正确的元素，遵守语义;
- **header** 页面或片段的头部 [标题|介绍|一组导航];
- **nav** 页面导航区链接,可以有多个;
- **main** 页面的主要区域 [通常在 body 之下,其它标签之上];
- **article** 页面独立的内容 [正文/图文/博客内容等];
- **section** 对于文章或页面内容进行分块[一组标题/摘要];
- **aside** 页面主区域内容之外的内容[侧边栏/目录/术语表条目/作者简介/相关链接等];
- **footer** 页面或片段的底部[版权信息];
- **div**:仅在找不到更好的块级时使用;

## HTML 规范

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>NEC：更好的CSS方案</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="shortcut icon" href="img/favicon.ico" />
    <link rel="apple-touch-icon" href="img/touchicon.png" />
  </head>
  <body>
    <header></header>
    <main>
      <nav></nav>
      <section></section>
    </main>
    <footer></footer>
    <script type="module" src="./xxx.js"></script>
  </body>
</html>
```

- 结构上可以并列就不要嵌套;
- 满足视觉语义化不要冗余结构;
- 一个标签上 className 不要过多; [badcode:<div class="class1 class2 class3 class4"></div>]
- 语义化的内部标签避免使用 className[bodcode:<ul class="m-help"><li class="itm"></li><li class="itm"></li></ul>]
- 开始注释：<!-- 注释文案 -->（文案两头空格）。
- 结束注释：<!-- /注释文案 -->（文案前加“/”符号，类似标签的闭合）。
- 严格嵌套。如内联元素不能包含块级元素；正确且必须闭合标签
- 属性和值全部小写。
- 可以省略 style 和 script 的 type 属性

---

## 已过时

```html
<!-- 已过时，随时废弃  -->
<link rel="import" href="temp.html" />
```

### FORM 表单

```html
<!-- 类型 ，最小字符数，最大字符数，必填，正则验证，属性， -->
<input type="text" minlength="3" maxlength="8" required pattern="" name="user" title="" />
<!-- 数字验证 -->
<input type="number" pattern="[-+]?[0-9]" />
<input type="number" min="3" max="42" pattern="[3-9]|[1-3][0-9]|4[0-2]" />
```

```js
// 该validity属性以布尔（true/ false）值的形式提供有关表单字段的一组信息
var myField = document.querySelector('input[type="text"]');
var validityState = myField.validity;
/*
返回的对象包含以下属性：
valid-是true字段通过验证时。
valueMissing-是true当字段为空但必填时。
typeMismatch-是，true当字段type是email或url但输入value的不是正确的类型时。
tooShort-是true当字段包含minLength属性并且输入value的长度短于该长度时。
tooLong-是true当字段包含maxLength属性并且输入value的长度大于该长度时。
patternMismatch-是true当字段包含pattern属性并且输入的内容value与模式不匹配时。
badInput-是，true当输入type为number并且输入value的不是数字时。
stepMismatch-是true当字段具有step属性并且输入的内容value不符合步骤值时。
rangeOverflow-是true当字段具有max属性并且输入的数字value大于最大值时。
rangeUnderflow-是true当字段具有min属性并且输入的数字value小于最小值时。
*/
```

```html
<!-- form 请求方式 ，非自动填充，ajax的url(js中覆盖),表单命名 -->
<form method="POST" autocomplete="off" action="" name="role">
  <!-- 表单分区块 -->
  <fieldset>
    <legend>区块信息的标题</legend>
    <!-- label和input同级关系，需要前者的for,后者的name -->
    <label for="name">角色名</label> <input type="text" name="name" value="" autofocus autocomplete="on" required="required" placeholder="请输入角色名" />

    <!-- label包裹input，前者无需for，后者name隐含关联。-->
    <label
      >角色名
      <!-- 类型, 属性名，输入值，自动聚焦(一个页面只有一个可设置)，自动填充，合法校验，占位符 -->
      <input type="text" name="name" value="" autofocus autocomplete="on" required="required" placeholder="请输入角色名"
    /></label>
  </fieldset>
  <!-- 提交按钮，触发ajax -->
  <input type="submit" value="提交" />
  <!-- 其他按钮，js实现按钮事件,无需添加label元素 -->
  <input type="button" value="增项" id="additem" />
</form>

<!-- <output> 标签表示计算或用户操作的结果 -->
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" name="b" value="50" /> + <input type="number" name="a" value="10" /> =
  <output name="result"></output>
</form>

<!-- 进度条，通常用js操作 -->
<progress value="70" max="100">70 %</progress>
```

## 元素

- **块级元素**:在页面中以块形式展开,其它元素会被迫换行;通常用于(段落、列表、导航、页脚等);以*block*形式展开，不会被嵌套进内联元素，但可以嵌套于其它块级元素;
- **内联元素**:通常于块级元素中,并包裹文档内容一小部分;而非整个段落或一组内容;该元素不会导致强制换行;
- **空元素**:不含结束标签的元素;

HTML <details>元素可创建一个挂件，仅在被切换成展开状态时，它才会显示内含的信息。<summary> 元素可为该部件提供概要或者标签。

- 获取 form 表单 Input 值的多种方式

```html
<head>
  <script type="text/javascript">
    function f() {
      //方法一：
      var firstName = document.getElementById("first").value;
      var lastName = document.getElementById("last").value;
      console.log(firstName + "  " + lastName);

      //方法二：
      var firstName2 = document.login.firstName.value;
      var lastName2 = document.login.lastName.value;
      console.log(firstName2 + "  " + lastName2);

      //方法三
      var firstName3 = document.forms[0].firstName.value;
      var lastName3 = document.forms[0].lastName.value;
      console.log(firstName3 + "  " + lastName3);

      //方法四：
      var firstName4 = document.forms["myform"].firstName.value;
      var lastName4 = document.forms["myform"].lastName.value;
      console.log(firstName4 + "  " + lastName4);

      //方法五：
      var firstName5 = login.firstName.value;
      var lastName5 = login.lastName.value;
      console.log(firstName5 + "  " + lastName5);
    }
  </script>
</head>
<body>
  <form action="#" name="login" id="myform">
    first name: <input type="text" name="firstName" id="first" /><br />
    last name: <input type="text" name="lastName" id="last" /><br />
    <input type="button" value="确定" οnclick="f()" /><br />
  </form>
</body>
```

```html
<!-- autocomplete 是否自动填写 -->
<form method="post" action="/users" autocomplete="off">
  <fieldset>
    <legend>创建角色</legend>
    <!-- tabindex="0"  页面元素焦点，正值递增，负值不聚焦 -->
    <p>
      <label for="uname">昵称: <input placeholder="请输入昵称" name="uname" required="required" autofocus="autofocus" autocomplete="on"/></label>
    </p>
    <p>
      <label for="utitle">头衔: <input placeholder="请输入头衔" name="utitle" required="required" autofocus="autofocus" autocomplete="on"/></label>
    </p>
    <p>
      门派:
      <input type="radio" id="r" name="drone" value="r" checked />
      <label for="r">R</label>
      <input type="radio" id="s" name="drone" value="s" />
      <label for="s">S</label>
      <input type="radio" id="d" name="drone" value="d" />
      <label for="d">D</label>
    </p>
    <p><input type="reset" value="Reset" /> <input type="submit" value="Send!" /></p>
  </fieldset>
</form>

<!--
在HTML5中，您可以使用form属性（通过输入，按钮和其他与表单相关的元素定义）将元素与文档中任何位置的表单相关联。
要将元素与不是前提的表单相关联，请将form属性设置为表单的id值。
以下代码显示了如何使用表单Attribute。
-->
<body>
  <form id="voteform" method="post" action="http://example.com/form">
    <p>
      <label for="fave">Fruit: <input autofocus id="fave" name="fave"/></label>
    </p>
  </form>
  <p>
    <label for="name">Name: <input form="voteform" id="name" name="name" /> </label>
  </p>
  <button form="voteform" type="submit">Submit Vote</button>
  <button form="voteform" type="reset">Reset</button>
</body>
```

```css
ideally you’d not be cluttering the form with extra divs.

You can easily layout a form using inherent form elements in the css

form {}
form fieldset { }
form fieldset label {}
form fieldset input {}
form fieldset input[type=radio] {}
form fieldset input[type=checkbox] {}

// for yes / no or gender = M /F type questions //
form fieldset fieldset {}
form fieldset fieldset legend {}
form fieldset fieldset label {}
form fieldset fieldset input[type=radio] {}

Styling forms using JUST the form elements is easy (depending on the complexity of your form – and I’ve done some VERY complex forms this way) AND a lot of fun!

Have a go. Don’t be lazy and revert to divs!

```

---

# HTML 表单

## 基本指南

- 表单部件(文本字段、选择框、按钮、复选、单选等);
- 多数发送至 web 服务器;

### 通用属性

- **autofocus**:允许指定页面加载时元素自动有焦点;
- **disabled**:元素禁止交互;
- **name**:元素名称,用于表单数据提交;
- **value**:元素的初始值;

### 文本输入域

- **readonly**:用户不能修该输入值;
- **disabled**:输入值不会随表单数据一起发送;
- **placeholder**:描述输入框的目的;

### 下拉内容

- **select box**:普通选择框;
- **autocomplete box**:自动选择框;

**Example** 下拉选择示例

```HTML
<!-- 基础下拉选择框 -->
<select id="simple" name="simple">
  <option>Banana</option>
  <option>Cherry</option>
  <option>Lemon</option>
</select>

<!-- 带选项分组的下拉选择框 -->
<select id="groups" name="groups">
    <optgroup label="fruits">
        <option>Banana</option>
        <option selected>Cherry</option>
        <option>Lemon</option>
    </optgroup>
    <optgroup label="vegetables">
        <option>Carrot</option>
        <option>Eggplant</option>
        <option>Potato</option>
    </optgroup>
</select>

<!-- 多选选择框 -->
<select multiple id="multi" name="multi">
    <option>Banana</option>
    <option>Cherry</option>
    <option>Lemon</option>
</select>

<!-- 自动补全输入框 {输入一个字符开始,自动筛出相关选项}-->
<label for="myFruit">What's your favorite fruit?</label>
<input type="text" name="myFruit" id="myFruit" list="mySuggestion">
<datalist id="mySuggestion">
    <option>Apple</option>
    <option>Banana</option>
    <option>Blackberry</option>
    <option>Blueberry</option>
    <option>Lemon</option>
    <option>Lychee</option>
    <option>Peach</option>
    <option>Pear</option>
</datalist>

<!-- 对于不支持datalist的备选方案 -->
<label for="myFruit">What is your favorite fruit? (With fallback)</label>
<input type="text" id="myFruit" name="fruit" list="fruitList">

<datalist id="fruitList">
  <label for="suggestion">or pick a fruit</label>
  <select id="suggestion" name="altFruit">
    <option>Apple</option>
    <option>Banana</option>
    <option>Blackberry</option>
    <option>Blueberry</option>
    <option>Lemon</option>
    <option>Lychee</option>
    <option>Peach</option>
    <option>Pear</option>
  </select>
</datalist>

```

### 可选中项

- 单选框及复选框;使用*checked*属性;

**Example**

```HTML
<!-- 复选框 -->
<input type="checkbox" checked id="carrots" name="carrots" value="carrots">

<!-- 单选按钮 -->
<input type="radio" checked id="soup" name="meal">

<!-- 一组单选按钮 -->
<fieldset>
    <legend>What is your favorite meal?</legend>
    <ul>
        <li>
            <label for="soup">Soup</label>
            <input type="radio" checked id="soup" name="meal" value="soup">
        </li>
        <li>
            <label for="curry">Curry</label>
            <input type="radio" id="curry" name="meal" value="curry">
        </li>
        <li>
            <label for="pizza">Pizza</label>
            <input type="radio" id="pizza" name="meal" value="pizza">
        </li>
    </ul>
</fieldset>

```

### 按钮

- **Submit**:将表单数据发送到服务器;
- **Reset**:重置所有小部件默认值;
- **Anonymous**:没有自动生效的按钮;

## 验证 & 提交数据

### 表单校验

- **:valid**:该元素验证通过的 css 伪类;
- **:invalid**:该元素未通过验证的 css 伪类;
- **required**:必填项(输入空被视为无效);

**Example** 输入是否成功
_成功为黑色边框,否则为红色虚线边框;为空会有提示_

```HTML
<style>
    input:invalid {
        border: 2px dashed red;
    }

    input:valid {
        border: 2px solid black;
    }
</style>

<form>
    <label for="choose">Would you prefer a banana or cherry?</label>
    <input id="choose" name="i_like" required>
    <button>Submit</button>
</form>
```

**Example** 使用正则表达式验证

```HTML
<form>
  <label for="choose">Would you prefer a banana or a cherry?</label>
  <input id="choose" name="i_like" required pattern="banana|cherry">
  <button>Submit</button>
</form>
```

**Example** 强制输入长度

```HTML
<form>
    <div>
        <label for="choose">Would you prefer a banana or a cherry?</label>
        <input id="choose" name="i_like" required minlength="6" maxlength="6">
    </div>
    <div>
        <label for="number">How many would you like?</label>
        <input type="number" id="number" name="amount" value="1" min="1" max="10">
    </div>
    <div>
        <button>Submit</button>
    </div>
</form>
```

**Example** 自定义错误信息

```HTML
<form>
    <label for="mail">I would like you to provide me an e-mail</label>
    <input type="email" id="mail" name="mail">
    <button>Submit</button>
</form>

<!-- 自定义错误消息的javaScript -->
<script>
    var email = document.getElementById("mail");

    email.addEventListener("input", function (event) {
        if (email.validity.typeMismatch) {
            email.setCustomValidity("I expect an e-mail, darling!");
        } else {
            email.setCustomValidity("");
        }
    });
</script>
```

### 使用 JavaScript 校验表单

**Example** 校验约束 API

```HTML
<form novalidate>
<p>
    <label for="mail">
    <span>Please enter an email address:</span>
    <input type="email" id="mail" name="mail">
    <span class="error" aria-live="polite"></span>
    </label>
</p>
<button>Submit</button>
</form>

<script>
// 有许多方式可以获取 DOM 节点；在此我们获取表单本身和
// email 输入框，以及我们将放置错误信息的 span 元素。

var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
  // 当用户输入信息时，验证 email 字段
  if (email.validity.valid) {
    // 如果验证通过，清除已显示的错误消息
    error.innerHTML = ""; // 重置消息的内容
    error.className = "error"; // 重置消息的显示状态
  }
}, false);
form.addEventListener("submit", function (event) {
  // 当用户提交表单时，验证 email 字段
  if (!email.validity.valid) {

    // 如果验证失败，显示一个自定义错误
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";
    // 还需要阻止表单提交事件，以取消数据传送
    event.preventDefault();
  }
}, false);
</script>
```

**Example**

```CSS
form {
    max-width: 200px;
}

p * {
    display: block;
}

input[type=email] {
    -webkit-appearance: none;
    width: 100%;
    border: 1px solid #333;
    margin: 0;
    font-family: inherit;
    font-size: 90%;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

/* 验证失败的元素样式 */

input:invalid {
    border-color: #900;
    background-color: #FDD;
}

input:focus:invalid {
    outline: none;
}

/* 错误消息的样式 */

.error {
    width: 100%;
    padding: 0;
    font-size: 80%;
    color: white;
    background-color: #900;
    border-radius: 0 0 5px 5px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.error.active {
    padding: 0.3em;
}
```

---

**Example** 非校验约束 API

```HTML
<form>
  <p>
    <label for="mail">
        <span>Please enter an email address:</span>
        <input type="text" class="mail" id="mail" name="mail">
        <span class="error" aria-live="polite"></span>
    </label>
  <p>
  <!-- Some legacy browsers need to have the `type` attribute
       explicitly set to `submit` on the `button`element -->
  <button type="submit">Submit</button>
</form>

<script>
    // 使用旧版浏览器选择 DOM 节点的方法较少
    var form = document.getElementsByTagName('form')[0];
    var email = document.getElementById('mail');

    // 以下是在 DOM 中访问下一个兄弟元素的技巧
    // 这比较危险，很容易引起无限循环
    // 在现代浏览器中，应该使用 element.nextElementSibling
    var error = email;
    while ((error = error.nextSibling).nodeType != 1);

    // 按照 HTML5 规范
    var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // 许多旧版浏览器不支持 addEventListener 方法
    // 这只是其中一种简单的处理方法
    function addEvent(element, event, callback) {
        var previousEventCallBack = element["on" + event];
        element["on" + event] = function (e) {
            var output = callback(e);

            // 返回 `false` 来停止回调链，并中断事件的执行
            if (output === false) return false;

            if (typeof previousEventCallBack === 'function') {
                output = previousEventCallBack(e);
                if (output === false) return false;
            }
        }
    };

    // 现在我们可以重构字段的验证约束了
    // 由于不使用 CSS 伪类, 我们必须明确地设置 valid 或 invalid 类到 email 字段上
    addEvent(window, "load", function () {
        // 在这里验证字段是否为空（请记住，该字段不是必需的）
        // 如果非空，检查它的内容格式是不是合格的 e-mail 地址
        var test = email.value.length === 0 || emailRegExp.test(email.value);

        email.className = test ? "valid" : "invalid";
    });

    // 处理用户输入事件
    addEvent(email, "input", function () {
        var test = email.value.length === 0 || emailRegExp.test(email.value);
        if (test) {
            email.className = "valid";
            error.innerHTML = "";
            error.className = "error";
        } else {
            email.className = "invalid";
        }
    });

    // 处理表单提交事件
    addEvent(form, "submit", function () {
        var test = email.value.length === 0 || emailRegExp.test(email.value);

        if (!test) {
            email.className = "invalid";
            error.innerHTML = "I expect an e-mail, darling!";
            error.className = "error active";

            // 某些旧版浏览器不支持 event.preventDefault() 方法
            return false;
        } else {
            email.className = "valid";
            error.innerHTML = "";
            error.className = "error";
        }
    });
</script>
```

**Example**

```CSS
form {
  max-width: 200px;
}

p * {
  display: block;
}

input.mail {
  -webkit-appearance: none;

  width: 100%;
  border: 1px solid #333;
  margin: 0;

  font-family: inherit;
  font-size: 90%;

  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/* 验证失败的元素样式 */
input.invalid{
  border-color: #900;
  background-color: #FDD;
}

input:focus.invalid {
  outline: none;
}

/* 错误消息的样式 */
.error {
  width  : 100%;
  padding: 0;

  font-size: 80%;
  color: white;
  background-color: #900;
  border-radius: 0 0 5px 5px;

  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.error.active {
  padding: 0.3em;
}
```

# Canvas

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
