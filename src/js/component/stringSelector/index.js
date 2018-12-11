import isolate from '@cycle/isolate';
import { div, ul, li, a } from '@cycle/dom';

function intent(domSource){
    const changeString$ =  domSource
        .select('.string').events('click')
        .map( ev => ev.target.dataset.position);

    return { changeString$ };
}

function model(actions, props$){

    const { changeString$ } = actions;

    return props$.map( props => {

        return changeString$
            .startWith(props.initialString)
            .map( activePosition => ({ activePosition, preset : props.preset }));

    }).flatten().remember();
}

function view(state$){
    return state$.map( state => (
        div(
            ul(
                state.preset.map( (string, position) => (
                    li(
                        a({
                            attrs : {
                                href : '#',
                                'data-pitch' : string.pitch,
                                'data-frequency' : string.frequency,
                                'data-position' : position,
                                class : ['string', parseInt(state.activePosition, 10) === position ? 'active' : ''].join(' ')
                            }
                        },
                        string.name)
                    )
                ))
            )
        )
    ));
}

function stringSelector(sources){
    const actions = intent(sources.DOM);
    const state$  = model(actions, sources.props);
    const vdom$   = view(state$);

    return {
        DOM: vdom$,
        value: state$
    };
}

export default isolate(stringSelector, '.string-selector');

