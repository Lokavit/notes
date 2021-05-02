## Filter

```js
/**
 * 过滤数组中相同项 从数组中，删除重复项 [简单的数组项]
 */
const strings = ["AA", "BB", "AA", "AD", "BC", "AC", "AD"];
// filter函数本来就返回新数组，所以将逻辑写在内中，最终返回新数组。
const filteredStrings = strings.filter((item, index) => {
  // 如果当前项目的索引与该项目的第一次出现相同，则返回到新数组
  // console.log("ITEM:", item, `|| ${strings.indexOf(item)}`);

  return strings.indexOf(item) === index;
});
// console.log("删除重复项", filteredStrings);

const arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr2 = arr1.filter((element, index, self) => {
  return self.indexOf(element) === index;
});
console.log(arr2); // [1, 2, 3, 5, 4]
console.log(arr1); // [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]

// 用于 过滤数组中相同的对象
const books = [
  {
    name: "1",
    author: "A",
  },
  {
    name: "2",
    author: "B",
  },
  {
    author: "B",
    name: "2",
  },
];

/**
 * 过滤数组中相同的对象 从数组中，删除重复项 [对象类型的数组项]
 * @param {*} arr 待删除的数组
 * use: removeDuplicates(books)
 */
function removeDuplicates(arr) {
  const result = [];
  const duplicatesIndices = [];

  // 循环遍历原始数组中的每个项目
  arr.forEach((current, index) => {
    if (duplicatesIndices.includes(index)) return;

    result.push(current);

    // 在当前项之后循环遍历数组中的其他项
    for (
      let comparisonIndex = index + 1;
      comparisonIndex < arr.length;
      comparisonIndex++
    ) {
      const comparison = arr[comparisonIndex];
      const currentKeys = Object.keys(current);
      const comparisonKeys = Object.keys(comparison);

      // 检查对象中的键数
      if (currentKeys.length !== comparisonKeys.length) continue;

      // 检查键名
      const currentKeysString = currentKeys.sort().join("").toLowerCase();
      const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
      if (currentKeysString !== comparisonKeysString) continue;

      // 检查值
      let valuesEqual = true;
      for (let i = 0; i < currentKeys.length; i++) {
        const key = currentKeys[i];
        if (current[key] !== comparison[key]) {
          valuesEqual = false;
          break;
        }
      }
      if (valuesEqual) duplicatesIndices.push(comparisonIndex);
    } // end for loop
  }); // end arr.forEach()

  return result;
}
```

## Recursion

```js
/** 基础示例 */
/**
 * 递减
 * @param {*} num 外部传入的参数
 * use: countdown(5)
 */
const countdown = (num) => {
  console.log(num);
  num < 1 ? num : countdown(num - 1);
};

/**
 * 递归 x 的 n 次方
 * @param {*} x
 * @param {*} n
 * return:x的n次方结果
 * use: pow(3, 6)
 */
/* 三元运算符简写以上代码块 */
const pow = (x, n) => {
  // n == 1 递归的基础 。递归步骤：根据基础的结果，决定是输出结果还是再执行一遍函数
  return n == 1 ? x : x * pow(x, n - 1);
};

/** 递归计算不同部门的工资 2019.08.08 */
// 对象数组
const company = {
  sales: [
    {
      name: "Asura",
      salary: 1000,
    },
    {
      name: "Satya",
      salary: 600,
    },
  ],
  development: {
    sites: [
      {
        name: "Buddha",
        salary: 2000,
      },
      {
        name: "Shakya",
        salary: 1800,
      },
    ],
    internals: [
      {
        name: "Lokavit",
        salary: 1300,
      },
    ],
  },
};
/**
 * 用来完成作业的函数 递归计算不同部门的工资 2019.08.08
 * @param {*} department 部门
 * use: sumSalaries(company)
 */
function sumSalaries(department) {
  // 如果传入的是数组
  if (Array.isArray(department)) {
    // 情况 (1) 求数组的和
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    // 情况 (2)
    let sum = 0;
    // 迭代对象中的 values 属性值 ，每个values则是一个数组
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // 递归调用子部门，对结果求和
    }
    return sum;
  }
}

/**
 * 递归删除深层数组对象中某数据 2019.10.12
 * 递归新增深层数组对象中某数据 2019.10.12
 */

/** 对象数组 */
const tableData = {
  entry: "abc",
  children: [
    {
      entry: "abc-bcd",
      children: [
        {
          entry: "abc-bcd-cde",
        },
        {
          entry: "abc-bcd-def",
        },
      ],
    },
    {
      entry: "abc-zxc",
      children: [
        {
          entry: "abc-zxc-xcv",
        },
        {
          entry: "abc-zxc-cvb",
        },
      ],
    },
  ],
};

/**
 * 递归删除深层数组对象中某数据 2019.10.12
 * data:传入需递归的大数组
 * target:需要删除的指定值
 * use: this.recursiveDelete(this.tableData,row.entry)
 */
function recursiveDelete(data, target) {
  if (!data) return;
  if (!Array.isArray(data)) return;
  for (let i = 0; i < data.length; i++) {
    // 如果当前的[entry] == target传入值
    if (data[i].entry == target) {
      this.$delete(data, i); // 从视图删除该数据
      // 调用删除API [target] 为外部传入值，亦为接口所需参数
      deleteSystemCommoncodes(target);
      return;
    }
    // 非以上情况，且data[i]有children且其长度>0
    else {
      if (data[i].children && data[i].children.length > 0) {
        // 递归本函数，继续寻找 target
        this.recursiveDelete(data[i].children, target);
      }
    }
  }
}

/**
 * 递归新增深层数组对象中某数据 2019.10.12
 * data:传入需递归的大数组
 * target:需要删除的指定值
 * use:this.recursivePost(this.tableData,this.form)
 */
function recursivePost(data, target) {
  if (!data) return;
  if (!Array.isArray(data)) return;
  /** 需要考虑以下问题:
   * 通过 target.parentEntry 判断当前需添加的是根元素还是子元素
   * 添加根元素数据:
   *    直接添加数据:this.$set(data,data.length,target)
   * 添加子元素,需先判断待插入数据的对象中[hasElement:true]且是否有[children],
   * 如果有，则插入为:this.$set(data,data.length,target)
   * 如果没有,则在插入数据之前，需改变待插入数据的
   */
  /** 无父节点的数据，将[target]对象直接添加到传入的[data]中 */
  if (!target.parentEntry) {
    this.$set(data, data.length, target);
    // this.getSystemData(); // 调用一下请求，让数据重新回来。似乎没有什么作用
    return;
  } else {
    /** 有父节点的数据，即[target.parentEntry]有值的情况下
     *  遍历传入数组,从中找到某数据.entry == 传入target.parentEntry
     */
    for (let i = 0; i < data.length; i++) {
      // 如果 某数据.entry == 传入target.parentEntry
      if (data[i].entry == target.parentEntry) {
        /** 判断该数据的[hasElement]是否有子元素
         * 如果 [hasElement:false]即没有子元素，则该数据一定没有[children]
         */
        if (!data[i].hasElement) {
          data[i].hasElement = true; // 该数据的[hasElement:true]
          data[i].children = new Array(); // 为该数据手动添加一个[children:[]]属性
          // 以上设置完毕后,使用this.$set将数据插入到children数组中
          this.$set(data[i].children, data[i].children.length, target);
          return;
        } else if (data[i].hasElement) {
          /** 如果 [hasElement:ture]即已有子元素 */
          /** 如果该数据没有[children] 将其加上一个children的数组 */
          if (!data[i].children) data[i].children = new Array();
          this.$set(data[i].children, data[i].children.length, target);
          return;
        }
      } else {
        console.log("没找到entry == parentEntry");
        // 如果某条数据有 children，并且 长度>=0
        if (data[i].children && data[i].children.length >= 0) {
          // 递归本函数,直至数据成功插入整体数据的对应层级树中
          this.recursivePost(data[i].children, target);
        }
      }
    }
  }
}
```
