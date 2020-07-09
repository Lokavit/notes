# scratch-dev

- 提交至远程仓库时，删除每个主文件夹中的.git 文件夹

```bash
scratch-blocks：代码积木块 

scratch-paint：绘图拓展 
scratch-render：舞台渲染，在舞台区域出现的基于 WebGL 的处理器。 
scratch-storage：作品存储加载 
scratch-svg-renderer：svg 处理 
scratch-vm：虚拟机，管理状态并执行业务逻辑。
```
```bash
# scratch-audio：声音拓展 
$ git clone https://github.com/LLK/scratch-audio.git
$ npm install
$ npm test
```

```bash
# scratch-l10n：国际化  
$ git clone https://github.com/LLK/scratch-l10n.git
$ npm install
$ npm test
# 通常以该方式，装载进所需项目
$ npm install -D scratch-l10n
```


## 本地开发环境搭建

```bash
git clone https://github.com/llk/scratch-vm # 主程序状态的虚拟机
git clone https://github.com/llk/scratch-blocks # 主积木块相关
git clone https://github.com/llk/scratch-gui # 主界面显示相关
cd scratch-vm # 进入vm主文件夹
npm install # 装载依赖
npm link # 开启链接
cd ../scratch-blocks # 进入积木块主文件夹
npm install # 装载依赖
npm link # 开启链接
cd ../scratch-gui # 进入渲染界面相关主文件夹
npm install # 装载依赖
npm link scratch-vm scratch-blocks # 开启链接到另外两个主文件夹
npm start # 启动服务
http://localhost:8601

# 注: 直接预览更改效果，执行以下命令
cd scratch-vm # 进入vm主文件夹
npm start # 启动服务
http://localhost:8073/playground/

# 注:每次更改积木块的文件，需执行以下命令
cd scratch-blocks # 进入积木块主文件夹
npm run prepublish # 重新编译
# 注：积木块重新编译后，需再次执行以下命令
npm link scratch-vm scratch-blocks # 开启链接到另外两个主文件夹
npm start # 启动服务

```

## 安装报错及解决方案

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
