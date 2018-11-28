import Component from './component';
import h from './my-hyperscript';

const getRandomItemFromArray = list => list[Math.round(Math.random() * (list.length - 1))];

export default class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: ['🕺', '💃', '😀', '🙋‍', '💼', '🕶️️', '👏', '🤳', '🕵️', '👩‍🔧'],
        };

        this.timer = setInterval(() => {
            this.setState({
                list: [...this.state.list, getRandomItemFromArray(this.state.list)],
            });
        }, 1000);
    }

    render(props, state) {
        return h('ul', null, ...state.list.map(item => h('li', null, item)));
    }
}
