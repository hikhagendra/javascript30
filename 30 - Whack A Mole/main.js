const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

function startGame() {
    let score = 0;

    scoreBoard.textContent = score;

    let duration = 700;
    let hideTime = 700;

    let timer = setInterval(function() {
        let whichMole = Math.floor((moles.length * Math.random()) + 1);

        holes.forEach(hole => {
            if(hole.classList.contains(`hole${whichMole}`)) {
                hole.querySelector('.mole').style.top = 0;

                setTimeout(function() {
                    hole.querySelector('.mole').style.top = '100%';
                }, hideTime);
            }
        });

        duration = Math.round((Math.random() * 1000) + 1000);
    }, duration);

    setTimeout(function() {
        clearInterval(timer);
    }, 7000);

    // Count score on click
    moles.forEach(mole => {
        mole.onclick = function() {
            score++;

            scoreBoard.textContent = score;
        };
    });
}