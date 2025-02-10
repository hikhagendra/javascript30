let hero = document.querySelector('.hero');
let previousPos = null;

hero.addEventListener('pointermove', function(event) {
    let xPos = event.clientX;
    let yPos = event.clientY;
    let text = this.querySelector('h1');
    let textCoords = text.getBoundingClientRect();
    let x1 = xPos - textCoords.x - (textCoords.width / 2);
    let x2 = xPos - textCoords.x - (textCoords.width / 2);
    let y1 = yPos - textCoords.y - (textCoords.height / 2);
    let y2 = yPos - textCoords.y - (textCoords.height / 2);
    let diff = null;
    let xCenter = textCoords.x + (textCoords.width / 2);
    let newXPos = null;
    let newYPos = null;
    
    if(!previousPos) {
        previousPos = event.clientX;
    } else {
        diff = event.clientX - previousPos;
    }

    if(event.clientX < xCenter) {
        newXPos = Math.abs(x2);
        newYPos = x2;
    } else if(event.clientX > xCenter) {
        newXPos = -x2;
        newYPos = +x2;
    }

    text.style.textShadow = `${x1}px ${y1}px 0 rgb(81, 255, 0)`;
    text.style.textShadow += `, ${newXPos}px ${y2}px 0 rgb(0, 60, 255)`;
    text.style.textShadow += `, ${y2}px ${newYPos}px 0 rgb(255, 0, 200)`;
    text.style.textShadow += `, ${-y2}px ${-newYPos}px 0 rgb(2, 255, 255)`;

    previousPos = event.clientX;
});