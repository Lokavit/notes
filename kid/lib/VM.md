# KID-VM 虚拟引擎

`虚拟机，管理状态并执行业务逻辑`

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
@vernier/godirect minilog nets docdash eslint eslint-config-scratch gh-pages jsdoc json tap tiny-worker babel-eslint webpack-dev-server uglifyjs-webpack-plugin 

# 更新的依赖
webpack webpack-cli @babel/core @babel/preset-env babel-loader copy-webpack-plugin

# link的依赖
scratch-blocks scratch-svg-renderer scratch-render
```

## 改动
- 