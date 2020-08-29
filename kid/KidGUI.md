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
