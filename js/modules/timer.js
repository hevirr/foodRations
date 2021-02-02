function timer(id, deadline) {

    setTimer();
    const timerUpdate = setInterval(setTimer, 1000);

    function setTimer() {
        const timer = document.querySelector(id),
              timeLeft = Date.parse(deadline) - new Date();

        if (timeLeft > 1) {
            let days = Math.floor(timeLeft/1000/60/60/24),
                hours = Math.floor(timeLeft/1000/60/60 - days*24),
                minutes = Math.floor(timeLeft/1000/60 - days*24*60 - hours*60),
                seconds = Math.floor(timeLeft/1000 - days*24*60*60 - hours*60*60 - minutes*60);

            timer.querySelector('#days').innerHTML = (days>=10) ? `${days}` : `0${days}`;
            timer.querySelector('#hours').innerHTML = (hours>=10) ? `${hours}` : `0${hours}`;
            timer.querySelector('#minutes').innerHTML = (minutes>=10) ? `${minutes}` : `0${minutes}`;
            timer.querySelector('#seconds').innerHTML = (seconds>=10) ? `${seconds}` : `0${seconds}`;
        } else {
            clearTimeout(timerUpdate);
        }
    }
}

export default timer;