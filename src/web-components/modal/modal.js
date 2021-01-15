/*
 * @Author: Satya
 * @Date: 2020-07-22 15:39:59
 * @Last Modified by: Satya
 * @Last Modified time: 2021-01-15 22:23:56
 * doc:modal组件
 */

/** 定义本组件在html中使用时的元素标签名 */
const DD_MODAL = `dd-modal`;

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    /** 是否打开的标识 */
    this._isOpen = false;
    /** 窗体的title */
    this._title = "默认值:我是个Title";
    /** 窗体挂载于shadowRoot下 */
    this.shadowRoot.innerHTML = `${Modal_CSS}${Modal_HTML(this._title)}`;
    /** 当前组件 */
    this.modal = this.shadowRoot.querySelector(".modal");

    /** 点击背景，有时需要直接关闭对话框 */
    this.backdrop = this.shadowRoot.getElementById("backdrop");
    this.backdrop.addEventListener("click", this._cancel.bind(this));
    /** 底部操作区域 取消按钮 */
    this.btn_cancel = this.shadowRoot.getElementById("cancel-button");
    this.btn_cancel.addEventListener("click", this._cancel.bind(this));
    /** 底部操作区域 确认按钮 */
    this.btn_confirm = this.shadowRoot.getElementById("confirm-button");
    this.btn_confirm.addEventListener("click", this._confirm.bind(this));
    /** 右上角 关闭按钮 */
    this.btn_close = this.shadowRoot.getElementById("close");
    this.btn_close.addEventListener("click", this._cancel.bind(this));
    /** 右上角 最小按钮 */
    this.btn_min = this.shadowRoot.getElementById("min");
    this.btn_min.addEventListener("click", this._cancel.bind(this));
  }

  connectedCallback() {
    /** 如果当前自定义组件元素设置类以下属性，则进行相关处理
     * 去除遮罩，去除底部按钮组
     * 将本窗体设置到右下角位置
     * use: <dd-modal id="form_modal" not-mask>
     */
    if (this.hasAttribute("not-mask")) {
      // 遮罩层
      this.backdrop.style.display = "none";
    }

    /** 如果元素设置了 拖拽及缩放属性 */
    if (this.hasAttribute("not-actions")) {
      // 底部操作区域
      let actions = this.shadowRoot.querySelector("#actions");
      actions.style.display = "none";
    }
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
    this._isOpen = true;
  };

  hide = () => {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
      this._isOpen = false;
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
