import Vimeo from '@vimeo/player';
import { throttle } from 'lodash';

const player = new Vimeo('vimeo-player');
// position Save
// player.on(
//   'timeupdate',
//   throttle(function (data) {
//     player.getCurrentTime().then(time => {
//       localStorage.setItem('videoplayer-current-time', time);
//       const minutes = Math.floor(time / 60);
//       const seconds = Math.floor(time % 60);
//       const goodTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//       //   const currentTime = data.seconds;
//       localStorage.setItem('videoplayer-current-time', goodTime);
//     }, 500);
//   })
// );

player.on(
  'timeupdate',
  throttle(function (data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime.toString());
  }, 1000)
);

// Request at position
const saveTime = localStorage.getItem('videoplayer-current-time');

if (saveTime) {
  player.setCurrentTime(saveTime);
}
