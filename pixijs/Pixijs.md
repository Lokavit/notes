# pixijs
`pixi.js v5.3.0  webgl 2D`

### must
- 使用nodejs搭建本地服务器，解决该库引入资源跨域问题
- 动画系统
- 声音系统 pixi-sound.js
- 无碰撞检测 (bump)
- 骨骼动画:pixi-spine

<!--
渲染:pixijs
切图:需使用第三方工具，texturepacker(精灵表打包和压缩的工具)。pixi内(Sprite sheet)
动画:pixi自带动画系统，以png数组形式,逐帧播放
骨骼:spine。pixi支持使用,所需文件(png,json,atlas)需在spine中制作(非免费)

// 改变精灵色调,赋值一个十六进制颜色值。默认白色（0xFFFFFF）没有色调
sprite.tint = 0xFFFF660;

-->

 <!-- 故事线，场景搭建
1.地表层:地面(平铺/动效快)
2.景物层:建筑及树木等静态物
3.天空层:天空盒(平铺/动效慢)
4.流云层:需有流云动效,PIXI.TilingSprite+ticker.add()
 
  -->

### TODO:

- 1.播放走路/跑动动画时，需处理位移 [tweenjs 处理]
- 2.过程中需时时进行碰撞检测
- 3.一旦碰到(触发死亡动画)的物体，播放死亡动画
- 4.当再次点击开始时，角色坐标及状态应该为初始值
- 5.添加背景音乐，及各种音效

```js
/* 流云动效 */
let ticker = PIXI.Ticker.shared;
console.log("ticker", ticker);
ticker.autoStart = true; // 自动播放
/* 创建一个图块精灵,自带平铺效果
 * 在WebGL中需要纹理，宽度和高度，图像尺寸最好是2的幂
 */
const tilingSprite = new PIXI.TilingSprite(
  res["../../assets/sprites/map_tiled.png"].texture,
  app.screen.width,
  app.screen.height
);
stage.addChild(tilingSprite);
// 移动平铺精灵
tilingSprite.x = 30;
// 平铺精灵纹理的比例
// tilingSprite.tileScale.set(1.5, 1.5);

ticker.add((delta) => {
  // 移动平铺精灵使用的纹理
  tilingSprite.tilePosition.x -= delta;
  // tilingSprite.tilePosition.set(tilingSprite.tilePosition.x -= delta,tilingSprite.tilePosition.y)
});
```

```js
/*
 播放走路动画时，需处理位移 使用tweenjs
*/
let tween; // 外层设置变量

function runPlay() {
  /**
   * 移动角色。
   * 角色随着走路动画播放而移动。
   */
  tween = new TWEEN.Tween({
    x: spineBoyPro.position.x,
    y: spineBoyPro.position.y,
  })
    /** 角色的x轴移动到340的位置 */
    .to({ x: 340 }, 3000)
    /** 函数内中的回调箭头函数，该val参数为角色position */
    .onUpdate((val) => {
      // 将每次更新时 position.x的新值，赋值给角色的x
      spineBoyPro.position.x = val.x;
    });

  // 播放动画时，先检测是否有该动画
  if (spineBoyPro.state.hasAnimation("walk")) {
    // 调用该角色的监听事件组中的.播放当前动画函数
    spineBoyPro.state.listeners[0].start(
      // 调用角色走路动画，
      spineBoyPro.state.setAnimation(0, "walk", true)
    );
    // 该值控制动画播放速度(值越小越慢)，某些地方可以作为慢(特写)镜头使用
    spineBoyPro.state.timeScale = 1;
    // 启动使用 tween，必须在需要使用的地方，先启动
    tween.start();
    // 调用 tweenjs的动画
    animate();
  }
}
/**
 * 因tweenjs不会自动更新，需显式调用update方法来告知它何时运行，推荐以下写法：
 * 在 主动画循环中执行该update操作
 * @param {*} time
 */
function animate(time) {
  // 使用该种方式调用此函数循环，获得最佳图形性能
  requestAnimationFrame(animate);
  // [...]
  tween.update(time);
  // [...]
}
```

```js
// 官方建议：PIXI.Spritesheet替换PIXI.Sprite
// 并且推荐了 TexturePacker

// 内中直接写函数
.on("pointerdown",()=>{})
// 执行外部函数
.on("pointerdown",test)
// 需要传参
.on("pointerup",testUp.bind(this,{params:"aaa"}))
// 需要传递回调函数
.on("pointerup",test.bind(this,{
  params:"aaa",
  callback:target=>{
    doSomethis(target); // 接收当前事件绑定对象，方便回调函数中使用
  }
}))

function test(){}
function testUp(val){}


bird3.state.setAnimation(0, 'WinEffect', true);
    bird3.state.setAnimation(1, 'Win', true);

// 精灵动画的另一种构造方式
PIXI.AnimatedSprite.fromFrames([
        'assets/aaa_1.png',
        'assets/aaa_2.png',
        'assets/aaa_3.png',
        //...
])

// 精灵表的方式
 const sheet = loader.resources["assets/spritesheet.json"].spritesheet;
  const asp = new PIXI.AnimatedSprite(sheet.animations["aaa"]);
asp.gotoAndPlay(frameNumber) //从指定帧开始播放
asp.gotoAndStop(frameNumber) //停止在指定帧
asp.play() //播放
asp.stop() //停止


// /**
//  * 尝试，ticker
//  * 可以移动，但重复点击时，会加快位移速度，需处理
//  */
// ticker.add((delta) => {
//   if (spineBoyPro.position.x < 340) {
//     console.log("ticker");
//     spineBoyPro.position.x += 1;
//   } else {
//     ticker.stop();
//   }
// });


/* 为平铺层设置x轴位移动画，实现卷轴地图效果 */
// let count = 0; // 缩放时所需
app.ticker.add(() => {
  // 动画:移动相关 平铺的位移
  tilingSprite.tilePosition.x -= 1;
  // tilingSprite.tilePosition.y += 1;

  // count += 0.005; // 设置缩放的缓增值
  // 动画:缩放相关 平铺的缩放
  // tilingSprite.tileScale.x = 2 + Math.sin(count);
  // tilingSprite.tileScale.y = 2 + Math.cos(count);
});

/* 平铺精灵 */
const texture_map_tile = PIXI.Texture.from("../../media/category/stop.png");
/* 创建一个图块精灵,自带平铺效果
 * 在WebGL中需要纹理，宽度和高度，图像尺寸最好是2的幂
 */
const tilingSprite = new PIXI.TilingSprite(
  texture_map_tile,
  app.screen.width,
  app.screen.height
);
container.addChild(tilingSprite);

/* for嵌套遍历生成网格 */
for (let i = 0; i < 3; i++) {
  for (let col = 0; col < 3; col++) {
    const MAP_TILE = new PIXI.Sprite(texture_map_tile);
    // bunny.anchor.set(0.3);
    // bunny.x = (i % 5) * 40;
    // bunny.y = Math.floor(i / 1) * 40;
    MAP_TILE.x = col * 160 + 10;
    MAP_TILE.y = i * 160 + 10;
    container.addChild(MAP_TILE);
  }
}

// 可以拿到所有缓存图片的信息 [内中会报警某些东西已弃用]
PIXI.utils.TextureCache

```
---