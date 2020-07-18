# KID-Block 积木库

`pro版及jr版，分别输出单文件。`

# 需求

- 积木块
- 生成多语言代码

## 文件入口

- 分为 jr 和 pro 两版
- 每版又有纵横两版布局

# Blockly 多个二开版本比较
- 经过比较，采用pxt-blockly为基础版本

<!-- ## google/blockly
- google 出品，对 windows 兼容不好，难编译。
## @code-dot-org/blockly
- 使用了 good 的 js 库中一些工具 -->

## pxt-blockly

- microsoft 出品，修复大量 Edge 下的问题，并附带一系列pxt扩展

```bash
# 通过以下方式，可以直接编译成功该项目
git clone https://github.com/Microsoft/pxt-blockly
cd pxt-blockly
npm install .
npm run build:core --closure-library
```
