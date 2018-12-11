import isolate from '@cycle/isolate';
import { section, div, p } from '@cycle/dom';

//import './style.css';

function intent(domSource){

    return {  };
}

function model(actions, props$){

    const {  } = actions;

    return props$.map( props => props.preset[props.activePosition] );
}

function view(state$){

    return state$.map( state => {
        console.log(name);
        return section([
            div('.note', { 'data-state' : 'none'}, state.name.toUpperCase()),
            p( '0' )
        ])
    });
}

function tuner(sources){
    const actions = intent(sources.DOM);
    const state$  = model(actions, sources.props);
    const vdom$   = view(state$);

    return {
        DOM: vdom$
    };
}

export default isolate(tuner, '.tuner');

