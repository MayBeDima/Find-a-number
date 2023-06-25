class Level {
  constructor(rows, cols, min, max, points, animation = true) {
    this.rows = rows; //
    this.cols = cols;
    this.animation = animation;
    this.min = min;
    this.max = max;
    this.points = points;
  }
}

export const gameControls = {
  levels: {
    oneTwo: new Level(2, 3, 10, 99, 16, false),
    three: new Level(2, 3, 1, 99, 30),
    fourFive: new Level(3, 4, 1, 99, 46),
    sixSeven: new Level(4, 4, 100, 999, 60),
    eightUp: new Level(5, 5, 100, 999, 76),
  },
  colors: ['red', 'green', 'blue', 'orange', 'purple', 'orangered', 'lightgreen', 'pink'],
  animation: ['rotate', 'scale', 'opacity', 'scale-opacity', 'rotate-opacity', 'scale-rotate', 'scale-rotate-opacity', 'no-animation'],
}

export const gameProgress = {
  timer: true,
  levelProgress: ['elem'],
  pointsArray: [],
  countOfPoints: 0,
  bonusArray: [],
  countOfBonuses: [],
  numberCards: {
    nums: null,
  },
  wrongAnswers: [],
  rightAnswers: [],
}

export function reset() {
  gameProgress.timer = true;
  gameProgress.levelProgress = ['elem'];
  gameProgress.pointsArray = [];
  gameProgress.countOfPoints = 0;
  gameProgress.bonusArray = [];
  gameProgress.wrongAnswers = [];
  gameProgress.rightAnswers = [];
  gameProgress.numberCards.nums = null;
  gameProgress.countOfBonuses = [];
}

export let bestResults = [];

export function changeLocalStorage() {
  if (localStorage.getItem('bestresults')) {
    bestResults = JSON.parse(localStorage.getItem('bestresults'));
    console.log(bestResults);
  }
}
