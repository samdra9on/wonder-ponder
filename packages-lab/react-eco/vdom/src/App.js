import h from './hyperscript';

const App = props => {
    const { list } = props;
    return h(
        'div',
        { class: 'app' },
        h('h1', null, 'Simple vDOM'),
        h('ul', null, ...list.map(item => h('li', null, item))),
    );
};

export { App as default };
