
import stringSelectorComponentFactory from './component/stringSelector/index.js';
import tunerComponentFactory from './component/tuner/index.js';

import analyserFactory from './analyser.js';

import '../css/app.css';


const container = document.querySelector('main');



const stringSelector = stringSelectorComponentFactory().render(container);
const tunerComponent = tunerComponentFactory().render(container);


stringSelector
    .onNoteChange( note => {


    })
    .selectNote('a');

//tunerComponentFactory({ foo : 'bar' }).init();

//analyserFactory();
