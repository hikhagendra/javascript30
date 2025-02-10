let list = document.getElementById('bands');

const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

bands.sort(function(a, b) {
    let keys = ['A', 'An', 'The'];

    a = slicer(a, keys);
    b = slicer(b, keys);

    if(a < b) return -1;

    if(a == b) return 0;

    if(a > b) return 1;
});

bands.forEach(function(elem) {
    let li = document.createElement('li');
    li.textContent = elem;
    list.append(li);
});

function slicer(str, keys) {
    let slicedStr = str;
    keys.forEach(function(key) {
        if(str.startsWith(key + ' ')) {
            slicedStr = str.slice(key.length + 1);
        }
    });

    return slicedStr;
}