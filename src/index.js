const startScreenEl = document.getElementById("startScreen");
const playerValueBtn = document.getElementById("playerValueBtn");
const saveNameBtn = document.getElementById("saveNameBtn");
const playerSelectionEl = document.getElementById("playerSelection");
const clue1El = document.getElementById("clue1");
const clue2El = document.getElementById("clue2");
const clue3El = document.getElementById("clue3");
const clue1text = document.getElementById("clue1text");
const clue2text = document.getElementById("clue2text");
const clue3text = document.getElementById("clue3text");
const answerInputEl = document.getElementById("answerBox");
const randomPlayerEl = document.getElementById("randomPlayer");
const nextPlayerBtn = document.getElementById("nextPlayerBtn");
const playBtn = document.getElementById("playBtn");
const submitAnswerBtn = document.getElementById("submitAnswer");
const pointDisplayEl = document.getElementById("pointDisplay");
const insufficientNamesEl = document.getElementById("insufficientNames");
const answerBoxEl = document.getElementById("answerBox");
const questionContainerEl = document.getElementById("questionContainer");
const selectedPlayerEl = document.getElementById("selectedPlayer");
const playerNamesEl = document.getElementById("playerNames");
//   const player1El = document.getElementById("player1");
//   const player2El = document.getElementById("player2");
//   const player3El = document.getElementById("player3");
//   const player4El = document.getElementById("player4");
//   const resultsEl = document.getElementById("results");
//   const player1scoreEl = document.getElementById("player1score");
//   const player2scoreEl = document.getElementById("player2core");
//   const player3scoreEl = document.getElementById("player3score");
//   const player4scoreEl = document.getElementById("player4score");
//   const winnerEl = document.getElementById("winner");
const guessesLeftEl = document.getElementById("guessesLeft");
const incorrectEl = document.getElementById("incorrect");
const incorrectAnswerRevealEl = document.getElementById(
  "incorrectAnswerReveal"
);
const correctAnswerRevealEl = document.getElementById("correctAnswerReveal");
const revealScoresBtn = document.getElementById("revealScores");
const nameInputBoxes = document.querySelectorAll(".nameInputs");
const remainingGuesses = document.getElementById("remainingGuesses");
const remainingPoints = document.getElementById("remainingPoints");
const wonNextPlayerBtn = document.getElementById("wonNextPlayerBtn");
const lostNextPlayerBtn = document.getElementById("lostNextPlayerBtn");
const wonNextPlayer = document.getElementById("wonNextPlayer");
const lostNextPlayer = document.getElementById("lostNextPlayer");
const youWonEl = document.getElementById("youWon");
const youLostEl = document.getElementById("youLost");

let clues = [clue1El, clue2El, clue3El];
let players;
let names = [];
let currentPlayerIndex = -1;
let score = 0;
let chosenPlayer = [];

const singers = [
  {
    answer: "Beyonce",
    clue1: "Crazy In Love",
    clue2: "Single Ladies",
    clue3: "If I Were A Boy",
  },
  {
    answer: "Eminem",
    clue1: "Chasing Pavements",
    clue2: "Easy On Me",
    clue3: "Stan",
  },
  {
    answer: "Adele",
    clue1: "Without Me",
    clue2: "Mockingbird",
    clue3: "Rolling In The Deep",
  },
  {
    answer: "Queen",
    clue1: "We Will Rock You",
    clue2: "Find Me Somebody To Love",
    clue3: "Bohemian Rhapsody",
  },
  {
    answer: "Oasis",
    clue1: "Cigarettes And Alcohol",
    clue2: "Wonderwall",
    clue3: "Don't Look Back In Anger",
  },
  {
    answer: "Coldplay",
    clue1: "Yellow",
    clue2: "Paradise",
    clue3: "Sky Full Of Stars",
  },
  {
    answer: "Lizzo",
    clue1: "About damn time",
    clue2: "Good As Hell",
    clue3: "Juice",
  },
  {
    answer: "Blur",
    clue1: "Coffee and TV ",
    clue2: "Song 2",
    clue3: "Parklife",
  },
  {
    answer: "Lizzo",
    clue1: "About damn time",
    clue2: "Good As Hell",
    clue3: "Juice",
  },
  {
    answer: "Lizzo",
    clue1: "About damn time",
    clue2: "Good As Hell",
    clue3: "Juice",
  },
];


const nextPlayer = () => {
  // Select the next player
  currentPlayerIndex = getRandomPlayer();
  randomPlayerEl.innerHTML = names[currentPlayerIndex]; //get next name
  youLostEl.classList.add("hide");
  youWonEl.classList.add("hide");
  answerInputEl.value = "";
  clues.forEach((clue) => clue.classList.add("hide"));
  question(); //ask question for next player
};

const getRandomPlayer = () => {
  return Math.floor(Math.random() * names.length);
};

const startGame = () => {
  const getNumOfPlayers = () => {
    const numOfPlayers = document.querySelector('[name="radioGroup"]:checked');
    console.log('num of players: ' + numOfPlayers)
    if (numOfPlayers !== null) {
      players = parseInt(numOfPlayers.value, 10);
      startScreenEl.classList.add("hide");

      playerNamesEl.classList.remove("hide");
      console.log('players: ' + players)

      for (let i = 0; i < players; i++) {
    //  ------ NOT WORKING ------
        nameInputBoxes[i].classList.remove("hide"); //only reveal selected no of boxes
      }
    }
  };

  playerValueBtn.addEventListener("click", getNumOfPlayers);

  const getPlayerNames = (e) => {
    e.preventDefault();
    names = [];

    
    playerNamesEl.classList.remove("hide");

    for (let i = 1; i <= players; i++) {
   //  ------ NOT WORKING ------
      const playerName = document.getElementById("player" + i).value;
      if (playerName.trim() !== "") {
        names.push(playerName); //saves names to array
        console.log('players: ' + players);
        console.log('names: ' + names);
      }
    }
   //  ------ NOT WORKING ------
    if (names.length === players) {
      playerNamesEl.classList.add("hide");
      selectedPlayerEl.classList.remove("hide");
      currentPlayerIndex = getRandomPlayer(); //decides first player
      console.log('current player index' + currentPlayerIndex)
      randomPlayerEl.innerHTML = names[currentPlayerIndex]; //gets player name
    } else {
      insufficientNamesEl.classList.remove("hide");
      insufficientNamesEl.innerHTML = `Please enter ${players} names`;
    }
  };

  saveNameBtn.addEventListener("click", getPlayerNames);

  const question = () => {
    let point = 3;
    let guessesLeft = 3;

    selectedPlayerEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    guessesLeftEl.innerHTML = guessesLeft;
    pointDisplayEl.innerHTML = point;
    //selecting random array from singers
    const currentQuestion = singers[Math.floor(Math.random() * singers.length)];
    const correctAnswer = currentQuestion.answer;
    //first clue
    clue1El.classList.remove("hide");
    clue1text.innerHTML = currentQuestion.clue1;

    const rightAnswer = () => {
        questionContainerEl.classList.add("hide");
        youWonEl.classList.remove("hide");
        remainingGuesses.innerHTML = guessesLeft;
        remainingPoints.innerHTML = point;
        correctAnswerRevealEl.innerHTML = correctAnswer;
        wonNextPlayer.innerHTML; //next player
        wonNextPlayerBtn.addEventListener("click", nextPlayer);
      };
      
    const wrongAnswer = () => {
        questionContainerEl.classList.add("hide");
        youLostEl.classList.remove("hide");
        incorrectAnswerRevealEl.innerHTML = correctAnswer;
        lostNextPlayer.innerHTML; //next player
        lostNextPlayerBtn.addEventListener("click", nextPlayer);
      };

    console.log("current question: " + currentQuestion);
    console.log("current answer: " + correctAnswer);


    const checkAnswer = () => {
      const answerInput = answerBoxEl.value; //collect players answer
      console.log('answer input: ' + answerInput)

    //   const currentQuestion =
    //     singers[Math.floor(Math.random() * singers.length)];
    //   const correctAnswer = currentQuestion.answer;

      clue1text.innerHTML = currentQuestion.clue1;
      clue2text.innerHTML = currentQuestion.clue2;
      clue3text.innerHTML = currentQuestion.clue3;

      //for loop for clues
      if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log('answer input ' + answerInput)
        console.log('correct answer ' + correctAnswer)
        //push to current player score
        rightAnswer();
      } else {
        //clue loop
        // for (let i = 0; i < 2; i++) {
        // clues[i].classList.remove("hide");
        answerInputEl.value = "";
        clue1El.classList.add("hide");
        incorrectEl.classList.remove("hide");
        clue2El.classList.remove("hide"); //display 2nd clue
        pointDisplayEl.innerHTML = point - 1;
        guessesLeftEl.innerHTML = guessesLeft - 1;

// ----- WORKING UP TO HERE-ish --------

        if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
          console.log("correct");
          //push to current player score
          rightAnswer();

          // } else if (answerInput.toLowerCase() !== correctAnswer.toLowerCase()) {
        } else {
          answerInputEl.value = "";
          clue2El.classList.add("hide");
          incorrectEl.classList.remove("hide");
          clue3El.classList.remove("hide"); //display 3rd clue
          pointDisplayEl.innerHTML = point - 1;
          guessesLeftEl.innerHTML = guessesLeft - 1;

          if (answerInput.toLowerCase() !== correctAnswer.toLowerCase()) {
            // wrongAnswer();
          }
        }
      }
    };
    submitAnswerBtn.addEventListener("click", checkAnswer);
  };
  playBtn.addEventListener("click", question);
};

startGame();
