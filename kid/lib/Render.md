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
- 更改为import export模式
- playground从src中拿出来
- webpack打包去掉.min.js，因为输出kid-render.js已带有压缩
