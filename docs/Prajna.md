## 网站

- prajna：建站事记。记录整个网站从无到有的过程。
- web：所有前端相关技术栈。


- 服务架构(1)： 所有后端相关技术栈，及 Nodejs 相关
- 善事利器(1)：GIT、DEV、RIME 等
- 设计模式(1)：文章以模式区分，多语言同模式，放在一篇文章内。
- 算法结构(1)：技术点区分，其余同上。
- 小说名字(1)：完本进行分类。
- 衍生作品(1)：

- 前后端分离
- 文章.md 目前放在 notes 库下

- 后端技术栈
- - 数据库:MySQL
- - 反向代理:Nginx
- - API：PHP、Rust

- Rust
- - Rust 读取磁盘文本.md，打包为.wasm 使用 Deno 操作。
- - Rust 读取磁盘文本.md，

- PHP:
- - 操作数据库，CURD

#### 其它可行性(未尝试)

- 文章.md 文件依然保持在 notes 中，保证随时编辑。
- 使用 Rust 写一个程序。当 notes 更新时，对数据库进行 CURD 的对应操作
<!-- 
Rust程式，读取notes文件夹下所有.md文件。

将所有文章.md 文件，通过字符串拼接，渲染为.html 文件
将所有.html 文件，写入 ddsite/page 文件夹下。也就是将所有文章静态化
使用 Rust 直接写入。

使用 Rust 写一个 exe 程式。
每次启动该程式，通过按钮或命令：
检测 notes 文件夹下的.md 文件是否有更新？
如果有更新，则连接数据库，进行 CURD 操作。
以上，保证了 notes 文章即时同步到数据库。将 web 后端管理变为 exe
为防止数据丢失，每次 CURD 之后，将数据库结构及数据作为.sql 导出到某个地方

-->

### 项目结构

- client
- - article.html 用于显示正文。

- - src 一些输出页面效果的代码。有时需要结合 blog 文章看。
- - tool 工具箱。针对在线使用。
- - util 工具及库。针对代码

- index.html 由此测试服务器连接，成功则执行服务端+数据库，否则走静态
- - 左侧：文章分类、工具、实例。
- - 主体：文章列表。点击某一分类，改变主体内容为选择分类下的文章列表。
- - 点击非文章分类，或直接跳转对应页面，或改变主体内容。

- server 服务端代码(未来或许根据语言不同，写多个版本)

- 多端自适应布局。
- 默认请求服务端接口，如果请求失败，则执行本地 json 数据。

- 个人信息:后台配置=>数据库 I/O

- 分类:()内容为该分类下文章数量
- - 建站事记(5)：prajna 记录整个网站从无到有的过程。
- - 渲染交互(3)：web 所有前端相关技术栈，
- - 服务架构(1)： 所有后端相关技术栈，及 Nodejs 相关
- - 善事利器(1)：GIT、DEV、RIME 等
- - 设计模式(1)：文章以模式区分，多语言同模式，放在一篇文章内。
- - 算法结构(1)：技术点区分，其余同上。
- - 小说名字(1)：完本进行分类。
- - 衍生作品(1)：

- 文章:
- - 标题：
- - 内容：md 或 html
- - 更新日期：yyyy-mm-dd hh:mm:ss
- - 作者：也就是发布者，也就是本人名字。
- - 阅:pv。页面阅览次数
- - 曰:said。留言量
- - 所属:分类名。
- - 信息：版权及转载。(纯前端实现)

```js DB结构
/* 分类 */
const CATEGORY = [
  {
    id: 1,
    name: "建站事记",
  },
  {
    id: 2,
    name: "渲染交互",
  },
];

/* 文章索引 */
const ARTICLE_INDEX = [
  {
    id: 1, // 文章ID
    category_id: 1, // 文章所属分类，如此便于分类统计
    title: "标题1",
    time: "2021.04.04 11:11:11",
  },
  {
    id: 2,
    category_id: 2,
  },
];

// 每篇文章是一个js文件
const ARTICLE = {
  id: 1,
  content: "正文",
};

// 正文内容页伪代码
let _id = 1; // 点击时，传入的ID
// 加载该id对应的文章.js
```

- 评论：开放性+敏感和谐词库
- - 名字：留言者的名字(非必填)
- - 曰：留言内容(必填，1 字以上)。
  <!-- 评论列表的页面效果为：
  留言时间 xxx 曰：yyyy。
  留言时间 yyy 曰：xxxx。
   -->

- 后台管理网站
- - 登入。user 表
- - 系统信息：
- - 分类管理：增删改。
- - 文章管理：增删改。
- - - 添加:标题、内容、分类、发布/存稿
- - - 修改:点击某个文章，将其打开到编辑状态(也可以理解为添加文章的过程)，提交
- - - 删除:逻辑删除选中文章。
- - 网站配置：配置之后，前端生效。
- - 评论:逻辑删除。主要处理非法文字等。
- - 支持 MD 语法。

### 数据库

- 每次有大更改时，导出.sql(结构及数据)到 ddsite 下，作为备份。
- 实现功能：定时导出？或者一键导出？
- 每表皆有:id、push_time(只记录最后推送)
- 删除:state=0 为逻辑删除。其余状态皆在其后。(TINYINT)
- 以下 sql 写法为 Navicat 中 SQL 可执行的编写方式。
- VARCHAR(n)：n 为必填。1 汉字=1 字符。

```sql
-- 创建数据库 没有则创建 默认字符集 排序规则
CREATE DATABASE IF NOT EXISTS `ddsite` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- 使用该库
use `ddsite`;

-- 创建user表:用户表(通常只一人)用于登入后台
CREATE TABLE `dd_user` (
     -- 主键id 正整型 主键约束 自增 注释
	`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    -- Account(英文字符) 字符类型 唯一约束 非NULL 注释
    `account` VARCHAR ( 9 ) UNIQUE NOT NULL COMMENT '账户',
     -- 密码(md5加密八位) 非NULL 注释
	`pwd` CHAR ( 8 ) NOT NULL COMMENT '密码',
    -- 名字(站主) 字符类型 非NULL 注释
	`name` VARCHAR ( 6 ) NOT NULL COMMENT '名字',
    -- 账户状态 最小正整型  默认值1 (0禁用;1启用)(0-255)
	`state` TINYINT ( 1 ) UNSIGNED DEFAULT 1 NOT NULL COMMENT '帐号状态:0禁用;1启用;2超管',
    -- 创建时间 时间戳 默认值为当前时间戳 注释
	`ctime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '创建时间',
	-- 更新时间 时间戳 更新时，自动更新该字段值为当前时间
	`utime` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP() DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '更新时间'
);
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8; -- 设置存储引擎及编码(默认值可不写)

-- 插入数据 (注意需要key和value对应)
INSERT INTO `dd_user` ( `account`, `pwd`,`name`) VALUES ('dd', '12345678','帝谛');
-- -- 更新数据 (从user表中找到id=1的数据，将其name值改为111)
-- UPDATE `dd_user` SET `name`='111' WHERE `id`=1;


-- category:分类表 向前端输送的数据(id,name,quantity)其中q字段数据来自分类id
CREATE TABLE `dd_category`(
     -- 主键id 正整型 主键约束 自增 注释
	`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    -- 分类名 字符类型 非NULL
    `name` VARCHAR(6) NOT NULL COMMENT '分类名',
    -- 文章数量(0-65535) 非NULL 该值查询文章表对应分类id所得。 这一项可以查询文章表的指定分类id得出结果。
    `article_quantity` SMALLINT(1) UNSIGNED DEFAULT 0 NOT NULL COMMENT '文章数量',
    -- 账户状态 最小正整型  默认值1 (0禁用;1启用)(0-255)
	`state` TINYINT ( 1 ) UNSIGNED DEFAULT 1 NOT NULL COMMENT '分类状态:0隐藏;1显示',
    -- 创建时间 时间戳 默认值为当前时间戳 注释
	`ctime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '创建时间',
	-- 更新时间 时间戳 更新时，自动更新该字段值为当前时间
	`utime` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP() DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '更新时间'
);

-- 添加分类 插入数据 (注意需要key和value对应)
INSERT INTO `dd_category` ( `name`) VALUES ('建站事记');
-- 修改分类
UPDATE `dd_category` SET `name`='新值' WHERE `id`=1;
-- 移除分类
UPDATE `dd_category` SET `state`=0 WHERE `id`=1;

-- article:文章表
CREATE TABLE `dd_article`(
     -- 主键id 正整型 主键约束 自增 注释
	`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    -- 标题 字符长度 非NULL
    `title` VARCHAR(15) NOT NULL COMMENT '文章标题',
     -- 内容
    `content` VARCHAR(9999) NOT NULL COMMENT '文章内容',
    -- 分类ID
    `category_id` TINYINT ( 1 ) UNSIGNED NOT NULL COMMENT '分类ID',
    -- pv 阅读量
    `pv` INT DEFAULT 0 NOT NULL COMMENT 'pv值',
      -- 评论数量(0-65535)
    `comment_quantity` SMALLINT UNSIGNED DEFAULT 0 NOT NULL COMMENT '留言量',
    -- 文章状态 最小正整型  默认值1
	`state` TINYINT ( 1 ) UNSIGNED DEFAULT 1 NOT NULL COMMENT '文章状态:0删除;1发布;2存稿',
    -- 创建时间 时间戳 默认值为当前时间戳 注释
	`ctime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '创建时间',
	-- 更新时间 时间戳 更新时，自动更新该字段值为当前时间
	`utime` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP() DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '更新时间'
);

-- 文章发布 (文章标题，文章内容，文章所属分类ID)
INSERT INTO `dd_article` ( `title`,`content`,`category_id`,`state`)
    VALUES ('建站事记之一','文章内容：规划',1,1);
-- 文章存稿
INSERT INTO `dd_article` ( `title`,`content`,`category_id`,`state`)
    VALUES ('建站事记之一','文章内容：规划',1,2);

-- 更新数据 发布及存稿POST后需执行此语句
UPDATE `dd_category` SET `article_quantity`=`article_quantity`+1 WHERE `id`=1;

-- 修改文章

-- 移除文章
UPDATE `dd_article` SET `state`=0 WHERE `id`=1;
-- 转为草稿
UPDATE `dd_article` SET `state`=2 WHERE `id`=1;
-- 转为发布
UPDATE `dd_article` SET `state`=1 WHERE `id`=1;


-- 更新PV值 当GET指定文章ID时执行，并将对应文章ID传入此处ID。
UPDATE `dd_article` SET `pv`=`pv`+1 WHERE `id` =1;

-- comment:评论表
CREATE TABLE `dd_comment`(
     -- 主键id 正整型 主键约束 自增 注释
	`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
     -- 生成的游客ID(md5(ip+时间戳)) 字符长度 非NULL
    `visitor_id` CHAR(8) NOT NULL COMMENT '游客id',
    -- 留言者输入的昵称 最大六个字 默认值为'游客' 可NULL
    `visitor_name` VARCHAR(6) DEFAULT '游客' NOT NULL COMMENT '游客',
     -- 评论内容
    `content` VARCHAR(99)  NOT NULL COMMENT '评论内容',
     -- 文章ID
    `article_id` TINYINT ( 1 ) NOT NULL COMMENT '所评文章ID',
    -- 状态(0删除;1显示) 最小正整型  默认值1 (0禁用;1启用)(0-255)
    `state` TINYINT(1) UNSIGNED DEFAULT 1 NOT NULL COMMENT '状态0:隐藏;1:显示',
    -- 创建时间 时间戳 默认值为当前时间戳 注释
	`ctime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() NOT NULL COMMENT '创建时间'
);

-- 发布留言 (访客ID,访客名，留言内容，所属文章ID)
INSERT INTO `dd_comment` ( `visitor_id`,`visitor_name`,`content`,`article_id`,`state`)
    VALUES ('87654321','某甲','已阅！',1,1);
INSERT INTO  ( `visitor_id`,`visitor_name`,`content`,`article_id`,`state`)
    VALUES ('14725836','某乙','！！！！阅！',1,0);
-- 更新留言量 当POST留言成功时执行，并将对应文章ID传入此处ID。
UPDATE `dd_article` SET `comment_quantity`=`comment_quantity`+1 WHERE `id` =1;

-- 和谐留言 留言表 状态值=0 条件(符合id的留言)
UPDATE `dd_comment` SET `state`=0 WHERE `id` =1;


-- log:日志表 记录一些操作(登入和某些状态值的改变)
CREATE TABLE `dd_log`(
     -- 主键id 正整型 主键约束 自增 注释
	`id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    `ip` VARCHAR(15) NOT NULL COMMENT '操作时的IP',
    `os` VARCHAR(15) NOT NULL COMMENT '操作时的系统',
    `browser` VARCHAR(15) NOT NULL COMMENT '操作时的浏览器',
    `content` VARCHAR(60)  NOT NULL COMMENT '具体操作',
    -- 创建时间 时间戳 默认值为当前时间戳 注释
	`ctime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT '操作时间',
);
-- 操作记录 (访客ID,访客名，留言内容，所属文章ID)
INSERT INTO `dd_log` ( `ip`,`os`,`browser`,`content`)
    VALUES ('127.0.0.1','win10','EDGE','登入');
```
