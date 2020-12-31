## 一维数组

- 顺序存储同类型的多个数据,通过索引访问某个元素;
- 索引长度为：0 - (n-1);

**Example** 找出数组中最大元素

```C#
/// <summary> 声明、创建、初始化一个数组 </summary>
private int[] nums = { 1, 3, 5, 7, 9 };

/// <summary> 获取数组中最大元素 </summary>
/// <param name="val"> 数组 </param>
/// <returns> 最大元素 </returns>
private int getmaxnum(int[] val)
{
	// 声明局部变量,初始化赋值参数的第一个元素
	int max = val[0];

	// 遍历该数组的所有元素
	for(int i = 1; i < val.Length; i++)
	{
		if(val[i] > max) // 如果某元素大于max的值
		{ max = val[i]; }// 将其赋值给max
	}
	return max; // 返回最大元素
}

private void OnEnable()
{
	int maxValue = GetMaxNum(nums); // 调用获取最大元素函数
	print(string.Format("Max Num is :{0}", maxValue));
}

//  Run Result :
    Max Num is :9
```

**Example** 计算数组中所有元素的平均值

```C#
/// <summary> 声明、创建、初始化一个数组 </summary>
private int[] nums = { 1, 3, 5, 7, 9 };

/// <summary> 获取元素的平均值 </summary>
/// <param name="val"> 数组 </param>
/// <returns> 平均值 </returns>
private float GetAverage(int[] val)
{
	// 局部变量用于存储所有元素的和
	float sum = 0.0f;
	// 遍历该数组的所有元素
	for(int i = 0; i < val.Length; i++)
	{ sum += val[i]; }// 将所有元素相加

	return sum / val.Length; //返回 相加结果/数组长度
}

private void OnEnable()
{
	// 调用计算数组中所有元素平均值函数
	float average = GetAverage(nums);
	print(string.Format("Average Num is :{0}", average));
}

//  Run Result :
    Average Num is :5
```

**Example** 复制数组

```C#
/// <summary> 声明、创建、初始化一个数组 </summary>
private int[] nums = { 1, 3, 5, 7, 9 };

/// <summary> 复制数组 </summary>
/// <param name="val"> 数组 </param>
/// <returns> 复制的数组 </returns>
private int[] CopyArray(int[] val)
{
	// 局部变量,用于接收复制来的数组
	int[] copy = new int[val.Length];
	// 遍历数组,将其元素逐个复制给局部变量
	for(int i = 0; i < val.Length; i++)
	{ copy[i] = val[i]; }
	return copy;
}

private void OnEnable()
{
	int[] copyArray = CopyArray(nums);
	for(int i = 0; i < copyArray.Length; i++)
	{
		print(string.Format("Copy Array is:{0}", copyArray[i]));
	}
}

//  Run Result :
    Copy Array is:{1,3,5,7,9}
```

**Example** 翻转数组中的所有元素

```C#
/// <summary> 声明、创建、初始化一个数组 </summary>
private int[] nums = { 1, 3, 5, 7, 9 };

/// <summary> 翻转数组中的所有元素 </summary>
/// <param name="val"> 数组 </param>
/// <returns> 翻转结果 </returns>
private void ReverseArray(int[] val)
{
	int temp = 0; //临时遍历,用于暂存需要变换位置的元素

	for(int i = 0; i < val.Length / 2; i++)
	{
		temp = val[i];
		val[i] = val[val.Length - 1 - i];
		val[val.Length - 1 - i] = temp;
	}
	// 该遍历用于log测试
	for(int i = 0; i < val.Length; i++)
	{ print(val[i] + " "); }
}

private void OnEnable() {ReverseArray(nums);}

//  Run Result :
    9,7,5,3,1
```

## 多维数组

**Example** 声明、初始化、访问/赋值某元素

```C#
// 声明创建一个四行两列的二维数组
int[,] array = new int[4, 2];

// 声明创建一个三维数组
int[,,] array1 = new int[4, 2, 3];

// 声明并初始化一个二维数组 该数组表述三行,每行两列
int[,] array2 = new int[,] {
	{ 1, 2 },
	{ 3, 4 },
	{ 5, 6 }
};

// 声明并初始化一个指定阵列的二维数组 该数组表示四行,每行两列
int[,] array3 = new int[4, 2] {
	{ 1, 2 },
	{ 3, 4 },
	{ 5, 6 },
	{ 7, 8 }
};

// 声明一个字符串数组 三行,每行两列
string[,] arrayStr = new string[3, 2] {
	{"one","two" },
	{ "three", "four" },
	{ "five", "six" }
};

// 声明并初始化一个多维数组 该数组表示:两行,每行中又有两行,复有三列
int[,,] array4 = new int[2, 2, 3] {
	{
		{ 1,2,3},
		{4,5,6 }
	},
		{
			{7,8,9 },
			{10,11,12 }
		}
};

// 无秩序的初始化数组
int[,] array5 = { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } };

// 给数组中某个元素赋值
array5[2, 1] = 25; // 将 6 改成 25

// 获取特定数组元素的值
int elementValue = array5[2, 1]; // 该值为：25 (因为上一步中重新设置了该值)

// 将数组元素初始化为默认值 {交错数组除外}
int[,] array6 = new int[10, 10];


//  Run Result :

```

## jagged-arrays 交错数组

- 声明：_int[][]_ 即,数组中每个元素都是一个一维数组;
- 只能指定顶级数组的纬度长度(也就是前*[]*);
- 若采用*分布声明数组元素*的方式，前者元素个数必须指定;
- 需再创建每个数组中的数组;其元素个数,可相同,亦可不同.
- 前者为数值类型,默认值为零;后者为引用类型,默认值为 null;

**Example** 声明、初始化、访问/赋值某元素

```C#
private void OnEnable()
{
	// 声明一个交错数组 ,该数组有三个元素,每个元素中一维数组的数暂不固定
	int[][] jaggedArray = new int[3][];

	// 初始化交错数组的元素
	jaggedArray[0] = new int[5]; // 第一个元素中的一维数组有五个数
	jaggedArray[1] = new int[] { 1, 2, 3 }; // 第二个元素中的一维数组有三个数
	jaggedArray[2] = new int[2]; //

	// 缩写形式
	int[][] jaggedArray2 ={
		new int[5],
		new int[]{ 1,2,3},
		new int[2]
	};

	// 访问某个数组元素
	jaggedArray[0][3] = 33; // 第一个元素里数组中的第4个数字是33
	jaggedArray[2][1] = 66; // 第三个元素里数组中的第2个数字是66

//  Run Result :

}
```

**Example** 交错与多维混合使用

```C#
private void OnEnable()
{
	int[][,] jaggedArray = new int[3][,] {
		// 交错数组第一个元素
		new int[,]{ {1,3 },{5,7 } }, // 该元素中的多维数组表示两行两列
		// 交错数组第二个元素
		new int[,]{ {0,2 },{4,6 },{8,10 } }, // 该元素中多维数组表示两行三列
		//交错数组第三个元素
		new int[,]{ {11,22 },{66,88 },{0,9 } } // 该元素中多维数组表示两行三列
	};

	// 过去第一个元素中[1,0]的值
	print(jaggedArray[0][1, 0]); // 值为：5

//  Run Result :
	5
}
```

**Example** 生成一个数组,其元素为自身,皆有不同大小

```C#
//声明一个多维数组
int[][] arr = new int[2][];

//初始化多维数组中的元素
arr[0] = new int[5] { 1, 3, 5, 7, 9 };
arr[1] = new int[4] { 2, 4, 6, 8 };

//遍历数组中的元素
for(int i = 0; i < arr.Length; i++)
{
	print(string.Format("Element({0}):", i)); // 打印每个元素

	// 遍历每个元素中的每个数组
	for(int j = 0; j < arr[i].Length; j++)
	{
		// 打印数组中每个元素,如果是最后一个元素不带空格,否则在值后加空格
		print(string.Format("{0}{1}", arr[i][j], j == (arr[i].Length - 1) ? "" : " "));
	}
}

//  Run Result :
	Element(0): 1 3 5 7 9
    Element(1): 2 4 6 8
```

**Example**

```C#
private void OnEnable()
{
	//声明并初始化一个交错数组,2表示该数组中有两个元素
	int[][] num = new int[2][];
	// 初始化数组中,第一个元素中的一维数组
	num[0] = new int[3] { 1, 2, 3 };
	// 初始化数组中,第二个元素中的一维数组
	num[1] = new int[4] { 4, 5, 6, 7 };

	for(int i = 0; i < 3; i++)
	{
		//打印数组中第一个元素中初始化的一维数组所有值
		print(string.Format("交错数组第一个元素:{0} ", num[0][i]));
	}

	for(int i = 0; i < 4; i++)
	{
		// 打印交错数组中第二个元素中初始化的一维数组所有值
		print(string.Format("交错数组第二个元素：{0} ", num[1][i]));
	}
}

//  Run Result :
    交错数组第一个元素:1,2,3;
    交错数组第二个元素:4,5,6,7;
```

# ０１．Use Property - 使用属性

## Property

- 读取、写入或计算私有字段的值;
- 可用作公共数据成员，实际是称为访问器的特殊函数;
- 可以轻松访问数据，有助于提高函数的安全性和灵活性；
- get 返回读取的字段值；set: 字段分配的新值;

## 可搭配的修饰符

- public、private、protected、internal
- virtual、 abstract、override、sealed
- 使用 static,即便不存在类的实例，也可以在任何时候使用；

## Effective

- 所有数据成员都应该是 Private 的;
- 需要在类型的 public 或保护接口中暴露数据，都应该使用属性;
- 索引器属性，暴露序列或字典，使用 this 关键字声明，不能用 C＃命名索引器；
- 属性能够立即得到数据绑定的支持，便于日后对函数实现的各种修改;

** 1.1 使用属性，字段值合法化**

```C#
//月份合法化
public class Date
{
    private int month = 7;

    public int Month
    {
        get { return month; }
        set {
            if((value > 0) && (value < 13))
            { month = value; }
        }
    }
}
//name不为空
private string name;
public string Name
{
    get { return name; }
    set {
        if(string.IsNullOrEmpty(value))
            throw new Exception("Name cannot be blank(空白)");
        name = value;
    }
}
```

** 1.2 属性的多线程支持**

```C#
private object syncHandle = new object();//多线程访问
private string name;
public string Name
{
    get {
       lock(syncHandle) //线程锁
            return name;
    }
    set {
       if(string.IsNullOrEmpty(value))
            throw new ArgumentException("Name cannot be blank(空白)", "Name");
        lock(syncHandle)
            name = value;
    }
}
```

** 1.3 Virtual 虚属性**

```C#
public virtual string Name { get; set; }
```

** 1.4 泛型接口中定义属性**

```C#
public interface IExample<T>
{
    string Name { get; }
    T Value { get; set; }
}
```

** 1.5 控制属性暴露出来的数据成员的可见性**

```C#
public virtual string NameE { get; protected set; }
```

** 1.6 属性索引器**

```C#
public int this[int index]
{
    get { return theValues[index]; }
    set { theValues[index] = value; }
}
// Accessing an indexer:
int val = someObject[i];
```

** 1.7 其他索引器可以使用非整数参数来定义映射和字典**

```C#
public Address this[string name]
{
    get { return adressValues[name]; }
    set { adressValues[name] = value; }
}
```

** 1.8 创建多维索引，具有相似或不同类型的每个轴**

```C#
public int this[int x, int y] {get { return ComputeValue(x, y); }}
public int this[int x, string name] { get { return ComputeValue(x, name); } }
```

每个不同的索引器必须有不同的参数列表以避免模糊；
几乎所有属性的功能都适用于索引器，可以是虚拟的或抽象的;
可以对 setter 和 getter 有单独的访问限制，无法像使用属性一样创建隐式索引器。

** 1.9 Abstract 抽象属性的继承**

```C#
/// <summary> 抽象类 </summary>
public abstract class AbstractTest : MonoBehaviour
{
    protected int x = 100; // 受保护 字段
    public abstract int X { get; } // 公有 抽象 属性

    // 调用派生类初始化函数
    private void Awake() { OnInit(); }

    // 用于派生类重写的抽象函数
    public abstract void OnInit();
    public abstract void AbstractMethod();
}

/// <summary> 派生类 </summary>
public class Test : AbstractTest
{
    public override int X { get { return x + 10; } }
    public override void OnInit()
    {
        AbstractMethod();
        //属性，非字段 ：Test:111
        Debug.Log("Test:" + X);
    }

    public override void AbstractMethod()
    { x++; }
}
```

** 1.10 Interface + Abstract + Event + Delegate**

- ITest.cs 定义接口约束：属性，事件
- BaseTest.cs 继承接口，实现接口中的约束
- Test.cs 继承抽象基类，重写初始化函数

```C#
/// <summary> Interface 定义接口 </summary>
public interface ITest
{
    int X { get; } //属性
    int Y { get; }
    string Str { get; } //属性
    event Action OnInit; //事件
}
```

```C#
/// <summary> Abstract 定义抽象基类，继承接口 </summary>
public abstract class BaseTest : MonoBehaviour, ITest
{
    #region 实现ITest接口的所有约定
    private int x;
    public int X { get { return x + 100; } }

    protected int y;
    public int Y { get { return y; } }

    private string str;
    public string Str { get { return str + "Name"; } }

    public event Action OnInit = delegate { }; //委托事件
    #endregion

    /// <summary> 程式入口 </summary>
    private void Awake()
    {
        x = 20;
        str = "Awake()";
        Init();
    }

    /// <summary> 发送初始化事件,在派生类调用，用于判断子类是否初始化完成 </summary>
    protected void SendInit()
    {
       string s = "初始化完毕！";
        OnInit();
        Debug.Log("S:" + s);
    }

    /// <summary> 用于派生类的初始化函数 </summary>
    protected abstract void Init();
}
```

```C#
/// <summary> 派生类 </summary>
public class Test : BaseTest
{
    /// <summary> 重写初始化函数 </summary>
    protected override void Init()
    {
        y = 20;
        // Awake()Name|| V3:120,20
        Debug.Log(Str + "|| V3:" + X + "," + Y);
        SendInit();//派生类初始化完成
    }
}
/*输出结果：
Awake()Name|| V3:120,20
S:初始化完毕！*/
```

---

# ０２．Readonly & Const - 二者区别

## 编译期常量(const):

- 快速,但不灵活;
- 仅能用于 int,float,string 等数字和字符串;
- 值在目标代码中进行替换(例 2.2);
- 使用:特性(attribute)的参数和枚举定义,版本号标识等;

## 运行时常量(readonly):

- 略慢，但保证正确;
- 必须在构造函数或初始化器中初始化;
- 值保存实例常量，为类的每个实例存放不同的值;
- 使用:非 const 的情况之外，尽量使用 readonly;

求值方式不同，将会影响运行时的兼容性(例 2.4);在版本号中使用(例 2.5);

** 2.1 Readonly 与 Const 的声明**

```C#
// Compile time constant:
public const int Millennium = 2000;
//Runtime constant:
public static readonly int ThisYear = 2018;
```

** 2.2 const 的值是在目标代码中进行替换**

```C#
/*readonly运行时求值。引用readonly常量生成的IL将引用到readonly的变量，非是变量的值;*/
if (myDateTime.Year == Millennium)
//与以下代码编译成同样的IL(微软中间语言)
if (myDateTime.Year == 2000)
```

** 2.3 readonly 声明 DateTime 类型**

```C#
//指定某个readonly值为一个DateTime结构
public readonly DateTime Year = new DateTime(2018, 01, 06);
```

** 2.4 const 与 readonly 的求职方式，会影响运行时的兼容性**

```C#
public class UsefulValues
{
    public static readonly int StartValue = 5;
    public const int EndValue = 10;
}
```

在另一个程序集中，引用这些值:

```C#
for(int i = UsefulValues.StartValue; i < UsefulValues.EndValue; i++)
   { Console.WriteLine("value is{0}", i); } //输出5，6，7，8，9}
```

某日需要发布基础架构程序集的新版本，并进行以下更改:

```C#
public class UsefulValues
{
    public static readonly int StartValue = 105;
    public const int EndValue = 120;
}
```

结果没有任何输出。因为 for 中使用 105 作为起始值，但 10 仍然是结束条件;<br>
StarValue 声明为 readonly 所以在运行时使用了新的值 105;<br>
EndValue 声明为 const 被看作是对类型接口的修改,须重新编译所有引用该常量的代码.<br>
** 2.5 const 标记版本号与 readonly 标记当前版本号**

```C#
/* const用来标记特定版本号的值，因为它永远不会改变；readonly标记当前版本号的值*/
private const int Version1_0 = 0x0100;
private const int Version1_1 = 0x0101;
private const int Version1_2 = 0x0102;
//major(主要)release(版本):
private const int Version2_0 = 0x0200;

//check for the current version:检查当前版本
private static readonly int CurrentVersion = Version2_0;

// Read from persistent storage, check
// stored version against compile-time constant:
protected MyType(SerializationInfo info, StreamingContext cntxt)
{
    int storedVersion = info.GetInt32("VERSION");
    switch (storedVersion)
    {
        case Version2_0:
            readVersion2(info, cntxt);
        break;
        case Version1_1:
            readVersion1Dot1(info, cntxt);
        break;
        // etc.
    }
}
// Write the current version:
[SecurityPermissionAttribute(SecurityAction.Demand, SerializationFormatter = true)]
void ISerializable.GetObjectData(SerializationInfo inf, StreamingContext cxt)
{
    // use runtime constant for current version:
    inf.AddValue("VERSION", CurrentVersion);
    // write remaining elements...
}
```

---

# ０３．IS & As - Prefer the is or as Operators to Casts

## 概述：

- 对 object 转换为特定类型:使用 is 测试转换能否成功,再用 as 或强转;
- 对于强转来说,as 更加安全高效。不过 as 和 is 都不会执行自定义的转换;
- 当运行时类型附和目标类型才能转换成功，不会再转换时创建新的对象;
- as 不能配合值类型使用;使用 is 来避免抛出异常或转换(例 3.2);
- 仅当不能使用 as 进行转换时，才使用 is。否则 is 就是多余的;
- foreach 循环语句使用的是强转;

** 3.1 将任意类型转换为 MyType**

```C#
object o = Factory.GetObject();
MyType t = o as MyType;
if (t != null) { /* work with t, it's a MyType. */ }
else { /* report the failure. */ }

public class SecondType
{
    private MyType _value;
    // other details elided
    // Conversion operator.
    // This converts a SecondType to a MyType, see item 9.
    public static implicit operator MyType(SecondType t) { return t._value; }
}
```

** 3.2 使用 is 语句来避免异常或转换**

```C#
object o = Factory.GetValue();
int i = 0;
if (o is int) i = (int)o;
```

若 o 是可以转换成 int 的类型，is 返回 false;若参数为 null，is 返回 false。

---

# Delegate for C

**　　委托**

## delegate 概述

- 一种引用类型,可以对具有特定参数列表和返回类型的函数引用；
- 在实例化委托时,可以将其实例与任何具有兼容签名和返回类型的函数关联；
- 可以通过委托实例调用函数;

### delegate 声明\*\*

- delegate 关键字；
- 可无返回值，可指定返回值类型；
- 可无参数，可多参数;

**Example** 输出棋的类型

```C#
/// <summary> 使用委托输出棋的类型 </summary>
public class DelegateTest : MonoBehaviour
{
    //delegate <return-type> <delegate-name> (<Parameters list>)
    /// <summary> 声明一个无返回单参数的委托  </summary>
    /// <param name="str"> string类型参数 </param>
    public delegate void Chess(string str);

    /// <summary> 启用时 </summary>
    private void OnEnable()
    {
        #region C# 实例化委托 传统写法
        Chess chess1 = new Chess(Tictactoe);
        chess1("Tictactoe");
        #endregion

        #region C# 2.0  写法
        Chess chess2 = FourChess;
        chess2("FourChess");
        #endregion

        #region C#2.0 匿名函数写法
        Chess chess3 = delegate (string str) { print(string.Format("I am {0} for Chess", str)); };
        chess3("FiveChess");
        #endregion

        #region lambda 表达式写法
        Chess chess4 = str => { print(string.Format("I am {0} for Chess", str)); };
        chess4("GoChess");
        #endregion
    }

    private void Start() { }

    /// <summary> 禁用时 </summary>
    private void OnDisable() { }

    /// <summary> 井字棋 </summary>
    /// <param name="str">  </param>
    private void Tictactoe(string str) { print(string.Format("I am {0} for Chess", str)); }

    /// <summary> 四国战棋 </summary>
    /// <param name="str">  </param>
    private void FourChess(string str) { print(string.Format("I am {0} for Chess", str)); }
}

// Run Result
// I am Tictactoe for Chess
// I am FourChess for Chess
// I am FiveChess for Chess
// I am GoChess for Chess
```

### Action

- 封装一个方法，该方法不具有参数且不返回值。

可用于将方法作为参数传递而不用显式声明自定义委托。
封装的方法必须对应于此委托定义方法签名。 这意味着，封装的方法必须具有任何参数，没有返回值。 (在 C# 中，该方法必须返回 void。 它还可返回一个值，将被忽略的方法。） 通常，这种方法用于执行操作。

### 实现添加、移除字符串

抽象类不能实例化，需实例化派生类，或继承 mono，以添加组件的方式挂载到物体上。

```C#
/// <summary> 基础事件抽象类 </summary>
public abstract class BaseEvent : MonoBehaviour
{
    /// <summary> 声明委托类型的添加字符串事件 </summary>
    public event Action<string> OnAddString = delegate { };
    /// <summary> 声明委托类型的移除字符串事件 </summary>
    public event Action<string> OnRemoveString = delegate { };

    /// <summary> BaseEvent 的初始化函数 </summary>
    public void InitBE() { OnInitBE(); }

    /// <summary> 添加字符串事件实现 在派生类中使用 </summary>
    /// <param name="str"></param>
    protected void AddString(string str) { OnAddString(str); }

    /// <summary> 移除字符串事件实现 在派生类中使用 </summary>
    /// <param name="str"></param>
    protected void RemoveString(string str) { OnRemoveString(str); }

    /// <summary> BaseEvent 用于派生类重写的初始化函数 </summary>
    internal abstract void OnInitBE();
}
```

```C#
/// <summary> 抽象基础测试类 </summary>
public abstract class BaseTest : MonoBehaviour
{
    /// <summary> 声明基础事件类变量 </summary>
    protected BaseEvent baseEvent;

    /// <summary> 程式入口 </summary>
    private void Awake()
    {
        // 在该物体上获取基础事件类组件
        baseEvent = this.GetComponent<BaseEvent>();
        //基础事件类的添加字符串函数事件 += 添加字符串事件
        baseEvent.OnAddString += BEAddString;
        //基础事件类的一处字符串函数事件 -= 移除字符串事件
        baseEvent.OnRemoveString -= BERemoveString;
    }

    /// <summary> 调用派生类初始化函数 </summary>
    private void Start() { OnInitBM(); }

    /// <summary> BaseEvent 添加字符串事件对应函数 </summary>
    /// <param name="obj"></param>
    private void BEAddString(string obj) { }

    /// <summary> BaseEvent 移除字符串事件对应函数 </summary>
    /// <param name="obj"></param>
    private void BERemoveString(string obj) { }

    /// <summary> BaseMaps 用于派生类重写的初始化函数 </summary>
    public abstract void OnInitBM();
}
```

负责管理 BaseEvent 这个类在什么时候开始发挥作用。

```C#
/// <summary> 动态测试类 </summary>
public class DynaminTest : BaseTest
{
    /// <summary> 重写初始化函数 </summary>
    public override void OnInitBM()
    {
        baseEvent.InitBE();//调用基础事件类的初始化函数
    }
}
```

```C#
/// <summary> 动态添加移除事件 </summary>
public class DynaminEvent : BaseEvent
{
    /// <summary> 声明动态 </summary>
    private DynaminTest dynaminTest;

    string str = "这是一个初始值！";
    int i = 0;

    /// <summary> 重写初始化函数 </summary>
    internal override void OnInitBE()
    {
        // 物体上获取DynaminTest类
        dynaminTest = this.gameObject.GetComponent<DynaminTest>();
    }

    /// <summary> 测试添加，移除字符串 </summary>
    private void Update()
    {
        if(Input.GetMouseButtonUp(0))
        {
            AddString(str);
            Debug.Log("AddString:" + str);
        }
        if(Input.GetMouseButtonUp(1))
        {
            RemoveString(str);
            Debug.Log("RemoveString:" + str);
        }
    }
}
```

---

---

# DLL Create And Use for C

**　　 C# DLL 创建及在 Unity 中使用**

### 自封类 DLL 及使用

**创建 DLL** 1.新建 VS 项目 － 类库(.NET Framework) － "Your Projcet's Name" － 确定;

```C#
namespace Utility //命名空间
{
    public class Class1  //类1
    {
        public int Add(int a,int b){return(a+b);}
    }

    public class Class2  //类2
    {
        public int Mulitiply(int x,int y){return(x*y);}
    }
}
```

2.项目右键 － 属性 － 对该 DLL 进行设置 － 生成; 3.在 bin － Debug 文件夹中，找到该 DLL 文件 - 拷贝至 Unity 工程;

**使用 DLL**
1.Unity 中新建类，使用该 DLL

```C#
using Utility; //引用DLL
namespace Assets.Main.Scripts.Unit //命名空间
{
    /// <summary> 测试类 </summary>
    public class Test : MonoBehaviour
    {
        private void Awake()
        {
            Debug.Log(Class1.Add(2, 5)); //调用Class1中的函数
            Debug.Log(Class2.Mulitiply(2, 5)); //调用Class2中的函数
            // Input Result: 7   10
        }
    }
}
```

### 自封接口 DLL 及使用

**接口用于 DLL 调用**

- 接口定义必须含*public*修饰；

**IMathClass.cs 算数接口**

```C#
namespace Other.Test2
{
    /// <summary> 算数接口 </summary>
    public interface IMathClass
    {
        /// <summary> 属性 </summary>
        int A { get; set; }
        int B { get; set; }

        /// <summary> 相加运算 </summary>
        /// <param name="a"> 值 </param>
        /// <param name="b"> 值 </param>
        /// <returns> 加运算结果 </returns>
        int Add(int a, int b);

        /// <summary> 乘积运算 </summary>
        /// <param name="x"> 值 </param>
        /// <param name="y"> 值 </param>
        /// <returns> 乘积运算结果 </returns>
        int Multiply(int x, int y);
    }
}
```

**实现算数接口**

```C#
namespace Other.Test2
{
    /// <summary> 实现运算接口 </summary>
    public class MathClass : IMathClass
    {
        private int a, b; //字段

        /// <summary> 属性 </summary>
        public int A
        {
            get { return a; }
            set { a = value; }
        }

        public int B
        {
            get { return b; }
            set { b = value; }
        }

        /// <summary> 加运算  </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public int Add(int a, int b) { return (a + b); }

        /// <summary> 乘积运算 </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public int Multiply(int x, int y) { return (x * y); }
    }
}
```

### 创建程式集的接口实例

1.需要使用的接口，皆有其实现类,并且类的命名为接口名去掉首字母; 2.创建接口实现类的新实例,返回创建出来的接口实现类的新实例; 3.获取接口实现类,返回创建出来的接口实现类的新实例; 4.获取泛型接口,返回接口;

**完整代码**

```C#
namespace Other
{
    /// <summary> 接口 - 实现类 - 新实例 </summary>
    public static class OtherEntry
    {
        /// <summary> 获取接口 - 泛型 </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns> 接口类型 </returns>
        public static T GetInterface<T>() where T : class
        {
            Type interfaceType = typeof(T); //传入为接口类型

            //假设调用该函数是传入接口为<IMathClass>,那么此处值为:Other.Test2.MathCLass
            // 参数一：传入的接口的命名空间 ，如Other.Test2
            // 参数二：实现该接口的类文件名 ，如MathCLass(也就是接口文件名(IMathClass)去掉开头的I)
            string className = string.Format("{0}.{1}", interfaceType.Namespace, interfaceType.Name.Substring(1));

            Type classType = Type.GetType(className); // 获取类型，也就是MathClass类

            return GetClass(classType) as T; //调用获取类函数，传入类的类型
        }

        /// <summary> 获取接口实现类 </summary>
        /// <param name="classType"> 传入类的类型 </param>
        /// <returns> 创建的接口实现类 </returns>
        private static object GetClass(Type classType)
        {
            return CreateClass(classType); //创建接口实现类的实例
        }

        /// <summary> 创建接口实现类的实例 </summary>
        /// <param name="classType"> 模块类型 </param>
        /// <returns> 创建的类类型实例 </returns>
        private static object CreateClass(Type classType)
        {
            //创建传入的类类型的实例(klass = class)
            object klass = Activator.CreateInstance(classType);
            if(klass == null)
            { throw new Exception("NULL"); }
            return klass;
        }
    }
}
```

### 在 Unity 中使用 Other.dll

1.将生成的 dll 文件，放入 Unity 工程中; 2.新建类文件,便于测试，该类直接继承 MonoBehaviour; 3.对于反射的测试;

```C#
namespace Assets.Main.Scripts.Unit
{
    /// <summary>  </summary>
    public class Test : MonoBehaviour
    {
        private IPoint iPoint = null;
        private IMathClass iMath = null; //接口
        /// <summary> dll强命名 </summary>
        string dllName = "Other, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null";

        private void Awake()
        {
            iPoint = OtherEntry.GetInterface<IPoint>(); //获取接口
            iPoint.X = 5;
            iPoint.Y = 10;
            Debug.Log(iPoint.Add(iPoint.X, iPoint.Y));
            Debug.Log(iPoint.Multiply(iPoint.X, iPoint.Y));

            iMath = OtherEntry.GetInterface<IMathClass>(); //获取接口
            Debug.Log(iMath.Add(3, 5));
            Debug.Log(iMath.Multiply(3, 5));

            #region Other.dll 的反射测试
            Assembly assembly = Assembly.Load(dllName);
            if(dllName == null)
            { Debug.Log("dllName is NULL"); }
            Debug.Log(assembly.FullName);

            foreach(Type type in assembly.GetTypes())
            {
                string str = type.Name;
                Debug.Log(str);
            }
            #endregion
        }
    }
}
```

**问题及解决方案** 1.频繁出现错误：_ArgumentNullException: Argument cannot be null.Parameter name: type_
经排查,发现是两个接口的命名空间重复,需保证每个命名空间下单一接口,及单一接口实现类;
命名空间(接口.cs，实现接口.cs)结构,如：

- Test（IPoint.cs，Point.cs）,Test2(IMathClass.cs，MathClass.cs);

---

---

# GeoSystem Add DLL

**　　地理系统加入程式库**

    将之前的地理系统，封入DLL程式库中，便于项目中使用;
    创建*GeoSystem*文件夹,用于存放地理系统相关文件;

### 准备地理系统

    在GeoSystem文件夹下创建子文件夹*Utility*,清单如下：

**Vector2D** 双精度浮点类型向量 结构体

```C#
namespace Other.GeoSystem
{
    /// <summary> 双精度浮点类型 V2向量 </summary>
    public struct Vector2D
    {
        #region Property
        /// <summary> X坐标 </summary>
        public double X { get; set; }
        /// <summary> Y坐标 </summary>
        public double Y { get; set; }

        /// <summary> 索引器属性 </summary>
        /// <param name="index">索引</param>
        /// <returns></returns>
        public double this[int index]
        {
            get {
                switch(index)
                {
                    case 0:
                        return X;
                    case 1:
                        return Y;
                    default:
                        throw new IndexOutOfRangeException("Invalid V2d index!");
                }
            }
            set {
                switch(index)
                {
                    case 0:
                        X = value;
                        break;
                    case 1:
                        Y = value;
                        break;
                    default:
                        throw new IndexOutOfRangeException("Invalid Vector2d index!");
                }
            }
        }
        #endregion

        /// <summary> 构造函数 </summary>
        /// <param name="x"> X坐标 </param>
        /// <param name="y"> y坐标</param>
        public Vector2D(double x, double y) : this()
        { X = x; Y = y; }

        /// <summary> V2d Zero </summary>
        public static Vector2D Zero
        { get { return new Vector2D(0.0d, 0.0d); } }

        /// <summary> + 运算 </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns> 运算结果 </returns>
        public static Vector2D operator +(Vector2D a, Vector2D b)
        { return new Vector2D(a.X + b.X, a.Y + b.Y); }

        /// <summary> - 运算 </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns> 运算结果 </returns>
        public static Vector2D operator -(Vector2D a, Vector2D b)
        { return new Vector2D(a.X - b.X, a.Y - b.Y); }
    }
}
```

**Vector2DBounds** 双精度浮点类型的边界 结构体

```C#
namespace Other.GeoSystem
{
    /// <summary> V2D边界(西南至东北的边界框) </summary>
    public struct Vector2DBounds
    {
        #region Property
        /// <summary> 西南角 </summary>
        public Vector2D WestSouth { get; set; }
        /// <summary> 东北角 </summary>
        public Vector2D EastNorth { get; set; }
        /// <summary> 南纬 </summary>
        public double South { get { return WestSouth.X; } }
        /// <summary> 西经 </summary>
        public double West { get { return WestSouth.Y; } }
        /// <summary> 北纬 </summary>
        public double North { get { return EastNorth.X; } }
        /// <summary> 东经 </summary>
        public double East { get { return EastNorth.Y; } }
        #endregion

        /// <summary> 构造函数 </summary>
        /// <param name="ws"> 西南 </param>
        /// <param name="en"> 东北 </param>
        public Vector2DBounds(Vector2D ws, Vector2D en)
        {
            WestSouth = ws;
            EastNorth = en;
        }

        /// <summary> 地理边界框是不是空的 true空，其它false </summary>
        /// <returns> 是否为空 </returns>
        public bool IsEmpty()
        { return WestSouth.X > EastNorth.X || WestSouth.Y > EastNorth.Y; }

        /// <summary> 将边框转换为字符串. </summary>
        /// <returns> 返回一个字符串 </returns>
        public override string ToString()
        { return string.Format("{0},{1}", WestSouth.ToString(), EastNorth.ToString()); }
    }
}
```

**RectD** 双精度浮点类型的矩形 结构体

```C#
namespace Other.GeoSystem
{
    /// <summary> 双精度浮点类型 矩形 </summary>
    public struct RectD
    {
        #region Property
        /// <summary> 最小 </summary>
        public Vector2D Min { get; private set; }
        /// <summary> 最大 </summary>
        public Vector2D Max { get; private set; }
        /// <summary> 大小是绝对的width height </summary>
        /// Min+Size != Max
        public Vector2D Size { get; private set; }
        /// <summary> 中心 </summary>
        public Vector2D Center { get; private set; }
        #endregion

        /// <summary> 矩形的构造函数 </summary>
        /// <param name="min"> 最小 </param>
        /// <param name="size"> 大小 </param>
        public RectD(Vector2D min, Vector2D size)
        {
            Min = min;
            Max = min + size;
            Center = new Vector2D(Min.X + size.X / 2, Min.Y + size.Y / 2);
            //x =Mathf.Abs(x) 与 x = (x > 0 ? x : -x)
            Size = new Vector2D(
                size.X = (size.X > 0 ? size.X : -size.X),
                size.Y = (size.Y > 0 ? size.Y : -size.Y));
        }
    }
}
```

**NormTileID** 规范图块的 ID 结构体

```C#
namespace Other.GeoSystem
{
    /// <summary> 规范图块的ID </summary>
    public struct NormTileID
    {
        #region Property
        /// <summary> Z：缩放级别 </summary>
        public int Z { get; set; }
        /// <summary> X：横向 </summary>
        public int X { get; set; }
        /// <summary> Y：纵向 </summary>
        public int Y { get; set; }
        #endregion

        /// <summary> 初始化类的新实例,表示可移动的地图图块坐标 </summary>
        /// <param name="z"> z 缩放级别 </param>
        /// <param name="x"> x 坐标. </param>
        /// <param name="y"> y 坐标. </param>
        public NormTileID(int z, int x, int y)
        {
            Z = z;
            X = x;
            Y = y;
        }

        /// <summary> 内部带参构造函数 </summary>
        /// <param name="ptID"> 铺设图块ID </param>
        internal NormTileID(PaveTileID ptID)
        {
            var z = ptID.Z;
            var x = ptID.X;
            var y = ptID.Y;
            var wrap = (x < 0 ? x - (1 << z) + 1 : x) / (1 << z);
            Z = z;
            X = x - wrap * (1 << z);
            Y = y < 0 ? 0 : Math.Min(y, (1 << z) - 1);
        }

        /// <summary> 返回当前图块 如:1/2/3 表示为，Z缩放/X坐标/Y坐标 </summary>
        public override string ToString()
        { return Z + "/" + X + "/" + Y; }
    }
}
```

**PaveTileID** 铺设图块的 ID 结构体

```C#
namespace Other.GeoSystem
{
    /// <summary> 铺设图块的ID </summary>
    public struct PaveTileID
    {
        #region Property
        /// <summary> Z：缩放级别 </summary>
        public int Z { get; set; }
        /// <summary> X：横向 </summary>
        public int X { get; set; }
        /// <summary> Y：纵向 </summary>
        public int Y { get; set; }

        /// <summary> 获取规范的图块标识符 </summary>
        /// <value> 规范的图块标识符 </value>
        public NormTileID NormTileID
        { get { return new NormTileID(this); } }
        #endregion

        /// <summary> 初始化新的实例 </summary>
        /// <param name="z"> z = 缩放级别 </param>
        /// <param name="x"> x = 横向 </param>
        /// <param name="y"> y = 纵向</param>
        public PaveTileID(int z, int x, int y)
        {
            Z = z;
            X = x;
            Y = y;
        }

        /// <summary> 返回一个ID，如：11/385/800 ,缩放级别/横向/纵向 </summary>
        public override string ToString()
        { return Z + "/" + X + "/" + Y; }
    }
}
```

### 地理系统接口及实现类

**IGeoSystem** 地理信息系统接口

```C#
namespace Other.GeoSystem
{
    /// <summary> 地理系统接口 </summary>
    public interface IGeoSystem
    {
        #region WGS84经纬度 → 米 (球面墨卡托)
        /// <summary> WGS84经纬度 → 米 (球面墨卡托) </summary>
        /// <param name="lat"> 纬度 </param>
        /// <param name="lon"> 经度 </param>
        /// <returns> V2d XY 米 </returns>
        Vector2D LatLonToMeter(double lat, double lon);

        /// <summary> WGS84经纬度 → 米 (球面墨卡托) </summary>
        /// <param name="v2d"> V2d形式的经纬度值 </param>
        /// <returns> 坐标以米为单位 </returns>
        Vector2D LatLonToMeter(Vector2D v2d);
        #endregion

        #region 经纬度 ? 图块标识符

        #region 经纬度 → 图块标识符
        /// <summary> 经纬度 → 图块标识符 </summary>
        /// <param name="latLon"> 经纬度 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 铺设图块标识符 </returns>
        PaveTileID LatLonToTileID(Vector2D latLon, int zoom);
        #endregion

        #region 图块标识符 → 经纬度
        /// <summary> wiki C# 图块 → 经纬度 </summary>
        /// <param name="tileX"> 图块X标识符 </param>
        /// <param name="tileY"> 图块Y标识符 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> v2d类型的值经纬度 </returns>
        Vector2D TileIDToLatLon(double tileX, double tileY, int zoom);
        #endregion

        #endregion

        #region 墨卡托 → 单个图块标识符
        /// <summary> 墨卡托 → 单个图块标识符 </summary>
        /// <param name="mercator"> 墨卡托坐标值 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 单个图块标识符 </returns>
        PaveTileID MercatorToTileID(Vector2D mercator, int zoom);
        #endregion

        #region V2d边界WS-EN内，所需铺设的tile数量
        /// <summary> V2d边界WS-EN内，所需铺设的tile数量 </summary>
        /// <param name="bounds"> V2d边界(墨卡托坐标系)</param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 当前可见区域所需铺设的tile数量 </returns>
        /// var tiles = LatLonHelper.CoverTileCount(new Vector2dBounds(
        /// 西南 new Vector2d(-1156866.87903521, -650737.611992753),
        /// 东北 new Vector2d(1156866.87903521, 650737.731425607)), zoom);
        HashSet<PaveTileID> NeedTileCount(Vector2DBounds bounds, int zoom);
        #endregion

        #region Google地图的缩放比例
        /// <summary> 通过缩放级别获取Google地图的缩放比例 </summary>
        /// <param name="zoom"> 缩放级别</param>
        /// <returns> 比例 </returns>
        double Resolution(int zoom);
        #endregion

        #region 像素 → 米
        /// <summary> 像素 → 米 </summary>
        /// <param name="px"> 像素 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> X/Y米 </returns>
        Vector2D PixelToMeters(Vector2D px, int zoom);
        #endregion

        #region 单个图块 → 以米为单位的矩形
        /// <summary> 当前级别下整个Tile的大小 </summary>
        /// <param name="ptID"></param>
        /// <returns> 以米为单位的矩形(min,size) </returns>
        RectD TileBounds(PaveTileID ptID);
        #endregion

        #region 墨卡托 → 米像素
        /// <summary> 墨卡托 → 每像素表示的米值 </summary>
        /// <param name="lat"> 纬度 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 一个像素代表的米 </returns>
        float PixelInMeter(float lat, int zoom);
        #endregion

        #region 单个图块中心点 → 墨卡托坐标值
        /// <summary> 单个tile在墨卡托坐标系的中心点 </summary>
        /// <param name="x"> 图块X标识符 </param>
        /// <param name="y"> 图块Y标识符 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> V2d墨卡托坐标值 </returns>
        /// 该函数，参数为ptID,结果为米，用于对该tile在untiy中P值的运算
        Vector2D TileToMercator(int x, int y, int zoom);
        #endregion
    }
}
```

**GeoSystem** 实现地理系统接口

```C#
namespace Other.GeoSystem
{
    /// <summary> 实现 地理系统接口 (内部密封部分类) </summary>
    internal sealed partial class GeoSystem : IGeoSystem
    {
        #region Field - const
        /// <summary> GoogleMap单图块 = 256 </summary>
        private const int TileSize = 256;//一个图块(256X256)
        /// <summary> 地球半径6378137*0.001 </summary>
        private const double EarthRadius = 6378137;
        /// <summary> 初始分辨率 ≈ 156543.03392804062米 </summary>
        private const double InitialResolution = 2 * Math.PI * EarthRadius / TileSize;
        /// <summary> 最大边界[±20037508.342789244] </summary>
        private const double OriginShift = 2 * Math.PI * EarthRadius / 2;
        /// <summary> 度 → 弧度的转换常量 </summary>
        private const float Deg2Rad = 0.0174532924F;
        #endregion

        #region Field - readonly
        /// <summary> 墨卡托投影最大纬度限制。 </summary>
        public readonly double LatMax = 85.0511;
        /// <summary> 墨卡托投影最大经度限制. </summary>
        public readonly double LonMax = 180;
        /// <summary> 墨卡托投影最大米</summary>
        /// WGS84球体周长：40075016.685578488
        public readonly double MercMaxM = 20037508.342789244;
        #endregion

        #region WGS84经纬度 → 米 (球面墨卡托)
        /// <summary> WGS84经纬度 → 米 (球面墨卡托) </summary>
        /// <param name="lat"> 纬度 </param>
        /// <param name="lon"> 经度 </param>
        /// <returns> V2d XY 米 </returns>
        public Vector2D LatLonToMeter(double lat, double lon)
        {
            var posX = lon * OriginShift / 180;
            var posY = Math.Log(Math.Tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
            posY = posY * OriginShift / 180;
            return new Vector2D(posX, posY);
        }

        /// <summary> WGS84经纬度 → 米 (球面墨卡托) </summary>
        /// <param name="v2d"> V2d形式的经纬度值 </param>
        /// <returns> 坐标以米为单位 </returns>
        public Vector2D LatLonToMeter(Vector2D v2d)
        { return LatLonToMeter(v2d.X, v2d.Y); }
        #endregion

        #region 经纬度 ? 图块标识符

        #region 经纬度 → 图块标识符
        /// <summary> 经纬度 → 图块标识符 </summary>
        /// <param name="latLon"> 经纬度 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 铺设图块标识符 </returns>
        public PaveTileID LatLonToTileID(Vector2D latLon, int zoom)
        {
            var tileX = (float)Math.Floor((latLon.Y + 180.0) / 360.0 * (1 << zoom));
            var tileY = (float)Math.Floor((1.0 - Math.Log(Math.Tan(latLon.X * Math.PI / 180.0) + 1.0 / Math.Cos(latLon.X * Math.PI / 180.0)) / Math.PI) / 2.0 * (1 << zoom));
            return new PaveTileID(zoom, (int)tileX, (int)tileY);
        }
        #endregion

        #region 图块标识符 → 经纬度
        /// <summary> wiki C# 图块 → 经纬度 </summary>
        /// <param name="tileX"> 图块X标识符 </param>
        /// <param name="tileY"> 图块Y标识符 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> v2d类型的值经纬度 </returns>
        public Vector2D TileIDToLatLon(double tileX, double tileY, int zoom)
        {
            Vector2D v2d = new Vector2D();
            double n = Math.PI - ((2.0 * Math.PI * tileY) / (1 << zoom));
            v2d.X = (float)((tileX / (1 << zoom) * 360) - 180);
            v2d.Y = (float)(180 / Math.PI * Math.Atan(Math.Sinh(n)));
            return new Vector2D(v2d.Y, v2d.X);
        }
        #endregion

        #endregion

        #region 墨卡托 → 单个图块标识符
        /// <summary> 墨卡托 → 单个图块标识符 </summary>
        /// <param name="mercator"> 墨卡托坐标值 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 单个图块标识符 </returns>
        public PaveTileID MercatorToTileID(Vector2D mercator, int zoom)
        {
            // 当前级别的tile总数量,如zoom=6,则tileCount=64;
            double tileCount = (1 << zoom);

            //Floor返回小于或等于指定数字的最大整数,翻转x / y 使公式起作用
            //如zoom=6,merc=0.则(1+(0/墨卡托最大米))/2 *64 结果：x=32
            double x = Math.Floor((1 + (mercator.X / MercMaxM)) / 2 * tileCount);
            double y = Math.Floor((1 - (mercator.Y / MercMaxM)) / 2 * tileCount);
            return new PaveTileID(zoom, (int)x, (int)y);
        }
        #endregion

        #region V2d边界WS-EN内，所需铺设的tile数量
        /// <summary> V2d边界WS-EN内，所需铺设的tile数量 </summary>
        /// <param name="bounds"> V2d边界(墨卡托坐标系)</param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 当前可见区域所需铺设的tile数量 </returns>
        /// var tiles = LatLonHelper.CoverTileCount(new Vector2dBounds(
        /// 西南 new Vector2d(-1156866.87903521, -650737.611992753),
        /// 东北 new Vector2d(1156866.87903521, 650737.731425607)), zoom);
        public HashSet<PaveTileID> NeedTileCount(Vector2DBounds bounds, int zoom)
        {
            //铺设图块哈希表
            HashSet<PaveTileID> pTilesHS = new HashSet<PaveTileID>();
            //规范图块哈希表
            HashSet<NormTileID> nTilesHS = new HashSet<NormTileID>();

            //边界框为空，返回
            if(bounds.IsEmpty())
            { return pTilesHS; }

            //墨卡托内 西南角
            Vector2D wsMercator = new Vector2D(
                Math.Max(bounds.WestSouth.X, -MercMaxM),
                Math.Max(bounds.WestSouth.Y, -MercMaxM));

            //墨卡托内 东北角
            Vector2D enMercator = new Vector2D(
                Math.Min(bounds.EastNorth.X, MercMaxM),
                Math.Min(bounds.EastNorth.Y, MercMaxM));

            // 将西南角的墨卡托坐标值转为图块标识符
            PaveTileID wsTile = MercatorToTileID(wsMercator, zoom);
            // 将东北角的墨卡托坐标值转为图块标识符
            PaveTileID enTile = MercatorToTileID(enMercator, zoom);

            //嵌套循环，实例化出来区域内所需铺设的图块
            for(int x = wsTile.X; x <= enTile.X; x++)
            {
                for(int y = enTile.Y; y <= wsTile.Y; y++)
                {
                    PaveTileID ptID = new PaveTileID(zoom, x, y);
                    if(!nTilesHS.Contains(ptID.NormTileID))
                    {
                        pTilesHS.Add(ptID);//添加到铺设图块哈希表
                        nTilesHS.Add(ptID.NormTileID);//添加到规范图块哈希表
                    }
                }
            }
            return pTilesHS;
        }
        #endregion

        #region Google地图的缩放比例
        /// <summary> 通过缩放级别获取Google地图的缩放比例 </summary>
        /// <param name="zoom"> 缩放级别</param>
        /// <returns> 比例 </returns>
        public double Resolution(int zoom)
        { return InitialResolution / (1 << zoom); }
        #endregion

        #region 像素 → 米
        /// <summary> 像素 → 米 </summary>
        /// <param name="px"> 像素 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> X/Y米 </returns>
        public Vector2D PixelToMeters(Vector2D px, int zoom)
        {
            Vector2D meter = new Vector2D
            {
                X = (px.X * Resolution(zoom) - OriginShift),
                Y = (px.Y * Resolution(zoom) - OriginShift)
            };
            return meter;
        }
        #endregion

        #region 单个图块 → 以米为单位的矩形
        /// <summary> 当前级别下整个Tile的大小 </summary>
        /// <param name="ptID"></param>
        /// <returns> 以米为单位的矩形(min,size) </returns>
        public RectD TileBounds(PaveTileID ptID)
        {
            //最小=像素转米(铺设IDX * 每个图块的像素(256),铺设IDY * 每个图块的像素(256),铺设IDZ)
            var min = PixelToMeters(new Vector2D(ptID.X * TileSize, ptID.Y * TileSize), ptID.Z);
            //最大=像素转米((铺设IDX+1) * 每个图块的像素(256),(铺设IDY+1) * 每个图块的像素(256),铺设ID Z)
            var max = PixelToMeters(new Vector2D((ptID.X + 1) * TileSize, (ptID.Y + 1) * TileSize), ptID.Z);
            return new RectD(min, max - min);
        }
        #endregion

        #region 墨卡托 → 米像素
        /// <summary> 墨卡托 → 每像素表示的米值 </summary>
        /// <param name="lat"> 纬度 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> 一个像素代表的米 </returns>
        public float PixelInMeter(float lat, int zoom)
        {
            return (float)(40075016.685578d * Math.Cos(
             Deg2Rad * lat) / Math.Pow(2f, zoom + 8));
        }
        #endregion

        #region 单个图块中心点 → 墨卡托坐标值
        /// <summary> 单个tile在墨卡托坐标系的中心点 </summary>
        /// <param name="x"> 图块X标识符 </param>
        /// <param name="y"> 图块Y标识符 </param>
        /// <param name="zoom"> 缩放级别 </param>
        /// <returns> V2d墨卡托坐标值 </returns>
        /// 该函数，参数为ptID,结果为米，用于对该tile在untiy中P值的运算
        public Vector2D TileToMercator(int x, int y, int zoom)
        {
            double cenX = x + 0.5;
            double cenY = y + 0.5;

            cenX = ((cenX / (1 << zoom) * 2) - 1) * MercMaxM;
            cenY = (1 - (cenY / (1 << zoom) * 2)) * MercMaxM;
            return new Vector2D(cenX, cenY);
        }
        #endregion
    }
}
```

### 对 DLL 中的该模块进行使用

**Test** 测试类文件,选几个类测试

```C#
using Other.GeoSystem; //引入程式库
namespace Assets.Main.Scripts.Unit
{
    /// <summary>  </summary>
    public class Test : MonoBehaviour
    {
        /// <summary> 地理系统接口 </summary>
        private IGeoSystem geoSystem = null;

        private void Awake()
        {
            geoSystem = OtherEntry.GetInterface<IGeoSystem>(); //获取接口
            Vector2D v2d = geoSystem.LatLonToMeter(5, 3); //经纬转米
            Debug.Log(v2d.X+","+v2d.Y); // 333958.472379821,557305.257274578

            //经纬度转图块
            PaveTileID ptID = geoSystem.LatLonToTileID(new Vector2D(0, 0), 1);
            Debug.Log(ptID.X + "," + ptID.Y + "," + ptID.Z); // 1,1,1
        }
    }
}
```

---

---

# File Read Writer

**　　文件读写操作**

### 文件读写功能类

- 通过 IO 流形式读取写入文件;

**FileReadWriter**

```C#
/// <summary> 文件读写功能类 </summary>
public class FileReadWriter
{
    #region ReadFile
    /// <summary> 读取文件 </summary>
    /// <param name="filePath"> 文件路径 </param>
    /// <param name="encoding"> 字符编码 </param>
    /// <returns> 读取到的文件内容 </returns>
    public static string ReadFile(string filePath, Encoding encoding)
    {
        FileInfo fileInfo = new FileInfo(filePath);

        StreamReader streamReader = new StreamReader(fileInfo.OpenRead(), encoding);
        string result = streamReader.ReadToEnd(); //读取到末尾
        streamReader.Close(); // 关闭流
        streamReader.Dispose(); // 释放流
        streamReader = null;
        return result;
    }

    /// <summary> 读取文件 - UTF8  </summary>
    /// <param name="filePath"> 文件路径 </param>
    /// <returns> 读取的文件内容 </returns>
    public static string ReadFile(string filePath)
    { return ReadFile(filePath, Encoding.UTF8); }
    #endregion


    #region WriteFile
    /// <summary> 写入文件 </summary>
    /// <param name="filePath"> 文件路径 </param>
    /// <param name="content"> 文件内容 </param>
    /// <param name="encoding"> 字符编码 </param>
    /// <returns> 是否写入成功 </returns>
    public static bool WriteFile(string filePath, string content, Encoding encoding)
    {
        //获取目录,如果目录不存在，则创建
        string directoryPath = Path.GetDirectoryName(filePath);
        if(Directory.Exists(directoryPath) == false)
        { Directory.CreateDirectory(directoryPath); }

        StreamWriter streamWriter = new StreamWriter(filePath, false, encoding);
        streamWriter.WriteLine(content); // 逐行写入
        streamWriter.Close(); //关闭流
        streamWriter.Dispose(); //释放流
        return true;  //写入完成
    }

    /// <summary> 写入文件 - UTF8 </summary>
    /// <param name="filePath"> 文件路径 </param>
    /// <param name="content"> 文件内容 </param>
    /// <returns> 是否写入成功 </returns>
    public static bool WriteFile(string filePath, string content)
    { return WriteFile(filePath, content, Encoding.UTF8); }
    #endregion
}
```

---

---

# Singleton for C

**　　 Singleton**

## 使用场景

- 程式中需要只有一个实例的类，并且提供一个用于访问实例的全局访问点;
- 确保高效，及线程安全.

### 1.静态初始化的单例

```C#
/// <summary> 公共密封类 </summary>
public sealed class Singleton
{
    /// <summary> 类对象，用于内部实现 </summary>
    private static readonly Singleton instance = new Singleton();
    /// <summary> 私有构造函数 禁止外部创建实例 </summary>
    private Singleton() { }
    /// <summary> 公有静态单例类对象 属性 </summary>
    public static Singleton Instance
    { get { return instance; } }
}
```

### 2.多线程单例

```C#
/// <summary> 公共密封类 </summary>
public sealed class Singleton
{
    /// <summary> 类对象，用于内部实现 </summary>
    /// volatile 确保只有在实例变量分配完成后才能访问实例变量
    private static volatile Singleton instance;

    // readonly - 这个成员只能在“类初始化”时赋值
    private static readonly object syncRoot = new object();

    /// <summary> private OR protected 构造函数 禁止外部创建实例 </summary>
    private Singleton() { }

    /// <summary> 公有静态单例类对象 属性 </summary>
    public static Singleton Instance
    {
        get {
            //当对象不存在的时候,对实例化的语句进行加锁
            if(instance == null)
            {
                //使用 syncRoot 实例来进行锁定（而不是锁定类型本身），以避免发生死锁
                // 当多线程同时执行这句代码的时候保证对象的唯一性,让线程排队
                // lock里面需要用一个已经存在的对象来判断，所以不能使用instance
                lock(syncRoot)
                {
                    // 因多线程在排队，防止实例化多个对象，需要进行判断，保证线程的安全
                    if(instance == null)
                    { instance = new Singleton(); }
                }
            }
            return instance;
        }
    }
}
```

---

---

# Abstract Factory for C

**　　 Abstract Factory**

## Abstract

- 定义字段、属性、函数实现，不能被实例化；
- 单一继承，派生类必须实现所有未实现的函数；
- 不可用 sealed、static 、virtual

## Abstract Factory

- 具有共通性，存在功能差异的多个类；

### 在场景中创建一个物体

- AbstractTest.cs 抽象基类，定义创建函数
- TT.cs 第一个派生类，重写创建函数，创建一个子物体
- TTT.cs 第二个派生类，改变物体位置
- Test.cs 挂在场景物体的类, 实例化两个子类，调用创建物体函数

```C#
/// <summary> 抽象基类 </summary>
public abstract class AbstractT
{
    protected int x; //X值
    public int X { get { return x; } } //X属性

    protected string str; //物体名字
    public string Str { get; set; }

    /// <summary> 用于派生类重写的物体创建函数 </summary>
    /// <param name="obj"> 创建物体的上级物体 </param>
    public abstract void Create(GameObject obj);
}
```

```C#
/// <summary> 第一个派生类 </summary>
public class TT : AbstractT
{
    /// <summary> 重写创建物体函数 </summary>
    /// <param name="parent"> 创建物体的上级物体 </param>
    public override void Create(GameObject parent)
    {
        x = 49; // X轴位置{X属性不可写，给x字段赋值}
        GameObject obj = new GameObject(Str); //创建物体
        obj.transform.position = new Vector3(x, 0, 0);//物体位置
        obj.transform.SetParent(parent.transform);//物体的上级物体
    }
}
```

```C#
/// <summary> 第二个派生类 </summary>
public class TTT : AbstractT
{
    /// <summary> 重写创建函数 </summary>
    /// <param name="obj"> 改变物体的位置 </param>
    public override void Create(GameObject obj)
    { obj.transform.position = new Vector3(20, 20, 20); }
}
```

```C#
/// <summary> 场景物体挂载的类 </summary>
public class Test : MonoBehaviour
{
    TT tT; //声明派生类类变量
    TTT tTT; //声明

    private void Awake()
    {
        // 派生类实例化，给Str属性赋值新的字符串
        tT = new TT
        {
            Str = "MyObj"
        };
        //调用派生类创建物体函数,指定当前类缩在物体为创建物体的上级物体
        tT.Create(this.gameObject);
        // Test:MyObj_49
        Debug.Log("Test:" + tT.Str + "_" + tT.X);

        //第二个派生类
        tTT = new TTT();
        tTT.Create(this.gameObject);
        // TestTestTest:(20.0, 20.0, 20.0)
        Debug.Log("TestTestTest:" + this.gameObject.transform.position);
    }
}
```

---

---

# Comment Template

**　　给 C#和 Unity 添加自定义注释模板**

### 开发工具

- Unity : 2017.1.2f1
- IDE : Visual Studio 2017
- OS : Windows 7

### 缘起

曾经，使用 unity+vs 的开发组合，想要在类中加注信息，改动 unity/Editor 中的模板，还要配一个 cs 才能实现；而在 vs 的 c#模板 class.cs 中添加，又不会关联到 unity 中。
　　后来，在 unity2017 的编辑器里创建 cs 文件，经常遇到 vs 不自动重载解决方案，无法智能提示。之前的做法是：删文件重建，次数不定，直到 vs 弹出来重载解决方案为止。
　　日前，一次无意直接在 vs 中创建 cs 文件，猛然发现里面只有两个模板，正是用于 unity 的类文件：**_UnityMonoBehaviour_** 和 **_UnityEditor_** 经过全盘搜索，找到此两个模板文件，加上自定义的版权信息，以及项目必要信息等。
　　从此，再也不用纠结这件事情~\(≧▽≦)/~啦啦啦！

### 具体操作

两个类模板的文件路径：

```C#
    C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\Extensions\Microsoft\Visual Studio Tools for Unity\ItemTemplates\CSharp\1033
```

在两个文件夹里面的两个类文件模板中添加自定义的内容

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ $username$.All rights reserved.
*******************************************************
* CLR Version ：$clrversion$
* UnityVersion：2017.1.2f1
* IDE Version : Visual Studio 2017
* CreateTime  ：$time$
* Author      ：$username$
* ProjectName : $rootnamespace$
* ProjectDesc :
* NameSpace   ：$rootnamespace$
* ClassName   ：$safeitemname$.cs
* ClassDesc   ：
-----------------------------------------------------*/
#endregion　　
```

保存-关闭-打开 unity - Open C# Project；
在 vs 中 -新建类-选择**_CSharp MonoBehaviour_** -输入类名-添加。

**C# MonoBehaviour 模板**

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ Lokavit.All rights reserved.
*******************************************************
* UnityVersion：2017.1.2f1
* IDE  Version：Visual Studio 2017
* Create  Time：$time$
-----------------------------------------------------*/
#endregion

#region Library
using UnityEngine;
using System.Collections;
#endregion

namespace $rootnamespace$
{
	/// <summary>  </summary>
	public class $safeitemname$ : MonoBehaviour
	{

	}
}
```

**C# EditorScript 模板**

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ Lokavit.All rights reserved.
*******************************************************
* UnityVersion：2017.1.2f1
* IDE  Version：Visual Studio 2017
* Create  Time：$time$
-----------------------------------------------------*/
#endregion

#region Library
using UnityEngine;
using UnityEditor;
#endregion

namespace $rootnamespace$
{
	public class $safeitemname$ : ScriptableObject
	{
		[MenuItem("Tools/MyTool/Do It in C#")]
		static void DoIt()
		{
		EditorUtility.DisplayDialog("MyTool", "Do It in C# !", "OK", "");
		}
	}
}
```

**NewMonoBehaviour.cs** Unity

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ Lokavit.All rights reserved.
*******************************************************
* UnityVersion：2017.1.2f1
* IDE  Version：Visual Studio 2017
* Create  Time：$time$
-----------------------------------------------------*/
#endregion

#region Libraries
using UnityEngine;
using System.Collections;
#endregion

/// <summary>  </summary>
public class $safeitemname$ : MonoBehaviour
{

}
```

**NewEditorScript.cs** Unity

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ Lokavit.All rights reserved.
*******************************************************
* UnityVersion：2017.1.2f1
* IDE  Version：Visual Studio 2017
* Create  Time：$time$
-----------------------------------------------------*/
#endregion

#region Libraries
using UnityEngine;
using UnityEditor;
#endregion

/// <summary>  </summary>
public class $safeitemname$ : ScriptableObject
{
	[MenuItem("Tools/MyTool/Do It in C#")]
	static void DoIt()
	{
		EditorUtility.DisplayDialog("MyTool", "Do It in C# !", "OK", "");
	}
}
```

**Class.cs** CSharp 1033-2052

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ Lokavit.All rights reserved.
*******************************************************
* UnityVersion：2017.1.2f1
* IDE  Version：Visual Studio 2017
* Create  Time：$time$
-----------------------------------------------------*/
#endregion

#region Libraries
using System;
using System.Collections.Generic;
$if$ ($targetframeworkversion$ >= 3.5)using System.Linq;
$endif$using System.Text;
$if$ ($targetframeworkversion$ >= 4.5)using System.Threading.Tasks;
$endif$
#endregion

namespace $rootnamespace$
{
    class $safeitemrootname$
    {
    }
}
```

**Interface.cs**

```C#
#region ==========<< 卍 · Copyright · 卍 >>==========
/*-----------------------------------------------------
*******************************************************
* Copyright ? 2017-$year$ Lokavit.All rights reserved.
*******************************************************
* UnityVersion：2017.1.2f1
* IDE  Version：Visual Studio 2017
* Create  Time：$time$
-----------------------------------------------------*/
#endregion

#region Libraries
using System;
using System.Collections.Generic;
$if$ ($targetframeworkversion$ >= 3.5)using System.Linq;
$endif$using System.Text;
$if$ ($targetframeworkversion$ >= 4.5)using System.Threading.Tasks;
$endif$
#endregion

namespace $rootnamespace$
{
    interface $safeitemrootname$
    {
    }
}

```


# Vertice、Triangle、UV、Normal

**　　网格中的顶点、三角形、UV、法线**
　Mesh中的Vertices(顶点组)、Triangle(三角形)、UV、Normal(法线)
　绘制Mesh，必要组件：MeshFilter 网格过滤器　　

## Vertices 顶点组
- 三个Vertex(顶点)构成一个平面三角形，以三角形面为单位渲染效率最高
- 有正反面之分，由顶点的排序决定：按顺时针排序的是正面(左下1,左上2,右下3)
- 每个Vertex的Vector3(x,y,z)表示该点所在位置;
- Vertices数组中的值：决定三角形的朝向，直角位置，大小等;

## Triangles 三角形组
- 表示三角形的一组Vertex，顺时针写{0,1,2};
- 非三角形图形的三角形数组，略有变化，具体参照以下示例;

## UV UV组
- UV也就是纹理坐标，具有U(水平)和V(垂直)两个坐标轴，也叫UV坐标;
- UV坐标是二维坐标，由左下角(0,0)为原点;
- UV数组必须与Vertex数组相同;

## Normal
- 法线，始终垂直于平面的虚线,与三角形平面垂直且指向正面的矢量，称为该平面的法线;
- Unity中通常在绘制图形的最后，调用mesh.RecalculateNormals();

#### 以下为常用图形绘制代码参考
- 顶点数组中的向量值1，为一个单位，便于计算;
- 若需放大图像，使用Transfrom.localScale;

### 1.三角形示例
```C#
/*——————————Vertices——————————*/
// 立向; 直角：左上; 中心点:直角对面边的中心
mesh.vertices = new Vector3[] { new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0) };
// 立向; 直角：右上; 中心点:直角对面边的中心
mesh.vertices = new Vector3[] { new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0) };
// 立向; 直角：正上; 只能看到三角形的一条线
mesh.vertices = new Vector3[] { new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 1) };
// 平向; 直角：右前; 中心点:直角对面边的中心
mesh.vertices = new Vector3[] { new Vector3(-1, 0, 1), new Vector3(1, 0, 1), new Vector3(1, 0, -1) };
// 平向; 直角：左前; 中心点:直角对面边的中心
mesh.vertices = new Vector3[] { new Vector3(-1, 0, 1), new Vector3(1, 0, 1), new Vector3(-1, 0, -1) };
// 平向; 直角：左后; 中心点:直角对面边的中心
mesh.vertices = new Vector3[] { new Vector3(0, 0, 0), new Vector3(0, 0, 1), new Vector3(1, 0, 0) };
// 平向; 直角：右后; 中心点:直角对面边的中心
mesh.vertices = new Vector3[] { new Vector3(0, 0, 0), new Vector3(1, 0, 1), new Vector3(1, 0, 0) };
/*——————————Triangles——————————*/
mesh.triangles = new int[] { 0, 1, 2 };//三角形
/*——————————UVs——————————*/
mesh.uv = new Vector2[] { Vector2.zero, Vector2.up, Vector2.one }; //UV坐标 
/*——————————Normals——————————
mesh.RecalculateNormals();//重置法线
```

### 2.正方形示例
```C#
//立向; 直角：左上右下;
/*——————————Vertices——————————*/
mesh.vertices = new Vector3[] { new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0), new Vector3(1, 0, 0) };
/*——————————Triangles——————————
mesh.triangles = new int[] { 0, 1, 2, 0, 2, 3 };//一对三角形
/*——————————UVs——————————*/
mesh.uv = new Vector2[] { Vector2.zero, Vector2.up, Vector2.one, Vector2.right };

//平向，直角：左下右上;
/*——————————Vertices——————————*/
mesh.vertices = new Vector3[] { new Vector3(-1, 0, 1), new Vector3(1, 0, 1), new Vector3(-1, 0, -1), new Vector3(1, 0, -1) };
/*——————————Triangles——————————*/
mesh.triangles = new int[6] { 0, 1, 2, 1, 3, 2 };//一对三角形
/*——————————UVs——————————*/
mesh.uv = new Vector2[4] { Vector2.zero, Vector2.up, Vector2.right, Vector2.one };
```

### 3.圆面形示例
```C#
    /// <summary> 绘制圆形 </summary>
    /// <param name="radius"> 圆半径 </param>
    /// <param name="segments"> 圆段数，越高越圆 </param>
    /// <param name="centerCircle"> 画圆所需的中心点 </param>
    /// <returns></returns>
    public static Mesh DrawCircle(float radius, int segments, Vector3 centerCircle)
    {
        //顶点  
        Vector3[] vertices = new Vector3[segments + 1];
        vertices[0] = centerCircle;
        float deltaAngle = Mathf.Deg2Rad * 360f / segments;
        float currentAngle = 0;
        for(int i = 1; i < vertices.Length; i++)
        {
            float cosA = Mathf.Cos(currentAngle);
            float sinA = Mathf.Sin(currentAngle);
            vertices[i] = new Vector3(cosA * radius + centerCircle.x, sinA * radius + centerCircle.y, 0);
            currentAngle += deltaAngle;
        }

        //三角形  
        int[] triangles = new int[segments * 3];
        for(int i = 0, j = 1; i < segments * 3 - 3; i += 3, j++)
        {
            triangles[i] = 0;
            triangles[i + 1] = j + 1;
            triangles[i + 2] = j;
        }
        triangles[segments * 3 - 3] = 0;
        triangles[segments * 3 - 2] = 1;
        triangles[segments * 3 - 1] = segments;


        Mesh mesh = new Mesh();
        mesh.Clear();

        mesh.vertices = vertices;
        mesh.triangles = triangles;

        return mesh;
    }
```

### 4.圆环形示例
```C#
    /// <summary> 绘制圆环 </summary>
    /// <param name="radius"> 圆环半径 </param>
    /// <param name="innerRadius"> 圆环内半径 </param>
    /// <param name="segments"> 圆段数 </param>
    /// <param name="centerCircle"> 圆中心点 </param>
    /// <returns></returns>
    public static Mesh DrawRing(float radius, float innerRadius, int segments, Vector3 centerCircle)
    {
        //顶点  
        Vector3[] vertices = new Vector3[segments * 2];
        float deltaAngle = Mathf.Deg2Rad * 360f / segments;
        float currentAngle = 0;
        for(int i = 0; i < vertices.Length; i += 2)
        {
            float cosA = Mathf.Cos(currentAngle);
            float sinA = Mathf.Sin(currentAngle);
            vertices[i] = new Vector3(cosA * innerRadius + centerCircle.x, sinA * innerRadius + centerCircle.y, 0);
            vertices[i + 1] = new Vector3(cosA * radius + centerCircle.x, sinA * radius + centerCircle.y, 0);
            currentAngle += deltaAngle;
        }

        //三角形  
        int[] triangles = new int[segments * 6];
        for(int i = 0, j = 0; i < segments * 6; i += 6, j += 2)
        {
            triangles[i] = j;
            triangles[i + 1] = (j + 1) % vertices.Length;
            triangles[i + 2] = (j + 3) % vertices.Length;

            triangles[i + 3] = j;
            triangles[i + 4] = (j + 3) % vertices.Length;
            triangles[i + 5] = (j + 2) % vertices.Length;
        }

        Mesh mesh = new Mesh();
        mesh.Clear();

        mesh.vertices = vertices;
        mesh.triangles = triangles;

        return mesh;
    }
```

---
---

# Vector Double

**　　项目启动**

## 要求
基于Unity制作Google Earth效果的GIS.
不引入任何SDK，不接入任何外部网路.
发布Web或C/S，与客户内部对接.
虚拟漫游，交互操作，培训考核，局域网多人同时操作.
程式中以**GoogleMaps**、**WebMercator**、**WGS84经纬度**为基准.

*　GIS,（全名:Geographic Information System 地理信息系统）*

**　　向量与双精度浮点类型**

由于运算中含大量**无限不循环值**,以及**近似值**.
对经纬度，墨卡托，像素，米等使用双精度浮点类型.

**Vector2d.cs** 双精度浮点类型的Vector2向量结构体.
```C#
public struct Vector2d
{
    /// <summary> X坐标 </summary>
    public double X { get; set; }
    /// <summary> Y坐标 </summary>
    public double Y { get; set; }

    /// <summary> 索引器属性 </summary>
    /// <param name="index">索引</param>
    /// <returns></returns>
    public double this[int index]
    {
        get {
            switch(index)
            {
                case 0:
                    return X;
                case 1:
                    return Y;
                default:
                    throw new IndexOutOfRangeException("Invalid V2d index!");
            }
        }
        set {
            switch(index)
            {
                case 0:
                    X = value;
                    break;
                case 1:
                    Y = value;
                    break;
                default:
                    throw new IndexOutOfRangeException("Invalid Vector2d index!");
            }
        }
    }

    /// <summary> 构造函数 </summary>
    /// <param name="x"> X坐标 </param>
    /// <param name="y"> y坐标</param>
    public Vector2d(double x, double y) : this()
    { X = x; Y = y; }

    /// <summary> V2d Zero </summary>
    public static Vector2d Zero
    { get { return new Vector2d(0.0d, 0.0d); } }

    /// <summary> + 运算 </summary>
    /// <param name="a"></param>
    /// <param name="b"></param>
    /// <returns> 运算结果 </returns>
    public static Vector2d operator +(Vector2d a, Vector2d b)
    { return new Vector2d(a.X + b.X, a.Y + b.Y); }

    /// <summary> - 运算 </summary>
    /// <param name="a"></param>
    /// <param name="b"></param>
    /// <returns> 运算结果 </returns>
    public static Vector2d operator -(Vector2d a, Vector2d b)
    { return new Vector2d(a.X - b.X, a.Y - b.Y); }
}
```
**VectorHelper.cs** 定义几个常用的V2d ? V3静态函数
```C#
public static class VectorHelper
{
    #region Vector2d ? Vector3
    /// <summary> V2 → V3XZ , Y=0 </summary>
    public static Vector3 V2dToV3XZ(this Vector2d v2d)
    { return new Vector3((float)v2d.X, 0, (float)v2d.Y); }
    /// <summary> V2 → V3XY , Z=0 </summary>
    public static Vector3 V2dToV3XY(this Vector2d v2d)
    { return new Vector3((float)v2d.X, (float)v2d.Y, 0); }
    /// <summary> V3XZ → V2d , Y=0 </summary>
    public static Vector2d V3XZToV2d(this Vector3 v3)
    { return new Vector2d(v3.x, v3.z); }
    /// <summary> V3XY → V2d , Z=0 </summary>
    public static Vector2d V3XYToV2d(this Vector3 v3)
    { return new Vector2d(v3.x, v3.y); }
    #endregion
}
```
**RectD.cs** 双精度浮点类型的矩形结构体
```C#
public struct RectD
{
    /// <summary> 最小 </summary>
    public Vector2d Min { get; private set; }
    /// <summary> 最大 </summary>
    public Vector2d Max { get; private set; }
    /// <summary> 大小是绝对的width&height </summary>
    /// Min+Size != Max
    public Vector2d Size { get; private set; }
    /// <summary> 中心 </summary>
    public Vector2d Center { get; private set; }
    /// <summary> 矩形的构造函数 </summary>
    /// <param name="min"> 最小 </param>
    /// <param name="size"> 大小 </param>
    public RectD(Vector2d min, Vector2d size)
    {
        Min = min;
        Max = min + size;
        Center = new Vector2d(Min.X + size.X / 2, Min.Y + size.Y / 2);
        //Size = new Vector2d(Mathd.Abs(size.X), Mathd.Abs(size.Y));
        //x =Mathf.Abs(x) 与 x = (x > 0 ? x : -x)
        Size = new Vector2d(
            size.X = (size.X > 0 ? size.X : -size.X),
            size.Y = (size.Y > 0 ? size.Y : -size.Y));
    }
}
```

---
---

# Basic And Init

**　　基础复习和初始化**

## 复习 —— 
- **interface(接口)类**：定义通用行为
- **abstract(抽象)类**：类继承，AF(Abstract Factory)抽象工厂模式
- **filed(字段)**：Private私有，在类内使用，超范围情况下使用属性
- **property(属性)**：对字段的读写操作，自身类之外的衍生类or外部类使用
- **event(事件)**：结合Unity内Action使用
- **delegate(委托)**：搭配事件使用

## 开始编码 ——

**　IMap.cs**
```C#
public interface IMap : IReadMap { }

/// <summary> 可读的地图接口 </summary>
public interface IReadMap
{
    /// <summary> 地图根节点 </summary>
    Transform MapRoot { get; }
    /// <summary> UnityTilesSize </summary>
    float UTileSize { get; }
    /// <summary> 缩放级别 </summary>
    int Zoom { get; }
    /// <summary> 经纬度中心 </summary>
    Vector2d LatLonCenter { get; }
    /// <summary> 墨卡托中心点 </summary>
    Vector2d MercatorCenter { get; }
    /// <summary> 世界相对比例 </summary>
    float WorldRelativeScale { get; }
    /// <summary> 初始化事件 </summary>
    event Action OnInit;
}
```
**　BaseMap.cs**  地图基类，继承IMap，实现接口
```C#
public abstract class BaseMap : MonoBehaviour, IMap
{
    /// <summary> Start中初始化 </summary>
    [SerializeField]
    private bool initOnStart = true;
    /// <summary> 经纬度字符串 </summary>
    [SerializeField]
    private string latLonStr;

    #region IMap接口实现

    #region IReadMap接口实现
    /// <summary> 地图根节点 </summary>
    [SerializeField]
    protected Transform mapRoot;
    public Transform MapRoot
    { get { return mapRoot; } }
    /// <summary> UnityTileSize =100 </summary>
    [SerializeField]
    protected float uTileSize = 100;
    public float UTileSize
    { get { return uTileSize; } }
    /// <summary> 缩放级别 </summary>
    [SerializeField]
    [Range(0, 22)]
    private int zoom;
    public int Zoom
    { get { return zoom; } }
    /// <summary> 经纬度中心 </summary>
    protected Vector2d latLonCenter;
    public Vector2d LatLonCenter
    { get { return latLonCenter; } }
    /// <summary> 墨卡托中心 </summary>
    protected Vector2d mercatorCenter;
    public Vector2d MercatorCenter
    { get { return mercatorCenter; } }
    /// <summary> 世界相对比例 </summary>
    protected float worldRelativeScale;
    public float WorldRelativeScale
    { get { return worldRelativeScale; } }
    /// <summary> 初始化事件 </summary>
    public event Action OnInit = delegate { };
    #endregion

    #endregion

    private void Awake()
    {
        //地图根节点
        if(!mapRoot)
        { mapRoot = transform; }
        latLonStr = "0,0";//给个默认值，不然总报空
    }

    private void Start()
    {
        if(initOnStart)
        {
            //处理经纬度字符串，去掉逗号，提取经纬度值
            var latLonSplit = latLonStr.Split(',');
            //经纬度值转为双精度浮点类型，作为衍生类初始化参数
            Init(new Vector2d(double.Parse(latLonSplit[0]), double.Parse(latLonSplit[1])), zoom);
        }
    }

    /// <summary> 发送初始化事件,衍生类调用，判断其是否初始化完成 </summary>
    protected void SendInit()
    { OnInit(); }

    /// <summary> 衍生类初始化 </summary>
    /// <param name="latLon"> 经纬度 </param>
    /// <param name="zoom"> 缩放级别 </param>
    protected abstract void Init(Vector2d latLon, int zoom);
}
```
**　FlatMap.cs** 平面地图类，继承BaseMap,该类挂载于场景Map物体
```C#
public class FlatMap : BaseMap
{
    /// <summary> 重写基类初始化函数 </summary>
    /// <param name="latLon"> 经纬度 </param>
    /// <param name="zoom"> 缩放级别 </param>
    protected override void Init(Vector2d latLon, int zoom)
    {
        SendInit();//监测本函数初始化完成
        Debug.Log("FlatMap - Init OK!");
    }
}
```
**　BaseMapFty.cs** 地形工厂基类
```C#
public abstract class BaseMapFty
{
    /// <summary> 初始化 </summary>
    public void Init() { OnInit(); }

    /// <summary> 衍生类初始化函数 </summary>
    internal abstract void OnInit();
}
```
**　FlatMapFty.cs** 平面地形工厂类，继承BaseMapFty
```C#
public class FlatMapFty : BaseMapFty
{
    internal override void OnInit()
    { Debug.Log("FlatMapFty - OnInit!"); }
}
```
*　基于抽象类不可实例化，将FlatMapFty在BaseMap中实例化*

**　BaseMap.cs**
```C#
/// <summary> 平面地形工厂类 </summary>
protected FlatMapFty flatMapFty;
public FlatMapFty FlatMapFty
{ get { return flatMapFty; } }

private void Awake()
{   //实例化平面地形工厂类
    flatMapFty = new FlatMapFty();}

```
**　FlatMap.cs** 初始化函数中调用FlatMapFty的初始化函数
```C#
protected override void Init(Vector2d latLon, int zoom)
{
    FlatMapFty.OnInit();//调用平面工厂类初始化函数
    SendInit();//监测本函数初始化完成
    Debug.Log("FlatMap - Init OK!");
}
```

---
---

# NormTileID And PaveTileID

**　　铺设与规范TileID**

## NormTileID 规范图块ID
- Tile类型为：**Web Mercator**
- 返回图块的规范ID，格式：**{Z/X/Y}**

**NormTileID.cs**
```C#
public struct NormTileID
{
    public int Z { get; set; }
    public int X { get; set; }
    public int Y { get; set; }

    /// <summary> 初始化类的新实例,表示可移动的地图图块坐标 </summary>
    /// <param name="z"> z 缩放级别 </param>
    /// <param name="x"> x 坐标. </param>
    /// <param name="y"> y 坐标. </param>
    public NormTileID(int z, int x, int y)
    { Z = z;X = x; Y = y; }

    /// <summary> 返回当前图块 如:1/2/3 表示为，Z缩放/X坐标/Y坐标 </summary>
    public override string ToString()
    { return Z + "/" + X + "/" + Y; }
}
```
## PaveTileID 铺设图块ID
- 可以是一个，但通常指将当前视口铺满所需的图块

**PaveTileID.cs**
```C#
public struct PaveTileID
{
    public int Z { get; set; }
    public int X { get; set; }
    public int Y { get; set; }

    /// <summary> 初始化新的实例 </summary>
    /// <param name="z"> z = 缩放级别 </param>
    /// <param name="x"> x = 横向 </param>
    /// <param name="y"> y = 纵向</param>
    public PaveTileID(int z, int x, int y)
    { Z = z; X = x;Y = y; }
    /// <summary> 返回一个ID，如：11/385/800 ,缩放级别/横向/纵向 </summary>
    public override string ToString()
    { return Z + "/" + X + "/" + Y; }
}
```
在**NormTileID.cs** 中添加一个构造函数
```C#
/// <summary> 内部带参构造函数 </summary>
/// <param name="ptID"> 铺设图块ID </param>
internal NormTileID(PaveTileID ptID)
{
    var z = ptID.Z;
    var x = ptID.X;
    var y = ptID.Y;
    var wrap = (x < 0 ? x - (1 << z) + 1 : x) / (1 << z);
    Z = z;
    X = x - wrap * (1 << z);
    Y = y < 0 ? 0 : Math.Min(y, (1 << z) - 1);
}
```
在**PaveTileID.cs**中添加**NormTileID**类属性
```C#
/// <summary> 获取规范的图块标识符 </summary>
/// <value> 规范的图块标识符 </value>
public NormTileID NormTileID
{ get { return new NormTileID(this); } }
```

---
---

# Unity And World

**　　Unity与真实世界相对缩放比**

定义计算所需的常量，该值从不改变
```C#
/// <summary> GoogleMap单图块 = 256 </summary>
private const int TileSize = 256;//一个图块(256X256)
/// <summary> 地球半径6378137*0.001 </summary>
private const double EarthRadius = 6378137;
/// <summary> 初始分辨率 ≈ 156543.03392804062米 </summary>
private const double InitialResolution = 2 * Math.PI * EarthRadius / TileSize;
/// <summary> 最大边界[±20037508.342789244] </summary>
private const double OriginShift = 2 * Math.PI * EarthRadius / 2;
```

将经纬度转换为**PaveTileID**格式的铺设图块ID
该计算结果将返回**PaveTileID**类型的值.
该公式参考：[Slippy map tilenames](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames)
```C#
#region 经纬度 → 图块标识符
/// <summary> 经纬度 → 图块标识符 </summary>
/// <param name="latLon"> 经纬度 </param>
/// <param name="zoom"> 缩放级别 </param> geo
/// <returns> 铺设图块标识符</returns>
public static PaveTileID LatLonToTileID(Vector2d latLon, int zoom)
{
    var tileX = (float)Math.Floor((latLon.Y + 180.0) / 360.0 * (1 << zoom));
    var tileY = (float)Math.Floor((1.0 - Math.Log(Math.Tan(latLon.X * Math.PI / 180.0) + 1.0 / Math.Cos(latLon.X * Math.PI / 180.0)) / Math.PI) / 2.0 * (1 << zoom));
    return new PaveTileID(zoom, (int)tileX, (int)tileY);
}
#endregion
```
计算GoogleMap缩放比，**InitialResolution**为初始分辨率
```C#
#region Google地图的缩放比例
/// <summary> 通过缩放级别获取Google地图的缩放比例 </summary>
/// <param name="zoom"> 缩放级别</param>
/// <returns> 比例 </returns>
private static double Resolution(int zoom)
{ return InitialResolution / (1 << zoom); }
#endregion
```
计算**像素 → 米**
```C#
#region 像素 → 米
/// <summary> 像素 → 米 </summary>
/// <param name="px"> 像素 </param>
/// <param name="zoom"> 缩放级别 </param>
/// <returns> X/Y米 </returns>
private static Vector2d PixelToMeters(Vector2d px, int zoom)
{
    Vector2d met = new Vector2d
        {
            X = (px.X * Resolution(zoom) - OriginShift),
            Y = (px.Y * Resolution(zoom) - OriginShift)
        };
    return met;
}
#endregion
```
计算出一个图块的边界值，返回以米为单位的矩形
```C#
#region 单个图块 → 以米为单位的矩形
/// <summary> 当前级别下整个Tile的大小 </summary>
/// <param name="ptID"></param>
/// <returns> 以米为单位的矩形(min,size) </returns>
public static RectD TileBounds(PaveTileID ptID)
{
    //最小=像素转米(铺设IDX * 每个图块的像素(256),铺设IDY * 每个图块的像素(256),铺设IDZ)
    var min = PixelToMeters(new Vector2d(ptID.X * TileSize, ptID.Y * TileSize), ptID.Z);
    //最大=像素转米((铺设IDX+1) * 每个图块的像素(256),(铺设IDY+1) * 每个图块的像素(256),铺设ID Z)
    var max = PixelToMeters(new Vector2d((ptID.X + 1) * TileSize, (ptID.Y + 1) * TileSize), ptID.Z);
    return new RectD(min, max - min);
}
#endregion
```
在**FlatMap.cs**的**Init**函数中，使用以上静态函数，计算出某缩放级别下，单个Tile的矩形，以米为单位
```C#
//参考TileRect =图块边界米(经纬度转图块(经纬度中心,缩放级别))
var refTileRect = GeoSystem.TileBounds(GeoSystem.LatLonToTileID(latLonCenter, zoom));
//zoom:6 ||refTileRect:626172.135712165,626172.135712165

//用上面的Size值，求世界相对缩放比
worldRelativeScale = (float)(1f / refTileRect.Size.X);
// worldRelativeScale:1.597005E-06
```
*注*：**LatLonCenter**、**zoom**、**refTileRect**影响最终结果值

---
---

# UnityTile And BulidMesh

**　　Unity图块和构建网格**

Unity图块类，动态挂载于每一个动态创建出来的tile上;
动态创建空物体，在空物体上绘制出来所需四边形Mesh,赋予材质等;
so,空物体必须含有两个组件:**网格渲染器**、**网格过滤器**;
考虑到交互操作,图块需响应操作,每个物体还应有**碰撞器**;
以及图块缩放，(该值实际上是计算出来的世界相对缩放比);
双精度浮点类型的矩形结构体属性,用于uTile的Rect值(该值将转换为米)

**UnityTile.cs** 
```C#
public class UnityTile : MonoBehaviour
{
    /// <summary> 网格渲染器 </summary>
    private MeshRenderer meshRenderer;
    public MeshRenderer MeshRenderer
    {
        get {
            if(meshRenderer == null)
            { meshRenderer = GetComponent<MeshRenderer>(); }
            return meshRenderer;
        }
    }

    /// <summary> 网格过滤器 </summary>
    private MeshFilter meshFilter;
    public MeshFilter MeshFilter
    {
        get {
            if(meshFilter == null)
            { meshFilter = GetComponent<MeshFilter>(); }
            return meshFilter;
        }
    }

    /// <summary> 碰撞器 </summary>
    private Collider col;
    public Collider Collider
    {
        get {
            if(col == null)
            { col = GetComponent<Collider>(); }
            return col;
        }
    }

    /// <summary> 图块缩放属性 </summary>
    public float TileScale { get; internal set; }

    /// <summary> 双精度类型矩阵 </summary>
    private RectD rectD;
    public RectD RectD { get { return rectD; } }

    /// <summary> 初始化函数 </summary>
    internal void Init()
    {
        Debug.Log("UnityTile -Init!");
    }
}
```
在**FlatMapFty.cs**中写一个构建网格的函数，**Quad**为两个三角形的对拼,注意三个必要元素**vertices**(顶点组)、**triangles**(三角形组)、**uv**(UV组)的顺序.
```C#
/// <summary> 缓存Quad </summary>
private Mesh cacheQuad;

/// <summary> 构建四边形 </summary>
/// <param name="uTile"> UnityTile类 </param>
/// <returns> 构建出来的的Quad </returns>
private Mesh BulidQuad(UnityTile uTile)
{
    //创建一个网格
    Mesh quadMesh = new Mesh
    {
        //顶点组 ，Quad为XZ向的平面,所以Y轴为0
        vertices = new Vector3[] {
            //第一个点:uT的图块缩放比*(uT矩形最小-uT矩形中心).转为V3XZ
            uTile.TileScale*((uTile.RectD.Min-uTile.RectD.Center).V2dToV3XZ()),
            //第二个点:uT的图块缩放比*(V3(uT矩形最小X-uT矩形中心X),0,(uT矩形最大Y-uT矩形中心Y))
            uTile.TileScale*(new Vector3(
                (float)(uTile.RectD.Min.X - uTile.RectD.Center.X),0,
                (float)(uTile.RectD.Max.Y - uTile.RectD.Center.Y))),
            //第三个点:uT的图块缩放比*(V3(uT矩形最大X-uT矩形中心X),0,(uT矩形最小Y-uT矩形中心Y))
            uTile.TileScale*(new Vector3(
                (float)(uTile.RectD.Max.X -uTile.RectD.Center.X),0,
                (float)(uTile.RectD.Min.Y-uTile.RectD.Center.Y))),
            //第四个点:uT的图块缩放比*(uT矩形最大-uT矩形中心).转为V3XZ
            uTile.TileScale*((uTile.RectD.Max -uTile.RectD.Center).V2dToV3XZ())},

        //三角形组
        triangles = new int[] { 0, 1, 2, 1, 3, 2 },

        //uv组
        uv = new Vector2[] { Vector2.up, Vector2.one, Vector2.zero, Vector2.right }};

    quadMesh.RecalculateNormals();//重置法线
    uTile.MeshFilter.sharedMesh = quadMesh;//赋值给网格过滤器
    cacheQuad = quadMesh;//赋值给缓存Quad,就无需每次创建
    return quadMesh;
}
```
写一个获取Quad的函数
```C#
#region 获取构建出来的Quad
/// <summary> 获取Quad </summary>
/// <param name="uTile"></param>
/// <returns> 缓存中或创建的Quad </returns>
private Mesh GetQuad(UnityTile uTile)
{//如果缓存不为空，返回缓存中的Quad，否则返回构建的Quad
    if(cacheQuad != null)
    { return cacheQuad; }
    return BulidQuad(uTile);
}
#endregion
```
在**BaseMapFty.cs**中定义注册和注销，以及衍生类的注册注销函数，使其更符合AF模式
**BaseMapFty.cs**
```C#
/// <summary> 注册函数 </summary>
/// <param name="uTile"></param>
public void Register(UnityTile uTile) { OnRegister(uTile); }
/// <summary> 注销函数 </summary>
/// <param name="uTile"></param>
public void UnRegister(UnityTile uTile) { OnUnRegister(uTile); }
/// <summary> 衍生类注册函数 </summary>
/// <param name="uTile"></param>
internal abstract void OnRegister(UnityTile uTile);
/// <summary> 衍生类注销函数 </summary>
/// <param name="uTile"></param>
internal abstract void OnUnRegister(UnityTile uTile);
```
在**FlatMapFty.cs**中重写注册及注销函数,注册函数中，检测物体组件是否存在，不存在则添加
```C#
/// <summary> 基础材质 </summary>
[SerializeField]
private Material baseMat;
/// <summary> 默认不添加碰撞器 </summary>
[SerializeField]
private bool addCollider = false;

/// <summary> 重写注册函数 </summary>
/// <param name="uTile"></param>
internal override void OnRegister(UnityTile uTile)
{
    //如果渲染器为空，则添加渲染器,赋予基础材质
    if(uTile.MeshRenderer == null)
    {
        MeshRenderer mr = uTile.gameObject.AddComponent<MeshRenderer>();
        mr.material = baseMat;
    }
    
    //如果过滤器为空，则添加过滤器
    if(uTile.MeshFilter == null)
    {
        uTile.gameObject.AddComponent<MeshFilter>();
        //给过滤器Mesh 添加构建的Quad
        uTile.MeshFilter.sharedMesh = GetQuad(uTile);
    }

    //如果勾选添加碰撞器，并且碰撞器为空，则添加box碰撞器
    if(addCollider && uTile.Collider == null)
    { uTile.gameObject.AddComponent<BoxCollider>(); }
    
    Debug.Log("FlatMapFty - OnRegister!");
}
/// <summary> 重写注销函数 </summary>
/// <param name="uTile"></param>
internal override void OnUnRegister(UnityTile uTile) { }
```
完善**UnityTile.cs** 定义铺设图块ID和规范图块ID的字段属性
```C#
/// <summary> 铺设图块ID </summary>
private PaveTileID paveTileID;
public PaveTileID PaveTileID
{ get { return paveTileID; } }

/// <summary> 规范图块ID </summary>
private NormTileID normTileID;
public NormTileID NormTileID
{ get { return normTileID; } }
```
完善该类的初始化函数,在此函数中，控制该类所载物体的**SetActive**
```C#
/// <summary> 初始化函数 </summary>
/// <param name="readMap"> 可读地图接口 </param>
/// <param name="ptID"> 铺设图块ID </param>
/// <param name="scale"> 缩放 </param>
internal void Init(IReadMap readMap ,PaveTileID ptID,float scale)
{
    TileScale = scale;//缩放
    rectD = GeoSystem.TileBounds(ptID);//一个图块的Rect值
    paveTileID = ptID;//
    normTileID = ptID.NormTileID;//规范图块ID
    gameObject.SetActive(true);//启用该物体
    Debug.Log("UnityTile -Init!");
}
```
写一个该类所载物体的回收函数,{伪：硬代码}
```C#
/// <summary> 暂时的回收函数 </summary>
internal void Recycle()
{
    gameObject.SetActive(false);//物体隐藏
    var childCount = transform.childCount;//子物体数量
    if(childCount > 0)
    { //逐个删除子物体
        for(int i = 0; i < childCount; i++)
        { Destroy(transform.GetChild(i).gameObject); }
    }
} 
```

---
---

# BaseMapVisual And Use

**　　基础地图可视化和暂时的测试**

**BaseMapVisual**为地图可视化基类
该类本应为抽象类，但目前用于测试代码逻辑，暂时继承**MonoBehaviour**,将本类挂载于Map物体.
使用**Dictionary**(字典)存储激活的图块,
使用**Queue**(队列)存储以创建但非激活中的图块.
主要有**LoadTile**(创建并加载Tile),以及**DisposeTile**(处理非激活图块)的函数

**BaseMapVisual.cs**
```C#
/// <summary> 地图可视化基类 </summary>
public class BaseMapVisual : MonoBehaviour
{
    /// <summary> 可读地图接口 </summary>
    protected IReadMap readMap;
    public IReadMap ReadMap { get { return readMap; } }

    /// <summary> 激活中的图块字典 </summary>
    protected Dictionary<PaveTileID, UnityTile> activeTileDic = new Dictionary<PaveTileID, UnityTile>();
    public Dictionary<PaveTileID, UnityTile> ActiveTileDic { get { return activeTileDic; } }

    /// <summary> 存储已创建但非激活中的图块 </summary>
    protected Queue<UnityTile> inactiveTileQue = new Queue<UnityTile>();

    /// <summary> 平面地图工厂类变量 </summary>
    private FlatMapFty flatMapFty;

    /// <summary> 初始化 </summary>
    /// <param name="readMap"></param>
    public void Init(IReadMap rMap)
    {
        readMap = rMap;
        flatMapFty = new FlatMapFty();//实例化平面地图工厂类

        //激活图块字典中的所有KEY存储为集合
        var activeTiles = activeTileDic.Keys.ToList();
        //处理集合中每个图块
        foreach(var tile in activeTiles)
        { DisposeTile(tile); }
    }

    /// <summary> 创建并加载Tile </summary>
    /// <param name="ptID"> 铺设图块ID</param>
    /// <returns> uT图块 </returns>
    public virtual UnityTile LoadTile(PaveTileID ptID)
    {
        UnityTile uTile = null;

        //移除并返回位于 Queue 开始处的对象,赋值给uT
        if(inactiveTileQue.Count > 0)
        { uTile = inactiveTileQue.Dequeue(); }

        //如果uT为空，则创建空物体，并且将UnityTile类挂载到物体
        if(uTile == null)
        {
            uTile = new GameObject().AddComponent<UnityTile>();
            //将uT物体挂载到Map根节点下
            uTile.transform.SetParent(readMap.MapRoot, false);
        }

        //uT的初始化 (铺设图块ID ,计算出来的世界缩放比)
        uTile.Init(readMap, ptID, readMap.WorldRelativeScale);

        uTile.gameObject.name = uTile.NormTileID.ToString();//给物体命名

        flatMapFty.Register(uTile);//调用注册函数
        ActiveTileDic.Add(ptID, uTile);//激活图块字典中添加一组键值对

        Debug.Log("BaseMapVisual - LoadTile!");
        return uTile;
    }

    /// <summary> 处理非激活的图块 </summary>
    /// <param name="ptID"></param>
    public void DisposeTile(PaveTileID ptID)
    {
        var uTile = ActiveTileDic[ptID];//激活图块字典中的指定铺设图块
        uTile.Recycle();//将其回收
        ActiveTileDic.Remove(ptID);//在激活图块字典中移除
        inactiveTileQue.Enqueue(uTile);//追加到未激活图块队列中
        flatMapFty.UnRegister(uTile);//调用注销函数

        Debug.Log("BaseMapVisual - DisposeTile!");
    }
}
```
测试一下功能，在**BaseMap**类中
```C#
/// <summary> 地图可视化基类 </summary>
protected BaseMapVisual baseMapVisual;
public BaseMapVisual BaseMapVisual
{ get { return baseMapVisual; } }
```
在其**Awake**函数中获取该组件
```C#
if(baseMapVisual == null)
{ baseMapVisual = GetComponent<BaseMapVisual>(); }
```
在其衍生类**FlatMap**的初始化函数中，调用函数
```C#
BaseMapVisual.Init(this);//初始化
//测试用的经纬度转图块ID，拿到一个铺设图块的ID
PaveTileID ptID = GeoSystem.LatLonToTileID(latLon,zoom);
BaseMapVisual.LoadTile(ptID);//调用创建并加载图块函数
```
**Material** 材质及纹理暂时没有细化

**FlatMapFty.cs** 写一个获取材质的函数，返回获取到的材质 *{伪：硬代码}*
```C#
/// <summary> 获取材质 暂时 </summary>
/// <param name="uTile"></param>
/// <returns></returns>
private Material GetMaterial(UnityTile uTile)
{       
    Material mat = Resources.Load("Material/TerrainMaterial") as Material;
    uTile.MeshRenderer.material = mat;
    return mat;
}
```
将本类重写注册函数中的渲染器监测代码改为：
```C#
//如果渲染器为空，则添加渲染器,赋予基础材质
if(uTile.MeshRenderer == null)
{
    uTile.gameObject.AddComponent<MeshRenderer>();
    //渲染器材质 =获取的材质
    uTile.MeshRenderer.material = GetMaterial(uTile);
}
```

---
---

# PlaceTile

**　　放置图块**

通过一系列计算，求出动态创建的UnityTile物体的自身位置，以及自身缩放值

BaseMapVisual.cs添加一个用于衍生类重写的放置图块函数
```C#
/// <summary> 用于衍生类重写的放置图块函数 </summary>
/// <param name="ptID">铺设ID</param>
/// <param name="uTile"> uT类 /param>
/// <param name="readM"> 可读地图 </param>
protected abstract void PlaceTile(PaveTileID ptID, UnityTile uTile, IReadMap rMap);
```
在**FlatMapVisual** 平面地图可视类中重写放置图块函数
```C#
public class FlatMapVisual : BaseMapVisual
{
    /// <summary> 放置图块函数 </summary>
    /// <param name="ptID"></param>
    /// <param name="uTile"></param>
    /// <param name="rMap"></param>
    protected override void PlaceTile(PaveTileID ptID, UnityTile uTile, IReadMap rMap)
    { Debug.Log("FlatMapVisual - PlaceTile"); }
}
```
该函数中需要计算出，对应真实世界地理及缩放级别，动态创建的uTile物体在场景的位置.
### Transform 的计算
- **localPosition**:自身位置， 其中Y值保持为0，XZ为计算结果
- **localScale**:自身缩放,Y值保持为1，XZ为计算结果

根据墨卡托点，及缩放级别，计算出当前图块ptID类型的ID，因墨卡托与屏幕的起始点不同，x/y需要翻转。
```C#
#region 墨卡托 → 单个图块标识符
/// <summary> 墨卡托 → 单个图块标识符 </summary>
/// <param name="mercator"> 墨卡托坐标值 </param>
/// <param name="zoom"> 缩放级别 </param>
/// <returns> 单个图块标识符 </returns>
public static PaveTileID MercatorToTileID(Vector2d mercator, int zoom)
{
    // 当前级别的tile总数量,如zoom=6,则tileCount=64;
    double tileCount = (1 << zoom);
    //Floor返回小于或等于指定数字的最大整数,翻转x / y 使公式起作用
    //如zoom=6,merc=0.则(1+(0/墨卡托最大米))/2 *64 结果：x=32
    double x = Math.Floor((1 + (mercator.X / MercMaxM)) / 2 * tileCount);
    double y = Math.Floor((1 - (mercator.Y / MercMaxM)) / 2 * tileCount);
    return new PaveTileID(zoom, (int)x, (int)y);
}
#endregion
```
在类的**PlaceTile**函数中调用**MercatorToTileID**墨卡托→图块ID函数，返回**PaveTileID**类型的中心图块ID
```C#
//通过墨卡托转TilID函数，拿到中心Tile的ptID
PaveTileID cenTilePTID = GeoSystem.MercatorToTileID(rMap.MercatorCenter, rMap.Zoom);
```
得到中心图块，将该图块的中心点，转换为墨卡托坐标值**米单位**
```C#
#region 单个图块中心点 → 墨卡托坐标值
/// <summary> 单个tile 墨卡托坐标系 </summary>
/// <param name="x"> 图块X标识符 </param>
/// <param name="y"> 图块Y标识符 </param>
/// <param name="zoom"> 缩放级别 </param>
/// <returns> V2d墨卡托坐标值 </returns>
/// 该函数，参数为ptID,结果为米，用于对该tile在untiy中P值的运算
public static Vector2d TileToMercator(int x, int y, int zoom)
{
    double cenX = x + 0.5;
    double cenY = y + 0.5;

    cenX = ((cenX / (1 << zoom) * 2) - 1) * MercMaxM;
    cenY = (1 - (cenY / (1 << zoom) * 2)) * MercMaxM;
    return new Vector2d(cenX, cenY);
}
#endregion
```
在类的**PlaceTile**函数中调用**TileToMercator**单个图块中心点 → 墨卡托坐标值，返回**Vector2d**类型的墨卡托米
```C#
//将中心图块的中心点，转换为墨卡托米
Vector2d cenTilePTIDCen = GeoSystem.TileToMercator(cenTilePTID.X, cenTilePTID.Y, ReadMap.Zoom);
```
将中心图块中心的墨卡托米值，进行翻转 = 墨卡托中心 - 中心图块的中心
如：中心点(0,0),中心土块墨卡托(5,-5),相减，shift=(-5,5)
```C#
Vector2d shift = rMap.MercatorCenter - cenTilePTIDCen;
```
通过维度和缩放级别，计算出每像素所表示米值
```C#
#region 墨卡托 → 米像素
/// <summary> 墨卡托 → 每像素表示的米值 </summary>
/// <param name="lat"> 纬度 </param>
/// <param name="zoom"> 缩放级别 </param>
/// <returns> 一个像素代表的米 </returns>
public static float PixelInMeter(float lat, int zoom)
{
    return (float)(40075016.685578d * Math.Cos(
             Mathf.Deg2Rad * lat) / Math.Pow(2f, zoom + 8));
}
#endregion
```
根据求出的每像素米，在0f(赤道)，计算出来一个因数，避免高纬度时，出现数值错误
```C#
//  6261.721 = 2445.985 * 256(像素)/100(Size)
float factor = GeoSystem.PixelInMeter(0f, ReadMap.Zoom) * 256 / ReadMap.UTileSize;
```
以上计算无误后，计算UnityTile的lP值,lS(缩放值)
```C#
//计算UnityTile的lP值
Vector3 uTilePos = new Vector3(
    //(图块IDX - 中心图块IDX) * 图块Size - (翻转的墨卡托X值 / 因数)
    (ptID.X - cenTilePTID.X) * ReadMap.UTileSize - (float)shift.X / factor, 0,
    //(中心图块IDY - 图块IDY) * 图块Size - (翻转的墨卡托Y值 / 因数)
    (cenTilePTID.Y - ptID.Y) * ReadMap.UTileSize - (float)shift.Y / factor);

    uTile.transform.localPosition = uTilePos;
    //UnityTile的缩放值
    uTile.transform.localScale = new Vector3(ReadMap.UTileSize, 1, ReadMap.UTileSize);
```
**BaseMapVisual**类的**LoadTile**函数中,uTile初始化函数之后，调用**PlaceTile**函数
```C#
PlaceTile(ptID,uTile,readMap);//调用放置图块函数
//输出结果：经纬度(0,0),缩放级别6,图块lP值(-50,50)
```

---
---

# TileSupply

**　　图块供应**

主要是：添加和移除图块的事件，及相关函数实现和调用

**BaseTileSupply** 图块供应基类,继承Mono，因衍生类需挂载于物体
```C#
public abstract class BaseTileSupply :MonoBehaviour
{
    /// <summary> 添加图块事件 </summary>
    public event Action<PaveTileID> OnAddTile = delegate { };

    /// <summary> 移除图块事件 </summary>
    public event Action<PaveTileID> OnRemoveTile = delegate { };

    /// <summary> 激活的图块字典 </summary>
    protected Dictionary<PaveTileID, byte> activeTileDic = new Dictionary<PaveTileID, byte>();

    /// <summary> 地图接口 </summary>
    protected IMap iMap;

    /// <summary> 初始化函数 </summary>
    /// <param name="map"></param>
    public void Init(IMap map)
    {
        activeTileDic.Clear();//清理字典
        iMap = map;
        OnInit(); //调用衍生类初始化函数
    }

    /// <summary> 添加图块 </summary>
    /// <param name="ptID"></param>
    protected void AddTile(PaveTileID ptID)
    {
        //如果字典中已有当前图块ID
        if(activeTileDic.ContainsKey(ptID))
        { return; }
        activeTileDic.Add(ptID, 0);//将图块加入字典
        OnAddTile(ptID); //调用添加图块的委托事件
    }

    /// <summary> 移除图块 </summary>
    /// <param name="ptID"> pt图块ID </param>
    protected void RemoveTile(PaveTileID ptID)
    {
        //如果字典中不含当前图块ID
        if(!activeTileDic.ContainsKey(ptID))
        { return; }
        activeTileDic.Remove(ptID);//将图块移除字典
        OnRemoveTile(ptID);//调用移除图块的委托事件
    }

    /// <summary> 用于衍生类重写的初始化函数 </summary>
    internal abstract void OnInit();
}
```
**FlatTileSupply** 平面图块供应类，重写初始化函数
在**BaseMap**类中，声明该类的字段属性，并且在Awake中获取该组件
并将另外两个类实例化，进行null判断，避免多余开销or类冲突
```C#
/// <summary> 平面图块供应类 </summary>
private FlatTileSupply flatTileSupply;
public FlatTileSupply FlatTileSupply
{ get { return flatTileSupply; } }

private void Awake()
{
    //地图根节点
    if(!mapRoot)
    { mapRoot = transform; }

    latLonStr = "0,0";//给个默认值，不然总报空

    flatMapFty = new FlatMapFty(); //平面地形工厂类实例化
    flatMapVisual = new FlatMapVisual();//平面地图可视类实例化
    flatTileSupply = GetComponent<FlatTileSupply>();//平面图块供应类，获取该组件
}
```
在**BaseMap**类中，增加图块供应类的添加移除图块事件的实现函数
```C#
/// <summary> 图块供应类的添加图块事件实现 </summary>
/// <param name="ptID"></param>
void TileSupply_OnAddTile(PaveTileID ptID)
{//平面地图可视类.加载图块函数
    FlatMapVisual.LoadTile(ptID); }

/// <summary> 图块供应类的移除图块时间实现 </summary>
/// <param name="ptID"></param>
void TileSupply_OnRemoveTile(PaveTileID ptID)
{// 平面地图可视类.处理图块函数
    FlatMapVisual.DisposeTile(ptID); }
```
在该类**Awake**函数中，添加对应事件
```C#
//+=添加图块事件的实现函数
FlatTileSupply.OnAddTile += TileSupply_OnAddTile;
//+=移除图块事件的实现函数
FlatTileSupply.OnRemoveTile += TileSupply_OnRemoveTile;
```
在**FlatTileSupply**类中做个测试,鼠标左肩抬起时，创建图块
内中0,0经纬度，6地图缩放级别.
```C#
private void Update()
{
    if(Input.GetMouseButtonUp(0))
    {
        //测试用的经纬度转图块ID，拿到一个铺设图块的ID
        PaveTileID ptID = GeoSystem.LatLonToTileID(new Vector2d(0,0), 6);
        AddTile(ptID);
        Debug.Log("FlatTileSupply - AddTile！");
    }
}
```

---
---

# Control Move And Zoom

**　　控制移动和缩放**

场景地图为XZ方向，初始化时将相机调整俯视
鼠标滚轴控制相机自身P.Y轴值在一定范围内变更;
当相机Y到达设定的最大or最小变焦值时,重新定位相机,并且改变地图缩放级别(增加or减少一级)。

**FlatTileSupply**平面图块供应类
```C#
/// <summary> 相机 </summary>
private Camera refCamera;
/// <summary> 相机的上一个Y轴值记录 </summary>
private float previousY = float.MinValue;

/// <summary> 相机变焦最小Y </summary>
private int cameraZoomMinY;
public int CameraZoomMinY
{ get { return CameraZoomMinY; } }

/// <summary> 相机变焦最大Y </summary>
private int cameraZoomMaxY;
public int CameraZoomMaxY
{ get { return cameraZoomMaxY; } }

/// <summary> 平面地图类变量 </summary>
private FlatMap flatMap;

/// <summary> 变焦速率 </summary>
private float zoomSpeed = 50f;

/// <summary> 重写初始化函数 </summary>
internal override void OnInit()
{
    refCamera = Camera.main;//获取相机

    //获取该组件
    flatMap = GetComponent<FlatMap>();
    if(null == flatMap)
    { Debug.Log("Not Get FlatMap!"); }

    //最大缩放值
    flatMap.MaxZoom = flatMap.MaxZoom == 0 ? 10 : flatMap.MaxZoom;
    //相机变焦最小Y
    cameraZoomMinY = (int)(flatMap.UTileSize * 1.25f);
    //相机变焦最大Y
    cameraZoomMaxY = (int)(flatMap.UTileSize * 2.5f);

    //把相机放在Y轴最大最小值中间
    Vector3 localPos = refCamera.transform.position;
    localPos.x = 0;
    localPos.y = (cameraZoomMinY + cameraZoomMaxY) / 2;
    localPos.z = 0;
    //重新赋值相机的自身LP.Y轴值
    refCamera.transform.localPosition = localPos;
    //相机俯视平面地图
    refCamera.transform.rotation = new Quaternion(0.7f, 0, 0, 0.7f);
    //计算镜头变焦速率
    zoomSpeed = flatMap.UTileSize / 2f;

    Debug.Log("FlatTileSupply - OnInit！");
}
```
**Update**函数中实现，滚轴控制相机变焦，变更地图缩放级别
```C#
//鼠标滚轴控制相机Y轴镜头远近，改变地图缩放级别
float yMove = Input.GetAxis("Mouse ScrollWheel") * zoomSpeed;

if(0 != yMove)
{ refCamera.transform.Translate(new Vector3(0, yMove, 0), Space.World); }

//相机Y轴
float cameraY = refCamera.transform.localPosition.y;

//如果没有缩放，直接返回
if(cameraY == previousY){ return; }
previousY = cameraY;//相机Y赋值给上次相机Y轴值记录

//如果相机Y在最小Y和最大Y之间，直接返回
if(cameraY > cameraZoomMinY && cameraY < cameraZoomMaxY)
{ return; }

//相机LP值
Vector3 cameraLPos = refCamera.transform.position;

//相机远离平面地图，缩小
if(cameraY < cameraZoomMinY)
{
    //已处于最高级别(21)，不再增加地图缩放级别值
    if(flatMap.Zoom == flatMap.MaxZoom){ return; }
    //设置地图缩放级别，地图缩放级别 -1
    flatMap.SetZoom(flatMap.Zoom - 1);
    cameraLPos.y = cameraZoomMaxY;//相机自身Y为相机变焦最大Y值
    refCamera.transform.localPosition = cameraLPos;//给相机赋新值
}

//相机镜头靠近平面地图，放大
else if(cameraY > CameraZoomMaxY)
{
    //已处于最底层(0)，不在减少地图缩放级别值
    if(flatMap.Zoom == flatMap.MinZoom){ return; }
    //设置地图缩放级别，地图缩放级别 +1
    flatMap.SetZoom(flatMap.Zoom + 1);
    cameraLPos.y = cameraZoomMinY;//相机自身Y为相机变焦最小Y值
    refCamera.transform.localPosition = cameraLPos;//相机赋新值
}
```
**一键归位**
```C#
//鼠标右键，设置墨卡托中心到0,0
if(Input.GetKeyUp(KeyCode.Q))
{ flatMap.SetMerCenter(Vector2d.Zero); return; }
```
**鼠标中键(滚轴)** 按下，来测试添加物体
```C#
if(Input.GetMouseButtonUp(2))
{
    //测试用的经纬度转图块ID，拿到一个铺设图块的ID
    PaveTileID ptID = GeoSystem.LatLonToTileID(flatMap.LatLonCenter, flatMap.Zoom);

    AddTile(ptID);
    Debug.Log("FlatTileSupply - AddTile！");
}
```
**控制移动** 鼠标 or 键盘皆可
```C#
/// <summary> 原点 </summary>
private Vector3 origin;

private void Update()
{
    //横向移动 键盘A D ← → or 鼠标横向
    float xMove = Input.GetAxis("Horizontal");
    //纵向移动 键盘W S ↑ ↓ or 鼠标纵向
    float zMove = Input.GetAxis("Vertical");
    //鼠标滚轴控制相机Y轴镜头远近，改变地图缩放级别
    float yMove = Input.GetAxis("Mouse ScrollWheel") * zoomSpeed;

    if(0!=xMove || 0 != zMove)
    {
        //通过求每像素米函数，计算出一个因数
        float factor = GeoSystem.PixelInMeter((float)flatMap.LatLonCenter.X, flatMap.Zoom) * 256 / flatMap.UTileSize;

        xMove *= factor;
        zMove *= factor;

        //重新计算墨卡托中心点
        flatMap.SetMerCenter(flatMap.LatLonCenter + new Vector2d(xMove, zMove));

        Debug.Log("LR Move！");
    }

    //鼠标左键按下
    if(Input.GetMouseButtonDown(0))
    {
        //鼠标按下的点，在屏幕的位置
        var mouseDownPos = Input.mousePosition;
        //将相机自身P.Y轴值赋值给鼠标z
        mouseDownPos.z = refCamera.transform.localPosition.y;
        //将该点，使用屏幕转世界函数，转换为V3向量类型的值
        origin = refCamera.ScreenToWorldPoint(mouseDownPos);

        Debug.Log("MD Origin:"+origin);
    }

    //鼠标左键抬起
    if(Input.GetMouseButtonUp(0))
    {
        //鼠标左键抬起时的屏幕点
        var mouseUpPos = Input.mousePosition;
        //将相机自身P.Y赋值给鼠标点的Z轴
        mouseUpPos.z = refCamera.transform.localPosition.y;
        //将该店转换为 V3向量类型值
        var mouseUpWorld = refCamera.ScreenToWorldPoint(mouseUpPos);

        Debug.Log("MU World:"+mouseUpWorld);

        //比较鼠标按下和抬起时的点值
        if(origin != mouseUpWorld)
        {
            //将两者差值，作为偏移量
            var offset = origin - mouseUpWorld;

            //计算因数
            float factor = GeoSystem.PixelInMeter((float)flatMap.LatLonCenter.X, flatMap.Zoom) * 256 / flatMap.UTileSize;

            flatMap.SetMerCenter(flatMap.LatLonCenter + new Vector2d(offset.x * factor, offset.z * factor));

            Debug.Log("offset:"+offset.x+","+offset.z);
        }
    }
}
```

---
---

# Bound And Move

**　　边界和移动**

### Bounds 边界
- 屏幕边界：左下角 - 右上角;
- 地理边界：西南角 - 东北角;
- 地球边界：西经南纬 - 东经北纬;

**Vector2dBounds** 一个V2d类型的边界结构体,用于界定显示在场景中的地图部分。
```C#
public struct Vector2dBounds
{
    /// <summary> 西南角 东北角</summary>
    public Vector2d WestSouth { get; set; }
    public Vector2d EastNorth { get; set; }

    public Vector2dBounds(Vector2d ws, Vector2d en)
    {
        WestSouth = ws;
        EastNorth = en;
    }

    /// <summary> 南纬 </summary>
    public double South { get { return WestSouth.X; } }
    /// <summary> 西经 </summary>
    public double West { get { return WestSouth.Y; } }
    /// <summary> 北纬 </summary>
    public double North { get { return EastNorth.X; } }
    /// <summary> 东经 </summary>
    public double East { get { return EastNorth.Y; } }

    /// <summary> 地理边界框是不是空的 true空，其它false </summary>
    /// <returns>  </returns>
    public bool IsEmpty()
    { return WestSouth.X > EastNorth.X || WestSouth.Y > EastNorth.Y; }
}
```
创建一个**Plane**(地平面)，用于接收射线 
*注：此Plane非是Unity中的可见物体Plane*
```C#
/// <summary> 地平面 </summary>
private Plane groundPlane;

internal override void OnInit()
{groundPlane = new Plane(Vector3.up, 0);} //创建地平面
```
写一个通过地平面获取地平面到射线点的函数，用于监测边界点
```C#
/// <summary> 获取地平面到射线点 </summary>
/// <param name="ray"></param>
/// <returns></returns>
private Vector3 GetPlaneHitPoint(Ray ray)
{
    float distance;
    if(!groundPlane.Raycast(ray,out distance))
    { return Vector3.zero; }
    return ray.GetPoint(distance);//沿射线返回一个点
}
```
根据射线，获取到当前视口内的墨卡托边界值
```C#
/// <summary> 获取当前视图内边界墨卡托值 </summary>
/// <param name="useGroundPlane"> 默认使用地平面 </param>
/// <returns> 西南-东北的墨卡托边界值 </returns>
/// 注：ws/WS表示：WestSouth西南; en/EN表示：EastNorth东北;
private Vector2dBounds GetCurViewBoundMerc(bool useGroundPlane = true)
{
    Vector3 hitPosWS, hitPosEN;//西南射线，东北射线

    if(useGroundPlane)
    {
        //西南角射线，屏幕左下角射线 = 相机.视口转射线
        Ray rayWS = refCamera.ViewportPointToRay(new Vector3(0, 0));
        //东北角射线， 屏幕右上角射线 = 相机.视口转射线
        Ray rayEN = refCamera.ViewportPointToRay(new Vector3(1, 1));

        // 获取地平面射线点 
        hitPosWS = GetPlaneHitPoint(rayWS);
        hitPosEN = GetPlaneHitPoint(rayEN);
    }
    else
    {
        // 西南角射线点  = 相机.视口转世界点
        hitPosWS = refCamera.ViewportToWorldPoint(new Vector3(0, 0, refCamera.transform.localPosition.y));
        // 东北角射线点  = 相机.视口转世界点
        hitPosEN = refCamera.ViewportToWorldPoint(new Vector3(1, 1, refCamera.transform.localPosition.y));
    }
    //基于赤道计算因数 
    double factor = GeoSystem.PixelInMeter(0, flatMap.Zoom) * 256 / flatMap.UTileSize;

    //计算西南角和东北角四个点
    double wsX = flatMap.MercatorCenter.X + hitPosWS.x * factor;
    double wsY = flatMap.MercatorCenter.Y + hitPosWS.z * factor;
    double enX = flatMap.MercatorCenter.X + hitPosEN.x * factor;
    double enY = flatMap.MercatorCenter.Y + hitPosEN.z * factor;

    //使用三元表达式，返回一个最大or最小的绝对值。
    wsX = wsX > 0 ? Math.Min(wsX, GeoSystem.MercMaxM) : Math.Max(wsX, -GeoSystem.MercMaxM);
    wsY = wsY > 0 ? Math.Min(wsY, GeoSystem.MercMaxM) : Math.Max(wsY, -GeoSystem.MercMaxM);
    enX = enX > 0 ? Math.Min(enX, GeoSystem.MercMaxM) : Math.Max(enX, -GeoSystem.MercMaxM);
    enY = enY > 0 ? Math.Min(enY, GeoSystem.MercMaxM) : Math.Max(enY, -GeoSystem.MercMaxM);
    //西南角墨卡托值
    Vector2d wsMerc = new Vector2d(wsX, wsY);
    //东北角墨卡托值
    Vector2d enMerc = new Vector2d(enX, enY);
    //西南-东北的墨卡托值作为边界值
    return new Vector2dBounds(wsMerc, enMerc);
}
```
### 移动地图和缩放级别
实现动态的视口墨卡托边界值，并且改变墨卡托中心点
```C#
/// <summary> 记录上一个墨卡托中心点 </summary>
private Vector2d previousMercCen;
/// <summary> 视口内墨卡托边界值 </summary>
private Vector2dBounds viewMercBounds;

internal override void OnInit()
{//记录墨卡托中心点，将在Update中使用
    previousMercCen = flatMap.MercatorCenter;}

private void Update()
{
    //当前视口墨卡托边界值
    Vector2dBounds curViewMercBounds = GetCurViewBoundMerc();
    //边界值是否有改变
    bool boundChange = !(viewMercBounds.ToString() == curViewMercBounds.ToString());

    viewMercBounds = curViewMercBounds;

    //更新视口墨卡托边界值
    viewMercBounds = GetCurViewBoundMerc();  
}
```
**移动平面地图**
```C#
#region 移动平面地图

//横向移动 键盘A D ← → or 鼠标横向
float xMove = Input.GetAxis("Horizontal");
//纵向移动 键盘W S ↑ ↓ or 鼠标纵向
float zMove = Input.GetAxis("Vertical");

Debug.Log("Unity平移：" + xMove + "," + zMove);

//如果xMove或者zMove不是0了
if(0 != xMove || 0 != zMove)
{
    //求一个因数，用于计算地理上，实际移动了多少米
    var factor = GeoSystem.PixelInMeter((float)flatMap.LatLonCenter.X, flatMap.Zoom) * 256 / flatMap.UTileSize;

    xMove *= factor;
    zMove *= factor;
    Debug.Log("World平移：" + xMove + "," + zMove);

    //把这个数据追加到原本的墨卡托中心点，计算新的墨卡托中心点
    flatMap.SetMerCenter(flatMap.MercatorCenter + new Vector2d(xMove, zMove));
    Debug.Log("SetMerCenter:" + flatMap.MercatorCenter.X+","+flatMap.MercatorCenter.Y);
}

//平移 如果墨卡托中心点，与记录的墨卡托中心点不同
if(!previousMercCen.Equals(flatMap.MercatorCenter))
{
    //将墨卡托中心点，赋值给记录墨卡托中心点变量
    previousMercCen = flatMap.MercatorCenter;
    //把激活图块字典中的KEY存储为集合,这些是需要移除的图块
    var removeList = activeTileDic.Keys.ToList();
    foreach(var remove in removeList)
    { RemoveTile(remove); }
}
#endregion
```
**鼠标拖动** 使用鼠标來移动地图
```C#
#region 鼠标左键，按下抬起，监测是否需要移动地图
//鼠标左键按下
if(Input.GetMouseButtonDown(0))
{
    //鼠标按下的点，在屏幕的位置
    var mouseDownPos = Input.mousePosition;
    //将相机自身P.Y轴值赋值给鼠标z
    mouseDownPos.z = refCamera.transform.localPosition.y;
    //将该点，使用屏幕转世界函数，转换为V3向量类型的值
    origin = refCamera.ScreenToWorldPoint(mouseDownPos);
    Debug.Log("MD Origin:" + origin);
}

//鼠标左键抬起
if(Input.GetMouseButtonUp(0))
{
    //鼠标左键抬起时的屏幕点
    var mouseUpPos = Input.mousePosition;
    //将相机自身P.Y赋值给鼠标点的Z轴
    mouseUpPos.z = refCamera.transform.localPosition.y;
    //将该店转换为 V3向量类型值
    var mouseUpWorld = refCamera.ScreenToWorldPoint(mouseUpPos);
    Debug.Log("MU World:" + mouseUpWorld);

    //比较鼠标按下和抬起时的点值
    if(origin != mouseUpWorld)
    {
        //将两者差值，作为偏移量
        var offset = origin - mouseUpWorld;

        //计算因数
        float factor = GeoSystem.PixelInMeter((float)flatMap.LatLonCenter.X, flatMap.Zoom) * 256 / flatMap.UTileSize;

        flatMap.SetMerCenter(flatMap.LatLonCenter + new Vector2d(offset.x * factor, offset.z * factor));
        Debug.Log("offset:" + offset.x + "," + offset.z);
    }
}
#endregion
```
**需要添加的图块** 此处计算是，需去掉仍然显示在场景中的激活图块部分
```C#
//需要添加的图块
var needTiles = GeoSystem.NeedTileCount(viewMercBounds, flatMap.Zoom);
//把激活图块字典中的KEY,存储为集合
var acTileList = activeTileDic.Keys.ToList();
//根据铺设ID类型，在需要的图块集合中，把需要移除的图块存储为集合
List<PaveTileID> removeTileList = acTileList.Except(needTiles).ToList();
//移除该集合中的图块
foreach(var rt in removeTileList){ RemoveTile(rt); }

//最终所需添加的图块 ,在需要的图块里面，去掉↑移除的KEY集合
var finalNeedTiles = needTiles.Except(acTileList);
foreach(var at in finalNeedTiles){ AddTile(at); }
```
**重置墨卡托中心** 鼠标右键重置墨卡托中心
```C#
//鼠标右键，设置墨卡托中心到0,0
if(Input.GetKeyUp(KeyCode.Q))
{ flatMap.SetMerCenter(Vector2d.Zero); return; }
```
**地图缩放级别切换** 鼠标滚轴，控制相机Y轴，根据Y轴值，变更地图缩放级别
*注：这部分需要写在本类Update的末尾，否则程序无法继续进行*{没整明白的BUG}
```C#
#region 鼠标滚轴控制相机变焦及地图缩放级别
//鼠标滚轴控制相机Y轴镜头远近，改变地图缩放级别
float yMove = Input.GetAxis("Mouse ScrollWheel") * zoomSpeed;
if(0 != yMove)
{ refCamera.transform.Translate(new Vector3(0, yMove, 0), Space.World); }

//相机Y轴
float cameraY = refCamera.transform.localPosition.y;

//如果没有缩放，直接返回
if(cameraY == previousY && !boundChange) { return; }
previousY = cameraY;//相机Y赋值给上次相机Y轴值记录

//如果相机Y在最小Y和最大Y之间，直接返回
if(cameraY > cameraZoomMinY && cameraY < cameraZoomMaxY && !boundChange)
{ return; }

//相机LP值
Vector3 cameraLPos = refCamera.transform.position;

//相机远离平面地图，缩小
if(cameraY < cameraZoomMinY)
{
    //已处于最高级别(21)，不再增加地图缩放级别值
    if(flatMap.Zoom == flatMap.MaxZoom) { return; }
    //设置地图缩放级别，地图缩放级别 -1
    flatMap.SetZoom(flatMap.Zoom - 1);
    cameraLPos.y = cameraZoomMaxY;//相机自身Y为相机变焦最大Y值
    refCamera.transform.localPosition = cameraLPos;//给相机赋新值
}
//相机镜头靠近平面地图，放大
else if(cameraY > CameraZoomMaxY)
{
    //已处于最底层(0)，不在减少地图缩放级别值
    if(flatMap.Zoom == flatMap.MinZoom) { return; }
    //设置地图缩放级别，地图缩放级别 +1
    flatMap.SetZoom(flatMap.Zoom + 1);
    cameraLPos.y = cameraZoomMinY;//相机自身Y为相机变焦最小Y值
    refCamera.transform.localPosition = cameraLPos;//相机赋新值
}
#endregion
```

---
---

# FlatMapImgFty

**　　平面地图纹理工厂**

给场景里面的Tiles贴上纹理，*暂时没有比较好的思路,以下为测试版*
**UnityTile** 类中，增加设置纹理数据，和获取纹理数据函数
```C#
/// <summary>  </summary>
[SerializeField]
private Texture2D texData;

/// <summary> 设置纹理数据 </summary>
/// <param name="data"> 纹理字节数据 </param>
/// <param name="useMipMap">是否使用多级纹理</param>
public void SetTexData(byte[] data, bool useMipMap)
{
    //纹理重复使用
    if(texData == null)
    {
        texData = new Texture2D(0, 0, TextureFormat.RGB24, useMipMap)
        { wrapMode = TextureWrapMode.Clamp };//缠绕模式:夹紧模式
    }
    texData.LoadImage(data);
    MeshRenderer.material.mainTexture = texData;
}
/// <summary> 获取纹理数据 </summary>
/// <returns> 纹理数据 </returns>
public Texture2D GetTexData() { return texData; }
```
**File IO** 使用文件流形式，读取一张纹理
```C#
/// <summary> 根据文件路径返回文件的字节流byte[] </summary>
/// <param name="filePath">文件路径</param>  
/// <returns>返回的字节流</returns>  
public static byte[] GetFileByte(string filePath)
{
    FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
    fileStream.Seek(0, SeekOrigin.Begin);
    byte[] fileBytes = new byte[fileStream.Length];//创建文件长度缓冲区
    fileStream.Read(fileBytes, 0, (int)fileBytes.Length); //读取文件
    fileStream.Close(); //释放文件流
    fileStream.Dispose();//释放资源
    fileStream = null;
    return fileBytes;
}
```

**FlatMapImgFty** 平面地图工厂。注册函数中设置纹理数据
```C#
/// <summary> 一张测试用的纹理 </summary>
private string url = @"E:\Maps\L05\05-004-008.jpg";

internal override void OnInit() { }

internal override void OnRegister(UnityTile uTile)
{//设置纹理数据  调用获取文件字节函数.
    uTile.SetTexData(FileHelper.GetFileByte(url), false);}

internal override void OnUnRegister(UnityTile uTile) { }
```
在**BaseMapVisual**地图可视化基类中声明**FlatMapImgFty**,实例化,调用注册函数
```C#
/// <summary> 平面地图纹理工厂 </summary>
private FlatMapImgFty flatMapImgFty;
```
在其初始化函数中，实例化该平面地图纹理类
```C#
flatMapImgFty = new FlatMapImgFty();//实例化平面地图纹理工厂
```
在其**LoadTile**函数中，调用**FlatMapImgFty**的注册函数
```C#
flatMapImgFty.Register(uTile);//调用平面地图纹理工厂类的注册函数
```
经测试，纹理方向有问题，需要将其调正.在**UnityTile**类中，增加一个函数
```C#
/// <summary> 调正纹理方向 </summary>
/// <param name="texture"> 需要旋转的纹理</param>
/// <param name="eulerAngles"> 旋转角度 </param>
/// <returns> 调整完毕的纹理 </returns>
private Texture2D RotateTexture(Texture2D texture, float eulerAngles)
{
    int x, y, i, j;
    float phi = eulerAngles / (180 / Mathf.PI);
    float sn = Mathf.Sin(phi);//以弧度返回角度的正弦值
    float cs = Mathf.Cos(phi);//以弧度为单位返回角度的余弦
    Color32[] arr = texture.GetPixels32();
    Color32[] arr2 = new Color32[arr.Length];
    int W = texture.width;
    int H = texture.height;
    int xc = W / 2;
    int yc = H / 2;

    for(j = 0; j < H; j++)
    {
        for(i = 0; i < W; i++)
        {
            arr2[j * W + i] = new Color32(0, 0, 0, 0);
            x = (int)(cs * (i - xc) + sn * (j - yc) + xc);
            y = (int)(-sn * (i - xc) + cs * (j - yc) + yc);
                
            if((x > -1) && (x < W) && (y > -1) && (y < H))
            { arr2[j * W + i] = arr[y * W + x]; }
        }
    }

    Texture2D newImg = new Texture2D(W, H);
    newImg.SetPixels32(arr2);
    newImg.Apply();
    return newImg;
}
```
将本类中**SetTexData**设置纹理数据函数中的赋值纹理部分，改为：
```C#
//MeshRenderer.material.mainTexture = texData;
meshRenderer.material.mainTexture = RotateTexture(texData, -90);
```

---
---

# Json Read Writer

**　　Unity中操作Json的读取和写入**

### 准备工作
- 创建Json文件,将计量单位按照类型区分;
- 目前只放了*LengthUnit*(长度单位)及*AreaUnit*(面积单位);

**Json文件**
```C#
{
    "name": "Measurement",
    "LengthUnit": [
        "Centimeter",
        "Meter",
        "Kilometer",
        "Inche",
        "Feet",
        "Yard",
        "Mile",
        "NauticalMile"
    ],
    "AreaUnit": [
        "SquareInche",
        "SquareMeter",
        "SquareKilometer",
        "SquareKilometer",
        "SquareFoot",
        "SquareYard",
        "SquareMile",
        "Acre",
        "SquareNauticalMile"
    ]
}
```

### Json文件的读取和写入类
- 此处需区分平台,以及*StreamingAssets*和*Assets*文件夹;
- *注：*目前只需要WinPC端,其它平台并未测试;

**JsonFileHelper**
```C#
/// <summary> Json的读取和写入 </summary>
public class JsonFileHelper
{
    #region 验证文件路径是否为相对路径
    /// <summary> 验证文件路径是否为相对路径，如果非相对路径，则将其作为相对路径返回 </summary>
    /// <param name="relativeFilePath"> 需验证的文件路径 </param>
    /// <returns> 相对路径 </returns>
    private static string OptimizeRelativeFilePath(string relativeFilePath)
    {
        if(relativeFilePath[0] == '/')
        { return relativeFilePath; }
        else
        { return "/" + relativeFilePath; }
    }
    #endregion


    #region StreamingAssets 文件夹的获取路径，读取文件，写入文件

    #region StreamingAssets - 获取不同平台下的SA文件夹路径
    /// <summary> 获取不同平台下的StreamingAssets文件夹 </summary>
    /// <returns> 每个平台对应的StreamingAssets的文件路径 </returns>
    public static string GetStreamingAssetsPathConsiderPlatform()
    {
        //Window,Mac 等PC端
        string streamingAssetsPath = "/StreamingAssets/JsonFile";

        // Android 端
        if(Application.platform == RuntimePlatform.Android)
        { streamingAssetsPath = "jar:file://" + Application.dataPath + "!/assets"; }

        // IOS 端
        else if(Application.platform == RuntimePlatform.IPhonePlayer)
        { streamingAssetsPath = "/Raw"; }

        return streamingAssetsPath;
    }
    #endregion

    #region StreamingAssets - 读取文件
    /// <summary> StreamingAssets - 读取文件 </summary>
    /// <param name="relativeFilePath"> 相对的文件路径 </param>
    /// <returns> 读取到的文件内容 </returns>
    public static string ReadFileFromStreamingAssets(string relativeFilePath)
    {
        relativeFilePath = OptimizeRelativeFilePath(relativeFilePath);
        return FileReadWriter.ReadFile(Application.dataPath + GetStreamingAssetsPathConsiderPlatform() + relativeFilePath, Encoding.UTF8);
    }
    #endregion

    #region StreamingAssets - 写入文件
    /// <summary> StreamingAssets - 写入文件 </summary>
    /// <param name="relativeFilePath"> 相对与SA文件夹的文件路径 </param>
    /// <param name="content"> 需要写入的内容 </param>
    /// <returns> 是否写入成功 </returns>
    public static bool WriteFileToStreamingAssets(string relativeFilePath, string content)
    {
        relativeFilePath = OptimizeRelativeFilePath(relativeFilePath);
        return FileReadWriter.WriteFile(Application.dataPath + GetStreamingAssetsPathConsiderPlatform() + relativeFilePath, content, Encoding.UTF8);
    }
    #endregion

    #endregion


    #region Assets

    #region Asseets - 读取文件
    /// <summary> Assets - 读取文件 </summary>
    /// <param name="relativeFilePath"> 相对路径 </param>
    /// <returns> 读取到的文件内容 </returns>
    public static string ReadFileFromAssets(string relativeFilePath)
    {
        relativeFilePath = OptimizeRelativeFilePath(relativeFilePath);
        return FileReadWriter.ReadFile(Application.dataPath + relativeFilePath, Encoding.UTF8);
    }
    #endregion

    #region Assets - 写入文件
    /// <summary> Assets - 写入文件 </summary>
    /// <param name="relativeFilePath"> 文件相对路径 </param>
    /// <param name="content"> 需写入的内容 </param>
    /// <returns> 是否写入成功 </returns>
    public static bool WriteFileToAssets(string relativeFilePath, string content)
    {
        relativeFilePath = OptimizeRelativeFilePath(relativeFilePath);
        return FileReadWriter.WriteFile(Application.dataPath + relativeFilePath, content, Encoding.UTF8);
    }
    #endregion

    #endregion


    #region Json

    #region StramingAssets - 读取Json
    /// <summary> 读取SA文件夹下的Json文件 </summary>
    /// <typeparam name="T"></typeparam>
    /// <returns> T类型的实例，其值从Json集中读取 </returns>
    public static T ReadJsonFromStreamingAssets<T>()
    { return JsonUtility.FromJson<T>(ReadFileFromStreamingAssets(typeof(T).Name + ".json")); }

    /// <summary> 读取SA文件夹下的Json文件 </summary>
    /// <typeparam name="T">  </typeparam>
    /// <param name="obj"> 加载Json并覆盖其值的实例 </param>
    public static void ReadJsonFromStreamingAssets<T>(T obj)
    { JsonUtility.FromJsonOverwrite(ReadFileFromStreamingAssets(typeof(T).Name + ".json"), obj); }
    #endregion

    #region StramingAssets - 写入Json
    /// <summary> StramingAssets - 写入Json </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="obj"></param>
    /// <returns> 是否写入成功 </returns>
    public static bool WriteJsonToStreamingAssets<T>(T obj)
    { return WriteFileToStreamingAssets(obj.GetType().Name + ".json", JsonUtility.ToJson(obj)); }
    #endregion

    #endregion
}
```

### 创建与Json文件同名的Json文件实体类

**Measurement**
```C#
/// <summary> 计量单位Json实体类 </summary>
[System.Serializable]
public class Measurement
{
    /// <summary> 长度单位 </summary>
    public List<string> LengthUnit;
    /// <summary> 面积单位 </summary>
    public List<string> AreaUnit;
}
```

### 小小测试一下
- 创建继承于*MonoBehaviour*的类,将其直接挂载场景空物体;
- 输出到控制台,测试功能是否OK.

**TestJson**
```C#
/// <summary> 测试Json功能类 </summary>
public class TestJson : MonoBehaviour
{
    /// <summary> Json实体类声明 </summary>
    [SerializeField]
    private Measurement measurement;

    string str = ""; //用于输出到控制台

    private void Start()
    {
        this.measurement = new Measurement(); //Json实体类实例化

        // 读取JSON文件
        this.measurement = JsonFileHelper.ReadJsonFromStreamingAssets<Measurement>();
        
        print(JsonUtility.ToJson(this.measurement));// 输出到控制台

        // 遍历长度单位集合,将其中每个元素打印到控制台
        for(int i = 0; i < measurement.LengthUnit.Count; i++)
        {
            str = measurement.LengthUnit[i];
            print(str);
        }
    }
}
```
