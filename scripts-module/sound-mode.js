export const soundMode = {
  mute: false,

  setSound(src) {
    var audio = new Audio();
    audio.src = `${src}`;
    audio.autoplay = true;
  },

  clickSound() {
    if (!this.mute) this.setSound('../assets/sounds/mouseClick.mp3');
  },

  timerSound() {
    if (!this.mute) this.setSound('../assets/sounds/timer.mp3');
  },

  rightAnswerSound() {
    if (!this.mute) this.setSound('../assets/sounds/rightAnswer.mp3');
  },

  wrongAnwerSound() {
    if (!this.mute) this.setSound('../assets/sounds/wrongAnwer.mp3');
  },

}
