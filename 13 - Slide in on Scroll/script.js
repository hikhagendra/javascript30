function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function imageSlide() {
    for(let img of document.querySelectorAll('img')) {
        if(isVisible(img)) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    }
}

function isVisible(elem) {
    let from = window.pageYOffset;
    let to = window.pageYOffset + (document.documentElement.clientHeight);
    let offsetBottom = elem.offsetTop + elem.offsetHeight;
    let onScreen = (elem.offsetTop > from && elem.offsetTop < to) || (offsetBottom > from && offsetBottom < to);

    if(onScreen) {
        return true;
    } else {
        return false;
    }
}

let processScroll = debounce(imageSlide);

window.addEventListener('scroll', processScroll);