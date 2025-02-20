let slider = document.querySelector('.items');
let fromPos;
let prevPos = 0;
let moveDiff = 0;
let scrollAmt = slider.scrollLeft;

slider.addEventListener('mousedown', function(event) {
    fromPos = event.clientX;

    slider.addEventListener('mousemove', slideItems);

    function slideItems(e) {
        if(!prevPos) {
            prevPos = e.clientX;
        } else {
            moveDiff = prevPos - e.clientX;
            prevPos = e.clientX;
        }

        slider.scrollLeft += moveDiff;
    }

    document.onmouseup = function() {
        slider.removeEventListener('mousemove', slideItems);
        prevPos = 0;
    }
});