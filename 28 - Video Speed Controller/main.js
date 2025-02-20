let video = document.querySelector('.flex');
let speed = document.querySelector('.speed');
let bar = document.querySelector('.speed-bar');
let speedCoords = speed.getBoundingClientRect();
let playbackRate = 1;

speed.addEventListener('mousemove', function(event) {
    let distance = event.clientY - speedCoords.top;
    let barHeight = distance * (100 / speedCoords.height);
    playbackRate = (distance * (40 / speedCoords.height)) / 10;

    bar.style.height = `${barHeight}%`;
    bar.textContent = `${playbackRate.toFixed(1)}×`;

    video.playbackRate = playbackRate < 0.1 ? 0.1 : playbackRate;
});