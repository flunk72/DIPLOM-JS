/*jshint esversion: 6 */
function timer () {
let deadline = "2018.12.30";

let getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60))),
        days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
    };
};

let setClock = (id, endtime) => {
    let timer = document.getElementById(id),
        day = timer.querySelector(".days"),
        hours = timer.querySelector(".hours"),
        minutes = timer.querySelector(".minutes"),
        seconds = timer.querySelector(".seconds");


    let updateClock = () => {
        let t = getTimeRemaining(endtime);
        day.textContent = t.days;
        hours.textContent = ("0" + t.hours).slice(-2);
        minutes.textContent = ("0" + t.minutes).slice(-2);
        seconds.textContent = ("0" + t.seconds).slice(-2);
        if (t.total <= 0) {
            document.querySelector(".days").textContent = "00";
            document.querySelector(".hours").textContent = "00";
            document.querySelector(".minutes").textContent = "00";
            document.querySelector(".seconds").textContent = "00";
            clearInterval(timeInterval);

        }
    };
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();
};
setClock("timer", deadline);
}
module.exports = timer;