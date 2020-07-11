## KID-PRO 完整版 VM 虚拟引擎

```bash
# 2020.07.11
https://github.com/LLK/scratch-vm.git

npm install # 装载依赖
npm link # 开启链接
# 有所更改后，执行重新编译
npm run build
```

## 依赖变更

```bash
# 移除的依赖


# 更新的依赖
webpack webpack-cli webpack-dev-server
```

    "@vernier/godirect": "1.5.0",
    "minilog": "3.1.0",
    "nets": "3.2.0",
    "scratch-sb1-converter": "0.2.7",
    "scratch-translate-extension-languages": "0.0.20191118205314",
    "docdash": "^1.0.0",
    "eslint": "^5.3.0",
    "eslint-config-scratch": "^5.0.0",
    "gh-pages": "^1.2.0",
    "jsdoc": "^3.5.5",
    "json": "^9.0.4",
    "tap": "^12.0.1",
    "tiny-worker": "^2.1.1",
    "babel-eslint": "^10.0.1",


    "scratch-blocks": "latest",
    "scratch-svg-renderer": "latest",
    "scratch-render": "latest",


    "@babel/core": "^7.1.2",
    "@babel/preset-env": "^7.1.0",
    "babel-loader": "^8.0.4",
    "copy-webpack-plugin": "^4.5.4",
    "uglifyjs-webpack-plugin": "1.2.7",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"


    "tap": "tap ./test/{unit,integration}/*.js",
    "tap:unit": "tap ./test/unit/*.js",
    "tap:integration": "tap ./test/integration/*.js",
    "test": "npm run lint && npm run docs && npm run tap",
    "watch": "webpack --progress --colors --watch",
    "version": "json -f package.json -I -e \"this.repository.sha = '$(git log -n1 --pretty=format:%H)'\""，
        "coverage": "tap ./test/{unit,integration}/*.js --coverage --coverage-report=lcov",
    "deploy": "touch playground/.nojekyll && gh-pages -t -d playground -m \"Build for $(git log --pretty=format:%H -n1)\"",
    "docs": "jsdoc -c .jsdoc.json",
    "i18n:src": "mkdirp translations/core && format-message extract --out-file translations/core/en.json src/extensions/**/index.js",
    "i18n:push": "tx-push-src scratch-editor extensions translations/core/en.json",
    "lint": "eslint . && format-message lint src/**/*.js",