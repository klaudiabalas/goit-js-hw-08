import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.getElementById('vimeo-player'));

const saveTime = time => {
  localStorage.setItem('videoplayer-current-time', time);
};

const setTimeFromStorage = () => {
  const time = localStorage.getItem('videoplayer-current-time');
  if (time !== null) {
    player.setCurrentTime(parseFloats(time));
  }
};

player.on(
  'timeupdate',
  throttle(data => {
    saveTime(data.seconds);
  }, 1000)
);

window.addEventListener('load', setTimeFromStorage);
