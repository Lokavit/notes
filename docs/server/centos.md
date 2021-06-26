- centOS 8

## Xshell 家庭免费版
- 新建会话，链接到远程云服务器

```
# 安装宝塔 Centos安装脚本 
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

## 更改宝塔端口8888 操作步骤
- 官网-控制台-云服务器-服务器详情-安全组-添加规则-「入方向-TCP-8888」-确定-更改安全组

## 环境安装
- mysql、Nginx、php

## 建站
- 网站管理 - 添加站点
- - 域名:xx.com
- - 数据库:MySQL utf8mb4
- - 数据库账密:创建时构建对应数据库
- - PHP版本:7.4
- 创建成功 - 设置 
- - 伪静态:thinkphp
- - 网站目录:运行目录(需指定)
- 根目录/www/wwwroot/xx.com
**不能使用80端口**
```
