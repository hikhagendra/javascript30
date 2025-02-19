const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const pitchButton = document.querySelector('[name="pitch"]')
const rateButton = document.querySelector('[name="rate"]');
let synth = window.speechSynthesis;

function populateVoiceList() {
    voices = synth.getVoices();

    voices.forEach(function(voice) {
        if(voice.lang == 'en-US' || voice.lang == 'en-IN') {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voicesDropdown.append(option);
        }
    });
}

populateVoiceList();

function readTheText(event) {
    if(synth.paused) {
        synth.resume();
        return;
    }
    
    if(synth.speaking && event.type == 'click') {
        return;
    }

    synth.cancel();

    options.forEach(function(option) {
        msg[option.name] = option.value;
    });

    let selectedVoice = voicesDropdown.selectedOptions[0].getAttribute('data-name');

    voices.forEach(function(voice) {
        if(voice.name == selectedVoice) {
            msg.voice = voice;
        }
    });

    synth.speak(msg);
}

speakButton.addEventListener('click', readTheText);

stopButton.addEventListener('click', function() {
    synth.pause();
});

voicesDropdown.addEventListener('change', readTheText);
pitchButton.addEventListener('change', readTheText);
rateButton.addEventListener('change', readTheText);