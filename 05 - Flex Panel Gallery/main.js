let panels = document.querySelectorAll('.panel');
let container = document.getElementById('panels');
let upOut = true;
let downOut = true;

container.addEventListener('click', function(event) {
    let target = event.target.closest('.panel');
    
    if(target.classList.contains('open')) {
        slideUp(target.firstElementChild, null);
        slideDown(target.lastElementChild, null);
    } else {
        slideUp(target.firstElementChild, 'in');
        slideDown(target.lastElementChild, 'in');
    }

    target.classList.toggle('open');
});

function slideUp(elem, anim) {
    setTimeout(function() {
        elem.style.marginTop = anim == 'in' ? 0 : -500 + 'px';
        upOut = false;
    }, 700);
}

function slideDown(elem, anim) {
    setTimeout(function() {
        elem.style.marginBottom = anim == 'in' ? 0 : -500 + 'px';
        downOut = false;
    }, 700);
}