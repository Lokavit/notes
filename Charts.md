# Charts

[GOJS](#GOJS)
[ECharts](#ECharts)

# GOJS

- 两个基本元素[node,link],点和线。可以组成一个Group
- 所有元素都在图层[Layer]上，并且可以对它们进行布局[Layout]

















```Bash
$ npm install gojs --save # 装载 2.0.0
```

在**main.js**中引入，并作为 Vue 的一个属性，便于全局使用

```JavaScript
/* main.js */
import gojs from 'gojs'
Vue.prototype.go = gojs;
```

### Learn

- Diagram(图表) 、Node(节点) 、 Panel(面板) 、Shape(预订义几何体) 、 TextBlock(文本框)
- Model(数据/模型)管理 node(节点)和 link(连线)

```HTML
<div id="goJsTest" class="go_div"></div>
<style scoped>
div {
    width: 400px;
    height: 400px;
    background-color: cadetblue;
}
</style>
```

```JavaScript
// 在mounted中调用gojs
mounted() {
    //构建gojs对象 创建图表
    const goMake = go.GraphObject.make;
    // 参数分别为： go的图表类 , 绑定画布<div>的id , 画布定义
    let myDiagram = goMake(go.Diagram,'goJsTest',{
        initialContentAlignment: go.Spot.Center, // 居中显示
        "undoManager.isEnabled":true  //启用Ctrl-Z撤消，Ctrl-Y重做
    });
    let myModel = goMake(go.Model);
    // 在数据模型中，每个节点都由一个JavaScript对象表示
    myModel.nodeDataArray = [
        {key:'数据 1 '},
        {key:'数据 2 '},
        {key:'数据 3 '}
    ];
    myDiagram.model = myModel;
}
// 页面可见 ABC 图表，支持以下操作：
// 鼠标拖拽平移视图，点击节点可拖动，以及常用键盘操作(ctrl C V Z Y 和delete)
```

TextBlocks(文本框)，Shapes(形状)和 Pictures(图像)是 GoJS 的原始构建块。TextBlocks 不能包含图像; 形状不能包含文本。如果希望节点显示某些文本，则必须使用 TextBlock。如果要绘制或填充某些几何图形，则必须使用“Shapes”。

```JavaScript
/* 创建Node节点 文本框 */
myDiagram.nodeTemplate =
    // 创建节点 // 创建文本框 // 把文本框的text和数据模型中当前数据的key绑定
    goMake(go.node, goMake(go.TextBlock, new go.Binding("text", "key")));
```

```JavaScript
/* 创建Node模板 */
myDiagram.nodeTemplate =
    // 创建节点 Node / Panel的第二个参数可以是Panel类型
    goMake(go.Node,"Vertical",{
    /* 设置节点属性 */
    locationSpot:go.Spot.Center
    },
    /* 添加绑定 */
    // 示例节点绑定将Node.location设置为Node.data.loc的值
    new go.Binding("location","loc"),
    /* 添加节点中包含的图形对象 */
    // 这个Shape将垂直位于TextBlock上方 // RoundedRectangle(圆角矩形)
    goMake(go.Shape,"RoundedRectangle",{
        /* 在这里设置Shape属性 */
    },
        // 示例Shape绑定将Shape.figure设置为Node.data.fig的值
        new go.Binding("figure","fig")),
    // 创建文本框 string参数可以是初始文本字符串
        goMake(go.TextBlock,"default text",{
        /* 在这里设置文本框的属性 */
        },
        // 示例TextBlock绑定将TextBlock.text设置为Node.data.key的值
        new go.Binding("text","key"))
    );
```

```JavaScript
/* 创建Node模板示例 */
  mounted() {
    //构建gojs对象 创建图表
    const goMake = go.GraphObject.make;
    let myDiagram = goMake(go.Diagram, "goJsTest", {
      initialContentAlignment: go.Spot.Center, // 居中显示
      "undoManager.isEnabled": true //启用Ctrl-Z撤消，Ctrl-Y重做
    });
    // 定义一个节点模板
    myDiagram.nodeTemplate =
      // 创建节点 Node / Panel的第二个参数可以是Panel类型
      // Vertical(垂直) Horizo​​ntal(水平)
      goMake(
        go.Node,
        // 这里选择(Horizo​​ntal)水平属性文字从左上角起,(Vertical)垂直属性文字在图片之下正中
        "Vertical",
        /* 设置节点属性 整个节点为浅蓝色背景 */

        { background: "#44ccff" },
        // 创建图像 通常具有明确的宽度和高度,有一个色块，用于在无图或部分透明情况下显示
        goMake(
          go.Picture,
          /* 图像区域及图像的属性 */
          { margin: 10, width: 50, height: 50, background: "cornflowerblue" },
          // Picture.source 绑定到数据模型
          new go.Binding("source")
        ),
        // 创建文本框 string参数可以是初始文本字符串
        goMake(
          go.TextBlock,
          "Default Text",
          /* 在这里设置文本框的属性 */
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          // 示例TextBlock绑定将TextBlock.text设置为Node.data.name的值
          new go.Binding("text", "name")
        )
      );
          // 定义一个正交路由的链接模板，没有箭头
    myDiagram.linkTemplate = goMake(
      go.Link,
      // Orthogonal(正交)，corner(角)
      { routing: go.Link.Orthogonal, corner: 5 },
      // 定义线
      goMake(go.Shape, { strokeWidth: 3, stroke: "#222" })
    );

    let model = goMake(go.Model);
    model.nodeDataArray = [
      { name: "叶神", source: require("../assets/ys.jpg") },
      { name: "花姐", source: require("../assets/hj.jpg") },
      { name: "盒盒", source: require("../assets/hh.jpg") },
      { name: "松松", source: require("../assets/ss.jpg") },
      {
        /* Empty node data */
      }
    ];
    myDiagram.model = model;
  },
```

### GraphLinksModel TreeModel

```JavaScript
/* 树状 数据模型 */
// let model = goMake(go.Model);
let model = goMake(go.TreeModel); // 带连线
model.nodeDataArray = [
    // “key”和“parent”属性名称是必需的，但您可以添加应用程序所需的任何数据属性
    {key: "1", name: "晋江专业知识交流群", source: require("../assets/01.png")},
    {key: "2", parent: "1", name: "叶神", source: require("../assets/ys.jpg") },
    {key: "3", parent: "1", name: "花姐", source: require("../assets/hj.jpg") },
    {key: "4", parent: "1", name: "盒盒", source: require("../assets/hh.jpg") },
    {key: "5", parent: "1", name: "松松", source: require("../assets/ss.jpg") },
    { /* Empty node data */ }
];
myDiagram.model = model;
```

### 布局

```JavaScript
const goMake = go.GraphObject.make;
let myDiagram = goMake(go.Diagram, "goJsTest", {
    initialContentAlignment: go.Spot.Center, // 居中显示
    "undoManager.isEnabled": true, //启用Ctrl-Z撤消，Ctrl-Y重做
    // 布局，若想从上至下，设置angle property to 90
    layout: goMake(go.TreeLayout, { angle: 90, layerSpacing: 35 })
});
```

### Link Templates 链接模板

```JavaScript
/* 写在定义Node模板之下 */
// 定义一个正交路由的链接模板，没有箭头
myDiagram.linkTemplate =
goMake(go.Link,
// Orthogonal(正交)，corner(角)
{routing:go.Link.Orthogonal,corner:5},
// 定义线
goMake(go.Shape,{strokeWidth:3,stroke:"#222"}));
```

### StoryPlot 故事情节


### DramaLine 剧情线

制作一个剧情线组件
StoryLine 故事线

### RoleRelationship 角色关系

```HTML
<!-- 创建一个vue组件，并使用 go -->
<template>
  <div class="goDemo">
    <div id="mygoChart" style="width:1000px; height:600px; background-color: #ECA;"></div>
  </div>
</template>

<script>
export default {
  name: "GOJS",
  // 在mounted中调用gojs
  mounted() {
    //构建gojs对象 创建图表
    const MAKE = go.GraphObject.make;
    // Diagram 、Node 、 Panel 、Shape 、 TextBlock
    this.myDiagram = MAKE(go.Diagram, "mygoChart", {

      initialContentAlignment: go.Spot.Center, // 居中显示

      "undoManager.isEnabled": true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      "toolManager.hoverDelay": 100, //tooltip提示显示延时
      "toolManager.toolTipDuration": 10000, //tooltip持续显示时间
      //isReadOnly:true,//只读
      "grid.visible": true, //显示网格
      allowMove: true, //允许拖动
      // allowDragOut:true,
      allowDelete: false,
      allowCopy: false,
      allowClipboard: false,
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
      layout: MAKE(go.TreeLayout, {
        angle: 0,
        layerSpacing: 35
      })
    });
    console.log(this.myDiagram);
    this.myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
      debugger;
      console.log(e.subject.part);
    });
    this.myDiagram.addDiagramListener("BackgroundSingleClicked", function(e) {
      debugger;
      console.log("Double-clicked at" + e.diagram.lastInput.documentPoint);
    });
    this.myDiagram.addDiagramListener("ClipboardPasted", function(e) {
      debugger;
      console.log("Pasted" + e.diagram.selection.count + "parts");
    });

    // 定义个简单的 Node 模板
    this.myDiagram.nodeTemplate =
      MAKE(go.Node,
      new go.Binding("location", "loc", go.Point.parse),
      MAKE(go.Shape, "RoundedRectangle", { fill: "#44CCFF",stroke: 'green',strokeWidth:2,angle:15 }),
      "Auto",//Vertical,Auto,Horizontal
        // { background: "#44CCFF" },  // 为整个Node背景设置为浅蓝色

        // MAKE(go.Picture,
        //   // Pictures 应该指定宽高.
        //   // 当没有图片时显示红色的背景
        //   // 或者当图片为透明的时候也是.
        //   { source:"../assets/img/01.png",margin: 10, width: 50, height: 50, background: "red" },
        //   // Picture.source参数值与模型数据中的"source"字段绑定
        //   new go.Binding("source")),
        // MAKE(go.TextBlock,
        //   "Default Text",  // 初始化默认文本
        //   // 文字周围的空隙, 大号字体, 白色笔画:
        //   { margin: 12, stroke: "white", font: "bold 16px sans-serif",
        //     width:75,
        //     wrap: go.TextBlock.WrapDesiredSize
        //   },
        //   // TextBlock.text参数值与模型数据中的"name"字段绑定
        //   new go.Binding("text", "name1")),
          MAKE(go.Panel, "Horizontal",{padding:5},
            MAKE(go.Panel, "Vertical",
              MAKE(go.Picture,
                { margin: 10, width: 50, height: 50, background: "red" },
                new go.Binding("source","img")
              )
            ),
            MAKE(go.Panel, "Vertical",
              MAKE(go.TextBlock, "Default Text", {margin: 12, stroke: "white", font: "bold 16px sans-serif",},new go.Binding("text", "name1")),
              MAKE(go.TextBlock, { stroke: "red" },{margin: 5},new go.Binding("text", "name2")),
              MAKE(go.TextBlock, { background: "lightblue" },{margin: 5,},new go.Binding("text", "name3")),
            ),
          ),
          {
            mouseEnter:function(e,node,prev){
              console.log('mouseEnter');
            },
            mouseLeave:function(e,node,prev){
              this.detailShow = false;
            },
          },
          {
            toolTip:MAKE(go.Adornment, "Spot",
              //{background:"transparent" },
              MAKE(go.Shape,"RoundedRectangle", {
                // fill: "blue" ,
                  height:30,
                  fill: MAKE(go.Brush, "Linear", { 0.0: "blue", 1.0: "red", start: go.Spot.Bottom, end: go.Spot.Top })
                }),
              MAKE(go.TextBlock,
              //{alignment:go.Spot.Top,alignmentFocus:go.Spot.Bottom,stroke:"red" },
              { margin: 4,stroke: "white" },new go.Binding("text", "name1"))
            )  // end of Adornment
          }
      );
      this.myDiagram.linkTemplate = MAKE(go.Link,
        //{ curve: go.Link.Bezier },  // 贝塞尔曲线
        { routing: go.Link.Orthogonal, corner: 5 },
        MAKE(go.Shape, { strokeWidth: 2, stroke: "#e4393c" }),
        MAKE(go.Shape, { toArrow:"Standard",fill:"#000",stroke:null }),//箭头
        MAKE(go.TextBlock,
          {
            //margin: 20,
            stroke: "blue",
            //font: "14px sans-serif",
            //width:50,
            //wrap: go.TextBlock.WrapDesiredSize
          },
          new go.Binding("text", "linktext")),
          {
            toolTip:MAKE(go.Adornment, "Auto",
              MAKE(go.Shape, { fill: "#FFFFCC" }),
              MAKE(go.TextBlock, { margin: 4 },new go.Binding("text", "name1"))
            )  // end of Adornment
          }
        );// the link shape
    // let myModel = MAKE(go.Model);//如果不需要连线可以用这样的方法创建model
    // let myModel = MAKE(go.GraphLinksModel);//也可以创建link model;需要配置myModel.linkDataArray 如下
    let myModel = MAKE(go.TreeModel);
    myModel.nodeDataArray =
    [ // note that each node data object holds whatever properties it needs;
      // for this app we add the "name" and "source" properties
      {key:"1", name1: "董事长",name2: "秘书1", name3: "秘书2", img: require("../assets/01.png"), },
      {key:"2", parent:"1", name1: "秘书", name2: "秘书1", name3: "秘书2", linktext:"link", img: require("../assets/03.png") },
      {key:"3", parent:"1", name1: "CEO",  name2: "秘书1", name3: "秘书2", linktext:"link", img: require("../assets/01.png") },
      {key:"4", parent:"3", name1: "总经理",  name2: "秘书1", name3: "秘书2", linktext:"link", img: require("../assets/02.png") },
      {key:"5", parent:"4", name1: "二狗子",  name2: "秘书1", name3: "秘书2", linktext:"link", img: require("../assets/01.png") },
    ];
    // myModel.linkDataArray = [
    //   {from:"1",to:"2"},
    //   {from:"1",to:"3"},
    //   {from:"1",to:"4"},
    //   {from:"1",to:"5"},
    // ];
    // function diagramInfo(myModel) {
    //   return "myModel:\n" + myModel.nodeDataArray.length + " nodes, " +myModel.linkDataArray.length + " links";
    // }
    // this.myDiagram.toolTip = MAKE(go.Adornment, "Auto",
    //   MAKE(go.Shape, { fill: "#CCFFCC" }),
    //   MAKE(go.TextBlock, { margin: 4 },
    //     // use a converter to display information about the diagram model
    //     new go.Binding("text", "", diagramInfo))
    // );
    this.myDiagram.model = myModel;
  }
};
</script>
```

# ECharts

## 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <title>鼠标滑入，区域块显示</title>
    <script src="jquery-1.10.2.min.js"></script>
    <script src="echarts.min.js"></script>
    <style type="text/css">
      html,
      body,
      #main {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="main" style=""></div>
    <script type="text/javascript">
      var myChart = echarts.init(document.getElementById("main"));
      option = {
        title: {
          text: "",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
        legend: {
          x: "center",
          show: false,
          data: ["朋友", "战友", "亲戚"],
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [
              {
                name: "朋友",
                itemStyle: {
                  normal: {
                    color: "#009800",
                  },
                },
              },
              {
                name: "战友",
                itemStyle: {
                  normal: {
                    color: "#4592FF",
                  },
                },
              },
              {
                name: "亲戚",
                itemStyle: {
                  normal: {
                    color: "#3592F",
                  },
                },
              },
            ],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                },
              },
            },
            force: {
              repulsion: 1000,
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                },
                formatter: "{c}",
              },
            },
            data: [
              {
                name: "徐贱云",
                draggable: true,
              },
              {
                name: "冯可梁",
                category: 1,
                draggable: true,
              },
              {
                name: "邓志荣",
                category: 1,
                draggable: true,
              },
              {
                name: "李荣庆",
                category: 1,
                draggable: true,
              },
              {
                name: "郑志勇",
                category: 1,
                draggable: true,
              },
              {
                name: "赵英杰",
                category: 1,
                draggable: true,
              },
              {
                name: "王承军",
                category: 1,
                draggable: true,
              },
              {
                name: "陈卫东",
                category: 1,
                draggable: true,
              },
              {
                name: "邹劲松",
                category: 1,
                draggable: true,
              },
              {
                name: "赵成",
                category: 1,
                draggable: true,
              },
              {
                name: "陈现忠",
                category: 1,
                draggable: true,
              },
              {
                name: "陶泳",
                category: 1,
                draggable: true,
              },
              {
                name: "王德福",
                category: 1,
                draggable: true,
              },
            ],
            links: [
              {
                source: 0,
                target: 1,
                category: 0,
                value: "朋友",
              },
              {
                source: 0,
                target: 2,
                value: "战友",
              },
              {
                source: 0,
                target: 3,
                value: "房东",
              },
              {
                source: 0,
                target: 4,
                value: "朋友",
              },
              {
                source: 1,
                target: 2,
                value: "表亲",
              },
              {
                source: 0,
                target: 5,
                value: "朋友",
              },
              {
                source: 4,
                target: 5,
                value: "姑姑",
              },
              {
                source: 2,
                target: 8,
                value: "叔叔",
              },
              {
                source: 0,
                target: 12,
                value: "朋友",
              },
              {
                source: 6,
                target: 11,
                value: "爱人",
              },
              {
                source: 6,
                target: 3,
                value: "朋友",
              },
              {
                source: 7,
                target: 5,
                value: "朋友",
              },
              {
                source: 9,
                target: 10,
                value: "朋友",
              },
              {
                source: 3,
                target: 10,
                value: "朋友",
              },
              {
                source: 2,
                target: 11,
                value: "同学",
              },
            ],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <title>鼠标滑入，区域块显示</title>
    <script src="jquery-1.10.2.min.js"></script>
    <script src="echarts.min.js"></script>
    <style type="text/css">
      html,
      body,
      #main {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="main" style=""></div>
    <script type="text/javascript">
      var myChart = echarts.init(document.getElementById("main"));
      option = {
        backgroundColor: "#1a4377",
        title: {
          text: "Graph 简单示例",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        color: ["#83e0ff", "#45f5ce", "#b158ff"],
        legend: {
          show: true,
          data: [{ name: "人", textStyle: { color: "#fff" } }, { name: "物证", textStyle: { color: "#fff" } }, { name: "不明物体", textStyle: { color: "#fff" } }],
        },
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 1000,
              edgeLength: 50,
            },
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: true,
              },
            },
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 13,
                },
                formatter: "{c}",
              },
            },

            data: [
              {
                name: "毛发",

                symbolSize: 100,
                draggable: true,
                category: 1,
                itemStyle: {
                  normal: {
                    borderColor: "#04f2a7",
                    borderWidth: 6,
                    shadowBlur: 20,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
              },
              {
                name: "刀",
                symbolSize: 70,
                itemStyle: {
                  normal: {
                    borderColor: "#04f2a7",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
                category: 1,
              },
              {
                name: "指纹",
                symbolSize: 70,
                category: 1,
                itemStyle: {
                  normal: {
                    borderColor: "#04f2a7",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
              },
              {
                name: "张三",
                symbolSize: 70,
                category: 0,
                itemStyle: {
                  normal: {
                    borderColor: "#82dffe",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
              },
              {
                name: "李四",
                symbolSize: 70,
                category: 0,
                itemStyle: {
                  normal: {
                    borderColor: "#82dffe",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
              },
              {
                name: "张三2",
                category: 0,
                itemStyle: {
                  normal: {
                    borderColor: "#82dffe",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
              },
              {
                name: "无名尸",
                category: 2,
                itemStyle: {
                  normal: {
                    borderColor: "#b457ff",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#b457ff",
                    color: "#001c43",
                  },
                },
              },
              {
                name: "赖子",
                itemStyle: {
                  normal: {
                    borderColor: "#82dffe",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
                category: 0,
              },
              {
                name: "王五",
                itemStyle: {
                  normal: {
                    borderColor: "#82dffe",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
                category: 0,
              },
              {
                name: "刘大",
                category: 0,
                itemStyle: {
                  normal: {
                    borderColor: "#82dffe",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43",
                  },
                },
              },
            ],
            links: [
              {
                source: "毛发",
                target: "刀",
                value: "案件ID",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e0f55a", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#639564", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "毛发",
                target: "指纹",
                value: "DNA",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#eda553", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#7c785b", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "毛发",
                target: "张三",
                value: "DNA",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#eda553", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#7c785b", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "毛发",
                target: "李四",
                value: "案件ID",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e0f55a", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#639564", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "毛发",
                target: "张三",
              },
              {
                source: "刀",
                target: "张三2",
                value: "案件ID",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e0f55a", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#639564", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "刀",
                target: "无名尸",
                value: "案件ID",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e0f55a", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#639564", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "李四",
                target: "赖子",
                value: "案件ID",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#e0f55a", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#639564", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "李四",
                target: "王五",
                value: "身份证ID",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#df6f30", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#915034", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
              {
                source: "王五",
                target: "刘大",
                value: "DNA",
                lineStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#eda553", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#7c785b", // 100% 处的颜色
                        },
                      ],
                      globalCoord: false, // 缺省为 false
                    },
                  },
                },
              },
            ],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 5,
                curveness: 0,
              },
            },
            categories: [{ name: "人" }, { name: "物证" }, { name: "不明物体" }],
          },
        ],
      };
      myChart.setOption(option);
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <title>五行相生相克图示</title>
    <script src="jquery-1.10.2.min.js"></script>
    <script src="echarts.min.js"></script>
    <style type="text/css">
      html,
      body,
      #main {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="main" style=""></div>
    <script type="text/javascript">
      var myChart = echarts.init(document.getElementById("main"));
      var wuXin = new Array("木", "火", "土", "金", "水");
      var color = ["#78a355", "#d93a49", "#8e3e1f", "#dea32c", "#50b7c1"];

      function roundDatas(num) {
        var datas = [];
        for (var i = 0; i < num; i++) {
          var x = Math.cos((72 * i * Math.PI) / 180);
          var y = Math.sin((72 * i * Math.PI) / 180);
          datas.push({
            name: wuXin[i],
            x: y,
            y: -x,
            itemStyle: {
              normal: {
                color: color[i],
              },
            },
          });
        }
        return datas;
      }

      function linkDatas(num) {
        var ldatas = [];
        for (var i = 0; i < num; i++) {
          ldatas.push({
            label: {
              normal: {
                show: true,
                formatter: "相生",
              },
            },
            lineStyle: {
              normal: {
                color: "#94d6da",
                width: 2,
                curveness: 0.3,
                opacity: 0.8,
                type: "dashed",
              },
            },
            source: i,
            target: i + 1,
          });

          ldatas.push({
            lineStyle: {
              normal: {
                color: "#FF5151",
                width: 2,
                curveness: 0,
                opacity: 0.8,
              },
            },
            label: {
              normal: {
                show: true,
                formatter: "相克",
              },
            },
            source: i,
            target: i + 2,
          });
        }
        //////for end///////

        ldatas.push({
          label: {
            normal: {
              show: true,
              formatter: "相生",
            },
          },
          lineStyle: {
            normal: {
              color: "#94d6da",
              type: "dashed",
              width: 2,
              curveness: 0.3,
              opacity: 0.8,
            },
          },
          source: i - 1,
          target: 0,
        });

        ldatas.push({
          lineStyle: {
            normal: {
              color: "#FF5151",
              width: 2,
              curveness: 0,
              opacity: 0.8,
            },
          },
          label: {
            normal: {
              show: true,
              formatter: "相克",
            },
          },
          source: 3,
          target: 0,
        });
        ldatas.push({
          lineStyle: {
            normal: {
              color: "#FF5151",
              width: 2,
              curveness: 0,
              opacity: 0.8,
            },
          },
          label: {
            normal: {
              show: true,
              formatter: "相克",
            },
          },
          source: 4,
          target: 1,
        });

        return ldatas;
      }
      /////linkDatas end//////

      option = {
        backgroundColor: "#2E2E2E",
        title: {
          text: "五行相生相克图",
          subtext: "",
          left: 50,
          top: 10,
          backgroundColor: "#FFFAFA",
          borderRadius: 8,
          textStyle: {
            color: "#102b6a",
          },
          subtextStyle: {
            color: "#102b6a",
          },
        },

        color: ["#000000", "#FFFFFF"],
        series: [
          {
            name: "五行",
            type: "graph",
            //roam: true,//缩放移动
            //draggable: true,
            focusNodeAdjacency: true,
            edgeSymbol: ["", "arrow"],
            edgeSymbolSize: [3, 15],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 15,
                },
              },
            },
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                fontSize: 46,
              },
            },

            symbol: "circle",
            symbolSize: 60,
            top: "60",
            left: "200",
            width: "400",
            height: "400",
            data: roundDatas(5),
            links: linkDatas(5),
          },

          ////////阴阳太极图//////////
          {
            name: "大圆",
            type: "pie",
            radius: "52",
            center: ["400", "268"],
            data: [
              {
                value: 50,
                name: "阴",
              },
              {
                value: 50,
                name: "阳",
              },
            ],
            roseType: "radius",
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: "黑色圆",
            type: "pie",
            zlevel: 2,
            radius: "26",
            center: ["400", "294"],
            data: [
              {
                value: 50,
                name: "",
              },
            ],
            roseType: "radius",
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },

          {
            name: "白色圆",
            type: "pie",
            zlevel: 2,
            radius: "26",
            center: ["400", "242"],
            data: [
              {
                value: 50,
                name: "",
              },
            ],
            roseType: "radius",
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },

          {
            name: "黑色圆小",
            type: "pie",
            zlevel: 3,
            radius: "12",
            center: ["400", "242"],
            data: [
              {
                value: 50,
                name: "",
              },
            ],
            roseType: "radius",
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },

          {
            name: "白色圆小",
            type: "pie",
            zlevel: 3,
            radius: "12",
            center: ["400", "294"],
            data: [
              {
                value: 50,
                name: "",
              },
            ],
            roseType: "radius",
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <title>三皇五帝关系图</title>
    <script src="jquery-1.10.2.min.js"></script>
    <script src="echarts.min.js"></script>
    <style type="text/css">
      html,
      body,
      #main {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="main" style=""></div>
    <script type="text/javascript">
      var myChart = echarts.init(document.getElementById("main"));
      option = {
        title: { text: "上古官二代" },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 18,
            },
          },
        },
        legend: {
          x: "center",
          data: ["三皇五帝", "夏", "商", "周", "春秋战国", "秦汉"],
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 60,
            focusNodeAdjacency: true,
            roam: true,
            categories: [
              {
                name: "三皇五帝",
              },
              {
                name: "夏",
              },
              {
                name: "商",
              },
              {
                name: "周",
              },
              {
                name: "春秋战国",
              },
              {
                name: "秦汉",
              },
            ],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 18,
                },
              },
            },
            force: {
              repulsion: 2000,
            },
            //edgeSymbol: ['pin'],
            //edgeSymbolSize: [1, 10],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 18,
                },
                formatter: "{c}",
              },
            },
            data: [
              {
                name: "相凡",
                des: "性别：男<br/>年龄：26<br/>职业：程序员",
                category: 0,
              },
              {
                name: "行礼",
                category: 0,
              },
              {
                name: "相丞",
                category: 0,
              },
              {
                name: "施仪",
                category: 0,
                //symbolSize: [250, 250],
                symbol: "image://http://louruyue.notbad.cn/uploadimage/pic_201251143747.jpg",
              },

              {
                name: "颛顼",
                category: 0,
                draggable: true,
              },
              {
                name: "帝喾",
                category: 0,
                draggable: true,
              },
              {
                name: "尧",
                category: 0,
                draggable: true,
              },

              {
                name: "舜",
                category: 0,
                draggable: true,
              },
              {
                name: "禹",
                category: 1,
                draggable: true,
              },

              {
                name: "夏桀",
                category: 1,
                draggable: true,
              },
              {
                name: "契",
                category: 2,
                draggable: true,
              },
              {
                name: "商汤",
                category: 2,
                draggable: true,
              },
              {
                name: "纣王",
                category: 2,
                draggable: true,
              },
              {
                name: "姬发",
                category: 3,
                draggable: true,
              },
              {
                name: "姬昌",
                category: 3,
                draggable: true,
              },
              {
                name: "后稷",
                category: 3,
                draggable: true,
              },
            ],
            links: [
              {
                source: "黄帝",
                target: "颛顼",
                value: "孙子",
                lineStyle: {
                  normal: {
                    color: "red",
                  },
                },
              },
              {
                source: "黄帝",
                target: "帝喾",
                value: "太孙",
              },
              {
                source: "颛顼",
                target: "禹",
                value: "爷孙",
              },
              {
                source: "颛顼",
                target: "舜",
                value: "8世孙",
              },
              {
                source: "颛顼",
                target: "帝喾",
                value: "让位",
                lineStyle: {
                  normal: {
                    color: "red",
                    type: "dotted",
                  },
                },
              },
              {
                source: "帝喾",
                target: "尧",
                value: "儿子",
                lineStyle: {
                  normal: {
                    color: "red",
                  },
                },
              },
              {
                source: "尧",
                target: "舜",
                value: "禅让",
                lineStyle: {
                  normal: {
                    color: "red",
                    type: "dotted",
                  },
                },
              },
              {
                source: "舜",
                target: "禹",
                value: "禅让",
                lineStyle: {
                  normal: {
                    color: "red",
                    type: "dotted",
                  },
                },
              },
              {
                source: "禹",
                target: "夏桀",
                value: "n代世袭",
                lineStyle: {
                  normal: {
                    color: "red",
                  },
                },
              },
              {
                source: "商汤",
                target: "夏桀",
                value: "商汤灭夏",
                lineStyle: {
                  normal: {
                    color: "red",
                    type: "dotted",
                  },
                },
              },
              {
                source: "商汤",
                target: "纣王",
                value: "n代世袭",
                lineStyle: {
                  normal: {
                    color: "red",
                  },
                },
              },
              {
                source: "姬发",
                target: "纣王",
                value: "武王伐纣",
                lineStyle: {
                  normal: {
                    color: "red",
                    type: "dotted",
                  },
                },
              },
              {
                source: "帝喾",
                target: "后稷",
                value: "父子,",
              },
              {
                source: "后稷",
                target: "姬昌",
                value: "16世孙,",
              },
              {
                source: "姬昌",
                target: "姬发",
                value: "父子",
              },

              {
                source: "黄帝",
                target: "神农",
                value: "使臣服",
              },
              {
                source: "黄帝",
                target: "蚩尤",
                value: "战胜",
              },
              {
                source: "黄帝",
                target: "伏羲",
                value: "?",
              },
              {
                source: "帝喾",
                target: "契",
                value: "父子",
              },
              {
                source: "契",
                target: "商汤",
                value: "14世孙",
              },
            ],
            lineStyle: {
              normal: {
                opacity: 0.7,
                width: 1,
                curveness: 0.1,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    </script>
  </body>
</html>
```
