# KID-SVG 渲染器 通用版

`svg 处理`

```bash
# 2020.07.11
https://github.com/LLK/scratch-svg-renderer.git

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

## TODO:
