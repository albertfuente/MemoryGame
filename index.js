const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
//CORNER CASES
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return; //SO THE REST WONT BE EXECUTED
  if (this === firstCard) return; // REMOVE THE DOUBLE CLICK CASE
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true; //IF THE CARDS HAVE BEEN FLIPED
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

//AFTER EACH ROUND WE HAVE TO SET THE CARD TO NULL
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; //DESTRUCTURING ASSIGNMENT
  [firstCard, secondCard] = [null, null];
}

//SHUFFLE WITH A FLEX PROPERTIE CALLED ORDER, it defaults to 0
//generate ran num to 12
//instead of calling the shuffle function every time:
//wrap in () IMMEDIATELY INVOKE FUNCTION EXPRESSION it executes right after definition
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    //apply the order property
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));






















//CODE NOT REFACTORED

// const cards=document.querySelectorAll(".memory-card");
//
// //a player has to know if it is the first or second card clicked
// let hasFlippedCard=false;
// let firstCard, secondCard;
//
//
// function flipCard(){
//   console.log(this);
//   this.classList.toggle("flip");
//   if(!hasFlippedCard){
//     //first click
//     hasFlippedCard=true;
//     firstCard=this;
//   }else{
//     //second click
//     hasFlippedCard=false;
//     secondCard=this;
//     console.log({firstCard,secondCard});
//     //do cards match? we use data-framework. In order to see the data
//     // we use dataset properties!!!!
//     console.log(firstCard.dataset.framework);
//     console.log(secondCard.dataset.framework);
//     if(firstCard.dataset.framework==secondCard.dataset.framework){
//       //its a match
//       firstCard.removeEventListener("click",flipCard);
//       secondCard.removeEventListener("click",flipCard);
//     }else{
//       setTimeout(function(){
//
//         firstCard.clasList.remove("flip");
//         secondCard.classList.remove("flip");
//
//       },100)
//     }
//
//   }
// }
// cards.forEach(card=>card.addEventListener("click",flipCard));
