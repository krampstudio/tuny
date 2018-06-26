export default function tunerTemplate(data = { note : 'e', state : { id : 'none', desc : '' }}) {

    return `
        <section class="tuner">
            <div class="note" data-state="${data.state.id}">${data.note.toUpperCase()}</div>
            <p>${data.state.desc}</p>
        </section>
    `;
}
