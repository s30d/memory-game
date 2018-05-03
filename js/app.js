/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 let moveCounter = 0;
 let seconds = 0;
 let minutes = 0;
 let timerRun = false;
 let checkArray = [];
 let win = 0;
 let card = document.getElementsByClassName("card");
 let cards = [...card];
 let deck = document.querySelector(".deck");
 let stars = document.querySelector(".stars");
 let firstStar = document.getElementById("3rd");
 let secondStar = document.getElementById("2nd");
 let moves = document.querySelector(".moves");
 let restart = document.querySelector(".restart");
 let time = document.querySelector(".timer");



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the winMsg score (put this functionality in another function that you call from this one)
 */
 function shuffled() {

     var shuffling =  shuffle(cards);
     deck.innerHTML = "";
     for (var i = 0; i < shuffling.length; i++) {
       [].forEach.call(cards, function(i){
         deck.appendChild(i);
       });
         cards[i].classList.remove("open");
         cards[i].classList.remove("show");
         cards[i].classList.remove("match");
         checkArray = [];
         minutes = 0;
         timerRun = false;
         win = 0;
         moveCounter = 0;
         seconds = 0;


         time.textContent = "0" + minutes + " " + ":" + " " + "0" + seconds; 
         moves.textContent = moveCounter;
         firstStar.style.color = "#ffd700";
         secondStar.style.color = "#ffd700";
     }
 };

 restart.addEventListener("click",shuffled);

 //time counter
  setInterval (function timer() {

     if (timerRun === true) {
         seconds++;
     if (seconds >= 60) {
         seconds = 0;
         minutes++;
         }
     time.textContent = "0" + minutes + " " + ":" + " " + "0" + seconds;

     if (seconds >= 10) {
         time.textContent = "0" + minutes + " " + ":" + " " + seconds;
     }

     if (minutes >= 10) {
         time.textContent =  minutes + " " + ":" + " " + seconds;
     }
  }

 }, 1000);

 //run time , count moves and start game
 for (var i = 0; i < cards.length; i++) {
     card = cards[i];
     card.addEventListener("click",test);
 };



 function test() {
     let check = checkArray.push(this);
         //console.log(); //for tests

         //start timer
         timerRun = true;

         //count moves and rank
         if (checkArray.length === 2) {
            // debugger; //for debug

             for(var i = 0; i < cards.length; i++)
              {
                  var Obj =  cards[i];
                 Obj.classList.add("stop");
              }
             //moves
             moveCounter++;
             moves.textContent = moveCounter;
             //rank
             if (moveCounter == 11) {
             firstStar.style.color = "#000";
             }
             else if (moveCounter == 16) {
             secondStar.style.color = "#000";
             }
             //check cards
         if (checkArray[0].type === checkArray[1].type) {
             matchCard();
         } else {
             unmatchCard();
         }
         }

     };

 //display card
 for (var i = 0; i < cards.length; i++) {
     card = cards[i];
     card.addEventListener("click", function() {
         this.classList.add("show");
         this.classList.add("open");
     });
 };

 //match and unmatch Cards
 function matchCard() {
   checkArray[0].classList.add("match");
   checkArray[1].classList.add("match");
   checkArray[0].classList.remove("show");
   checkArray[0].classList.remove("open");
   checkArray[1].classList.remove("show");
   checkArray[1].classList.remove("open");
   checkArray = [];
   win++;
   winMsg();
     // to delay opening card
      setTimeout(function(){
                //debugger;//for debug
      for( var i = 0 ; i < cards.length ; i++  ) {
             var Obj =  cards[i];
             Obj.classList.remove("stop");
          }
         }, 1000);
 };


 function unmatchCard() {
     checkArray[0].classList.add("wrong");
     checkArray[1].classList.add("wrong");
     setTimeout(function () {
       checkArray[0].classList.remove("show");
       checkArray[0].classList.remove("open");
       checkArray[0].classList.remove("wrong");
       checkArray[1].classList.remove("show");
       checkArray[1].classList.remove("open");
       checkArray[1].classList.remove("wrong");
       checkArray = [];
     },1000);
      setTimeout(function(){
      for( var i = 0 ; i < cards.length ; i++  ) {
             var Obj =  cards[i];
             Obj.classList.remove("stop");
          }
         }, 1000);
 };


 //win message
 function winMsg(){

   if (win == 8) {
       timerRun = false;

       swal({
         allowEscapeKey: false,
         allowOutsideClick: false,
         title: 'Congratulations! You Won!',
         text: 'With ' + moveCounter + ' Moves in ' + minutes + ' minutes and ' + seconds + ' Seconds.\n Woooooo!',
         type: 'success',
         confirmButtonColor: '#02ccba',
         confirmButtonText: 'Play again!'
       }).then(function (isConfirm) {
     		if (isConfirm) {
            shuffled();
     		}
     	})

   }

 };
