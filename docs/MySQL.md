

- win10 x64 8.0.23
https://dev.mysql.com/downloads/
MySQL Community Server -> Windows (x86, 64-bit), ZIP Archive
- zip 版解压安装报错如下

```
由于找不到vcruntime140_1 dll
没有VC库导致
为了解决该问题，使用msi版本安装，主要是为了装载dll库。
然后，卸载干净msi版本。继续操作zip版。

```
根目录下创建my.ini文件
```
[mysqld]
basedir=D:\mysql-8.0.23-winx64
datadir=D:\mysql-8.0.23-winx64\data\
port=3306
```

```bash
cd mysql-8.0.23-winx64\bin
# 初始化数据文件 成功之后mysql根目录下才会出现data文件夹
mysqld --initialize-insecure --user=mysql
mysqld --install # 未安装便安装，已安装会给出提示
net start mysql # 启动MYSQL
mysql -u root -p 
Enter password: # 输入初始化时生成的密码
# 修改root密码，Mysql8.0方式
ALTER user 'root'@'localhost' IDENTIFIED BY '新密码';
net stop mysql # 关闭mysql服务

##========= 以下方式用于出现问题时 ============##
# 绕过密码验证
mysqld --console --skip-grant-tables --shared-memory
# 另启一个CMD cd到bin下
net start mysql
# 使用无密码进入修改root密码
mysql -u root -p # 出现输入密码直接按ENTER
# 修改root密码，Mysql8.0方式
ALTER user 'root'@'localhost' IDENTIFIED BY '新密码';
flush privileges; # 刷新数据库
exit # 退出mysql管理界面
net stop mysql # 关闭mysql服务

# 重新启动MYSQL，测试帐密问题
net start mysql
mysql -u root -p
# 输入密码，显示连接成功。
```