let root = document.querySelector(':root');
let rootStyle = getComputedStyle(root);
let controls = document.querySelector('.controls');

controls.addEventListener('input', function(event) {
    let target = event.target;

    if(target.tagName !== 'INPUT') return;

    if(target.id == 'spacing') {
        root.style.setProperty('--spacing', target.value + target.dataset.sizing);
    } else if(target.id == 'blur') {
        root.style.setProperty('--blur', target.value + target.dataset.sizing);
    } else if(target.id == 'base') {
        root.style.setProperty('--color', target.value);
    }
});
