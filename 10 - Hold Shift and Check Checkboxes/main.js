let inbox = document.querySelector('.inbox');
let allItems = inbox.querySelectorAll('.item');
let startElem = null;
let check = true;

inbox.addEventListener('click', function(event) {
    let target = event.target.closest('.item');
    
    if(!event.shiftKey) {
        startElem = target;
    }

    if(startElem && event.shiftKey) {
        let startIndex = 0;
        let endIndex = 0;

        allItems.forEach((element, index) => {
            if(element == startElem) {
                startIndex = index;
            }

            if(element == target) {
                endIndex = index;
            }
        });

        checkRange(startIndex, endIndex);
    }
});

function checkRange(start, end) {
    allItems.forEach(function(element, index) {
        if((index > start && index <= end) && end > start) {
            if(check) {
                element.querySelector('input').checked = true;
                
                if(index == end) {
                    check = false;
                }
            } else {
                element.querySelector('input').checked = false;
                
                if(index == end) {
                    check = true;
                }
            }
        }
        
        if((index < start && index >= end) && start > end) {
            if(check) {
                element.querySelector('input').checked = true;
                
                if(index == start - 1) {
                    check = false;
                }
            } else {
                element.querySelector('input').checked = false;
                
                if(index == start - 1) {
                    check = true;
                }
            }
        }
    });
}