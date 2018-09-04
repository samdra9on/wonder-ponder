import run from './App';
import Debugger from '../utils/Debugger';

/* eslint-disable no-param-reassign */
run(appContainer => {
    appContainer.innerHTML = `<div style="position: absolute; top: 50px; left: 50px;">
    <canvas id="canvasOne" width="500" height="300">
     Your browser does not support HTML 5 Canvas.
    </canvas>
    <form>
    <input type="button" id="createImageData" value="Export Canvas Image">
    </form>
    </div>`;

    let guesses = 0;
    const message = 'Guess The Letter From a (lower) to z (higher)';
    const letters = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    const today = new Date();
    let letterToGuess = '';
    let higherOrLower = '';
    let lettersGuessed;
    let gameOver = false;

    const theCanvas = document.getElementById('canvasOne');
    const context = theCanvas.getContext('2d');

    function drawScreen() {
        // Background
        context.fillStyle = '#ffffaa';
        context.fillRect(0, 0, 500, 300);
        // Box
        context.strokeStyle = '#000000';
        context.strokeRect(5, 5, 490, 290);

        context.textBaseline = 'top';
        // Date
        context.fillStyle = '#000000';
        context.font = '10px _san';
        context.fillText(today, 150, 10);
        // Message
        context.fillStyle = '#FF0000';
        context.font = '14px Sans-Serif';
        context.fillText(message, 125, 30);
        // Guesses
        context.fillStyle = '#109910';
        context.font = '16px Sans-Serif';
        context.fillText(`Guesses: ${guesses}`, 215, 50);
        // Higher Or Lower
        context.fillStyle = '#000000';
        context.font = '16px Sans-Serif';
        context.fillText(`Higher Or Lower: ${higherOrLower}`, 150, 125);
        // Letters Guessed
        context.fillStyle = '#FF0000';
        context.font = '16px Sans-Serif';
        context.fillText(`Letters Guessed: ${lettersGuessed.toString()}`, 10, 260);
        if (gameOver) {
            context.fillStyle = '#FF0000';
            context.font = '40px Sans-Serif';
            context.fillText('You Got it!', 150, 180);
        }
    }

    function eventKeyPressed(e) {
        if (!gameOver) {
            console.log(`keycode:${e.keyCode}`);
            let letterPressed = String.fromCharCode(e.keyCode);
            letterPressed = letterPressed.toLowerCase();
            guesses += 1;
            lettersGuessed.push(letterPressed);

            if (letterPressed === letterToGuess) {
                gameOver = true;
            } else {
                const letterIndex = letters.indexOf(letterToGuess);
                const guessIndex = letters.indexOf(letterPressed);
                Debugger.log(guessIndex);
                if (guessIndex < 0) {
                    higherOrLower = 'That is not a letter';
                } else if (guessIndex > letterIndex) {
                    higherOrLower = 'Lower';
                } else {
                    higherOrLower = 'Higher';
                }
            }
            drawScreen();
        }
    }

    function createImageDataPressed() {
        const dataURL = theCanvas.toDataURL();
        Debugger.log(`dataURL: ${dataURL}`);
        const w = window.open(
            'about:blank',
            'canavsImage',
            `left=0,top=0,width=${theCanvas.width},height=${
                theCanvas.height
            },toolbar=0,resizable=0`,
        );

        setTimeout(() => {
            // FireFox seems to require a setTimeout for this to work.
            w.document.body.appendChild(w.document.createElement('img')).src = dataURL;
        }, 0);
    }

    function initGame() {
        const letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameOver = false;
        window.addEventListener('keydown', eventKeyPressed, true);
        const formElement = document.getElementById('createImageData');
        formElement.addEventListener('click', createImageDataPressed, false);

        drawScreen();
    }

    initGame();
});
