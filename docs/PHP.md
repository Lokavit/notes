## Nginx 安装及配置

```bash
# cd 到 nginx-1.19.8
start nginx # 启动 浏览器输入 http://127.0.0.1/
# 运行tasklist命令行实用工具以查看nginx进程
tasklist /fi "imagename eq nginx.exe"
# 结果中的两个进程 ，一个是主进程，一个是工作进程
# Image Name映像名     PID Session Name会话名 Session# Mem Usage内存使用
# =============== ======== ============== ========== ============
# nginx.exe            936 Console                12      2 780 K
# nginx.exe          15456 Console                12      3 112 K
nginx -s stop  # 停止(如果有未处理的数据,丢弃)
nginx -s quit  # 退出(如果有未处理的数据,等待处理完成之后停止)
nginx -s reload # 重新加载更改的配置，以新配置启动新工作进程，正常关闭旧工作进程
nginx -s reopen # 重新打开日志文件
```

- 对 Nginx 做配置

```bash
# nginx/conf/nginx.conf
# 变更以下，使其指向项目目录及index页面
        location / {
            # root   html; 这里换做网站的路径
            root   D:/GIT/phpdemo;
            # index  index.html index.htm; 这里添加index.php
            index  index.html index.htm index.php;
        }
# 变更以下，使其支持PHP
        location ~ \.php$ {
        #    root           html;
           root           D:/GIT/phpdemo;
           fastcgi_pass   127.0.0.1:9000;
           fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
           include        fastcgi_params;
        }
```

## PHP 安装及配置
- 修改php.ini

```bash
# 先启动 Nginx 再直行以下
php-cgi.exe -b 127.0.0.1:9000-c
# 浏览器输入:127.0.0.1
```

```php
extension_dir = "C:\dev\php\8.0.3-nts\ext"
date.timezone = "Asia/Shanghai"
enable_dl = On
cgi.force_redirect = 0
fastcgi.impersonate = 1
cgi.rfc2616_headers = 1
extension=curl
extension=fileinfo
extension=mbstring
extension=mysqli
extension=openssl
extension=pdo_mysql
```

db.conf.php里面定义数据库相关常量(域名、端口、用户名、密码、数据库名)
db.php 引入以上文件，实现基本数据库操作(连接数据库、销毁数据库、设置编码、CURD)
model.php 实体类。引入上一步文件(介于实体类与数据库表之间的存在)
controller.php 控制层。引入实体。

Router/Router.php 路由类。路由函数，根据路由中包含的控制器名做一些处理(调用哪些控制器.php)
数据表=(映射)=>实体类.php。对实体类的一些操作(CURD)。通常用在对应控制器.php中
