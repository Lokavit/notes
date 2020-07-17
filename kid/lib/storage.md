# KID-Storage 存储加载 通用版

`存储加载`

```bash
# 2020.07.11
https://github.com/LLK/scratch-storage.git

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