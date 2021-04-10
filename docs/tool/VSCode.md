# 配置文件

```json
// setting.json
{
  // git bash作为终端
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  // 隐藏右侧缩略图
  "editor.minimap.enabled": false,
  // 字体设置
  "editor.fontFamily": "'Source Code Pro', Consolas, 'Courier New', monospace"
}
```

# 常用插件

- **Auto Close Tag** :自动闭合 tag
- **Better TOML**:toml 文件支持。
- **Bracket Pair Colorizer**:着色匹配括号的可自定义扩展
- **Deno**:Deno 支持。
- **GitLens** : git 信息查看
- **Markdown Preview Github**:MD 文件预览
- **PHP Intelephense**:PHP 语言支持。
- **Prettier formatter**:代码格式化
- **Rust**:Rust 语言多插件集合。
- **vscode-fileheader**:文件头注释(js)

# 清除日志相关正则

```regexp
console\.log\(.*?\);
console\.warn\(.*?\);
```
