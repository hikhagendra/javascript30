let menu = document.querySelector('.cool');
let dropdownBg = document.querySelector('.dropdownBackground');

menu.addEventListener('mouseover', function(event) {
    let target = event.target.closest('li');

    if(target.tagName !== 'LI') return;

    let dropDown = target.querySelector('.dropdown');

    if(!dropDown) return;

    showDropDown(dropDown);

    target.addEventListener('mouseleave', function() {
        hideDropDown(dropDown);
    });
});

function showDropDown(content) {
    content.style.display = 'block';

    let coords = content.getBoundingClientRect();
    
    dropdownBg.style.opacity = '1';
    dropdownBg.style.width = coords.width + 'px';
    dropdownBg.style.height = coords.height + 'px';
    dropdownBg.style.transform = `translate(${coords.left}px, ${coords.top / 1.75}px)`;

    content.style.opacity = '1';
}

function hideDropDown(content) {
    content.style.display = 'none';
    content.style.opacity = '0';
}

menu.addEventListener('mouseleave', function() {
    dropdownBg.style.opacity = '0';
});