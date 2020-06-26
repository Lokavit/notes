# BundleCompile

`webpack & babel`

```bash
# 4.43.0 打包相关
$ npm i -D webpack
# 3.3.12 打包命令
$ npm i -D webpack-cli
# 8.1.0 babel加载器 webpack时使用
$ npm i -D babel-loader
# 7.10.3 核心，转译js语法，具体转译需根据插件配置
$ npm i -D @babel/core
# 7.10.3 js语法高转低
$ npm i -D @babel/preset-env

# 支持 promise 等
$ npm i -D @babel/plugin-transform-runtime
# 库开发者:不想污染全局变量
$ npm i --save @babel/runtime-corejs3

# 应用开发者:无需关系全局变量污染
$ npm i --save core-js@3 # 指定core-js 的版本
$ npm i --save @babel/runtime

# 其他babel
@babel/preset-react	# 转译react
@babel/plugin-proposal-class-properties	# 转译class
@babel/plugin-proposal-decorators # 转译装饰器
"plugins": ["@babel/plugin-proposal-decorators"]

@babel/polyfill	# 已废弃,改为配置preset-env
@babel/cli	# 命令行编译文件。非webpack时使用

# webpack新的压缩混淆插件,移除console
$ npm i -D uglify-js
$ npm i -D terser-webpack-plugin
```

- babel.config.json 配置文件

```json
// 应用开发者
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": { // 按需添加最小环境版本
                    "chrome": "60",
                    "ie": 11
                },
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": ["@babel/plugin-transform-runtime"]
}

// 库开发者
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "browsers": ["last 3 versions", "Safari >= 8", "iOS >= 8"]
          }
        }
      ]
    ],
    "plugins": [["@babel/plugin-transform-runtime", {"corejs": 3}]]
}
// 仅包括浏览器具有 >0.25% 市场份额的用户所需
"targets": "> 0.25%, not dead"
```

- webpack.config.js 打包配置
```js
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  /** 模式 */
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  /** 入口文件 */
  entry: {
    /** 此处给一个名字，则输出的文件名可以使用[name] */
    mylib: "./src/index.js",
  },
  /** 输出文件 */
  output: {
    library: "Mylib",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    /** 输出的文件名为 entry中定义的名字 mylib */
    filename: "[name].js",
  },
  // 该配置 输出打包后的形式
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        include: [path.resolve("src")],
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
    /** 若无以下设置，则使用默认的内置 terser-webpack-plugin打包，该打包不会移除console
     * 开发时，关闭以下代码，即保留console.log
     */
    minimizer: [
      /** 压缩混淆 */
      new TerserPlugin({
        minify: (file, sourceMap) => {
          // https://github.com/mishoo/UglifyJS2#minify-options
          const uglifyJsOptions = {
            /* your `uglify-js` package options */
            compress: {
              drop_console: true, // 去除console
            },
          };
          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }
          return require("uglify-js").minify(file, uglifyJsOptions);
        },
      }),
    ],
  },
};

```