import App from './App';
import * as helloWorldSrc from '../../public/canvas/images/helloworld.gif';

/* eslint-disable class-methods-use-this */
export default class HelloWorld extends App {
    draw(canvas) {
        const context = canvas.getContext('2d');

        context.fillStyle = '#ffffaa';
        context.fillRect(0, 0, 500, 300);

        context.fillStyle = '#000000';
        context.font = '20px Sans-Serif';
        context.textBaseline = 'top';
        context.fillText('Hello World!', 195, 80);

        const helloWorldImage = new Image();
        helloWorldImage.onload = function onload() {
            context.drawImage(helloWorldImage, 155, 110);
        };
        helloWorldImage.src = helloWorldSrc;

        context.strokeStyle = '#000000';
        context.strokeRect(5, 5, 490, 290);
    }
}
