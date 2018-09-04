import run, { createCanvas } from './App';
import * as helloWorldSrc from '../../public/canvas/images/helloworld.gif';

run(appContainer => {
    const position = {
        top: 50,
        left: 50,
    };
    const canvasContainer = document.createElement('div');
    canvasContainer.style = `position: absolute; top: ${position.top}px; left: ${position.left}px;`;
    appContainer.appendChild(canvasContainer);

    const canvas = createCanvas();
    canvasContainer.appendChild(canvas);

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
});
