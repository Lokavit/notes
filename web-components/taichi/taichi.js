"use strict";

import { TaiChiHTML } from "./taichi-html.js";
import { TaiChiCSS } from "./taichi-css.js";

// 创建模板标签
const template = document.createElement("template");
// 将导入的内容，拼接成模板标签的完整内容，
template.innerHTML = `<style>${TaiChiCSS}</style>${TaiChiHTML}`;

export default class TaiChiComponent extends HTMLElement {
  constructor() {
    super();
    // 创建一个shadowroot。 attachShadow函数 返回 shadow root
    this._shadowRoot = this.attachShadow({
      // 设定封装层级。值为['open']或者['closed']
      mode: "open",
    });
    // 将模板内容 克隆到shadowRoot 下
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
  /** 自定义元素加入页面时，被调用 */
  connectedCallback() {}
}

customElements.define("tai-chi", TaiChiComponent);
