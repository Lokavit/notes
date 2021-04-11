<!--
title:Dir&File
dir:rust
-->

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
