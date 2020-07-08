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

