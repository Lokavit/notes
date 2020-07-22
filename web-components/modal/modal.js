/*
 * @Author: Satya
 * @Date: 2020-07-22 15:39:59
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-22 18:07:11
 * doc:modal组件
 */

console.log(Modal_HTML);
console.log(Modal_CSS);

/** 定义本组件在html中使用时的元素标签名 */
const Component_Name = `dd-modal`;

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

    cancelButton.addEventListener("click", this._cancel.bind(this));
    confirmButton.addEventListener("click", this._confirm.bind(this));
    /** 点击背景，有时需要直接关闭对话框 */
    backDrop.addEventListener("click", this._cancel.bind(this));
    /** 右上角的关闭按钮 关闭对话框 */
    closeButton.addEventListener("click", this._cancel.bind(this));
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

customElements.define(Component_Name, Modal);
