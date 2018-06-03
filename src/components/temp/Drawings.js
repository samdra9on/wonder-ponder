import React from 'react';

export default class Drawings extends React.Component {
    componentDidMount() {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        function drawScreen() {
            // make changes here.
            context.fillStyle = '#aaaaaa';
            context.fillRect(0, 0, 200, 200);
            context.fillStyle = '#000000';
            context.font = '20px _sans';
            context.textBaseline = 'top';
            context.fillText('Canvas!', 0, 0);
        }

        drawScreen();
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: '50px', left: '50px' }}>
                <canvas id="canvas" width="500" height="500">
                    Your browser does not support HTML5 canvas.
                </canvas>
            </div>
        );
    }
}
