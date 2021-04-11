<!--
title:File
dir:nodejs
-->


# fileDisplay

- 递归遍历文件夹中所有文件

```js
const path = require("path"); // 路径
const fs = require("fs"); // 文件系统
// 一个路径或路径片段解析成一个绝对路径，返回解析后的路径字符串
const filePath = path.resolve("src"); // 本地文件，从根盘符至指定文件夹的绝对路径
const pathDist = "./dist"; // 编译完输出的html文件的文件夹

fileDisplay(filePath); //

/**
 * 使用递归实现遍历文件夹中所有文件
 * @param {*} filePath 需遍历的文件夹
 */
function fileDisplay(filePath) {
  // 读取目录下面的文件，返回目录下的文件列表对象，如果传入的是个文件，返回这个文件
  fs.readdir(filePath, (err, files) => {
    if (err) return;
    files.forEach((filename) => {
      // 获取当前文件的绝对路径 ，本地的话，针对于磁盘
      let fileDir = path.join(filePath, filename);
      // 根据文件路径，获取文件信息，返回一个 fs.Stats对象
      fs.stat(fileDir, (error, stats) => {
        if (error) return;
        // 如果是文件夹，继续向下遍历
        if (stats.isDirectory()) {
          // 过滤掉 include 文件夹 不处理
          if (fileDir.includes("include")) return;
          fileDisplay(fileDir); // 调用递归，继续向下遍历文件夹及文件
        }
        // 如果是文件， 需要进行某些操作
        if (stats.isFile()) {
          // 处理文件名，剩下文件扩展名，含句点 , 找出 .html文件
          if (path.extname(filename) == ".html") {
            compileHTML(fileDir, filename, filePath, pathDist);
          }
          if (path.extname(filename) == ".css") {
            console.log("CSS文件");
          }
          if (path.extname(filename) == ".js") {
            console.log("JS文件");
          }
        }
      });
    });
  });
}
```

# compileHTML

`该方式似乎已不可取，因标准弃用`

- 可指定过滤文件夹，可分辨处理逻辑

```js
/*文件结构示例
  源代码: 
    src/views/demo.html  
    src/views/include/header.html
  编译后: 
    dist/views/demo.html
 */
/**
 * 编译HTML文件 (如在每个有 import页面，加上 header.html和footer.html)
 * @param {*} fileDir 当前文件绝对路径
 * @param {*} filename 文件名，带后缀名
 * @param {*} src 相对路径 [src]源码
 * @param {*} dist  输出文件时，所需的根路径[docs/dist]
 */
function compileHTML(fileDir, filename, src, dist) {
  // 读取文件  readFile带有回调 ，readFileSync 不带回调
  fs.readFile(fileDir, "utf-8", (err, data) => {
    let dataReplace = data.replace(
      /<link\srel="import"\shref="(.*)">/gi,
      (matchs, m1) => {
        // 返回读取的文件内容
        return fs.readFileSync(path.join(src, m1), "utf-8");
      }
    );
    fs.writeFile(dist + "/views/" + filename, dataReplace, "utf-8", (err) => {
      if (err) return console.log("文件写入错误 ERROR:", err);
    });
  });
}
```
