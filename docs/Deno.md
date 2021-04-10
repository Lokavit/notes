# Deno

- 下载官方 exe 放在 dev/deno 目录下
- 环境变量`DENO_DIR`下载的依赖和编译生成的文件
- vscode 装载Deno插件，并且设置`deno.enable`为启用。

```bash
# 注:官网诸多装载方式，唯有exe可行。
# 若需要本地缓存，执行以下命令。缓存指定库。
deno cache https://deno.land/std/http/server.ts
# cd到.ts所在目录，执行以下命令
# # --allow-read：允许读取磁盘文件
# # --allow-net:允许访问网路
# # --allow-env:读取环境变量
deno run --allow-read --allow-net --allow-env main.ts
# url:http://localhost:8080/
```
