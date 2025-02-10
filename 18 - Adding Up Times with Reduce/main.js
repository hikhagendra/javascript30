let videos = [];

for(let video of document.querySelector('.videos').querySelectorAll('li')) {
    videos.push(video);
}

let totalDuration = videos.reduce(function(sum, video, index, array) {
    let duration = video.dataset.time.split(':');

    if(index == array.length - 1) {
        let totalSec = sum + (+duration[0] * 60) + +duration[1];
        let hours = parseInt((totalSec / 60) / 60);
        let minutes = parseInt((totalSec - hours * 60 * 60) / 60);
        let seconds = parseInt(totalSec - (hours * 60 * 60) - (minutes * 60));
        
        return `${hours} ${minutes} ${seconds}`;
    }

    return sum + (+duration[0] * 60) + +duration[1];
}, 0);

console.log(totalDuration);