`CRUD下，找不到使用的不可替代性`

# API

```php
/* phpdemo\core\DB.php */
<?php

/** PDO
 * 数据对象（PDO） 扩展为PHP访问数据库定义了一个轻量级的一致接口
 * 不管使用哪种数据库，都可以用相同的函数（方法）来查询和获取数据
 */
class Database
{
    private static $_instance;
    private static $db;
    const DB_TYPE = 'mysql';
    const DB_HOST = 'localhost';
    const DB_NAME = 'phpdemo';
    const DB_USER = 'root';
    const DB_PWD = '';
    const DB_MS = self::DB_TYPE . ':host=' . self::DB_HOST . ';' . 'dbname=' . self::DB_NAME;

    /** 私有构造函数 禁止被实例化 */
    private function __construct()
    {
        try {
            self::$db = new PDO(self::DB_MS, self::DB_USER, self::DB_PWD);
            self::$db->query('set names utf8mb4');
            // 开启异常模式 将PDO错误模式设置为异常
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    /** 私有克隆对象 禁止被克隆 */
    private function __clone()
    {
    }

    /** 获取本类实例的唯一全局访问点 */
    public static function getInstance()
    {
        //判断$instance是否是Database类的对象 没有则创建
        if (!self::$_instance instanceof self) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * 使用PDO向数据库查询
     * @param  string $sql    需要准备的SQL查询
     * @param  array  $params 需要绑定的参数
     * @param  string $fetch  提取查询类型
     */
    public function query(string $sql, array $params = [], string $fetch = 'row')
    {
        // 返回PDOStatement对象，如果失败返回 FALSE 或抛出异常 PDOException
        $temp = self::$db->prepare($sql);

        if (!empty($params)) {
            foreach ($params as $item => $value) {
                // 绑定一个值到用作预处理的 SQL 语句中的对应命名占位符或问号占位符
                $temp->bindValue(':' . $item, $value);
            }
        }
        $temp->execute();

        return $this->$fetch($temp);
    }

    /**
     * 以行格式返回查询结果.
     * @param  object $stmt - SQL query statement.
     * @return array
     */
    public function row($stmt): array
    {
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * 以列格式返回查询结果. 如果结果不是一个字段，则返回第一个字段的值.
     * @param  object $stmt - SQL query statement.
     * @return void
     */
    public function column($stmt)
    {
        return $stmt->fetchColumn();
    }
}

/* phpdemo\util\statuses.php */
<?php
/** 可用的HTTP状态. */
return [
    100 => 'Continue',
    101 => 'Switching Protocols',
    200 => 'OK',
    201 => 'Created',
    202 => 'Accepted',
    203 => 'Non-Authoritative Information',
    204 => 'No Content',
    205 => 'Reset Content',
    206 => 'Partial Content',
    300 => 'Multiple Choices',
    301 => 'Moved Permanently',
    302 => 'Found',
    303 => 'See Other',
    304 => 'Not Modified',
    305 => 'Use Proxy',
    306 => '(Unused)',
    307 => 'Temporary Redirect',
    400 => 'Bad Request',
    401 => 'Unauthorized',
    402 => 'Payment Required',
    403 => 'Forbidden',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    406 => 'Not Acceptable',
    407 => 'Proxy Authentication Required',
    408 => 'Request Timeout',
    409 => 'Conflict',
    410 => 'Gone',
    411 => 'Length Required',
    412 => 'Precondition Failed',
    413 => 'Request Entity Too Large',
    414 => 'Request-URI Too Long',
    415 => 'Unsupported Media Type',
    416 => 'Requested Range Not Satisfiable',
    417 => 'Expectation Failed',
    500 => 'Internal Server Error',
    501 => 'Not Implemented',
    502 => 'Bad Gateway',
    503 => 'Service Unavailable',
    504 => 'Gateway Timeout',
    505 => 'HTTP Version Not Supported',
];

/* phpdemo\core\API.php */
<?php

/** 引入连接数据库的文件 */
require_once 'DB.php';
/**
 * API 抽象类 ，所有API继承该类
 */
abstract class API
{
    /** @var object db对象 */
    protected $db;

    /** @var array 当前url请求的参数 */
    protected $params = [];

    /** @var array 可用的HTTP状态 */
    protected $statuses = [];

    /** 允许的请求方式 */
    protected $method_type = array('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

    /** 构造函数
     * @param  array $params 请求参数
     */
    public function __construct()
    {
        /** 数据库类实例化 */
        $this->db = Database::getInstance();

        /** 状态码 */
        $this->statuses = require_once 'util/statuses.php';

        /** 请求头设置 */
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    /**
     * 输出 格式化的数组
     * @param  array  $arr  需要输出的分布式数组
     * @param  string $format 输出格式
     * @return void
     */
    protected function output(array $arr = [], string $format = 'json')
    {
        switch ($format) {
            case 'json':
                header('Content-type: application/json; charset=UTF-8');
                print count($arr) > 0 ?
                    json_encode(['status' => true, 'data' => $arr]) :
                    json_encode(['status' => true, 'msg' => 'not data']);

                break;
        }
    }

    /**
     * 声明HTTP响应状态.
     * @param  integer $code 响应码
     * @return void
     */
    protected function status(int $code)
    {
        if ($this->statuses[$code]) {
            header("HTTP/1.1 " . $code . " " . $this->statuses[$code]);
        } else {
            header("HTTP/1.1 " . 500 . " " . $this->statuses[500]);
        }
    }

    /**
     * 返回解码的请求输入。在前端POST时，接收并处理body体
     * @return array
     */
    protected function getRequestInput(): array
    {   // json转(可以访问请求的原始数据的只读流)
        return (array) json_decode(file_get_contents('php://input', true), JSON_FORCE_OBJECT);
    }

    /** 用于派生类重写 */
    public function get() { }
    public function post() { }
    public function put() { }
    public function delete() { }
}


/* phpdemo\app\model\user.php */
<?php

/** 引入连接数据库的文件 */
require_once 'core/API.php';

class User extends API
{
    /** 当前实体类对应表的表名 */
    // private $tableName = 'user';
    private $tableName = 'dd_article';

    /** 查询指定表数据 */
    public function get()
    {
        $sql = 'SELECT * FROM ' . $this->tableName;
        /** 查找指定表的所有数据 此时返回为Array */
        $user = $this->db->query($sql);
        $this->status(200);
        $this->output($user);
    }

    public function getId($params)
    {
        $sql     = "SELECT * FROM $this->tableName WHERE id = :id LIMIT 1";
        $id      = (int) $params[0];
        $user = $this->db->query($sql, ['id' => $id])[0] ?? [];

        $this->status(200);
        $this->output($user);


        // $sql     = "SELECT * FROM $this->tableName WHERE id = :id LIMIT 1";
        // $id      = (int) $this->params[0];
        // $article = $this->db->query($sql, ['id' => $id])[0] ?? [];

        // $this->status(200);
        // $this->output($article);
    }

    /**
     * 重写的POST请求
     */
    public function post()
    {
        // sql语句
        $sql = "INSERT INTO $this->tableName (title, content, category_id, state) VALUES(:title, :content, :category_id, :state)";
        $input  = $this->getRequestInput();
        $params = [
            // key => value
            'title' => (string) $input['title'],
            'content' => (string) $input['content'],
            'category_id' => (int) $input['category_id'] ? (int) $input['category_id'] : 1,
            'state' => (int) $input['state'] ? (int) $input['state'] : 1,
        ];

        $this->db->query($sql, $params);
        $this->status(201);
        $this->output();
    }


    public function put()
    {
        // $sql    = "UPDATE $this->tableName SET title = :title, excerpt = :excerpt, content = :content, updated_at = :updated_at WHERE id = :id";
        // $input  = $this->getRequestInput();
        // $params = [
        //     'id'         => $this->params[0],
        //     'title'      => isset($input['title']) ? (string) $input['title'] : null,
        //     'excerpt'    => isset($input['excerpt']) ? (string) $input['excerpt'] : null,
        //     'content'    => isset($input['content']) ? (string) $input['content'] : null,
        //     'updated_at' => date('Y-m-d H:i:s'),
        // ];

        // $this->db->query($sql, $params);

        // $this->status(200);
        // $this->output();
    }
    public function delete()
    {
        // $sql    = "DELETE FROM $this->tableName WHERE id = :id";
        // $input  = $this->getRequestInput();
        // $params = [
        //     'id' => $this->params[0],
        // ];

        // $this->db->query($sql, $params);

        // $this->status(200);
        // $this->output();


        // $sql    = "DELETE FROM $this->tableName WHERE id = :id";
        // $input  = $this->getRequestInput();
        // $params = [
        //     'id' => $this->params[0],
        // ];

        // $this->db->query($sql, $params);

        // $this->status(200);
        // $this->output();
    }
}


/* phpdemo\api\user.php */
<?php

require_once('app/model/user.php');

// print_r($_SERVER['REQUEST_URI']);
// print_r($_SERVER['REQUEST_METHOD']);

// $temp_url = $_SERVER['REQUEST_URI'];

// print_r($temp_url); // /api/user?id=4
// print_r($temp_method); // GET

// print_r($_SERVER);

/**
 * 该文件执行，先于model/user.php
 * 所以可以考虑在此实例化时，是否需要一些处理。
 */
$modelUser = new User();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        /** 判断url中是否包含? 如果包含执行根据id查数据，否则查列表 */
        strpos($_SERVER['REQUEST_URI'], '?') ?
            $modelUser->getId(array(4)) : $modelUser->get();
        break;
    case 'POST':
        $modelUser->post();
        break;
    case 'DELETE':
        $modelUser->delete();
        break;
}

/* phpdemo\index.php */
<?php

/** 打印出 $_SERVER 数组 */
// print_r($_SERVER);

// print_r($_SERVER['REQUEST_URI']);
// print_r($_SERVER['REQUEST_METHOD']);

/** __DIR__:当前页面所在目录 */
require_once __DIR__ . '/api/user.php';
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DEMO</title>
  </head>

  <body>
    PHP
    <section></section>
    <article></article>

    <input type="text" />
    <textarea> </textarea>

    <button>TTTT</button>
    <script>
      async function getUser() {
        const res = await fetch("http://127.0.0.1");
        // const res = await fetch("http://127.0.0.1/app/controller/user.php");
        const result = await res.json();
        console.warn(result.data);

        document.querySelector("article").innerHTML = marked(
          result.data[8].content
        );

        //     result.data.map((item) => {
        //         document.body.innerHTML += `
        // <dl>
        // <dt>ROLE  ${item.id}</dt>
        // <dd>${item.firstname}</dd>
        // <dd>${item.lastname}</dd>
        // <dd>${item.phone}</dd>
        // </dl>
        // `;
        //     });
      }
      getUser();

      let temp_btn = document.querySelector("button");
      temp_btn.addEventListener(
        "click",
        function () {
          let temp_textarea = document.querySelector("textarea");
          console.warn("？？", temp_textarea.value);

          fetch(`http://127.0.0.1`, {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify({
              title: document.querySelector("input").value,
              content: temp_textarea.value,
              // category_id: 1,
              // state: 1,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => console.log("Success:", response));
        },
        false
      );
    </script>
  </body>
</html>
```

# PHP 安装及配置

- 修改 php.ini

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

# Nginx 安装及配置

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

```conf
# nginx/conf/nginx.conf

worker_processes  1; # nginx启动进程,通常设置成和cpu的数量相等，auto

# 工作模式和连接数上限
events {
    # 每个worker_processes的最大并发链接数 并发总数：worker_processes*worker_connections
    worker_connections  1024;
}

# 与提供http服务相关的一些配置参数类似的还有mail
http {
     # 引入文件扩展名与文件类型映射表
    include       mime.types;
    # 默认文件类型
    default_type  application/octet-stream;
    # 设置nginx是否使用sendfile函数输出文件
    sendfile        on;
    #tcp_nopush     on;
     # 链接超时时间
    keepalive_timeout  65;

    server {
        listen       80; # 监听端口一般都为http端口：80
        server_name  localhost; # 域名可以有多个，用空格隔开

        # location / {
            # 设置网站的根目录
            root   E:/GIT/phpdemo;
             # 把index.php添加到默认首页，就是输入/时自动打开/index.php
            index  index.html index.htm index.php;
            charset UTF-8;
        # }

        location ~ ^/(?:[^/?]*?/|api(?:_admin)?\.(?:js|css)$|admin$) {
            # rewrite ^/templates/(.*$) /templates/$1 break;
            rewrite ^/([^?]*)$ /index.php?/$1;
            rewrite ^/([^?]*?)\?(.*)$ /index.php?/$1&$2;
       }

        error_page  404              /404.html;

        # 将服务器错误页面重定向到静态页面/50x.html
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        # php的反向代理注解 配置FastCGI，PHP 脚本请求全部转发到 FastCGI处理
        location ~ \.php$ {
        #    root           E:/GIT/phpdemo;
           # 后端的fastcgi server的地址
           fastcgi_pass   127.0.0.1:9000;
           # fastcgi默认的主页资源
           fastcgi_index  index.php;
            fastcgi_split_path_info  ^((?U).+\.php)(/?.+)$;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            fastcgi_param  PATH_INFO  $fastcgi_path_info;
            fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;
            include        fastcgi_params;
        }
    }
}
```
