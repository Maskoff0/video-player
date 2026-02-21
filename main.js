const player = document.querySelector(".video-player");
const video = document.querySelector(".video");
const progressSpan = document.querySelector(".progress-span");
const progressBar = document.querySelector(".progress-bar");
const Play  = document.getElementById("play-btn");
const VolumeBtn = document.getElementById("volume-btn");
const VolumeLine = document.querySelector(".volume-line");
const VolumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const time = document.querySelector(".time-elapsed");
const duration = document.querySelector(".duration");
const fullscreen = document.querySelector(".fullscreen");


//Handle Events//

Play.addEventListener("click", togglePlay)
video.addEventListener("click", togglePlay)
video.addEventListener("timeupdate", updateSpan);
video.addEventListener("canplay", updateSpan);
progressSpan.addEventListener("click", spanTime);
VolumeLine.addEventListener("click" , changeVolume);
VolumeBtn.addEventListener('click' , toggleMute);
speed.addEventListener('change' , changeSpeed);
fullscreen.addEventListener('click', toggleFullscreen);

function togglePlay(){
    if(video.paused){
        video.play();
        Play.classList.replace('fa-play', 'fa-pause');
        Play.setAttribute('title' , 'Pause')
    }else{
        video.pause();
        displayPlay();
    }
}

function displayPlay(){
    Play.classList.replace('fa-pause', 'fa-play');
    Play.setAttribute('title' , 'Play')

}

video.addEventListener("ended" , displayPlay);

function showTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes} : ${seconds}`;
}


function updateSpan(){
    //console.log('currentTime', video.currentTime, 'duration', video.duration);

    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    time.textContent = `${showTime(video.currentTime)} /`;
    duration.textContent = `${showTime(video.duration)}`;
}

function spanTime(e){
   //console.log(e);
   const newTime = e.offsetX / progressSpan.offsetWidth;
   progressBar.style.width = `${newTime * 100}%`;
   video.currentTime = newTime * video.duration;

}

let endVolume = 1;
function changeVolume(e){
    let volume = e.offsetX / VolumeLine.offsetWidth;
    //console.log(volume);
   if(volume < 0.1){
      volume = 0;
   }
   if(volume > 0.9){
      volume = 1;
   }
   VolumeBar.style.width = `${volume * 100}%`;
   video.volume = volume;

   VolumeBtn.className = '';
   if(volume > 0.7){
     VolumeBtn.classList.add('fas', 'fa-volume-up');
   }else if(volume < 0.7 && volume > 0 ){
    VolumeBtn.classList.add('fas' , 'fa-volume-down');
   }else if(volume === 0){
    VolumeBtn.classList.add('fas' , 'fa-volume-off');
   }
   endVolume = volume

}

function toggleMute(){
    VolumeBtn.className = '';
    if(video.volume){
        endVolume = video.volume;
        video.volume = 0;
        VolumeBtn.classList.add('fas', 'fa-volume-mute');
        VolumeBtn.setAttribute('title', 'unmute');
        VolumeBar.style.width = 0;
    }else{
        video.volume = endVolume;
        VolumeBtn.classList.add('fas' , 'fa-volume-down');
        VolumeBtn.setAttribute('title', 'mute');
        VolumeBar.style.width = `${endVolume * 100}%`;
    }
}

function changeSpeed(){
    //console.log('video playback rate', video.playbackRate);
    //console.log('selected value' , speed.value);
    video.playbackRate = speed.value;
}
let fullScreen = false;
function toggleFullscreen(){
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen =!fullscreen;
}

//fullscreen//
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')
}