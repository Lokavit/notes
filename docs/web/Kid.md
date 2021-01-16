## 缘

> 己亥年的工作，接手之前未曾了解相关，特地调研数日，决定接下工作。其一，面向编程教育的编程工具，造福人类；其二，自我挑战。世事如棋，不尽人意。在年关前结束了一系列工作，很可惜，很无奈。想来不会再做相关开发，在此对这段时期的工作做个经验总结。唉，没记性的人全靠笔记。

---

## 起

### Google 出品 Blockly

- 一套 JS 版本的积木拖拽拼接工具。
  > 要说把这玩意儿从 Github 中 clone 下来可真不容易，在经历无数次尝试才拉取成功，接下来的编译过程，那就更是相当不容易。这套开源代码，使用了 Google 自家的 js 组件库，以及自家的代码编译压缩混淆库。所以，即使它是一个 js 项目，也需要在电脑上先配置环境`Python`、`jdk`

```bash
# 根据项目根目录的buld.py文件提示，装载对应版本的python
python2.7
# 在根据报错提示，装载对应版本的jdk
jdk1.8.0_251
# 以上装载完成，若还有报错，善用搜索，逐步排查。
```

编译起来，查看项目 demos 文件夹中的示例，基本无忧使用。

- 引入及导出.js 的写法

```js
/**
 * 创建一个名称空间 函数可确保其参数指示的 JavaScript 对象结构的存在。它检查路径表达式中的每个对象属性是否存在，如果不存在，则将其初始化
 * utils/test.js */
goog.provide("Blockly.utils.test");
// 该模块的具体内容

/**
 * 从给定的名称空间中“导入”代码，以便闭包编译器可以找到它。
 *  所需要的文件.js */
goog.require("Blockly.utils.test");
// 具体使用。
Blockly.utils.test.testMethod();
Blockly.utils.test.isShow;
```

- Closure Tools 实际上，似乎并未用到高级编译压缩功能。

- - Closure Compiler:JS 编译及压缩 `高级压缩,移除未用到的代码`
- - Closure Library:JS 类库(函数及组件)
- - Closure Templates:JS 模板机制函数库(\*.soy)
- - Compiler 的 Advanced 压缩模式:写法需遵循一定规则

### KID-CODE

- 使用`Blockly`编译完成的库，实现编程工具中的图形化到 Python 代码的过程。
- 使用开源的在线代码编辑器做代码展示、高亮、格式化等；
- 未做真实服务器端 Python 编译，而是以 JS 编译结果输出到页面绘制的控制台区域；
- 对工具的 XML 文件实现:新建、打开、下载、云存储。

### Google 出品 BlocklyGames

> 该项目编译成功需在 Linux 系统下，且连通国际网路。由于编译后大部分代码依然不在本地，只好将该编译后的该项目整个扔上服务器，未作任何改动。

### Microsoft 出品 pxt-blockly

> 微软大厂，基于 Google 二开，修复大量 Edge 下的问题，并附带一系列 pxt 扩展

把 Github 中几个类似的库进行比较，发现其实微软的更适合二开。然而，该提议被驳回。

---

### KID 系列

> 在着手二开 LLK 那套少儿编程工具时，看到有关新闻，为规避，更名为`KID`。这套开源代码，网路上无数复刻版。还有专门为这套源码二开做付费咨询的，可谓商机无限。但是随着新闻爆出，一道网路屏蔽，不少复刻版网站，一片 404。而手上的项目，因为已经开发部分功能，直连自家服务器，成功避开此次危机。

- 该项目由以下几个项目组成
- - kid-blocks:基于 Blockly 二开的积木工具
- - kid-vm:对应积木工具的虚拟引擎，积木指令的实现。
- - kid-storage:缓存。主要用在资源部分。
- - kid-svg-renderer:svg 渲染。
- - kid-render:渲染器的一些处理
- - kid-gui:页面呈现。对以上库的引用及使用。
- - kid-parser:对项目专属文件的解析。
- - kid-...:另外还有一些不曾改动的原有库，因具有依赖关系，不做改变。

#### Blocks

> 基于 Google 出品的 Blockly 二次开发的积木工具。删掉了原本的部分功能，比如积木工具的自动收缩、多种编程语言代码库的生成等；改写了部分功能，比如 svg 的数据构成形式等；也添加了各别功能，比如 checkbox 的积木。

> 按照需求，在该版本之上，二开出来项目所需的少儿版与幼儿版。其中幼儿版改动及追加功能较多，涉及到对 SVG 数据的变更、音乐及绘画扩展提取到初始工具库、积木全部图标化、去文字，隐藏部分高级积木、重写部分初级积木，如移动与方向、速度结合；跳跃与速度、方向结合；外观的一些简单指令积木等。二开的逻辑基本如下：
>
> > - kid-blocks 中找到积木编辑的对应文件，按照指定数据结构追加积木，注意命名;
> > - kid-vm 中找到积木实现的对应文件，按照积木命名创建函数，实现积木执行逻辑;
> > - kid-gui 中找到 xml.js，添加新增的积木，注意 XML 结构及积木命名。

#### 示例

- 添加绘画分类积木块 需在 vm 库中，对该积木块逻辑进行对应实现

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

- 添加分类并注册该分类

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

- 积木块多行，如:message1,args1;message2,args2

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

- 示例: 添加重置功能的积木块

- - 在 block_vertical/motion.js 中创建一个重置的积木块

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

- - 在 block_vertical/default_toolbox.js 添加新增重置积木块的结构，可见效果

```js
'<block type="motion_reset" id="motion_reset">' +
  "</block>" +
```

core\block_render_svg_vertical.js // 处理渲染 svg 成型的文件

```bash
$ npm run translate # 更改msg\messages.js文件后，执行该命令
```

---

### 常见错误及解决方案

- 'python'不是内部或外部命令……
  > **解决**:装 python2.7,配置环境变量(系统 PATH 指定 python27，以及指定 python/script)，重启 vscode

```bash
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

- 解决 HTTPS 问题

> Chrome 等现代浏览器，调用摄像头及录音功能需要在 HTTPS 模式下，将该项目设置为 HTTPS 请求方式后，需将内中使用外链资源及 API 皆改为 HTTPS

- 代码优化
- - 压缩使用 terser-webpack-plugin
- - 代码分块 optimization.splitChunks{}中设置

---

## 性

这段工作经历，不但涉猎了编程+教育，而且对教育界有一些了解。从而悟出，工具放在那里，用户如何使用，非是他人能够左右。许多人性化设计，不入用户法眼，倒是那些懒人模式的操作，更得用户喜欢。编程+教育，面对的群体特殊`老师`、`家长`、`学生`。三个群体之中，老师则通过编程工具及学生获得自身利益，家长诉求简单，通过孩子获知相关信息，看到孩子与众不同；学生则是一个被动的角色，基本指哪儿打哪儿，参加比赛，拿到好成绩。仅仅是编程工具，根本无法吸引学生，即便有了`BlocklyGames`，或者亥厂的`codecombat(汉化版)`。由于三方之中各有利益，就会达成某些无需说明的一致。老话说得好`上有政策下有对策`，开发方向从打造优秀的编程工具及平台，服务学生，潜移默化地过渡到为了虚假繁荣。当察觉编程+教育的真实操作情况，会怀疑自己在助纣为虐。

---

## 空

带新需谨慎，徒劳一场空。
人生中又多了几个过客，既是过客，不提也罢。
