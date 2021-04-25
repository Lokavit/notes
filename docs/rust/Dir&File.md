<!--
title:Dir&File
dir:rust
-->

- 写入文件到指定目录

```rust
use std::env;
use std::fs;

// 引入读取目录或文件的模块
pub mod dir_file;

fn main() {
  // --snip--
  // 获取指定文件夹下，指定文件

  // dir_file::read_dir_or_file(&String::from("./docs/"));
  // 假设以上返回所有文件信息，在此通过遍历，逐一读取文件
  let temp_filename = String::from("README.md");

  let contents = fs::read_to_string(&temp_filename).expect("Something went wrong reading the file");

  println!("With text:\n{}", contents);

  /* 参考字符串操作部分
    暂时简单拼接。之后采用读取templete.html模板文件的形式。
    通过对文本内容中标志字符串的处理
    如：将模板中的<!---->替换为读取到的.md文件内容。
    优点：免去符号转移，省去多段拼接的繁琐。
  */
  let temp = "<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>TEST</title>
    <script src='https://cdn.jsdelivr.net/npm/marked/marked.min.js'></script>
    <link rel='stylesheet'
      href='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css'>
<script src='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js'></script>
<script> hljs.highlightAll(); </script>
  </head>
  <body>
    <pre><code>"
    .to_string();

  let temp3 = "</code></pre>
    <article></article>
    <script>
      let code =document.querySelector('pre>code');
      let temp =code.innerHTML;
      document.body.removeChild(code.parentElement); // 读取成功，删除元素。
      document.querySelector('article').innerHTML = marked(temp);
    </script>
  </body>
</html>"
    .to_string();

  // 待写入文件的路径  目录/{文件名占位符}后缀名 切分文件名及后缀
  let temp_write_path = format!("client/view/{}.html", info_item(&temp_filename));
  // 待写入文件的文件内容
  let temp_write_file = format!("{}{}{}", temp, contents, temp3);
  // 文件写入到指定的地方
  fs::write(temp_write_path, temp_write_file).unwrap();
}

/**
 * 切分文件名及后缀名
 * use example:
 * info_item(&String::from("README.md"));
 */
fn info_item(s: &String) -> &str {
  let bytes = s.as_bytes();
  for (i, &item) in bytes.iter().enumerate() {
    if item == b'.' {
      return &s[0..i];
    }
  }
  &s[..]
}
```

- 读取指定路径下的目录或文件

```rust
/**
 * 读取指定path下的目录或文件
 * use example:
 * read_dir_or_file(&String::from("../../notes/docs/rust/"));
 * desc: 需use或者使用 std::io::Result<()>{
 */
use std::io::*;
fn read_dir_or_file(path: &String) -> Result<()> {
    for entry in fs::read_dir(&path)? {
        let dir = entry?;
        let metadata = dir.metadata()?;
        // 如果是文件夹，就继续执行
        if metadata.is_dir() {
            println!("目录:{:?}", dir);
            println!("路径:{:?}", dir.path());
            println!("目录名称:{:?}", dir.file_name()); // 目录或文件的名称
            println!("目录类型: {:?}", dir.file_type()); // 目录或文件的类型
            println!("目录元数据:{:?}", dir.metadata()); // 目录或文件的元数据
            println!("目录: {:?}", metadata.is_dir()); // 是否为目录
            let time = metadata.modified()?;
            println!("最后修改时间 格式化:{:?}", format_datetime(time));
        } else {
            println!("文件名称:{:?}", dir.file_name()); // 目录或文件的名称
            println!("文件类型: {:?}", dir.file_type()); // 目录或文件的类型
            println!("文件元数据:{:?}", dir.metadata()); // 目录或文件的元数据
            println!("目录: {:?}", metadata.is_dir()); // 是否为目录
                                                       //最后修改时间
            let time = metadata.modified()?;
            println!("最后修改时间 格式化:{:?}", format_datetime(time));
        }
    }
    Ok(())
}
```
