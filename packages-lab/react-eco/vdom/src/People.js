import Component from './Component';
import h from './my-hyperscript';

const PEOPLE = ['🕺', '💃', '😀', '🙋‍', '💼', '🕶️️', '👏', '🤳', '🕵️', '👩‍🔧'];
const DIRECTIONS = {
    ADD: 1,
    REMOVE: 2,
};
const getRandomItemFromArray = list => list[Math.round(Math.random() * (list.length - 1))];

export default class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [].concat(PEOPLE),
            direction: DIRECTIONS.REMOVE,
        };

        this.timer = setInterval(() => {
            const { list, direction } = this.state;
            if (direction === DIRECTIONS.REMOVE) {
                if (list.length > 0) {
                    const newList = list.slice(0, list.length - 1);
                    this.setState({
                        list: newList,
                        direction: newList.length === 0 ? DIRECTIONS.ADD : direction,
                    });
                }
            } else if (direction === DIRECTIONS.ADD) {
                if (list.length < PEOPLE.length) {
                    const item = getRandomItemFromArray(PEOPLE);
                    const newList = [].concat(list, item);
                    this.setState({
                        list: newList,
                        direction: newList.length === PEOPLE.length ? DIRECTIONS.REMOVE : direction,
                    });
                }
            }
        }, 1000);
    }

    render(props, state) {
        return h('ul', null, ...state.list.map(item => h('li', null, item)));
    }
}
