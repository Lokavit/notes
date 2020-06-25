# React Sample

## Boilerplate

### WebPack

```Bash
$ npm init --yes
# webpack 及cli和服务
$ npm i webpack webpack-cli webpack-dev-server -D
# 必要插件及加载器
$ npm i style-loader css-loader file-loader url-loader awesome-typescript-loader html-webpack-plugin mini-css-extract-plugin -D
```

```JSON
/* ./package.json */
"scripts": {
    "start": "webpack-dev-server --mode development --inline --hot --open",
    "build": "webpack --mode development"
}
```

### TypeScript

```Bash
$ npm i typescript -D
```

```JSON
/* ./tsconfig.json */
{
    "compilerOptions": { // 编译器选项
        "target": "es6", // 指定ECMAScript目标版本
        "module": "es6", // 指定生成哪个模块系统代码
        "moduleResolution": "node", // 决定如何处理模块
        "declaration": false, // true: 生成相应的 .d.ts文件
        "noImplicitAny": false, // false 不提示隐式具有any类型
        "jsx": "react", // 在 .tsx文件里支持JSX
        "sourceMap": true, // 	生成相应的 .map文件。
        "noLib": false, // 不包含默认的库文件（lib.d.ts）
        // 阻止 --noImplicitAny对缺少索引签名的索引对象报错
        "suppressImplicitAnyIndexErrors": true,
    },
    // true:IDE在保存文件的时候根据tsconfig.json重新生成文件.
    "compileOnSave": false,
    // 排除
    "exclude": ["node_modules"]
}
```

### Babel

```Bash
$ npm i @babel/cli @babel/core @babel/preset-env @babel/polyfill babel-loader -D
```

```JSON
/* ./babelrc */
{
    "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "entry" // 按需加载
          }
        ]
    ]
}
// 如果该依赖交付 ES5 代码，但使用了 ES6+ 特性且没有显式地列出需要的 polyfill：请使用 useBuiltIns: 'entry' 然后在入口文件添加 import '@babel/polyfill'。这会根据 browserslist 目标导入所有 polyfill，这样你就不用再担心依赖的 polyfill 问题了，但是因为包含了一些没有用到的 polyfill 所以最终的包大小可能会增加。
```

```TypeScript
/* ./src/main.ts */
document.write("Hello Preta!");
```

```HTML
<!-- ./src/index.html 这个作为模板 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Preta</title>
</head>
<body>
    <h1> index.html </h1>
</body>
</html>
```

### Webpack 配置

```JavaScript
/* webpack.config.js */
const path =require('path'); // 内置模块用于设置路径
// 引入自动生成html
const HtmlWebpackPlugin =require('html-webpack-plugin');
// 引入css单独分离插件
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
// 模块热替换所需
const webpack =require('webpack');
// 基础路径
const basePath = __dirname;

module.exports ={
    context:path.join(basePath,'src'),
    // 可解析的扩展
    resolve: { extensions:['.ts','.tsx','.js','.json'] },
    // 入口文件
    entry: ['@babel/polyfill','./main.ts'],
    // 输出配置
    output: {
        // 指定输出文件夹
        path:path.join(basePath,'docs'),
        // 输出文件名
        filename: 'js/bundle.js',
    },
    devtool: 'source-map',
    // 配置建议服务器模块
    devServer: {
        contentBase: './docs',
        inline:true, // 启用监视和实时重新加载
        host: 'localhost',
        port: 8080,
        stats: 'errors-only'
    },
    module: {
        rules :[
            {
                test:/\.(ts|tsx)$/,
                // 排除node_modules目录下的文件
                exclude: /node_modules/,
                loader:'awesome-typescript-loader',
                options:{
                    useBabel:true,
                    "babelCore":"@babel/core",
                },
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader,"css-loader" ]
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options:{name:'assets/img/[name].[ext]?[hash]'}
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 输出到docs文件名
            template: 'index.html', // 模板在.src下
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: '[id].css'
        }),
    ],
}
```

### webpack + React + TypeScript

```Bash
# ts及ts加载器
# awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件 tsconfig.json编译TypeScript代码。
# source-map-loader(源映射)使用TypeScript输出的sourcemap文件来告诉webpack何时生成 自己的sourcemaps。
$ npm install typescript awesome-typescript-loader source-map-loader --save-dev
# 使用@types/前缀 额外要获取React和React-DOM的声明文件。
$ npm install @types/react @types/react-dom --save
```

```JavaScript
/* webpack.config.js */
entry:{
        // 入口文件  改成index.tsx文件
        index:path.resolve(__dirname,'src/index.tsx'),
    },
resolve: {
    // Add '.ts' and '.tsx' as 可解析的扩展.
    extensions: [".ts", ".tsx", ".js", ".json"]
},
// 模块里加
{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
```

```JSON
/* tsconfig.json */
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true, // false 不提示隐式具有any类型
        "module": "commonjs",
        "target": "es5",
        "jsx": "react",
    },
    "include": [
        "./src/**/*"
    ],
    "exclude": [
      "node_modules", // 这个目录下的代码不会被 typescript 处理
      "**/*.spec.ts"
    ]
}
```

### 基本使用

```TypeScript
/* Hello.tsx */
// 必须是 * as 否则报错[TypeError: Cannot read property 'Component' of undefined]
import * as React from "react";
export interface HelloProps { compiler: string; framework: string; }
//export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

/* index.tsx */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./components/Hello";
function createDiv(){
    const ele =document.createElement('div');
    ele.setAttribute('id','example');
    return ele;
}
document.body.appendChild(createDiv());
ReactDOM.render(
    <Hello compiler="TypeScript!" framework="React!" />,
    document.getElementById("example")
);
```

## 基础类型

### 接口

```TypeScript
// 普通定义接口
interface Person1{
    firstName:string; // 参数
    lastName:string;  // 参数
}
// 函数 (参数为接口类型)
function greeter(person:Person1){
    // 返回 Hello 名 姓
    return 'Hello'+person.firstName+ ' ' +person.lastName;
}
// 设定名和姓的参数值
let user ={firstName:'Satya',lastName:'Sakya'};
ReactDOM.render(
    <p>{greeter(user)}</p>,
    document.getElementById("root")
);

// 定义接口 属性可选 ，注意？符号
interface Person2{
    firstName?:string; // 参数
    lastName?:string;  // 参数
}

// 定义接口 属性只读
interface Person3{
    readonly firstName:string; // 参数
    readonly lastName:string;  // 参数
}
// 赋值后，无法再改变
let p1: Person3 ={firstName: 'Satya',lastName:'Sakya'};
ReactDOM.render(
    // 此处可发现，该接口的实现，内中属性值不可变。
    <h1>{p1.firstName+"___"+p1.lastName}</h1>,
    document.getElementById('root')
);

// ReadonlyArray<T> 只读泛型
let a: number[]=[1,2,3,4,5];
let ro: ReadonlyArray<number> =a;
ReactDOM.render(
    // 输出ro，也就是只读泛型内容长度，为5.
    <h1>{ro.length}</h1>,
    document.getElementById('root')
);

// ReadonlyArray<T> 只读泛型
let a: number[]=[1,2,3,4,5];
let ro: ReadonlyArray<number> =a;
a =ro as number[]; // 用类型断言重写
ReactDOM.render(
    // 结果为：12345
    <h1>{a}</h1>,
    document.getElementById('root')
);

// 函数类型
interface searchFunc {
    (source: string ,subString:string):boolean;
}
// 创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量
let mySearch :searchFunc;
mySearch =function (src:string,sub:string):boolean {
    let result =src.search(sub);
    return result > -1;
}

// 索引类型
interface StringArray{
    [index:number]:string;
}
let myArray:StringArray;
myArray = ['Satya','Sakya'];
let myStr: string =myArray[0];
ReactDOM.render(
    <h1>{myStr}</h1>,
    document.getElementById('root')
);

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string  // 错误，`name`类型与索引类型返回值的类型不匹配
}

// 索引类型 设置为只读
interface ReadonlyStringArray{
    readonly [index:number]:string;
}
let myArray:ReadonlyStringArray = ['Satya','Sakya'];

// 类类型 实现接口
interface ClockInterface {
    currentTime: Date;
    // 接口中描述的方法
    setTime(d:Date):any;
}
class Clock implements ClockInterface {
    currentTime:Date;
    // 实现接口中的函数
    setTime(d:Date){
        this.currentTime=d;
    }
    // 构造函数
    constructor(h:number,m:number){}
}



```

做为变量使用的话用 const，若做为属性则使用 readonly。

### 类

创建一个 Student 类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。还要注意的是，在构造函数的参数上使用 public 等同于创建了同名的成员变量。

```JavaScript
// 学生类
class Student{
    fullName:string; // 全名
    // 构造函数 公共字段 使用public等同于创建了同名的成员变量
    constructor(public firstName:any, public middleInitial:any, public lastName:any) {
        this.fullName=firstName+' '+middleInitial+' '+lastName;
    }
}
// 设定名和姓的参数值 类实例化并赋值
let user =new Student('Satya','——','Sakya');
```

## echarts-for-react

Echarts(v3.0 & v4.0)的 react 封装
https://git.hust.cc/echarts-for-react

## react-highlight

https://github.com/akiran/react-highlight

```Bash
$ npm install react-highlight --save
```

## Ant Design of React

```Bash
$ npm install antd --save
```

```JavaScript
/* index.js */
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
function createDiv(){
    const ele =document.createElement('div');
    ele.setAttribute('id','root');
    return ele;
}
document.body.appendChild(createDiv());
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: '',
      };
    }
    handleChange(date) {
      message.info('您选择的日期是: ' + (date ? date.toString() : ''));
      this.setState({ date });
    }
    render() {
      return (
        <LocaleProvider locale={zhCN}>
          <div style={{ width: 400, margin: '100px auto' }}>
            <DatePicker onChange={value => this.handleChange(value)} />
            <div style={{ marginTop: 20 }}>当前日期：{this.state.date && this.state.date.toString()}</div>
          </div>
        </LocaleProvider>
      );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
```

基于 Redux 推出了自己的最佳实践 dva，以及可插拔的企业级应用框架 umi，推荐你在项目中使用。dva 是一个基于 Redux 的 轻量级数据流方案，概念来自 elm，支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。
umi 则是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。然后配以完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

##

redux 本身和 react 没有半毛钱关系，它只是数据处理中心.react-redux:在顶层组件之上又加了一个组件，作用是进行逻辑运算、储存数据和实现组件尤其是顶层组件的通信

````Bash
#
$ npm install redux react-redux --save
# CSS3动画
$ npm install react-addons-css-transition-group --save



# Development Environment
- 构建工具：webpack
- 前端框架：

## Base
``` Bash
$ git clone https:…/x/T….git # 拉取github新建的仓库
$ cd Preta #打开本地仓库
$ npm init --yes # 初始化npm，创建package.json
# 在该文件中加上 "author": "yourname",
$ mkdir docs # 在GitHub上部署,等同于dist
````

Github 推送时候的过滤文件

```.gitignore
/node_modules
# vscode
.vscode
```

## webpack 构建工具

```Bash
# 装载 webpack4 必须装cli
$ npm install webpack webpack-cli --save-dev
```

### 基本使用

```Bash
$ mkdir src && cd src # 创建并打开src文件夹
$ touch main.js # 该文件作为主入口文件
$ touch index.html # 暂时的页面文件
```

```JavaScript
/* src/main.js */
alert('Preta');
```

```HTML
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Preta</title>
</head>
<body> </body>
</html>
```

### 配置文件

```Bash
$ mkdir config && cd config # 创建并打开配置文件夹
$ touch webpack.config.js # webpack的基础配置文件
```

```JavaScript
/* config/webpack.config.js */
const path =require('path'); // 内置模块用于设置路径

module.exports ={
    // 入口文件
    entry: path.resolve(__dirname,'../src/main.js'),
    // 输出配置
    output: {
        // 指定输出文件夹
        path:path.resolve(__dirname,'../docs'),
        // 输出文件名
        filename: 'js/main.js',
    },
}
```

### npx 改成 npm 脚本命令

```JSON
/* package.json */
"scripts": {
    "build": "webpack --config ./config/webpack.config.js"
},
```

### html-webpack-plugin

```Bash
# 默认生成index.html文件,所有bundle会自动加入。
$ npm install html-webpack-plugin --save-dev
```

```JavaScript
/* config/webpack.config.js */
// 引入自动生成html
const HtmlWebpackPlugin =require('html-webpack-plugin');
plugins: [
    // 实例化插件
    new HtmlWebpackPlugin({
        title:'Preta', // 标题
        filename: 'index.html', // 文件名
    meta:{
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        }
    })
]
```

### Css Style Loader

```Bash
$ npm install css-loader style-loader --save-dev
```

```JavaScript
/* config/webpack.config.js */
module: {
    rules :[
        {
            test: /\.css$/,
            use: [
                // 注意顺序
                {loader:'style-loader'},
                {loader:'css-loader'},
            ]
        }
    ]
}
```

```CSS
/* src/css/style.css */
body {
    background-color: aqua;
}
```

```JavaScript
/* src/main.js */
import './css/style.css'; // 引入该css文件
```

### mini-css-extract-plugin

```Bash
# 将所有的入口中引用的 *.css，移动到独立分离的 CSS 文件.
$ npm install mini-css-extract-plugin --save-dev
```

```JavaScript
/* config/webpack.config.js */
// 引入css单独分离插件
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
module: {
    rules :[
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,"css-loader"
            ]
        }
    ]
},
plugins: [
    // 实例化css分离插件
    new MiniCssExtractPlugin({
        filename: "./css/[name].css",
        chunkFilename: '[id].css'
    })
]
```

### 模块热替换

```Bash
$ npm install webpack-dev-server --save-dev
```

```JavaScript
/* config/webpack.config.js */
// 模块热替换所需
const webpack =require('webpack');

// module.exports 配置建议服务器模块
devServer: {
    contentBase: '../docs',
    hot: true  // 开启热更新
},
// plugins  // 模块热更新
new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()
```

```JSON
/* package.json */
"scripts": {
    "build:dev": "webpack-dev-server --config ./config/webpack.config.js"
}
```

```Bash
$ npm run build
$ npm run build:dev # 启动浏览器，更改style.css，刷新浏览器
```

### babel-loader 下代 JS 语法编译器

```Bash
$ npm install babel-loader @babel/core @babel/preset-env --save-dev
```

```JavaScript
/* config/webpack.config.js */
// module rules
{ test:/\.js$/, use: {loader: 'babel-loader'}
    // 排除node_modules目录下的文件
    exclude: path.resolve(__dirname, '../node_modules'),
}
```

```JSON
/* .babelrc babel的配置 */
{
    "presets": [
        [
        "@babel/env",{"modules": "commonjs"}
      ]
    ]
}
```

#### 测试 babel 功能

```JavaScript
/* src/test.js */
exports.arrowTest =function() {
    alert([1,2,3].map(n => n+1));
}

/* src/main.js */
const test =require('./test.js'); // 引入
test.arrowTest(); // 调用test.js中的函数
```

## React

```Bash
# 装载react react-dom
$ npm install react react-dom --save
$ npm install @babel/preset-react --save-dev
```

```JSON
/* .babelrc */
{
    "presets": [
        [
        "@babel/env",{"modules": "commonjs"}
      ], // 新增对react
      [
        "@babel/preset-react"
      ]
    ]
}
```

```JavaScript
/* src/tes.js */
import React,{ Componet } from 'react';
import './css/style.css';

class Test extends Componet {
    render() {
        return (
            <div>
                <h1>Hello Preta!</h1>
            </div>
        );
    }
}
export default Test;
```

```JavaScript
/* src/main.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test.js';

function creDiv() {
    let el =document.createElement('div');
    el.setAttribute('id','root');
    return el;
}
document.body.appendChild(creDiv());
// react的dom渲染，渲染组件，组件渲染到的位置
ReactDOM.render(
    <Test/>,
    document.getElementById('root'));
```

## TypeScript

```Bash
# ts加载器
$ npm i typescript awesome-typescript-loader -D
# 源映射
$ npm i source-map-loader -D
# @types/ 额外获取React和React-dom
$ npm i @types/react @types/react-dom --save
# 创建typeScript的默认配置文件
$ npn tsc --init
```

```JavaScript
/* config/webpack.config.js */
entry: path.resolve(__dirname,'../src/index.tsx'),
// 可解析的扩展
resolve: {
    extensions:[".ts",".tsx",".js",".json"]
},
module: {
    rules :[
        {
            test: /\.tsx?$/,
            use: {loader:"awesome-typescript-loader"},
        },
    ]
},
```

```JSON
/* tsconfig.json */
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

## 规范实例

- 为与导入时{xxx}区别，自定义组件使用 export 语句;

```TypeScript
/* 无状态组件 箭头函数式 */
const Home: React.SFC =() => {
    return(
        <div>
            <h1>无状态组件TS版</h1>
        </div>
    );
};
export default Home;
/* 外部导入时： */
import Home from './Home';

export + {XXX}



```

## Layout 弹性布局

## react-router-dom

```Bash
$ npm install react-router-dom --save
$ npm install @types/react-router-dom --save # TS
```

## React

```Bash
$ npm i react react-dom -S
$ npm i @types/react @types/react-dom -D
```

```HTML
<!-- ./src/index.html -->
<body>
    <h1> index.html </h1>
    <div id="root"></div>
</body>
```

```TypeScript
/* ./src/hello.tsx */
import * as React from 'react';
// 无状态组件，箭头函数 写法
export const Hello =() => {
    return (
        <h2>Hello Component</h2>
    );
}

/* ./src/main.tsx */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Hello} from './hello';

ReactDOM.render(
    <Hello/>,
    document.getElementById('root')
);
```

```JavaScript
/* ./webpack.config.js 入口文件改为 */
entry: ['@babel/polyfill','./main.tsx'],
```

## Properties

```TypeScript
/* ./src/hello.tsx */
import * as React from 'react';
//无状态组件 箭头函数 带props(属性)写法
export const Hello = (props:{userName:string}) => {
    return(
        <h2>Hello user:{props.userName}!</h2>
    );
}

import * as React from 'react';
// 无状态组件 箭头函数 带props(属性)接口 写法
interface IHelloProps{
    userName: string;
}
export const Hello = (props:IHelloProps) => (
    <h2>Hello user:{props.userName}!</h2>
);
```

```TypeScript
/* ./src/main.tsx */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Hello} from './hello';

ReactDOM.render(
    <Hello userName="Satya"/>,
    document.getElementById('root')
);
```

## State

```TypeScript
/* ./src/app/tsx */
import * as React from 'react';
import {Hello} from './hello';
export const App = () => {
    return (
        <Hello userName="Satya"/>
    );
}

/* ./src/main.tsx */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

```TypeScript
/* ./src/app.tsx */
import * as React from 'react';
import {Hello} from './hello';
// 定义该组件的数据接口
interface IAppProps {}
// 定义 该组件的状态接口
interface IAppState {
    userName:string; // 用户名
}
// 有状态组件 类 写法
export class App extends React.Component<IAppProps,IAppState> {
    // 构造函数
    constructor(props:IAppProps){
        super(props);
        //初始化状态 给变量一个默认用户名
        this.state ={userName: 'defaultUserName'};
    }
    // 公有函数
    public render () {
        return(
            /* 这里用的是状态里面的默认值 */
            <Hello userName={this.state.userName}/>
        );
    }
}
```

创建一个 NameEdit 组件。 允许用户更新其用户名，并在 userName 的值更新时，通过回调来通知父控件。

```TypeScript
/* ./src/nameEdit.tsx */
import * as React from 'react';
// 用户名编辑组件的数据接口
interface INameEditProps{
    userName:string;
    // 变更的事件
    onChange : (event) => void;
}
export const NameEdit = (props:INameEditProps) =>
    //  <>：一种创建具有多个根元素（不是单个父元素）的组件的方法。或者写做 <React.Fragment>……</React.Fragment>
    <>
        <label>Update name:</label>
        <input value={props.userName} onChange={props.onChange}/>
    </>
```

```TypeScript
/* ./src/app.tsx */
import * as React from 'react';
import {Hello} from './hello';
import {NameEdit} from './nameEdit';
// 定义该组件的数据接口
interface IAppProps {}
// 定义 该组件的状态接口
interface IAppState {
    userName:string; // 用户名
}
export class App extends React.Component<IAppProps,IAppState> {
    // 构造函数
    constructor(props:IAppProps){
        super(props);
        //初始化状态 给变量一个默认用户名
        this.state ={userName: 'defaultUserName'};
    }
    // 设置用户名状态
    setUserNameState = (event) => {
        this.setState({userName:event.target.value});
    }
    // 公有函数
    public render () {
        return(
            <>
                {/* 这里用的是状态里面的默认值 */}
                <Hello userName={this.state.userName}/>
                <NameEdit userName={this.state.userName} onChange={this.setUserNameState} />
            </>
        );
    }
}
```

## Callback + State

使用内部处理程序，将 NameEdit 从无状态组件转换为类组件，然后将在命名上添加一些重构。使之实现点击提交的按钮，才会变更用户名

```TypeScript
/* ./src/nameEdit.tsx */
import * as React from 'react';
// 用户名编辑组件的数据接口
interface INameEditProps{
    // 初始用户名
    initialUserName: string;
    // 用户名更新
    onNameUpdated: (newName:string) => any;
}
// 用户名编辑组件的状态接口
interface INameEditState {
    editingName: string; // 编辑名字
}
export class NameEdit extends React.Component<INameEditProps,INameEditState> {
    constructor(props:INameEditProps){
        super(props);
        // 初始化状态，编辑名字为初始用户名
        this.state ={editingName:this.props.initialUserName};
    }
    // 名字的变更事件
    onChange = (event) => {
        // 设置状态 编辑名字变量的值为事件目标值(输入的值？)
        this.setState({editingName:event.target.value});
    }
    // 名字提交事件
    onNameSubmit =(event:any):any => {
        // 把名字数据改为编辑名字变量的值
        this.props.onNameUpdated(this.state.editingName);
    }
    public render() {
        return(
            <>
                <label>Update Name:</label>
                <input value={this.state.editingName} onChange={this.onChange}/>
                <button onClick={this.onNameSubmit}>Change NameSubmit!</button>
            </>
        );
    }
}
```

```TypeScript
/* ./src/app.tsx */
import * as React from 'react';
import {Hello} from './hello';
import {NameEdit} from './nameEdit';
// 定义该组件的数据接口
interface IAppProps {}
// 定义 该组件的状态接口
interface IAppState {
    userName:string; // 用户名
}
// 有状态组件 类 写法
export class App extends React.Component<IAppProps,IAppState> {
    // 构造函数
    constructor(props:IAppProps){
        super(props);
        //初始化状态 给变量一个默认用户名
        this.state ={userName: 'defaultUserName'};
    }
    // 设置用户名状态
    setUserNameState = (newName:string) => {
        this.setState({userName:newName});
    }
    // 公有函数
    public render () {
        return(
            <>
                {/* 这里用的是状态里面的默认值 */}
                <Hello userName={this.state.userName}/>
                <NameEdit initialUserName={this.state.userName} onNameUpdated={this.setUserNameState}/>
            </>
        );
    }
}
```

## Refactor

在前面的示例中，我们设置了初始用户名值。 如果我们期望这个值来自例如 一个 AJAX 请求或者它是否可以及时更改？ 目前的做法是行不通的。

```TypeScript
/* ./src/nameEdit.tsx */
interface INameEditState {
    initialUserName: string; // 初始用户名
    editingName: string;
}
// 初始化状态，初始用户名为初始用户名，编辑名字为初始用户名
this.state ={initialUserName:this.props.initialUserName, editingName:this.props.initialUserName};
// 下个数据，上个状态 (这段是个思路，没有写在例中)
static getDerivedStateFromProps(nextProps : Props, prevState : State) : Partial<State> {
    // 如果是下个数据的初始用户名，并且该名不等于上个状态的初始用户名
    if(nextProps.initialUserName &&
        nextProps.initialUserName != prevState.initialUserName) {
        // 将值赋值给编辑用户名变量
        return {editingName: nextProps.initialUserName}
    } else { return null; } // 否则，不改变该值
}
```

更新 nameEdit.tsx 以请求新的 editingUsername，并将其从状态中删除。

```TypeScript
/* ./src/nameEdit.tsx */
import * as React from 'react';
// 用户名编辑组件的数据接口
interface INameEditProps{
    editingUserName:string; // 编辑名字
    // 编辑名字更新函数
    onEditingNameUpdated: (newName:string) => void;
    // 名字更新请求函数
    onNameUpdateRequest: () => void;
}
export class NameEdit extends React.Component<INameEditProps>{
    constructor(props:INameEditProps){
        super(props);
    }
    // 名字的变更事件 HTMLInputElement 为触发 Event 的元素类型
    onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.props.onEditingNameUpdated((e.target as HTMLInputElement).value);
    }
    public render() {
        return(
            <>
                <label>Update Name:</label>
                <input value={this.props.editingUserName} onChange={this.onChange}/>
                <button onClick={this.props.onNameUpdateRequest}>Change NameSubmit!</button>
            </>
        );
    }
}
```

```TypeScript
/* ./src/app.tsx */
import * as React from 'react';
import {Hello} from './hello';
import {NameEdit} from './nameEdit';
// 定义该组件的数据接口
interface IAppProps {}
// 定义 该组件的状态接口
interface IAppState {
    userName:string; // 用户名
    editingUserName: string; // 编辑用户名
}
// 有状态组件 类 写法
export class App extends React.Component<IAppProps,IAppState> {
    // 构造函数
    constructor(props:IAppProps){
        super(props);
        // 定义默认用户名 ，便于下面使用
        const defaultUserName = 'defaultUserName';
        //初始化状态 给变量一个默认用户名
        this.state ={userName: defaultUserName,editingUserName:defaultUserName};
    }
    // 设置用户名状态
    setUserNameState = () => {
        this.setState({userName:this.state.editingUserName});
    }
    // 更新为编辑名字函数
    updateEditingName =(editingName:string):void => {
        // 设置状态 ，编辑用户名值为传入的编辑名字值
        this.setState({editingUserName:editingName});
    }
    // 公有函数
    public render () {
        return(
            <>
                {/* 这里用的是状态里面的默认值 */}
                <Hello userName={this.state.userName}/>
                <NameEdit editingUserName={this.state.editingUserName} onEditingNameUpdated={this.updateEditingName} onNameUpdateRequest ={this.setUserNameState}/>
            </>
        );
    }
}
```

## MoveBackToStateless

```TypeScript
/* ./src/nameEdit.tsx */
import * as React from 'react';
// 用户名编辑组件的数据接口
interface INameEditProps{
    editingUserName:string; // 编辑名字
    // 编辑名字更新函数
    onEditingNameUpdated: (newName:string) => void;
    // 名字更新请求函数
    onNameUpdateRequest: () => void;
}
// 回归到无状态组件
export const NameEdit = (props: INameEditProps) =>
    <div>
        <label>Update Name: </label>
        <input value={props.editingUserName} onChange={(e):void => props.onEditingNameUpdated((e.target as HTMLInputElement).value)}/>
        <button onClick={props.onNameUpdateRequest}>Change it!</button>
    </div>
```

## Enable

在输入为空或值未更改时禁用“更新”按钮

## React 组件写法

### 无状态的函数式写法（纯组件 SFC）

不需要管理状态 state，数据直接通过 props 传入。一般搭配高阶组件（简称：HOC）使用，高阶组件用来托管 state。

```TypeScript
/* TS版 无状态组件 箭头函数 */
const Home: React.SFC =() => {
    return(
        <div>
            <h1>无状态组件TS版</h1>
        </div>
    );
};
export default Home;
/* 以上写法，在外部导入时，需注意： */
import Home from './Home';

/* ============================ */
/* TS版 无状态组件 箭头函数 导出 */
export const Home: React.SFC =() => {
    return(
        <div>
            <h1>无状态组件TS版</h1>
        </div>
    );
};
/* 以上写法，在外部导入时，需注意： */
import {Home} from './Home';


/* ============================ */
/* TS版 无状态组件 class式 */
class Home extends React.Component {
    render():JSX.Element {
        return(
            <div>
                <h1>无状态组件TS版</h1>
            </div>
        );
    }
}
export default Home
/* 以上写法，在外部导入时，需注意： */
import Home from './Home';

/* ============================ */
/* TS版 无状态组件 箭头函数 class式 导出 */
export class Home extends React.Component {
    render():JSX.Element {
        return(
            <div>
                <h1>无状态组件TS版</h1>
            </div>
        );
    }
}
/* 以上写法，在外部导入时，需注意： */
import {Home} from './Home';

/* ============================ */
/* TS版 无状态组件 箭头函数 class式 导出 默认 */
export default class Home extends React.Component {
    render():JSX.Element {
        return(
            <div>
                <h1>无状态组件TS版</h1>
            </div>
        );
    }
}
/* 以上写法，在外部导入时，需注意： */
import Home from './Home';

/* ============================ */

/* ============================ */
/* TS版 无状态组件 箭头函数 带参props*/
interface IHomeProps{
    firstProp:string; // 第一个参数
    lastProp:string; // 第二个参数
}
// 作为一个子组件，用于Home中
// 指定props的类型为定义的接口
const Test: React.SFC<IHomeProps> =(props:IHomeProps) => {
// 省略写法： const Test: React.SFC<IHomeProps> =(props) => {
    // 声明 两个变量，为IHomeProps类型，并将 props遍历赋值过去
    const {firstProp,lastProp}:IHomeProps =props;
    // 省略写法： const {firstProp,lastProp} =props;
    return(
        <div>
            <h1>{firstProp}和{lastProp}</h1>
        </div>
    );
}
const Home:React.SFC =() => {
    return(
        <div>
            <Test firstProp="AAA" lastProp="BBB"/>
        </div>
    );
}
export default Home

/* TS版 无状态组件 箭头函数 带参props + 组件class */
interface IHomeProps{
    firstProp:string; // 第一个参数
    lastProp:string; // 第二个参数
}
// 作为一个子组件，用于Home中
const Test: React.SFC<IHomeProps> =(props) => {
    // 声明 两个变量，为IHomeProps类型，并将 props遍历赋值过去
    const {firstProp,lastProp} =props;
    return(
        <div>
            <h1>{firstProp}和{lastProp}</h1>
        </div>
    );
}

export default class Home extends React.Component {
    render():JSX.Element {
        return(
            <div>
                <Test firstProp="AA" lastProp="BB"/>
            </div>
        );
    }
}
```

```JavaScript
/* JS版 无状态组件 函数式写法 */
function Home () {
    return <div><h1>无状态组件，函数式写法。</h1></div>
}
export default Home

// 无状态组件，箭头函数式写法
const Home = () => (
    <div>
        <h1>无状态组件，箭头函数式写法!</h1>
    </div>
)
export default Home
```

### 有状态组件 ES6-写法 React.Component

```TypeScript
/* TS版 有状态组件 */
// 该组件所需的状态接口
export interface IHomeState {
    name:string; // 该参数的变更
}
// {}留空的地方是props ，如IHomeProps
export class Home extends React.Component<{},IHomeState> {
    // 构造函数
    constructor(props:{}) {
        super(props);
        // 状态初始化
        this.state ={name:""};
    }

    // 设置名字 状态
    setName =() => {
        // 设置名字
        this.setState({ name: 'Satya', });
    }

    // 渲染
    render() {
        // 声明状态
        const {name} =this.state;
        return(
            <div>
                {/* 点击 ，调用设置名字的状态 */}
                <div onClick={this.setName}>Set Name</div>
                <div>{name}</div>
            </div>
        );
    }
}
```

### Props & State

```TypeScript
export class Home extends React.Component<IHomeProps,IHomeState> {
    // 构造函数
    constructor(props:IHomeProps) {
        super(props);
        // 状态初始化
        this.state ={name:""};
        props.firstProp="AAA"; // 用于测试，在此赋值
        props.lastProp="BBB";   // 用于测试，在此赋值
    }

    // 设置名字 状态
    setName =() => {
        // 设置名字
        this.setState({ name: 'Satya', });
    }

    // 渲染
    render() {
        // 声明状态
        const {name} =this.state;
        // 声明数据
        const {firstProp,lastProp} =this.props;
        return(
            <div>
                {/* 点击 ，调用设置名字的状态 */}
                <div onClick={this.setName}>Set Name</div>
                <div>{name}</div>
                {/* 这里为两个测试参数赋值 */}
                {/* <Test firstProp="AAA" lastProp="BBB"/> */}
                <h1>{firstProp}和{lastProp}</h1>
            </div>
        );
    }
}
```

# React-TypeScript-Samples

## Components

```TypeScript

```

```TypeScript
class App extends React.Component{...}

// state的初始化放在构造函数方法constructor中声明。
constructor(props) {
    super(props);
    this.state ={
        inputName: '',
        outputName: '',
    };
    this.handleChange =this.handleChange.bind(this);
    this.handleClick =this.handleClick.bind(this);
}

// 三种 this 绑定
// 1. 在constructor中使用bind()进行硬绑定
constructor() {
  this.handleClick = this.handleClick.bind(this);
}

// 2. 直接在元素上使用bind()绑定
<label className={className} onClick={this.handleClick.bind(this)}>

// 3. ES6 语法糖：Arrow Function（箭头函数）可以使this直接指向class App（作用等同于var self = this）
<label className={className} onClick={()=>this.handleClick()}>
```

## JSX React 整合

使用 React 类型定义,声明定义了 JSX 合适命名空间来使用 React。

### Error Boundary 处理错误组件

##

```TypeScript
{/*style上面的class在JSX中需要改成className*/}
{/*行内样式需要加两个花括号*/}
<span className="content" style={{display:this.state.display}}>内容</span>

/*react 生命周期*/



```

```TypeScript
// 导出 接口 数据 内容定义组件要用到的属性
export interface IProps {
    name: string; // 打招呼的名字
    enthusiasmLevel? : number; // 可选属性，感叹号的数量
}
// 导出 类  (无状态类式组件) 接受IProps对象
export class Header extends React.Component<IProps>{
    // 构造函数
    constructor(props: IProps){
        super(props); // 初始化构造函数
    }
    render() {
        //
        const {name,enthusiasmLevel=1} =this.props;
        if(enthusiasmLevel <= 0){
            throw new Error('Is Error!');
        }
        return (
            <header>Hello {name +"___"+ getExclamationMarks(enthusiasmLevel)}</header>
        );
    }
}
// 字符变成！号
function getExclamationMarks(numChars: number){
    return Array(numChars+1).join('!');
}
```

```TypeScript
/*  src/layout/Header.tsx 修改 */

```

```TypeScript
/*  */
```

# Router v4

```Bash
$ npm i react-router-dom --save
$ npm i @types/react-router-dom --save
```

<BrowserRouter> 应该用在服务器处理动态请求的项目中（知道如何处理任意的 URI），
<HashRouter> 用来处理静态页面（只能响应请求已知文件的请求）。

```TypeScript
/* index.tsx */ // 选择router
import {BrowserRouter} from 'react-router-dom';
// 渲染一个<Router>
ReactDOM.render((
    <BrowserRouter>
        <Layout/>
    </BrowserRouter>
),document.getElementById('root'));
```

### NavLink && Link

```TypeScript
/* Header.tsx */
import {NavLink} from 'react-router-dom';
{/* 当前选中项的样式 ，exact:精确匹配路由 */}
<li><NavLink to='/' activeClassName='active' exact>Home</NavLink></li>
<li><NavLink to='/blog' activeClassName='active'>Blog</NavLink></li>
<li><NavLink to='/tool' activeClassName='active'>Tool</NavLink></li>
```

```CSS
.active {
    color: green;
}
```

### 无状态组件

```TypeScript
/*  */
```

#### 基本路由示例

```TypeScript

```

> 注意:需启动服务器才能测试

```Bash
$ npm run build:prod
$ npm run build:dev # 启动服务器
```

Link 和 NavLink 的选择
两者都可以控制路由跳转，不同点是 NavLink 的 api 更多，更加满足你的需求。
Link:主要 api 是 to，to 可以接受 string 或者一个 object，来控制 url。
NavLink:可以为当前选中的路由设置类名、样式以及回调函数等。
exact 用于严格匹配，匹配到/则不会继续向下匹配，to 则是控制跳转的路径，activeClassName 是选中状态的类名，我们可以为其添加样式。我们在/second 后面添加 1234 来想路由中传递信息，这结合了上面 Route 中的/second/:id，结合使用了，
match
match 是在使用 router 之后被放入 props 中的一个属性，在 class 创建的组件中我们需要通过 this.props.match 来获取 match 之中的信息。

# React

### 元素渲染

大多数 React 应用只会调用一次 ReactDOM.render()。

```JavaScript
/* index.js */
// 显示本地时间
function tick(){
    const element =(
        <div>
            <h1>Hello Satya!</h1>
            <h2>Now Time is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    // React-Dom 获取到root的div,渲染出来h1标签
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}
// 每秒调用一次函数
setInterval(tick,1000);
```

### 组件 & Props

- 独立、可复用。接收任意输入值（“props”）,返回页面元素。
- 组件名称必须以大写字母开头.<Welcome /> 表示一个组件，使用该组件时必须定义或引入它.
- 组件的返回值只能有一个根元素。
- 所有的 React 组件必须像纯函数那样使用它们的 props

```JavaScript
// 定义组件 JS函数式定义
function Welcome(props){
    return <h1>Hello,{props.name}</h1>
}
// ES6 class 定义组件
class Welcome extends React.Component{
    render(){
        return <h1>Hello,{this.props.name}</h1>
    }
}

// 渲染自定义组件
const element =<Welcome name='Satya' />;// 自定义组件元素
// React-Dom 获取到root的div,渲染出来h1标签
ReactDOM.render(
    element,
    document.getElementById('root')
);
```

#### 组合组件

```JavaScript
// ES6 class 定义组件
class Welcome extends React.Component{
    render(){
        return <h1>Hello,{this.props.name}</h1>
    }
}
// 创建App组件，多次渲染Welcome
function App(){
    return(
        <div>
            <Welcome name='Satya' />
            <Welcome name='Sakya' />
            <Welcome name='Lokavit' />
        </div>
    );
}
// React-Dom 获取到root的div,渲染出来h1标签
ReactDOM.render(
    <App />, // 渲染App函数中的多个组件
    document.getElementById('root')
);
```

#### 提取组件

```JavaScript
// 获取本地时间
function formatDate(date){
    return date.toLocaleDateString();
}
// 定义组件 JS函数式定义
function Avatar(props){
    return(
        <img className='Avatar'
        src={props.user.avatarUrl}
        alt={props.user.name}
        />
    );
}

function UserInfo(props){
    return(
        <div className='UserInfo'>
            <Avatar user={props.user} />
            <div className='UserInfo-name'>
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props){
    return(
        <div className='Comment'>
            {/* UserInfo小组件 */}
            <UserInfo user={props.author} />
            <div className='Comment-text'>
                {props.text}
            </div>
            <div className='Comment-data'>
                {formatDate(props.date)}
            </div>
        </div>
    );
}

// 创建一点儿数据
const comment ={
    date:new Date(),
    text:'This is text!',
    author:{
        name:'Hello Satya',
        avatarUrl:'https://i.loli.net/2018/11/11/5be82bc93ba60.png'
    }
};

// React-Dom 获取到root的div,渲染出来h1标签
ReactDOM.render(
    <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />,
    document.getElementById('root')
);
```

### State & 生命周期

> 状态与属性十分相似，但是状态是私有的，完全受控于当前组件。
> 将函数转换为类： 1.创建一个名称扩展为 React.Component 的 ES6 类 2.创建一个叫做 render()的空方法 3.将函数体移动到 render() 方法中 4.在 render() 方法中，使用 this.props 替换 props 5.删除剩余的空函数声明

```JavaScript
{/*  // 封装时钟
function Clock(props){
    return (
        <div>
            <h1>Hello Satya!</h1>
            <h2>Now Time is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}*/}

/* 将以上函数转换为类 */
/* 1.创建一个名称扩展为 React.Component 的ES6 类 */
class Clock extends React.Component{
    /* 2.创建一个叫做render()的空方法 */
    render(){
        /* 3.将函数体移动到 render() 方法中 */
        return (
            <div>
                <h1>Hello Satya!</h1>
                {/* 4.在 render() 方法中，使用 this.props 替换 props */}
                <h2>Now Time is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

function tick(){
    // React-Dom 获取到root的div,渲染出来h1标签
    ReactDOM.render(
        <Clock date={new Date()}/>,
        document.getElementById('root')
    );
}
setInterval(tick,1000);
```

#### 为一个类添加局部状态

```JavaScript
/* 为一个类添加局部状态 */
class Clock extends React.Component{
    /* 2.添加一个类构造函数来初始化状态 this.state */
    constructor(props){
        super(props);
        this.state={date:new Date()};
    }
    render(){
        return (
            <div>
                <h1>Hello Satya!</h1>
                {/* 1.在 render() 方法中，使用 this.state.date 替代 this.props.date */}
                <h2>Now Time is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
// React-Dom 获取到root的div,渲染出来h1标签
ReactDOM.render(
    /* 3.从 <Clock /> 元素移除 date 属性 */
    <Clock />,
    document.getElementById('root')
);
```

#### 将生命周期方法添加到类中

- 生命钩子：在组件类上声明特殊的方法，当组件挂载或卸载时，来运行一些代码。
- 组件输出到 DOM 后会执行 componentDidMount() 钩子

```JavaScript
/* 将生命周期方法添加到类中 */
class Clock extends React.Component{
    /* 2.添加一个类构造函数来初始化状态 this.state */
    constructor(props){
        super(props);
        this.state={date:new Date()};
    }
    /* 挂载 */
    componentDidMount() {
        /* 建立定时器 */
        this.timerID=setInterval(()=>this.tick(),1000);
    }
    /* 卸载 */
    componentWillUnmount() {
        /* 卸载定时器 */
        clearInterval(this.timerID)
    }
    /* 更新组件局部状态 */
    tick(){
        this.setState({date:new Date()});
    }
    render(){
        return (
            <div>
                <h1>Hello Satya!</h1>
                <h2>Now Time is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
// React-Dom 获取到root的div,渲染出来h1标签
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```

#### 正确地使用状态

```JavaScript
//不要直接更新状态 使用 setState()
this.setState({comment: 'Hello'});
// 构造函数是唯一能够初始化 this.state 的地方。
// 可以将多个setState() 调用合并成一个调用来提高性能
//接受一个函数而不是一个对象。如下函数，将接收先前的状态作为第一个参数(prevState)，将此次更新被应用时的props做为第二个参数
this.setState((prevState, props) => ({
    // 计数器： 上次状态数 + 增量
  counter: prevState.counter + props.increment
}));
// 常规函数写法 与=>写法结果一样
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
// 当调用 setState() 时，React 将你提供的对象合并到当前状态。
// 状态里的独立变量
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
}
// 调用 setState() 独立地更新
componentDidMount() {
    fetchPosts().then(response => {
        this.setState({
        posts: response.posts
        });
    });

    fetchComments().then(response => {
        this.setState({
        comments: response.comments
        });
    });
}
// 这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments。
```

### 事件处理

- 事件绑定属性的命名采用驼峰式写法.
- JSX 语法需传入一个函数作为事件处理函数，而非一个字符串(DOM 元素的写法)
- 不能使用返回 false 的方式阻止默认行为。必须明确的使用 preventDefault。
- 通常无需使用 addEventListener 为一个已创建的 DOM 元素添加监听器。仅需在元素初始渲染时提供一个监听器。

```JavaScript
// 传统HTML
<button onclick="activateLasers()"> Activate Lasers </button>
// React
<button onClick={activateLasers}> Activate Lasers </button>

// 阻止链接默认打开一个新页面
function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
    return (
      <a href="#" onClick={handleClick}>
        Click me!!!
      </a>
    );
}
<ActionLink /> // 变为自定义组件
```

使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。

```JavaScript
// 例：Toggle 组件渲染一个让用户切换开关状态的按钮
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={isToggleOn:true};
        // 这种绑定对于使`this`在回调中起作用是必要的
        this.handleClick =this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(prevState => ({
            isToggleOn:!prevState.isToggleOn
        }));
    }
    render(){
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn?'ON':'OFF'}
            </button>
        );
    }
}

// React-Dom 获取到root的div,渲染出来h1标签
ReactDOM.render(
    <Toggle/>,
    document.getElementById('root')
);

```

### 条件渲染

```JavaScript
/* 条件渲染 */
function UserGreeting(props) { return <h1>Welcome back!</h1>; }
function GuestGreeting(props) { return <h1>Please sign up.</h1>; }
// 创建一个 Greeting 组件，根据用户是否登录来显示其中之一
function Greeting(props){
    const isLoggedIn =props.isLoggedIn;
    if(isLoggedIn){return<UserGreeting/>;}
    return <GuestGreeting/>;
}
ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false}/>,
    document.getElementById('root')
);
```

#### 元素变量

- 使用变量来储存元素。可以有条件的渲染组件的一部分，而输出的其他部分不会更改。

```JavaScript
/* 登入控制及显示内容 */
function UserGreeting(props) { return <h1>Welcome back!</h1>; }
function GuestGreeting(props) { return <h1>Please sign up.</h1>; }

function LoginButton(props){
    return( <button onClick={props.onClick}> Login </button> );
}
function LogoutButton(props){
    return( <button onClick={props.onClick}> Logout </button> );
}

// 创建一个 Greeting 组件，根据用户是否登录来显示其中之一
function Greeting(props){
    const isLoggedIn =props.isLoggedIn;
    if(isLoggedIn){return<UserGreeting/>;}
    return <GuestGreeting/>;
}
// 登入控制
class LoginControl extends React.Component{
    // 构造函数
    constructor(props){
        super(props);
        this.handleLoginClick =this.handleLoginClick.bind(this);
        this.handleLogoutClick =this.handleLogoutClick.bind(this);
        this.state ={isLoggedIn:false};
    }
    handleLoginClick(){this.setState({isLoggedIn:true});}
    handleLogoutClick(){this.setState({isLoggedIn:false});}
    // 渲染
    render(){
        const isLoggedIn =this.state.isLoggedIn; // 状态
        let button =null;  //局部变量 按钮
        // 判断当前状态 决定渲染哪个按钮，及对应需要渲染的内容
        if(isLoggedIn){button=<LogoutButton onClick={this.handleLogoutClick}/>;}
        else{button=<LoginButton onClick={this.handleLoginClick}/>;}
        return( <div> <Greeting isLoggedIn={isLoggedIn}/> {button} </div> );
    }
}

ReactDOM.render(
    <LoginControl/>,
    document.getElementById('root')
);
```

#### 运算符&&

```JavaScript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
// 在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
```

#### 三元表达式

```JavaScript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

#### 阻止组件渲染

```JavaScript
/* 按钮控制警告的显示隐藏 */
function WarningBanner(props){
    if(!props.warn){return null;}
    return(<div className='warning'>Warning!</div>);
}
// 自定义组件
class Page extends React.Component{
    constructor(props){
        super(props);
        this.state={showWarning:true}; // 显示警告
        this.handleToggleClick =this.handleToggleClick.bind(this); // 点击事件
    }
    handleToggleClick(){ // 点击事件 上一个状态
        this.setState(prevState => ({showWarning:!prevState.showWarning}));
    }
    render(){
        return(
            <div>
                <WarningBanner warn={this.state.showWarning}/>
                <button onClick={this.handleToggleClick}>
                {this.state.showWarning?'Hide':'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);
```

### 列表 & Keys

#### 渲染多个组件

```JavaScript
/* 生成一个1到5的数字列表 */
const numbers =[1,2,3,4,5];
// 使用Javascript中的map()方法遍历numbers数组。
// 对数组中的每个元素返回<li>标签，最后我们得到一个数组listItems。
const listItems =numbers.map((number)=><li>{number}</li>);
ReactDOM.render(
    // 把整个listItems插入到ul元素中，然后渲染进DOM。
    <ul>{listItems}</ul>,
    document.getElementById('root')
);
```

#### 基础列表组件

```JavaScript
// 把以上例子重构成一个组件。接收numbers数组作为参数，输出一个无序列表。
function NumberList(props){
    const numbers =props.numbers;
    // 创建一个元素时，必须包括一个特殊的 key 属性
    const listItems =numbers.map((number)=>
        <li key={number.toString()}>{number}</li>);
    return(<ul>{listItems}</ul>);
}
const numbers =[1,2,3,4,5];
ReactDOM.render(
    <NumberList numbers={numbers}/>,
    document.getElementById('root')
);
```

#### Keys

- 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。

```JavaScript
// 应给数组中的每一个元素赋予一个确定的标识。
// 一个元素的key最好是其在列表中拥有的一个独一无二的字符串。通常，使用来自数据的id作为元素的key
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

// [下策] 当元素没有确定的id时，你可以使用他的序列号索引index作为key
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

#### 用 keys 提取组件

- 元素的 key 只有在它和它的兄弟节点对比时才有意义。

```JavaScript
// 提出一个ListItem组件，应把key保存在数组中<ListItem />元素上，而非放在ListItem组件中的<li>元素上。
function ListItem(props){
    const value =props.value;
    return(
        // 错误! 无需在此处指定KEY
       /* <li key={value.toString()}>{value}</li> */
        // 正确! 无需在此处指定KEY
        <li>{props.value}</li>
    );
}
function NumberList(props){
    const numbers =props.numbers;
    // 创建一个元素时，必须包括一个特殊的 key 属性
    const listItems =numbers.map((number)=>
    // 错误! 无需在此处指定KEY
    /* <ListItem value={number}/>); */
    // 正确! key应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number}/>);
    return(<ul>{listItems}</ul>);
}
const numbers =[1,2,3,4,5];
ReactDOM.render(
    <NumberList numbers={numbers}/>,
    document.getElementById('root')
);
```

#### 元素的 key 在他的兄弟元素之间应该唯一

```JavaScript
// 数组元素中使用的key在其兄弟之间应该是独一无二的,但无需全局唯一。
function Blog(props){
    // 标题列表
    const sidebar =(<ul>{props.posts.map((post)=>
        <li key={post.id}>{post.title}</li>)}
    </ul>);
    // 标题和内容显示区
    const content =props.posts.map((post)=>
    <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
    </div>);
    return(<div>{sidebar}<hr/>{content}</div>);
}
// 定义一些数据
const posts=[
    {id:1,title:'Hello Satya',content:'Welcome to my Blog!'},
    {id:2,title:'文章标题',content:'文章摘要？内容？'}
];
ReactDOM.render(
    <Blog posts={posts}/>,
    document.getElementById('root')
);
```

### 表单

#### 受控组件

```JavaScript
// 提交表单时输出name
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state={value:''};
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
    }
    handleChange(event){this.setState({value:event.target.value});}
    handleSubmit(event){
        alert('A name was submit!'+this.state.value);
        event.preventDefault();
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>name:
                    <input type='text' value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
        );
    }
}
ReactDOM.render(
    <NameForm/>,
    document.getElementById('root')
);
```

# Ant Design of React

```Bash
$ npm install create-react-app -g
# 项目名不能用大写
$ create-react-app demo --scripts-version=react-scripts-ts
$ cd demo
$ npm start # 启动
$ npm add antd # 引入 antd
# 一个对 c-r-a 进行自定义配置的社区解决方案
$ npm add react-app-rewired --dev
# 用于按需加载组件代码和样式的TS插件
$ npm add ts-import-plugin --dev
```

```JSON
/* ./package.json  更改 script */
"scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
    "eject": "react-scripts-ts eject"
},
```

```JavaScript
/* ./config-overrides.js */
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'css',
      }) ]
    })
  };

  return config;
}
```

```TypeScript
/* ./src/app.tsx 测试antd */
import { Button } from 'antd';
<Button type="primary">Button</Button>
```

> 报错：typescript - TSLint Import sources within a group must be alphabetized. (ordered-imports)。意思是 import 排序，将其禁用

```JSON
/* ./tslint.json */
{
    "extends": [
        "tslint:recommended"
    ],
    // 这部分
    "rules": {
        "ordered-imports": false
    }
}
```
