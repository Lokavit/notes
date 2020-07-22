/*
 * @Author: Satya
 * @Date: 2020-07-21 19:14:13
 * @Last Modified by: Satya
 * @Last Modified time: 2020-07-22 18:06:57
 * doc:太极的css文件
 */

"use strict";

const TaiChiCSS = `
    <style>
        /* 太极的包裹器 */
        .wrapper{
            width: 300px;
            height: 300px;
            animation: rotation 2s linear infinite;
            position: relative;
            margin: 0 auto;
        }
        .taichi{
            position: absolute;
            width: 0px;
            height: 300px;
            box-shadow: 0 0 100px rgb(238, 234, 11);
            border-left: 150px solid #fff;
            border-right: 150px solid #000;
            border-radius: 100%;
        }
        .taichi:before {
            content: '';
            position: absolute;
            left: -25px;
            top: 50px;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background: #000;
            box-shadow: 0 0 0 50px #fff;
        }
        .taichi:after {
            content: '';
            position: absolute;
            left: -25px;
            top: 200px;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            background: #fff;
            box-shadow: 0 0 0 50px #000;
        }
        /* 太极自转的动画 */
        @keyframes rotation {
            0% {-webkit-transform: rotate(0deg);} 
            25% {-webkit-transform: rotate(90deg);}
            50% {-webkit-transform: rotate(180deg);}
            75% {-webkit-transform: rotate(270deg);}
            100% {-webkit-transform: rotate(360deg);}
        }
    </style>`;
