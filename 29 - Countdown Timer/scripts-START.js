let timerBtns = document.querySelectorAll('.timer__button');
let counter = document.querySelector('.display__time-left');
let backIn = document.querySelector('.display__end-time');
let custom = document.querySelector('#custom');
let activeTimer;
let currentTime;
let backInTime;

timerBtns.forEach(btn => btn.addEventListener('click', function(event) {
    let target = event.target;

    timer(target.dataset.time);
}));

custom.addEventListener('submit', function(event) {
    event.preventDefault();

    let value = event.target.elements.minutes.value;

    timer(value * 60);
});

function timer(duration) {
    let min = (duration / 60).toFixed(0);
    let sec = duration % 60;

    clearInterval(activeTimer);

    currentTime = new Date().getTime();
    backInTime = new Date(currentTime + (duration * 1000));

    backIn.textContent = `Be Back At ${backInTime.getHours()}:${backInTime.getMinutes()}`;
    
    counter.textContent = `${min}:${sec < 10 ? '0' + sec : sec}`;

    activeTimer = setInterval(function() {
        if(sec == 0 && min > 0) {
            sec = 59;
            min--;
        } else {
            sec--;
        }

        if(min == 0 && sec == 0) {
            clearInterval(activeTimer);
        }

        counter.textContent = `${min}:${sec < 10 ? '0' + sec : sec}`;
    }, 1000);
}