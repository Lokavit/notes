# webpack & babel

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

# babel.config.json 配置文件

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

# webpack.config.js 打包配置

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
        // 包含项正则，及非包含项正则
        // test: /[\\/]node_modules[\\/]/,
        include: [/\.js$/],
        sourceMap: true,
        // 版权信息等注释
        extractComments: false,
        cache: true,
        parallel: require("os").cpus().length, // 使用多进程并行运行可提高构建速度
        terserOptions: {
          ecma: undefined,
          warnings: false,
          // 指定一些其他解析选项，则传递一个对象
          parse: {},
          // 如果希望指定其他输出选项，则传递一个对象
          output: {
            // 版权信息等注释
            comments: false,
            semicolons: false,
          },
          // 传递false可以跳过名称修改，或传递一个对象以指定mangle选项
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // 传递false可以完全跳过压缩。传递一个对象以指定自定义压缩选项
          compress: {
            // 传递true放弃对console.*函数的调用
            drop_console: true,
          },
          // 如果您希望启用顶级变量和函数名称处理并删除未使用的变量和函数，则设置为true
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
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

# 代码拆分

- 注意 splitChunks 代码后，需在 HtmlWebpackPlugin 生成 Html 中的 chunks[]中做对应配置。才能保证生成的 html 带有对应 script 引用

```js
/** webpack.config.js */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    /** 这里设置多入口文件。如果是单独提取react相关代码单独输出，则可以写为如下
     * "lib.react":["react","react-dom","react-redux"]
     * 通常不在此处写，而且在 optimization.splitChunks{}中进行详细配置
     */
    gui: "./src/playground/index.jsx",
    cards: "./src/containers/cards.jsx",
    blocksonly: "./src/playground/blocks-only.jsx",
    compatibilitytesting: "./src/playground/compatibility-testing.jsx",
    player: "./src/playground/player.jsx",
  },
  output: {
    // library: "GUI",
    // filename: "[name].js",
    // chunkFilename: "chunks/[name].js",
    // 打包输出路径
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    // host: "0.0.0.0",
    port: process.env.PORT || 8601,
    https: true,
  },

  externals: {
    React: "react",
    ReactDOM: "react-dom",
  },
  resolve: {
    symlinks: false,
    extensions: [".js", ".jsx", ".json"],
    // 设置别名
    alias: {
      "@": path.resolve("src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|wav|gif|jpg)$/,
        loader: "file-loader",
        options: {
          name: "[sha512:hash:base64:7].[ext]",
          outputPath: "static/assets/",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 包含项正则，及非包含项正则
        // test: /[\\/]node_modules[\\/]/,
        include: [/\.js$/],
        sourceMap: true,
        // 版权信息等注释
        extractComments: false,
        cache: true,
        parallel: require("os").cpus().length, // 使用多进程并行运行可提高构建速度
        terserOptions: {
          ecma: 5,
          warnings: false,
          // 指定一些其他解析选项，则传递一个对象
          parse: {},
          // 如果希望指定其他输出选项，则传递一个对象
          output: {
            // 版权信息等注释
            comments: false,
            semicolons: false,
          },
          // 传递false可以跳过名称修改，或传递一个对象以指定mangle选项
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // 传递false可以完全跳过压缩。传递一个对象以指定自定义压缩选项
          compress: {
            // 传递true放弃对console.*函数的调用
            drop_console: true,
          },
          // 如果您希望启用顶级变量和函数名称处理并删除未使用的变量和函数，则设置为true
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],

    /** 代码拆分 */
    splitChunks: {
      chunks: "all", // 分割所有代码
      minSize: 30000, // 模块的最小体积，大于30000就拆分
      minChunks: 1, // 模块的最小被引用次数  模块被引用2次以上的才抽离
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 9, // 一个入口最大并行请求数
      automaticNameDelimiter: "~", // 文件名的连接符
      name: true, // 抽取出来文件的名字，默认为 true，表示自动生成文件名；
      cacheGroups: {
        /** 单独打包 pro-blocks的代码 */
        "lib.problocks": {
          test: /[\\/]node_modules[\\/]pro-blocks/,
          name: "lib.problocks",
          priority: -6, // 代码拆分优先级
          reuseExistingChunk: true, // 如果该chunk中引用了已被抽取的chunk，直接引用该chunk，不会重复打包代码
        },
        /** 单独打包 kid-相关库的代码 */
        "lib.kid": {
          test: /[\\/]node_modules[\\/]kid-[^\\/]/,
          name: "lib.kid",
          priority: -7,
          reuseExistingChunk: true,
        },
        /** 单独打包 scratch-相关库的代码 */
        "lib.scratch": {
          test: /[\\/]node_modules[\\/]scratch-[^\\/]/,
          name: "lib.scratch",
          priority: -8,
          reuseExistingChunk: true,
        },
        /** 单独打包 react-相关库的代码 */
        "lib.react": {
          test: /[\\/]node_modules[\\/]react[^\\/]/,
          name: "lib.react",
          priority: -9,
          reuseExistingChunk: true,
        },
        /** 将第三方库代码单独打包  */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          reuseExistingChunk: true,
        },
        /** 将第三方库代码单独打包  */
        common: {
          name: "common",
          priority: -20,
          reuseExistingChunk: true,
        },

        // // 假设还需要继续拆分
        // "locallib": {  //拆分指定文件
        //   test: /(src\/locallib\.js)$/,
        //     name: 'locallib',
        //     chunks: 'initial',
        //     priority: -9
        // }
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 配置不允许注入的chunk
      excludeChunks: ["blocksonly", "compatibilitytesting", "player"],
      // 允许插入到模板中的一些chunk
      chunks: [
        "gui",
        "lib.react",
        "lib.kid",
        "lib.problocks",
        "lib.scratch",
        "vendors",
        "common",
      ],
      template: "src/playground/index.html",
      title: "羚羊创客",
      // 是否将错误信息输出到html页面中
      showErrors: true,
      // 在对应的chunk文件修改后就会emit文件
      cache: true,
      // 压缩HTML文件
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
      // hash: true,
    }),

    /** blocks页面，只有积木块及操作区 */
    new HtmlWebpackPlugin({
      chunks: [
        "blocksonly",
        "lib.react",
        "lib.kid",
        "lib.problocks",
        "lib.scratch",
        "vendors",
        "common",
      ],
      template: "src/playground/index.html",
      filename: "blocks-only.html",
      title: "Kid Pro: Blocks",
    }),

    /** 作品播放，兼容性测试页面 */
    new HtmlWebpackPlugin({
      chunks: [
        "compatibilitytesting",
        "lib.react",
        "lib.kid",
        "lib.problocks",
        "lib.scratch",
        "vendors",
        "common",
      ],
      template: "src/playground/index.html",
      filename: "compatibility-testing.html",
      title: "Kid Pro: Compatibility Testing",
    }),

    /** 作品播放页面 */
    new HtmlWebpackPlugin({
      excludeChunks: ["blocksonly", "compatibilitytesting", "gui"],
      chunks: [
        "player",
        "lib.react",
        "lib.kid",
        "lib.problocks",
        "lib.scratch",
        "vendors",
        "common",
      ],
      template: "src/playground/index.html",
      filename: "player.html",
      title: "羚羊创客: 播放作品",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static",
          to: "static",
        },
        {
          from: "node_modules/pro-blocks/media",
          to: "static/blocks-media",
        },
        {
          from: "extensions/**",
          to: "static",
          context: "src/examples",
        },
        {
          from: "extension-worker.{js,js.map}",
          context: "node_modules/kid-vm/dist/web",
        },
      ],
    }),
  ],
};
```
