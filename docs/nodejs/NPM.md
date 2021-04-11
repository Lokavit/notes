<!--
title:NPM
dir:nodejs
-->

`Node Version Manager（Node 版本管理器）`

- [下载 nvm 包 exe 版本](https://github.com/coreybutler/nvm-windows/releases)
- 设置装载路径`C:\dev`
- 设置`nodejs`文件夹路径`C:\dev\nodejs`

```bash
# C:\dev\nvm\settings.txt
root: C:\dev\nvm  # nvm.exe所在目录
path: C:\dev\nodejs # 存放指向node版本的快捷方式，使用nvm的过程中会自动生成。一般写的时候与nvm同级。
# 以上为原有内容，在后面追加以下内容：
arch: 64  # 当前操作系统位数
proxy: none # 代理
node_mirror: http://npm.taobao.org/mirrors/node/ #淘宝镜像
npm_mirror: https://npm.taobao.org/mirrors/npm/ #淘宝镜像
```

```bash
# 查看电脑环境变量，会看到如下信息：
NVM_HOME	    C:\dev\nvm
NVM_SYMLINK    C:\dev\nodejs
PATH    追加    %NVM_HOME%;%NVM_SYMLINK%
```

# 装载 nodejs

`可装载多个版本`

```bash
nvm # 会显示版本号，及一堆命令，表示成功
nvm install  <version> # 装载node，指定版本号
nvm install latest # 装载nodejs的最新版本
nvm use 10.12.0  # 使用nodejs的10.12.0版本
Now using node v10.12.0 (64-bit)  # 设置成功
node -v  # 查看nodejs的当前版本 v10.12.0
npm -v  # 查看npm的当前版本 6.4.1
```

# 常用操作命令

```bash
# ===== npm link ===== #
cd scratch-vm # 以该库为例
npm link # 将以上项目link到全局
# 在需要用到该库的项目根目录下，如：
cd scratch-gui
npm link scratch-vm # 将库链接到此项目

# ===== npm update ===== #
npm outdated # 查看包版本信息
# 更新本地 package
npm update <package-name>
npm update # 更新所有

# ===== npm -g 较少使用，通常为装载带命令的cli等 ===== #
npm install -g <package> # 装载全局包命令
npm update -g <package> # 更新全局装载的包
npm update -g # 更新所有全局包
npm uninstall -g <package> # 卸载全局装载的包

# ===== npm 按需装载 项目中操作 ===== #
npm install <package_name> # 通常以下后缀择其一
npm install --save  # 用于生产环境的安装包
npm install --save-dev  # 用于开发环境的安装包
# -S, --save: dependencies. 生产依赖
# -D, --save-dev: devDependencies. 开发依赖
# -O, --save-optional: optionalDependencies.可选依赖

# ===== npm 发布包 ===== #
# 设置npm镜像
npm config set registry http://registry.npmjs.org
npm login # 登入命令，输入帐号密码邮箱
# 登入成功
Logged in as 用户名 on http://registry.npmjs.org/.
npm publish # 将npm包发布带npm上
npm logout # 登出
# 设置回淘宝镜像
npm config set registry https://registry.npm.taobao.org
npm config get registry # 查看当前镜像

# ===== npm 删除包 ===== #
npm unpublish --force # 强制删除
npm unpublish react-rupa@1.0.1 # 指定版本号
npm deprecate # 某些情况

# ===== npm 发布包 其它相关 ===== #
touch .gitignore # 提交到github的过滤文件
touch .npmignore # 提交到npm的过滤文件
```
