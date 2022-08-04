function getMinutes(seconds) {
   const minutes = Math.floor(seconds / 60);
   return minutes;
}

function getMinutesFromSeconds(time) {
   const totalSec = time;
   const minutes = Math.floor(totalSec / 60);
   const seconds = totalSec - (minutes*60);
   return {seconds , minutes};
}

export { getMinutes, getMinutesFromSeconds };
