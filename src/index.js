const startScreenEl = document.getElementById("startScreen");
const playerValueBtn = document.getElementById("playerValueBtn");
const saveNameBtn = document.getElementById("saveNameBtn");
const playerSelectionEl = document.getElementById("playerSelection");
const clueEl = document.getElementById("clue");
const cluetext = document.getElementById("cluetext");
const answerInputEl = document.getElementById("answerBox");
const randomPlayerEl = document.getElementById("randomPlayer");
const nextPlayerBtn = document.getElementById("nextPlayerBtn");
const playBtn = document.getElementById("playBtn");
const submitAnswerBtn = document.getElementById("submitAnswer");
const pointDisplayEl = document.getElementById("pointDisplay");
const insufficientNamesEl = document.getElementById("insufficientNames");
const insufficientNumEl = document.getElementById("insufficientNum");
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

let players;
let names = [];
let currentPlayerIndex = -1;
let score = 0;
let chosenPlayer = [];



const getRandomPlayer = () => {
  return Math.floor(Math.random() * players);
};

const startGame = () => {
  const getNumOfPlayers = (e) => {
    e.preventDefault();
    const numOfPlayers = document.querySelector('[name="radioGroup"]:checked');
    console.log("num of players: " + numOfPlayers);
    if (numOfPlayers !== null) {
      players = parseInt(numOfPlayers.value);
      startScreenEl.classList.add("hide");

      playerNamesEl.classList.remove("hide");
      console.log("players: " + players);

      for (let i = 0; i < players; i++) {
        nameInputBoxes[i].classList.remove("hide"); //reveal name boxes for correct amount of players
      }
    } else {
      insufficientNumEl.classList.remove("hide");
      insufficientNumEl.innerHTML = 'Please select amount';
    }
  };

  playerValueBtn.addEventListener("click", getNumOfPlayers);

  const getPlayerNames = (e) => {
    e.preventDefault();

    for (let i = 1; i <= players; i++) {
      const playerName = document.getElementById("player" + i + "name").value; //iterate over playername inputs
      if (playerName !== "") {
        names.push(playerName); //saves names to array
        console.log(playerName);
        playerNamesEl.classList.add("hide");
        selectedPlayerEl.classList.remove("hide");
        currentPlayerIndex = getRandomPlayer(); //decides first player
        console.log("current player index" + currentPlayerIndex);
        randomPlayerEl.innerHTML = names[currentPlayerIndex]; //gets player name
      } else {
        insufficientNamesEl.classList.remove("hide");
        insufficientNamesEl.innerHTML = `Please enter ${players} names`;
      }
    }
    console.log(names.length + players);
  };

  saveNameBtn.addEventListener("click", getPlayerNames);

  const question = () => {
    let point = 3;
    let guessesLeft = 3;

    selectedPlayerEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    guessesLeftEl.innerHTML = guessesLeft;
    pointDisplayEl.innerHTML = point;
    const currentQuestion = singers[Math.floor(Math.random() * singers.length)]; //selecting random array from singers
    const correctAnswer = currentQuestion.answer;
    clueEl.classList.remove("hide");
    cluetext.innerHTML = currentQuestion.clue1; // display first clue

    const nextPlayer = () => {
      // Select the next player
      currentPlayerIndex = getRandomPlayer();
      randomPlayerEl.innerHTML = names[currentPlayerIndex]; //get next name
      youLostEl.classList.add("hide");
      youWonEl.classList.add("hide");
      answerInputEl.value = "";
      question(); //ask question for next player
    };

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

      //   const currentQuestion =
      //     singers[Math.floor(Math.random() * singers.length)];
      //   const correctAnswer = currentQuestion.answer;

      if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log("answer input " + answerInput);
        console.log("correct answer " + correctAnswer);
        //push to current player score
        rightAnswer();
      } else {
        answerInputEl.value = "";
        cluetext.innerHTML = "";
        cluetext.innerHTML = currentQuestion.clue2; //next clue
        incorrectEl.classList.remove("hide");
        pointDisplayEl.innerHTML = point - 1;
        guessesLeftEl.innerHTML = guessesLeft - 1;

              // -------------------- WORKING UP TO HERE-ish --------------------

        if (answerInput.toLowerCase() === correctAnswer.toLowerCase()) {
          console.log("correct");
          //push to current player score
          rightAnswer();

          // } else if (answerInput.toLowerCase() !== correctAnswer.toLowerCase()) {
        } else {
          answerInputEl.value = "";
          incorrectEl.classList.remove("hide");
          cluetext.innerHTML = "";
          cluetext.innerHTML = currentQuestion.clue3;
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
