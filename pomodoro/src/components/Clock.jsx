import React from 'react';

function secToMMSS(time) {
  let min = Math.floor(time/60);
  let sec = time%60;

  min = min < 10 ? '0'+min : min;
  sec = sec < 10 ? '0'+sec : sec;

  return min + ':' + sec;
}

export default function Clock(props) {
  return (
    <div>
      {secToMMSS(props.time)}
    </div>
  )
}
