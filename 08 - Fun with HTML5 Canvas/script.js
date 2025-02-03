const canvas = document.getElementById('draw');
let palate = [255, 0, 0];
let pointer = [1, 0, 2, 1, 0, 2];
let increase = true;
let increaseRad = false;
let i = 0;
let radius = 50;

if(canvas.getContext) {
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function(event) {
        canvas.onmousemove = draw;

        canvas.onmouseup = function() {
            canvas.onmousemove = null;
        }
    });

    function draw(event) {
        let xPos = event.clientX;
        let yPos = event.clientY;
        let start = 0;
        let end = 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(xPos, yPos, radiusController(1, 50), start, end);
        ctx.fillStyle = `rgb(${colorChanger()})`;
        ctx.fill();

        console.log('Test' + colorChanger());
        console.log('Test' + radiusController());
    }
}

function colorChanger() {
    if(i < pointer.length) {
        // debugger;
        if(palate[pointer[i]] == 0) {
            increase = true;
        } else if(palate[pointer[i]] == 255) {
            increase = false;
        }

        if(increase) {
            palate[pointer[i]] = palate[pointer[i]] + 3;

            if(palate[pointer[i]] == 255) {
                i++;
            }
        } else {
            palate[pointer[i]] = palate[pointer[i]] - 3;

            if(palate[pointer[i]] == 0) {
                i++;
            }
        }

        if(i == 6) {
            i = 0;
        }
    }

    return `${palate[0]}, ${palate[1]}, ${palate[2]}`;
}

function radiusController(min, max) {
    if(radius == max) {
        increaseRad = false;
    } else if(radius == min) {
        increaseRad = true;
    }

    if(increaseRad && radius <= max) {
        radius = radius + 0.5;
    } else if(radius >= min) {
        radius = radius - 0.5;
    }

    return radius;
}