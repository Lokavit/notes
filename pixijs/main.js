/*
 * @Author: Satya
 * @Date: 2020-07-02 12:00:24
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-11 17:23:00
 * doc:迷宫，主程序
 */

console.log("PIXI:", PIXI);
console.log("TWEEN", TWEEN);

// 创建一个 Pixi应用 需要的一些参数
let option = {
  width: 480,
  height: 480,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
  // transparent: true, // 是否透明背景
};

// 创建一个 Pixi应用
let app = new PIXI.Application(option);
// 获取舞台
let stage = app.stage;
// 获取渲染器
let renderer = app.renderer;
// 挂在应用的容器
let game_contener = document.querySelector("#game_contener");
// 将 Pixi 创建的 canvas 添加到页面上
game_contener.appendChild(renderer.view);

//实例化Bump (碰撞检测库)
let b = new Bump(PIXI);
// 加载器
let loader = PIXI.Loader.shared;
// pixi的定时器
let ticker = new PIXI.Ticker(); //.shared
// ticker.autoStart = true; // 自动播放
let tween_spineBoyPro; // tweenjs给角色的补间动画

// 以下为加载的整个过程
loader.onProgress.add(handleLoadProgress);
loader.onLoad.add(handleLoadAsset);
loader.onError.add(handleLoadError);
loader.onComplete.add(handleLoadComplete);

loader
  // images 单个添加
  .add("./assets/sprites/Iori.png")
  // 数组形式添加 ,可以考虑使用 PIXI.utils.TextureCache
  .add([
    "./assets/sprites/map_tiled.png",
    "./media/category/control.png",
    "./media/category/events.png",
    "./media/category/looks.png",
    "./media/category/made.png",
    "./media/category/motion.png",
    "./media/category/pen.png",
    "./media/category/sound.png",
    "./media/category/stop.png",
  ])
  // text
  .add("./assets/json/text.json")
  // sound
  .add("./assets/sound/win.mp3")

  // 测试 spine 骨骼动画
  .add("spineboypro", "./assets/pixi-spine/spineboy-pro.json")

  .load(onAssetsLoaded);

/**
 * 加载资源 。每个加载/错误的文件调用一次
 * @param {*} loader 加载器
 * @param {*} resource 资源(这里是单个资源文件)
 */
function handleLoadProgress(loader, resource) {
  // console.log("resource", resource);
  // console.log(loader.progress + "% loader", resource.name);
}

/** 加载完毕 每个加载的文件调用一次 */
function handleLoadAsset() {
  // console.log("asset loaded");
}

/** 加载错误 每个错误文件调用一次 */
function handleLoadError() {
  // console.log("load error");
}

/** 队列中所有资源加载完成 */
function handleLoadComplete() {
  console.log("load everyone");
}

let tube1; // 罗盘精灵 提在外面，以便它处使用该动画
let spineBoyPro; // 角色精灵
//需要展示的文本
let message;
// 角色精灵
let iori;

/**
 * 当资源全部加载完成 (此处考虑加https请求json形式)
 * @param {*} loader 加载器实例
 * @param {*} res 所有资源文件
 * use:loader.load(setup)
 */
function onAssetsLoaded(loader, res) {
  /* 创建一个图块精灵,自带平铺效果
   * 在WebGL中需要纹理，宽度和高度，图像尺寸最好是2的幂
   */
  const tilingSprite = new PIXI.TilingSprite(
    res["./assets/sprites/map_tiled.png"].texture,
    app.screen.width,
    app.screen.height
  );
  // 地图精灵添加到舞台
  stage.addChild(tilingSprite);

  // 存储动画所需帧图组
  const tube1texture = [];
  // 注意:遍历该值长度时，需根据add数量手动改变
  for (let i = 2; i < Object.keys(res).length - 5; i++) {
    // loader.resources["../../media/category/control.png"].texture
    tube1texture.push(res[Object.keys(res)[i]].texture);
  }
  // 创建了一个动画
  tube1 = new PIXI.AnimatedSprite(tube1texture);
  // 设置坐标值
  tube1.position.set(350, 290);
  tube1.interactive = true;
  tube1.cursor = "pointer";
  // 停止AnimatedSprite并转到特定的帧
  tube1.gotoAndStop(Math.floor(Math.random() * 4));
  tube1.on("pointerdown", () => {
    if (!busy) {
      // 停止AnimatedSprite并转到特定的帧。(内中为转帧计算公式,达到每次切一张随机帧图)
      tube1.gotoAndStop((tube1.currentFrame + 1) % tube1.totalFrames);
    }
  });
  // 从随机帧图开始，不断播放
  // tube1.gotoAndPlay(Math.floor(Math.random() * 4));
  stage.addChild(tube1);

  /**
   * 测试 添加骨骼动画
   * 使用 spine 骨骼动画
   */
  // create a spine boy
  spineBoyPro = new PIXI.spine.Spine(res.spineboypro.spineData);

  // 设置角色初始坐标
  spineBoyPro.position.set(app.screen.width / 3, app.screen.height / 1.3);

  // 设置角色初始大小
  spineBoyPro.scale.set(0.1);

  // 必须为需要操控的sprite设置开启交互
  spineBoyPro.interactive = true;
  stage.addChild(spineBoyPro);

  const singleAnimations = ["aim", "death", "jump", "portal"];
  const loopAnimations = ["hoverboard", "idle", "run", "shoot", "walk"];
  const allAnimations = [].concat(singleAnimations, loopAnimations);

  // 上一个动画
  let lastAnimation = "";

  /**
   * 兼容鼠标及触摸的按下事件
   * 注:若想事件生效，必须设置:spineBoyPro.interactive = true;
   * 这一段处理动画的效果为:点击角色，随机播放一个动画
   */
  spineBoyPro.on("pointerdown", () => {
    let animation = "";
    do {
      animation =
        allAnimations[Math.floor(Math.random() * allAnimations.length)];
    } while (animation === lastAnimation);
    spineBoyPro.state.setAnimation(
      0,
      animation,
      loopAnimations.includes(animation)
    );
    lastAnimation = animation;
  });

  // 为这个角色精灵，添加一系列事件
  spineBoyPro.state.addListener({
    /**
     * 每次此通道的动画完成循环时调用。
     * 因事件在apply中触发,响应该事件而设置的任何动画只有在下次应用AnimationState时应用
     * @param {*} entry 指定通道的动画
     */
    complete: function (entry) {
      console.log(
        "track 通道 " +
          entry.trackIndex +
          " completed " +
          entry.loopsCount() +
          " times"
      );
    },

    /**
     * 在处理此通道的动画时调用。
     * 在没有将该通道设置为当前通道时，可能会发生此情况。调用该函数后，不应保留堆该通道的引用，它可能被破坏或重新使用
     * @param {*} entry 指定通道的动画
     */
    dispose: function (entry) {
      console.log("animation was disposed at " + entry.trackIndex);
    },

    /**
     * 该通道的动画不再是当前通道时调用，并且将不再应用
     * @param {*} entry 指定通道的动画
     */
    end: function (entry) {
      console.log("animation was ended at " + entry.trackIndex);
    },

    /**
     * 此通道的动画触发事件时调用。
     * 因事件在apply中触发,响应该事件而设置的任何动画只有在下次应用AnimationState时才应用
     * @param {*} entry 指定通道的动画
     * @param {*} event 事件
     */
    event: function (entry, event) {
      // console.log("event ", event);
      // console.log("entry ", entry);
      console.log("event fired " + event.data + " at track" + entry.trackIndex);
    },

    /**
     * 当另一个通道的动画代替此通道的动画作为当前通道的动画时调用。
     *该通道动画可以继续用于混合
     * @param {*} entry 指定通道的动画
     */
    interrupted: function (entry) {
      console.log("animation was interrupted at " + entry.trackIndex);
    },

    /**
     * 将此通道的动画设置为当前通道动画时调用
     * @param {*} entry 指定通道的动画
     */
    start: function (entry) {
      console.log("animation is set at " + entry.trackIndex);
    },
  });

  /**
   * 移动角色。
   * 角色随着走路动画播放而移动。
   */
  tween_spineBoyPro = new TWEEN.Tween({
    x: spineBoyPro.position.x,
    y: spineBoyPro.position.y,
  })
    /** 角色的x轴移动到340的位置 */
    .to({ x: 350 }, 3000)
    /** 函数内中的回调箭头函数，该val参数为角色position */
    .onUpdate((val) => {
      // 将每次更新时 position.x的新值，赋值给角色的x
      spineBoyPro.position.x = val.x;
    });

  /**
   * 切 精灵表
   * 然后将每个动画制作为数组，播放该数组中的动画
   */
  let base_texture = PIXI.utils.TextureCache["./assets/sprites/Iori.png"];
  let texture0 = new PIXI.Texture(base_texture);
  // 参数为(起始x,起始Y,矩形宽,矩形高)
  texture0.frame = new PIXI.Rectangle(0, 96, 32, 48);
  let texture1 = new PIXI.Texture(base_texture);
  texture1.frame = new PIXI.Rectangle(32, 96, 32, 48);
  let texture2 = new PIXI.Texture(base_texture);
  texture2.frame = new PIXI.Rectangle(64, 96, 32, 48);
  let texture3 = new PIXI.Texture(base_texture);
  texture3.frame = new PIXI.Rectangle(96, 96, 32, 48);

  let textures = [texture0, texture1, texture2, texture3];

  //创建动画精灵
  iori = new PIXI.AnimatedSprite(textures, true);
  //设置动画精灵的速度
  iori.animationSpeed = 0.1;
  iori.position.set(130, 420);
  //把动画精灵添加到舞台
  stage.addChild(iori);
  console.log(iori);
  iori.stop();

  message = new PIXI.Text();
  stage.addChild(message);
}

// 运行的按钮
let btnRun = document.querySelector("#btn_run");
btnRun.addEventListener("click", runPlay);

function runPlay() {
  console.log("tube1:", tube1);
  // 调用图标切换动画.播放函数
  // tube1.play();

  console.log("spineBoyPro:", spineBoyPro);
  // // 每次播放时，先将角色重置到起始位置
  // spineBoyPro.position.set(app.screen.width / 3, app.screen.height / 1.3);
  // // 角度设置为起始值
  // spineBoyPro.rotation = 0;

  // 找找角色的边
  console.log(new PIXI.Polygon());

  // 播放动画时，先检测是否有该动画
  if (spineBoyPro.state.hasAnimation("walk")) {
    // 调用该角色的监听事件组中的.播放当前动画函数
    spineBoyPro.state.listeners[0].start(
      // 调用角色走路动画，
      spineBoyPro.state.setAnimation(0, "walk", true)
    );
    // 该值控制动画播放速度(值越小越慢)，某些地方可以作为慢(特写)镜头使用
    spineBoyPro.state.timeScale = 1;
    // 启动使用 tween，
    tween_spineBoyPro.start();
  }
  // 调用 tweenjs的动画
  gameLoop();

  // 使用3秒延时，模拟碰撞到某物，播放倒地动画
  setTimeout(() => {
    if (spineBoyPro.state.hasAnimation("death")) {
      spineBoyPro.state.listeners[0].end(
        spineBoyPro.state.setAnimation(1, "death", false)
      );
      spineBoyPro.state.timeScale = 0.5;
      console.log("查看此时的tracks:", spineBoyPro.state.tracks);
    }
    /**
     * 使用1秒，模拟撞死后，最终效果
     * 注:实际开发时，此处需要一个待机动画，当重新点击播放是，可在函数入口将位置归0
     */
    setTimeout(() => {
      spineBoyPro.state.listeners[0].complete(
        spineBoyPro.state.setEmptyAnimation(
          spineBoyPro.state.tracks[0].trackIndex,
          0
        )
      );
      // .dispose(spineBoyPro.state.clearTracks()); // 将所有通道清理
      console.log("查看此时的tracks?:", spineBoyPro.state.tracks);
      // 虽然停了，但是精灵没了
      // window.cancelAnimationFrame(animate());
    }, 1000);
  }, 3000);
}

/**
 * 因tweenjs不会自动更新，需显式调用update方法来告知它何时运行，推荐以下写法：
 * 在 主动画循环中执行该update操作
 * @param {*} time
 */
function gameLoop(time) {
  // 使用该种方式调用此函数循环，获得最佳图形性能
  requestAnimationFrame(gameLoop);
  // [...]
  tween_spineBoyPro.update(time);
  // [...]

  // 如果发生碰撞
  if (checkHit(spineBoyPro, tube1)) {
    console.log(checkHit(spineBoyPro, tube1));
    // tween_spineBoyPro.stop();

    // iori.stop();
  }
  //播放动画精灵
  iori.play();
  // 小八走起来，可以截断移动，但没有停止动画
  iori.position.x <= 350 ? (iori.position.x += 0.5) : iori.position.x;

  iori.onComplete = () => {
    console.log("complete");
  };

  renderer.render(stage);
}

/**
 * 碰撞检测
 * @param {*} sprite1 精灵1
 * @param {*} sprite2 精灵2
 */
function checkHit(sprite1, sprite2) {
  // (精灵1，精灵2，防止重叠，碰撞反弹)
  return b.hit(sprite1, sprite2, true, true) ? true : false;
}

// .md文件的地址
const Content_Url = `https://github.com/Lokavit/notes/blob/master/pixijs/Pixijs.md`;

fetch(Content_Url).then((response) =>
  response.text().then((result) => {
    rendererContent(result);
  })
);
/**
 * 渲染正文内容
 * @param {*} data
 */
function rendererContent(data) {
  const article = document.querySelector(".article");
  // 将文本内容赋值给 文章详情页面指定结构区域
  article.innerText = data;

  // 使用markdown解析库，对 内容进行解析，注意此处必须是document
  document.getElementById("article").innerHTML = marked(data);
  /**
   * 以下为高亮库所需
   * 由页面结构内容区域找到所有pre code元素，也就是包裹代码的所有块
   * 迭代所有块，对其进行高亮处理
   */
  let doc_content = article.querySelectorAll("pre code");
  doc_content.forEach((code_block) => {
    hljs.highlightBlock(code_block);
  });
}
