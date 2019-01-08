const bgmAudio = new Audio();
bgmAudio.loop = true;
bgmAudio.src  = './audio/bgm.mp3';

const shootAudio = new Audio();
shootAudio.src = './audio/bullet.mp3';

const boomAudio = new Audio();
boomAudio.src = './audio/boom.mp3';

export function playBgm() {
  bgmAudio.oncanplaythrough = () => bgmAudio.play();
}

export function playShoot() {
  shootAudio.currentTime = 0;
  shootAudio.play();
}

export function playExplosion() {
  boomAudio.currentTime = 0;
  boomAudio.play();
}
