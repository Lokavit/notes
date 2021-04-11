<!--
title:DateTime
dir:rust
-->

- 日期时间处理相关

### 时间戳格式化为日期时间(暂未实现)

```rs
/**
 * 尝试自己写个时间戳转人类易读
 * use example:
 * format_data_time(SystemTime::now());
 */
fn format_data_time(time: SystemTime) {
    println!("测试传入值{:?}", time);
    // 已知的Rust 1.0发布日期时间的毫秒值 2015-05-15T00:00:00 / 2015-05-15 08:00:00
    const DEFAULT_MILLIS_SINCE_EPOCH: u128 = 1431648000000;

    let difference = get_epoch_ms(time) - DEFAULT_MILLIS_SINCE_EPOCH;
    println!("测试 时间戳差值: {:?}", difference);

    // 186394645574  求出总秒 186394645.574
    let temp = difference as f64 / 1000 as f64;
    println!("测试 求出总秒: {:?}", temp);
    println!("测试 求出总分: {:?}", temp / 60.00);
    println!("测试 求出总小时: {:?}", temp / 60.00 / 60.00);
    println!("测试 求出总日: {:?}", temp / 86400.00);
    // println!("测试 求出总月: {:?}", temp);
    // println!("测试 求出总年: {:?}", temp);
    //    "这里是输出"
}
```

# use chrono

- 使用主流日期时间格式化库
- `Cargo.toml`文件加入库，执行`Cargo build`命令

```toml
[dependencies]
chrono = "0.4" # 时间格式化
```

```rs
/**
 * 格式化传入的SystemTime类型的日期时间
 * 返回格式化后的字符串
 * use example:
 * format_datetime(time); time为SystemTime类型数据
 */
extern crate chrono; // 外链库
use chrono::prelude::*; // 引入库
fn format_datetime(time: SystemTime) -> String {
    // 使用as 类型强转
    let dt: DateTime<Local> = Local.timestamp_millis(get_epoch_ms(time) as i64);
    // 格式化时间为人类易读格式: 2021-04-09 23:54:50
    dt.format("%Y-%m-%d %H:%M:%S").to_string()
}
```

# SystemTime To UNIX Timestamp

```rs
/**
 * 将传入的值转为 13位时间戳
 * SystemTime:参数类型
 * u128:返回值类型
 * use example:
 * get_epoch_ms(time)
*/
fn get_epoch_ms(time: SystemTime) -> u128 {
    // SystemTime::now() 系统当前时间
    time.duration_since(UNIX_EPOCH).unwrap().as_millis()
}
```

# Rust 1.8 SystemTime 处理

```rs
// 19位时间戳 转 10位时间戳
let temp = time.duration_since(UNIX_EPOCH).expect("时间倒退");
// 10位时间戳 转 13位时间戳
let in_ms = temp.as_secs() * 1000 + temp.subsec_nanos() as u64 / 1_000_000;
```
