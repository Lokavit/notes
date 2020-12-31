## Vue 3.0

- 逻辑提取和重用

```js
/* ref 版本 */
import { ref, onMounted, onUnmounted } from "vue";

/** 导出该函数 */
export function useMousePosition() {
  const x = ref(0); // 默认值
  const y = ref(0); // 默认值

  // 或者使用
  const pos = { x: 0, y: 0 };

  /**
   * 获取鼠标位置
   * @param {*} event 事件中会传入一个值
   */
  function updatePosition(event) {
    x.value = event.pageX;
    y.value = event.pageY;
    // 如果使用pos对象形式，则此处为以下形式:
    pos.x = event.pageX;
    pos.y = event.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousedown", updatePosition);
  });

  onUnmounted(() => {
    window.addEventListener("mousedown", updatePosition);
  });

  return { x, y };
}

/* 在组件里使用 */
<template>
  <div class="hello">
    <div>mousedown.posistion: {{ x }},{{ y }}</div>
  </div>
</template>
<script>
import { useMousePosition } from "./useMousePosition";

export default {
  name: "HelloWorld",

  setup() {
    // 鼠标坐标
    const { x, y } = useMousePosition();
    return {
      x,
      y,
    };
  },
};
</script>

```

```js
/* reactive 版本 */
import { reactive, onMounted, onUnmounted } from "vue";

/** 导出该函数 */
export function useMousePosition() {
  const pos = reactive({
    x: 0,
    y: 0,
  });

  /**
   * 获取鼠标位置
   * @param {*} event 事件中会传入一个值
   */
  function updatePosition(event) {
    pos.x = event.pageX;
    pos.y = event.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousedown", updatePosition);
  });

  onUnmounted(() => {
    window.addEventListener("mousedown", updatePosition);
  });

  return pos;
}

/* 在组件里使用 */
<template>
  <div class="hello">
    <div>mousedown.posistion: {{ pos.x }},{{ pos.y }}</div>
  </div>
</template>
<script>
import { useMousePosition } from "./useMousePosition";

export default {
  name: "HelloWorld",

  setup() {
    return {
      pos: useMousePosition(),
    };
  },
};
</script>
```

### NavMenu 引入各个模块的[component],更优解决方式

- 使用[require.context()]创建自己的模块上下文,如动态批量引入.vue 文件
- 将以上返回结果，进行迭代，转为对象，用于在[components]注册
- 注:每个.vue 需有[name]属性

```js
/**
 * 使用 require.context() 方法来创建自己的（模块）上下文，这个方法有 3 个参数：
 * 要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。
 * return：返回一个（require）函数,其有三个属性
 * resolve:返回请求被解析后得到的模块id
 * keys():返回数组，由所有可能被上下文模块处理的请求组成
 * id:上下文模块里面所包含的模块id
 */
const requireComponent = require.context(
  "@/views", // 目录的相对路径
  true, // 是否查询其子目录
  /List[\w]+\.(vue|js)$/ // 匹配[List]件文件名的正则
);

/**
 * 该变量用于存储通过以上批量import的结果.keys()遍历所有文件名
 * 最终返回的就是每个component ,也就是components:{}的组件实例化
 */
const COMPONENTS = {};
requireComponent.keys().forEach((fileName) => {
  /**
   * fileName 输出为: [./Material/ListMaterial.vue] (也就是模块文件夹+内中文件.vue)
   * requireComponent(fileName).default 每个组件
   * requireComponent(fileName).default.name 每个组件里的[name]
   */
  COMPONENTS[requireComponent(fileName).default.name] = requireComponent(
    fileName
  ).default;
});

export default {
  components: COMPONENTS,
  data() {
    return {
      /**
       * 存储所有实例化的组件,用于创建全局模态框时,从其内容找到对应组件
       */
      comps: this.$options.components,
    };
  },
};
```

## 激活项，动态赋值样式

```html
<template>
  <footer class="footer_div">
    <ul>
      <template v-for="(item,key) in taskbar">
        <li
          :key="key"
          :class="{'li_active':activeKey ===key}"
          @click="taskClick(item,key)"
        >
          <div class="l-flex-row">
            <div style="padding:0 6px; padding-right:16px;">
              <span style="font-size:10px;">{{item.name}}</span>
            </div>
            <div style="margin-right:4px;line-height: 21px;">
              <svg-icon
                icon-name="zoomReset"
                style="width:8px;height:auto;"
                @click="handleZoomReset(item,key)"
              />
            </div>
            <div style="margin-right:8px;line-height: 21px;">
              <svg-icon
                icon-name="close"
                @click="handleClose($parent)"
                style="width:8px;height:8px;"
              />
            </div>
          </div>
        </li>
      </template>
    </ul>
  </footer>
</template>

<script>
  export default {
    name: "Footer",
    props: {
      tasks: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    data() {
      return {
        activeKey: -1, // 当前激活项
      };
    },
    computed: {
      taskbar() {
        return this.tasks;
      },
    },
    methods: {
      // 每个item的还原按钮事件
      handleZoomReset(item, key) {
        console.log("Moadl 显示: ITEM:", item, "KEY:", key);
        this.$emit("on-zoom", item, key);
      },
      // 每个签的关闭按钮
      handleClose(parent) {
        console.log("每个modal的点击事件");
        // event.cancelBubble = true; // 取消父组件点击事件 [事件冒泡]
        console.log("PARENT:", parent);
      },
      // 点击事件
      taskClick(item, key) {
        this.activeKey = key;
        // this.$emit("input", item); // v-model双向绑定
        // this.onChange ? this.onChange(item) : "";
        console.log("当前激活项:", this.activeKey);
      },
    },
  };
</script>
```

```css
/*  footer 底部工作台 */
.footer_div {
  /* background-color: #FFF; */
  width: auto;
  min-width: 1275px;
  height: 26px;
  position: absolute;
  bottom: 0;
  left: 58px;
  z-index: 1999;
  margin: 0 10px;
  line-height: 26px;
}

.footer_div ul > li {
  float: left;
  margin: 0 8px;
  border: 1px solid #eaedf6;
  box-shadow: 0 0 0 1px rgba(171, 173, 206, 0.53);
  background-color: #fff;
}

.footer_div ul > li:hover {
  background-color: #ced1dc;
}
/* 此处要继承，否则样式失效 */
.footer_div .li_active {
  background-color: #05286a;
  color: #fff;
}
```

# VUE-ERROR

## Common Errors Solutions

> ~/.vuerc
> 被保存的 preset 将会存在用户的 home 目录下一个名为 .vuerc 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。

> vue typescript 问题记录
>
> > Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning.
> > 解决方式：用 vscode 直接打开项目。可就是非工作区

VSCode 打开项目问题 必须是项目根目录 (tsconfig.json 文件只从当前根目录读取)

### eslint 相关错误解决

```JavaScript
/* .eslintrc.js */
module.exports = {
  rules: {
    // ESLint ： Expected linebreaks to be ‘LF’ but found ‘CRLF’ linebreak-style
    "linebreak-style": [0,"error", "windows"],
    // expected indentation of 0 spaces but found 2 . 不校验空格缩进
    'indent': 'off',
  },
};
```

```Json
/* 在VSCodesetting.json里添加 */
"eslint.autoFixOnSave": true，
```

#### Dynamic imports

**import**所需 babel 支持

```Bash
$ npm install @babel/plugin-syntax-dynamic-import --save-dev
```

```JSON
/* .babelrc */
"plugins": [
    ["@babel/plugin-syntax-dynamic-import"]
]
```

### runtime

> This dependency was not found:

- regenerator-runtime/runtime in ./src/permission.js, ./src/store/modules/user.js
  意思大概是：ES6 以上的 Promise 及 async await 转换为 ES5

```bash
$ npm i @babel/plugin-transform-runtime -D
$ npm i @babel/runtime --save
```

```js
/* client/babel.config.js */
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ],
};
```

# USE

## 组件中的 data

```js
/** util.js */
export function testGlobalFunction(){
    return 'util.js testGlobalFunction()';
}
/** 具体使用 之 全部引用 */
<div>{{timeTest}}</div>
import * as util from '@/utils/index';
data() {return { timeTest:util.testGlobalFunction(),};}
// 页面显示的是 该函数

/** 具体使用 之 按需引用 */
import { testGlobalFunction } from "@/utils/index";
data() {return { timeTest: testGlobalFunction(),};}

// 需要有函数 or 变量 时， 使用这种方式
data() {
  const name = ["a", "b", "c", "d"];
  return {
    inputValue: "",
    newName: name // 使用上面声明的变量
  };
},

// 只有 return{}时，用这种箭头函数方式。
data: () => ({
  inputValue: ""
}),
```

## computed 计算属性

- 一个数据依赖于其他数据,通过其他变量计算得来的另一个属性
- 用 data 已经申明的变量可以计算出来的另一个变量,用来渲染页面
- 计算属性。缓存结果，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用。

### 基础示例

```HTML
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <img src="@/assets/img/logo.png"> -->
    <p><span>{{ firstName }}</span>_______<span>{{ lastName }}</span></p>
    <p>{{fullName}}</p>
    <p><button v-on:click="changeName">change</button></p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      firstName: "Satya",
      lastName: "Shakya",
    };
  },
  computed: {
    fullName: {
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // 当点击按钮变更名字之后,firstName,lastName随之改变
      set: function(newValue) {
        //给fullName赋值为newValue时执行
        this.firstName = newValue.split(" ")[0];
        this.lastName = newValue.split(" ")[1];
      }
    }
  },
  methods: {
    changeName: function() {
      this.fullName = "Shakya Sutra"; //给计算属性fullName赋值
    }
  },
};
</script>
```

### 实际应用

- 示例 1:后台返回(文件名、文件下载路径)两个数组

```JSON
{
  "enclosureTmp":["sso-server/upload/1550819291786_testUpLoad.xlsx","data:"],"enclosureName":["testUpLoad.xlsx","testUpLoad.txt"]}
}
```

因文件名与文件路径数组平级，前台遍历显示以上数据，使每个文件名，对应其正确的文件下载路径

```HTML
<template  v-if="showData!=undefined && showData!=''">
  <p v-for="(item) in this.showData.enclosureName" :key="item">
    <label>文书附件：</label><span>{{ item }}</span>
    <el-button @click="handleDownLoad(itemPath, item)" size="mini" type="success" plain>下载</el-button>
  </p>
</template>

<script>
export default {
  data() { return { showData: null }; },
  computed: {
    // 计算每个附件的下载地址,此处计算itemPath的遍历结果
    itemPath() {
      for (let i = 0; i < this.showData.enclosureTmp.length; i++) {
        return this.showData.enclosureTmp[i];// 文件路径数组中的每个值
      }
    }
  },
};
</script>
```

- 示例 2:前端显示 table 伪查询结果

```HTML
<template>
  <BaseTable :table-data="filterTableData" :columns="clumnsData"></BaseTable>
</template>

<script>
export default {
  data() { return {
      tableData: null  // 后台返回的table数据(未过滤)
    }; },
  computed: {
    // 计算过滤后的表格数据
    filterTableData() { // 此处属性为BaseTable :data过滤后的数据
      const search = this.search;
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData; // 如果没有查询，就返回接口给的结果。
    },
  },
  created() {
    this.loadTableData();
  },
  methods: {
    // 加载文书管理列表
    async loadTableData() {
      let url = '/uaa/api/document';
      const res = await this.$http.get(url);
      this.tableData = res.data.data;
      console.log('TABLEDATA:', this.tableData);
    },
  },
};
</script>
```

## watch 监听数据

- 观察一个特定数据变化，当该值变化时执行特定的函数,在数据变化时执行异步或开销较大的操作
- 适合监听某个 data 中的变量来操作一些逻辑行为比较合适，比如监听某个变量改变然后发起异步请求
- 可以看作是 computed 和 methods 的结合体；(默认：数据第一次改变时才会执行)

```HTML
<h3>FirstName:
    <el-input v-model="firstName" size="mini"></el-input>
</h3>
<h3>LastName:
    <el-input v-model="lastName" size="mini"></el-input>
</h3>
<h1>FullName:{{ fullName }}</h1>

<script>
export default {
  name: "home",
  data() {
    return {
      firstName: "",
      lastName: "",
      fullName: ""
    };
  },
  // 监听每次修改变化的新值，然后计算输出
  watch: {
      // 需要监听的表达式 ： 回调函数
    firstName: function(newName, oldName) {
      this.fullName = newName + "_" + this.lastName;
    },
    lastName: function(newName, oldName) {
      this.fullName = this.firstName + "_" + newName;
    }
  },
};
</script>
```

### 监听对象某一个值得变化可以利用计算属性

```HTML
<template>
  <div class="about">
    <input
      type="text"
      v-model="user.name"
    />
    <p>{{user.name}}</p>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      user: {
        id: 0,
        name: "Satya"
      },
    };
  },
  watch: {
    newValue(val, oldVal) {
      console.log("b.c: " + val, oldVal);
    }
  },
  computed: {
    // 该值变更，会联动watch中的newValue变更，输出log
    // 也就是说：输入框的值改变了，newValue被监听(watch),输出新的值
    newValue() {
      return this.user.name;
    },
  },
};
</script>
<!-- Output: b.c:当前值，上一次的值 -->
```

## directive 指令

- directive 注册全局指令
- directives 注册局部指令

```js
// el：指令所绑定的元素，可以用来直接操作 DOM 。
// binding：一个对象，包含以下属性：
// name：指令名，不包括 v- 前缀。
// value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
// oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
// expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
// arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
// modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
// vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
// oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

/* directive 全局指令 */
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 使用 <input v-focus …… />

/* directives 注册局部指令 */
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
<input v-focus />

/* 或者直接在组件中使用 */
import focus from '../focus.js';
directives:{focus},

```

## 组件通信

props（常用）
$emit (组件封装用的较多)
.sync语法糖 （较少）
$attrs & \$listeners (组件封装用的较多)
provide & inject （高阶组件/组件库用的较多）
slot-scope & v-slot （vue@2.6.0+）新增
scopedSlots 属性
通过路由带参数进行传值
Session Storage 缓存的形式进行传递

### props

- 向子组件传递数据

```HTML
<!-- Child.vue -->
<template>
  <h1>{{ content }}</h1>
</template>
<script>
export default {
  // 不确定类型或多类型嵌套 props:['data'] // 防止控制台报错
  // 确定类型或是强制固定类型
  props: {
    content: {
      type: String,
      default: () => {
        return "Child Content";
      },
      // reuqired:true // 必填(必须输入字段)
    }
  }
};
</script>

<!-- About.vue -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Child :content='message'></Child>
  </div>
</template>
<script>
import Child from './tool/Child';
export default {
  components: {Child},
  data() {
    return {
      message:'About'
    };
  },
};
</script>
```

### Emit Events

- [$emit] 派发事件 [Child => Parent]
- 触发当前实例上的事件。附加参数都会传给监听器回调
- 如下:Child.vue 的 btn 的点击事件,内中[$emit]派发一个事件，及表单输入的值;
- 在 About.vue 的 Child 元素 @child-event='parentEvent'

```HTML
<!-- src/views/parent.vue -->
<template>
    <div>
        <label>Parent Component:</label>
        <span> {{ name }}</span>
        <br/>
        <!-- 引入子组件 定义一个方法监听子组件的状态值-->
        <child @childChange='childChangeFunc'></child>
    </div>
</template>

<script>
import child from "./child.vue";
export default {
    components: { child },
    data() {
        return { name:'' }
    },
    methods: {
        childChangeFunc(value) {
            // value就是子组件传过来的值
            this.name =value;
        }
    }
}
</script>

<!-- src/views/child.vue -->
<template>
    <div>
        <label>Child Component:</label>
        <!-- parent组件中定义的变量 -->
        <span>{{ childValue }}</span>
        <!-- 子组件事件传值 -->
        <input type='button' value="Click" @click="childClick"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            childValue: 'This is child component'
        }
    },
    methods: {
        childClick(){
            // 子组件触发事件
            this.$emit('childChange',this.childValue);
        }
    }
}
</script>
```

```HTML
<!-- Child.vue -->
<template>
  <section style="margin:20px;">
    <button @click="emitParent">点击传值给父组件</button>
    姓名：<input v-model="inputData.name" />
    年龄：<input v-model="inputData.age" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      inputData: {
        name: "",
        age: ""
      }
    };
  },
  computed: {},
  methods: {
    emitParent() {
      // this.$emit('child-event','子组件传到父组件的具体内容');
      this.$emit("child-event", this.inputData);
      console.log("Children:",JSON.stringify(this.inputData));
    }
  }
};
</script>

<!-- About.vue -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <img src="@/assets/img/logo.png"> -->
    <Child @child-event='parentEvent'></Child>
    <p>名字： {{ this.showData.name }} </p>
    <p>年龄： {{ this.showData.age }} </p>
  </div>
</template>
<script>
import Child from "./tool/Child";
export default {
  components: { Child },
  data() {
    return {
      showData: []
    };
  },
  methods: {
    parentEvent(data) {
      console.log("About:", data);
      this.showData = data;
      console.log("ShowData:", JSON.stringify(this.showData));
      // 将data，作为sendData，提交到后台
    }
  },
  computed: {},
  mounted() {}
};
</script>
```

> vuejs 的[$emit]如何在父组件中自己添加参数。

```js
在子组件中：this.$emit('getAttrObj', this.attrObj)，
在父组件中：
<demo-component v-for="(component,index) in componentArray" @getAttrObj="getAttrObj"></ele- component>
methods: { getAttrObj (attrObj, index) {}}
父组件中可以拿到this.attrObj这个参数，然而除此之外还需要那个index来作为方法的参数（在对象在数组中的序号），虽说可以先传给子组件，再让子组件传回来，不过感觉有点费劲。
直接在父组件中进行传值而不覆盖子组件传上来的this.attrObj呢？（就是在父组件中将index传入给getAttrObj方法）
 @getAttrObj="getAttrObj($event, index)">
 多个参数使用以下
 @getAttrObj="func(arguments, index)">
methods: {
    func () {
        const [arg1, arg2 ...] = arguments[0]
        const index = arguments[1]
        ...
    }
}
```

### $attrs $listeners

- \$attrs 实现祖孙组件间的数据传递，属性集合，以对象形式保存数据
- \$listeners 实现祖孙组件间的事件监听，事件集合，以对象形式保存数据
- .native 修饰器（监听组件根元素的原生事件）
- inheritAttrs:false 非 props 属性不会放在元素上

#### \$listeners

```html
<!-- BaseInputSelect.vue 基础组件之Input改选择的外观 -->
<template>
  <input
    v-on="$listeners"
    class="input-text__line base-line"
    placeholder="请选择"
    v-model="value"
  />
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: () => {
          return "请选择";
        },
      },
    },
  };
</script>

<!-- 在其他组件中使用以上封装的btn 【全局注册过，无需再引入】 -->
<BaseInputSelect v-model="gysName" @click="getData" />
<script>
  export default {
    data() {
      return {
        gysName: "",
      };
    },
    watch: {
      gysName: function (newVal, oldVal) {
        console.log("GYSNAME:", newVal);
        return newVal;
      },
    },
    methods: {
      getData() {
        console.log("该函数在父组件，点击之后 ，BaseBtnSearch 唤起一个Dialog!");
      },
    },
  };
</script>
```

```html
<!-- ChildComponent.vue -->
<template>
  <section>
    <h1>ChildComponent {{ msg }}</h1>
  </section>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: "sat",
      },
    },
    inheritAttrs: false, // 非props不显示与元素上
    created() {
      console.log("ChildComponent:", this.$attrs, this.$listeners);
      // 以上输出结果：[$attrs]是最外部，含name字段，[$listeners]是内部de tow部分,也就是父组件的[clickTwo()]
      // 调用父组件 About.vue 中的clickTow()函数
      this.$listeners.two();
    },
  };
</script>

<!-- about.vue 是用子组件的地方 -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ChildComponent
      :msg="msg"
      :name="name"
      @one.native="clickOne"
      @two="clickTwo"
    />
  </div>
</template>

<script>
  import ChildComponent from "./tool/ChildComponent";
  export default {
    components: { ChildComponent },
    data() {
      return {
        showData: [],
        msg: "Hello",
        name: "satya",
      };
    },
    methods: {
      clickOne() {
        console.log("ONE");
      },
      clickTwo() {
        console.log("TWO");
      },
    },
    computed: {},
  };
</script>
```

#### 多级嵌套组件数据通信

- 次第:ComponentC > ComponentB > ComponentA

```HTML
<!-- ComponentC.vue -->
<template>
  <section class="component-c">
    <h3>组件C中设置的props: {{ name }}</h3>
    <p>组件C中的$attrs:{{ $attrs }}</p>
    <p>组件C中的$listeners:{{ $listeners }}</p>
  </section>
</template>
<script>
export default {
  name: 'ComponentC',
  props:{
    name:{
      type:String,
      default:'Satya'
    }
  },
  inheritAttrs:false,
  mounted(){
    this.$emit('test2')
    console.log('ComponentC',this.$attrs,this.$listeners)
  }
}
</script>

<!-- ComponentB.vue -->
<template>
  <section class="component-b">
    <h3>组件B中设置的props: {{ age }}</h3>
    <p>组件B中的$attrs:{{ $attrs }}</p>
    <p>组件B中的$listeners:{{ $listeners }}</p>
    <hr/>
    <ComponentC v-bind="$attrs" v-on="$listeners"/>
  </section>
</template>
<script>
import ComponentC from './ComponentC.vue';
export default {
  name: 'ComponentB',
  components:{ComponentC},
  props:{
    age:{
      type:Number,
      default:88
    }
  },
  inheritAttrs:false,
  mounted(){
    this.$emit('test1')
    console.log('ComponentB',this.$attrs,this.$listeners)
  }
}
</script>

<!-- ComponentA.vue -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ComponentB :name='name' :age='age' @on-test1='onTest1' @on-test2='onTest2'/>
  </div>
</template>
<script>
import ComponentB from './tool/ComponentB';
export default {
  components: {ComponentB},
  data() {
    return {
      name: 'satya',
      age: 66
    };
  },
  mounted() {},
  methods: {
    // 三级传值
    onTest1(){
      console.log('test1 runing……')
    },
    onTest2(){
      console.log('test2 runing……')
    }
  },
};
</script>
```

#### 模态框数据通信

- 组件:ModalHeader ModalBody ModalFooter Modal ModalBackdrop

```HTML
<!-- ModalHeader.vue -->
<template>
  <section class="modal-header">
    <h3>{{ modalTitle }}</h3>
    <button
      type="button"
      data-dismiss='modal'
      aria-label="Close"
      @click="close"
    >
      <span aria-hidden="true">$times;</span>
    </button>
  </section>
</template>

<script>
export default {
  name: "ModalHeader",
  props: {
    modalTitle: {
      type: String,
      default: "Modal Title"
    }
  },
  inheritAttrs: false,
  methods: {
    close() {
      this.$emit("on-close");
    }
  },
  mounted() {
    console.log("ModalHeader", this.$attrs, this.listeners);
  }
};
</script>

<!-- ModalBody.vue -->
<template>
  <section class="modal-body">
    <slot>{{ modalContent }}</slot>
  </section>
</template>

<script>
export default {
  name:'ModalBody',
  props:{
    modalContent:{
      type:String,
      default:'Modal Body Text!'
    }
  },
  inheritAttrs:false,
  mounted(){
    console.log('ModalBody',this.$attrs,this.$listeners)
  }
}
</script>

<!-- ModalFooter.vue -->
<template>
  <section>
    <button
      class="btn btn-secondary"
      data-dismiss='modal'
      @click="close"
    >{{ secondaryBtnContent }}</button>
    <button
      class="btn btn-primary"
      @click="save"
    >{{ primaryBtnContent }}</button>
  </section>
</template>

<script>
export default {
  name: "ModalFooter",
  props:{
    secondaryBtnContent:{
      type:String,
      default:'Close'
    },
    primaryBtnContent:{
      type:String,
      default:'Save'
    }
  },
  inheritAtts:false,
  methods:{
    save(){
      this.$emit('on-save')
    },
    close(){
      this.$emit('on-close')
    }
  },
  mounted(){
    console.log('ModalFooter',this.$attrs,this.$listenters)
  },
};
</script>

<!-- ModalBackdrop.vue -->
<template>
  <div
    class="modal-backdrop"
    v-if="show"
    @click="close"
  > </div>
</template>

<script>
export default {
  name: "ModalBackdrop",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  mounted() {
    console.log("ModalBackdrop", this.$attrs, this.$lsteners);
  },
  methods: {
    close() {
      this.$emit("on-close");
    }
  }
};
</script>

<!-- Modal.vue -->
<template>
  <section
    class="modal"
    tabindex="-1"
    role="dialog"
    v-if='show'
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <ModalHeader
          v-bind="$attrs"
          v-on="$listeners"
        />
        <ModalBody
          v-bind="$attrs"
          v-on="$listeners"
        />
        <ModalFooter
          v-bind="$attrs"
          v-on="$listeners"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

export default {
  name:'Modal',
  components:{ ModalHeader,ModalBody,ModalFooter},
  props:{
    show:{
      type:Boolean,
      default:false,
    }
  },
  inheritAttrs:false,
};
</script>

<!-- About.vue -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <img src="@/assets/img/logo.png"> -->
    <button
      @click="show"
      class="btn btn-primary"
    >OPen Modal</button>

    <Modal
      :show="isShow"
      :modal-title="modalTitle"
      :modal-content="modalContent"
      :secondary-button-content="secondaryButtonContent"
      :primary-button-content="primaryButtonContent"
      @on-save="save"
      @on-close="close"
    >
    </Modal>
    <ModalBackdrop
      :show="isShow"
      @on-close="close"
    ></ModalBackdrop>

  </div>
</template>

<script>
import ModalBackdrop from "./tool/ModalBackdrop";
import Modal from "./tool/Modal";
export default {
  components: {ModalBackdrop, Modal },
  data() {
    return {
      isShow: false,
      modalTitle: "ModalTile 模态框标题",
      modalContent: "ModalBody 模态框内容",
      secondaryButtonContent: "Close 关闭",
      primaryButtonContent: "Save 保存"
    };
  },
  mounted() {},
  methods: {
    show() {
      this.isShow = true;
      console.log("show():关闭模态框");
    },
    close() {
      this.isShow = false;
      console.log("close():关闭模态框");
    },
    save() {
      this.isShow = false;
      console.log("save():保存内容");
    },
  },
  computed: {}
};
</script>

```

### provide & inject

- 一起使用。允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
- provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性
- inject 选项应该是： 一个字符串数组，或 一个对象，对象的 key 是本地的绑定名

```HTML
<div id="app">
  <son></son>
</div>
let Son = Vue.extend({
  template: '<h2>son</h2>',
  inject: {
    house: { default: '没房' },
    car: { default: '没车' },
    money: { default: '￥4500' }// 长大工作了虽然有点钱  仅供生活费，需要向父母要
  },
  created () {
    console.log(this.house, this.car, this.money)
    // -> '房子', '车子', '￥10000'
  }
})

new Vue({
  el: '#app',
  provide: {
    house: '房子',
    car: '车子',
    money: '￥10000'
  },
  components: {
    Son
  }
})
```

### \$nextTick

- 用来知道什么时候 DOM 更新完成

```HTML
<div id="app">
    <div id="div" v-if="showDiv">这是一段文本</div>
    <button @click="getText">获取div内容</button>
</div>
<script>
  data() {
    return{
      showDiv: false
    };
  },
  //通过事件触发
  methods: {
    getText: function() {
      this.showDiv = true;
// 等待dom更新完成后执行回调
      this.$nextTick(function() {
        var text = document.getElementById('div').innerHTML;
        console.log(text);
      });
    }
  }
</script>
```

### 通过路由带参数进行传值

```js
// A组件通过query把uid传递给B组件（触发事件可以是点击事件、钩子函数等）
this.$router.push({ path: "/componentB", query: { uid: 123 } });
// 在B组件中获取A组件传递过来的参数
this.$route.query.uid;
```

### 通过设置 Session Storage 缓存的形式进行传递

```js
// 在A组件中设置缓存
const userData = { uid: 123, age: 88 };
sessionStorage.setItem("缓存名称", JSON.stringify(userData));
// B组件获取在A中设置的缓存
const dataB = JSON.parse(sessionStorage.getItem("缓存名称"));
```

## Mixin 混入

- 单纯组件引用：父组件 + 子组件 >>> 父组件 + 子组件
- mixins：父组件 + 子组件 >>> new 父组件
- mixins 允许你封装一块在应用的其他组件中都可以使用的函数。
- 默认是 mixins 上会首先被注册，组件上的接着注册！必要时可重写 -合并主要有三种情形：数据 data、生命周期中的钩子函数和值为对象的选项。

```js
/* src/mixins/mixins.js */
export const myMixin = {
  created() {
    console.log(`src/mixins/mixins.js MyMixin 消息`);
  },
};
```

```html
<!-- 组件中具体使用 -->
<script>
  import { myMixin } from "@/mixins/mixins.js";
  export default {
    mixins: [myMixin],
  };
</script>
```

### 数据合并

-数据对象在内部分进行浅合并（一层属性深度），在和组件的数据发生冲突时，以组件数据优先。

```js
/* src/mixins/mixins.js */
export const mixObj = {
  data() {
    return {
      msg: "Msg from mixObj",
    };
  },
};
export const mixObjAnother = {
  data() {
    return {
      msg: "Msg from mixObjAnother",
      name: "Satya",
    };
  },
};
```

```html
<!-- 组件中使用 -->
<script>
  import { mixObj,mixObjAnother } from '@/mixins/mixins.js'
  export default {
    data() {
      return {
      // 测试
        msg:'Msg from Vue Component',
        name:'Shakya',
        age:15
      };
    },
    mixins: [mixObj,mixObjAnother]，
    created(){
      console.log('输出数据：',this.$data); // 输出当前定义的data中的所有数据
      // 最终控制台输出时，此data中的值，覆盖了mixins中的值
    },
  }
</script>
```

### 钩子函数合并

- 当组件中使用 mixins 对象有相同的选项时，如钩子函数，会全部合并到一个数组中，因此都会被执行，且 mixins 对象中的钩子函数会先执行

```js
/* src/mixins/mixins.js */
export const myMixin = {
  created() {
    console.log(`src/mixins/mixins.js MyMixin 消息`);
  },
};
```

```html
<!-- 组件中使用 -->
<script>
  import { myMixin,mixObj,mixObjAnother } from '@/mixins/mixins.js'
  export default {
    data() {
      return {
      // 测试
        msg:'Msg from Vue Component',
        name:'Shakya',
        age:15
      };
    },
    mixins: [myMixin,mixObj,mixObjAnother]，
    created(){
      console.log(`组件中的信息`); // 输出结果，先[MyMixin消息],后输出此处消息
    },
  }
</script>
```

### 值为对象选项合并

- 当 mixins 对象和组件中的选项值为对象时，如:methods、components、directives,将被混合为同一个对象，当两个对象键名冲突时,**组件选项优先**。

```js
export const myMixin = {
  data() {
    return {
      msg: "From Vue Mixins",
    };
  },
  created() {
    console.log(`mixins.js created 消息`);
  },
  methods: {
    message() {
      console.log(`Mixins.js myMixin methods messgae:`, this.msg);
    },
  },
};
```

```html
<!-- 组件中使用 -->
<script>
  import { myMixin } from '@/mixins/mixins.js'
  export default {
    data() {
      return {
      // 测试
        msg:'Msg from Vue Component',
        name:'Shakya',
        age:15
      };
    },
    mixins: [myMixin]，
    created(){
      console.log(`组件中的信息`); // 输出结果，先[MyMixin消息],后输出此处消息
      this.message();
    },
    methods: {
      // Mixins 测试
      message() {
        console.log("组件中的 methods message:", this.msg);
      },
    }
  }
</script>
/* 以上输出结果： 1.mixins.js created 消息 2.组件中的信息 3.组件中的 methods
message: Msg from Vue Component */
```

### 全局 Mixins

- 谨慎使用
- Modal 和 Tooltip 组件，同一个切换状态布尔值，两个组件逻辑一样

组件的多种状态，如 success、error、warning 和 info 等。如果想给一个按钮添加 loading、warning 和 error 状态，就可以通过创建一个 mixins。除了在按钮上可以使用之外，还可以在 Alert、Card 之类的组件使用这些状态。

## Mixin & filter

- 把全局过滤器放在全局混入中

```js
/* filters.js */
export default {
  /** 过滤选项 managementType 物料管理方式 */
  FormattManagementType(value) {
    let formatData = "";
    switch (value) {
      case "NONE":
        formatData = "无";
        break;
      case "BATCHNUMBER":
        formatData = "批次管理";
        break;
      case "SERIALNUMBER":
        formatData = "序列号管理";
        break;
      default:
        return;
    }
    return formatData;
  },
  /** 继续以函数式往后添加 */
};

/* mixin.js */
import filters from "../filters/filters";
export default {
  /** 全局混入 data 部分 */
  data() {
    return {};
  },
  /** 全局混入 方法部分 */
  methods: {
    //将globalMethods里面的方法用对象展开符混入到mixin上,以方便调用，直接this.$xxx方法名就可以了
  },
  /** 全局混入 过滤器部分 */
  filters: {
    ...filters,
  },
};

/* main.js */
import mixin from "./mixins/mixin"; // 引入全局混入
Vue.mixin(mixin); // 全局混入
```

- 在组件中使用

```html
<!-- 注意: 在el-ui的table列中使用，需采用插槽形式 指定row-cell -->
<el-table-column prop="managementType" label="物料管理方式">
  <template v-slot="scope"
    >{{scope.row.managementType|FormattManagementType}}</template
  >
</el-table-column>
```

### 自定义指定，组合键呼出对话框

```html
<!-- 使用了el-ui，在其上实现该功能，绑定自定义指令 -->
<el-form-item :label="label" v-modifyLabel>
  <el-input v-model="search.keyword" placeholder="请输入关键词"></el-input>
</el-form-item>
<script>
  export default {
    /** 定义局部自定义指令 */
    directives: {
      /** 对话框拖拽 */
      modifyLabel: {
        /**
         * 该指令表示，其绑定的label可修改，隐藏按键[dblclick+ctrl]
         * vnode 便于操作的节点
         */
        inserted(el, binding, vnode) {
          const labelEL = el.querySelector(".el-form-item__label"); // 获取 el-form-item中的label
          console.log("获取元素:", labelEL);
          // 给元素加个组合键点击事件   ctrlKey[当事件被触发时ctrl按键被按下时为true，否则为false。]
          labelEL.addEventListener("dblclick", handleDialog, false);

          /**
           * 鼠标双击
           * 此处捕获mouseEvent之后，判断其ctriKey的Boolean
           * 为true代表：鼠标左键双击时，按下了ctrl按键；反之为不带组合键
           */
          function handleDialog(e) {
            if (e.ctrlKey) {
              console.log("捕获事件", e);
              console.log("获取点击的label的内容:", e.target.innerText);
              vnode.context.dialogFormVisible = true; // 使用节点，获取其下内容，也就是上面data中的属性
              console.log(
                "操作外部data试试：",
                vnode.context.dialogFormVisible
              );

              // 改动data
              vnode.context.form.defaultLabel = e.target.innerText;
            }
          }
        },
      },
    },
  };
</script>
```

### render

```html
<!--demo.vue  JSX -->
<script>
  export default {
    render() {
      return (
        <div>
          AAAAA
          <input type="email" placeholder="邮箱" />
        </div>
      );
    },
  };
</script>
```

```html
<!-- Vue extend -->
<script>
  import Vue from "vue";

  export default Vue.extend({
    name: "demoExtend",
    render() {
      return (
        <div>
          demoExtend
          <input type="email" placeholder="邮箱" />
        </div>
      );
    },
  });
</script>
// 使用方式：与加载子组件同样
<DemoExtend></DemoExtend>
```

### HOC

```js
// HocButton.js
function debounce(func, delay, context, event) {
  clearTimeout(func.timer);
  func.timer = setTimeout(function () {
    func.call(context, event);
  }, delay);
}

export default {
  props: {},
  name: "ButtonHoc",
  data() {
    return {};
  },
  mounted() {
    console.log("HOC succeed");
  },
  methods: {
    handleClickLink(event) {
      let that = this;
      console.log("debounce");
      debounce(that.$listeners.click, 300, that, event);
    },
  },
  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self;
        return vnode;
      });
    console.log("$attrs", this.$attrs);
    return h(
      "Button",
      {
        on: {
          click: this.handleClickLink,
        },
        props: this.$props,
        // 透传 scopedSlots
        scopedSlots: this.$scopedSlots,
        attrs: this.$attrs,
      },
      slots
    );
  },
};
```

```html
<!-- 实际使用 -->
<HocButton title="test" @click="HOCclick">HocButton</HocButton>
<script>
  import HocButton from "./HocButton.js";
  export default {
    name: "icon",
    components: { HocButton },
    methods: {
      HOCclick() {
        console.log("HOCclick");
      },
    },
  };
</script>
```

### v-slot vue 2.6 新增

- v-slot:slotName 没有名字的 <slot> 隐含有一个 "default" 名称
- v-slot 只能添加到 <template> 或自定义组件上
- 默认插槽的缩写语法不能与具名插槽混用
- 命名插槽简写,使用 # 代替 v-slot,v-slot:header 简写成 #header

## ScopedSlots

```html
<!-- base-layout.vue -->
<!-- <template>
  <div class="child-node">
    <slot name="header" :text="headerText"></slot>
    <slot :text="defaultText"></slot>
    <slot name="footer" :text="footerText"></slot>
    <p contenteditable="true">这是一段可编辑的段落。请试着编辑该文本。</p>
  </div>
</template> -->
<script>
  export default {
    data() {
      return {
        headerText: "child header text",
        defaultText: "child default text",
        footerText: "child footer text",
      };
    },
    render(h) {
      return h("div", { class: "child-node" }, [
        this.$scopedSlots.header({ text: this.headerText }),
        this.$scopedSlots.default(this.defaultText),
        this.$scopedSlots.footer({ text: this.footerText }),
      ]);
    },
  };
</script>
```

```html
<!-- scoped-slots.vue -->
<script>
  import BaseLayout from "./base-layout.vue";
  export default {
    name: "ScopedSlots",
    components: {
      BaseLayout,
    },
    render(h) {
      return h("div", { class: "parent-node" }, [
        this.$slots.default,
        h("base-layout", {
          scopedSlots: {
            header: (props) => {
              return h("p", { style: { color: "red" } }, [props.text]);
            },
            default: (props) => {
              return h("p", { style: { color: "deeppink" } }, [props]);
            },
            footer: (props) => {
              return h("p", { style: { color: "orange" } }, [props.text]);
            },
          },
        }),
      ]);
    },
  };
</script>
```

```html
<!-- scoped-slots-for-jsx.vue -->
<script>
  import BaseLayout from "./base-layout.vue";
  export default {
    name: "ScopedSlots",
    render() {
      return (
        <div class="parent-node">
          parent content
          <BaseLayout
            {...{
              scopedSlots: {
                header: (props) => {
                  return <p style={{ color: "red" }}>{props.text}</p>;
                },
                default: (props) => {
                  return <p style={{ color: "deeppink" }}>{props}</p>;
                },
                footer: (props) => {
                  return <p style={{ color: "orange" }}>{props.text}</p>;
                },
              },
            }}
          />
        </div>
      );
    },
  };
</script>
```

#### 过滤列表

```html
<!-- child.vue -->
<template>
  <div>
    <el-input
      v-model="inputValue"
      placeholder="请输入内容"
      clearable
      size="mini"
    ></el-input>
    <slot :items="filterList"></slot>
  </div>
</template>

<script>
  export default {
    name: "Child",
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    data: () => ({
      inputValue: "",
    }),
    computed: {
      filterList() {
        // 返回 item.name中包含输入的字符，
        return this.items.filter((item) => item.name.includes(this.inputValue));
      },
    },
    methods: {},
  };
</script>

<!-- parent.vue -->
<Child :items="items">
  <template v-slot="{items}">
    <p v-for="(item,key) in items" :key="key">{{item}}=={{key}}</p>
  </template>
</Child>
<script>
  import Child from "./child/ChildA";
  export default {
    name: "VSlotDemo",
    components: { Child },
    data() {
      return {
        items: [
          { id: 1, name: "Satya", isOK: false },
          { id: 2, name: "Shakya", isOK: true },
          { id: 3, name: "Skyaha", isOK: false },
          { id: 4, name: "kyaSha", isOK: true },
          { id: 5, name: "kyaSha", isOK: false },
        ],
      };
    },
  };
</script>
```

```html
<!-- Child.vue -->
<template>
  <div>
    <!-- 当parent.vue中，没有插入内容，则会渲染child.vue中slot的[备渲染内容] -->
    <slot :user="user"
      >备渲染内容：{{ user.firstName }} == {{user.lastName}}</slot
    >
  </div>
</template>

<script>
  export default {
    name: "Child",
    data() {
      return {
        user: {
          firstName: "Satya",
          lastName: "Shakya",
        },
      };
    },
  };
</script>

<!-- parent.vue 之 写在自定义组件中 插槽内容的解构赋值 传入具体的插槽 prop  -->
<Child v-slot="{user}">
  <h1>{{user.firstName}}。{{user.lastName}}</h1>
  <span>{{user.firstName}}。{{user.lastName}}</span>
  <div>{{user.firstName}}。{{user.lastName}}</div>
</Child>

<!-- parent.vue 之 写在<template>中 插槽内容的解构赋值 传入具体的插槽 prop  -->
<Child>
  <template v-slot="{user}">
    <h1>{{user.firstName}}。{{user.lastName}}</h1>
    <span>{{user.firstName}}。{{user.lastName}}</span>
    <div>{{user.firstName}}。{{user.lastName}}</div>
  </template>
</Child>

<!-- parent.vue  之 写在自定义组件中   prop 重命名 -->
<Child>
  <template v-slot="{user:buddha}">
    <h1>{{buddha.firstName}}。{{buddha.lastName}}</h1>
    <span>{{buddha.firstName}}。{{buddha.lastName}}</span>
    <div>{{buddha.firstName}}。{{buddha.lastName}}</div>
  </template>
</Child>
<!-- parent.vue 之 写在<template>中  prop 重命名 [同上]  -->
```

```html
<!-- child.vue -->
<template>
  <ul>
    <li v-for="(item,key) in filterItems" :key="key">
      <!-- 每个 item 一个 slot ,将 item 对象作为一个slot的prop传入 -->
      <slot name="item" :item="item">
        <!-- 备渲染内容 -->
        备渲染内容:{{item.name}}
      </slot>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "Child",
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    data() {
      return {};
    },
    computed: {
      filterItems() {
        return this.items;
      },
    },
  };
</script>

<!-- parent.vue -->
<Child :items="items">
  <template v-slot:item="{item}">
    <span v-if="item.isOK">✓</span>
    {{item.name}}
  </template>
</Child>
<script>
  import Child from "./child/ChildA";
  export default {
    name: "VSlotDemo",
    components: { Child },
    data() {
      return {
        items: [
          { id: 1, name: "Satya", isOK: false },
          { id: 2, name: "Shakya", isOK: true },
        ],
      };
    },
  };
</script>
```

```html
<!-- child.vue -->
<template>
  <main>
    <slot :testName="testName"></slot>
  </main>
</template>

<script>
  export default {
    name: "Child",
    data() {
      return {
        testName: "Satya",
      };
    },
  };
</script>

<!-- parent.vue 多种写法 -->
<Child>
  <template v-slot="childSlotProps">
    {{childSlotProps.testName}}
  </template>
</Child>
<Child>
  <template v-slot="{testName}">{{testName}}</template>
</Child>
<Child v-slot="{testName}">{{testName}}</Child>
<Child v-slot="childSlotProps">{{childSlotProps.testName}}</Child>
```

```HTML
<!-- 具名插槽 -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

<!-- 作用域插槽 -->
<!-- 在父组件中访问子组件内部的一些可用数据  三种写法 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
<!-- 省略默认插槽名字 -->
<current-user v-slot="slotProp">
  {{ slotProp.user.firstName }}
</current-user>

<!-- 显示调用默认插槽名字 -->
<current-user v-slot:default="slotProp">
  {{ slotProp.user.firstName }}
</current-user>
<!-- 简化写法 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>

<!-- 默认插槽的缩写语法不能与具名插槽混用 -->
<current-user>
 <!-- 两种写法均可 -->
  <!--<template v-slot="slotProps">
    {{ slotProps.user.firstName }}
  </template>-->
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>



<!-- 动态插槽名称 定义动态插槽名称 -->
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>

<!-- 命名插槽简写 # -->
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
<!-- 使用简写语法，则务必指定插值的名字 -->
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```

# vue-router

- **route**:单条路由,(path 指路径，component 指的是组件);
- **routes**:一组路由，可以多级嵌套子路由;
- **router**:管理路由(如：点击 home 按钮，router 到 routes 中找到对应的 home 内容);
- router-link 定义页面中点击的部分(属性 to，定义点击之后，要到哪里去);
- router-view 定义显示部分(点击后，区配的内容显示在什么地方);
- **redirect**:定义重定向;
- 大型項目中，可以將路由按照模塊劃分，最終引入到一起；
- 項目中若有權限區分，則可以在路由的[meta]中追加；[參見進階版示例]

---

## 基本使用示例

```html
<!-- src/views/index.vue -->
<template>
  <div id="root">
    <header>
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <!-- 路由映射到 …… 注意此处to值的写法 -->
      <router-link to="/home">Go HOME</router-link>
      <router-link to="/about">Go ABOUT</router-link>
    </header>
    <!-- 对应组件的内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>
```

```js
/* src/router/routes.js */
const routes = [
  {
    path: "/", // 瀏覽器地址欄 url
    // 根路徑需顯示的視圖爲全局的layout 佈局主視圖
    component: () => import("../views/layout/Index.vue"),
  },
  {
    path: "/home",
    name: "Home", // 該命名，如無必要，可省略
    component: () => import("../views/Home.vue"), // 該url下需顯示的視圖組件
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];
export default routes; // 最後記得導出該路由組，用於在router/index.js中引入

/* src/router/index.js */
import Vue from "vue";
import Router from "vue-router";
import routes from "./routes.js"; // 引入路由組文件
Vue.use(Router); // 告诉 vue 使用 Router
// 构造函数 ，接受routes参数
const router = new VueRouter({
  mode: "history", // 路由模式 ,需考慮後臺是否開啓
  base: BASE_URL, // 路由基本路徑 ，通常爲 '/'
  routes: recursionRoute(routes), // 如果是多级路由，此处需递归路由
});
export default router; // 导出,用於在main.js主文件中引入

/* main.js */
import router from "./router/index.js";
// 把router 实例注入到 vue 根实例中
new Vue({
  router, // 加上路由
  render: (h) => h(App),
}).$mount("#app");
```

vue 设置路由导航的两种方法有 <router-link to=''> 和 router.push().
主要使用 router.push()方法

```JavaScript
this.$router.push('xxx'); // 支持字符串
this.$router.push({ path: 'xxx' }); // 支持对象
this.$router.push({ name: 'xxx' }); // 支持命名路由方式
// 直接路由带查询参数 query, 地址栏变成 /xxx?id=1
this.$router.push({ path: 'xxx', query: { id: 1 } });
// 命名路由带查询参数query，地址栏变成 /xxx?id=1
this.$router.push({ name: 'xxx', query: { id: 1 } });
// 如果提供了path，直接路由带参数params, params不会生效，在xxx页面通过
// console.log(this.$route.params.id) 是获取不到值的。
this.$router.push({ path: 'xxx', params: { id: 1 } });
// 命名路由带路由参数params，地址栏是/xxx。在xxx页面通过 console.log(this.$route.params.id) 是可以获取到值的。
this.$router.push({ name: 'xxx', params: { id: 1 } });
```

## 權限 & 模塊 劃分路由

思路

## Dropdown 下拉

```html
<!-- BaseDropdown -->
<template>
  <div class="dropdown-div" :title="name">
    <span>{{ name }}</span>
    <svg-icon icon-name="triangledown" @click.prevent="toggle" />
    <div
      role="timelinebody"
      v-show="shown"
      class="div-body"
      @mouseleave="onmouseleave"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { stateMixin, closeMixin } from "@/mixins/mixins.js";
  export default {
    name: "Dropdown",
    mixins: [stateMixin, closeMixin],
    props: {
      name: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        shown: false,
      };
    },
    methods: {
      onmouseleave() {
        this.shown = false;
      },
    },
  };
</script>
```

```css
/* dropdown 下拉 */
.dropdown-div {
  width: 80px;
  height: auto;
  /* box-shadow: 0 0 1px 1px #333; */
}

.dropdown-div .div-body {
  padding: 0 5px;
  box-shadow: 0 0 1px 1px rgb(110, 108, 108);
  position: absolute;
  top: 40px;
  z-index: 999;
  text-align: center;
  background-color: #fff;
}

.dropdown-div .div-body li:hover {
  cursor: pointer;
  color: #00bcd4;
}
```

### 封装菜单

路由是否为外链地址

```js
/* 路由是否为外链的校验 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
```

```html
<!-- Link.vue -->
<template>
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>
<script>
  import { isExternal } from "@/utils/validate";
  export default {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    methods: {
      linkProps(url) {
        if (isExternal(url)) {
          return {
            is: "a",
            href: url,
            target: "_blank",
            rel: "noopener",
          };
        }
        return {
          is: "router-link",
          to: url,
        };
      },
    },
  };
</script>
```

## 添加实例属性

```js
/* src/main.js */
import AppName from "app-name"; // 引入你的工具
Vue.prototype.$appName = "My App";
// 在其它地方使用时$appName
console.log(this.$appName);

/* axios为例 */
import axios from "axios";
// 设置 Vue.prototype.$http 为 axios 的别名：
Vue.prototype.$http = axios;
// 在某页面请求数据时：
this.$axios.get(url);
```

## 注册全局基础组件

- 基础组件命名必须规范，便于使用正则

```js
/* src/components/base/base.js */

/* src/main.js */
import "@components/base/base.js"; // 这是组件中的全局注册组件文件。
```

## 点击控制样式切换

```HTML
<!-- 点击控制样式切换 -->
<div :class="clicked? 'blue-class':'red-class'" @click="clicked = !clicked" ></div>
<script>
export default {
  data() {
    return {
      clicked: false
    };
  },
};
</script>

<style scoped>
.blue-class {
  background-color: blue;
  width: 60px;
  height: 60px;
}
.red-class {
  background-color: red;
  width: 30px;
  height: 30px;
}
</style>
```

## 根据自定义 ID,去往不同页面

```js
/* todo.js */
const todo = [
  {
    taskDefKey: "IGNYQ6157",
    routeURL: "/FoodAndDrug/case_prog_list/progReprotUpload",
  },
  {
    taskDefKey: "Y0OQZ6869",
    routeURL: "/FoodAndDrug/case_inquire_list/inquireUpLoadFile",
  },
];
export default todo;

/* demo.js */
import TodoJS from "./todo.js";
export default {
  data() {
    return {
      todo: TodoJS,
    };
  },
  methods: {
    checkLawDetail(row) {
      console.log("row>>>>>>", row);
      console.log("TODOCOUNT:", this.todo.length);
      // 遍历todo 自定义ID与路由对应
      this.todo.forEach((item) => {
        if (row.taskDefKey == item.taskDefKey) {
          this.$router.push({
            path: item.routeURL,
            query: { tableRow: JSON.stringify(row) },
          });
        }
      });
    },
  },
};
```

# VueX

## 装载及目录结构

```Bash
$ npm install vuex --save # 非cli下的单独装载包
# store(仓库) 目录结构 「推荐」
|- state.js # 存储状态 定义应用状态全局的数据结构
|- mutations-types.js # 每个mutation都有一个常量字符串的事件类型
|- mutations.js # 同步改变state，唯一途径
|- actions.js  # 处理异步请求，dispatch
|- getters.js # 對共享數據進行過濾獲取，與[computed]類似
|- index.js # 引入以上，并且初始化vuex
|- modules # 模块化vuex
```

> vue 的状态管理
> view -> (dispath) Actions -> (Commit)Mutations -> (Mutate) State -> View
> 注意: Actions 不是必须, 如果有异步操作才可能用到 Action, 否则不可以使用

### State

- 用于数据的存储，是 store 中的唯一数据源,类似 vue 中 data 对象
- 改变状态 state 的唯一方式是通过提交 commit 的一个 mutations;

### Getter

- 对共享数据进行过滤获取,理解为 Vue 中的计算属性 (computed)
- 返回值会根据它的依赖被缓存起来

### Mutation

- 改变 state 的唯一方法(state,payload);
- 每个 mutation 都有一个字符串的事件类型(type) 和一个 回调函数
- payload(载荷)，通常为对象,用来记录开发时使用该函数的一些信息;
- 处理同步的请求。不能处理异步请求;
- 不能直接调用,而要通过相应 type 调用 store.commit.

### Action

- 可以使用异步操作提交 mutation
- 通过 store.dispatch 触发(异步),返回的是 promise
- 接受 context 作为第一个参数，payload 作为第二个参数（可选）

### Module

- 将 store 分割成不同的模块,方便管理维护,可以嵌套子模块

plugins: 一个数组，包含应用在 store 上的插件方法。
strict: 使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。

1、组件之间全局共享的数据
2、通过后端异步请求的数据
即把通过后端异步请求的数据都纳入 vuex 状态管理，在 Action 中封装数据的增删改查等逻辑，这样可以一定程度上对前端的逻辑代码进行分层，使组件中的代码更多地关注页面交互与数据渲染等视图层的逻辑，而异步请求与状态数据的持久化等则交由 vuex 管理。

### 示例

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

### 實際示例

```js
/* src/config/shop.js */
/**
 * Mocking client-server processing
 * 模擬後臺數據
 */
const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 20, inventory: 5 },
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100);
  },
};
```

```js
/* src/store/state.js */
/**
 * 存储状态 定义应用状态全局的数据结构
 */
export default {
  all: [],
};
```

```js
/* src/store/types.js */
/**
 * 每个mutation都有一个常量字符串的事件类型
 */
export const SET_PRODUCTS = "SET_PRODUCTS";
export const CLEAR_CART_PRODUCTS = "CLEAR_CART_PRODUCTS";
```

```js
/* src/store/mutations.js */
/**
 * 唯一同步改變state的地方
 */
import Vue from "vue";
// 給types.js起別名，則可以使用別名.常量名，避免拼寫錯誤
import * as types from "./types";
export default {
  /**
   * 設置
   * @param {*} state
   * @param {*} products
   */
  [types.SET_PRODUCTS](state, products) {
    state.all = products;
  },

  [types.CLEAR_CART_PRODUCTS](state) {
    state.all.forEach((p) => {
      p.quantity = 0;
    });
  },
};
```

```js
/* src/store/getters.js */
/**
 * 對共享數據進行過濾獲取，與[computed]類似
 */
export default {
  // 總商品列表
  allProducts: (state) => state.all,
  // 購物車商品列表
  cartProducts: (state, getters) =>
    getters.allProducts.filter((p) => p.quantity),
  // 購物車商品總價
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
};
```

```js
/* src/store/actions.js */
/**
 * 处理异步请求，dispatch
 */

import shop from "../config/shop";
import * as types from "./types";

export default {
  /**
   * 獲取數據後，加入選取數量quantity的標誌，以區分是否被加入購物車
   */
  getAllProducts({ commit }) {
    shop.getProducts((res) => {
      const newRes = res.map((p) =>
        Object.assign({}, p, {
          quantity: 0,
        })
      );
      commit(types.SET_PRODUCTS, newRes);
    });
  },

  /**
   * 將mutation中的方法以action的形式輸出
   */
  serProducts({ commit }, products) {
    commit(types.SET_PRODUCTS, products);
  },
  clearCartProducts({ commit }) {
    commit(types.CLEAR_CART_PRODUCTS);
  },
};
```

```js
/* src/store/store.js */
import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger"; // 修改state時在console打印

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug, // 嚴格模式，非法修改state時報錯
  plugins: debug ? [createLogger()] : [],
});
```

```html
<!-- src/views/ShopApp/ShoppingCart.vue -->
<template>
  <div class="cart">
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total }}</p>
    <el-button @click="clearCartProducts">CLEAR</el-button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "ShoppingCart",
    computed: {
      ...mapGetters({
        products: "cartProducts",
        total: "cartTotalPrice",
      }),
    },
    methods: {
      ...mapActions(["clearCartProducts"]),
    },
  };
</script>
```

```html
<!-- src/views/ShopApp/ProductList.vue -->
<template>
  <ul class="product-wrapper">
    <li class="row header">
      <div v-for="(th,i) in tHeader" :key="i">{{ th }}</div>
    </li>
    <li class="row" v-for="product in currentProducts" :key="product.id">
      <div>{{ product.title }}</div>
      <div>{{ product.price }}</div>
      <div>{{ product.inventory - product.quantity }}</div>
      <div>
        <el-input-number
          :min="0"
          :max="product.inventory"
          v-model="product.quantity"
          @change="handleChange"
        >
        </el-input-number>
      </div>
    </li>
  </ul>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    data() {
      return {
        tHeader: ["名称", "价格", "剩余库存", "操作"],
        currentProducts: [],
      };
    },
    computed: {
      ...mapGetters(["allProducts"]),
    },
    // 为了避免表单直接修改store中的数据，需要使用watch模拟双向绑定
    watch: {
      allProducts: {
        handler(val) {
          this.currentProducts = JSON.parse(JSON.stringify(this.allProducts));
        },
        deep: true,
      },
    },
    created() {
      this.getAllProducts();
    },
    methods: {
      handleChange() {
        this.setProducts(this.currentProducts);
      },
      ...mapActions(["setProducts", "getAllProducts"]),
    },
  };
</script>

<style scoped>
  .product-wrapper {
    padding: 0;
    margin: 0;
    max-width: 600px;
  }
  .row {
    list-style: none;
    display: flex;
  }
  .row.header {
    font-size: large;
    font-weight: bold;
  }
  .row > div {
    flex: 1;
  }
  .row > div:first-child,
  .row > div:last-child {
    flex: 2;
  }
</style>
```

```html
<!-- src/views/ShopApp/ShopApp.vue -->
<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr />
    <h2>Products</h2>
    <ProductList />
    <hr />
    <h2>Your Cart</h2>
    <ShoppingCart />
  </div>
</template>

<script>
  import ProductList from "./ProductList.vue";
  import ShoppingCart from "./ShoppingCart.vue";
  export default {
    components: { ProductList, ShoppingCart },
  };
</script>
```

```js
/* src/router/routes.js */
{
  path: '/shopapp',
  component: () => import('../views/ShopApp/ShopApp.vue'),
}
```

```html
<!-- src/views/Home.vue -->
<router-link to="/shopapp">ShopApp</router-link>
```

---

```JavaScript
// State
const state = {
  userInfo: {}
}

// Mutaionconst
mutations = {
  UPDATE_USER_INFO (state, payload) { state.userInfo = payload }
}

// Actionexport
const fetchUserInfo = async ({commit}) => {
  // ... 请求用户数据
  // 调用 Mutaion 写入用户数据
  commit('UPDATE_USER_INFO', userInfo)
}

// Component// 在组件中引入 Action
...mapAction({
  fetchUserInfoAction: `fetchUserInfo`
})
// 在 method 中调用 Action
let res = self.fetchUserInfoAction()
```

```HTML
<div>
    {{name}}, 总数：{{todoCount}}
    <span @click='addList'>点击改变总数</span>
    <button @click='addFuncAnsyc'>点击我actions改变数据</button>
</div>
<script>
export default {
  data() {
    return {
      name: "Satya",
      count: 1,
      todoLists: []
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
 methods: {
    // addList
    addList(){
      let count = this.count++;
      this.$store.commit('ADD',count);
    },
    // 异步改变state
    addFuncAnsyc(){
      const obj ={};
      // 同步请求 ，
      Promise.all([this.$store.dispatch('commonActionGet',['getPower:COUNTASYNC',obj])]).then((res)=>{});
    },
  },
};
</script>
```

模板代码中 <span @click='addList'>点击改变总数</span> 点击一下 触发 addList 函数，该函数会调用 this.\$store.commit('ADD', count); 该方法，commit 方法是同步的，它会寻找 mutations.js 对应的 'ADD'函数.
因此，store/mutations-types.js 代码如下：

```JavaScript
export const ADD = 'ADD'; // 新增list
export const SETERROR = 'SETERROR'; // 设置错误提示
export const COUNTASYNC = 'COUNTASYNC'; // 异步操作count
```

store/mutations.js 代码如下：

```JavaScript
import * as types from './mutations-types';

export default {
  [types.ADD] (state,payload){
    state.add = payload;
  },
  [types.SETERROR] (state,payload){
    state.errors =payload;
  },
  [types.COUNTASYNC] (state,payload){
    state.counts = payload;
  }
}
```

store/state.js 代码如下：

```js
export default {
  add: 0,
  error: "",
  counts: 0,
};
```

store/actions.js 代码如下：

```JavaScript

```

store/index.js

```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

Vue.config.devtools = true;

export default new Vuex.Store({
  state, mutations, actions
})
```

### mapActions

...mapActions(['clickAFn']) 相当于 this.\$store.dispatch('clickAFn'，{参数})，mapActions 中只需要指定方法名即可，参数省略。

```HTML
<template>
  <div class="componentsA">
      <P class="title">组件A</P>
      <P class="titleName">餐馆名称：{{resturantName}}</P>
      <div>
            <!-- 点击修改 为 A 餐馆 -->
          <button class="btn" @click="modifyAName('A餐馆')">修改为A餐馆</button>
      </div>
      <div class="marTop">
          <button class="btn" @click="trunToB">跳转到B页面</button>
      </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'A',
  data () {
    return {
    }
  },
  methods:{
      ...mapActions( // 语法糖
          ['modifyAName'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      trunToB () {
          this.$router.push({path: '/componentsB'}) // 路由跳转到B
      }
  },
  computed: {
      ...mapGetters(['resturantName']) // 动态计算属性，相当于this.$store.getters.resturantName
  }
}
</script>
```

JSON.parse 将 JSON 字符串转换（“格式化”）为对象、
JSON.stringify 将对象或者数组转换（“压缩”）为一个 JSON 字符串

#### 简单计数功能

```JavaScript
/* src/store/store.js */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // increment(state) {
    //   state.count++
    // },
    // 箭头函数简写式:
    increment: state => state.count++,
    decrement: state => state.count--,
  },
  actions: { }
})
```

```HTML
<section>
  <h1>{{ count }}</h1>
  <el-button @click="increment" >增量</el-button>
  <el-button @click="decrement" >减量</el-button>
</section>

<script>
export default {
    // 计算属性
  computed: {
    count(){
      return this.$store.state.count
    },
  },
  methods: {
    increment() {
      // 提交 mutation 的方式，更明确地追踪到状态的变化
      this.$store.commit('increment'); // 此处的值，就是mutations中的对应函数跟踪变化
      console.log("触发增量变更:",this.$store.state.count)
    },
    decrement() {
      this.$store.commit('decrement');
      console.log("触发减量变更:",this.$store.state.count)
    }
  }
};
</script>
```

```JavaScript
Vue.use(Vuex); // 使用vuex
    var myStore = new Vuex.Store({
      // state是存储状态 定义应用状态全局的数据结构
      state: {
        name: 'kongzhi',
        todoLists: []
      },
      /*
        mutations是提交状态修改，也就是set、get中的set，这是vuex中唯一修改state的方式，但是不支持异步操作。
        每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)
        第一个参数默认是state，外部调用方式为：store.commit('SET_AGE', 30).
      */
      mutations: {
        // 新增list
        ADDLIST(state, item) {
          state.todoLists.push(item);
        },
        // 删除list中的项
        DELLIST(state, index) {
          state.todoLists.splice(index, 1);
        },
        // 设置 错误提示信息
        SETERROR(state, msg) {
          state.message = msg;
        }
      },
      /*
        getters是从state中派生出状态的。也就是set、get中的get，它有两个可选的参数，state和getters，
        分别可以获取state中的变量和其他的getters。外部调用的方式：store.getters.todoCount()
      */
      getters: {
        todoCount(state) {
          return state.todoLists.length;
        }
      },
      /*
       和上面的mutations类似，但是actions支持异步操作的，外部调用方式为：store.dispatch('nameAction')
       常见的使用是：从服务器端获取数据，在数据获取完成后会调用 store.commit()来更改Store中的状态。
       Action函数接收一个与store实列具有相同方法和属性的context对象，因此我们可以使用 context.commit 提交一个
       mutation，或者通过 context.state 和 context.getters来获取state和getters
      */
      actions: {
        addList(context, item) {
          if (item) {
            context.commit('ADDLIST', item);
            context.commit('SETERROR', '');
          } else {
            context.commit('SETERROR', '添加失败');
          }
        },
        delList(context, index) {
          context.commit('DELLIST', index);
          context.commit('SETERROR', '删除成功');
        }
      },
    });

    // 注册vue组件 xxx
    Vue.component('xxx', {
      template: "<div>{{name}}</div>",
      computed: {
        name: function() {
          console.log(this.$store.state);
          return this.$store.state.name;
        },
        // 对state的数据进行刷选和过滤操作，比如后台请求回来的数据，我们需要进行数据过滤操作，getters就可以
        todoCount: function() {
          return this.$store.getters.todoCount;
        }
      },
      mounted: function() {
        console.log(this);
      },
      // 改变state
      data: function() {
        return {
          count: 0
        }
      },
      methods: {
        addList: function() {
          var count = this.count++;
          this.$store.commit('ADDLIST', count);
        }
      }
    });

    new Vue({
      el: '#app',
      data: {
        name: 'init name'
      },
      store: myStore,
      mounted: function() {
        console.log(this);
      }
    })
```

### actions 操作 mutations 异步来改变 state 数据

actions 可以异步操作，actions 提交 mutations，通过 mutations 来提交数据的变更。它是异步修改 state 的状态的。
外部调用方式是 this.\$store.dispatch('nameAsyn');

```JavaScript
Vue.use(Vuex); // 使用vuex
    var myStore = new Vuex.Store({
      // state是存储状态 定义应用状态全局的数据结构
      state: {
        name: 'kongzhi',
        todoLists: [],
        // 添加count字段
        count: 1
      },
      /*
        mutations是提交状态修改，也就是set、get中的set，这是vuex中唯一修改state的方式，但是不支持异步操作。
        每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)
        第一个参数默认是state，外部调用方式为：store.commit('SET_AGE', 30).
      */
      mutations: {
        // 新增list
        ADDLIST(state, item) {
          console.log(state.todoLists);
          state.todoLists.push(item);
        },
        // 删除list中的项
        DELLIST(state, index) {
          state.todoLists.splice(index, 1);
        },
        // 设置 错误提示信息
        SETERROR(state, msg) {
          state.message = msg;
        },
        // 异步操作count
        COUNTASYNC(state, param) {
          console.log(state.count += param);
        }
      },
      /*
        getters是从state中派生出状态的。也就是set、get中的get，它有两个可选的参数，state和getters，
        分别可以获取state中的变量和其他的getters。外部调用的方式：store.getters.todoCount()
      */
      getters: {
        todoCount(state) {
          return state.todoLists.length;
        }
      },
      /*
       和上面的mutations类似，但是actions支持异步操作的，外部调用方式为：store.dispatch('nameAction')
       常见的使用是：从服务器端获取数据，在数据获取完成后会调用 store.commit()来更改Store中的状态。
       Action函数接收一个与store实列具有相同方法和属性的context对象，因此我们可以使用 context.commit 提交一个
       mutation，或者通过 context.state 和 context.getters来获取state和getters
      */
      actions: {
        addList(context, item) {
          if (item) {
            context.commit('ADDLIST', item);
            context.commit('SETERROR', '');
          } else {
            context.commit('SETERROR', '添加失败');
          }
        },
        delList(context, index) {
          context.commit('DELLIST', index);
          context.commit('SETERROR', '删除成功');
        },
        // 设置延时来演示一下异步提交
        addFunc(context, value) {
          console.log(context);
          setTimeout(function(){
            // 异步提交 actions操作Mutations
            context.commit('COUNTASYNC', value);
          }, 100);
        }
      },
    });
    // 注册vue组件 xxx
    Vue.component('xxx', {
      template:
        `<div>
          {{name}}, 总数：{{todoCount}}
          <span @click='addList'>点击改变总数</span>
          <button @click='addFuncAnsyc'>点击我actions改变数据</button>
        </div>`,
      computed: {
        name: function() {
          return this.$store.state.name;
        },
        todoCount: function() {
          return this.$store.getters.todoCount;
        }
      },
      mounted: function() {
        console.log(this);
      },
      data: function() {
        return {
          count: 0
        }
      },
      methods: {
        addList: function() {
          var count = this.count++;
          this.$store.commit('ADDLIST', count);
        },
        addFuncAnsyc: function() {
          this.$store.dispatch('addFunc', 1);
        }
      }
    });
    new Vue({
      el: '#app',
      data: {
        name: 'init name'
      },
      store: myStore,
      mounted: function() {
        console.log(this);
      }
    })
// 触发内部函数 addFuncAnsyc后，会调用 this.$store.dispatch('addFunc', 1);调用来操作actions中的方法，第一个参数对应actions中的方法名，第二个是参数值，在actions中的函数 addFunc 打印出 context
```

addFunc 函数会调用 context.commit('COUNTASYNC', value); 代码，会找到 mutations 中对应的 COUNTASYNC，然后会对 state 数据进行更改。
理解 context: context 是和 this.$store 具有相同的方法和属性的对象。我们可以通过 context.state 和 context.getters来获取state和getters。
理解dispatch: 它含有异步操作，含义可以理解为 '派发'，比如向后台提交数据，可以为 this.$store.dispatch('actions 方法名', 值);

### State 单一状态树

```JavaScript
// 从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
computed: {
    count () {
      // 每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM
      return store.state.count
    }
}
// 在 src/main.js中
new Vue({
  router,
  store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  render: h => h(App)
}).$mount('#app')

// 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
computed: {
    count () {
      return this.$store.state.count
    }
  }
```

#### mapState 辅助函数

- mapState 函数返回的是一个对象
  使用 mapState 工具函数会将 store 中的 state 映射到局部计算属性中
  在 mounted 方法内，直接使用 this.xx 即可使用到对应 computed 中对应的属性
  注意：mapState 的属性，一定要和 state 的属性值相对应，也就是说 state 中定义的属性值叫 add，那么 mapState 就叫 add，如果我们改成 add2 的话，就获取不到 add 的值了，并且 add2 的值也是 undefined

```HTML
<!-- 想获取add，或 count的时候，需使用 this.store.state.add或this.store.state.count  -->
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    // // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      add: state => state.add,
      counts: state => state.counts
    })
    // 也可以是展开数组 // 映射 this.add 为 store.state.add
    ...mapState(['add','counts'])
  },
  mounted(){
      // this.add 就直接映射到 this.$store.state.add
    console.log(this.add); // 打印 0
    console.log(this.counts); // 打印 0
    console.log(this);
  }
};
</script>
```

#### mapGetters 辅助函数

将 store 中的 getter 映射到局部计算属性

```JavaScript
import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
// 如果你想将一个 getter 属性另取一个名字，使用对象形式：
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### Mutation

#### mapMutations 在组件中提交 Mutation

在组件中使用 this.\$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用

```JavaScript
import { mapMutations } from 'vuex'
export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### Action

- Action 提交的是 mutation，而不是直接变更状态。可以包含任意异步操作

```JavaScript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

// 需要调用 commit 很多次的时候,常用ES2015 的 参数解构 来简化代码
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

#### 分发 Action

通过 store.dispatch 方法触发：store.dispatch('increment')

```JavaScript
// 异步操作
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

// 购物车示例，涉及到调用异步 API 和分发多重 mutation
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
// 进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）
```

#### mapActions 在组件中分发 Action

使用 this.\$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用

```JavaScript
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

```JavaScript
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
store.dispatch('actionA').then(() => {
  // ...
})

// 在另外一个 action 中也可以：
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

// 最后，如果我们利用 async / await，我们可以如下组合 action：
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('getData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('getOtherData', await getOtherData())
  }
}
// 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
```

### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。 为了解决以上问题，将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```JavaScript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象

```JavaScript
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState

```JavaScript
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```JavaScript
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

```JavaScript
/* src/vuex/types.js */
export const ADD_COUNT = 'ADD_COUNT'

/* src/vuex/actions.js */
import * as types from './types'
export const testAction =({commit},option={}) => {
  return new Promise((resolve,reject)=>{
    commit(types.ADD_COUNT,option)
  })
};

/* src/vuex/module.js */
import * as types from './types'
export const state = {
  count: 1
};
export const mutations = {
  [types.ADD_COUNT](state, params) {
    state.count += params;
  }
};
export const getters = {
  getCount: state => state.count
};

/* src/vuex/store.js */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import {state,mutations,getters} from './module'
Vue.use(Vuex)
export default new Vuex.Store({
  state,actions,mutations,getters
})
```

```HTML
<!-- 在页面中使用 -->
<template>
  <section>
    <h1>{{ count }}</h1>
    <el-button @click="addByAction" size="mini" type="primary" plain >通过action触发</el-button>
    <el-button @click="addByCommit" size="mini" type="primary" plain >通过commit触发</el-button>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: mapGetters({
    count:'getCount'
  }),
  methods: {
    addByAction(){
      this.$store.dispatch('testAction',2);
    },
    addByCommit(){
      this.$store.commit('ADD_COUNT',1);
    }
  }
}
```

### vuex-persistedstate

vuex 用于管理项目中的全局状态，但若刷新 vuex 中保存的全局状态就会被全部初始化，可以同时缓存到 storage 中做两步操作，该组件已经完成了同步更新

```Bash
npm install vuex-persistedstate --save
```

用 vuex 中的 plugins 属性挂载，每次更新 vuex 的状态，localstorage 中的 vuex 也会随之改变

```JavaScript
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [createPersistedState()]
})
```

API

createPersistedState([options])
使用给定的选项创建插件的新实例。可以提供以下选项来配置您的特定需求的插件：
key <String>：存储持久状态的键。（默认：vuex）
paths <Array>：部分持续状态的任何路径的数组。如果没有路径给出，完整的状态是持久的。（默认：[]）
reducer <Function>：一个函数，将被调用来减少基于给定的路径持久化的状态。默认包含这些值。
subscriber <Function>：一个被调用来设置突变订阅的函数。默认为 store => handler => store.subscribe(handler)
storage <Object>：而不是（或与）getState 和 setState。默认为 localStorage。
getState <Function>：将被调用以重新水化先前持久状态的函数。默认使用 storage。
setState <Function>：将被调用来保持给定状态的函数。默认使用 storage。
filter <Function>：将被调用来过滤将 setState 最终触发存储的任何突变的函数。默认为() => true

自定义存储
如果在本地存储中存储 Vuex 存储的状态并不理想。人们可以轻松地实现功能使用 cookie（或任何其他你可以想到的）;

```JavaScript
import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})
// 实际上，可以传递任何遵循存储协议（getItem，setItem，removeItem等）的对象：
// 用sessionStorage替换localStorage
createPersistedState({ storage: window.sessionStorage })
```

# UI

### Tooltip

- 以**directive**指令形式封装

```js
/* directive/tooltip.js */
export default {
  bind(el, binding, vnode, oldVnode) {
    let parentEle = document.createElement("div");
    parentEle.id = "tooltip";
    parentEle.innerText = binding.value;

    //styles
    let darktheme = document.querySelector("head");
    darktheme.innerHTML;

    //mouse enter event
    el.addEventListener("mouseenter", (event) => {
      event.cancelBubble = true;
      let rect = el.getClientRects();
      parentEle.style.left = rect["0"].left - 0 + "px";
      parentEle.style.top = rect["0"].top + 20 + "px";

      document.getElementById("app").appendChild(parentEle);
    });

    //mouse leave event
    el.addEventListener("mouseleave", (event) => {
      document.getElementById("tooltip").remove();
    });
  },

  unbind(el, binding, vnode, oldVnode) {
    el.removeEventListener("mouseenter", () => {});
    el.removeEventListener("mouseleave", () => {});
  },
};

/* directive/index.js */
import tooltip from "./tooltip";

const install = function (Vue) {
  Vue.directive("tooltip", tooltip);
};
if (window.Vue) {
  window["tooltip"] = tooltip;
  Vue.use(install);
}
tooltip.install = install;
export default tooltip;
```

```html
<!-- BaseTooltip.vue -->
<template>
  <span v-tooltip="tip">{{tip}}</span>
</template>
<script>
  import tooltip from "@/directive/tooltip/index.js";
  export default {
    name: "BaseTooltip",
    directives: { tooltip },
    props: {
      tip: {
        type: String,
        default: "tooltip Default",
      },
    },
  };
</script>
```

### 创建项目

```Bash
# rupa-ui 使用default配置
$ vue create rupa-ui # 创建项目
? Please pick a preset: (Use arrow keys)
> default (babel, eslint) # 默认
$ git remote add origin 仓库名 # 本地库连接远程库
$ git push -u origin master # 推送到远程仓库
```

```JSON
{
  "private": false, // 发布到npm需改为false
  "license": "MIT",
}
```

1.创建一个 packages 目录，用于存放组件
2.src 目录改为 examples，用作示例

### 修改配置文件

3.修改配置文件**vue.config.js**

```JavaScript
/* vue.config.js */
module.exports = {
  // 将 examples 目录添加为新的页面
  pages:{
    index:{
      // page的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  }
}
```

### 开发组件

**packages**下存放每个组件单独的开发目录

```HTML
<!-- packages/button/src/button.vue -->
<template>
  <button class="rp-button" type="button">rupa-ui for Button</button>
</template>

<script>
export default {
  name: "rpButton"
};
</script>

<style>
.rp-button {
  background-color: cadetblue;
}
</style>
```

```JavaScript
/* packages/button/index.js */
import RpButton from './src/button.vue' // 导入组件，必须声明name
// 为组件添加 install 方法，用于按需引入
RpButton.install =function(Vue) {
  Vue.component(RpButton.name,RpButton)
}
export default RpButton
```

创建**src**目录，内中一个**index.js**整合所有组件,并对外导出

```JavaScript
/* src/index.js */
// import RpButton from './button/index';
import RpButton from '../packages/button/index';
// 以数组的结构保存组件，便于遍历
const components = [
  RpButton
]

// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install, // 导出的对象必须举杯一个 install 方法
  ...components // 组件列表
}
```

### 测试组件

```JavaScript
/* examples/main.js */
import Vue from 'vue'
import App from './App.vue'
import Rupaui from '../packages/index'; // 引入 UI库

Vue.use(Rupaui); // 使用该UI库
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

```HTML
<!-- examples/App.vue -->
<template>
  <div>
    <!-- 因在封装的组件中写了字符串，所以此处哇哈哈将被覆盖 -->
    <rp-button>哇哈哈</rp-button>
  </div>
</template>
```

### 打包组件

- 库文件打包命令:
- **target**:默认构建应用,改为 lib 即可启用构建库模式
- **name**:输出文件名
- **dest**:输出目录，默认为 dist, 通常改为 lib
- **entry**:入口文件路径，默认为 src/App.vue, 改为 packages/index.js

```JSON
// 在package.json 中添加一个脚本命令
{"lib": "vue-cli-service build --target lib --name rupa-ui --dest lib packages/index.js"}
```

```Bash
$ npm run lib
```

### 添加组件信息

```JSON
// package.json 添加组件信息
{
  "name": "rupa-ui", // 包名，不能与npm上已有的冲突
  "version": "0.1.0", // 版本号,不能和历史版本号相同
  "description": "rupa-ui", // 简介
  "main": "lib/rupa-ui.umd.min.js", // 入口文件，应指向便以后的包文件
  "private": false, // 发布到npm ，必须设置false
  "author": "lokavit", // 作者
  "license": "MIT", // 开源协议
  // 指定代码所在的仓库地址
  "repository": {
    "type": "git",
    "url": "仓库地址"
  },
  // 指定打包之后，包中存在的文件夹
  "files": [
    "lib",
    "src"
  ],
}
```

### 项目中使用

在其它项目中使用以上发布到 npm 的组件

```Bash
$ npm config set registry https://registry.npm.taobao.org # 设置为淘宝镜像
$ npm config get registry # 查看当前镜像
$ npm install rupa-ui --save
```

```JavaScript
/* src/main.js */
import Rupaui from 'rupa-ui';
Vue.use(Rupaui);
```

```HTML
<!-- src/App.vue -->
<template>
  <rp-button></rp-button>
</template>
```

# EL-UI

### 全局变量多种使用方式

```js
/* global.js */
const LIST_TABLE_MARGIN = {
  marginTop: "30px",
  marginBottom: "10px",
};

const LIST_TABLE_HEADER_CELL_STYLE = {
  background: "#DDE0E6",
  color: "#2E2F2E",
  height: "40px",
};

export default {
  LIST_TABLE_MARGIN, //
  LIST_TABLE_HEADER_CELL_STYLE,
};
```

```html
<!-- 直接写在 标签上 -->
<div
  :style="[{'width':width},GLOBAL.LIST_TABLE_MARGIN]"
  :header-cell-style="GLOBAL.LIST_TABLE_HEADER_CELL_STYLE"
></div>

<!-- 声明个属性，然后赋值 ，把属性写在标签上 -->
<div
  :style="[{'width':width},styleObject]"
  :header-cell-style="headerCellStyle"
></div>
<script>
  data(){return{
          styleObject: this.GLOBAL.LIST_TABLE_MARGIN,
        headerCellStyle: this.GLOBAL.LIST_TABLE_HEADER_CELL_STYLE,
  };}
</script>

<!-- 写到 computed里面  若有需要计算及改变的时候，可以用此种方式 -->
<div
  :style="[{'width':width},styleObject]"
  :header-cell-style="headerCellStyle"
></div>
<script>
  computed: {
    width() {
      return this.GLOBAL.returnCurrentWindowWidth(
        this.GLOBAL.INITIAL_WIDE
      );
    },
    styleObject() {
      return this.GLOBAL.LIST_TABLE_MARGIN;
    },
    headerCellStyle() {
      return this.GLOBAL.LIST_TABLE_HEADER_CELL_STYLE;
    }
  },
</script>
```

### style 多个混用

```html
<!-- 数组形式：表示里面一个对象属性，后面还有一个对象 -->
<div :style="[{'width':width},styleObject]"></div>
<script>
  data() {
      return {
        // 这是那个样式对象
        styleObject: {
          marginTop: "30px",
          marginBottom: "10px"
        },
      };
    },
    computed: {
      // 宽度单写
      width() {
        return this.GLOBAL.returnCurrentWindowWidth(
          this.GLOBAL.INITIAL_WIDE
        );
      }
    },
</script>

<!-- 最终渲染结果 -->
<div style="width:1200px;margin-top:30px;margin-bottom:10px;"></div>
```

### 分辨率与列表页

- 根据不同分辨率,决定列表页每页所需显示的数据条数，
- 特殊情况:列表页不分页，带内嵌滚动。如两个库存清单的[height]计算
- 表单页面的高度问题，尤其是含有内嵌行的表单页面
- 解决方案如下:

```js
/* 全局函数 utils/global.js */
/**
 * 根据不同分辨率，返回列表页每页数据条数
 * 该返回值，直接用于 每个列表页请求中，tableData.size属性的值。
 * use: tableData:{size:this.GLOBAL.returnTableDataSize()} // 每页条数
 */
function returnTableDataSize() {
  // 返回列表页每页显示的数据条数
  if (window.screen.width <= 1366) return 10; // 每页 10条
  if (window.screen.width > 1366 && window.screen.width <= 1680) return 12; // 每页12条
  if (window.screen.width > 1680 && window.screen.width <= 1920) return 15; // 每页15条
  if (window.screen.width > 1920) return 16; // 每页16条
}
export default {returnTableDataSize,} // 导出。

/* main.js */
import global from './utils/global'; // 引入 全局变量及函数文件
Vue.prototype.GLOBAL = global; // 全局变量及全局函数

/* 于 列表页中具体使用 ListMaterialGroup.vue */
data(){return{ tableData:{size:this.GLOBAL.returnTableDataSize()} };}
```

```js
/* 使用watch监听对象中的某个属性  [此方式已被以上代替]  */
data(){return{tableData:{size:10}};}
  watch: {
    tableData: {
      immediate: true, // 立即执行
      handler: function() {
        // 如果全局函数[是否标准屏1366]返回false ,则将其改为 15条
        if (!this.GLOBAL.isScreenNormal()) this.tableData.size = 15;
      },
      deep: true
    }
  },
```

```js
/* 处理库存过帐单，也就是列表页内嵌 其中滚动包裹器的高度计算值应为以下 */
  computed: {
    /** 计算table 高度 */
    height() {
      /**
       * 当前数据总条数是否小于全局函数返回的每页数据条数，
       * 如果小于，则高度为(当前数据总条数+1)*40[每条高度]
       * 否则，返回(全局函数返回的每页数据条数+1)*40[每条高度]
       */
      return this.tableData.length <= this.GLOBAL.returnTableDataSize()
        ? (this.tableData.length + 1) * 40
        : (this.GLOBAL.returnTableDataSize() + 1) * 40;
    }
  },
```

## editTable 可编辑表格

每一个可编辑单元格，皆有两个组件[编辑|显示]
点击某一行,改变该行可编辑单元格中的组件[class]
使用[@current-change]及[:row-class-name]事件,实现以上效果

- ps:每次都将选中行 row,与行 class 事件中的行数据做对比，唯有相同才将该行变为可编辑
- 使用偏门的[small]作为单元格可编辑组件的包裹器,使用[span]作为单元格显示内容的组件

```html
<el-table
  :data="tableData"
  border
  highlight-current-row
  size="mini"
  show-summary
  :summary-method="getSummaries"
  @scroll="handlerScroll"
  :header-cell-style="headerCellStyle"
  :cell-style="cellStyle"
  :style="[{'width':width},styleObject]"
  :max-height="maxHeight"
  :row-style="rowStyle"
  :row-class-name="rowClassName"
  @current-change="handleCurrentRow"
>
  <el-table-column type="index" label="#"></el-table-column>
  <el-table-column label="物料编码" prop="itemCode" min-width="11%">
    <template v-slot="scope">
      <small>
        <kft-choose
          code="Material"
          class="kft-line-choose"
          size="mini"
          show-detail
          show-index
          show-search
          v-model="scope.row.itemCode"
          @on-choose-selected="chooseMaterial($event, scope.$index)"
          placeholder="请选择物料"
        ></kft-choose>
      </small>
      <span>{{scope.row.itemCode}}</span>
    </template>
  </el-table-column>
  <el-table-column
    label="物料描述"
    show-overflow-tooltip
    prop="itemDescription"
    min-width="14%"
  ></el-table-column>

  <el-table-column label="数量" prop="quantity" min-width="12%">
    <template v-slot="scope">
      <small>
        <el-input-number
          size="mini"
          v-model="scope.row.quantity"
          :min="1"
          :max="scope.row.maxQuantity"
        ></el-input-number>
      </small>
      <span>{{scope.row.quantity}}</span>
    </template>
  </el-table-column>

  <el-table-column label="价格" prop="price" min-width="8%">
    <template v-slot="scope">
      <small>
        <el-input size="mini" v-model="scope.row.price"></el-input>
      </small>
      <span>{{scope.row.price}}</span>
    </template>
  </el-table-column>
  <el-table-column label="行总计" prop="lineTotal" min-width="9%">
    <template v-slot="scope"
      >{{((scope.row.quantity||1) * (scope.row.price||0)).toFixed(2)}}</template
    >
  </el-table-column>

  <el-table-column label="操作" width="50">
    <template v-slot="scope">
      <el-popover :ref="`popover-${scope.$index}`" placement="top" width="160">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button
            size="mini"
            type="text"
            @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="handleDeleteOk(scope._self.$refs[`popover-${scope.$index}`], scope.$index)"
            >确定</el-button
          >
        </div>
        <el-button
          type="danger"
          size="mini"
          slot="reference"
          icon="el-icon-minus"
          circle
          style="padding:0;margin-left:6px"
        ></el-button>
      </el-popover>
    </template>
  </el-table-column>
</el-table>

<script>
  export default {
    name: "FormPurchaseOrder",
    data() {
      return {
        /** 列表区域的宽度值 [列表页根据table宽度决定整体宽度] */
        width: this.GLOBAL.returnCurrentWindowWidth(this.GLOBAL.INITIAL_WIDE),
        /** 列表区域的外边距，达到距离搜索区域及分页区域之间的间隙 */
        styleObject: this.GLOBAL.FORM_TABLE_MARGIN,
        /** 列表中的表头样式 */
        headerCellStyle: this.GLOBAL.FORM_TABLE_HEADER_CELL_STYLE,
        /** 列表中的单元格样式 [非表头部分] */
        cellStyle: this.GLOBAL.FORM_TABLE_CELL_STYLE,
        /** 列表中的内容行 样式 */
        rowStyle: this.GLOBAL.FORM_TABLE_ROW_STYLE,
        tableData: [], // 表格内的数据
        currentRow: [], // [单据行]表格的当前选中行
      };
    },
    computed: {
      /** 计算 向导一 页面table 高度 用于滚动条 */
      maxHeight() {
        /**
         * 当前数据总条数是否小于全局函数返回的每页数据条数，
         * 如果小于，则高度为(当前数据总条数+1)*30[每条高度]
         * 否则，返回(全局函数返回的每页数据条数+1)*30[每条高度]
         */
        return this.tableData.length <= this.GLOBAL.returnTableDataSize() / 2
          ? (this.tableData.length + 4) * 30
          : (this.GLOBAL.returnTableDataSize() - 1) * 30;
      },
    },
    watch: {
      /** 监听当前表单数据 */
      tableData: {
        immediate: true, // 页面渲染完毕立即触发一次
        handler(val) {
          this.pushEmptyData();
        },
      },
    },
    methods: {
      /**
       * 选中当前行 参数为 (当前行 ，旧行)
       * 把选中的当前行的数据带出去，用于外部使用
       */
      handleCurrentRow(curRow, oldRow) {
        this.currentRow = curRow;
      },
      /**
       * 行 class 函数 参数为 (该行内容 ， 行下标)
       * 该事件 会根据 当前行的变更，自动执行
       * return: 设置当前行的 class ,即为设置当前行的可编辑单元格，是否显示可编辑组件
       */
      rowClassName({ row, rowIndex }) {
        // tableData中[行下标]的数据 == 当前行数据
        return this.tableData[rowIndex] == this.currentRow
          ? "edit_table" // 将其设置为 可编辑
          : "show_table"; // 其他的为为不可编辑
      },

      /** 总计 */
      getSummaries(param) {
        let { columns, data } = param;
        // 去掉多余空行
        data = this.removeEmptyData(data);
        //
        let sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = "总价";
            return;
          }
          // 如果，行合计列
          if (index == 9 && column.property == "lineTotal") {
            console.log("index:", index, "column:", column.property);
            let temp = data.map((item) => {
              if (item.lineTotal) {
                return (item.lineTotal = (item.quantity * item.price).toFixed(
                  2
                ));
                console.log("每条数据的行总计:", item.lineTotal);
              }
            });
            console.log("temp:", temp);

            sums[index] = temp.reduce((sum, cur) => {
              if (!isNaN(cur) && Number(cur)) {
                return (sum + Number(cur)).toFixed(2);
              } else {
                return sum;
              }
            }, 0);
          } else {
            sums[index] = " ";
          }
        });

        return sums;
      },

      chooseMaterial(selectedRow, index) {
        let row = this.tableData[index];
        this.$set(row, "itemCode", selectedRow.itemCode);
        this.$set(row, "itemDescription", selectedRow.itemDescription);
        this.$set(row, "quantity", row.quantity || 1);
        // 给该行添加 [lineTotal]行总计 属性
        this.$set(
          row,
          "lineTotal",
          ((row.quantity || 1) * (row.price || 0)).toFixed(2) || 0
        );
        console.log("输出新对象:", row);
      },
      handleDeleteOk(popover, index) {
        popover.doClose();
        this.tableData = this.tableData.filter((row, i) => i !== index);
      },
      /** 添加空数据行 */
      pushEmptyData() {
        if (this.tableData.filter((row) => !row.itemCode).length === 0) {
          this.tableData.push({});
        }
      },
    },
  };
</script>
```

```css
/* 选中的行 样式 */
.edit_table {
  color: #6a7483;
}

.edit_table > td {
  height: 30px;
}

/* 给编辑状态下的行，添加该class ，并且设置其最后一个[span]元素为none
   因td中组件有可能带有span元素[如数字输入的按钮],所以此处用最后一个span元素 */
.edit_table > td div span:nth-last-child(1) {
  display: none;
}

/* 非选中行的样式 */
.show_table {
  color: #6a7483;
  // display: none;
}

/* 需要 div 的  子元素  使用一个极偏的元素标签代替 
   此处[small]标签非原本意义 而是作为[el-table]每个可编辑单元格
   编辑时的组件包裹器  */
.show_table > td div small {
  // background-color: chartreuse;
  display: none;
  /* 非编辑下，单元格中可编辑组件设为 none */
}
```

#### el-table 中那些事件

```js
/**
 * @current-change="handleCurrentRow"
 * 当前选中行，参数为(当前行，旧行)
*/
handleCurrentRow(curRow, oldRow) {
  console.log("当前行", curRow);
  console.log("旧行:", oldRow);
  this.currentRow = curRow;
},

/**
 * @row-click="rowClick"
 * 行点击事件，参数为(行,列,事件)
*/
rowClick(row, column, event) {
  console.log("row:", row);
  console.log("column:", column);
  console.log("event:", event);
},

/**
 * :row-class-name="rowClassName"
 * 行类名，参数为(行，行下标)
*/
rowClassName({ row, rowIndex }) {
  console.log("rowClassName rowIndex:", rowIndex);
  console.log("rowClassName row:", row);
  console.log("第x行数据:", this.tableData[rowIndex]);
},

/**
 * :cell-class-name="cellClassName"
 * 单元格类名(行，列，行下标，列下标)
*/

cellClassName({ row, column, rowIndex, columnIndex }) {
  console.log("cellClassName rowIndex:", rowIndex);
  console.log("cellClassName row:", row);
  console.log("cellClassName columnIndex:", columnIndex);
  console.log("cellClassName column:", column);
},
```

## Tabs 多签

```HTML
<!-- XXXTabs.vue -->
<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <template v-for="item in tabs">
      <el-tab-pane :label="item.label" :name="item.name" v-if="$permission.check(item.code)" :key="item.name">
        <template v-for="component in $options.components">
          <component v-if="component.name === item.name" :is="component.name" :key="component.name"></component>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
import TodoList from './TodoList.vue';
import RefusedList from './RefusedList.vue';

export default {
  name: 'XXXTabs',
  components: { TodoList,RefusedList },
  data() {
    return {
      // 指定一个初始显示组件
      activeName: 'TodoList',
      tabs: [
        {
          label: '待申请',
          name: 'TodoList',
          code: '3b386785-4c6d-403e-b64c-3ae1af95a644'
        },
        {
          label: '已拒绝',
          name: 'RefusedList',
          code: '3b386785-4c6d-403e-b64c-3ae1af95a644'
        }
      ]
    };
  },
  // 此处该有一个计算属性， 用来监听 activeName值的变化，如果值有变化，则调用对应组件中的函数，(如，请求数据)

  created() {
    // 根据权限，判断当前激活的tab
    if (this.$permission.check('3b386785-4c6d-403e-b64c-3ae1af95a644')) {
      this.activeName = 'TodoList';
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      console.log('TAB:' + this.activeName, 'EVENT:' + event);
    }
  }
};
</script>
```

# Axios

- 基于 promise 的 HTTP 库。
- POST : 请求体格式 data:{user:'admin'}
- GET : 请求体格式 params:{ID:123}
- 大型項目中，建議按模塊區分

## vue-elUI 封装的 axios

```js
/**
 * http.js
 * axios HTTP庫，創建並實例化，處理攔截
 */
import axios from "axios";
import { Message } from "element-ui";

// import {
//   getToken
// } from '../utils/auth'
// import store from '../store/store'

export const http = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  baseURL: "http://192.168.1.5:9000", // 后台接口
  timeout: 5000, // 請求限時
});

/**
 *  request 請求攔截
 */
http.interceptors.request.use(
  (config) => {
    // config.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
    // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // 如果获取到token ，每个请求的请求头，携带token,
    // // 獲取到token值
    // if (store.getters.token) {
    //   // 每個請求的請求頭，攜帶token [Authorization]自定義Key
    //   config.headers['Authorization'] = getToken()
    // }

    // 在这里统一处理，请求拦截 ，如条件查询时， 将query 解析为url get 带参
    // console.log('请求拦截中的url：', config.url);
    // console.log('请求拦截中的params:', config.params);

    // // 统一第一页？
    // console.log('请求拦截：', config);

    return config; //返回配置
  },
  (error) => {
    // 请求拦截的异常处理区域。
    // console.log('ERROR:',error);
    return Promise.reject(error);
  }
);

/**
 * response 響應攔截
 */
http.interceptors.response.use(
  (response) =>
    // response,
    {
      if (response.status == 200) {
        const res = response.data; // 从 data里面的数据开始返回
        return res;
      } else {
        // 非200 非错误的情况下
        // console.log("响应拦截非200:", response);
      }
    },

  //   if (res.code !== 200) {
  //     console.error(res.message);
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     // if (res.code === 5000 || res.code === 50012 || res.code === 50014) {
  //     //   store.dispatch('user/resetToken').then(() => {
  //     //     location.reload()
  //     //   })
  //     // }
  //     return Promise.reject(res.message || 'error')
  //   } else {
  //     console.log('响应拦截 ELSE:', res);
  //     return res
  //   }
  // },

  /**
   * 异常处理区域
   */
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        /** 请求错误(400) */
        case 400:
          Message.warning(error.response.data.errorMsg);
          break;
      }
    } else {
      // console.log('ERROR:', error);
    }
    return Promise.reject(error.response);
  }
);

/**
 *    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
 */
```

```js
/**
 * purchase.js
 * purchase 采购模块 API
 */
import { http } from "./http";

/**
 * 获取供应商列表
 * @param {*} params
 */
export function getVendor(params) {
  return http({
    url: "/vendors",
    method: "get",
    params,
  });
}
/**
 * 根据指定的供应商编码，获取该供应商信息
 * @param {*} code
 */
export function getVendorInfo(code) {
  return http({
    url: `/vendors/${code}`,
    method: "get",
  });
}
/**
 * 供应商表单 新增
 * @param {*} data
 */
export function postVendor(data) {
  return http({
    url: "/vendors",
    method: "post",
    data,
  });
}
/**
 * 供应商表单 更新
 * @param {*} data
 */
export function putVendor(data) {
  return http({
    url: "/vendors",
    method: "put",
    data,
  });
}
```

```js
/** 具体使用 */
<script>
import { getVendor } from "@/api/purchase";
export default {
mounted() {
    this.fetchData();
  },
  methods: {
    /**
     * 获取当前页面列表数据集
     * page: 当前页
     * size: 每页数据集条数
     * search: 于查询框输入的值
     */
    async fetchData(page, size, search = "") {
      let params = {
        page: page > 0 ? page - 1 : 0,
        size: this.tableData.size,
        keyword: search
      };
      this.loading = true;
      try {
        let res = await getVendor(params);
        this.tableData = res;
        this.loading = false;
      } catch (err) {
        console.error(err);
        this.loading = false;
      }
    }
  }
};
</script>

<script>
import { getVendorInfo, postVendor, putVendor } from "@/api/purchase";
export default {
mounted() {
    // 如果有传入单元格的值
    if (this.cellValue) {
      this.isDisabled = true; // 编号不可输入
      this.fetchData();
    }
    // 如果没有值，则是新增数据
    else {
      this.isDisabled = false; // 编号可输入
    }
  },
  watch: {},
  methods: {
    async fetchData() {
      try {
        const res = await getVendorInfo(this.cellValue);
        this.form = res;
      } catch (error) {}
    },
    /**
     * 表单提交按钮 事件
     */
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          /** 用 [version] 版本号来判定，执行新增函数 or 更新函数 */
          if (this.form.version === undefined) {
            this.postData();
          } else {
            this.putData();
          }
        } else {
          this.$message.warning("请检查表单");
          return false;
        }
      });
    },
    /**
     * 重置表单，清空输入内容
     * 根据 【version】 的有无，判断当前重置按钮触发清理表单
     */
    resetForm() {
      // 如果有版本号
      if (this.form.version !== undefined) {
        // 将表单的禁输信息，暂存一下。
        let temp = this.form.code;
        this.$refs.form.resetFields(); // 清理表单所有输入值
        // 将清理前暂存的禁输信息，赋值到表单禁输框中。
        this.form.code = temp;
      } else {
        // 如果没有版本号。清理整个表单
        this.$refs.form.resetFields();
      }
    },

    /**
     * 新增数据
     */
    async postData() {
      try {
        this.loading = true;
        const res = await postVendor(this.form);
        this.form = res; // 返回结果中的数据，回显至表单上
        this.isDisabled = true; // 新增的数据提交之后，不可更改
        this.$message.success("提交成功");
        this.loading = false;
      } catch (error) {
        this.resetForm(); // 调用重置事件，清空表单
        this.isDisabled = false; // 编码可输入
        this.loading = false;
      }
    },

    // 更新数据
    async putData() {
      try {
        this.loading = true;
        const res = await putVendor(this.form);
        this.form = res;
        this.$message.success("修改成功");
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>
```

---

## 基於 Vue 封裝 v3.0

```js
/* src/utils/auth.js */
import Cookies from "js-cookie";
const TokenKey = "Admin-Token";
export function getToken() {
  return Cookies.get(TokenKey);
}
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}
```

```js
/* src/store/getters.js */
const getters = {
  token: (state) => state.user.token,
};
export default getters;

/* src/store/index.js */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", false, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
```

```js
/* src/api/http.js */
/**
 * axios HTTP庫
 * 創建、實例化、攔截
 */
import axios from "axios";
import { getToken } from "../utils/auth";
import store from "../store/index";

/**
 * 創建並實例化
 */
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000,
});

/**
 * request 請求攔截
 */
http.interceptors.request.use(
  (config) => {
    // 獲取到token值
    if (store.getters.token) {
      // 每個請求的請求頭，攜帶token [Authorization]自定義Key
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log("http.js request error:", error);
    return Promise.reject(error);
  }
);

/**
 * response 響應攔截
 */
http.interceptors.response.use(
  // response => response,
  // 預留後臺返回錯誤code對應處理邏輯
  (response) => {
    const res = response.data;
    if (res.code !== 20000) {
      console.error(res.message);
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 5000 || res.code === 50012 || res.code === 50014) {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      }
      return Promise.reject(res.message || "error");
    } else {
      return res;
    }
  },

  (error) => {
    console.log("http.js response error:", error);
    return Promise.reject(error);
  }
);

export default http;
```

```js
/* src/api/.js 接口封装 */
export function getTitle() {
  return http({
    url: "/titles",
    method: "get",
  });
}

/**
 * 該封裝僅用於分頁
 * @param {String} params url帶參
 */
export function getTableData(params) {
  return http({
    url: "/order/list",
    method: "get",
    params,
  });
}

/**
 * 用户登入
 * @param {Object} data 用户名密码
 */
export function login(data) {
  return http({
    url: "/user/login",
    method: "post",
    data,
  });
}
```

```js
/* demo.js 具体使用 */
import { getTitle } from "@/api/title";
export default {
  methods: {
    // 异步 获取所有描述,存入 LS中
    async getTitleData() {
      try {
        const res = await getTitle();
        console.log("获取Title:", res.data);
        localStorage.setItem("titleData", JSON.stringify(res.data));
      } catch (error) {
        console.log(error);
      }
    },
  },
};
```

---

## 基於 Vue 封裝 v2.0

```js
/* src/api/http.js */
/**
 * axios HTTP庫
 * 創建，實例化 ，攔截及共同邏輯處理
 */
import axios from "axios";

const http = axios.create({
  baseURL: "https://api.github.com", // 暫時拿來測試
  // baseURL: 'http://mockjs.com/api', // 接口基本url
  timeout: 5000,
});

// 若需修改默認屬性，則寫在此處，如：token爲例
// http.defaults.headers.common['Authorization'] = TOKEN;

/**
 * request 請求攔截
 */
http.interceptors.request.use(
  (config) => {
    // 請求前的邏輯處理，如獲取到token,將config.headers設置token
    return config;
  },
  (error) => {
    console.log("axios request error:", error);
    Promise.reject(error);
  }
);

/**
 * response 響應攔截
 */
http.interceptors.response.use(
  (response) => response,
  // 根據返回的code不同，進行對應處理(通常是出現權限問題)
  (error) => {
    console.log("axios response error:", error);
    return Promise.reject(error);
  }
);

export default http; // 導出
```

### 以 github 爲例，使用 http.js

```js
/* src/api/github.js */
/**
 * 用於測試的github請求封裝
 */
import http from "./http";

export function getGithubData() {
  return http({
    url: "/repos/Lokavit/Sutra/contents/Publish",
    method: "get",
  });
}
```

```html
<!-- src/views/Home.vue -->
<template>
  <div class="home"></div>
</template>

<script>
  import { getGithubData } from "../api/github.js";
  export default {
    name: "home",
    created() {
      this.getData();
    },
    methods: {
      getData() {
        // 調用api/github.js中封裝的獲取數據函數
        getGithubData().then((res) => {
          console.log("RES:", res.data);
        });
      },
    },
  };
</script>
```

## 基於 Vue 封裝 v1.0

```js
/* src/main.js */
import axios from "axios"; // 引入axios
Vue.prototype.$axios = axios; // 将axios改写为Vue的原型属性
// 在某页面请求数据时：
this.$axios.get(url);
```

## 基於 Vue 封裝 v1.1

```js
/* src/service/api.js */
import Vue from 'vue';
import axios from 'axios';
// 默认请求的URL 自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
axios.defaults.baseURL = 'https://api.github.com';
// 覆写库的超时默认值
axios.defaults.timeout = 10000;
Vue.prototype.$http = axios;
export default axios;

/* src/main.js */
import './service/api.js';

/* src/views/ShowGit.vue 读取github上的name显示在页面 */
<template>
  <section>
    <h1> This is ShowGit Page!</h1>
    <p>Name:{{ showData.name }}</p>
  </section>
</template>

<script>
export default {
  name: "ShowGit",
  data() {
    return {
      showData: []
    };
  },
  mounted() {
    console.log("实例挂载DOM完成");
    this.getData();
  },
  methods: {
    async getData() {
      let url = "/users/Lokavit"; // 因api.js封装，此处直接拼api后面的地址即可。
      const res = await this.$http.get(url);
      console.log("RES:", res.data);
      this.showData = res.data;
    }
  }
};
</script>
```

# Example

## Todo List

```HTML
<!-- TodoItem.vuw -->
<template>
 <!-- 每个todo状态class与todo状态值绑定 如true已完成的todo文字加个横线 也就是说,todo.completed的值,决定以下class是否显示-->
  <section v-bind:class="{'is-complete':todo.completed}">
    <p>
      <input type="checkbox" v-on:change="markComplete"/>
      {{ todo.title }}
      <!-- 根据id 删除   -->
      <button @click="$emit('del-todo',todo.id)">X</button>
      </p>
  </section>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ["todo"],
  methods: {
    markComplete(){
      console.log("v-on:change='markComplete'");
      // completed 的 true false 转换
      this.todo.completed = !this.tod.completed;
    }
  }
}
</script>

<style scoped>
/* 单个todo的状态 */
 .is-complete {
   text-decoration: line-through;
 }
</style>


<!-- Todos.vue -->
<template>
  <section>
    <div v-bind:key="todo.id" v-for="todo in todos">
      <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo',todo.id)"></TodoItem>
    </div>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  name: "Todos",
  components: { TodoItem },
  props: ["todos"]
};
</script>


<!-- AddTodo.vue -->
<template>
  <section>
    <form @submit="addTodo">
      <input type='text' v-model="title" name="title" placeholder="请输入....."/>
      <input type="submit" value="Submit"/>
    </form>
  </section>
</template>

<script>
// import uuid from 'uuid';
export default {
  name: 'AddTodo',
  data(){
    return{
      title: '',
    };
  },
  methods: {
    addTodo(e){
      e.preventDefault();
      const newTodo = {
        // npm i uuid 插件, 引入uuid
        // id: uuid.v4(),
        title:this.title,
        completed: false,
      }
      // send up to parent
      this.$emit('add-todo',newTodo);
      // 最后把title 重置为''
      this.title ='';
    }
  }
}
</script>


<!-- App.vue -->
<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"></Todos>
  </div>
</template>

<script>
import axios from "axios";
import Todos from './components/Todos.vue';
import AddTodo from './components/AddTodo.vue';

export default {
  name: "app",
  components: {Todos,AddTodo},
  data() {
    return {
      todos: []
    };
  },
  methods: {
    // 删除一个todo
    deleteTodo(id){
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.todos =this.todos.filter(todo => todo.id !== id))
      .catch(err => console.log(err));
      // 过滤掉非当前选中id
      // this.todos =this.todos.filter(todo => todo.id !== id);
    },
    // 添加一个todo
    addTodo(newTodo){
      const { title , completed } = newTodo;

      axios.post('https://jsonplaceholder.typicode.com/todos',{title,completed})
      .then(res => this.todos = [...this.todos,res.data])
      .catch(err => console.log(err));
      // this.todos = [...this.todos,newTodo];
    }
  },
  created() {
    let url = 'https://jsonplaceholder.typicode.com/todos?_limit=5';
    axios.get(url)
    .then(res => this.todos =res.data)
    .catch(err =>console.log(err));
  }
};
</script>
```

## 组件封装

### Table 表格

- TableHeader 表头 [checkbox|]

### checkbox 选择框

```html
<span class="pos_relative">
  <input type="checkbox" />
</span>
```

```css
/* 相对位置 */
.pos_relative {
  position: relative;
}
/* Input checkbox 样式 */
input[type="checkbox"] {
  -webkit-appearance: none;
  vertical-align: middle;
  background: #fff;
  border: #999 solid 1px;
  border-radius: 2px;
  min-height: 12px;
  min-width: 12px;
  cursor: pointer;
  outline: transparent;
  margin-left: 2px;
  margin-right: 2px;
  padding: 0;
}

input[type="checkbox"]:checked {
  background: #7994ff;
}

input[type="checkbox"]:checked::after {
  content: "";
  top: 4px;
  left: 4px;
  position: absolute;
  background: transparent;
  border: #fff solid 1px;
  border-top: none;
  border-right: none;
  height: 5px;
  width: 8px;
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
input[type="checkbox"]:checked::after:focus {
  border: 1px solid #5a7dff;
}
```

## Tabs 封装

- BaseTabPane:每个 tabs 对应显示的组件
- BaseTabs:tabs 组件，tabs-nav 使用 ul-li 来做
- 使用$parent 与 $children 对其做父子关联

```html
<!-- BaseTabs.vue -->
<template>
  <div role="tabs">
    <ul class="tabs-nav">
      <li
        v-for="(item,index) in tabsTab"
        @click="tabClick(item)"
        :class="{'active':active==item.name}"
      >
        {{ item.label }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BaseTabs",
    props: {
      value: {
        type: String,
        default: "",
      },
      onChange: {
        type: Function,
        default: function () {},
      },
    },
    data() {
      return {
        tabsTab: this.$children,
        active: this.value, // 当前显示的
      };
    },
    methods: {
      tabClick(item) {
        this.active = item.name;
        this.$emit("input", item.name); // v-model双向绑定
        this.onChange ? this.onChange(item.name) : "";
      },
    },
  };
</script>
```

```html
<!-- BaseTabPane.vue -->
<template>
  <div
    class="tab-pane"
    :class="{'active':name==$parent.active}"
    v-show="name==$parent.active"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BaseTabPane",
    props: {
      label: {
        type: String,
        default: "",
      },
      name: {
        type: String,
        default: "",
      },
    },
  };
</script>
```

```html
<!-- 在其他组件中使用  -->
<BaseTabs v-model="activeName" :onChange="change">
  <template v-for="(item,index) in tabs">
    <BaseTabPane :label="item.label" :name="item.name" :key="item.name">
      <template v-for="(component,key,index) in $options.components">
        <component
          v-if="component.name === item.name"
          :is="component.name"
          :key="key"
          class="box-show__inset"
        ></component>
      </template>
    </BaseTabPane>
  </template>
</BaseTabs>
<script>
  export default {
    data() {
      return {
        activeName: "TableContent", // 当前激活项
        tabs: [
          {
            label: "内容",
            name: "TableContent",
          },
          {
            label: "附件",
            name: "FileTable",
          },
        ],
      };
    },
  };
</script>
```

```css
/* tabs 签行 ul li */
.tabs-nav li {
  display: inline-block;
  padding: 0 15px;
  cursor: pointer;
  text-align: center;
}

.tabs-nav li:hover {
  color: #47719d;
}

.tabs-nav .active {
  color: #2d8cf0;
}

.tab-pane .active {
  display: block;
}
```

### BaseInput

- onfocus -> 键盘输入 -> onkeydown -> onkeypress -> onkeyup -> oninput -> 失去焦点 -> onchange -> onblur
- v-model 其实是一个语法糖， 它向子组件传递一个 value 属性，并接收一个 input 事件
- 在 props 里定一个 value 属性,并且在合适的时候触发 this.\$emit('input', value)

```html
<!-- BaseInput.vue -->
<template>
  <input
    ref="input"
    :type="type"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
  export default {
    props: {
      type: { type: String, default: "text" },
      value: { type: String, default: "" },
    },
    data() {
      return {
        currentValue: this.value,
      };
    },
    watch: {
      value(newVal, oldVal) {
        this.currentValue = newVal;
        console.log("CurrentValue:", newVal);
      },
    },
    methods: {
      //
      handleInput(e) {
        const value = e.target.value;
        this.currentValue = value;
        this.$emit("input", value);
        console.log("handleInput:", e.target.value);
      },
      // 失去焦点时触发
      handleBlur(event) {
        console.log("handleBlur".event.target.value);
      },
    },
  };
</script>
```

```html
<!-- 使用 -->
<BaseInput v-model="属性" :placeholder="请输入" />
<BaseInput v-model="searchForm[key]" :placeholder="`请输入${item.value}`" />
```

### Base 基础组件

- 本项目中使用较多的组件，作为 Base 组件形式，全局注册。
- 在 base 文件夹下，以 Base 开头的组件，被全局注册，便于随时使用。

```js
/* src/components/base/base.js */
/**
 * 基础组件全局注册
 */
import Vue from "vue";
import upperFirst from "lodash/upperFirst"; // 首字母大写
import camelCase from "lodash/camelCase"; // 字符串转驼峰

const requireComponent = require.context(
  ".", // 基础组件目录的相对路径
  true, // 是否查询其子目录
  /Base[\w]+\.(vue|js)$/ // 匹配基础组件文件名的正则表达式
);

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取与目录深度无关的文件名 移除文件名开头的 "./_" 移除文件名末尾的扩展名 ".vue .js"
      fileName
        .split("/")
        .pop()
        .replace(/^\.\/_/, "")
        .replace(/\.\w+$/, "")
    )
  );
  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig);
});
```

```js
/* main.js */
import "./components/base/base"; // 注册全局基础组件
```

## 其它组件封装

### SVG

- "svg-sprite-loader": "4.1.3",

```html
<!-- SvgIcon.vue -->
<template>
  <svg :width="width" :height="height" :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconId"></use>
  </svg>
</template>

<script>
  export default {
    name: "Icon",
    props: {
      iconClass: {
        type: String, // 圖標類
        default: "",
      },
      className: {
        type: String, // 類名
        default: "",
      },
      iconName: {
        type: String,
        default: "box",
      },
      width: {
        type: [Number, String],
        default: 12,
      },
      height: {
        type: [Number, String],
        default: 12,
      },
    },
    computed: {
      iconId() {
        return `#icon-${this.iconName}`;
      },
      svgClass() {
        if (this.className) {
          return "svg-icon " + this.className;
        } else {
          return "svg-icon";
        }
      },
    },
  };
</script>

<style scoped>
  .svg-icon {
    /* width: 1em;
  height: 1em; */
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
```

```js
/* utils/icon.js */
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue"; // svg组件

// register globally
Vue.component("svg-icon", SvgIcon);

const req = require.context("@/assets/icons", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
```

```js
/* main.js */
import "./utils/icon"; // icon
```

## 国际化

```js
/* src/lang/en.js */
export default { test:"test" } // 在此处定义所有字段的英文名

/* src/lang/zh.js */
export default { test:"测试" } // 在此处定义所有字段的中文名

/* src/lang/index.js */
/**
 * 国际化主文件
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
/** 自定义的多语言文件 */
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  }
}
/**
 * 获取当前设置的语言项
 */
export function getLanguage() {
  const cookieLanguage = Cookies.get('language');
  if (cookieLanguage) return cookieLanguage

  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}
// 初始化 vue-i18n 国际化 插件
const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})
export default i18n; // 导出该主文件

/* src/main.js */
import Vue from 'vue' // 引入 vue
import App from './App' // 引入 App.vue
import i18n from './lang/index'; // 国际化
Vue.config.productionTip = false
Vue.use(, {
  i18n: (key, value) => i18n.t(key, value)
})
new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})

/* 在App.vue 的created()中测试 */
console.log('测试多语言',this.$t('test'));
```

## Axios

```js
/* src/api/http.js axios 封装 */
```

## 模擬登入

Login.vue 登入按鈕函數 handleLogin()

```html
<!-- src/views/Login.vue -->
<template>
  <section>
    <h1>LOGIN PAGE!</h1>
    <el-form ref="loginForm" :model="loginForm">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" name="username">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="text" name="password">
        </el-input>
      </el-form-item>
      <el-button @click="handleLogin">LOGIN</el-button>
    </el-form>
  </section>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: "",
          password: "",
        },
      };
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch("LoginUser", this.loginForm)
              .then(() => {
                console.log("Login!!!!!");
                this.$router.push({
                  path: "/about",
                });
              })
              .catch(() => {
                console.log("CATCH");
              });
          } else {
            console.log("ERROR!!!!!");
          }
        });
      },
    },
  };
</script>
```

內中使用了 this.\$store.dispatch('LoginUser') 異步提交
以上爲 store/user.js 中的狀態管理部分，actions:{}中定義的 LoginUser() 異步提交函數，

```js
/* src/store/user.js */
/**
 * 用戶狀態管理
 */
import { loginUserAPI } from "../api/login";

const user = {
  state: {},

  actions: {
    // 異步提交登入函數
    LoginUser({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        // api/login.js
        loginUserAPI(username, userInfo.password)
          .then((res) => {
            console.log("user.js LoginUser loginUserAPI:", res);
            resolve(); // 不可缺少
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;

/* src/store.js */
import Vue from "vue";
import Vuex from "vuex";
import user from "./store/user"; // 引入user模塊的狀態管理

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
```

其內中使用了 loginUserAPI()函數，該函數與 api/login.js 中定義

```js
/* src/api/login.js */
import request from "./request";
/**
 * login封裝
 */

export function loginUserAPI(username, password) {
  const data = {
    username,
    password,
  };
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
```

其內中 loginUserAPI()函數，返回封裝的接口，該封裝調用 utils/request.js
該 js 爲 axios 的創建及初始化 以及請求攔截，響應攔截等，並且在內中設置請求頭的 token

```js
/* src/api/request.js */
/**
 * axios創建，實例化，攔截
 */
import axios from "axios";
const service = axios.create({
  baseURL: "http://mockjs.com/api", // 接口基本url
  timeout: 5000, // 請求限時
});
// 請求攔截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("ERROR:", error);
  }
);
// 響應攔截
service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("ERROR:", error);
  }
);
export default service;
```

mock/mock.js 數據模擬 ，登入相關，調用 mock/login.js 登入模擬
其 js 中，默認導出 loginUserAPI 函數

```js
/* src/mock/login.js */
/**
 * login 數據模擬
 */
const userMap = {
  admin: {},
  editor: {},
};
export default {
  // 與api/login.js 的登入請求接口同名
  loginUserAPI: (config) => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
};

/* src/mock/mock.js */
/**
 * mock 數據模樣 定義接口返回的數據
 */
import Mock from "mockjs";
import loginAPI from "./login"; // 引入模擬登入api

const Random = Mock.Random; // 獲取random對象，隨機生成各種數據
const domain = "http://mockjs.com/api"; // 定義默認域名，可隨意寫
const code = 200; // 返回狀態碼

// 設置全局延時
Mock.setup({
  timeout: "300-600",
});

// 定義模擬登入請求  調用login.js的 模擬登入接口函數
Mock.mock(`${domain}/login`, "post", loginAPI.loginUserAPI);
```

最後，在 src/main.js 中引入 mock/index.js

```js
/* src/main.js */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mock from "./mock/mock";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

## 把 token 加上

在 mock/login.js 模擬數據中加上 token

```js
/* src/mock/login.js */
/**
 * login 數據模擬
 */
import { paramsToObj } from "../utils/index";

const userMap = {
  admin: {
    token: "this is admin token",
  },
  satya: {
    token: "this is satya token",
  },
};

export default {
  // 模擬獲取角色信息接口，該接口與api/login.js同名
  getUserInfo: (config) => {
    // 調用參數轉對象的工具函數，提取token
    const { token } = paramsToObj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return false;
    }
  },
};
```

在 src/mock/mock.js 中，添加獲取角色信息函數的請求返回模擬數據

```js
/* src/mock/mock.js */
// 定義模擬獲取角色信息請求，調用login.js的 模擬獲取角色信息接口函數
Mock.mock(`${domain}/user/info`, "get", loginAPI.getUserInfo);
```

在 src/api/login.js 添加 getUserInfo 獲取角色信息接口封裝

```js
/**
 * 獲取角色信息
 * @param {String} token 根據token獲取角色信息
 */
export function getUserInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: {
      token,
    },
  });
}
```

使用 js-cookie 插件，實現 token 緩存 「考慮是否可用 session 緩存?」

```js
/* src/utils/auth.js */
/**
 * token緩存
 */
import Cookies from "js-cookie";

const TokenKey = "Token-Key"; // 存儲token的自定義name

/**
 * 獲取緩存的token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * 設置緩存token
 * @param {String} token 接口返回的token值
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

/**
 * 移除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
```

在 src/store/user.js 的 state:{}中定義 token:getToken()
在 mutations:{}中 SET_TOKEN:(state,token) => {state.token = token}
actions:{}的 LoginUser()函數中,請求成功之後，將 token 存儲起來
commit('SET_TOKEN',res.data.token)
setToken(res.data.token) // 調用 auth.js 中的函數
actions:{}中提交之後，會改變 mutations:{}中的 token

```js
/* src/store/modules/user.js */
/**
 * 用戶狀態管理
 */
import { loginUserAPI, getUserInfo } from "../api/login";
import * as Auth from "../utils/auth"; // 引入token緩存文件

const user = {
  state: {
    token: Auth.getToken(), // 調用獲取token
  },
  mutations: {
    // 唯一改變token的地方
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {
    // 登入
    LoginUser({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        // api/login.js
        loginUserAPI(username, userInfo.password)
          .then((res) => {
            console.log("user.js LoginUser loginUserAPI:", res.data);
            console.log("RES DATA TOKEN:", res.data);
            commit("SET_TOKEN", res.data.token); //提交到store改變token
            Auth.setToken(res.data.token); // 設置token緩存
            resolve(); // 不可缺少
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 獲取角色信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then((res) => {
            if (!res.data) {
              reject("Please Login!");
            }
            resolve(); //
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
```

在 src/store/getters.js 中過濾獲取 token
const getters = { token:state => state.user.token }

```js
/* src/store/getters.js */
/**
 * 對狀態數據進行過濾獲取
 */
const getters = {
  token: (state) => state.user.token,
};
export default getters;

/* src/store/store.js */
import getters from "./getters"; // 狀態數據的統一過濾獲取
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  getters,
});
```

## 模擬登出

在放置登出按鈕的.vue 文件中，如 about.vue，該按鈕函數
內中使用 this.\$store.dispatch('Logout')

```html
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="logout">LOGOUT</el-button>
  </div>
</template>
<script>
  export default {
    name: "About",
    methods: {
      logout() {
        // 登出 調用
        this.$store.dispatch("Logout").then(() => {
          location.reload();
          console.log("登出！!!!!!");
          // 跳轉到login頁面
          this.$router.push({
            path: "/login",
          });
        });
      },
    },
  };
</script>
```

在 src/api/login.js 中封裝 logout()登出函數

```js
/* src/api/login.js */
/**
 * 登出接口封裝
 */
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}
```

其函數在 store/modules/user.js 中的 actions:{}中定義

```js
/* src/api/login.js */
/**
 * 用戶狀態管理
 */
import { loginUserAPI, getUserInfo, logout } from "../api/login";
import * as Auth from "../utils/auth"; // 引入token緩存文件

const user = {
  state: {
    token: Auth.getToken(), // 調用獲取token
  },
  mutations: {
    // 唯一改變token的地方
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 調用api/login.js中的登出函數
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", ""); // 清除狀態管理中的token
            Auth.removeToken(); // 移除緩存中的token
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
```

模擬登出的接口返回

```js
/* mock/login.js */
// 模擬登出
logout: () => "succress";

/* mock/index.js */
// 定義模擬登出請求，調用login.js的 模擬登出接口函數
Mock.mock(`${domain}/logout`, "post", loginAPI.logout);
```

封裝 axios ，如 request.js
創建並實例化 axios，已經請求攔截，響應攔截，及其他邏輯處理
創建 auth.js 對 token 做緩存處理,使用插件[js-cookie]

api 中按照模塊,封裝模塊中所需請求。如 api/login.js
內中引入 request.js，封裝了登入[loginUser]、登出、獲取用戶信息三個函數

若需要數據模擬，則在 mock 中，按照模塊，模擬接口返回的數據,最後在 mock.js 中統一對外 mock
如 mock/login.js (名字與 api 的一致，便於維護) 內中創建數據模板，
導出與 api/login.js 同名登入[loginUser]、登出、獲取用戶信息函數，便於維護。

使用 vuex 狀態管理，依然按照模塊，如 store/user.js,
導入 api/login.js 以及 utils/auth.js
user.js 中 state 負責需要管理的屬性[如:token]、mutations 唯一可改變 token 的地方、
actions 將需改變的 token 異步提交至 mutation,做最終實際改變
內中定義 登入[Login]、登出、獲取用戶信息三個函數，其每個函數中，使用 Promise 方式
其內中調用 api/login.js 封裝好的請求接口函數，做[resolve]與[reject]的判斷
.then 中邏輯處理[如:commit 到 mutations 改變 token 值]及[setToken(res.data.token)]
最後記得 [resolve()]
.catch 中處理錯誤[reject]
在 src/store/getters.js 中統一進行數據過濾獲取
在 src/store/index.js 中，將所有模塊及 getter.js 導入,寫在 new Vuex 中

在 src/views 下，按照模塊創建文件夾及文件，如 login/index.vue
內中創建一個登入窗口，包含輸入用戶名密碼，以及一個登入按鈕。
在該函數的實現中，通過異步方式，調用 store/login.js 中的[Login]
如：[this.$store.dispatch('Login',this.loginForm)]
.then 中做一些邏輯處理 .catch 中做錯錯誤處理

## mockjs

```bash
# 數據模擬，http請求庫
$ npm i mockjs axios --save
```

```js
// rurl(可選) 表示需攔截的URL(字符串or正則)
// rtype(可選) 表示需攔截的Ajax請求類型(GET POST PUH DELETE)
// template(可選) 表示數據模板,可以是對象or字符串
// function(options)(可選) 表示用於生成響應數據的函數。
// options 指向本次請求的Ajax選項集
Mock.mock( rurl?, rtype?, template|function( options ) )

/* 模板生成語法 */
// name(屬性名) rule(生成規則) value(屬性值)
'name|rule': value //屬性與生成規則用 | ，生成規則可選
/* 生成規則的7種格式 */
'name|min-max': value
'name|count': value
'name|min-max.dmin-dmax': value
'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value

```

```js
/* 模板生成語法示例 */
// 將屬性值 A，重複3次
Mock.mock({"string|3":"A"}) // 結果爲： {"string":"AAA"}
// 生成一個大於等於1，小於等於100 的整數，屬性值 100只是用來確認類型
Mock.mock({"num|1-100"}) // 結果爲： {"number":66}

// 設置全局延時，建議使用
Mock.setup({
  timeout:'300-600'
})
```

```js
/* Mock.Random 工具類 */

// Basic  方法  含义
Random.boolean( min?, max?, current? )  返回一个随机的布尔值。
Random.natural( min?, max? )    返回一个随机的自然数（大于等于 0 的整数）。
Random.integer( min?, max? )    返回一个随机的整数。
Random.float( min?, max?, dmin?, dmax? )    返回一个随机的浮点数。
Random.character( pool? )   返回一个随机字符
Random.string( pool?, min?, max? )  返回一个随机字符串。

// Date  方法  含义
Random.date(format)     返回一个随机的日期字符串。
Random.time( format? )  返回一个随机的时间字符串。
Random.datetime( format? )  返回一个随机的日期和时间字符串。
Random.now( unit?, format? )    返回当前的日期和时间字符串。

// Image  方法  含义
Random.image( size?, background?, foreground?, format?, text? )     生成一个随机的图片地址。
Random.dataImage( size?, text? )    生成一段随机的 Base64 图片编码。

// Text  方法  含义
Random.paragraph( min?, max? )  随机生成一段文本。
Random.cparagraph( min?, max? )     随机生成一段中文文本。
Random.sentence( min?, max? )   随机生成一个句子，第一个单词的首字母大写。
Random.csentence( min?, max? )  随机生成一段中文文本。
Random.word( min?, max? )   随机生成一个单词。
Random.cword( pool?, min?, max? )   随机生成一个汉字。
Random.title( min?, max? )  随机生成一句标题，其中每个单词的首字母大写。
Random.ctitle( min?, max? )     随机生成一句中文标题。

// Name  方法  含义
Random.first()  随机生成一个常见的英文名。
Random.last()   随机生成一个常见的英文姓。
Random.name( middle? )  随机生成一个常见的英文姓名。
Random.cfirst()     随机生成一个常见的中文名。
Random.clast()  随机生成一个常见的中文姓。
Random.cname()  随机生成一个常见的中文姓名。

// Web  方法  含义
Random.url( protocol?, host? )  随机生成一个 URL。
Random.protocol()   随机生成一个 URL 协议。
Random.domain()     随机生成一个域名。
Random.tld()    随机生成一个顶级域名（Top Level Domain）。
Random.email( domain? )     随机生成一个邮件地址。
Random.ip()     随机生成一个 IP 地址。

// Address  方法  含义
Random.region()     随机生成一个（中国）大区。
Random.province()   随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
Random.city( prefix? )  随机生成一个（中国）市。
Random.zip()    随机生成一个邮政编码（六位数字）。

```

## mock 之 vue

```js
/* src/mock/mock.js */
/**
 * mock 數據模樣 定義接口返回的數據
 */
import Mock from "mockjs";

const Random = Mock.Random; // 獲取random對象，隨機生成各種數據
const domain = "http://mockjs.com/api"; // 定義默認域名，可隨意寫
const code = 200; // 返回狀態碼

// 隨機生成文章數據
const postData = (req) => {
  console.log("Req:", req); // 請求體，用於獲取參數

  let posts = []; // 用於存放文章數據的數組

  for (let i = 0; i < 5; i++) {
    let post = {
      title: Random.csentence(5, 10), // 隨機生成長度爲5-10的標題
      icon: Random.dataImage("64x64", "文章icon"), // 隨機生成大小爲64的圖片鏈接
      author: Random.cname(), // 隨機生成作者
      date: Random.date() + " " + Random.time(), // 隨機生成年月日+時間
    };
    posts.push(post);
  }
  // 返回狀態碼及文章數據posts
  return {
    code,
    posts,
  };
};

// 定義請求鏈接，類型，返回數據
Mock.mock(`${domain}/posts`, "get", postData);
```

```js
/* src/main.js */
import Mock from "./mock/mock";
import axios from "axios";
axios.defaults.baseURL = "http://mockjs.com/api"; // 設置默認請求url
Vue.prototype.$http = axios;
```

```html
<!-- src/viws/home.vue -->
<template>
  <div class="home">
    <button @click="getMockData">Click!</button>
    <ul>
      <li v-for="(item,index) in posts" :key="item.index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        posts: {},
      };
    },
    methods: {
      getMockData() {
        this.$http.get("/posts").then((res) => {
          console.log("RES:", res);
          this.posts = res.data.posts;
          console.log("POSTS:", this.posts);
        });
      },
    },
  };
</script>
```

瀏覽器點擊按鈕之後，控制臺輸出的結果

```json
/* Req請求的輸出結果 */
{url: "http://mockjs.com/api/posts", type: "GET", body: null}

/* RES響應的輸出結果 */
data:{ // 響應體
  code:200 // ?模擬的狀態碼？
  posts:Array(5) // 五條數據
}
config:{} // 基於mockjs的響應配置部分
headers:{} // 請求頭[內中原本無內容]
status:200 // 狀態碼
statusText: "OK" // 狀態文本
```

# Electron

## 装载

```Bash
$ npm install electron -g # 全局装载
$ electron -v # 查看版本
```

### Electron-forge 工具包

```Bash
$ npm install electron-forge -g
electron-forge init my-new-project # --template=vue 无效
cd my-new-project
electron-forge start
```

## Electron TypeScript

### vue-cli-plugin-electron-builder

```Bash
# 初始化一个vue/cli3.x的手动配置项目
$ vue add electron-builder # 在vue/cli3.x项目中加入该插件
# 选择 4.0.0 ，等待electron所需win包下载完毕
npm run electron:serve
npm run electron:build # 打包
# 项目名/dist_electron/win-unpacked/项目名.exe
```

### 项目结构

```Bash
src
  main # 主进程 放一些主文件
    main.js # 也就是生成项目时的 background.js
  renderer # 渲染进程 放vue相关，也就是原src下的文件
  web # web vue？？？
  ------？？？？----
  app # app版 vue
  client # 客户端版 vue
  common # 多端通用的一些文件
  communication # socket版
```

## 使用

### Menu 主菜单

- 程式窗口顶部添加菜单栏
- 创建原生应用菜单和上下文菜单。
  > 当在 MacOS、Windows、Linux 中使用 menu 设置程序菜单时，会设置在各个程序窗体的顶层。在 windows 和 Linux 系统中，使用 null 参数将会移除菜单栏, 但在 MacOS 系统中则不会有任何效果；
- 注意：这个 API 调用要在程序的 ready 事件模块之后。

```JavaScript
/* ev3x/src/background.js */
// 该引入组件代码中加上 Menu
import { app, protocol, BrowserWindow, Menu } from 'electron'

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // doing……
  }
  createWindow()
})
// 在 ready事件模块之后，创建主菜单 ,以文件菜单为例
const menu =Menu.buildFromTemplate([
  {
    label: 'File',
    submenu:[{
      label:'New File'
    },{
      label:'Open File'
    },{
      label: 'Save File'
    }, {
      label: 'Close File'
    },{
      label: 'Quit'
    }]
  }
])
Menu.setApplicationMenu(menu); // 参数为以上创建的菜单模板
// 运行electron的打包命令，启动 ev3x/dist_electron/win-unpacked/ev3x.exe ，可见效果。
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>树形数据结构获取最深层数</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <textarea v-model="stringData" cols="100" rows="40"> </textarea>
      <button @click="getData()" style="padding: 10px;">
        获取
      </button>
      <div style="text-align: center;">
        最大层数：{{maxFloor}}
      </div>
    </div>
  </body>
  <script>
    var app = new Vue({
      el: "#app",
      data: {
        stringData: `[
                {
                    "label": "广东省",
                    "children": [
                        {
                            "label": "梅州市",
                            "children": [
                                {
                                    "label": "兴宁市",
                                    "children": [
                                        {
                                            "label": "黄槐镇",
                                            "children": [
                                                {
                                                    "label": "西埔村",
                                                    "children": [
                                                        {
                                                            "label": "中心街",
                                                            "children": []
                                                        }
                                                    ]
                                                },
                                                {
                                                    "label": "宝龙村",
                                                    "children": []
                                                },
                                                {
                                                    "label": "双下村",
                                                    "children": []
                                                },
                                                {
                                                    "label": "双头村",
                                                    "children": []
                                                },
                                                {
                                                    "label": "槐东村",
                                                    "children": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {"label": "一级2", "children": []},
                {"label": "一级3", "children": []}
            ]`,
        maxFloor: 0,
      },
      methods: {
        getData() {
          let treeData = JSON.parse(this.stringData);
          console.log(treeData, "treeData");
          this.maxFloor = this.getMaxFloor(treeData);
        },
        getMaxFloor(treeData) {
          let floor = 0;
          let v = this;
          let max = 0;

          function each(data, floor) {
            data.forEach((e) => {
              e.floor = floor;
              if (floor > max) {
                max = floor;
              }
              if (e.children.length > 0) {
                each(e.children, floor + 1);
              }
            });
          }
          each(treeData, 1);
          return max;
        },
      },
      mounted: function () {},
    });
  </script>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>树形数据结构获取最深层数</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>

  <body></body>
  <script>
    const list = [
      {
        id: 1,
        name: "超级管理",
        parent_id: 0,
      },
      {
        id: 2,
        name: "用户管理",
        parent_id: 1,
      },
      {
        id: 3,
        name: "部门管理",
        parent_id: 1,
      },
      {
        id: 4,
        name: "日志管理",
        parent_id: 1,
      },
      {
        id: 5,
        name: "操作用户",
        parent_id: 2,
      },
      {
        id: 6,
        name: "查看用户",
        parent_id: 2,
      },
      {
        id: 7,
        name: "用户新增",
        parent_id: 5,
      },
      {
        id: 8,
        name: "用户删除",
        parent_id: 5,
      },
      {
        id: 9,
        name: "用户修改",
        parent_id: 5,
      },
      {
        id: 10,
        name: "操控部门",
        parent_id: 3,
      },
      {
        id: 11,
        name: "查看部门",
        parent_id: 3,
      },
      {
        id: 12,
        name: "部门新增",
        parent_id: 10,
      },
      {
        id: 13,
        name: "部门删除",
        parent_id: 10,
      },
      {
        id: 14,
        name: "部门修改",
        parent_id: 10,
      },
      {
        id: 15,
        name: "日志查看",
        parent_id: 4,
      },
      {
        id: 16,
        name: "日志导出",
        parent_id: 4,
      },
    ];

    console.log(getTrees(list, 0));

    /**
     * 树状的算法
     * @params list     代转化数组
     * @params parentId 起始节点
     * use : getTrees(list,0)
     */
    function getTrees(list, parentId) {
      let items = {};
      // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
      for (let i = 0; i < list.length; i++) {
        let key = list[i].parent_id;
        if (items[key]) {
          items[key].push(list[i]);
        } else {
          items[key] = [];
          items[key].push(list[i]);
        }
      }
      return formatTree(items, parentId);
    }

    /**
     * 利用递归格式化每个节点
     */
    function formatTree(items, parentId) {
      let result = [];
      if (!items[parentId]) {
        return result;
      }
      for (let t of items[parentId]) {
        t.children = formatTree(items, t.id);
        result.push(t);
      }
      return result;
    }
  </script>
</html>
```
