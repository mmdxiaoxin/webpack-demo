import _ from "lodash";
import "./styles/style.css"
import ImageTest from "../assets/image.png"
import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    const testImage = new Image();
    testImage.src = ImageTest;
  
    // 执行这一行需要引入 lodash（目前通过 script 脚本引入）
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    element.appendChild(testImage);
  
    return element;
  }
  
  document.body.appendChild(component());