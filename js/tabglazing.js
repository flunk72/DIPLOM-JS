/*jshint esversion: 6 */
function tabglazing () {
let tabMain = document.querySelector("body"),
    tabContent = document.querySelectorAll(".tab_content_glazing"),
    tabActive = document.querySelectorAll(".tab_active"),
    tab = document.querySelectorAll(".glazing_block");

let hideTabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove("show");
        tabContent[i].classList.add("hide");
        tabActive[i].classList.remove("active");
    }
};
hideTabContent(1);

let showTabContent = (b) => {
    if (tabContent[b].classList.contains("hide")) {
        tabContent[b].classList.remove("hide");
        tabContent[b].classList.add("show");
        tabActive[b].classList.add("active");
    }
};
tabMain.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains("glazing_block") || target.parentNode.classList.contains("glazing_block")) {
        [...tab].forEach(function (event, i) {
            if (target == event || target.parentNode == event) {
                hideTabContent(0);
                showTabContent(i);
            }
        });
    }
});
}
module.exports = tabglazing;