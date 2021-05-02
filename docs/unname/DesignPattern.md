## Command

```html
<body>
  <h3>通常用于业务出现了回退重做的需求</h3>
  <button id="btn1">BTN-1</button>
  <button id="btn3">BTN-3</button>
  <button id="btn5">BTN-5</button>
  <script>
    let btn1 = document.getElementById("btn1");
    let btn3 = document.getElementById("btn3");
    let btn5 = document.getElementById("btn5");

    // 负责向按钮装载命令
    let setCommand = function (button, command) {
      button.onclick = function () {
        command.execute();
      };
    };

    let menuBar = {
      refresh: function () {
        console.log("刷新！");
      },
    };

    let subMenu = {
      add: function () {
        console.log("增加！");
      },
      del: function () {
        console.log("删除！");
      },
    };

    /* receiver:接收者 */
    let RefreshMenuBarCommand = function (receiver) {
      this.receiver = receiver;
    };
    RefreshMenuBarCommand.prototype.execute = function () {
      this.receiver.refresh();
    };

    let AddSubMenuCommand = function (receiver) {
      this.receiver = receiver;
    };
    AddSubMenuCommand.prototype.execute = function () {
      this.receiver.add();
    };

    let DelSubMenuCommand = function (receiver) {
      this.receiver = receiver;
    };
    DelSubMenuCommand.prototype.execute = function () {
      this.receiver.del();
    };

    let refreshMenuBarCommand = new RefreshMenuBarCommand(menuBar);
    let addSubMenuCommand = new AddSubMenuCommand(subMenu);
    let delSubMenuCommand = new DelSubMenuCommand(subMenu);

    setCommand(btn1, refreshMenuBarCommand);
    setCommand(btn3, addSubMenuCommand);
    setCommand(btn5, delSubMenuCommand);
  </script>
</body>
```
