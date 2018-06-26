
//integrate from https://github.com/cwilso/PitchDetect/blob/master/js/pitchdetect.js
export default function analyserFactory(){

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    return navigator.mediaDevices.getUserMedia({ audio : true }).then( stream => {

        let count = 1;
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);



        function process(){
            analyser.fftSize = 2048;
            const buffer = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteTimeDomainData(buffer);
            document.querySelector('.visualize').innerHTML = JSON.stringify(buffer, null, ' ');

            //if(count++ <){
                window.requestAnimationFrame(process);
            //}
        }

        //process();
    });
};






