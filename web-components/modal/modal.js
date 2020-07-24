/*
 * @Author: Satya
 * @Date: 2020-07-22 15:39:59
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-24 22:28:03
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

  connectedCallback() {
    /** 如果当前自定义组件元素设置类以下属性，则进行相关处理
     * 去除遮罩，去除底部按钮组
     * 将本窗体设置到右下角位置
     */
    if (this.hasAttribute("not-mask")) {
      let mask = this.shadowRoot.querySelector("#backdrop");
      mask.style.display = "none";
      let actions = this.shadowRoot.querySelector("#actions");
      actions.style.display = "none";

      let modal = this.shadowRoot.querySelector(".modal");
      modal.classList.remove("modal_position_common");
      modal.classList.add("modal_posistion_video");

      /** 鼠标操作 兼容触屏
       * header周围区域，鼠标十字，表示可拖拽。
       * 视频窗体右下角，斜箭头，表示可缩放窗体
       */

      // 添加可拖拽属性
      modal.setAttribute("draggable", "true");

      /** 当开始拖动元素或文本选择时，触发事件 */
      modal.addEventListener("dragstart", (event) => {
        console.log("dragstart 点击了可以拖动的元素");
        event.dataTransfer.setData("content", this.shadowRoot.host);
        console.log(event.dataTransfer.getData("content"));

        console.log(this.shadowRoot);
        console.log(this.shadowRoot.host);
        console.log(event);
        console.log(this.shadowRoot.styleSheets[0].cssRules[3]);
        console.log(this.shadowRoot.styleSheets[0].cssRules[3].cssText);
        // 视频窗体距离底边的值
        console.log(this.shadowRoot.styleSheets[0].cssRules[3].style.bottom);
        // 视频窗体距离右边的值
        console.log(this.shadowRoot.styleSheets[0].cssRules[3].style.right);

        // 网页可见区域
        console.log(
          "网页可见区域:",
          document.body.clientWidth,
          document.body.clientHeight
        );

        // 窗体size
        console.log("窗体size:", modal.offsetWidth, modal.offsetHeight);

        // 获取浏览器的宽高：
        // var width = window.innerWidth
        // || document.documentElement.clientWidth
        // || document.body.clientWidth;
        // var height = window.innerHeight
        // || document.documentElement.clientHeight
        // || document.body.clientHeight;

        // 获取html元素宽高的两种方式
        // // 首先是取到元素
        // var main = document.getElementById('main');
        // // 第一种方式 可以取到任何情况下的宽高
        // var mainWidth = main.offsetWidth,
        // mainHeight = main.offsetHeight;
        // // 第二种方式 不能取到css定义的宽高
        // var mainWidth2 = main.style.width,
        // mainHeight2 = main.style.height;
      });

      /** 当元素或文本选择被用户拖动时，拖动事件每几百毫秒触发一次。 */
      modal.addEventListener(
        "drag",
        (event) => {
          console.log("drag 拖动着元素");
          event.dataTransfer.getData("content");

          // console.log(modal.style.right);
        },
        false
      );

      /** 当拖动操作结束时（通过释放鼠标按钮或按退出键），将触发dragend事件。 */
      modal.addEventListener("dragend", (event) => {
        console.log("dragend");
        event.preventDefault();
        console.log(
          (modal.style.right = `${modal.style.right + event.offsetX}px`)
        );
      });

      // /** 当元素被拖动至有效拖放目标上方时运行脚本 */
      // modal.addEventListener("dragover", (event) => {
      //   console.log("dragover ");
      //   event.preventDefault();
      // });

      modal.addEventListener("drop", (event) => {
        console.log("drop");
        event.preventDefault();
        var data = event.dataTransfer.getData("content");
        document.body.innerHTML += data;
      });
    }
  }

  //enables drag and drop
  // function allowDrop(ev) {
  //   ev.preventDefault();
  // }

  // //Drop event & checks <img id> w 'data-div'
  // function drop(ev) {
  //   ev.preventDefault();
  //   let image = ev.dataTransfer.getData("content");
  //   console.log(image)
  //   if (ev.target.id == document.getElementById(image).getAttribute('data-div')) {
  //       alert('Great move, that is correct!');
  //       ev.target.appendChild(document.getElementById(image));
  //       } else {alert('Sorry, that is incorrect.')}
  // }

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
