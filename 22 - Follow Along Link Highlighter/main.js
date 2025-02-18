let highlighter = document.createElement('span');
highlighter.href = '';
highlighter.classList.add('highlight');
highlighter.style.transform = `translate(0, 0)`;
document.body.append(highlighter);

document.body.addEventListener('mouseover', function(event) {
    let target = event.target;

    if(target.tagName !== 'A') return;

    let elemCoords = target.getBoundingClientRect();

    highlighterPos(elemCoords);
});

function highlighterPos(coords) {
    highlighter.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    highlighter.style.width = coords.width + 'px';
    highlighter.style.height = coords.height + 'px';
}