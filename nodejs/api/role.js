/*
 * @Author: Satya
 * @Date: 2020-08-11 17:05:56
 * @Last Modified by: Satya
 * @Last Modified time: 2020-08-11 17:20:01
 * doc: 角色相关 API
 */
const fs = require("fs");
// JSON文件路径
const fileJSON = "D:/GIT/notes/nodejs/database/roleback.json";

const roleAPI = {
  /**
   * 创建字段为 '/create'的方法
   * 用于稍后处理POST方式提交过来的数据，后续操作亦在内中
   * 此处只写函数名，具体实现罗列在下方。
   */
  "/create": createRole,
  "/getrole": getRoles,
  "/getroleinfo": getRoleInfo,
};

/** 获取角色列表 */
function getRoles(request, response) {
  // 读取JSON
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    // 写入响应头
    response.writeHead(200, {
      // 内容类型: 指定字符编码，防止乱码
      "Content-Type": "text/plain;charset=utf-8",
    });
    // 把读取到的JSON文件内容写入响应。必须转换
    response.write(JSON.stringify(roles));
    response.end();
  });
}

/** 获取指定角色信息详情 */
function getRoleInfo(request, response) {
  console.log("请求携带的参数 query:", request.query);
  /** 读取JSON
   * 参数一：读取的文件路径
   * 参数二：回调函数。其中参数一为error对象(为null表示成功)，参数二为数据(可为<string>|<Buffer>)
   */
  // fs.readFile(`./${request.url}`, (error, buffer) => {
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    const temp = roles.find((item) => item.name == request.query.rolename);
    console.log("TEMP:", temp);

    // 写入响应头
    response.writeHead(200, {
      // 内容类型: 指定字符编码，防止乱码
      "Content-Type": "text/plain;charset=utf-8",
    });

    if (!temp) {
      response.write(
        JSON.stringify({
          msg: "输入有误",
        })
      );
      response.end();
    } else {
      // 向前端返回数据，该方法可调用多次，返回的数据会被拼接到一起
      // 把读取到的JSON文件内容写入响应。必须转换
      response.write(JSON.stringify(temp));
      response.end();
    }
  });
}

/** 创建新角色 */
function createRole(request, response, data) {
  //  读取JSON
  fs.readFile(fileJSON, (error, buffer) => {
    const roles = JSON.parse(buffer.toString());
    // 从读取的JSON中，遍历判断是否有重复名字的对象
    const nameIndex = roles.findIndex((item) => {
      return data.name === item.name;
    });
    if (nameIndex > 0) {
      // 写入响应头
      response.writeHead(200, {
        // 内容类型: 指定字符编码，防止乱码
        "Content-Type": "text/plain;charset=utf-8",
      });
      // 把读取到的JSON文件内容写入响应。必须转换
      response.write(
        JSON.stringify({
          msg: "角色名重复",
        })
      );
      response.end();
    } else {
      roles.push(data); // 前台来的数据，加到 数据集中,用于写入JSON文件
      /**
       * 向文件写入信息，若文件不存在，则自动创建。 把JSON以字符串形式写入
       * 参数一：写入的文件路径
       * 参数二：写入内容(可为<string> | <Buffer> | <TypedArray> | <DataView>)
       * 参数三：回调函数，传入数据为error对象，其为null表示成功。
       */
      fs.writeFile(fileJSON, JSON.stringify(roles), () => {
        // 写入响应头
        response.writeHead(200, {
          // 内容类型: 指定字符编码，防止乱码
          "Content-Type": "text/plain;charset=utf-8",
          // 允许跨域
          "Access-Control-Allow-Origin": "http://localhost:1111",
        });
        // 把读取到的JSON文件内容写入响应。必须转换
        response.write(
          JSON.stringify({
            msg: "写入成功",
          })
        );
        console.log(`文件写入成功`);
        response.end();
      });
    }
  });
  console.log("创建角色：！！！！ data:", data);
}

module.exports = {
  roleAPI,
};
