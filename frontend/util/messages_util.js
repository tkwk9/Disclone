
export const processMessages = (messages) => {
  Object.keys(messages).forEach((key) => {
    messages[key].timestampObject = timeDifference(messages[key].timestamp);
  });
  return messages;
};

export const timeDifference = (time) => {
  let then = new Date(time);
  let now = new Date();
  let delta = parseInt((now-then)/1000);
  let deltaObject;
  if (delta < 60){
    deltaObject = letThereBeDeltaObject("s", delta, then);
  } else {
    delta = Math.floor(delta/60);
    if (delta < 60){
      deltaObject = letThereBeDeltaObject("m", delta, then);
    } else {
      delta = Math.floor(delta/60);
      if (delta < 24){
        deltaObject = letThereBeDeltaObject("h", delta, then);
      } else {
        delta = Math.floor(delta/24);
        deltaObject = letThereBeDeltaObject("d", delta, then);
      }
    }
  }
  return deltaObject;
};

export const letThereBeDeltaObject = (type, delta, time) => {
  return {
    type,
    delta,
    date: formatDate(time),
    time: formatTime(time)
  };
};

export const formatDate = (time) => {
  return time.getMonth()+1 + "/" +
    time.getDate() + "/" +
    (time.getYear() + 1900);
};

export const formatTime = (time) => {
  let meridiem = ' AM';
  let hour = time.getHours();
  if (hour > 12) {
    hour = hour - 12;
    meridiem = ' PM';
  }
  return ("0" + hour).slice(-2) + ":" +
    ("0" + time.getMinutes()).slice(-2) +
    meridiem;
};
