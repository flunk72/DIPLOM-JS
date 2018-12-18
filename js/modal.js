/*jshint esversion: 6 */
function modal() {
let body = document.querySelector("body"),
    measurer = document.querySelector(".popup_engineer"),
    closeBtn = document.querySelector(".popup_close"),
    popupCalc = document.querySelector(".popup_calc"),
    popupCalcProfile = document.querySelector(".popup_calc_profile"),
    popupCalcEnd = document.querySelector(".popup_calc_end"),
    overlayTell = document.querySelector(".popup"),
    closeImg = document.querySelector(".row");

closeBtn = addEventListener("click", function (event) {
    if (event.target && event.target.tagName == "STRONG") {
        measurer.style.display = 'none';
        overlayTell.style.display = 'none';
        popupCalc.style.display = 'none';
        popupCalcProfile.style.display = 'none';
        popupCalcEnd.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (event.target == measurer || event.target == overlayTell) {
        measurer.style.display = "none";
        overlayTell.style.display = 'none';
        document.body.style.overflow = '';
    }
});

body.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('header_btn')) {
        showModal(measurer);
    }
    if (target && target.classList.contains('popup_calc_button')) {
        showModal(popupCalcProfile);
    }
    if (target && target.classList.contains('phone_link')) {
        showModal(overlayTell);
    }
    if (target && target.classList.contains('glazing_price_btn')) {
        showModal(popupCalc);
    }
    if (target && target.classList.contains('popup_calc_profile_button')) {
        showModal(popupCalcEnd);
    }
});

function showModal(elem) {
    elem.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// закрытие по подложке
window.addEventListener("click", (event) => {
    if (event.target == measurer) {
        measurer.style.display = "none";
    }
});

setTimeout(modal, 60000);

function modal() {
    measurer.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

let inputsPhone = document.querySelectorAll('input[name="user_phone"]');


function onlyNumber(input) {
    input.oninput = function () {
        return (this.value = this.value.replace(/[^0-9]/g, ""));
    };
}
[...inputsPhone].forEach(elem => onlyNumber(elem));
}
module.exports = modal;