export function randomNumber(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export class Timer {
  constructor(timerValue, timerElement, callback) {
    this.startTime = timerValue;
    this.currentTime = timerValue;
    this.timerElement = timerElement;
    this.callback = callback;
  }

  set currentTime(value) {
    this._currentTime = value;
  }

  get currentTime() {
    return this._currentTime;
  }

  tick() {
    if (this.currentTime <= 1) {
      this.callback();
      this.reset();
      return;
    }
    this.timerElement.innerHTML = --this.currentTime;
  }

  startTimer() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  pause() {
    clearInterval(this.timer);
  }

  reset() {
    this.pause();
    this.currentTime = this.startTime;
  }
}
