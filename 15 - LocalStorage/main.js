const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];
let counter = 1;

addItems.addEventListener('click', function(event) {
    event.preventDefault();

    if(event.target.type !== 'submit') return;

    if(this[0].value == '') return;

    items.push({
        name: this[0].value,
        checked: false
    });

    displayItem(this[0].value, false);

    saveToLocal(items);

    this[0].value = '';
});

itemsList.addEventListener('click', function(event) {
    if(event.target.tagName == 'INPUT') return;

    let target = event.target.closest('li');
    let pos = 0;

    itemsList.querySelectorAll('li').forEach((item, index) => {
        if(target === item) {
            pos = index;
        }
    });

    if(items[pos].checked) {
        items[pos].checked = false;
    } else {
        items[pos].checked = true;
    }

    if(event.target.tagName == 'LI') {
        if(target.firstElementChild.checked) {
            target.firstElementChild.checked = false;
        } else {
            target.firstElementChild.checked = true;
        }
    }

    saveToLocal(items);
});

function displayItem(name, check) {
    let li = document.createElement('li');
    let label = document.createElement('label');
    let input = document.createElement('input');

    input.type = 'checkbox';
    input.id = `item${counter}`;
    input.checked = check;

    label.setAttribute('for', `item${counter}`);
    label.textContent = name;

    li.append(input);
    li.append(label);
    itemsList.append(li);

    counter++;
}

function saveToLocal(items) {
    let strItems = JSON.stringify(items);

    localStorage.setItem('items', strItems);
}

function getFromLocal() {
    let locItems = JSON.parse(localStorage.getItem('items'));

    itemsList.innerHTML = '';

    if(!locItems) return;

    locItems.forEach(item => {
        items.push({
            name: item.name,
            checked: item.checked
        });

        displayItem(item.name, item.checked);
    });
}

getFromLocal();