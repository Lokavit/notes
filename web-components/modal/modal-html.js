/*
 * @Author: Satya
 * @Date: 2020-07-22 17:10:00
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-26 20:30:20
 * doc:modal结构
 */

/** 写法一: 常量赋值HTML结构字符串 */
// const Modal_HTML = `这里写组件的HTML结构`;

/**
 * 写法二: 常量函数式写法
 * @param {*} title HTML结构组件中所需参数
 * @returns 返回自定义组件HTML结构
 */
const Modal_HTML = (title) => {
  return `
    <div id="backdrop"></div>
    <div class="modal">
        <header>
            <div>${title}</div>
            <div id="min">-</div>
            <div id="close">X</div>
        </header>
        <section id="body">
            <slot name="body"></slot>
        </section>
        <section id="actions">
            <button id="cancel-button" class="cancel">Cancel</button>
            <button id="confirm-button" class="ok">Okay</button>
        </section> 
    </div>`;
};
