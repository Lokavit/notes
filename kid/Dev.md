# KID-DEV

## 已更改的库

```bash
# 2020.07.11
https://github.com/LLK/scratch-svg-renderer.git

```

---

- 提交至远程仓库时，删除每个主文件夹中的.git 文件夹

```bash
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

# 注：积木块重新编译后，需再次执行以下命令
npm link scratch-vm scratch-blocks # 开启链接到另外两个主文件夹
npm start # 启动服务

```

## 安装报错及解决方案
