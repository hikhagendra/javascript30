let nav = document.querySelector('#main');
let logo = nav.querySelector('.logo');
let navDefPos;

window.addEventListener('scroll', function(event) {
    let navCoords = nav.getBoundingClientRect();

    if(!navDefPos) {
        navDefPos = navCoords.top;
    }

    if(navDefPos <= document.documentElement.scrollTop && !nav.classList.contains('sticky')) {
        nav.classList.add('sticky');
    }

    if(navDefPos > document.documentElement.scrollTop && nav.classList.contains('sticky')) {
        nav.classList.remove('sticky');
    }
});