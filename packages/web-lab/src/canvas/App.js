import modernizr from 'modernizr';
import Debugger from '../utils/Debugger';

/* eslint-disable no-plusplus, class-methods-use-this */
export default class App {
    static counter = 1;

    constructor(options = {}) {
        this.options = options;
    }

    createCanvas() {
        const {
            position = {
                top: 50,
                left: 50,
            },
            canvasSize = {
                width: 500,
                height: 300,
            },
        } = this.options;

        const appContainer = document.getElementById('appContainer');

        const canvasContainer = document.createElement('div');
        canvasContainer.style = `position: absolute; top: ${position.top}px; left: ${
            position.left
        }px;`;
        appContainer.appendChild(canvasContainer);

        const canvas = document.createElement('canvas');
        canvas.innerHTML = 'Your browser does not support HTML5 Canvas.';
        canvas.setAttribute('id', `canvas-${App.counter++}`);
        canvas.setAttribute('width', `${canvasSize.width}`);
        canvas.setAttribute('height', `${canvasSize.height}`);
        canvasContainer.appendChild(canvas);

        return canvas;
    }

    start() {
        window.addEventListener('load', () => {
            if (!modernizr.canvas) {
                return;
            }

            const canvas = this.createCanvas();
            Debugger.log('Drawing canvas');
            this.draw(canvas);
        });
    }

    /* eslint-disable no-unused-vars */
    draw(canvas) {}
    /* eslint-enable no-unused-vars */
}
