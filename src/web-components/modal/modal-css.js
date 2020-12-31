/*
 * @Author: Satya
 * @Date: 2020-07-22 17:10:59
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-26 10:59:40
 * doc:modal样式
 */

const Modal_CSS = `
    <style>
        #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.25);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
        }
        .modal {
            position: absolute;
            top: 10vh;
            left: 25%;
            z-index: 91;
            width: 480px;
            background: #333;
            border-radius: 0.5rem;
            border: 0.5rem solid #333;
            border-top: 3rem solid #333;
            box-shadow: 0 2px 8px rgba(0,0,0,0.26);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease-out;
        }
        /* header固定在modal的border-top中 */
        header {
            position:absolute;
            top: -60px;
            left: -6px;
            padding: 1rem;
            padding-left:2rem;
            padding-bottom:0.5rem;
            line-height:1rem;
            color:#FFF;
            width: 90%;
            height:1rem;
        }
        /* 最小化按钮 */
        #min{
            position: absolute;
            right: 9%;
            top: 30%;
            cursor: pointer;
            color:#ffd205;
            font-weight: 900;
        }
        /* 关闭窗体按钮 */
        #close {
            position: absolute;
            top: 30%;
            right: 3%;
            cursor: pointer;
            color:#ffd205;
        }
        #min:hover, #close:hover{
            color:aqua;
        }
        ::slotted(h1) {
            font-size: 1.25rem;
            margin: 0;
        }
        :host([opened]) #backdrop,
        :host([opened]) .modal
            {
            opacity: 1;
            pointer-events: all;
        }
        #actions {
            border-top: 1px solid #ccc;
            padding: 1rem;
            display: flex;
            justify-content: flex-end;
        }
        #action button {
            margin: 0 .25rem;
        }
        #actions .cancel {
            background: crimson;
            color: #fff;
            font-weight: bold;
            border-radius: 3px;
            font-size: 1rem;
        }
        #actions .ok {
            background: green;
            color: #fff;
            font-weight: bold;
            border-radius: 3px;
            font-size: 1rem;
        }
        /* 拖拽标识区域 */
        .drag {
            width: 88%;
            height: 15%;
            position: absolute;
            left: -1%;
            top: -19%;
        }
        /* 缩放标识区域 */
        .resize {
            position: absolute;
            width: 10px;
            height: 10px;
            border-right: 6px solid #b2b2b2;
            border-bottom: 6px solid #b2b2b2;
            right: -6px;
            bottom: -6px;
            overflow: hidden;
            cursor: nw-resize;
        }
    </style>`;
