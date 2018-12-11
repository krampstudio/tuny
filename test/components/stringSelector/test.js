import test from 'tape';
import xs   from 'xstream';
import { mockDOMSource } from '@cycle/dom';
import { mockTimeSource } from '@cycle/time';
import stringSelector from '../../../src/js/component/stringSelector/index.js';

test('string selector', t => {

    t.plan(1);

    const Time = mockTimeSource();

    const e2Click$       = Time.diagram('-------x-------|');
    const a2Click$       = Time.diagram('---x------x----|');
    const expectedState$ = Time.diagram('0--1---0--1----|');

    const DOM = mockDOMSource({
        '.string[data-picth=e2]': {
            click: e2Click$
        },
        '.string[data-picth=a2]': {
            click: a2Click$
        },
    });

    const selector = stringSelector({
        DOM,
        props: xs.of({
            preset: {
                strings: [{
                    name: 'E',
                    pitch: 'e2',
                    frequency: 82.41
                }, {
                    name: 'A',
                    pitch: 'a2',
                    frequency: 110.0
                }]
            },
            initialString: 0
        })
    });

    const activePosition$ = selector.value.map( state => state.activePosition );

    Time.assertEqual(activePosition$, expectedState$);

    Time.run(t.end.bind(t));
});

