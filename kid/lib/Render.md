# KID-Render 渲染 通用版

`舞台渲染，在舞台区域出现的基于 WebGL 的处理器`

```bash
# 2020.07.11
https://github.com/LLK/scratch-render.git

npm install # 装载依赖
npm link # 开启链接
npm run build # 有所更改后，执行重新编译
```

## 依赖变更

```bash
# 移除的依赖
babel-eslint docdash eslint eslint-config-scratch
gh-pages jsdoc json webpack-dev-server travis-after-all
tap playwright-chromium copy-webpack-plugin babel-polyfill

# 更新的依赖
webpack webpack-cli
@babel/core babel-loader @babel/preset-env

# link的依赖
kid-svg-renderer

# 其他说明
kid-vm kid-storage 似乎都没用到，暂时不link这两个库
```
