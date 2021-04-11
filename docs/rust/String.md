<!--
title:String Operating
dir:rust
-->

- 通过内容字节组以指定字元进行分割并输出

```rust
/**
 * 根据文本内容中第一个>，
 * is_info:true 截取其之前所有内容为当前文本的信息。
 * is_info:false 截取其之后所有内容为当前文本的正文。
 * use example:
 * info_or_content(&temp, false);
 */
fn info_or_content(s: &String, is_info: bool) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b'>' {
            if is_info {
                // 截取文章信息
                return &s[0..i + 1];
            }
            // 截取正文
            return &s[i + 1..];
        }
    }
    &s[..]
}
let str = include_str!("test.md");
let temp = String::from(&str.to_string());

/**
 * 根据文本内容中第一个:切分并返回文章信息的每项属性值
 * use example:
 * info_item(&String::from("dir:rust"));
 */
fn info_item(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b':' {
            return &s[i + 1..];
        }
    }
    &s[..]
}
```
