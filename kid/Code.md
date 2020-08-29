# kid-py

- python 在线编辑器

## 浏览器显示运行

### 后台调用 python shell

- 在接收的代码字符串后面添加 print(solution())用于打印结果
- 将第一步处理后的字符串写入一个文件中，例如:code/code.py
- 使用 child_process 模块的 exec 方法调用 shell 执行 python code/code.py 命令
- 获取打印结果

```js
const express = require("express");
const { exec } = require("child_process");
const router = express.Router();
router.post("/api/runcode", (req, res) => {
  let code = req.body.code;
  fs.writeFile("code/code.py", code + "\nprint(solution())", (err) => {
    let command = "python code/code.py";
    exec(command, (err, stdout, stdin) => {
      if (err) {
        let reg = /[\d\D]*(line\s\d)[\d\D]*?(\w*(?:Error|Exception).*)/im;
        let matchArr = reg.exec(err.message);
        matchArr.shift();
        res.send(matchArr.join(", "));
      } else res.send(stdout);
    });
  });
});
```

---

# kid-code

- blockly 显示及运行

## TODO 功能

- [x] js 和 python 的代码展示
- [x] js 代码运行结果展示
- [x] 文件导出 xml 至本地
- [x] 文件导入至编辑区
- [x] 文件新建
- [ ]保存至服务器 xml
- [ ]服务器拉取 xml

脱机:
新建
打开
下载
联机:
云存储
云拉取

## 云存储

- 将 xml 转为 text，以 base64 形式传入服务器
- 需对该操作进行以下判断:用户登入状态、用户联网状态
- 每个文件需有文件名。

## 云拉取

- 点击打开云存储的列表

### 相关扩展功能

- 文件存储列表管理[删除]
