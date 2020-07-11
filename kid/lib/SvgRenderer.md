# SVG 渲染器 通用版

```bash
# 2020.07.11
https://github.com/LLK/scratch-svg-renderer.git

npm install # 装载依赖
npm link # 开启链接
# 有所更改后，执行重新编译
npm run build
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

import SVGRenderer from "kid-svg-renderer";

// var svgRenderer = new SvgRenderer();
// svgRenderer.fromString(svgData, callback);
```

- 改为 import export 模式

## TODO:
