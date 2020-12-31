## 2019.10.31

- 装载 python3.8 [d/python]

```cmd
c:\Users\xxxx>d:
D:\> cd 到文件夹下
D:\Git\文件夹\py>python test.py
```
```python 读取本地json文件
print("Hello, World!");
import json

def loadRole():
    filename = 'D:/Git/Lokavit/Satya/Concept/role/role.json'
    print(filename);
    # 打开文件 (文件名， 指定编码)
    file = open(filename,encoding="utf-8");
    print(file); # <_io.TextIOWrapper name='a.txt' mode='r' encoding='cp936'>
    content =json.load(file)
    # roles下数组对象中，下标为0的对象中的name属性值
    role =content['roles'][0]['name']
    # role =content['roles']['info']['age'] # 多重结构读取
    # details =content['details']
    return role
t =loadRole()
print(t)
# print(t[0]);

# with open(filename) as f:
#     gpd_list = json.load(f)
# # 遍历列表的每个元素，每个元素是一个GDP数据项
# for gpd_dict in gpd_list:
#     print(gpd_dict['name'], gpd_dict['info'])
```


---

# Install for Windows7 64bit

- 安装 _Python3.6.4_ ，自定义安装路径,文件夹名为 _Python36_;
- 添加系统变量 _PATH_ 后追加 Python 的文件夹绝对路径，如：_;D:\Program Files\Python36_；
- 运行 _cmd_ ,输入 _python_ ,出现以下则表示成功;

```Python
C:\Users\ComputerName>python
Python 3.6.4 (v3.6.4:d48eceb, Dec 19 2017, 06:54:40) [MSC v.1900 64 bit (AMD64)]
 on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

---

# 第一个程式

学会编写、保存与运行 Python 程式；
Python 运行程式有两种方式：_交互式解释器提示符_ 、 _直接运行一个源代码文件_；

### 使用解释器提示符

**>>>** (Python 解释器提示符)Python Interpreter Prompt;
延续安装后的操作，在*>>>*后输入：

```Python
print("Hello World")
```

按下[enter] 键，会看到窗口的结果

```Python
>>> print("hello world")  #输入
hello world  #输出
>>>
```

**退出解释器提示符**

- 按下 _Ctrl+z_ 或输入 _exit()_

### 使用 PyCharm

- 创建 _Python_ 工程 - 新建 _Python File_ 文件 - 编写代码 - 右键 _Run_ 该文件；

**Test.py**

```Python
print("Hello World")
```

### 使用一份源代码文件

- _cmd_ 打开终端，_cd_ 到 _Test.py_ 所在的文件夹绝对路径；
- 输入 _python Test.py_;可见到输出内容；

### 获取帮助

- 使用 _help_ 功能获取函数 or 语句的信息；
- 例如：_help('len')_ 将显示处有关 _len_ 函数的帮助；
- 按下 _q_ 键可以退出帮助；

---

# 《A Byte of Python》 LearnNote

# Basic 基础

### 注释

- _#_ 右侧的文字；

### Literal Constants 字面常量

- 数字 or 文本为字面意义上的值 or 内容;
- 表示其本身，而非其它含义,值不能被改变；(_常量_)

**Example**

```Python
5 , 1.23 , "字符串" , "This is a string"
```

### 数字

- **Integers(整数)** _int_ 可指任何大小的整数,没有单独的 _long_ 类型.
- **Floats(浮点数)** _E_ 表示 10 的幂；如:_52.3E-4_ 表示 *52.3*10^-4\*.

**Example**

```Python
2  #int 类型
3.24  #floats 类型
52.3E-4 #floats 类型
```

### string 字符串

- **单引号** 可用来指定字符串,引号内的空间,若有空格 or 制表符,皆原样保留；
- **双引号** 与被单引号括起的字符串其工作机制完全相同;
- **三引号** 指定多行字符串;
- 没有单独的 _char_ 类型；

**Example**

```Python
'English'  '中文'  #单引号
"What's your name?"  "你猜"  #双引号
''' 这是一段多行字符串,这是第一行；
This is th second line.
第三行，
'''    #三引号
```

### format() 格式化

- 将每个参数值替换至格式所在的位置;
- 使用 _{index}_ 作为占位符,在 _format(variableName)_ ;

**Example**

```Python
age =20
name ='Satya'
print('{0} was {1} years old'.format(name, age))  # 逗号后面要有一个空格
print('Why is {0} playing with that python?'.format(name))

# Run Result
Satya was 20 years old
Why is Satya playing with that python?
```

**Example** _format_ 其它用法

```Python
# 对于浮点数'0.333'保留小数点后三位
print('{0:.3f}'.format(1.0/3))

# 使用下划线填充文本，并保持文字处于中间位置
# 使用 ^ 定义'___hello___'字符串长度为11
print('{0:_^11}'.format('hello'))

# 基于关键词输出 'Swaroop wrote A Byte of Python'
print('{name} wrote {book}'.format(name='Swaroop', book='A Byte of Python'))


# Run Result
0.333
___hello___
Swaroop wrote A Byte of Python
```

### _print()_

逐条换行,若不想换行则为以下:

**Example** _print()_ 不换行

```Python
print('a', end='')
print('b', end='')

# Run Result
ab
```

**Example** _print()_ 不换行加空格

```Python
print('a', end=' ')
print('b', end=' ')
print('c')

# Run Result
a b c
```

### Escape Sequence 转义序列

**Example**

```Python
# 单引号和使用转义序列
print('What\'s your name?')
# 使用 \n 来换行
print('This is the first line\nThis is the second line')

# Run Result
What's your name?
This is the first line
This is the second line
```

### Raw 原始字符串

- 若需要指定一些未经过特殊处理的字符串，需要在前面加 _r_ 或 _R_ ;
- 正则应使用原始字符串；如：_'\\1'_ 或 _r'\1'_.

**Example**

```Python
# 前缀加 r 原始字符串
print(r'NewLines are indicated by \n')

# Run Result
NewLines are indicated by \n
```

### Variables 变量

- **命名** 首位必须字母 or 下划线,其后可以是字母 or 下划线 or 数字，大小写敏感；
- 变量只需被赋予某一值。不需要声明或定义数据类型;

**Example** 使用变量与字面常量

```Python
i = 5
print(i)
i = i+1
print(i)

s = '''This is a multi-line string.
This is the second line.'''
print(s)


# Run Result
5
6
This is a multi-line string.
This is the second line.
```

### Physical Line(逻辑行) Logical Line(物理行)

- **Physical Line** 编写程式时，所看到的内容;
- **Logical Line** Python 看到的单个语句；
- Python 假定每一 _Physical Line_ 对应一个 _Logical Line_;
- **;** 一行物理行中指定多行逻辑行,明确表示逻辑行或语句的结束；
- 对于每一物理行最多只写入一行逻辑行，也就是尽可能不用 _;_ 号;
- **Explicit Line Joining** 可以通过反斜杠将长代码拆分长多个物理行;

**Example** 几种写法

```Python
i = 5
print(i)

i = 5;
print(i);

i = 5; print(i);

i = 5; print(i)
# Run Result
```

**Example** Explicit Line Joining 显示行连接

```Python
s = 'This is a string. \
This continues the string.'
print(s)

# Run Result
This is a string. This continues the string.
```

### Indentation 缩进

- 空白区，在各行开头非常重要;
- 在逻辑行的开头留下空白区用以确定各逻辑行的缩进级别，以及语句的分组;
- 放置在一起的语句 **必须** 拥有相同的缩进,每组被称为 _block_ (块);

---

# Operators Expressions

- **Expressions** 逻辑行语句包含表达式,可拆分为 _Operators_ 与 _Operands_;

### Operators 运算符

- 需要数据进行操作， 被操作数据称为 _Operands_ (操作数);

**Example** 运算符

```Python
# +  加运算：两个对象相加
print(10 + 3)     # Run Result: 13
print('a' + 'b')      # Run Result: 'ab'

# -  减运算：从一个数中减去另一个数,若第一个操作数不存在,则假定为0
print(10 - 3)     # Run Result: 7
print(-5.2)     # Run Result: -5.2

# *  乘运算：给出两个数的乘积,或返回字符串重复指定次数后的结果
print(10 * 3)     # Run Result: 30
print('la' * 3)       # Run Result: 'lalala'

# ** 乘方运算：返回 x 的 y 次方
print(10 ** 3)        # Run Result： 1000
print(3 ** 4)     # Run Result: 81

# /  除运算：x 除以 y
print(13 / 3)     # Run Result: 4.333333333333333

# // 整除运算：x 除以 y，并对结果向下取整至最接近的整数
print(13 // 3)        # Run Result: 4
print(-13 // 3)       # Run Result: -5

# % 取模运算：返回除法运算后的余数
print(13 % 3)       # Run Result: 1
print(-25.5 % 2.25)     # Run Result: 1.5

# << 左移：将数字的位向左移动指定的位数(每个数字在内存中以二进制数表示,即0和1)
print(2 << 2)       # Run Result: 8 (2 用二进制表示为10；向左移2位得到1000，该值表示十进制中的8)

# >> 右移：将数字的位向右移动指定的位数
print(11 >> 1)      # Run Result: 5 (11 在二进制中表示为1011，右移一位为101，该值表示十进制中的5)

# & 按位与 ：对数字进行按位与操作
print(5 & 3)        # Run Result: 1

# | 按位或：对数字进行按位或操作
print(5 | 3)        # Run Result: 7

# ^ 按位异或：对数字进行按位异或操作
print(5 ^ 3)        # Run Result: 6

# ~ 按位取反：x 的按位取反结果为 -(x+1)
print(~5)       # Run Result: -6

# < 小于：返回x 是否小于 y，所有的比较运算符返回的结果均为 True 或 False(注意首字母大写)
print(5 < 3)        # Run Result: False
print(3 < 6)        # Run Result: True
print(3 < 5 < 7)        # Run Result: True

# > 大于：返回 x 是否大于 y (注：首先转为共同类型,否则将返回 False)
print(5 > 3)        # Run Result: True

# <= 小于等于：返回 x 是否小于等于 y
x = 3; y = 6; print(x <= y)     # Run Result: True

# >= 大于等于：返回 x 是否大于等于 y
x = 4; y = 3; print(x >= y)      # Run Result: True

# == 比较两个对象是否相等
x = 2; y = 2; print(x == y)     # Run Result: True
x = 'str'; y = 'stR'; print(x == y)     # Run Result: False
x = 'str'; y = 'str'; print(x == y)     # Run Result: True

# != 不等于：比较两个对象是否不相等
x = 2; y = 3; print(x != y)     # Run Result: True

# not 布尔"非"：如果 x 是 True,则返回 False;如果 x 是False,则返回 True
x = True; print(not x)      # Run Result: False

# and 布尔"与"：如果 x 是False，则 x and y 返回 False，否则返回 y 的计算值
x = False; y = True; print(x and y)     # Run Result: False (当确定表达式左边为False时，整个表达式为False)

# or 布尔"或"：如果 x 是 True,则返回 True，否则返回 y 的计算值
x = True; y = False; print(x or y)      # Run Result: True
```

### 数值运算与赋值的快捷方式

- 对一个变量进行一项数学运算，并将运算结果返回给该变量
- _变量 = 变量 运算 表达式_ 演变成 _变量 运算 = 表达式_;

**Example**

```Python
a = 2
a = a * 3
print(a)

a = 2
a *= 3
print(a)


# Run Result
6
6
```

### 求值顺序

- _Python_ 优先计算表中较高优先级的运算符与表达式;
- 可使用 _()_ 对运算符及操作数进行分组,明确优先级.

**Example** 同行运算符具有相同优先级

```Python
lambda :Lambda 表达式
if - else : 条件表达式
or :布尔"或"
and : 布尔"与"
not x :布尔"非"
in, not in, is, is not, <, <=, >, >=, !=, == :比较
| :按位或
^ :按位异或
& :按位与
<<, >> :移动
+, - :加与减
*, /, //, % :乘，除，整除，取余
+x, -x, ~x :正，负，按位取反
** :求幂
x[index], x[index:index], x(arguments...), x.attribute :下标，切片，调用，属性引用
(expressions...), [expressions...], {key: value...}, {expressions...} :绑定或元组，表示列表，表示字典，表示集合
```

### 表达式

**Example** 求矩形的面积和周长

```Python
length = 5
breadth = 2
area = length * breadth
print('Area is',area)
print('Perimeter is', 2 * (length + breadth))

# Run Result
Area is 10
Perimeter is 14
```

# Control Flow for Python

**　　控制流 - 《A Byte of Python》**

### if 语句

- 用于查询条件,如果条件为真(True),将运行一块语句，否则运行另一块,else 从句可选;

**Example** 输入数字,与 _number_ 比较

```Python
number = 23
guess = int(input('Enter an integer : '))

if guess == number:
    print('YES!')           # 运行该语句块
    print('YESSSS!')
elif guess < number:
    print('NO!')        # 运行该语句块
else:
    print('NO,NO,NO!')

print('Done')


# Run Result
Enter an integer : 50
NO,NO,NO!
Done

Enter an integer : 22
NO!
Done

Enter an integer : 23
YES!
YESSSS!
Done
```

### while 语句

- 在条件为真的前提下,重复执行某块语句;
- 拥有 _else_ 子句作为可选选项;

**Example** 扩展上面实例,增加 _while_

```Python
number = 23
running = True

while running:
    guess = int(input('Enter an integer : '))

    if guess == number:
        print('YES!')       # 运行该语句块
        running = False     # 终止while的循环
    elif guess < number:
        print('NO!')        # 运行该语句块
    else:
        print('NO,NO,NO!')

else:
    print('While loop is over')

print('Done')


# Run Result
Enter an integer : 50
NO,NO,NO!
Enter an integer : 22
NO!
Enter an integer : 23
YES!
While loop is over
Done
```

### for 语句

- 在一些列对象上进行迭代

**Example**

```Python
for i in range(1, 5):
    print(i)
else:
    print('The for loop is over')

# Run Result
1
2
3
4
The for loop is over
```

### break 语句

- 终止循环语句的执行;
- 若中断了 _for_ 或 _while_ 循环，任何内中 _else_ 语句块都不会执行

**Example** 输入内容,打印该内容字符串长度,如果是 _quit_ ，则停止循环

```Python
while True:
    s = input('Enter something : ')
    if s == 'quit':
        break
    print('Length of the string is ', len(s))
print('Done')

# Run Result
Enter something : programming is fun
Length of the string is  18
Enter something : when the work is done
Length of the string is  21
Enter something : if you wanna make your work also fun:
Length of the string is  37
Enter something : use Python!
Length of the string is  11
Enter something : quit
Done
```

### continue 语句

- 跳过当前循环块中的剩余语句,并继续该循环的下一次迭代;

**Example** 输入任意字符,判断是否小于 3 个,小于则继续迭代,否则打印文字

```Python
while True:
    s = input('Enter something : ')
    if s == 'quit':
        break
    if len(s) < 3:
        print('Too small')
        continue
    print('Input is of sufficient length')

# Run Result
Enter something : a
Too small
Enter something : 12
Too small
Enter something : abc
Input is of sufficient length
Enter something : quit
```

# Functions for Python

**　　函数 - 《A Byte of Python》**

### 释义

- 可重复使用的程式片段,允许为某个代码块命名;
- 允许通过该名在程式任何地方,不限次数的调用(Calling)该函数;
- 通过关键字 _def_ 来定义,后面跟函数标识符名称,再跟一对 _()_ , _:_ 结尾；

**Example** 定义并调用函数

```Python
def say_hello():
    print('Hello world')    # 函数中的语句
# 函数结束

say_hello()     # 调用函数
say_hello()     # 调用函数


# Run Result
Hello world
Hello world
```

### 函数参数

- 在定义函数是给定的名称叫做 _Parameters_ (形参);
- 在调用函数时提供给函数的值叫做 _Arguments_ (实参);

**Example** 比较两个数字

```Python
def print_max(a, b):
    if a > b:
        print(a, 'is maximum')
    elif a == b:
        print(a, 'is equal to', b)
    else:
        print(b, 'is maximum')

print_max(3, 4)     # 直接传递字面值

x = 5
y = 7

print_max(x, y)     # 以参数形式传递变量


# Run Result
4 is maximum
7 is maximum
```

### 局部变量

- 不会与函数之外同名变量冲突；
- _Local_ (局部) ， _Scope_ (作用域)

**Example**

```Python
x = 50

def func(x):
    print('x is', x)
    x = 2
    print('Changed local x to', x)

func(x)
print('x is still', x)


# Run Result
x is 50
Changed local x to 2
x is still 50
```

### global 语句

- 全局变量,在程式顶层的变量赋值，不存在于任何作用域中;

**Example**

```Python
x = 50

def func():
    global x

    print('x is', x)
    x = 2
    print('Changed global x to', x)

func()
print('value of x is', x)


# Run Result
x is 50
Changed global x to 2
value of x is 2
```

### 默认参数值

- 定义时附加 _=_ ,为参数指定默认参数值;
- 默认参数值为常数，不可变数;
- 需位于参数列表末尾；

**Example** 打印内容

```Python
def say(message, times=1):
    print(message * times)

say('Hello')    # 打印字符串
say('World ', 5)    # 打印五个


# Run Result
Hello
World World World World World
```

### 关键字参数

- _Keyword Arguments_ ，无需考虑参数顺序，函数的使用将更加容易；
- 给部分参数赋值，其它参数默认值;

**Example**

```Python
def func(a, b=5, c=10):
    print('a is', a, 'and b is', b, 'and c is', c)

func(3, 7)
func(25, c=24)
func(c=50, a=100)


# Run Result
a is 3 and b is 7 and c is 10
a is 25 and b is 5 and c is 24
a is 100 and b is 5 and c is 50
```

### 可变参数

- 使用星号,定义函数中任意数量的变量,参数数量可变;
- 单个星号为元组，双个星号为字典；

**Example**

```Python
def total(a=5, *numbers, **phonebook):
    print('a', a)

    # 遍历元组中的所有项目
    for single_item in numbers:
        print('single_item', single_item)

    # 遍历字典中的所有项目
    for first_part, second_part in phonebook.items():
        print(first_part, second_part)

print(total(10, 1, 2, 3, Jack=1123, John=2231, Inge=1560))


# Run Result    输出结果的顺序不同
a 10
single_item 1
single_item 2
single_item 3
Jack 1123
John 2231
Inge 1560
None

```

### return 语句

- 用于从函数中返回,在中断函数中返回一个值;
- 如果没有搭配值,则返回 _None_ ；
- 每个函数末尾隐含 _return None_ ，除非自定义 _return_ 语句;

**Example** 返回参数中的最大值

```Python
def maxmun(x, y):
    if x > y:
        return x
    elif x == y:
        return 'The numbers are equal'
    else:
        return y
print(maxmun(2, 3))

# Run Result
3
```

### DocStrings 文档字符串

- 能够更好地记录程序并让其更加易于理解,可以通过一个函数来获取文档;
- 使用 _**doc**_ ,输出了三引号中的内容；
- _help()_ 获取函数中的 _**doc**_ 属性,整洁的打印出来; 按 _q_ 退出*help*;

**Example**

```Python
def print_max(x, y):
    '''打印两个数值中的最大数
    两个数都应该是整数'''
    # 如果可能，将其转换至整数类型
    x = int(x)
    y = int(y)

    if x > y:
        print(x, 'is maximum')
    else:
        print(y, 'is maximum')

print_max(3, 5)
print(print_max.__doc__)


# Run Result
5 is maximum
打印两个数值中的最大数
    两个数都应该是整数
```
