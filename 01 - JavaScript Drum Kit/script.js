let keys = document.querySelectorAll('.key');
let audios = document.querySelectorAll('audio');

window.addEventListener('keydown', function(event) {
    let keyCode = event.keyCode;
    
    for(let key of keys) {
        if(key.dataset.key == keyCode) {
            highlighter(key);
            playAudio(keyCode);
        }
    }
});

function playAudio(keyCode) {
    for(let audio of audios) {
        if(audio.dataset.key == keyCode) {
            audio.load();
            audio.play();
        }
    }
}

function highlighter(elem) {
    for(let key of keys) {
        if(key == elem) {
            key.classList.add('playing');

            window.onkeyup = function() {
                key.classList.remove('playing');
            }
        } else {
            if(key.classList.contains('playing')) {
                key.classList.remove('playing');
            }
        }
    }
}