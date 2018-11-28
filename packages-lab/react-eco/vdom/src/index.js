import h from './my-hyperscript';
import { diff } from './v-dom';
import App from './App';

const render = (vnode, parent) => {
    diff(null, vnode, parent);
};

render(h(App), document.querySelector('#root'));
