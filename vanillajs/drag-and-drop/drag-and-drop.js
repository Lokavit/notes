/*
 * @Author: Satya
 * @Date: 2020-07-25 17:23:36
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-26 19:45:13
 * doc:拖放工具
 *  元素的拖拽及缩放
 */

/**
 * 检查元素中是否有style的指定属性
 * @param {*} el 需检查的指定元素
 * @param {*} attr 元素中style的指定属性
 * @return 返回属性值
 */
const CHECK_STYLE = (el, attr) => {
  let attr_value = getComputedStyle(el, null)[attr];
  // 如果没有该属性样式值 或者属性样式值是'static',返回 ""，否则返回属性值
  return !attr_value || attr_value === "static" ? "" : attr_value;
};

/** 可缩放元素的最小宽高值设定 */
const RESIZE_MIN_WIDTH = 360,
  RESIZE_MIN_HEIGHT = 240;

/**
 * 拖放函数
 * @param {*} container 容器(拖放时，元素始终在该区域内)
 * @param {*} elDND 可拖放的元素
 * @param {*} elDrag 拖拽区域
 * @param {*} el_resize 缩放区域
 * @param {*} isPixel 是否px值(因为还可以是%值)
 * @param {*} callbackDrag 拖拽完成，回调函数。可不传，附带默认值
 * @param {*} callbackResize 缩放完成，回调函数
 */
const DRAG_AND_DROP = (
  container,
  elDND,
  elDrag,
  elResize,
  isPixel,
  callbackDrag = () => {},
  callbackResize = () => {}
) => {
  /** 检查待操作元素的父容器是否具有必要style的position属性 */
  if (CHECK_STYLE(container, "position") === "")
    container.style.position = "relative";
  /** 检查待操作元素是否具有必要style的position属性 */
  if (CHECK_STYLE(elDND, "position") === "") elDND.style.position = "absolute";

  /** 拖拽函数 */
  DRAG(elDND, elDrag, isPixel, callbackDrag);
  /** 缩放函数 */
  RESIZE(elDND, elResize, isPixel, callbackResize);
};

/**
 * 拖拽函数的逻辑处理
 * @param {*} elDND 可拖拽元素
 * @param {*} elDrag 拖拽的标识
 * @param {*} isPixel 是否px值
 * @param {*} callbackDrag 拖拽结束的回调函数
 */
const DRAG = (elDND, elDrag, isPixel, callbackDrag = () => {}) => {
  console.log("运行拖拽事件 start");
  /** 存储 距离XY = 鼠标按下 - 拖拽元素距离左上偏移值 */
  let distance_x = 0,
    distance_y = 0;

  /** 存储 可拖拽元素style最终距离左上确定值 */
  let elDND_new_left = "",
    elDND_new_top = "";

  /** 短路逻辑或运算 [前者为true返回前者，否则返回后者] */
  elDrag = elDrag || elDND;
  /** 为拖拽标识的元素 添加鼠标样式 */
  elDrag.style.cursor = "move";

  /**
   * 鼠标按下事件
   * @param {*} event
   */
  elDrag.onmousedown = (event) => {
    /** 短路逻辑或运算 [前者为true返回前者，否则返回后者] */
    event = event || window.event;

    /** 计算距离 = 鼠标按下 - 拖拽元素距离左上偏移值 */
    distance_x = event.clientX - elDND.offsetLeft;
    distance_y = event.clientY - elDND.offsetTop;

    /**
     * 鼠标移动中
     * @param {*} event
     */
    document.onmousemove = (event) => {
      /** 短路逻辑或运算 [前者为true返回前者，否则返回后者] */
      event = event || window.event;

      /** 重新计算距离左上的坐标值 = 鼠标移动的新位置 - 鼠标按下时计算出来的距离坐标 */
      let new_left = event.clientX - distance_x;
      let new_top = event.clientY - distance_y;
      /** 计算 最大距离左上的边界 = 可拖拽元素的父元素(容器)宽高 - 可拖拽元素的宽高 */
      let max_bound_left = elDND.parentNode.clientWidth - elDND.offsetWidth;
      let max_bound_top = elDND.parentNode.clientHeight - elDND.offsetHeight;

      /** 越界检测 使用短路逻辑与运算 */
      new_left <= 0 && (new_left = 0); /** 最小左上边界检测，越界则值为0 */
      new_top <= 0 && (new_top = 0);
      /** 最大左上边界检测，越界则值为最大边界值 */
      new_left >= max_bound_left && (new_left = max_bound_left);
      new_top >= max_bound_top && (new_top = max_bound_top);

      /** 如果是计算px值 */
      if (isPixel) {
        elDND_new_left = `${new_left}px`;
        elDND_new_top = `${new_top}px`;
      } else {
        /** 否则，是计算 %值 */
        elDND_new_left = `${(new_left / elDND.parentNode.clientWidth) * 100}%`;
        elDND_new_top = `${(new_top / elDND.parentNode.clientHeight) * 100}%`;
      }

      /** 为可拖拽元素赋值最新的距离左上的值 */
      elDND.style.left = elDND_new_left;
      elDND.style.top = elDND_new_top;
      return false;
    };

    /** 鼠标抬起事件 */
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      /** 如果有回调函数 */
      if (callbackDrag) {
        console.log("拖拽的回调函数");
        callbackDrag({ left: elDND_new_left, top: elDND_new_top });
      }
    };
    return false;
  };
};

/**
 * 缩放函数的逻辑处理
 * @param {*} elDND 可缩放元素
 * @param {*} elResize 缩放的标识
 * @param {*} isPixel 是否px值
 * @param {*} callbackResize 缩放结束的回调函数
 */
const RESIZE = (elDND, elResize, isPixel, callbackResize = () => {}) => {
  console.log("运行缩放事件 start");

  /** 鼠标按下事件 */
  elResize.onmousedown = (event) => {
    event = event || window.event;

    /** 计算距离 = 鼠标按下的坐标值 - 缩放标识元素的左上偏移(相对可缩放元素而言) */
    let distance_x = event.clientX - elResize.offsetLeft;
    let distance_y = event.clientY - elResize.offsetTop;

    /** 存储新的可拖拽元素的宽高值 */
    let new_width = 0,
      new_height = 0;

    /** 鼠标移动事件 */
    document.onmousemove = (event) => {
      event = event || window.event;

      /** 计算新的缩放标识元素距离左上值 = 鼠标移动中的值 - 距离值 */
      let new_left = event.clientX - distance_x;
      let new_top = event.clientY - distance_y;

      /** 最大宽高值 = 可缩放元素的父元素(容器)宽高 - 可缩放元素的左上偏移 */
      let max_width = elDND.parentNode.clientWidth - elDND.offsetLeft - 2;
      let max_height = elDND.parentNode.clientHeight - elDND.offsetTop - 2;

      /** 计算 可缩放元素新宽高值 = 缩放标识元素宽高 + 缩放标识元素距离左上新值(相对可缩放元素而言) */
      new_width = elResize.offsetWidth + new_left;
      new_height = elResize.offsetHeight + new_top;

      /** 对可缩放元素宽度的计算 短路逻辑与运算 */
      new_width < RESIZE_MIN_WIDTH && (new_width = RESIZE_MIN_WIDTH);
      new_width > max_width && (new_width = max_width);
      /** 可缩放元素最终宽度值， px 或 % */
      elDND.style.width = isPixel
        ? `${new_width}px`
        : `${(new_width / elDND.parentNode.clientWidth) * 100}%`;

      /** 对可缩放元素高度的计算，短路逻辑与运算 */
      new_height < RESIZE_MIN_HEIGHT && (new_height = RESIZE_MIN_HEIGHT);
      new_height > max_height && (new_height = max_height);
      /** 可缩放元素最终高度值， px 或 % */
      elDND.style.height = isPixel
        ? `${new_height}px`
        : `${(new_height / elDND.parentNode.clientHeight) * 100}%`;

      /** 如果可缩放元素的新宽高已经到了最小宽度或者最小高度，便不再执行鼠标移动事件 */
      if (new_width == RESIZE_MIN_WIDTH || new_height == RESIZE_MIN_HEIGHT)
        document.onmousemove = null;

      return false;
    };

    /** 鼠标抬起事件 */
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      /** 如果有回调函数 */
      if (callbackResize) {
        console.log("缩放的回调函数");
        callbackResize({
          width: elDND.style.width,
          height: elDND.style.height,
        });
      }
    };
    return false;
  };
};
