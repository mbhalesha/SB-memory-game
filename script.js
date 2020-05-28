const gameContainer = document.getElementById("game");

let counter1 = 0;
let card2 = "";
let clickNumber = 0;
let sameCard = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the sameCard array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let card1 = event.target;
  // if the number of clicks is <= 2 then do the following
  if (clickNumber <= 2) {
    // check if the counter is less than 2 (that 2 cards haven't been clicked on yet) and if 2 cards haven't been clicked on yet, do the following:
    if (counter1 < 2) {
      // set card1's background color to the color from the class list
      card1.style.backgroundColor = event.target.classList.value;
      // add 1 to the click number
      clickNumber++;
      // if card1's background is not defined, do the following
      if (card1.style.backgroundColor != undefined) {
        // if it's the first guess, set the
        // check if counter is at 0
        if (counter1 === 0) {
          // if it is 0, then set card2 to card 1, add one to the counter, add one to the click number
          card2 = card1;
          counter1++;
          clickNumber++;
          // else, do the following
        } else if (
          // CHECK IF IT'S A MATCH
          // check if card1's background color is set to card2's background color AND counter is more than 0 AND card2 is not card1 (not at the same place)
          card1.style.backgroundColor === card2.style.backgroundColor &&
          counter1 > 0 &&
          card2 !== card1
        ) {
          // if the above is true, then set sameCard to true, counter resets to 0, and clickNumber resets to 0
          sameCard = true;
          counter1 = 0;
          clickNumber = 0;
        } else {
          // IF NOT A MATCH
          // change card1's background color to white and card2's background color to white, reset the counter to 0, reset the clickNumber to 0 --- repeat every 1 second
          setTimeout(function () {
            card1.style.backgroundColor = "white";
            card2.style.backgroundColor = "white";
            counter1 = 0;
            clickNumber = 0;
          }, 1000);
        }
      } else {
        // set card1's background color to the color from the class list, add 1 to the counter, add 1 to the clickNumber
        card1.style.backgroundColor = event.target.classList.value;
        counter1++;
        clickNumber++;
      }
    }
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);
