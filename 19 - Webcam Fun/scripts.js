const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const controls = document.querySelector('.controls');
const filters = document.querySelector('.filters');
let width = 300;
let height = 0;

navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error(`An error occurred: ${err}`);
    });

video.addEventListener('play', function(event) {
    let vid = event.target;

    (function loop() {
        height = (vid.videoHeight / (vid.videoHeight / width)) - (width / 3);
        vid.setAttribute('width', width);
        vid.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        applyFilters();

        ctx.drawImage(vid, 0, 0, width, height);

        let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = frame.data;

        rgbMinMaxSet(data);

        chromaKey(data);
        
        ctx.putImageData(frame, 0, 0);

        setTimeout(loop, 1000 / 30);
    })();
});

function takePhoto() {
    if(width && height) {
        let data = canvas.toDataURL('image/png', 1.0);

        if(data) {
            snap.play();
            
            let link = document.createElement('a');
            link.download = 'handsome.png';
            link.href = data;

            let img = document.createElement('img');
            img.src = data;
            
            link.append(img);
            strip.append(link);
        }
    }
}

function rgbMinMaxSet(data) {
    let rMin = controls.querySelector('[name="rmin"]').value;
    let rMax = controls.querySelector('[name="rmax"]').value;
    let gMin = controls.querySelector('[name="gmin"]').value;
    let gMax = controls.querySelector('[name="gmax"]').value;
    let bMin = controls.querySelector('[name="bmin"]').value;
    let bMax = controls.querySelector('[name="bmax"]').value;

    for(let i = 0; i < data.length; i+= 4) {
        let r = data[i + 0];
        let g = data[i + 1];
        let b = data[i + 2];

        if(r < rMin) {
            data[i + 0] = rMin;
        }

        if(r > rMax) {
            data[i + 0] = rMax;
        }

        if(g < gMin) {
            data[i + 1] = gMin;
        }

        if(g > gMax) {
            data[i + 1] = gMax;
        }

        if(b < bMin) {
            data[i + 2] = bMin;
        }

        if(b > bMax) {
            data[i + 2] = bMax;
        }
    }
}

function chromaKey(data) {
    let threshold = controls.querySelector('[name="chromaKey"]').value;

    for(let i = 0; i < data.length; i+= 4) {
        let g = data[i + 1];

        if(g > threshold) {
            data[i + 3] = 0;
        }
    }
}

function applyFilters() {
    let blur = filters.querySelector('[name="blur"]').value;
    let brightness = filters.querySelector('[name="brightness"]').value;
    let contrast = filters.querySelector('[name="contrast"]').value;
    let grayscale = filters.querySelector('[name="grayscale"]').value;
    let huerotate = filters.querySelector('[name="huerotate"]').value;
    let invert = filters.querySelector('[name="invert"]').value;
    let opacity = filters.querySelector('[name="opacity"]').value;
    let saturate = filters.querySelector('[name="saturate"]').value;
    let sepia = filters.querySelector('[name="sepia"]').value;

    ctx.filter = `blur(${blur}px) brightness(${brightness}) contrast(${contrast}) grayscale(${grayscale}) hue-rotate(${huerotate}deg) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%)`;
}