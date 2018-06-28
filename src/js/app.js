
import stringSelectorComponentFactory from './component/stringSelector/index.js';
import tunerComponentFactory from './component/tuner/index.js';
import '../css/app.css';


/**
 * Service worker
 */
if ('serviceWorker' in window.navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
        console.error('Registration failed with ' + error);
    });
}

/**
 * Entry point
 */
function main(){

    const container = document.querySelector('main');
    const stringSelector = stringSelectorComponentFactory().render(container);
    const tunerComponent = tunerComponentFactory().render(container);

    stringSelector
        .onNoteChange( note => {

            tunerComponent.setNote(note.slice(0, 1));

        })
        .selectNote('a');
}

main();
