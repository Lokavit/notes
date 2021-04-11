<!--
title:Basic Programming Language
dir:rust
-->

# struct 结构体

- 自定义数据类型。允许命名和包装多个相关的值，形成有意义的组合。
- 创建结构体实例。key 为字段名：value 为数据值。顺序无需一致。
- 元组结构体：即使类型相同，在函数中结构体类型的参数不能互通。

```rust
/*=========== 结构体使用示例 ==========*/
#[derive(Debug)] // 声明debug可以打印结构体。
/** 创建结构体 */
struct Rectangle {
    width: u32,
    height: u32,
}
// 将某个类型实例能做的事情都放入impl块中
impl Rectangle {
    // self指调用该方法的结构体实例
    // 使用&因只需读取结构体的数据，不需要写入(获取所有权)
    fn area(&self) -> u32 {
        self.width * self.height
    }
    // 关联函数。不以self作为参数的函数。不作用于结构体的实例。
    // 经常被用作返回一个结构体新实例的构造函数。
    // 接收一个维度参数
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
/**
 * 每个结构体允许有多个 impl块，但每个方法有其自己的impl块。
 * 此处只为有效示例，非最优写法。
 */
impl Rectangle {
    /**
     * 比较两个结构体实例的属性值。返回bool结果。
     * 参数一：&self，即已知的rect1也就是结构体实例化的变量
     * 参数二：结构体类型实例。即rect2或rect3
     */
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };
    // 打印结构体(结构形式输出)
    println!("{:#?}", rect1);
    // 方法语法。在结构体实例上调用其方法
    println!("{}", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
    // 使用结构体的关联函数，输入可见结果。wh皆为3
    println!("square:{:#?}", Rectangle::square(3));
}

/*=========== 元组结构体（tuple structs） ==========*/
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
let back = Color(0,0,0); // 黑色
let origin =Point(0,0,0); // 原点
// 以元组方式使用 字段.索引
println!("{}", back.1);
println!("{}", origin.1);

/*=========== 结构体基本使用 ==========*/
 // 声明debug可以打印结构体。只有结构、枚举类型可用
#[derive(Debug)]
/** 定义结构体 */
struct User {
    name: String,
    age: u64,
    active: bool,
}

fn main() {
    // 调用构建结构体函数，并传值
    let temp = build_user(String::from("dd"));
    // 打印结构体(单行形式输出)
    println!("{:?}", temp);
    // 打印结构体(结构形式输出)
    println!("{:#?}", temp);
    // 实例化结构体
    let user1 = User {
        name: String::from("aa"),
        age: 16,
        active: true,
    };
    // 实例化结构体
    let user3 = User {
        active: false,
        ..user1 // 结构体剩余值使用user1中的值
    };
    println!("{:?}", user3);
}
/** 构建结构体函数 传入参数，返回实例化的结构体 */
fn build_user(name: String) -> User {
    User {
        name,
        age: 15,
        active: true,
    }
}
```

# ownership 所有权

- 通过所有权系统管理内存
- clone():字符串克隆。
- Copy:整型、浮点、布尔、字元、元组(元素同类型)
- &:引用。允许使用值但不获取其所有权。默认禁止修改引用的值。
- 借用：获取引用作为函数参数。
- 可变引用：在特定作用域中的特定数据只能有一个可变引用。

```rust
/*=========== 字符串 slice .. range(范围) 语法 ==========*/
let s = String::from("hello");
let slice = &s[0..2];
let slice = &s[..2];
// 或者是如下写法
let s = String::from("hello");
let len = s.len();
let slice = &s[3..len];
// 如果 slice 包含 String 的最后一个字节，可以舍弃尾部的数字
let slice = &s[3..];
// 也可以同时舍弃这两个值来获取整个字符串的 slice
let slice = &s[..];

/*=========== 可变引用 作用域 ==========*/
let mut s = String::from("hello");
// 不可变 = 不可变引用
let r1 = &s; // 没问题
let r2 = &s; // 没问题
println!("{} and {}", r1, r2); // r1r2是不可变引用
// 此位置之后 r1 和 r2 不再使用。因为最后一次使用不可变引用在声明可变引用之前
let r3 = &mut s; // 没问题。
println!("{}", r3);

/*=========== 可变引用 ==========*/
fn main() {
    let mut s = String::from("hello");
    // &mut s 在作用域内只能用一次。
    change(&mut s);
}
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

/*=========== 引用与借用 ==========*/
fn main() {
    let s1 = String::from("hello");
    // 创建指针，指向s1的引用
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}
// s 是对 String 的引用，因无引用值所有权，s离开作用域，不会报错。
fn calculate_length(s: &String) -> usize { s.len() }

/*=========== 返回值与作用域 ==========*/
fn main() {
    let s1 = gives_ownership();         // gives_ownership 将返回值
                                        // 移给 s1
    let s2 = String::from("hello");     // s2 进入作用域
    let s3 = takes_and_gives_back(s2);  // s2 被移动到
                                        // takes_and_gives_back 中,
                                        // 它也将返回值移给 s3
} // 这里, s3 移出作用域并被丢弃。s2 也移出作用域，但已被移走，
  // 所以什么也不会发生。s1 移出作用域并被丢弃
fn gives_ownership() -> String {             // gives_ownership 将返回值移动给
                                             // 调用它的函数
    let some_string = String::from("hello"); // some_string 进入作用域.
    some_string                              // 返回 some_string 并移出给调用的函数
}
// takes_and_gives_back 将传入字符串并返回该值
fn takes_and_gives_back(a_string: String) -> String { // a_string 进入作用域
    a_string  // 返回 a_string 并移出给调用的函数
}

/*=========== 所有权与函数 ==========*/
fn main(){
    let s = String::from("hello");  // s 进入作用域
    takes_ownership(s);             // s 的值移动到函数里 ...
    //在此处使用s，会有编译错误      // ... 所以到这里不再有效
    let x = 5;                      // x 进入作用域
    makes_copy(x);                  // x 应该移动函数里，
                                    // 但 i32 是 Copy 的，所以在后面可继续使用 x
}// 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
  // 所以不会有特殊操作

fn takes_ownership(some_string: String) { // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

fn makes_copy(some_integer: i32) { // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer 移出作用域。不会有特殊操作

/*=========== 移动与克隆 ==========*/
let s1 = String::from("hello");
let s2 = s1; // 此处 s1被移动，s1不再有效。
let s2 = s1.clone(); // 克隆。s1,s2皆有效。
println!("s1 = {}, s2 = {}", s1, s2);
```

# 控制流

- if:多个`if else if`最好使用`match`
- loop:重复执行。`break`停止循环
- while 条件循环。慢！因编译器增加运行时代码对每次循环的每个元素进行条件检查。
- for 遍历集合。最常用。

```rust
/*=========== 控制流 使用 for 遍历集合 ==========*/
let a = [10, 20, 30, 40, 50];
for element in a.iter() { println!("the value is: {}", element); }

// 倒计时
for number in (1..4).rev() { println!("{}!", number); }
println!("LIFTOFF!!!");

/*========= 控制流 while 条件循环 =============*/
let a = [10, 20, 30, 40, 50];
let mut index = 0;
while index < 5 {
    println!("the value is: {}", a[index]);
    // 每次执行，index值增1
    index = index + 1;
}

/*============ 控制流 loop 重复执行 ==========*/
let mut counter = 0;
// 最终值为20
let result = loop {
    counter += 1; // 每次+1
    // 若加到10，返回时将10*2
    if counter == 10 { break counter * 2; }
};

/*============ 控制流 if 表达式 ===============*/
let num = 7;
if num<5 {
    println!("The value: {}",num);
}else {
    println!("value of x is: {}",num);
}

// let语句中使用if
let condition = true;
// true为5，false为6 数据类型必须相同
let number = if condition {5}else{6};
```

# 函数

- 函数名`fn test_demo(){}`
- 函数参数需指定类型`fn test_demo(x:i32,y:i32){}`

```rust
// 具有返回值的函数
fn five() -> i32 {5}
// 具有参数与返回值的函数
fn plus_one(x: i32) -> i32 { x + 1 }
fn main(){
    // 表达式 y=4
    let y = {
        let x = 3;
        x + 1 // 注意，表达式结尾没有分号
    };
    let x = five(); // 5
    let z = plus_one(5); // 6
    println!("The value of x is: {},{},{}",y, x,z);
}
```

# 数据类型

- 标量类型
- - 整数:i/u(±/+)bit(8/16/32/64/128)通常用 i32
- - 浮点:f32/f64(单精度浮点/倍精度浮点)。默认 f64
- - 布尔、字元:('char')
- 复合类型
- - tuples:元组.元素类型可不同，可单独指定。
- - arrays:数组.每个元素类型必须相同。长度固定不可增减。

```rust
// let 预设不可变。加mut修饰符后，可变。
let test =5; // 不可变
let mut testt =5; // 可变
// 常量
const MAX_POINTS: u32 =100_000;

// 隐藏。用let关键字重复生命相同变量名，隐藏变量值。
let x =5;
let x =x+1;
let x = x*2;
println!("x的数值为:{}",x); // 12。即(5+1)*2

let spaces ="   "; // 此处不可加mut修饰(类型不同)。
let spaces = spaces.len();
println!("{}",spaces); // 3。

// 布尔
let t = true;
let f: bool = false; // 型別詮釋的方式

// 元组。为每个元素指定类型
let tup: (i32, f64, u8) = (500, 6.4, 1);
// 解构写法
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
println!("The value of y is: {}", y);
// 索引访问形式
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;

// 数组
let a = [1, 2, 3, 4, 5];
// 另一种写法
let a: [i32; 5] = [1, 2, 3, 4, 5];
// let a = [3; 5]; 等价于 let a = [3, 3, 3, 3, 3];
// 访问数组元素
let a = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[1];
```

# demo game

- 随机 1-100 之间的数字，根据用户输入，反馈两者之间的比较结果

```rust
use std::io; // i/o库
use rand::Rng; // 随机数库
use std::cmp::Ordering; // 实现数字比较所需

fn main(){
    // 字符串显示在屏幕
    println!("请猜测一个数字");
    // 通常是最方便的随机性来源
    let rand_number = rand::thread_rng().gen_range(1,101);
    println!("随机数:{}",rand_number);
    // 程式循坏执行
    loop {
        println!("请输入一个数字");
        // 可变变量 = String类型 静态方法 。即新的空String实例赋值给guess变量
        let mut  guess = String::new();
        // io模组 调用 stdin函数
        io::stdin()
            // 调用函数，获取用户输入。放置到guess中
            .read_line(&mut guess)
            .expect("读取改行失败");
        // 将输入内容转为数字。此写法会在输入非数字是，终止程式。
        // let guess: u32 = guess.trim().parse().expect("請輸入一個數字！");
        // 将输入内容转为数字。 注意match
        let guess: u32 = match guess.trim().parse() {
            Ok(num)=>num, // 转换成功
            Err(_)=>continue, // 转换失败
        };
        println!("猜测的数字：{}",guess);

        // 比较随机数即输入数
        match guess.cmp(&rand_number){
            Ordering::Less => println!("{}<{}",guess,rand_number),
            Ordering::Greater => println!("{}>{}",guess,rand_number),
            Ordering::Equal =>{
                println!("{}={}",guess,rand_number);
                break; // 如果两个数值相等，则停止循环。
            }
        }
    }
}
```

# 常用命令

```bash
rustc --version # rustc 1.51.0
rustup update # 更新
rustup self uninstall # 卸载。
rustup install nightly # 安装当前 rust 版本的其他 toolchain
rustup update nightly # 更新当前 rust 版本的 toolchain
rustup doc # 打开本地文档

# Cargo：Rust的构建与套件管理工具
cargo --version # cargo 1.51.0
cargo install <libname> # 装载库(name库名)
cargo build # 通过Cargo.toml中的环境设置装载所需库
cargo run # 构建程式
cargo doc # 查看文档。如下示例
cargo doc --open # pull并在浏览器打开文档，可进行相关函数查阅。
cargo new <name> # 创建项目
```

# 环境及配置

- [rust-init.exe](https://www.rust-lang.org/)
- [Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)

> 打开装载程式，会检测系统环境，若提示缺少 vs c++组件，则必须先装载组件。从 vs2019 的装载工具中，选在以下单组件`MSVC v142 -VS 2019 C++ x64/x86 生成工具(最新版)`、`Windows 10 SDK (最新版)` **没有这项会在`cargo build`时报`link.exe`错误**

- 启动`rust-init.exe`，环境检测中可见`x86_64-pc-windows-msvc`

```bash
# 程式默认装载于users文件夹下，可根据提示添加对应环境变量，改变装载路径于dev下
RUSTUP_HOME: dev/rustup # 存储工具链和配置文件
CARGO_HOME: dev/cargo # 存储cargo的缓存

# 在dev/cargo/修改或创建config文件，输入以下代码(内网镜像源)
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```
