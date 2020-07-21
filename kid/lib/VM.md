# KID-VM 虚拟引擎

`虚拟机，管理状态并执行业务逻辑`

```bash
# 2020.07.11
npm install # 装载依赖
npm link # 开启链接
npm run build # 有所更改后，执行重新编译
```

## 依赖变更

```bash
# 移除的依赖
minilog nets docdash eslint eslint-config-scratch gh-pages jsdoc json tap tiny-worker babel-eslint webpack-dev-server uglifyjs-webpack-plugin 

# 更新的依赖
webpack webpack-cli @babel/core @babel/preset-env babel-loader copy-webpack-plugin

# 新增的依赖
terser-webpack-plugin
```

## 改动
- playground文件夹中可以作为示例，暂时不删除
- 将原本VM中的jr版指令实现合并到pro版指令实现中
