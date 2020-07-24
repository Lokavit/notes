/*
 * @Author: Satya
 * @Date: 2020-07-22 17:10:00
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-24 19:05:18
 * doc:modal结构
 */

const Modal_HTML = `
 <!-- 作为视频窗体时，去掉遮罩 -->
 <div id="backdrop"></div>
 <div class="modal modal_position_common">
     <header>
        <div id="min">-</div>
         <div id="close">X</div>
         <slot name="title"></slot>
     </header>
     <section id="main">
         <slot name="main"></slot>
     </section>
     <section id="actions">
         <button id="cancel-button" class="cancel">Cancel</button>
         <button id="confirm-button" class="ok">Okay</button>
     </section>
 </div>`;
