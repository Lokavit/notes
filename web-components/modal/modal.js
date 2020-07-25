/*
 * @Author: Satya
 * @Date: 2020-07-22 15:39:59
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-25 17:59:49
 * doc:modal组件
 */

/** 定义本组件在html中使用时的元素标签名 */
const DD_MODAL = `dd-modal`;

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `${Modal_CSS}${Modal_HTML}`;

    // const slots = this.shadowRoot.querySelectorAll("slots");

    const cancelButton = this.shadowRoot.getElementById("cancel-button");
    const confirmButton = this.shadowRoot.getElementById("confirm-button");
    const backDrop = this.shadowRoot.getElementById("backdrop");
    const closeButton = this.shadowRoot.getElementById("close");
    const minButton = this.shadowRoot.getElementById("min");

    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
    /** 点击背景，有时需要直接关闭对话框 */
    backDrop.addEventListener("click", this._cancel.bind(this));
    /** 右上角的关闭按钮 关闭对话框 */
    closeButton.addEventListener("click", this._cancel.bind(this));
    // 最小化，
    minButton.addEventListener("click", this._cancel.bind(this));
  }

  /** 拖拽窗体 */
  _drag() {}

  connectedCallback() {
    /** 如果当前自定义组件元素设置类以下属性，则进行相关处理
     * 去除遮罩，去除底部按钮组
     * 将本窗体设置到右下角位置
     */
    if (this.hasAttribute("not-mask")) {
      // 遮罩层
      let mask = this.shadowRoot.querySelector("#backdrop");
      mask.style.display = "none";
      // 底部操作区域
      let actions = this.shadowRoot.querySelector("#actions");
      actions.style.display = "none";
      // 窗体
      let modal = this.shadowRoot.querySelector(".modal");
      modal.classList.remove("modal_position_common");
      modal.classList.add("modal_posistion_video");
    }

    /** 如果元素设置了 拖拽及缩放属性 */
    if (this.hasAttribute("drag") && this.hasAttribute("resize")) {
      let modal = this.shadowRoot.querySelector(".modal");
      let dragArea = this.shadowRoot.querySelector(".modal .drag");
      let resizeArea = this.shadowRoot.querySelector(".modal .resize");
      new Draggable(
        document.body,
        modal,
        dragArea,
        resizeArea,
        true,
        (dragStyle) => {
          console.log(
            "Location of the current element after dragging(当前元素拖拽后的位置)",
            dragStyle
          );
          // 处理拖拽超出边界的情况
        },
        (resizeStyle) => {
          console.log(
            "The size of the current element after dragging(当前元素拖拽后的大小)",
            resizeStyle
          );
        }
      );
    }

    // /** 如果元素设置了可拖拽属性 */
    // if (this.hasAttribute("drag")) {
    //   console.log("drag this:", this);
    //   // 获取header元素
    //   let dragArea = this.shadowRoot.querySelector(".modal .drag");
    //   // 为该元素绑定鼠标拖拽事件
    //   dragArea.addEventListener("mousedown", this._drag.bind(this), false);
    // }

    // /** 如果元素设置了 右下角缩放属性 */
    // if (this.hasAttribute("resize")) {
    //   console.log("resize this:", this);
    //   let resizeArea = this.shadowRoot.querySelector(".modal .resize");
    //   resizeArea.addEventListener("mousedown", this._resize.bind(this), false);
    // }
  }

  /**
   * 缩放事件 实现
   * @param {*} event
   */
  _resize(event) {
    console.log("缩放事件", event);
    // 存储鼠标按下时的坐标值
    let mouse_down_x = event.clientX;
    let mouse_down_y = event.clientY;
    console.log("获取鼠标按下的位置:", mouse_down_x, mouse_down_y);

    // 取出该自定义组件中的对应style (自定义组件中style的取出方法)
    let STYLE = this.shadowRoot.styleSheets[0].cssRules[3].style;
    console.log("当前元素的父元素", STYLE);

    // 获取元素初始距离右下角的值 并处理该值(字符串中取出数字)
    let el_width, el_height; // 存储窗体原本的宽高
    if (STYLE.width.includes("%")) {
      // 使用正则替换为 数值
      el_width =
        +document.body.clientWidth * (+STYLE.width.replace(/\%/g, "") / 100);
      el_height =
        +document.body.clientHeight * (+STYLE.height.replace(/\%/g, "") / 100);
    } else {
      el_width = +STYLE.width.replace(/\px/g, "");
      el_height = +STYLE.height.replace(/\px/g, "");
    }
    console.log("存储元素的宽高:", el_width, el_height);

    /** 鼠标移动时，每几百毫秒计算一次 */
    document.onmousemove = (event) => {
      console.log("鼠标移动中");
      console.log("鼠标移动时，位置信息:", event.clientX, event.clientY);
      /**
       * 移动的坐标 - 按下的坐标 = 移动的距离
       * 假设:鼠标由(1280x1060)移动至 800x600的地方，即(800-1280,600-1060)
       */
      let move_x = event.clientX - mouse_down_x;
      let move_y = event.clientY - mouse_down_y;

      console.log("计算鼠标移动的值:", move_x, move_y);

      // 如果超出规定界限
      if (el_width + move_x < 480 || el_height + move_y < 320) {
        STYLE.width = `480px`;
        STYLE.height = `320px`;
      }

      STYLE.width = `${el_width + move_x}px`;
      STYLE.height = `${el_height + move_y}px`;

      console.log(
        "test移动后的距离右下角值:",
        event.target.parentElement.style.width,
        event.target.parentElement.style.height
      );
    };

    /** 鼠标抬起事件 */
    document.onmouseup = () => {
      console.log("鼠标抬起事件");
      //清除移动和抬起事件
      document.onmousemove = document.onmouseup = null;
    };
  }

  /**
   * 拖拽事件 实现
   * @param {*} event
   * 实际拖拽时，需整个窗体元素
   */
  _drag(event) {
    console.log("拖拽事件", event);
    // 存储鼠标按下时的坐标值
    let mouse_down_x = event.clientX;
    let mouse_down_y = event.clientY;
    console.log("获取鼠标按下的位置:", mouse_down_x, mouse_down_y);

    // 取出该自定义组件中的对应style (自定义组件中style的取出方法)
    let STYLE = this.shadowRoot.styleSheets[0].cssRules[3].style;
    console.log("当前元素的父元素", STYLE);

    // 获取元素初始距离右下角的值 并处理该值(字符串中取出数字)
    let el_right, el_bottom; // 存储元素距右距下值
    if (STYLE.right.includes("%")) {
      console.log("样式值包含%");
      // 使用正则替换为 数值
      el_right =
        +document.body.clientWidth * (+STYLE.right.replace(/\%/g, "") / 100);
      el_bottom =
        +document.body.clientHeight * (+STYLE.bottom.replace(/\%/g, "") / 100);
    } else {
      el_right = +STYLE.right.replace(/\px/g, "");
      el_bottom = +STYLE.bottom.replace(/\px/g, "");
    }
    console.log("元素右下角距离文档流右下角的值:", el_right, el_bottom);

    /** 鼠标移动时 每几百毫秒计算一次 */
    document.onmousemove = (event) => {
      console.log("鼠标移动中");
      console.log("鼠标移动时，位置信息:", event.clientX, event.clientY);
      /**
       * 移动的坐标 - 按下的坐标 = 移动的距离
       * 假设:鼠标由(1280x1060)移动至 800x600的地方，即(800-1280,600-1060)
       */
      let move_x = event.clientX - mouse_down_x;
      let move_y = event.clientY - mouse_down_y;

      console.log("计算鼠标移动的值:", move_x, move_y);

      STYLE.right = `${el_right - move_x}px`;
      STYLE.bottom = `${el_bottom - move_y}px`;

      console.log(
        "test移动后的距离右下角值:",
        event.target.parentElement.style.right,
        event.target.parentElement.style.bottom
      );
    };

    /** 鼠标抬起事件 */
    document.onmouseup = () => {
      console.log("鼠标抬起事件");
      //清除移动和抬起事件
      document.onmousemove = document.onmouseup = null;
    };
  }

  /** 父组件  属性发生变化时，被调用 */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("属性发生变化:", name, oldValue, newValue);
    // if (name === 'opened') {
    // if (this.hasAttribute("opened")) {
    //   // this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
    //   // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
    //   // this.shadowRoot.querySelector('#modal').style.opacity = 1;
    //   // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    //   this.isOpen = true;
    // } else {
    //   this.isOpen = false;
    // }
    // // }
  }

  // static get observedAttribute() {
  //     return ['opened'];
  // }
  open = () => {
    this.setAttribute("opened", "");
    this.isOpen = true;
  };

  hide = () => {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
      this.isOpen = false;
    }
  };

  _cancel = () => {
    this.hide();
    const cancelEvent = new Event("cancelled", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(cancelEvent);
  };

  _confirm = () => {
    this.hide();
    const confirmedEvent = new Event("confirmed");
    this.dispatchEvent(confirmedEvent);
  };
}

customElements.define(DD_MODAL, Modal);
