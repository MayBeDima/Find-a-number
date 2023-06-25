import { playFindANumber } from './scripts-module/game-logic.js';
import { Timer } from "./scripts-module/utils.js";
import { fillResultPage, fillAllTimePage } from './scripts-module/result-pages.js';
import { changeLocalStorage } from './scripts-module/game-control.js';
import { reset } from './scripts-module/game-control.js';
import { soundMode } from './scripts-module/sound-mode.js';
import { timerGame } from './scripts-module/game-logic.js';

// PAGES
const startGamePage = document.querySelector('.start-page');
const trainingPage = document.querySelector('.training-page');
const pregameTimerPage = document.querySelector('.pregame-timer-page');
const gamePage = document.querySelector('.game-page');
const resultGamePage = document.querySelector('.result-game-page');
const resultAllTimePage = document.querySelector('.result-alltime-page');
const gameControls = document.querySelector('.game-controls');
const rules = document.querySelector('.rules');
const problems = document.querySelector('.problems');

// CONTROLS BTNS
const soundBtn = document.querySelector('.sound-btn');
const problemsBtn = document.querySelector('.problems-btn');
const rulesBtn = document.querySelector('.rules-btn');
const closeProblemBtn = document.querySelector('.close-problem-btn');
const closeRulesBtn = document.querySelector('.close-rules-btn');

function pagesNavigation() {

  changeLocalStorage();

  // START GAME PAGE
  const startGamePageBtn = document.querySelector('.start-btn');
  startGamePageBtn.addEventListener('click', () => {
    soundMode.clickSound();
    startGamePage.classList.add('none');
    trainingPage.classList.remove('none');
  })

  //  PRE-GAME TIMER PAGE

  const timerElement = document.querySelector('.pregame-timer');
  const startTimerValue = 3;
  timerElement.innerHTML = startTimerValue;

  const fromTimerToGame = () => {
    pregameTimerPage.classList.add('none');
    gamePage.classList.remove('none');
    gameControls.classList.remove('none');
    timerElement.innerHTML = startTimerValue;
    playFindANumber();
  }

  class PreGameTimer extends Timer {
    tick() {
      if (this.currentTime <= 1) {
        soundMode.rightAnswerSound();
        this.callback();
        this.reset();
        return;
      }
      this.timerElement.innerHTML = --this.currentTime;
      soundMode.timerSound();
    }
  }

  const preGameTimer = new PreGameTimer(startTimerValue, timerElement, fromTimerToGame);

  // TRAINING PAGE

  trainingPage.addEventListener('click', () => {
    soundMode.clickSound();
    trainingPage.classList.add('none');
    pregameTimerPage.classList.remove('none');
    gameControls.classList.add('none');
    preGameTimer.startTimer();
  })

  // GAME PAGE
  // Needs look a function on top level

  // RESULT PAGE
  const resultBtn = document.querySelector('.result-btn');
  resultBtn.addEventListener('click', () => {
    soundMode.clickSound();
    resultGamePage.classList.add('none');
    resultAllTimePage.classList.remove('none');
    reset();
    fillAllTimePage();
  })

  // ALLTIME RESULT PAGE

  const btnPlayAgain = document.querySelector('.btn-play-again');
  btnPlayAgain.addEventListener('click', () => {
    soundMode.clickSound();
    startGamePage.classList.remove('none');
    resultAllTimePage.classList.add('none');
  })
}

export const fromGameToResult = () => {
  gamePage.classList.add('none');
  resultGamePage.classList.remove('none');
  fillResultPage();
}

function gameControlsBtns() {

  function pauseTimer() {
    if (!gamePage.classList.contains('none')) {
      timerGame.pause();
    }
  }

  function continueTimer() {
    if (!gamePage.classList.contains('none')) {
      timerGame.startTimer();
    }
  }

  soundBtn.addEventListener('click', () => {
    if (soundMode.mute) {
      soundMode.mute = false;
      soundMode.clickSound();
      soundBtn.classList.remove('mute');
    } else {
      soundMode.mute = true;
      soundBtn.classList.add('mute');
    }
  })

  problemsBtn.addEventListener('click', () => {
    pauseTimer();
    soundMode.clickSound();
    problems.classList.remove('none');
  })

  rulesBtn.addEventListener('click', () => {
    pauseTimer();
    soundMode.clickSound();
    rules.classList.remove('none');
  })

  closeProblemBtn.addEventListener('click', () => {
    continueTimer();
    soundMode.clickSound();
    problems.classList.add('none');
  })

  closeRulesBtn.addEventListener('click', () => {
    continueTimer();
    soundMode.clickSound();
    rules.classList.add('none');
  })
}

gameControlsBtns();
pagesNavigation();

// localStorage.clear();
