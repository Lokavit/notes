Other 杂

# String

- 字符串处理相关工具速查


## fileName

```js
/**
 * fileName.md => fileName
 */
let str = "fileName.md";
str = str.subString(0, str.lastIndexOf(".")); // fileName

// 转驼峰后，首字母转大写。移除末尾扩展名
upperFirst(camelCase(str));
```

### 文件名提取

```js
let fileName = "./Material/ListMaterial.vue";
// 先将最后一个斜杠前面剔除，再从下标0开始，至上一步截取的结果中，剔除后缀名部分
// 最终返回： ListMaterial
fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length).substring(0, fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length).lastIndexOf("."));
```

## upperFirst

```js
/**
 * 首字母转大写
 * @param {String} str 需处理字符串
 * use:upperFirst("abc")
 * result: Abc
 */
export function upperFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}
```

## camelCase

```js
/**
 * 字符串转驼峰
 * @param {String} str 需处理的字符串
 * use:camelCase("ab-cd-ef")
 * result:abCdEf
 */
export function camelCase(str) {
  let arr = str.split("");
  if (arr[0] == "-") {
    arr.splice(0, 1);
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] == "-") {
      arr.splice(i, 1);
      arr[i] = arr[i].toUpperCase();
    }
  }
  return arr.join("");
}
```

## getToURL

```js
console.log("请求拦截中的url：", config.url);
console.log("请求拦截中的params:", config.params);
if (config.params != undefined) {
  // 转为键值对数组形式 ,然后使用 reduce 将其拼接，最后替换掉第一个'&'为'?'
  let result = Object.entries(config.params)
    .reduce((prev, curr) => {
      return prev + ("&" + curr[0] + "=" + curr[1]);
    }, "")
    .replace("&", "?");
  console.log("处理完毕的params转url:", result);

  config.url = config.url + result;
}
```


```js
// 排列算法，n中m个元素。m不能大于n
// n! 就是 n(n-1)(n-2)(n-3)……(n-m+1)
// 如：7个人拍成一列，有几种排法？因每人都可以移动，所以是a的下7上7 =

/*
在数学中有排列组合，用来计算概率。

比如：从4个数字中，任意选择两个的情况。从5个数字中任意选择3个数字的情况。（这里我们只考虑没有顺序的情况）。

公式：C(n,m)=n!/[m!(n-m)!]=n*(n-1)*...*(n-m+1)/[1*2*...*m],如C(5,2)=[5*4]/[1*2]=10.

举例说明：有 1,2,3,4 四个数字，从这四个数字中，任意选择两个数字一共有多少种情况：[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]一共有这六种情况。

下面用代码实现从5个数字中任意选择3个的情况(不考虑顺序)。
 */

var array = [1, 2, 3, 4, 5];
for (var i = 0, len1 = array.length; i < len1; i++) {
    var a2 = array.concat();
    /*
    排除之前已经组合过的数据
    比如：第一次的时候，i[0] = 1, 这个时候2层循环, 只循环 2~5, 
    第二次的时候, i[1] = 2, 这个时候2层循环, 只循环 3~5
    同理：3层循环也是相比于2层循环来
    */
    a2.splice(0, i + 1);
    for (var j = 0, len2 = a2.length; j < len2; j++) {
        var a3 = a2.concat();
        a3.splice(0, j + 1);
        for (var k = 0, len3 = a3.length; k < len3; k++) {
            console.log(array[i] + ' ' + a2[j] + ' ' + a3[k]);
        }
    }
}

// 组合算法。

// 数据库的传统集合运算（并、差、交、笛卡尔积）和专门的关系运算（选择、投影、连接、除运算）

// SKU 笛卡尔积

// 将数组添加到另一个数组
let array = ["a", "b"];
let elements = [0, 1, 2];
array.push.apply(array, elements);
// console.info(array); // ["a", "b", 0, 1, 2]


// 数组求和
let arr = [1, 2, 3, 4, 5];
// 方式一
let result = arr.reduce((sum, current) => sum + current, 0);
// alert(result); // 15
// 方式二
arr.reduce((prev, current) => {
    return prev + current;
}, 0);

// eval() 函数会将传入的字符串当做 JavaScript 代码进行执行
// 比其他替代方法更慢，因为它必须调用 JS 解释器。慎用
// console.log("SUM:", eval(arr.join("+")));

// 根据输入值，输出该值所在范围

/**
 * 业务中独立的变量转化成数组和对象结构
 * 数组多重对比，确定所属范围的逻辑,根据毫秒数，返回颜色值
 * 绿：0-30mm ； 黄：30-100mm ； 橙：100-250mm； 红：>250mm
 */
let datas = [{
    time: 30,
    color: "normal"
}, {
    time: 100,
    color: "orange"
}, {
    time: 250,
    color: "yellow"
}];

// 再通过高效的api进行处理
function iconFilter(num, data) {
    if (num < 0) return;
    let selectData = data.find(item => num <= item.time);
    return selectData ? selectData.color : "red";
}
// console.log(iconFilter(88, datas));



// 数组对象比较
/* 以数据中的 [baseEntry] 及 [baseLineId] 作为判定 */
let table = [{
    baseEntry: 2,
    baseLineId: 2,
    id: 2,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 1,
    openQuantity: 1
}, {
    baseEntry: 3,
    baseLineId: 3,
    id: 3,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 9,
    openQuantity: 9
}];
let args = [{
    baseEntry: 2,
    baseLineId: 2,
    id: 2,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 1,
    openQuantity: 1
}, {
    baseEntry: 3,
    baseLineId: 4,
    id: 4,
    itemCode: "B00004",
    itemDescription: "计都刀",
    quantity: 7,
    openQuantity: 7
}];

/**
 * 暂存 每次向导操作完成后，带过来的[args]数据集
 * map一下 args ，于 table中find 基本[baseEntry]单据编号相同，[baseLineId]基本行号相同，则认为是重复数据
 * 若find为 undefind ，则将该项，push到temp ，最后为数组，添加到 table
 */
let temp = []; // 暂存满足条件的数据
args.map(argsItem => {
    // 根据条件查找 ： 单项数据的基本[baseEntry]单据编号相同，并且[baseLineId]基本行号相同，则认为是重复数据
    if (table.find(item => item.baseEntry === argsItem.baseEntry && item.baseLineId === argsItem.baseLineId) == undefined) {
        // console.log(`ArgsITEM:${argsItem.baseEntry},${argsItem.baseLineId}`);
        temp.push(argsItem);
    }
});
// apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
table.push.apply(table, temp);


// 合并数组对象相同 KEY 的值
// 测试比较数组对象， 相同key相加
let res = [{
        id: "B00001",
        batches: [{
            name: "A1",
            count: 3
        }, {
            name: "A2",
            count: 6
        }, {
            name: "A1",
            count: 9
        }, {
            name: "B1",
            count: 6
        }, {
            name: "A1",
            count: 12
        }],
    },
    {
        id: "B00002",
        batches: [{
            name: "B1",
            count: 4
        }, {
            name: "B2",
            count: 5
        }, {
            name: "B1",
            count: 6
        }, {
            name: "A1",
            count: 12
        }],
    },
];
for (let i = 0; i < res.length; i++) {
    if (!res[i].batches) continue;
    let newRES = [];
    // 用于确定一个 cur ，作为key值的判定条件
    res[i].batches.reduce((pre, cur) => {
        let temp = res[i].batches
            // 过滤 返回， key值相同的批次数据集
            .filter(i => i.name === cur.name)
            // 计算上一步结果数据集中，指定属性的值合并结果
            .reduce((p, c) => {
                // 将其返回为一个新的对象
                return {
                    name: p.name,
                    count: p.count + c.count
                };
            });
        // 如果新数组中，找不到key值相同的元素，
        if (newRES.find(i => i.name === temp.name) == undefined) {
            // 将该元素，添加到 新数组
            newRES.push(temp);
        }
    }, 0);
    // 将处理好的新数组，赋值给当前数据中的批次数据集
    res[i].batches = newRES;
}
// console.log("RES:", res);


// 数组完全展开，代替 flat不支持的情况
function myFlat(arr) {
    while (arr.some(t => Array.isArray(t))) {
        arr = [].concat.apply([], arr);
    }
    return arr;
}
let arrTest1 = [1, [2, 3, [4]], 5, 6, [7, 8],
    [
        [9, [10, 11], 12], 13
    ], 14
];
// Expected Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
// console.log(myFlat(arrTest1));

/** chrome 69以上才支持 */
let arr1 = [1, 2, [3, 4]];
// console.log("数组拍平", arr1.flat()); // 数组拍平，一层
let arr2 = [1, 2, [3, [4, 5]]];
// console.log("数组拍平", arr2.flat(2)); // 数组拍平多层
let arr3 = [1, [2, [3, [4]]]];
// console.log("数组降维", arr3.flat(Infinity)); //数组拍平无限层级


/**
 * 对比两个对象是否相等
 * @param {*} obj1 对象1
 * @param {*} obj2 对象2
 */
export function equalObject(obj1, obj2) {
    // 类型对比
    if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;
    // obj.toString() 效果与上相同 [object object]，但[↑返回true/false]，[↓返回string]
    // if (!obj1.toString() || !obj2.toString()) return false;
    // 长度对比
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    // 每个key对比
    return Object.keys(obj1).every(v => obj1[v] === obj2[v]);
}

let obj1 = {
    a: "1",
    b: "2"
};
let obj2 = {
    b: "2",
    a: "1"
};
// console.log(equalObject(obj1, obj2));


/**
 * 字符串转数组 将文章名字按照一个数字一位，进行转换，如10转换为['1','0']
 * @param {*} value 传入的字符串，将其切分为数组
 */
const stringToArray = (value) => value.split("");

/**
 * 数组转字符串，如['一','〇']转换为一〇
 * @param {*} value
 */
const arrayToString = (value) => value.join("");

/**
 * 数字转为汉字
 * @param {*} value 传入的数字，只接收单个数字
 */
const numberToString = (value) => {
  // console.log("传入的数字:", value); // 切分为单个数字
  let result = "";
  switch (value) {
    case "0":
      result = "〇";
      break;
    case "1":
      result = "一";
      break;
    case "2":
      result = "二";
      break;
    case "3":
      result = "三";
      break;
    case "4":
      result = "四";
      break;
    case "5":
      result = "五";
      break;
    case "6":
      result = "六";
      break;
    case "7":
      result = "七";
      break;
    case "8":
      result = "八";
      break;
    case "9":
      result = "九";
      break;
    default:
      return;
  }
  // console.log('转换后的值：', result);
  return result;
};

/**
 * 切割文件后缀名
 * @param {*} value 需切割的文件名(含后缀名)
 */
const excisionFileExtension = (value) =>
  value.substring(0, value.lastIndexOf("."));

/** 数据格式，后台返回为:{name:"1.md",download_url:"https://raw.githubusercontent.com"}
 * 文件名切割，对象中添加id，值为文件名；添加一个转换后的汉字数字
 * 根据 item.id排序后显示
 */

const tempCurry = (name) => (download_url) =>
  `Name:${name} | download_url:${download_url}`;
console.log(`输出:`, tempCurry("aa")("bb"));

resultData.map((item) => tempCurry(item.name)(item.download_url));
console.log("新的数据结果：", resultData);
```


