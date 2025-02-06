let player = document.getElementById('player');
let viewer = document.querySelector('.viewer');
let toggle = player.querySelector('.toggle');
let progress = document.querySelector('.progress');
let filledProgress = progress.querySelector('.progress__filled');
let playBack = document.querySelector('.playbackRate');
let volume = document.querySelector('.volume');

player.addEventListener('click', function(event) {
    let target = event.target;

    if(target.classList.contains('toggle') || target == viewer) {
        playPause(viewer, toggle);
    }

    if(target.classList.contains('backward')) {
        backFor(viewer, target, 'backward');
    }

    if(target.classList.contains('forward')) {
        backFor(viewer, target, 'forward');
    }
});

viewer.addEventListener('timeupdate', function(event) {
    let filled = (viewer.currentTime / viewer.duration) * 100;
    filledProgress.style.flexBasis = filled + '%';
    
    if(filled == 100) {
        toggle.innerHTML = '►';
    }
});

progress.addEventListener('mousedown', function(event) {
    event.preventDefault();

    viewer.currentTime = posToTime(event.clientX, progress, viewer);

    progress.addEventListener('mousemove', onMouseMove);

    function onMouseMove(event) {
        viewer.currentTime = posToTime(event.clientX, progress, viewer);

        progress.addEventListener('mouseup', function() {
            progress.removeEventListener('mousemove', onMouseMove);
        });
    }

    progress.addEventListener('mouseup', function() {
        progress.removeEventListener('mousemove', onMouseMove);
    });
});

playBack.addEventListener('input', function(event) {
    viewer.playbackRate = event.target.value;
});

volume.addEventListener('input', function(event) {
    viewer.volume = event.target.value;
});

function playPause(video, btn) {
    if(video.paused) {
        btn.innerHTML = '| |';
        video.play();
    } else {
        btn.innerHTML = '►'
        video.pause();
    }
}

function backFor(video, btn, direction) {
    let timeframe = btn.dataset.skip;

    if(video.currentTime > Math.abs(timeframe) && direction == 'backward') {
        video.currentTime -= Math.abs(timeframe);
    }

    if(video.duration - video.currentTime > Math.abs(timeframe) && direction == 'forward') {
        video.currentTime += Math.abs(timeframe);
    }
    
    if((video.duration - video.currentTime) < Math.abs(timeframe) && direction == 'forward') {
        video.currentTime = video.duration;
        toggle.innerHTML = '►';
        video.pause();
    }

    if(video.currentTime < Math.abs(timeframe)) {
        video.currentTime = 0;
        toggle.innerHTML = '►';
        video.pause();
    }
}

function posToTime(x, bar, video) {
    let barCoords = bar.getBoundingClientRect();
    let duration = video.duration;
    let rate = duration / barCoords.width;
    let pos = x - barCoords.x;

    return pos * rate;
}