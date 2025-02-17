window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let words = document.querySelector('.words');
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

let p = document.createElement('p');
words.append(p);

recognition.addEventListener('result', function(event) {
    words.lastElementChild.textContent = event.results[0][0].transcript;

    if(event.results[0].isFinal) {
        let newP = document.createElement('p');
        words.append(newP);
        recognition.stop();
    }
});

recognition.addEventListener('end', function(event) {
    recognition.start();
});

recognition.start();