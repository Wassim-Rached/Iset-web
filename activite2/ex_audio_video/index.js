const video = document.getElementById("myVideo");
const audio = document.getElementById("myAudio");

audio.volume = 0.3;

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const increaseVolumeButton = document.getElementById("increaseVolume");
const decreaseVolumeButton = document.getElementById("decreaseVolume");

function playVideo() {
  video.play();
}

function pauseVideo() {
  video.pause();
}

function increaseVolume() {
  if (video.volume < 1) {
    video.volume += 0.1;
  }
}

function decreaseVolume() {
  if (video.volume > 0) {
    video.volume -= 0.1;
  }
}

playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);
increaseVolumeButton.addEventListener("click", increaseVolume);
decreaseVolumeButton.addEventListener("click", decreaseVolume);
