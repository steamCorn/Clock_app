function getRemainingTimeInSeconds (minutes) {
   console.log("Minuts  ",minutes, "secunds  ",(minutes/1000) * 60 )
   const seconds = Math.floor( (minutes) * 60);
   return seconds;
}

export {getRemainingTimeInSeconds};
