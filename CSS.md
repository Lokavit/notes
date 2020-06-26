# CSS & CSS3

## CSS 规范

- BEM 方式:把所有东西划分为一个独立的模块，可以相互嵌套
- 双下划线[B__E,menu__item]
- 单下划线[B_E,menu_active;E_M,item_active]
- 中划线表示字符链接
- 非百分百确定不嵌套，不考虑使用标签选择器

```CSS
/* BEM 命名规范  块级之下才需要，便于读懂代码 */
.block{} /* 代表了更高级别的抽象或组件 */
.block__element{} /* 代表.block的后代，用于形成一个完整的.block的整体 */
.block--modifier{} /* 代表.block的不同状态或不同版本 */

/* class 规范 */
.c-   /*  Component c-card c-checklist */
.l-   /*  Layout module l-grid l-container */
.h-   /*  Helpers  h-show h-hide 通常!important用于提高其特异性 */
.is-  /*  States is-visible 指示c-组件可以具有不同状态 */
.has- /*  States has-loaded */
.js-  /*  JavaScript hooks js-tab-switcher js行为附加到组件，仅用于便捷操作DOM */
.t- /* 主题命名 */
.g- /* 全局 */

/* 示例 元素 */
.btn{} /* 按钮基础样式 */
.btn-info{} /* 按钮的状态 */
.btn-primary{}  /* 按钮的另一状态 */

/* 示例 组件 */
.site-search{} /* 块 */
.site-search__field{} /* 元素 */
.site-search--full{} /* 修饰符 */
```

```css 字体统一设定
/* var.css */
.font-size__defalut {
  font-size: 1rem;
}
:root {
  --site-font-size: 1rem;
}
.font-size__small {
  font-size: var(--site-font-size * 0.7);
}
```

```css
/* .blockName-elName.modifier */
.menu .menu-item .menu-item.active .shopCart .shopCart-title .shopCart-item .shopCart-item.selected .article {
} // 文章块
.article__header {
} // 文章头部元素
.article__header .title {
} // 文章头部元素 的标题
.article__footer {
} // 文章尾部元素
.article--project {
} // 文章修饰符 project 页面
.article--about {
} // 文章修饰符 about 页面
```

```html
<form class="site-search  site-search--full">
  <input type="text" class="site-search__field" />
  <input type="Submit" value="Search" class="site-search__button" />
</form>
<!--  严格的BEM,非BEEM -->
<div class="c-card">
  <div class="c-card__header">
    <h2 class="c-card__title">Title text here</h2>
  </div>

  <div class="c-card__body">
    <img class="c-card__img" src="some-img.png" alt="description" />
    <p class="c-card__text">Lorem ipsum dolor sit amet, consectetur</p>
    <p class="c-card__text">
      Adipiscing elit.
      <a href="/somelink.html" class="c-card__link">Pellentesque amet</a>
    </p>
  </div>
</div>

<!-- 处理 多种形态 -->
<button class="c-button c-button--rounded c-button--small">Click me!</button>
<button class="c-button c-button--primary c-button--huge  is-active">Click me!</button>
<!-- .className [class^="className"], [class*="className"]在样式表中使用它来模拟原始CSS中的扩展功能 -->
<button class="c-button c-button--primary-huge  is-active">Click me!</button>


<!-- 处理 多种状态 -->
<!-- standalone state hook -->
<div class="c-card is-active">[…]</div>
<!-- or BEM modifier -->
<div class="c-card c-card--is-active">[…]</div>

<!-- 处理多个相同子元素 -->
<ul class="l-grid">
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">
        […]
      </div>
      <div class="c-card__body">
        […]
      </div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">
        […]
      </div>
      <div class="c-card__body">
        […]
      </div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">
        […]
      </div>
      <div class="c-card__body">
        […]
      </div>
    </div>
  </li>
  <li class="l-grid__item">
    <div class="c-card">
      <div class="c-card__header">
        […]
      </div>
      <div class="c-card__body">
        […]
      </div>
    </div>
  </li>
</ul>

<!-- 处理 嵌套组件 -->
<div class="c-card">
    <div class="c-card__header">
        <h2 class="c-card__title">Title text here</h3>
    </div>

    <div class="c-card__body"><div class="c-card__body">

        <p>I would like to buy:</p>

        <!-- Much nicer - a layout module -->
        <ul class="l-list">
            <li class="l-list__item">

                <!-- A reusable nested component -->
                <div class="c-checkbox">
                    <input id="option_1" type="checkbox" name="checkbox" class="c-checkbox__input">
                    <label for="option_1" class="c-checkbox__label">Apples</label>
                </div>

            </li>
            <li class="l-list__item">

                <div class="c-checkbox">
                    <input id="option_2" type="checkbox" name="checkbox" class="c-checkbox__input">
                    <label for="option_2" class="c-checkbox__label">Pears</label>
                </div>

            </li>
        </ul>
        <!-- .l-list -->

    </div>
    <!-- .c-card__body -->
</div>
<!-- .c-card -->


```

---

## em & rem

- em:字体排印单位。若选择器 font-size:20px,则 1em=20px;即相对尺寸
- rem:根 em。将根节点作为基数。解决 em 的计算问题
- em&rem:如果属性根据 font-size 进行计算，使用 em。否则使用 rem;

```css
h1 {
  font-size: 20px;
} /* 1em=20px */
h2 {
  font-size: 16px;
} /* 1em=16px */
h1 {
  font-size: 2em;
} /* 若该父元素为html，则2em=2*16px */
html {
  font-size: 100%;
} /* 16px */

h1 {
  font-size: 2em; /* 1em = 16px */
  margin-bottom: 1em; /* 1em = 32px 即用font-size为基数计算结果 */
}
p {
  font-size: 1em; /* 1em = 16px */
  margin-bottom: 1em; /* 1em = 16px */
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem; /* 1rem = 16px 不受font-size影响 */
}
p {
  font-size: 1rem;
  margin-bottom: 1rem; /* 1rem = 16px */
}
```

- initial(初始)、inherit(继承)、unset(未设置)、revert(还原)

实现效果:如果.content 内容高度较小，则.footer 定位在窗口底部;如果.content 内容高度较高(超过一屏)，则.footer 跟随在后面。【注: footer 元素高度不固定，content 不可拉伸】(可写多种实现方式) 答案写在右侧空白处

```html
<body>
  <main class="content">内容</main>
  <footer class="footer">底部</footer>
</body>
```

```css
题意理解要准确：.content不拉伸，不要影响浏览器默认的滚动；
flex布局是相对大家比较容易想到的实现：.container { display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh;} 但是IE9不支持。
另外实现：.container{ display: table; min-height:100vh;}.footer{ display: table-footer-group; /* IE8+支持 */} Seasonley的实现。
如果footer高度固定，则实现方法就很多了，例如，绝对定位固定在底部，或者margin负值定位。
grid布局也是可以实现类似效果：.container {display: grid; min-height: 100vh; align-content: space-between;}
满分回答：.container { display: flex; flex-direction: column; min-height: 100vh;
}footer { margin-top: auto;}
margin:auto是非常体现CSS理解深度的一个CSS声明。
auto 智能的剩余宽度分配。元素如果没有高宽，尺寸会拉伸（或处在可拉伸上下文中），则此时auto会智能分配剩余空间，实现上下左右或者居中对齐效果。
flex布局下的所有元素就处于一种可尺寸可拉伸的上下文环境，所有，此时，footer设置margin-top: auto是可以顶部对齐的（margin-top自动剩余空间）。
```

### table 打点

- 实现以下效果

```js
/*
 // 标题后打点，并且保证右边所有tag对齐
这是一个标题，比较长…… [古代][连载][54.82万字]
比较长比较长比较长比较长…… [现代][完本][1万字]
比较长比较长比较…… [同人][完本][1059.98万字]

// 标题前面打点，并且保证右边所有tag对齐
……这是一个标题，比较长 [古代][连载][54.82万字]
……比较长比较长比较长比较长 [现代][完本][1万字]
……比较长比较长比较 [同人][完本][1059.98万字]
*/

大家布局其实这3类：float+overflow，然后是flex布局，很少人使用的table布局。
float布局技巧：float:right+overflow:hidden;text-overflow:ellipsis;white-space:nowrap; 原理：overflow:hidden可以创建格式化上下文，也就是BFC，类似结界，不受浮动影响，自动分配剩余空间。
flex布局：display:flex > flex: 1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
重点是table布局：float布局有个非常明显的不足，那就是DOM的位置和视觉是不一致的。XboxYan 的table布局虽然效果有，但是却有很多的不足。1. 左侧table-cell的尺寸不建议使用字符撑开，然后内容绝对定位打点布局有较大的限制。非table-layout:fixed的表格，其每个单元格尺寸宽度是根据里面内容自动分配的，如果你没有设置white-space: nowrap是自动宽度自适应的。但是设置了white-space: nowrap则尺寸表现就不符合要求，怎么办呢？其实很简单，再嵌套一层display:table;table-layout:fixed;的元素。table布局中，打点只能在table-layout:fixed的场景下。所以，我们设置很大宽度的table-cell的子元素display:table;table-layout:fixed;此时就能正常打点了。优点：兼容性更好，DOM顺序符合认知。
开头打点direction: rtl就可以。
```

### position

> fixed & absolute 区别
> 无滚动条时无区别，有滚动条时，fixed 不会随着页面滚动，而 absolute 则会随之滚动。

## 僞類 & 僞元素

- 僞類：基於元素特徵，添加一些選擇器的特殊效果
- :active :hover :link :visited
- 伪元素的内容实际上和普通 DOM 元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中

## variables 变量

```css
/* 全局变量 */
:root {
  /* 主体背景色 */
  --global-bgcolor: #333;
  /* 主体文字颜色 */
  --global-color: #d3dce6;
}
.div1 {
  background-color: var(--global-bgcolor);
}
.div2 {
  background-color: var(--global-bgcolor);
}

/* 变量计算  不能直接写单位，需用calc计算 */
--gap: 20;
margin-top: calc(var(--gap) * 1px);
```

### 前背景自动配色

按钮的 Color 值会根据 background-color 做出相应调整，根据 background-color 将 color 换成 black 或 white。border-color 也可用于相同逻辑
最简单的方式:使用 CSS 的 HSL 来设置颜色的值，借助 css 自定义的特性.
基于一些 CSS 参数被限制为最小值和最大值
opacity:0~1; RGB:0~255;
HSL:H0~360,SL0~100
HSL 设置颜色为例，将任何负值限制为 0（不管色相和饱和度如何，结果是黑色）；将任何大于 100%的值限制为 100%（总是白色）。
负值表示白色，正值表示黑色：

```css
{
  /* 色相 取值范围在0-360°的圆心角，每个角度可以代表一种颜色 */
  --hue: 220;
  /* 饱和度 颜色纯度 */
  --sat: 100;
  /* 亮度 控制纯色在混入的黑白两种颜色 */
  --light: 50;
  /* 阈值 通常在[50-70]之间 */
  --threshold: 60;
  /* 边框阈值 通常为[80] */
  --border-threshold: 80;
  /* 从(--light)参数中减去所需阈值(--threshold临界值[50-70]* -100%) */
  calc((var(--light)-var(--threshold))*-100%)}
```

```css
/* src/assets/styles/global.css */
:root {
  --hue: 220; /* 亮度 */
  --saturation: 90; /* 亮度 */
  --light: 36; /* 亮度 */
}

/* src/assets/styles/button.css */
.btn {
  background-color: hsl(var(--hue), calc(var(--saturation) * 1%), calc(var(--light) * 1%));
}
```

- 利用以上，重写代表不同类型的按钮
  HSL hue + 60：重新计算--h 变量值，在--hue 值基础上增加 60。因为 HSL 中的 H（其实就是 Hue）参数在 360 时没有封顶这样的行为。因为它的行为类似一个角度，所以值超过 360 时并不会一直停留在该位置。比如说 400，其实相当于 40（400 - 360 = 40）
  这样一来，只需在.btn-secondary 上重置--h 的值：

```css
:root {
  --hue: 220; /* 亮度 */
  --sat: 100; /* 亮度 */
  --light: 50; /* 亮度 */
  --threshold: 65; /* 阈值 */
  --border-threshold: 80; /* 边框阈值 */
}
.btnss {
  /* 用于色调操作的辅助变量 */
  --h: var(--hue);
  /* 设置基类的背景 */
  background: hsl(var(--h), calc(var(--sat) * 1%), calc(var(--light) * 1%));
  /* 1) 低于阈值的任何亮度值将导致白色，任何上述将导致黑色 */
  --switch: calc((var(--light) - var(--threshold)) * -100%);
  color: hsl(0, 0%, var(--switch));
  /* 2) 只有当亮度高于边界阈值时，边框才会变暗30％ */
  --border-light: calc(var(--light) * 0.7%);
  --border-alpha: calc((var(--light) - var(--border-threshold)) * 10);
  border: 0.2em solid hsla(var(--h), calc(var(--sat) * 1%), var(--border-light), var(--border-alpha));
}
.btnss--secondary {
  /* 3) 将背景颜色设置为60º旋转色调 */
  --h: calc(var(--hue) + 60);
}
```

```css
/*
RGB设置按钮元素有关于颜色部分的属性值也是可以的，这里会用到一些颜色计算的公式，即：使用RGB中的R、G和B分别乘以相关系数模拟出一个L。这里分别会用到sRGB Luma和W3C方法算法（公式）*/
:root {
  /* theme color variables to use in RGB declarations */
  --red: 128;
  --green: 40;
  --blue: 220;
  /*the threshold at which colors are considered "light". 
Range: decimals from 0 to 1,
recommended 0.5 - 0.6*/
  --threshold: 0.6;
  /*the threshold at which a darker border will be applied.
Range: decimals from 0 to 1,
recommended 0.8+*/
  --border-threshold: 0.8;
}

.btn {
  /* 
Calcs perceived brightness using the 
sRGB Luma method
lightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
*/
  --r: calc(var(--red) * 0.2126);
  --g: calc(var(--green) * 0.7152);
  --b: calc(var(--blue) * 0.0722);

  --lightness: calc((var(--r) + var(--g) + var(--b)) / 255);

  /*
1) Any lightness value above the threshold will be considered "light", therefore apply a black text color. Any bellow will be considered dark, and use white color. 
This results from appying either a sub-zero (negative) or a higher-than-100 lightness value, which are capped to 0 and 100 respectively, to a HSL declaration
*/
  color: hsl(0, 0%, calc((var(--lightness) - var(--threshold)) * -10000000%));

  /*
2) sets the border as a 50% darker shade of the base color, ONLY if background color luma is higher than the border threshold.
To achieve this I use the same sub-zero or higher-than-max technique, only this time using the Alpha value from an RGBA declaration. 
This results in a border that's either fully transparent or fully opaque
*/
  --border-alpha: calc((var(--lightness) - var(--border-threshold)) * 100);

  border-color: rgba(calc(var(--red) - 50), calc(var(--green) - 50), calc(var(--blue) - 50), var(--border-alpha));

  /* 3)sets the background for the base class*/
  background: rgb(var(--red), var(--green), var(--blue));
}

.btn--w3c {
  /* Alternative calc using the 
  W3C luma method
  lightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255
  */
  --r: calc(var(--red) * 0.299);
  --g: calc(var(--green) * 0.587);
  --b: calc(var(--blue) * 0.114);
}
```

## CSS 响应式设计

### media 媒体查询

- 针对不同的媒体类型定义不同的样式

```css
body {
  background-color: lightgreen;
}
@media only screen and (max-width: 500px) {
  body {
    background-color: lightblue;
  }
}

.example {
  padding: 20px;
  color: white;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .example {
    background: red;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .example {
    background: green;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .example {
    background: blue;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .example {
    background: orange;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .example {
    background: pink;
  }
}
```

##

```CSS
/*将.primary_nav 下边的子级目录下的a链接字体改成16px;*/
nav .primary_nav > li > a {font-size:16px;}

/*将.primary_nav 下边的所有li下的所有a获取到，并改变字体大小为16px;*/
nav .primary_nav li a {font-size:16px;}
```