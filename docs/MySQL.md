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

根目录下创建 my.ini 文件

```ini
[mysqld]
# 设置mysql的安装目录
basedir= C:\dev\mysql\8.0.23
# 设置mysql数据库的数据的存放目录
datadir= C:\dev\mysql\8.0.23\data
# 设置3306端口
port = 3306
```

```bash
cd mysql-8.0.23-winx64\bin
# 初始化 此时会在根目录下创建data文件夹
mysqld --initialize --console
# pwd: # 初始化时，生成的初始密码
mysqld --install # 装载 mysql
net start mysql #启动mysql
mysql -u root -p # 连接数据库
Enter password: # 输入初始化时的密码
# 此时已进入mysql命令模式。 更改新密码的mysql语句
ALTER USER USER() IDENTIFIED BY ‘NewPassword’;
quit; # 退出 MySQL
net stop mysql # 关闭服务
# 执行以下几句命令，测试更改密码是否生效
net start mysql
mysql -u root -p
Enter password: # 更改的新密码
```

### 常用命令

```sql
mysql -u root -p -- 登入
create database dbname; -- 创建数据库
drop database dbname; -- 删除数据库
use dbname -- 打开数据库
-- create table user(); -- 创建数据库表
desc user; -- 查看数据表
-- insert into user values(1,'satya','13163108231');
```
