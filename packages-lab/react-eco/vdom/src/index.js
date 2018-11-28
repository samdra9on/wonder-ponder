import App from './App';
import { renderNode } from './renderNode';

const root = document.getElementById('root');
const getRandomItemFromArray = list => list[Math.round(Math.random() * (list.length - 1))];

let currentApp;
const render = state => {
    const newApp = renderNode(App(state));
    if (currentApp) {
        root.replaceChild(newApp, currentApp);
    } else {
        root.appendChild(newApp);
    }
    currentApp = newApp;
};
const state = {
    list: ['🕺', '💃', '😀', '🙋‍', '💼', '🕶️️', '👏', '🤳', '🕵️', '👩‍🔧'],
};
render(state);
setInterval(() => {
    state.list = [...state.list, getRandomItemFromArray(state.list)];
    render(state);
}, 1000);
