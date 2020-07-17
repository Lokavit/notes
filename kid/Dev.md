# KID-DEV

- kid-xxx 中的库必须以 kid 开头，不然要在 webpack 中写每个库的配置

## 已更改的库

```bash
# 2020.07.11 KID-SVG 渲染器 通用版
https://github.com/LLK/scratch-svg-renderer.git
# 2020.07.11 KID-VM 虚拟引擎
https://github.com/LLK/scratch-svg-renderer.git
# 2020.07.11 KID-Storage 存储加载 通用版
https://github.com/LLK/scratch-storage.git
# 2020.07.11 KID-Render 渲染 通用版
https://github.com/LLK/scratch-render.git
```

## blocks

- 已模块化形式重新边写。就可以按照 Pro 和 js 所需，导出不同版本的 blocks 库

---


```bash
scratch-paint：绘图拓展
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
