import stringSelectorTemplate from './template.js';
import './style.css';


export default function stringSelectorComponentFactory(){

    return {

        selectedNote : null,

        selectNote(note){
            if (note && note !== this.selectedNote){
                this.notes.forEach( noteElt => {
                    if(noteElt.dataset.note === note){
                        noteElt.classList.add('active');
                        this.selectedNote = note;

                        if(typeof this.selectNote === 'function'){
                            this.noteChangeCb(note);
                        }

                    } else {
                        noteElt.classList.remove('active');
                    }
                });
            }
            return this;
        },

        onNoteChange( cb ){
            if(typeof cb === 'function'){
                this.noteChangeCb = cb;
            }
            return this;
        },

        render(node, position = 'beforeend'){

            if( ! (node instanceof HTMLElement) ){
                throw new TypeError('Wrong component container node');
            }
            node.insertAdjacentHTML(position, stringSelectorTemplate());

            this.element = node.querySelector('.string-selector');
            this.notes   = this.element.querySelectorAll('[data-note]');

            this.element.addEventListener('click', e => {
                e.preventDefault();

                if(e.target.dataset.note){
                    this.selectNote(e.target.dataset.note);
                }
            });

            return this;
        }
    };
}
