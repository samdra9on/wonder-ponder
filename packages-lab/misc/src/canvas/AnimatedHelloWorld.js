import run from './App';
import bgSrc from '../../public/canvas/images/html5bg.jpg';

run(appContainer => {
    const alpha = 0;
    const fadeIn = true;
    const text = 'Hello World';
    const helloWorldImage = new Image();
    helloWorldImage.src = bgSrc;
});
