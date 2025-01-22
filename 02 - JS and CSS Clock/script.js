let hands = document.querySelectorAll('.hand');

clock();
setInterval(clock, 1000);

function clock() {
    let date = new Date();
    let hours = date.getHours() % 12;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    updateHand(hours, minutes, seconds);
}

function updateHand(hours, minutes, seconds) {
    let degreePerHour = 360 / 12;
    let degreePerMin = 360 / 60;
    let degreePerSec = 360 / 60;

    for(let hand of hands) {
        if(hand.classList.contains('hour-hand')) {
            hand.style.transform = `rotate(${(degreePerHour * hours) + 90}deg)`;
        } else if(hand.classList.contains('min-hand')) {
            hand.style.transform = `rotate(${(degreePerMin * minutes) + 90}deg)`;
        } else if(hand.classList.contains('second-hand')) {
            hand.style.transform = `rotate(${(degreePerSec * seconds) + 90}deg)`;
        }
    }
}