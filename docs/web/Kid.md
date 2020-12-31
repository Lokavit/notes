# KID-Block 积木库

`pro版及jr版，分别输出单文件。`

# 需求

- 积木块
- 生成多语言代码

## 文件入口

- 分为 jr 和 pro 两版
- 每版又有纵横两版布局

# Blockly 多个二开版本比较

- 经过比较，采用 pxt-blockly 为基础版本

<!-- ## google/blockly
- google 出品，对 windows 兼容不好，难编译。
## @code-dot-org/blockly
- 使用了 good 的 js 库中一些工具 -->

## pxt-blockly

- microsoft 出品，修复大量 Edge 下的问题，并附带一系列 pxt 扩展

```bash
# 通过以下方式，可以直接编译成功该项目
git clone https://github.com/Microsoft/pxt-blockly
cd pxt-blockly
npm install .
npm run build:core --closure-library
```

## JrBlocks

- KID-JR 幼儿版 Blocks 积木
- 将此版本的 Blocks 全部作为新增形式。便于 vm 合并

### 主要实现如下

- 创建和生产积木块区域
- 拖拽效果区域

## 依赖变更

- 与 pro 版本相同

* build.py 中注释掉国际化编译部分代码
* 删除项目中 i18n 文件夹及所有文件

<!--
imports-loader
require("imports-loader?$=jquery!./example.js");
// example.js
$("img").doSomeAwesomeJqueryPluginStuff();
这将简单的把 var $ = require("jquery"); 前置插入到 example.js 中。
 -->

## 项目结构

```
scratch-blocks
└─── blocks_common 通用积木块
│ │─── colour.js 拾色器
│ │─── math.js 数字、整数、小数、角度选择器
│ │─── matrix.js 矩阵值 积木块
│ │─── note.js 音符值 积木块
│ │─── text.js 文本内容 积木块
└─── blocks_horizontal
│ │─── control.js
│ │─── default_toolbox.js
│ │─── event.js
│ │─── wedo.js
└─── blocks_vertical
│ │─── control.js
│ │─── data.js
│ │─── default_toolbox.js
│ │─── event.js
│ │─── extensions.js
│ │─── looks.js
│ │─── motion.js
│ │─── operators.js
│ │─── procedures.js
│ │─── sensing.js
│ │─── sound.js
│ │─── vertical_extensions.js
└─── build
│ │─── gen_blocks.js
└─── core
│ │─── blocks.js 块类型名称到块原型对象的映射
│ │─── block_dragger.js 可视地拖动块的方法
└─── media 资源
└─── msg 明文
└─── shim
```

## Toolbox

- 展示所有的积木分类，会根据用户的选择显示某个选中分类下的所有积木。

## Category

- 表示一个分类 Category，每个分类都对应着若干积木块。分类可以被用户选中，被选中后该分类下的积木就会被显示出来.

## Flyout

- 分类被选中后呈现积木的容器（其实是 flyoutWorkspace 的容器），其中一个个蓝色的块就是积木块 Block，每个 Block 就是 Scratch 中一个独立的程序方法

## Workspace

- mainWorkspace，是 Workspace 的一个实例，之所以称 mainWorkspace，是因为他并不是 Workspace 唯一的实例，Flyout 中同样有一个实例称为 flyoutWorkspace。Workspace 可以理解为是 Blocks 的容器。flyoutWorkspace 中的 Block 只能拖出，却不能自由拖动改变位置，拖出到 mainWorkspace 中即表示创建了一个新的 Block；mainWokrspace 中的 Block 可以自由拖动位置，当被拖到 Flyout 或 Toolbox 上方式表示即将被删除。我们通常的操作就是从 flyoutWorkspace 中拖出积木放到 mainWorkspace 中去自由的编辑组合

## XML

- 负责将 XML 文档解析成 DOM 节点，将 DOM 代表的积木渲染到 Workspace 上。还可以将 Workspace 中的 Blocks 转化成 XML 字符串。也是 Scratch3.0 中角色切换，工作区积木也会跟着切换的原理.简单的代码示例如下：

```js
/** xml 字符串渲染成积木 */
// 一个 xml 字符串，包含若干个 block
const xmlText = '<xml><block type="motion_xposition" /></xml>';
// 通过方法转化成了浏览器的 DOM 对象
const xmlDom = Blockly.Xml.textToDom(xmlText);
// 将 DOM 对象再解析成 block 渲染到目标 workspace 中，这时候就可以在浏览器上看到积木块了
const blockIds = Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);

/** 获取 workspace 的 xml 字符串 */
// 将 workspace 中的积木转化成 DOM 对象
const xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
// 将 DOM 对象转成 XML 字符串
const xmlText = Blockly.Xml.domToText(xmlDom);
```

浏览器上看到的都是一个个渲染好的 Dom 节点，一个个分类 Category 是 div + span，而 Flyout、Workspace、Scrollbars 则是一个个的 svg，Blocks 则是有各种 svg 元素 g、path、text 等组成

## Block

### 以下几种类型：

- command:命令类型。执行一条命令
- Number or String:数字或字符串类型。读取一个数值或字符串
- Boolean:布尔类型。返回 True 或 False
- Event:事件类型。(hat 帽子块)监听一个事件
- Condition:条件类型。根据条件结果，执行不同分支
- Button:按钮。按钮功能，可以添加一个点击后的回调事件

### shadow block

- 作为一个参数呈现在另一个 block 中的，它接受与他相同返回值类型的 block 覆盖它

```xml
<block type="motion_movesteps">
    <value name="STEPS">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>
</block>
```

### 组成元素

- block 标签：积木，type 是他的标识符（也被称作 opcode），需要与他的定义名称相对应。在 mainWorkspace 中将积木转化成 XML 会发现他有一些其他属性，比如 id、x、y 等。
- value 标签：是指 block 的一个参数，参数的名字就是 value 标签的 name 属性，也会和积木定义的参数相对应。
- shadow 标签：阴影积木，type 属性是引用的已定义的其他 block 的 type。
- field 标签：block 的最小组成单元，name 属性值需要时已经定义好的 Field 类型。在 XML 中 field 标签可以不写，除非需要修改在积木上显示的默认值

### 积木块多行

- message1,args1;message2,args2

```js
import ScratchBlocks from "scratch-blocks";
ScratchBlocks.Blocks["control_if_else"] = {
  init: function () {
    this.jsonInit({
      type: "control_if_else",
      // 积木如果要支持多语言，就需要用 ScratchBlocks.Msg 对象来设置 message
      message0: ScratchBlocks.Msg.CONTROL_IF, // zh: 如果 1% 那么
      message1: "%1",
      message2: ScratchBlocks.Msg.CONTROL_ELSE, // zh: 否则
      message3: "%1",
      args0: [
        {
          type: "input_value",
          name: "CONDITION",
          check: "Boolean",
        },
      ],
      args1: [
        {
          type: "input_statement",
          name: "SUBSTACK",
        },
      ],
      args3: [
        {
          type: "input_statement",
          name: "SUBSTACK2",
        },
      ],
      // 分类也用 ScratchBlocks.Categories 对象来设置，避免不一致
      category: ScratchBlocks.Categories.control,
      extensions: ["colours_control", "shape_statement"],
    });
  },
};
```

### 对单个积木的颜色及形状进行单独设置

- 为积木设置其他的颜色那么可以在 json 中配置 colour, colourSecondary, colourTertiary 属性
- 自定义积木的形状可以配置 output, outputShape, previousStatement, nextStatement 属性

常用到的 fields 和 inputs：
Fields:
field_dropdown: 下拉列表
field_checkbox: 勾选框
field_colour: 颜色
field_number: 数字输入
field_angle: 角度选择
field_variable: 变量
field_date: 日期
field_label: 标签文本，通常根据 message 直接生成
field_image: 图片文本
Inputs:
input_value：可被相同形状的积木覆盖的参数，根据 "check": "Boolean", "String", "Number" 的不同，形状不同
input_statement：可以连接命令类型积木

```js
Blockly.Blocks["move_and_say"] = {
  init: function () {
    this.jsonInit({
      message0: "移动 %1 步后说 %2",
      args0: [
        {
          type: "input_value",
          name: "STEPS",
        },
        {
          type: "field_dropdown",
          name: "MENU",
          options: [
            ["你好！", "hello"],
            ["再见！", "bye"],
          ],
        },
      ],
      colour: "#4C97FF",
      colourSecondary: "#3373CC",
      category: "motion",
      extensions: ["shape_statement"],
    });
  },
};
```

<!-- alienware -->

## 添加自定义的模块

- 添加完，需要重新`npm run prepublish`

```js
/** utils/test.js */
goog.provide("Blockly.utils.test");
// 该模块的具体内容

/** 所需要的文件.js */
goog.require("Blockly.utils.test");
// 具体使用。
Blockly.utils.test.testMethod();
Blockly.utils.test.isShow;
```

- 将用到的 goog 的 js 库，替换为内中工具

## 用到的 goog

- 去掉项目中 goog 所有 js 库

```js
// 表示坐标和位置的类
new goog.math.Coordinate(0, 0);
// 使用媒介
goog.require("goog.userAgent");
// 由宽高组成的size
goog.require("goog.math.Size");
```

- 每个积木块中的图标元素 size 在积木块 init 中的对应参数中设置

```js
// 积木块中只有一个元素(icon)时,作为设置上下凹凸的中心点
```

## Closure Tools

- Closure Compiler:JS 编译及压缩
  `高级压缩,移除未用到的代码`
- Closure Library:JS 类库(函数及组件)
- Closure Templates:JS 模板机制函数库(\*.soy)
  Compiler 的 Advanced 压缩模式:写法需遵循一定规则
  Blockly.prototype.init

#### goog.provide()

- 创建一个名称空间
  函数可确保其参数指示的 JavaScript 对象结构的存在。它检查路径表达式中的每个对象属性是否存在，如果不存在，则将其初始化

#### goog.require()

- 从给定的名称空间中“导入”代码，以便闭包编译器可以找到它。

---

### build.py

```py
# 256行:指向core中的blockly.js文件 读入所有源文件
```

# TODO

## 变更分类及其积木块

- 运动:左移,右移,上移,下移,左转,右转,跳,位置归零
- 外观:显示,隐藏,放大,缩小,缩放归零,背景切换
- 事件:开始,点击角色才触发,信息发送,信息接收
- 逻辑:指定次数循环,重复执行,延时 awit

```js
/*
msg\messages.js // 定义明文及占位符
blocks_vertical\motion.js // 创建积木块
blocks_vertical\looks.js // 创建积木块
blocks_vertical\control.js // 创建积木块

 */
```

## 绘画

- 落笔 pen down
- 抬笔 pen up
- 擦除 erase all
- 选色:锁定饱和度及亮度值 set pen color to [COLOR]

```js
/** blocks_vertical\extensions.js 中创建所需积木块 */
/** blocks_vertical\default_toolbox.js 中追加积木块的结构 */
```

## 分类按钮变更

```js
// blocks_vertical\default_toolbox.js 更改xml结构字符串
```

## 改变分类图标

- 尝试在 css.js 中的对应设置下，改变 background-image 的图标设置
- 好像本版没有。

```
// 自定义颜色值(含分类及其他)，并覆盖Blockly.Colours原值
core\colours.js
```

```js
// blocks_common\colour.js blockly色块 创建自定义
// core\field_colour.js 颜色输入字段的类
```

## 添加绘画分类积木块

- 需在 vm 库中，对该积木块逻辑进行对应实现

```js
/** msg\messages.js */
Blockly.Msg.PEN_CLEAR = "%1";

/** msg\scratch_msgs.js */
PEN_CLEAR: "%1",

/** blocks_vertical\extensions.js
 * 目前将新增的绘画分类下的自定义积木块，写在该文件内
 * 后期需想办法，另起一个pen.js文件，写在内
 */
/** 绘画分类 之 清理 */
Blockly.Blocks["pen_clear"] = {
  /**
   * 清理
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // 明文内容:对应msg/messages.js文件中对应常量
      message0: Blockly.Msg.PEN_CLEAR,
      // 该积木块所需的参数对应设置
      args0: [
        // 第一个参数
        {
          type: "field_image", // 字段_图片 类型
          // 图片的src,通常采用 media\xxxxx.svg下的svg文件
          src: Blockly.mainWorkspace.options.pathToMedia + "pen.svg",
          width: 24, // 图标的宽度
          height: 24, // 图标的高度
        },
      ],
      // 分类:分类.运动分类
      category: Blockly.Categories.pen,
      // :[设置运动类图库的颜色，设置本积木块的形状]
      extensions: ["colours_pen", "shape_statement"],
    });
  },
};

/** blocks_vertical\default_toolbox.js */
  '<category name="%{BKY_CATEGORY_PEN}" id="pen" colour="#0FBD8C" secondaryColour="#0DA57A" iconURI="../media/pen.svg">' +
  // 新增加的积木块
  '<block type="pen_clear"></block>' +
  "</category>" +
```

### 添加分类并注册该分类

```js
/** core\colours.js */
// 追加 音乐分类图标三色设置
  music: {
    primary: "#0FBD8C",
    secondary: "#0DA57A",
    tertiary: "#DB6E00",
  },

/** msg\messages.js
 *  再次文件中，定义添加的分类
 */
Blockly.Msg.CATEGORY_MUSIC = "Music"; // 音乐
Blockly.Msg.CATEGORY_PEN = "Pen"; // 绘画

/** msg\scratch_msgs.js
 * 在此文件中，追加以定义的分类，明文国际化
 */
  CATEGORY_MUSIC: "音乐",
  CATEGORY_PEN: "绘画",

/** blocks_vertical\vertical_extensions.js
 *  该文件主要注册所有积木块
 */
 Blockly.ScratchBlocks.VerticalExtensions.registerAll=()=>{
   // 在分类名字数组中，添加以下[音乐、绘画]分类名
    var categoryNames = [ "music","pen" ];
 }
```

## blocks 分类自定义

- 将原有分类的圆形纯色图块，改为自定义图标，并附加 icon.svg

```js
/** core\toolbox.js
 * 给一个分类创建DOM(原来的蓝色圆形)
 * Create the DOM for a category in the toolbox.
 */
Blockly.Toolbox.Category.prototype.createDom = function () {
  /**
   * 该函数中的this指向每个分类圆形图标，即(bubble)
   * 通过是否有 iconURI，为该分类图标设置不同class样式
   * 自定义时，在内部逻辑中实现
   * 此内部函数也可以继续创建元素，做出更复杂的分类图标比如以下代码
  */
if (this.iconURI_) {
    // bubble 即
    this.bubble_ = goog.dom.createDom("div", {
      class: "scratchCategoryItemIcon",
    });
    // this.bubble_.style.backgroundImage = "url(" + this.iconURI_ + ")";
    // 追加代码：即使设置了.svg文件，也依然保留背景色
    this.bubble_.style.backgroundColor = this.colour_;

    // 此处添加了一个div ，并将icon.svg作为该div的背景图渲染出来
    this.icon_svg = goog.dom.createDom("div", {
      class: "scratchCategoryItemIcon",
    });
    this.icon_svg.style.backgroundImage = "url(" + this.iconURI_ + ")";
    this.bubble_.appendChild(this.icon_svg);
  }
}

/** blocks_vertical\default_toolbox.js
 * 该xml结构中，追加 iconURI属性，并设置其icon.svg指向
*/
  '<xml id="toolbox-categories" style="display: none">' +
  // 分类 分类名 id  该分类(圆圈)的颜色 第二色
  // '<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">' +
  '<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC" ' +
  // 此处指定iconURI,即可达到将原有圆形图标替换为自定义.svg图标
  'iconURI="../media/move-left.svg" showStatusButton="true">' +

/** core\css.js
 * 在该文件中，更改每个分类div的样式设置，以及其子元素样式设置，如下：
 */



// 注：以上变更并编译完成后，需在gui库下lib\make-toolbox-xml.js
//  注：iconURI的地址为 ./static/blocks-media/icon.svg
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC" iconURI="./static/blocks-media/move-left.svg" >………………`;
```

## blocks 类型积木块的解决方案

- 1.通过重写 block_render_svg_vertical.js 来实现自定义的积木块
- 2.通过追加 blocks 类型，来实现自定义积木块。

#### svg 规范

- 4 像素代表一网格
- 非特殊情况下，尽量偶数

### 方案一

-

- 文件定义所有常量，并赋值明文及占位符

```js
/** msg/messages.js */
// Motion blocks
Blockly.Msg.MOTION_MOVESTEPS = "%1 %2";
Blockly.Msg.MOTION_TURNLEFT = "%1 %2";
Blockly.Msg.MOTION_TURNRIGHT = "%1 %2";
```

- 文件实现所有定义的常量，赋值默认值，及占位符

```js
/** msg/scratch_msgs.js */
Blockly.ScratchMsgs.locales["en"] = {
  MOTION_MOVESTEPS: "%1 %2",
  MOTION_TURNLEFT: "%1 %2",
  MOTION_TURNRIGHT: "%1 %2",
};
```

- 创建每个所需积木块

```js
/** blocks_vertical\motion.js */
// 以移动为例
Blockly.Blocks["motion_movesteps"] = {
  /**
   * Block to move steps.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // 明文内容:对应msg/messages.js文件中对应常量
      message0: Blockly.Msg.MOTION_MOVESTEPS,
      // 该积木块所需的参数对应设置
      args0: [
        // 第一个参数
        {
          type: "field_image", // 字段_图片 类型
          // 图片的src,通常采用 media\xxxxx.svg下的svg文件
          src: Blockly.mainWorkspace.options.pathToMedia + "move-left.svg", // 目前该svg不存在
          width: 24, // 图标的宽度
          height: 24, // 图标的高度
        },
        // 第二个参数
        {
          type: "input_value", // 输入值类型
          name: "STEPS", // 步，可以看作单位？
        },
      ],
      // 分类:分类.运动分类
      category: Blockly.Categories.motion,
      // :[设置运动类图库的颜色，设置本积木块的形状]
      extensions: ["colours_motion", "shape_statement"],
    });
    console.log(
      "blocks_vertical创建运动类下第一个积木块:",
      Blockly.mainWorkspace
    );
  },
};

// 其中的pathToMedia在core\options.js中定义

var pathToMedia = "https://blockly-demo.appspot.com/static/media/";
if (options["media"]) {
  pathToMedia = options["media"];
} else if (options["path"]) {
  // 'path'为已弃用选项，由'media'代替
  pathToMedia = options["path"] + "media/";
}
```

- 将创建的积木块，添加到 xml 文件

```js
/** blocks_vertical\default_toolbox.js */
Blockly.Blocks.defaultToolbox = "在这里注释掉不需要的默认积木块xml结构";
```

## 添加重置功能的积木块

- 在 block_vertical/motion.js 中创建一个重置的积木块

```js
/**
 * 运动 之 重置 即舞台角色回归至 0,0
 */
Blockly.Blocks["motion_reset"] = {
  /**
   * Block to move steps. 向右移动
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // 明文内容:对应msg/messages.js文件中对应常量
      message0: Blockly.Msg.MOTION_RESET,
      // 该积木块所需的参数对应设置
      args0: [
        // 第一个参数
        {
          type: "field_image", // 字段_图片 类型
          // 图片的src,通常采用 media\xxxxx.svg下的svg文件
          src: Blockly.mainWorkspace.options.pathToMedia + "reset.svg",
          width: 24, // 图标的宽度
          height: 24, // 图标的高度
        },
      ],
      // 分类:分类.运动分类
      category: Blockly.Categories.motion,
      // :[设置运动类图库的颜色，设置本积木块的形状]
      extensions: ["colours_motion", "shape_statement"],
    });
    console.log(
      "blocks_vertical创建运动类下第一个积木块:",
      Blockly.mainWorkspace
    );
  },
};
```

- 在 block_vertical/default_toolbox.js 添加新增重置积木块的结构，可见效果

```js
'<block type="motion_reset" id="motion_reset">' +
  "</block>" +
```

core\block_render_svg_vertical.js // 处理渲染 svg 成型的文件

```bash
$ npm run translate # 更改msg\messages.js文件后，执行该命令
```

// 定义积木形状的类型，以及为每个类型单独设置
// 在 blocks_vertical 中，每个分类下，每个积木定义时，末尾"extensions":[设置颜色，设置积木类型]
blocks_vertical\vertical_extensions.js

core\block_svg.js

```js
/**
 * 积木的svg表现类
 * workspace:积木块空间，所有相关属性包含在内
 * prototypeName:积木的属性名 (如：motion_movesteps)
 * opt_id:可选id。
 */
Blockly.BlockSvg = function (workspace, prototypeName, opt_id) {
  // 创建 svg组元素
  // 创建svg路径元素，并设置其class，即内部g组
};
```

---

## ProBlocks

- KID-PRO 完整版 Blocks 积木

```bash
# 2020.07.10
https://github.com/LLK/scratch-blocks.git

npm install # 装载依赖
npm link # 开启链接
# 有所更改后，执行重新编译
npm run prepublish
# 查看效果test文件夹下，直接浏览器打开
```

### 依赖变更

```bash
# 移除的依赖
graceful-fs json rimraf scratch-l10n gh-pages
selenium-webdriver transifex travis-after-all
uglifyjs-webpack-plugin async chromedriver
copy-webpack-plugin eslint event-stream glob

# 更新的依赖
webpack webpack-cli
```

### 改变库名 2020.07.10

- 为了方便将库映射全局，相互不冲突

---

### 常见错误及解决方案 2020.07.10

- 'python'不是内部或外部命令……
  > **解决**:装 python2.7,配置环境变量(系统 PATH 指定 python27，以及指定 python/script)，重启 vscode

```
C:\Python27
C:\Python27\Scripts
```

- python 文件编译错误

```bash
# 错误代码如下：
Traceback (most recent call last):
  File "build.py", line 574, in <module>
    test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
  File "C:\Python27\lib\subprocess.py", line 394, in __init__
    errread, errwrite)
  File "C:\Python27\lib\subprocess.py", line 644, in _execute_child
    startupinfo)
WindowsError: [Error 2]

# 解决方式 https://github.com/LLK/scratch-blocks/issues/1620
build.py文件约 331行 代码替换
      # proc = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
      outfile = open("dash_args.txt","w+")
      outfile.write("\n".join(args[11:]))
      outfile.close()
      args =  args[:11]
      args.extend(['--flagfile','dash_args.txt'])
      proc = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE, shell = True)

build.py文件约 579行 代码替换
    # test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE,shell=True)
```

- 缺少 jdk 环境错误

```bash
Could not find "java" in your PATH.
Using remote compiler: closure-compiler.appspot.com ...

Error: Closure not found.  Read this:
  developers.google.com/blockly/guides/modify/web/closure

解决：装jdk8
环境变量 系统用户新建
变量名：JAVA_HOME
变量值：C:\Program Files\Java\jdk1.8.0_251
PATH追加：%JAVA_HOME%\bin，移动到顶部
```

# kid-py

- python 在线编辑器

## 浏览器显示运行

### 后台调用 python shell

- 在接收的代码字符串后面添加 print(solution())用于打印结果
- 将第一步处理后的字符串写入一个文件中，例如:code/code.py
- 使用 child_process 模块的 exec 方法调用 shell 执行 python code/code.py 命令
- 获取打印结果

```js
const express = require("express");
const { exec } = require("child_process");
const router = express.Router();
router.post("/api/runcode", (req, res) => {
  let code = req.body.code;
  fs.writeFile("code/code.py", code + "\nprint(solution())", (err) => {
    let command = "python code/code.py";
    exec(command, (err, stdout, stdin) => {
      if (err) {
        let reg = /[\d\D]*(line\s\d)[\d\D]*?(\w*(?:Error|Exception).*)/im;
        let matchArr = reg.exec(err.message);
        matchArr.shift();
        res.send(matchArr.join(", "));
      } else res.send(stdout);
    });
  });
});
```

---

# kid-code

- blockly 显示及运行

## TODO 功能

- [x] js 和 python 的代码展示
- [x] js 代码运行结果展示
- [x] 文件导出 xml 至本地
- [x] 文件导入至编辑区
- [x] 文件新建
- [ ]保存至服务器 xml
- [ ]服务器拉取 xml

脱机:
新建
打开
下载
联机:
云存储
云拉取

## 云存储

- 将 xml 转为 text，以 base64 形式传入服务器
- 需对该操作进行以下判断:用户登入状态、用户联网状态
- 每个文件需有文件名。

## 云拉取

- 点击打开云存储的列表

### 相关扩展功能

- 文件存储列表管理[删除]

# KID-DEV

- kid-xxx 中的库必须以 kid 开头，不然要在 webpack 中写每个库的配置

## 已更改的库

```bash
# 2020.07.11 KID-SVG 渲染器 通用版
# 2020.07.11 KID-VM 虚拟引擎
# 2020.07.11 KID-Storage 存储加载 通用版
# 2020.07.11 KID-Render 渲染 通用版
```

## PRO 及 JR

- 两个版本之间，目前有各自的 Blocks，编译时 VM 中 需更改设置
- 后期优化时，考虑将两版的积木块指令合并。即 blocks 库中对 jr 积木块全部作为新增

```js
/** src\engine\runtime.js */
const defaultBlockPackages = {
  /** kid-pro版 */
  // scratch3_control: require("../blocks/scratch3_control"),
  // scratch3_event: require("../blocks/scratch3_event"),
  // scratch3_looks: require("../blocks/scratch3_looks"),
  // scratch3_motion: require("../blocks/scratch3_motion"),
  // scratch3_operators: require("../blocks/scratch3_operators"),
  // scratch3_sound: require("../blocks/scratch3_sound"),
  // scratch3_sensing: require("../blocks/scratch3_sensing"),
  // scratch3_data: require("../blocks/scratch3_data"),
  // scratch3_procedures: require("../blocks/scratch3_procedures"),

  /** kid-jr版 */
  scratch3_control: require("../blocks/jr_control"),
  scratch3_event: require("../blocks/jr_event"),
  scratch3_looks: require("../blocks/jr_looks"),
  scratch3_motion: require("../blocks/jr_motion"),
  // 引入 音乐分类 绘画分类 （在blocks文件夹下，自定义绘画类积木块逻辑主文件 ）
  scratch3_pen: require("../blocks/jr_pen"),
  scratch3_music: require("../blocks/jr_music"),
};
```

## blocks

- 已模块化形式重新边写。就可以按照 Pro 和 js 所需，导出不同版本的 blocks 库

---

```bash
scratch-paint # 绘图拓展,暂时不可link，否则编译报错
```

```bash
# scratch-audio：声音拓展
$ git clone https://github.com/LLK/scratch-audio.git
$ npm install
$ npm test
```

```bash
# scratch-l10n：国际化
$ git clone https://github.com/LLK/scratch-l10n.git
$ npm install
$ npm test
# 通常以该方式，装载进所需项目
$ npm install -D scratch-l10n
```

# GUI 渲染 通用版

## 依赖变更

```bash
# 移除的依赖
babel-eslint eslint eslint-config-scratch gh-pages
eslint-import-resolver-webpack eslint-plugin-import
eslint-plugin-jest eslint-plugin-react @babel/cli babel-core @babel/plugin-proposal-object-rest-spread @babel/plugin-syntax-dynamic-import @babel/plugin-transform-async-to-generator chromedriver enzyme enzyme-adapter-react-16 jest jest-junit mkdirp rimraf selenium-webdriver uglifyjs-webpack-plugin minlog raf
react-ga react-test-renderer redux-mock-store
lodash.isequal lodash.pick

# 更新的依赖
webpack webpack-cli webpack-dev-server
react react-dom react-redux redux
@babel/core @babel/preset-env babel-loader @babel/preset-react
copy-webpack-plugin core-js

# 新增的依赖
terser-webpack-plugin # 打包压缩

# link的依赖
kid-vm kid-storage kid-render kid-svg-renderer
```

## 解决 HTTPS 问题

- 该项目设置为 HTTPS 请求方式后，需将内中使用外链资源及 API 皆改为 HTTPS

## 代码优化

- 压缩使用 terser-webpack-plugin
- 代码分块 optimization.splitChunks{}中设置

# KID-Render 渲染 通用版

`舞台渲染，在舞台区域出现的基于 WebGL 的处理器`

```bash
# 2020.07.11
npm install # 装载依赖
npm link # 开启链接
npm run build # 有所更改后，执行重新编译
```

## 依赖变更

```bash
# 移除的依赖
babel-eslint docdash eslint eslint-config-scratch
gh-pages jsdoc json webpack-dev-server travis-after-all
tap playwright-chromium babel-polyfill
minilog

# 更新的依赖
webpack webpack-cli copy-webpack-plugin
@babel/core babel-loader @babel/preset-env

# 新增的依赖
terser-webpack-plugin

# link的依赖
kid-svg-renderer # 虽然用到，但在打包时该库被排除
```

## 改动

- 更改为 import export 模式
- playground 从 src 中拿出来
- webpack 打包去掉.min.js，因为输出 kid-render.js 已带有压缩

# KID-Storage 存储加载 通用版

`存储加载`

```bash
# 2020.07.11
npm install # 装载依赖
npm link # 开启链接
npm run build # 有所更改后，执行重新编译
```

## 依赖变更

```bash
# 移除的依赖
travis-after-all node-fetch uglifyjs-webpack-plugin @babel/polyfill minilog cz-conventional-changelog json babel-eslint eslint eslint-config-scratch eslint-plugin-react semantic-release @commitlint/cli
 @commitlint/config-conventional @commitlint/travis-cli tap husky file-loader
# 更新的依赖
webpack webpack-cli @babel/core @babel/preset-env babel-loader

# 新增的依赖
terser-webpack-plugin # 打包压缩
```

# KID-SVG 渲染器 通用版

`svg 处理`

```bash
# 2020.07.11
npm install # 装载依赖
npm link # 开启链接
npm run build # 有所更改后，执行重新编译
```

## 依赖变更

```bash
# 移除的依赖
minilog babel-eslint eslint eslint-config-scratch
json scratch-render-fonts rimraf xmldom jsdom mkdirp tap
copy-webpack-plugin eslint-plugin-import

# 更新的依赖
webpack webpack-cli
@babel/core babel-loader @babel/preset-env
```

```js
/** font-converter.js 2.0字体转换为3.0 移除该文件 */
/** font-inliner.js 移除该文件 */
```

- 该库改为 import export 模式

## 问题

- 报错找不到 identity 之类的问题。

```js
/* kid-svg-renderer\src\transform-applier.js */
// import Matrix from "transformation-matrix";
// 该库的内容需要已{}方式引入
import {
  identity,
  compose,
  rotateDEG,
  translate,
  scale,
  skewDEG,
  toString,
  applyToPoint,
} from "transformation-matrix";
```

# KID-VM 虚拟引擎

`虚拟机，管理状态并执行业务逻辑`

```bash
# 2020.07.11
npm install # 装载依赖
npm link # 开启链接
npm run build # 有所更改后，执行重新编译
```

## 依赖变更

```bash
# 移除的依赖
minilog nets docdash eslint eslint-config-scratch gh-pages jsdoc json tap tiny-worker babel-eslint webpack-dev-server uglifyjs-webpack-plugin

# 更新的依赖
webpack webpack-cli @babel/core @babel/preset-env babel-loader copy-webpack-plugin

# 新增的依赖
terser-webpack-plugin
```

## 改动

- playground 文件夹中可以作为示例，暂时不删除
- 将原本 VM 中的 jr 版指令实现合并到 pro 版指令实现中
