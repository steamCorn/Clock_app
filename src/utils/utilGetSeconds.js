function getSeconds(value) {
    const seconds = Math.floor(value * 60);
    return seconds;
}

function getMinutesFromSeconds(time) {
    const totalSec = time;
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec - minutes * 60;
    return { seconds, minutes };
}

export { getSeconds, getMinutesFromSeconds };
