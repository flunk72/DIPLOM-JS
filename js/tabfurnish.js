/*jshint esversion: 6 */
function tabfurnish () {
let furnish = document.querySelector(".decoration_slider"),
    tabsContent = document.querySelectorAll(".tab_content_furnish"),
    clickActive = document.querySelectorAll(".no_click"),
    tabs = document.querySelectorAll(".click_active");

function hideTabsContent(a) {
    for (let i = a; i < tabsContent.length; i++) {
        tabsContent[i].classList.remove("show");
        tabsContent[i].classList.add("hide");
        clickActive[i].classList.remove("after_click");
    }
}
hideTabsContent(1);

function showTabsContent(b) {
    if (tabsContent[b].classList.contains("hide")) {
        tabsContent[b].classList.remove("hide");
        tabsContent[b].classList.add("show");
        clickActive[b].classList.add("after_click");
    }
}
furnish.addEventListener("click", (event) => {
    let target = event.target;

    if (target && target.classList.contains("click_active") || target.parentNode.classList.contains("click_active")) {
        [...tabs].forEach(function (event, i) {
            if (target == event || target.parentNode == event) {
                hideTabsContent(0);
                showTabsContent(i);
            }
        });
    }
});
}
module.exports = tabfurnish;