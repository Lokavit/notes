- centOS 8

## Xshell 家庭免费版

- 新建会话，链接到远程云服务器

```
# 安装宝塔 Centos安装脚本
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

## 更改宝塔端口 8888 操作步骤

- 官网-控制台-云服务器-服务器详情-安全组-添加规则-「入方向-TCP-8888」-确定-更改安全组

## 环境安装

- 编译安装以下：mysql5.7.34、Nginx1.20.1、php7.4

## 建站

- 网站管理 - 添加站点
- - 域名:xx.com:88 **不能使用 80 端口**
- - 数据库:MySQL utf8mb4
- - 数据库账密:创建时构建对应数据库
- - PHP 版本:7.4
- 文件
- - 上传 - 解压到`根目录/www/wwwroot/xx.com/`下
- - 更改站点目录`/config/database.php` 中数据库账密
- 数据库：包里的`data.sql` 导入数据库
- 网站 - 设置
- - 网站目录:运行目录(需指定)`/public` - 保存
- - 伪静态:thinkphp - 保存

## 问题排查

- php7.4 安装状态出现红色，卸载重装
- 登入账密错误:
- - app/admin/controller/Login.php 注释密码
- - 登入成功后，解除注释，并由面板中更改密码，退出重登做测试。
- vueadmin配置后，一堆杂问题
```js
// ui/vue.config.js 添加及修改如下
publicPath:'/dist/', // 公共资源指向/dist/
outputDir: '../public/dist', // 输出目录指向php项目的public/dist

// ui/src/api/request.js 改API请求地址
axios.defaults.baseURL = 'http://a.dd.ifncloud.com:88/admin';

// 缓存Token 跳转
```


## 安卓系统
- 下载Android x86安装镜像、下载并安装UltraISO软件
在菜单栏依次点击【文件】->【打开】，选择刚才下载好的安卓x86安装镜像。
镜像打开后，在菜单栏依次点击【启动】->【写入硬盘映像】检查硬盘驱动器是否是刚才插入的U盘，写入方式选择“USE-HDD+”，然后点击【写入】按钮。
镜像写入完成后，不要拔U盘，重新启动电脑。参照屏幕提示按F12/ESC等(留意屏幕提示或翻阅说明书)启动菜单键，进入Boot Menu，选择U盘启动
安装选择含有(harddisk)字样的选项，然后选择「Yes」