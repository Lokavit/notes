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
- 后期优化时，考虑将两版的积木块指令合并。即blocks库中对jr积木块全部作为新增
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
