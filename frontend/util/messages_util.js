export const processMessages = (messages) => {
  if (messages){
    Object.keys(messages).forEach((key) => {
      messages[key].timestampObject =
        timeDifference(messages[key].timestamp);
    });
    return messages;
  }
};

export const timeDifference = (time) => {
  console.log(time);
  
  let then = new Date(time);
  let now = new Date();
  let delta = parseInt((now-then)/1000);
  let timeObject;
  if (delta < 60){
    timeObject = letThereBeDeltaObject("s", delta, then);
  } else {
    delta = Math.floor(delta/60);
    if (delta < 60){
      timeObject = letThereBeDeltaObject("m", delta, then);
    } else {
      delta = Math.floor(delta/60);
      if (delta < 24){
        timeObject = letThereBeDeltaObject("h", delta, then);
      } else {
        delta = Math.floor(delta/24);
        timeObject = letThereBeDeltaObject("d", delta, then);
      }
    }
  }
  return timeObject;
};

export const letThereBeDeltaObject = (type, delta, time) => {
  return {
    type,
    delta,
    readableDate: readableDate(time),
    formattedDate: formattedDate(time),
    time: formatTime(time)
  };
};

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
}

export const readableDate = (time) => {
  return sameDay(time) ? "TODAY" :
    MONTHS[time.getMonth()] + " " +
      time.getDate() + ", " +
      (time.getYear() + 1900);
};

export const formattedDate = (time) => {
  return sameDay(time) ? "TODAY" :
    time.getMonth()+1 + "/" +
      time.getDate() + "/" +
      (time.getYear() + 1900);
};

export const sameDay = (time) => {
  return (formatDate(time) === formatDate(new Date()));
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

export const messagesShouldBreak = (msg1, msg2) => {
  return (
    msg1.author !== msg2.author) ||
    (parseInt((new Date(msg1.timestamp) - new Date(msg2.timestamp))/1000) > 60) ||
    getId(msg2.content) !== 'error' || getId(msg1.content) !== 'error';
};

function getId(url) {
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);

  if (match && match[2].length == 11) {
      return match[2];
  } else {
      return 'error';
  }
}

export const showDate = (msg1, msg2) => {
  return msg1.timestampObject.formattedDate
    !== msg2.timestampObject.formattedDate;
};

const MONTHS = ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"];

const WEEKDAY = ["Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"];
