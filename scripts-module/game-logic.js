import { randomNumber } from "./utils.js";
import { gameControls } from "./game-control.js";
import { gameProgress } from "./game-control.js";
import { Timer } from "./utils.js";
import { fromGameToResult } from "../script.js";
import { createBestResults } from "./result-pages.js";
import { soundMode } from "./sound-mode.js";

// timer function
const timerElement = document.querySelector('.timer');
const startTimerValue = 60;
timerElement.innerHTML = startTimerValue;

export const timerGame = new Timer(startTimerValue, timerElement, () => {
  gameProgress.timer = false;
  timerElement.innerHTML = 0;
});

export function playFindANumber() {
  const cards = document.querySelector('.cards');
  const initialNum = document.querySelector('.initial-num');
  const currentLevel = document.querySelector('.level');
  const currentPoints = document.querySelector('.points');
  const currentBonus = document.querySelector('.bonus');
  const initialBonus = 1;
  const rightAnswersElement = document.querySelector('.right-answer');
  const wrongAnswersElement = document.querySelector('.wrong-answer');

  let pointsArray = gameProgress.pointsArray;
  let countOfPoints = gameProgress.countOfPoints;
  let levelProgress = gameProgress.levelProgress;
  let bonusArray = gameProgress.bonusArray;
  let countOfbonuses = gameProgress.countOfBonuses;
  let numberCards = gameProgress.numberCards;
  let rightAnswers = gameProgress.rightAnswers;
  let wrongAnswers = gameProgress.wrongAnswers;

  function answerCheck(element) {
    element.classList.remove('none');
    setTimeout(() => {
      element.classList.add('none');
    }, 300);
  }

  function createField(initialObject) {
    cards.innerHTML = '';
    cards.style.gridTemplateRows = `repeat(${initialObject.rows}, 1fr)`;
    cards.style.gridTemplateColumns = `repeat(${initialObject.cols}, 1fr)`;

    const collectionOfNumbers = new Set();
    let getInitialNumber = randomNumber(initialObject.min, initialObject.max);
    collectionOfNumbers.add(getInitialNumber);

    initialNum.setAttribute('key', `${getInitialNumber}`);
    initialNum.innerHTML = getInitialNumber;

    do {
      collectionOfNumbers.add(randomNumber(initialObject.min, initialObject.max))
    }
    while (collectionOfNumbers.size < initialObject.rows * initialObject.cols)

    let array = [...collectionOfNumbers];
    array.sort(() => Math.random() - 0.5);

    for (let i = 0; i < array.length; i++) {
      let cardItem = document.createElement('li');
      cardItem.classList.add('cards_item', 'flex');
      cardItem.setAttribute('key', `${array[i]}`);
      cardItem.style.backgroundColor = gameControls.colors[randomNumber(0, gameControls.colors.length - 1)];

      if (initialObject.animation) {
        cardItem.classList.add(gameControls.animation[randomNumber(0, gameControls.animation.length - 1)])
      }

      let number = document.createElement('span');
      number.classList.add('num');
      number.innerHTML = array[i];

      cards.append(cardItem);
      cardItem.append(number);
    }

    numberCards.nums = document.querySelectorAll('.cards_item');

    numberCards.nums.forEach((e) => {
      e.addEventListener('click', () => {
        if (gameProgress.timer) {
          if (e.getAttribute('key') === initialNum.getAttribute('key')) {
            answerCheck(rightAnswersElement);
            soundMode.rightAnswerSound();
            pointsArray.push(initialObject.points);
            bonusArray.push('bonus');
            rightAnswers.push('good');

            if (levelProgress.length < 9) {
              levelProgress.push('elem');
            }
          }
          else {
            answerCheck(wrongAnswersElement);
            soundMode.wrongAnwerSound();
            pointsArray.push(-initialObject.points);
            if (pointsArray.reduce((acc, curr) => acc + curr, 0) <= 0) {
              pointsArray.length = 0;
            }
            bonusArray.length = 0;
            wrongAnswers.push('bad');

            if (levelProgress.length > 1) {
              levelProgress.pop();
            }
          }

          currentLevel.innerHTML = levelProgress.length;

          if (levelProgress.length) {
            countOfPoints = pointsArray.reduce((acc, curr) => acc + curr, 0);
          } else {
            countOfPoints = 0;
          }
          currentPoints.innerHTML = countOfPoints;

          switch (countOfbonuses.length) {
            case 0:
              if (bonusArray.length === 4) {
                currentBonus.innerHTML = initialBonus + 1;
                countOfbonuses.push('first');
              }
              break;

            case 1:
              if (bonusArray.length === 8) {
                currentBonus.innerHTML = +currentBonus.textContent + 1;
                countOfbonuses.push('second');
              }
              break;

            case 2:
              if (bonusArray.length === 10) {
                currentBonus.innerHTML = +currentBonus.textContent + 1;
                countOfbonuses.push('third');
              }
              break;

            case 3:
              if (bonusArray.length === 14) {
                currentBonus.innerHTML = +currentBonus.textContent + 1;
                countOfbonuses.push('fourth');
              }
              break;
          }
        }
        else {
          soundMode.clickSound();
          createBestResults(countOfPoints * (countOfbonuses.length + 1));
          fromGameToResult();
          currentLevel.innerHTML = '1';
          currentPoints.innerHTML = '0';
          currentBonus.innerHTML = '1';
          return;
        }

        changeLevels();
      })
    })

    collectionOfNumbers.clear();
  }

  function changeLevels() {
    if (levelProgress.length <= 2) {
      createField(gameControls.levels.oneTwo);
      return;
    }
    else if (levelProgress.length === 3) {
      createField(gameControls.levels.three);
      return;
    }
    else if (levelProgress.length <= 5) {
      createField(gameControls.levels.fourFive);
      return;
    }
    else if (levelProgress.length <= 7) {
      createField(gameControls.levels.sixSeven);
      return;
    }
    else if (levelProgress.length > 7) {
      createField(gameControls.levels.eightUp);
      return;
    }
  }

  changeLevels();

  timerGame.startTimer();
}


