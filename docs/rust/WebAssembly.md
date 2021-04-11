<!--
title:WebAssembly
dir:rust
-->

- [MDN 编译 Rust 为 WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm)

# WebAssembly & Deno

- `rust`代码编译为`wasm`在`deno`中使用

```bash
# 获取用于生成TS/JS适配器文件的CLI工具
cargo install wasm-bindgen-cli
```

```toml
[dependencies]
rand = "0.8.3"
# 该引用表明，wasm文件的getrandom正在js下运行，需使用js接口。无此句则wasm无法创建随机数
getrandom = { version = "0.2", features = ["js"] }
wasm-bindgen = "0.2.70" wasm与js交互库

[lib]
name = "wisesayings"
# 告知rust编译器创建一个没有启动函数的wasm二进制文件。
# 编译器创建动态库(win.dll，linux.so，macos.dylib)
# 由于部署单元为wasm，因此编译器创建.wasm文件(如:wisesayings.wasm)
crate-type =["cdylib", "lib"]
```

```rust
/* src/lib.rs */
use wasm_bindgen::prelude::*;

#[wasm_bindgen] // 指示编译器该代码的目标是wasm文件

pub fn get_wise_saying() -> String {
    // 使用宏命令。从磁盘中获取文件，并将数据加载到内存中
    let str = include_str!("1.md");
    return str.to_string(); // 返回字符串
}

/* src/main.rs */
use wisesayings::get_wise_saying;

fn main() -> std::io::Result<()> {
    let str = get_wise_saying();
    println!("{}", str);
    Ok(())
}
```

```bash
# 将源代码编译为wasm
# # --lib指针对./lib目录中的源代码构建库
# # --target 指明使用编译器，并将构建工件及wasm文件存储到该目录下
cargo build --lib --target wasm32-unknown-unknown
# 此处如果报错 error[E0463]: can't find crate for core|  = note: the "wasm32-unknown-unknown" target may not be ins。
# 解决以上报错问题。将WASM目标添加到Rust工具链
rustup target add wasm32-unknown-unknown
# 重新执行 源代码编译为wasm

# Rust目标三重命名约定：ARCH-VENDOR-SYS-ABI
# # ARCH:预期目标体系结构。如用于wasm文件的wasm32，用于intel芯片的i686
# # VENDOR:发布目标的供应商。如:Nvidai、Apple
# # SYS:操作系统。如:Windows、Linux
# # ABI:指明过程如何启动。
# # # wasm32-unknown-unknown指明是一个操作系统及ABI未知的二进制文件
```

- 使用 Deno 部署二进制文件服务器端

```bash
# wasm-bindgen 创建适配器文件和特殊wasm的命令
# --out-dir ./server 创建的适配器文件存储位置选项
# 其余部分为指示适配器文件针对Deno的选项，以及表示原始wasm文件的位置
wasm-bindgen --target deno ./target/wasm32-unknown-unknown/debug/wisesayings.wasm --out-dir ./server
# server 中可见生成的文件清单。`xxx_bg.wasm`为 bindgen 缩写
# # wisesayings_bg.wasm
# # wisesayings_bg.wasm.d.ts
# # wisesayings.d.ts
# # wisesayings.js
```

```ts
/* server/main.ts */
import { serve } from "https://deno.land/std/http/server.ts";
import { get_wise_saying } from "./wisesayings.js";

const env = Deno.env.toObject();

let port = 8080;
if (env.WISESAYING_PORT) {
  port = Number(env.WISESAYING_PORT);
}

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(
  `HTTP webserver running at ${new Date()}.  Access it at:  http://localhost:${port}/`
);

for await (const request of server) {
  const saying = get_wise_saying();
  // 乱码，但如果是给前端，则不会有乱码问题。
  request.respond({ status: 200, body: JSON.stringify({ data: saying }) });
}
```

```bash
# cd到server目录下 执行以下命令
deno run --allow-read --allow-net --allow-env main.ts
# # --allow-read：允许读取磁盘文件
# # --allow-net:允许访问网路
# # --allow-env:读取环境变量
```

- 前端 fetch 请求并渲染到页面

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>前端</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  </head>

  <body>
    <article></article>
    <script>
      // 测试连接Deno服务器，并读取返回的数据
      async function getContent() {
        const res = await fetch(`http://localhost:8080/`);
        const result = await res.json();
        console.warn("result:", result);
        document.querySelector("article").innerHTML = marked(result.data);
      }
      getContent();
    </script>
  </body>
</html>
```
