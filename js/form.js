/*jshint esversion: 6 */
function form () {
let message = {
    sending: "Идет отпрвка",
    sendTo: "Отправлено",
    mistake: "Ошибка"
};

let form = document.querySelector('form'),
    popupForm2 = document.querySelectorAll('.form')[1],
    popupFormModal = document.querySelectorAll('.form')[7],
    popupForm5 = document.querySelectorAll('.form')[5],
    popupFormModalTell = document.querySelectorAll('.form')[6],
    popupFormModalCalcEnd = document.querySelectorAll('.form')[8],
    inputForm = form.querySelectorAll('input')[1],
    inputForm2 = document.querySelectorAll('input')[3],
    inputForm3 = document.querySelectorAll('input')[11],
    inputPopupFormModal = document.querySelectorAll('input')[15],
    inputPopupFormModalTell = document.querySelectorAll('input')[13],
    inputPopupFormModalCalcWidth = document.querySelectorAll('input')[16],
    inputPopupFormModalCalcHight = document.querySelectorAll('input')[17],
    inputPopupFormModalCalcEnd = document.querySelectorAll('input')[21],
    input = document.querySelectorAll('input'),
    statusMessage = document.createElement('div');

statusMessage.classList.add('status');

function allForm(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.appendChild(statusMessage);

        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        function postData() {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                request.onreadystatechange = function () {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                request.send(json);
            });
        }

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }
        postData(formData)
            .then(() => statusMessage.textContent = message.sending)
            .then(() => statusMessage.textContent = message.sendTo)
            .catch(() => statusMessage.textContent = message.mistake)
            .then(clearInput);
    });
}

function clearInp() {
    statusMessage.textContent = '';
}
allForm(form);
allForm(popupForm2);
allForm(popupFormModal);
allForm(popupForm5);
allForm(popupFormModalTell);
allForm(popupFormModalCalcEnd);
}
module.exports = form;