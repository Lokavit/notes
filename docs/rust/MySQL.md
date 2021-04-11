<!--
title:MySQL
dir:rust
-->

# diesel

- [主流操作数据库](https://diesel.rs/)
- `cargo.toml`中添加`mysql = "*"`

```rust
use mysql::*;
use mysql::prelude::Queryable;
use crate::chrono::NaiveDate;

// user结构体
struct User {
    id:u64,
    firstname:String,
    lastname:String,
    phone:String,
    reg_date:NaiveDate,
}

// 获取mysql连接
 fn main(){
    let url = "mysql://root:****@localhost:3306/demo";
    let pool = Pool::new(url).unwrap(); // 获取连接池
    let mut conn = pool.get_conn().unwrap();// 获取链接
    let res = &mut conn.query_map(
        "select * from user",
        |(id,firstname,lastname,phone,reg_date)|User{
            id:id,
            firstname:firstname,
            lastname:lastname,
            phone:phone,
            reg_date:reg_date
        },
    ).expect("Query failed.");

    for i in res {
        println!(
            "{},{},{},{},{:?}",
            i.id,i.firstname,i.lastname,i.phone,i.reg_date
        )
    }
}
```
