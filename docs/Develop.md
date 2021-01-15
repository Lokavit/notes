## VSCode

```json setting.json
{
  "workbench.colorTheme": "Eva Dark Bold", // 主题
  // git bash作为终端
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  // 隐藏右侧缩略图
  "editor.minimap.enabled": false,
  // 字体设置
  "editor.fontFamily": "'Source Code Pro', Consolas, 'Courier New', monospace"
}
```

### 插件
- REST Client:测试REST API

- **GitLens** : git 信息查看

- Auto Close Tag :自动闭合 tag
- Prettier formatter:代码格式化
- Bracket Pair Colorizer:着色匹配括号的可自定义扩展
- Chinese (Simplified) Language Pack for VS Code:简体中文
- Eva Theme:主题
- vscode-fileheader:文件头注释
- Svg Preview for VSCode：SVG预览
- Markdown Preview Enhanced：MD文件预览


## VSCode 快捷键

### 终端内容操作

- Ctrl+C:复制终端命令
- Ctrl+Alt+C:复制终端选中内容
- Ctrl+B:隐藏/显示左侧活动栏
- Ctrl+/:切换行注释
- Shift+Alt+A:切换块注释

=**装载程式弹窗提示没有.vbs 脚本引擎**：

```
regedit.exe 注册表 - Root找到.vbs ，将其值改为"VBSFile"
```

**装载 TortoiseGit 出现 could not open key 的解决办法**：

```
尝试使用管理员权限安装 或者采用以下操作：
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Installer\UserData\S-1-5-18\Components
右键 — 权限 - 高级  - 所有者 - Administrators（组） - 应用
勾选(替换自容易和对象所有者) - 应用
 权限 - 勾选(使用可从此对象集成的权限替换所有子对象权限) - 应用 - 确定
重新运行装载程式.
```

---

---

# NPM 包管理

## NVM for Windows

Node Version Manager（Node 版本管理器），用它可以方便的在机器上安装并维护多个 Node 的版本。

## 使用 NVM 装载 Node.js

> 注意：如果电脑中已经装载 Node.js，需先完全卸载，包括 npm。
> 建议：文件夹命名尽量不含空格，便于操作。

### 两种装载方式

- 下载 nvm 包地址：https://github.com/coreybutler/nvm-windows/releases
- 下载 setup 包，使用 exe 装载；
- 设置装载路径为*C:\dev*，设置 nodejs 文件夹路径为*C:\dev\nodejs*;
- 装载完成，打开*C:\dev\nvm*文件夹，打开*settings.txt*文件；

```bash
root: C:\dev\nvm  # nvm.exe所在目录
path: C:\dev\nodejs # 存放指向node版本的快捷方式，使用nvm的过程中会自动生成。一般写的时候与nvm同级。
# 以上为原有内容，在后面追加以下内容：
arch: 64  # 当前操作系统位数
proxy: none # 代理
node_mirror: http://npm.taobao.org/mirrors/node/ #淘宝镜像
npm_mirror: https://npm.taobao.org/mirrors/npm/ #淘宝镜像
```

```bash
# 查看电脑环境变量，会看到如下信息：
NVM_HOME	    C:\dev\nvm
NVM_SYMLINK    C:\dev\nodejs
PATH    追加    %NVM_HOME%;%NVM_SYMLINK%
```

- 装载 nodejs

```bash
$ nvm # 会显示版本号，及一堆命令，表示成功
$ nvm install latest # 装载nodejs的最新版本
$ nvm use 10.12.0  # 使用nodejs的10.12.0版本
Now using node v10.12.0 (64-bit)  # 设置成功
$ node -v  # 查看nodejs的当前版本
v10.12.0
$ npm -v  # 查看npm的当前版本
6.4.1
```

## npm link

```bash
$ cd scratch-vm # 以该库为例
$ npm link # 将以上项目link到全局
# 在需要用到该库的项目根目录下，如：
$ cd scratch-gui
$ npm link scratch-vm # 将库链接到此项目
```

<!--
更新本地 package
有时候我们想知道依赖的包是否有新版本，可以使用 npm outdated 查看，如果发现有的包有新版本，就可以使用 npm update <package-name> 更新它，或者直接 npm update 更新所有
 -->

### 全局包

```bash
# 将包作为一个命令行工具，可以在任何目录下使用（比如 grunt CLI）。
$ npm install -g <package> # 装载全局包命令
$ npm install -g jshint # 装载全局jshint包

$ npm update -g <package> # 更新全局装载的包
$ npm update -g jshint

## 找出需要更新的软件包
npm outdated -g --depth=0

## 更新所有全局包
npm update -g

## 卸载全局装载的包
$ npm uninstall -g <package>
$ npm uninstall -g jshint
```

---

### 本地包

```bash
# 模块依赖于某个包，并通过 Node.js 的 require 加载，默认方式。
$ npm install <package_name>
$ npm install lodash # 装载lodash
$ dir node_modules # 查看文件夹

$ npm install --save  # 用于生产环境的安装包
$ npm install --save-dev  # 用于开发环境的安装包

> ### npm install <name> 写入**package.json**三种模式
> - -S, --save: dependencies. 生产依赖
> - -D, --save-dev: devDependencies. 开发依赖
> - -O, --save-optional: optionalDependencies.可选依赖


#### 装载包的版本
本地目录中如果没有 package.json 这个文件的话，那么最新版本的包会被装载。
如果存在 package.json 文件，则会在 package.json 文件中查找针对这个包所约定的语义化版本规则，然后装载符合此规则的最新版本。

## 使用已装载的包
- 创建一个index.js的文件，代码为：

var lodash = require('lodash');
var output = lodash.without([1, 2, 3], 1);
console.log(output);
# 运行 node index.js 命令。输出 [2, 3]。

## 更新本地装载的包
- 在 package.json 文件所在的目录中执行 npm update 命令。
- 执行 npm outdated 命令。不应该有任何输出。

## 卸载本地装载的包
$ npm uninstall lodash # 卸载本地装载的包
# 从 package.json 文件中删除依赖，需要在命令后添加参数 --save
$ npm uninstall --save lodash

## 注意：如果装载的包作为 "devDependency"（也就是通过 --save-dev 参数保存的），那么 --save 无法将其从 package.json 文件中删除。所以必须通过 --save-dev 参数可以将其卸载。
```

```bash
$ npm -g outdated --depth=0 # 输出所有可更新的包
$ npm update @vue/cli -g # 更新某个包
```

npm cache clean –force

即可解决 pm install 出现”Unexpected end of JSON input while parsing near”错误。

## 第二种装载方式

选择：nvm-noinstall.zip，解压缩。
在文件夹中创建 settings.txt，做以下设置：

```
root: D:\dev\nvm   # nvm.exe所在目录
path: D:\dev\nodejs # 存放指向node版本的快捷方式，使用nvm的过程中会自动生成。一般写的时候与nvm同级。
arch: 64  # 当前操作系统位数
proxy: none # 代理
node_mirror: http://npm.taobao.org/mirrors/node/ #淘宝镜像
npm_mirror: https://npm.taobao.org/mirrors/npm/ #淘宝镜像
```

配置环境变量，如下：

```
NVM_HOME = D:\dev\nvm（当前 nvm.exe 所在目录）
NVM_SYMLINK = D:\dev\nodejs （node 所在的目录）
PATH += ;%NVM_HOME%;%NVM_SYMLINK%
```

验证是否成功

```
$ nvm # 会显示版本号，及一堆命令
```

装载 nodejs

```
$ nvm install  <version> # 装载node，指定版本号
$ nvm install latest # 装载node，最新版本
```

$ nvm ls # 查看已装载的所有 node 版本
$ node -v # 查看正在使用的 node 版本

### NVM for Windows 命令行工具

```
nvm arch [32|64] # 系统位
nvm install <version> [arch] # 装载 指定版本号 系统位
nvm list # 列出node.js所有装载版本
nvm on # 启用node.js版本管理
nvm off # 禁用node.js版本管理(不卸载任何内容)
nvm proxy [url] # 用于下载的代理，设置[url]为“none”删除代理
nvm uninstall <version> # 卸载特定版本。
nvm use <version> [arch]：切换到使用指定的版本 系统位
nvm root <path>：设置nvm应存储不同版本node.js的目录。如果<path>未设置，将显示当前根。
nvm version：显示NVM for Windows的当前运行版本。
nvm node_mirror <node_mirror_url>：设置节点镜像。国内https://npm.taobao.org/mirrors/node/
nvm npm_mirror <npm_mirror_url>：设置npm镜像。国内https://npm.taobao.org/mirrors/npm/
```

## 发布/删除 npm 包

```Bash
$ npm config set registry http://registry.npmjs.org  # 设置npm镜像
$ npm login # 登入命令，输入帐号密码邮箱
Logged in as 用户名 on http://registry.npmjs.org/. # 登入成功
$ npm publish # 将npm包发布带npm上
$ npm logout # 登出
$ npm config set registry https://registry.npm.taobao.org  # 设置回淘宝镜像
$ npm config get registry # 查看当前镜像

# ===== 删除npm包 =====
$ npm unpublish --force # 强制删除
$ npm unpublish react-rupa@1.0.1 # 指定版本号
$ npm deprecate # 某些情况
```

## 发包机制

- 发布包的仓库：NPM 仓库，公司私有 NPM 仓库

```JSON
// package.json
// 仓库地址 发到npm可省略
"publishConfig": {
    "registry": "http://localhost/repository/npm-hosted/" // 公司仓库地址
 }
```

> 使用 base64 编码/解码 ，将[用户名:密码]进行编码，放入 npm 配置文件 .npmrc 文件。默认文件路径在 C:\Users\计算机名\.npmrc，修改内部内容：

```Bash
_auth="base64编码结果" # 用户名密码的base64编码结果
email=******@qq.com # 填写邮箱
```

# TypeScript 插件

- 2019.03.02

## 初始创建

```Bash
$ mkdir evil-ts # 项目名文件夹
$ npm init # package.json 手动填写
$ npm init -y # 跳过所有提问
$ npm i typescript -D # 装载ts 开发环境 v3.3.3333
$ tsc --init # 初始一个tsconfig.json配置文件
```

## 项目结构

```Bash
dist # 输出文件存放
  index.d.ts # 声明文件
node_modules # node依赖包
src # 源代码
  index.ts # 插件的具体实现
package.json # 项目配置文件
tsconfig.json # ts配置文件
```

## 项目配置

```JSON
// package.json
{
  "name": "evil-ts",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc", // ts 编译命令
    "test": "mocha --reporter spec --progress --colors" // 添加测试脚本 带进度条和高亮
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lokavit/evil-ts.git"
  },
  "keywords": [
    "typescript"
  ],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Lokavit/evil-ts/issues"
  },
  "homepage": "https://github.com/Lokavit/evil-ts#readme"
}
```

```JSON
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5", // 指定ECMAScript目标版本
    "module": "commonjs", // 指定模块化类型
    "declaration": true, // 生成 `.d.ts` 文件
    "outDir": "./dist", // 编译后生成的文件目录
    "strict": true, // 开启严格的类型检测
  }
}
```

## 编写插件

```Bash
$ mkdir src # 在 evil-ts 根目录下，创建 src 文件夹
$ cd src
$ touch index.ts # 创建.ts文件
```

```ts
/* src/index.ts */
// 用个加法函数测试 参数a ,参数b ，返回数字类型
export function add(a: number, b: number): number {
  return a + b;
}
```

```Bash
$ npm run build # 打包，可见dist中有.d.ts(声明文件)和.js文件
```

## 编写测试

```Bash
$ npm i mocha chai -D # 测试框架和断言库
# "chai": "^4.2.0", "mocha": "^6.0.2",
$ mkdir test && touch test/test.js
```

```js
/* test/test.js */
"use strict"; // 严格模式
const expect = require("chai").expect;
const add = require("../dist/index").add; // 编译的.js文件中的add函数

describe("evil-ts function test", () => {
  it("should return 2", () => {
    const result = add(1, 1);
    expect(result).to.equal(2);
  });
});
```

## 过滤文件

```Bash
$ touch .gitignore # 提交到github的过滤文件
$ touch .npmignore # 提交到npm的过滤文件
```

## 推送 git 仓库

```Bash
$ git status
$ git add .
$ git status
$ git commit -m "init"
$ git tag v0.1.0  # 修改一下 package.json中的版本号为 0.1.0
$ git push origin master --tags
```

## 添加 Travis CI（持续集成）

```yml
# .travis.yml
language: node_js
node_js:
  - stable
install:
  - npm install
script:
  - npm run test
```

## 使用该插件

```Bash
# 创建一个新项目，装载npm上发布的该包
# 编写如下代码，运行可见结果
```

```ts
/* src/index.ts */
import EvilTs = require("../node_modules/evil-ts/dist/index");
var test = EvilTs.add(2, 3); // 调用自封装npm 的.add函数
console.log(test); // 5
```

---

# React 插件开发

- 2019.03.02

## 装载及配置

```Bash
$ mkdir react-rupa
$ cd react-rupa
$ npm init
$ npm i react react-dom --save-dev
$ npm i @babel/core @babel/preset-env @babel/preset-react --save-dev
$ npm i webpack webpack-cli --save-dev
$ npm i typescript @types/react @types/react-dom --save-dev
$ npm i babel-loader css-loader style-loader ts-loader --save-dev
```

```JSON
{
  "devDependencies": {
    "@babel/core": "^7.3.4",
    "@babel/preset-env": "^7.3.4",
    "@babel/preset-react": "^7.0.0",
    "@types/react": "^16.8.6",
    "@types/react-dom": "^16.8.2",
    "babel-loader": "^8.0.5",
    "css-loader": "^2.1.0",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "style-loader": "^0.23.1",
    "ts-loader": "^5.3.3",
    "typescript": "^3.3.3333",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  }
}
```

### 目录结构

```Bash
dist # 构建输出
src # 源码
  index.tsx # 主文件
index.d.ts # 声明文件
webpack.config.js # webpack 配置文件
tsconfig.json # ts 配置文件
package.json
README.md
```

### webpack 配置文件

```js
/* webpack.config.js */
const path = require("path");

module.exports = {
  module: "production", // 生产模式
  entry: {
    ReactRupa: path.resolve(__dirname, "./src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].min.js", // 输出压缩文件
    publicPath: "./dist/",
    // 注意这里按 commonjs2 模块规范打包
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          {
            loader: "ts-loader", // 解析 ts
          },
        ],
        include: path.resolve(__dirname, "./src/"), // 只解析 src 目录下的文件
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&localIdentName=[hash:8]", // css_modules 配置详情  http://www.ruanyifeng.com/blog/2016/06/css_modules.html
        include: path.resolve(__dirname, "./src/"),
      },
    ],
  },
  resolve: {
    // 省略文件后缀时，默认按下面的配置取
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: {
    // 不把 react 打包进去
    react: "react",
  },
};
```

### typescript 配置文件

```JSON
{
  "compilerOptions": {
    // "outDir": "./build/",
    // "sourceMap": true,
    "noImplicitAny": true,
    "module": "esnext",
    "target": "es6",
    "jsx": "react",
    "moduleResolution": "node", // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/24788
  }
}
```

### 编写插件

```ts
// import React from 'react'; // 报错[has no default export]
import * as React from "react"; // 默认导出可用
class ReactRupa extends React.Component {
  render() {
    return (
      <section>
        <h1>Hello Satya!</h1>
      </section>
    );
  }
}
export default ReactRupa; // 导出
```

# Vue 插件开发

## 2019.03.0x

```Bash
dist
src
test

```
