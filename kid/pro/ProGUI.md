# GUI 渲染 通用版

```bash
# 2020.07.11
https://github.com/LLK/scratch-gui.git

npm install # 装载依赖
npm link # 开启链接
npm start
# 有所更改后，执行重新编译
npm run build
```

## 依赖变更

```bash
# 移除的依赖
babel-eslint eslint eslint-config-scratch gh-pages
eslint-import-resolver-webpack eslint-plugin-import
eslint-plugin-jest eslint-plugin-react @babel/cli babel-core @babel/plugin-proposal-object-rest-spread @babel/plugin-syntax-dynamic-import @babel/plugin-transform-async-to-generator chromedriver enzyme enzyme-adapter-react-16 jest jest-junit mkdirp rimraf selenium-webdriver uglifyjs-webpack-plugin  

# 新增的依赖
terser-webpack-plugin uglify-js # 打包时，某库有错误，需排查
axios 

# 更新的依赖
webpack webpack-cli webpack-dev-server
react react-dom react-redux redux
@babel/core @babel/preset-env babel-loader @babel/preset-react
copy-webpack-plugin


# link的依赖
pro-blocks kid-vm kid-storage kid-render kid-svg-renderer
```












## TODO:
- 登录注册
- 保存到草稿箱
- 发布作品
- 查看我的作品