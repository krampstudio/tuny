import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver, div } from '@cycle/dom';

import stringSelector from './component/stringSelector';
import tuner from './component/tuner';

import presets from './data/presets.js';
//import '../css/app.css';

//source = input (read) effect
//sink   = output (write) effect

function main(sources) {

    const props$  = xs.of({
        preset : presets.e.strings,
        initialString : 0
    });

    const stringSources = {
        ...sources,
        props:  props$
    };

    const stringSelectorSinks = stringSelector(stringSources);
    const stringSelectorVDom$ = stringSelectorSinks.DOM;
    const stringSelectorValue$ = stringSelectorSinks.value;

    const tunerSources = {
        ...sources,
        props: stringSelectorValue$
    };

    const tunerSinks = tuner(tunerSources);

    const vdom$ = xs
        .combine(stringSelectorVDom$, stringSelectorValue$, tunerSinks.DOM)
        .map( ([stringSelectorDom, value, tunerDom]) =>
            div([
                stringSelectorDom,
                div(JSON.stringify(value)),
                tunerDom
            ])
        );

    return {
        DOM: vdom$
    };
}


run(main, {
    DOM: makeDOMDriver('body > main')
});

