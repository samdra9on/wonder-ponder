import Component from './Component';
import h from './my-hyperscript';
import People from './People';

export default class App extends Component {
    render() {
        return h('div', { class: 'app' }, h('h1', null, 'Simple vDOM'), h(People));
    }
}
