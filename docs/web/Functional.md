## 函数式编程入门经典

- 函数的原则:小,更小。
- 引用透明性
- 声明式，抽象

### 函数与方法的区别

```js
// 函数
let simple = a => {
  return a;
};
simple(5);

// 方法
let obj = {
  simple: a => {
    return a;
  },
};
obj.simple(5); // 用其名称及其关联对象调用。
```

### 纯函数

- 产生可测试的代码
- 不应改变任意一个外部变量，就能马上理解其中含义
- 纯函数总能够根据输入来做缓存

```js
// 非纯函数
let number = 1;
const increment = () => (number += 1);
increment(); // 2

// 纯函数
const increment = n => n + 1;
increment(1); // 2

// 纯函数 ，加法计算。
const sum = (a, b) => a + b;
sum(3, sum(5, 8)); // 16
sum(1, sum(2, sum(3, 4))); // 10
```

### 高阶函数

- 函数把其他函数当做参数传递使用或者返回一个函数
- 最常见的应用如 map, reduce. 都是以传入不同的函数来以不同的方式操作数组元素

#### 函数作为返回值输出

- isType 函数:判断类型的时候可以通过 Object.prototype.toString.call 来获取对应对象返回的字符串

```js
let isString = obj => Object.prototype.toString.call(obj) === "[object String]";
let isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";
let isNumber = obj => Object.prototype.toString.call(obj) === "[object Number]";

// 封装成一个判断类型的方法
let isType = type => obj => {
  return Object.prototype.toString.call(obj) === "[object " + type + "]";
};
isType("String")("123"); // true
isType("Array")([1, 2, 3]); // true
isType("Number")(123); // true
// 这里就是一个高阶函数，因为 isType 函数将 obj => { ... } 这一函数作为返回值输出。
```

```js
// 加法
const sum = (x, y) => x + y;
const calculate = (fn, x, y) => fn(x, y);
calculate(sum, 1, 2); // 3

// filter
let students = [{ name: "Asura", grade: 6 }, { name: "Satya", grade: 4 }, { name: "Shakya", grade: 9 }];
const isApproved = student => student.grade >= 6; // filter
const byName = obj => obj.name; // map
// 链式 使用 filter 和 map
console.log(students.filter(isApproved).map(byName));

// Reduce
const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
totalGrades; // 19

// 对象排序 [逆序则将减号左右的xy互换]
[{ id: 1, name: "one" }, { id: 3, name: "three" }, { id: 2, name: "two" }, { id: 5, name: "five" }, { id: 4, name: "four" }].sort((x, y) => x.id - y.id);
```

```js 命令式&声明式
// 命令式 命令式的循环要求你必须先实例化一个数组，而且执行完这个实例化语句之后，解释器才继续执行后面的代码。然后再直接迭代 cars 列表，手动增加计数器，把各种零零散散的东西都展示出来
var makes = [];
for (i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}
// 声明式
var makes = cars.map(function(car) {
  return car.make;
});

// compose 表达式只是简单地指出了这样一个事实：用户验证是 toUser 和 logIn 两个行为的组合。

// 命令式
var authenticate = function(form) {
  var user = toUser(form);
  return logIn(user);
};
// 声明式
var authenticate = compose(
  logIn,
  toUser,
);
```

```js
// 命令式   获取数组中所有偶数
const even = n => n % 2 == 0;
const listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
listOfNumbers.filter(even); // [0, 2, 4, 6, 8, 10]

/** 声明式
 *  可以理解为，将filter的条件提取出来，声明一下，然后在filter中使用
 */
// 获取数组中<3的数
function smaller(number) {
  return number < this;
}
function filterArray(x, listOfNumbers) {
  // filter函数中的第二个参数表示上面 this， 也就是 x 值
  return listOfNumbers.filter(smaller, x);
}
let numbers = [10, 9, 8, 2, 7, 5, 1, 3, 0];
filterArray(3, numbers); // [2, 1, 0]

// 找出age>21的人
const olderThan21 = person => person.age > 21;
const overAge = people => people.filter(olderThan21);
overAge(people); // [{ name: 'TK', age: 26 }, { name: 'Kazumi', age: 30 }]

// 购物车里类型为 books的总数
let shoppingCart = [{ productTitle: "Functional Programming", type: "books", amount: 10 }, { productTitle: "Kindle", type: "eletronics", amount: 30 }, { productTitle: "Shoes", type: "fashion", amount: 20 }, { productTitle: "Clean Code", type: "books", amount: 60 }];
// 一个reduce就可以搞定：
let sum = shoppingCart.reduce((item, next) => {
  return next.type === "books" ? item + next.amount : item;
}, 0);
console.log(sum);
```

### curry 柯里化

- 传递给函数一部分参数来调用它，返回一个函数去处理剩下的参数
- 一个函数有多个参数,把每个参数通过链式的形式返回下一个函数,直到最后返回结果

```js
// 加法函数柯里化   [ES6写法，也是比较正统的函数式写法]
const add = x => y => x + y;
const increment = add(1);
const addFive = add(5);
increment(3); //4
addFive(10); // 15

//比较容易读懂的ES5写法
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

// 对象柯里化
const student = name => grade => `Name: ${name} | Grade: ${grade}`;
student("Matt")(8); // Name: Matt | Grade: 8

// 柯里化函数接口
var multiple = function(a) {
  return function(b) {
    return +b * a + "";
  };
};
var plus = function(a) {
  return function(b) {
    return +b + a + "";
  };
};
var concatArray = function(chars, stylishChar) {
  return chars.map(stylishChar).reduce(function(a, b) {
    return a.concat(b);
  });
};
console.log(concatArray(["1", "2", "3"], multiple(2)));
console.log(concatArray(["1", "2", "3"], plus(2)));

// 写一个函数，可以连接字符串数组 如 f(['1','2']) => '12'
var concatArray = function(chars) {
  return chars.reduce(function(a, b) {
    return a.concat(b);
  });
};
concat(["1", "2", "3"]); // => '123'
// 将所有数字+1
var concatArray = function(chars, inc) {
  return chars
    .map(function(char) {
      return +char + inc + "";
    })
    .reduce(function(a, b) {
      return a.concat(b);
    });
};
console.log(concatArray(["1", "2", "3"], 1)); // => '234'
// 所有数字乘以2
var multiple = function(a, b) {
  return +a * b + "";
};
var concatArray = function(chars, inc) {
  return chars
    .map(function(char) {
      return multiple(char, inc);
    })
    .reduce(function(a, b) {
      return a.concat(b);
    });
};
console.log(concatArray(["1", "2", "3"], 2)); // => '246'
```

```js
const changeGender = gender => () => (user.gender = gender);
$("input[value=male]").onChange(changeGender("male"));
$("input[value=female]").onChange(changeGender("female"));
```

### Compose 代码组合

- 通过组合两个或更多的函数生成一个新的函数

```js
// 组合两个函数生成一个新的函数
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const angry = compose(
  exclaim,
  toUpperCase,
);
angry("stop this"); // STOP THIS!

// 组合三个函数生成一个新的
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const moreExclaim = x => `${x}!!!!!`;
const reallyAngry = compose(
  exclaim,
  compose(
    toUpperCase,
    moreExclaim,
  ),
);
reallyAngry("stop this"); // STOP THIS!!!!!!

// 结合律: （associativity）  无论是把 g 和 h 分到一组，还是把 f 和 g 分到一组都不重要
// var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// 因调用分组不重要，结果一样。所以可以写一个可变的组合

groupedTasks = [[{ completed: false, id: 1 }, { completed: true, id: 2 }], [{ completed: false, id: 4 }, { completed: true, id: 3 }]];
var completedAndSorted = compose(
  sortBy(task => task.id),
  filter(task => task.completed === true),
);
map(completedAndSorted, groupedTasks);
```

### 解构

- 从数组中提取数据或对象使用一种语法混合数组和对象文本的建设。或“模式匹配”。

```js
// Select from pattern
const foo = () => [1, 2, 3];
const [a, b] = foo();
console.log(a, b); // 1 2

// 接收 rest 值
const [a, ...b] = [1, 2, 3];
console.log(a, b); // 1 [2, 3]

// 可选参数
const ajax = ({ url = "localhost", port: p = 80 }, ...data) => console.log("Url:", url, "Port:", p, "Rest:", data);
ajax({ url: "someHost" }, "additional", "data", "hello");
// Url: someHost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
ajax({}, "additional", "data", "hello");
// Url: localhost Port: 80 Rest: [ 'additional', 'data', 'hello' ]
```

#### pointfree 模式

- 函数无须提及将要操作的数据是什么

```js
// 非 pointfree，因为提到了数据：word
var snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/gi, "_");
};

// pointfree
var snakeCase = compose(
  replace(/\s+/gi, "_"),
  toLowerCase,
);
```

#### 获取所有偶数

```js
// 该函数接收一个断言[值为true or false]
const unless = (predicate, fn) => {
  if (!predicate) fn();
};
// 查找列表中的偶数
const times = (times, fun) => {
  for (let i = 0; i < times; i++) {
    fun(i);
  }
};
/**
 * 参数一:传入一个 number类型的数值
 * 参数二:一个参数为n的函数
 * 使用[unless]函数，其中参数如下:
 * 参数一:[n%2]得偶数
 * 参数二:一个匿名无参函数
 * output:最终输出[number]内所有偶数
 */
times(100, n => {
  unless(n % 2, () => {
    console.log(`${n} is even`);
  });
});
```

- every 检查数组的所有元素是否为 true

```js
/** [实际上低效,应该在遇到第一个不匹配条件的元素时就停止迭代数组]
 * @param {*} arr 传入的数组
 * @param {*} fn 传入的fn需返回一个布尔值
 * 使用[&&]运算确保所有的数组内容遵循fn给出的条件
 */
const every = (arr, fn) => {
  let result = true;
  for (let i = 0; i < arr.length; i++) result = result && fn(arr[i]);
  return result;
};

console.log(every([NaN, NaN, NaN], isNaN)); // true
console.log(every([NaN, NaN, 4], isNaN)); // false
```

- sortBy 排序

```js
/* 接收一个属性，并返回另一个函数 */
const sortBy = property => {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result;
  };
};
// 使用。接收一个属性，并返回另一个函数,返回函数作为[比较函数]传给sort
arr.sort(sortBy("firstName"));
```

- unary 函数

```js
let array = ["1", "2", "3"];
/* 由于[parseInt]接收两个参数(parse,radix)如果可能该函数会把传入的[parse]转换为数字.
    如果把[parseInt]传给map函数,map会把index的值传给parseInt的tadix参数。导致结果如下: */
array.map(parseInt); // 输出结果为: [1,NaN,NaN]

/**
 * 改善以上，使其正确输出。把parseInt函数转换为另一个只接受一个参数的函数。
 * @param {*} fn
 * 接受一个给定的多参数函数，并把它转换为一个只接受一个参数的函数
 * 检查fn是否有一个长度为1的参数列表,如果没有，就返回一个新函数
 * 它只接受一个参数arg，并用该参数调用fn
 */
const unary = fn => (fn.length === 1 ? fn : arg => fn(arg));
/* 返回了一个新函数(parseInt的克隆体),只接受一个参数。
如此,map函数传入的index,arr参数就不会对程序产生影响 */
array.map(unary(parseInt)); // [1, 2, 3]
```

- once 函数 控制函数被调用的次数

```js
/* 接受一个参数fn并通过调用它的apply方法返回结果 
    声明一个done变量，初始值为false。返回的函数会形成一个覆盖它的闭包作用域.
    返回的函数会访问并检查done是否为true，是则返回undefined,否则将done设置为true[阻止下次执行] 
    并用必要的参数调用函数fn */
const once = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};
let doPayment = once(() => {
  console.log("Payment is done");
});
doPayment();
console.log("模拟二次调用:", doPayment()); // undefined
```

- memoized 函数 使函数能够记住其计算结果

```js
const memoized = fn => {
  const lookupTable = {};
  /* 返回函数将接受一个参数并检查它是否存在 [lookupTable]中
        如果存在，返回对应值;否则，使用新的输入作为key，fn的结果作为value，更新[lookupTable]对象 */
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

let fastFactorial = memoized(n => {
  if (n === 0) return 1;
  return n * fastFactorial(n - 1);
});

console.log(fastFactorial(5)); // 120
console.log(fastFactorial(3)); // 6
console.log(fastFactorial(7)); //5040
```

### 数组的函数式编程

### SVG

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// 这条路径将先移动到点 (M10 10) 然后再水平移动80个单位(h 80)，然后下移8个单位 (v 8)，接着左移80个单位 (h -80)，再回到起点处 (z)。
let p = new Path2D("M10 10 h 80 v 8 h -80 Z");
ctx.fill(p);
```

```js
let percentValue = 5;
let calculateTax = value => {
  return (value / 100) * (100 + percentValue);
};

/** 优化以上代码
 * 将 [percentValue] 作为函数的参数
 */
let calculateTax2 = (value, percentValue) => {
  return (value / 100) * (100 + percentValue);
};

// 引用透明性
let identity = i => {
  return i;
};
// 用命令式方法迭代数组
let arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// 用声明方式迭代数组
arr.forEach(element => console.log(element));

const sortBy = property => {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result;
  };
};
// 使用
// arr.sort(sortBy('firstName'));

// page:75

const double = n => n * 2;
const increment = n => n + 1;

// 没有用管道操作符
double(increment(double(5))); // 22

let Chain = {
  sav: "",
  a1: function(val) {
    this.sav = this.sav + val;
    return this;
  },
};
Chain.a1("aaa")
  .a1("bbb")
  .a1("ccc");
console.log(Chain.sav); //返回 aaabbbccc
```
