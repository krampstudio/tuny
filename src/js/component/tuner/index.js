import tunerTemplate from './template.js';
import './style.css';

var states = {
    none : {
        id : 'none',
        desc : 'No song detected'
    },
    far : {
        id : 'far',
        desc :  'Too far from the target note'
    },
    up: {
        id : 'up',
        desc : 'Note up the target, release the string'
    },
    down: {
        id : 'down',
        desc : 'Note down the target, tight the string'
    },
    match : {
        id : 'match',
        desc : 'Note is matching'
    }
};

export default function tunerComponentFactory(){

    return {

        data : {
            note  : 'a',
            state : states.none
        },


        render(node, position = 'beforeend'){
            if( ! (node instanceof HTMLElement) ){
                throw new TypeError('Wrong component container node');
            }
            node.insertAdjacentHTML(position, tunerTemplate(this.data));


            return this;
        }
    };
}
