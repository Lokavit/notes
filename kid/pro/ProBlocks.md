## KID-PRO 完整版 Blocks 积木

```bash
# 2020.07.10
https://github.com/LLK/scratch-blocks.git

npm install # 装载依赖
npm link # 开启链接
# 有所更改后，执行重新编译
npm run prepublish
# 查看效果test文件夹下，直接浏览器打开
```

## 依赖变更

```bash
# 移除的依赖
graceful-fs json rimraf scratch-l10n gh-pages
selenium-webdriver transifex travis-after-all
uglifyjs-webpack-plugin async chromedriver
copy-webpack-plugin eslint event-stream glob

# 更新的依赖
webpack webpack-cli
```

## 改变库名 2020.07.10

- 为了方便将库映射全局，相互不冲突

---

## 常见错误及解决方案 2020.07.10

- 'python'不是内部或外部命令……
  > **解决**:装 python2.7,配置环境变量(系统 PATH 指定 python27，以及指定 python/script)，重启 vscode

```
C:\Python27
C:\Python27\Scripts
```

- python 文件编译错误

```bash
# 错误代码如下：
Traceback (most recent call last):
  File "build.py", line 574, in <module>
    test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
  File "C:\Python27\lib\subprocess.py", line 394, in __init__
    errread, errwrite)
  File "C:\Python27\lib\subprocess.py", line 644, in _execute_child
    startupinfo)
WindowsError: [Error 2]

# 解决方式 https://github.com/LLK/scratch-blocks/issues/1620
build.py文件约 331行 代码替换
      # proc = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
      outfile = open("dash_args.txt","w+")
      outfile.write("\n".join(args[11:]))
      outfile.close()
      args =  args[:11]
      args.extend(['--flagfile','dash_args.txt'])
      proc = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE, shell = True)

build.py文件约 579行 代码替换
    # test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    test_proc = subprocess.Popen(test_args, stdin=subprocess.PIPE, stdout=subprocess.PIPE,shell=True)
```

- 缺少 jdk 环境错误

```bash
Could not find "java" in your PATH.
Using remote compiler: closure-compiler.appspot.com ...

Error: Closure not found.  Read this:
  developers.google.com/blockly/guides/modify/web/closure

解决：装jdk8
环境变量 系统用户新建
变量名：JAVA_HOME
变量值：C:\Program Files\Java\jdk1.8.0_251
PATH追加：%JAVA_HOME%\bin，移动到顶部
```
