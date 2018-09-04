import modernizr from 'modernizr';

/* eslint-disable no-plusplus */
let canvasCounter = 1;

export default fn => {
    window.addEventListener('load', () => {
        if (!modernizr.canvas) {
            return;
        }

        const appContainer = document.getElementById('appContainer');
        fn(appContainer);
    });
};

export function createCanvas(options = {}) {
    const { width = 500, height = 300 } = options;
    const canvas = document.createElement('canvas');
    canvas.innerHTML = 'Your browser does not support HTML5 Canvas.';
    canvas.setAttribute('id', `canvas-${canvasCounter++}`);
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);

    return canvas;
}
