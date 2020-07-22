/*
 * @Author: Satya
 * @Date: 2020-07-22 17:10:59
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-22 17:55:02
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
            z-index: 10;
            opacity: 0;
            pointer-events: none;
        }
        .modal {
            position: fixed;
            width: auto;
            min-width: 360px;
            z-index: 100;
            background: white;
            border-radious: 3px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.26);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease-out;
        }
        .modal_position_common{
            top: 10vh;
            left: 25%;
        }
        .modal_posistion_video{
            right: 12%; 
            bottom: 1%;
        }
        header {
            padding: 0.5rem;
            border-bottom: 1px solid #ccc;
            position: relative;
        }
        #close {
            position: absolute;
            right: 3%;
            cursor: pointer;
        }
        #close:hover{
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

        #main {
            padding: 0.5rem;
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
    </style>`;
