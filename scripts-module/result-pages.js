import { gameProgress } from "./game-control.js";
import { bestResults } from "./game-control.js";

const bestResultList = document.querySelector('.best-result-list');

const currentResult = document.querySelectorAll('.current-result');
const rightAnswers = document.querySelector('.right-answers');
const answersAccuracy = document.querySelector('.answers-accuracy');

export function fillResultPage() {
  const rightAnswersCount = gameProgress.rightAnswers.length;
  const wrongAnswersCount = gameProgress.wrongAnswers.length;
  const pointsArray = gameProgress.pointsArray;
  const bonuses = gameProgress.countOfBonuses.length + 1;

  currentResult.forEach((e) => {
    e.innerHTML = `${(pointsArray.reduce((acc, curr) => acc + curr, 0) * bonuses) || 0}`;
  })
  rightAnswers.innerHTML = `${rightAnswersCount || 0} из ${rightAnswersCount + wrongAnswersCount || 0}`;
  answersAccuracy.innerHTML = `${Math.round(rightAnswersCount / (rightAnswersCount + wrongAnswersCount) * 100) || 0} % `;
}

export function createBestResults(res) {
  bestResults.push({ res, date: new Date });
  bestResults.sort((a, b) => b.res - a.res);
  bestResults.length = bestResults.length < 4 ? bestResults.length : 4;
  localStorage.setItem('bestresults', JSON.stringify(bestResults));
}

export function fillAllTimePage() {
  bestResultList.innerHTML = '';

  for (let i = 0; i < bestResults.length; i++) {
    let bestItem = document.createElement('li');
    bestItem.classList.add('result-description-item', 'result-description-item-alltime', 'flex');
    bestResultList.append(bestItem);

    let number = document.createElement('span');
    let date = document.createElement('span');
    let points = document.createElement('span');

    let resultDate = new Date(bestResults[i].date);
    let month = () => resultDate.getMonth() + 1 < 10 ? `0${resultDate.getMonth()+1}` : resultDate.getMonth();
    let minutes = () => resultDate.getMinutes() < 10 ? `0${resultDate.getMinutes()}` : resultDate.getMinutes();

    number.innerHTML = i + 1;
    date.innerHTML = `${resultDate.getDate()}.${month()}.${resultDate.getFullYear()} в
    ${resultDate.getHours()}:${minutes()}`;
    points.innerHTML = bestResults[i].res;
    bestItem.append(number, date, points);
  }
}


