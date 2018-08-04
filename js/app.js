/*
 * --arrays-- 
 * Create a list that holds all of your cards
 */
const cardArrays = [
    "far fa-gem",
    "fas fa-paper-plane",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "far fa-gem",
    "fas fa-paper-plane",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

const openArray = []; /* containing open cards */
const matchedArray = []; /* containing matched card*/
/* --variables-- */
let started = false; /* when game is not started if started becomes true */
let move = 0; /*number of moves*/
let finalStar; /*final star rating */
let timeCount = 0; /* times variable*/
let timerPtr; /* store the final time*/
let playAgain; /*paly again variable */

const deck = document.querySelector(".deck");
/* no of moves */
let movesContent = document.querySelector(".moves");
/* star rating */
let ratingBoard = document.querySelector(".stars");

/* --functions-- */

/* Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function startTimer() {
    timeCount += 1;
    document.querySelector(".timer").innerHTML = timeCount;
    timerPtr = setTimeout(startTimer, 1000);
}

/* moves logic */
function moves() {
    move++;
    movesContent.innerHTML = move;
    starRating();
}
/* game over logic */
function gameOver() {
    if (matchedArray.length === cardArrays.length) {
        clearTimeout(timerPtr);
        let result = document.querySelector(".popup");
        result.style.display = "block";
        let finalReasult = document.querySelector(".final-result");
        finalReasult.innerHTML = `you did in ${move +1} move and your rating was ${finalStar} and time taken is ${timeCount} seconds`;
        playAgain = document.querySelector(".play-again");
        playAgain.addEventListener("click", function () {
            location.reload(true);
        });

    }
}

//function restart game logic
function restart() {
    let restart = document.querySelector(".restart");
    restart.addEventListener("click", function () {
        //reload the location from the server without cache
        location.reload(true);

    });
}

/* star rating logic */
function starRating() {

    if (move > 8 && move < 12) {
        ratingBoard.innerHTML = `
<i class="fa fa-star"></i> 
<i class="fa fa-star"></i>
<i class="fa fa-star"></i>
<i class="fa fa-star"></i>`;
    }
    if ((move > 12) && (move < 16)) {
        ratingBoard.innerHTML = `
<i class="fa fa-star"></i>
<i class="fa fa-star"></i>
<i class="fa fa-star"></i>`;
    }
    if ((move > 16) && (move < 20)) {
        ratingBoard.innerHTML = `
<i class="fa fa-star"></i>
<i class="fa fa-star"></i>`;
    }
    if (move > 20) {
        ratingBoard.innerHTML = `<i class="fa fa-star"></i>`;
    }
    finalStar = ratingBoard.innerHTML;
}
/* initciate game function  */
function init() {
    for (let i = 0; i < cardArrays.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cardArrays[i]}"></i>`
        deck.appendChild(card);

        //click event

        card.addEventListener("click", function () {
            //enter when the second card is clicked
            if (openArray.length === 1) {
                this.classList.add("open", "show");
                openArray.push(this);
                //if card are matched
                if (this.innerHTML === openArray[0].innerHTML) {
                    this.classList.add("match", "disable");
                    openArray[0].classList.add("match", "disable");
                    // push element to matched array
                    matchedArray.push(this, openArray[0]);
                    // pop the elements from
                    openArray.pop(this);
                    openArray.pop(openArray[0]);
                    gameOver();
                }
                //if card are not matched
                else {
                    this.classList.add("unmatch");
                    openArray[0].classList.add("unmatch");
                    //set time out 250ms 
                    setTimeout(function () {

                        openArray[1].classList.remove("open", "show", "unmatch", "disable");
                        openArray[0].classList.remove("open", "show", "unmatch", "disable");
                        openArray.pop(this);
                        openArray.pop(openArray[0]);
                    }, 250);



                }
                //number of moves played
                moves();
            }
            /* entered when the first card is clicked */
            else {
                this.classList.add("open", "show", "disable");
                openArray.push(this);


            }
            if (!started) {
                started = true;
                timeCount = 0;
                timerPtr = setTimeout(startTimer, 1000);
            }


        });
    }


}
/* function calls */


shuffle(cardArrays);
init();
starRating();
restart();
