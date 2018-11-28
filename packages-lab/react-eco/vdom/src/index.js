import { renderComponent } from './v-dom';
import App from './App';

const root = document.querySelector('#root');
renderComponent(new App(), root);
