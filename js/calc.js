/*jshint esversion: 6 */
function calc () {
    let popupCalcShow = document.querySelectorAll('.popup_calc_btn'),
    popupCalc = document.querySelector('.popup_calc'),
    popupCalcProfile = document.querySelector('.popup_calc_profile'),
    popupCalcEnd = document.querySelector('.popup_calc_end'),
    inputWidth = document.querySelector('#width'),
    inputHeight = document.querySelector('#height'),
    inputSelect = document.querySelector('#view_type'),
    checkbox = document.querySelectorAll('input[type="checkbox"]'),
    scrollHide = document.querySelector('html');

  let options = {};

  let checkboxValue = () => {
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        options.checkbox = checkbox[i].value;
      }
    }
  };


  let selectValue = () => {
    for (let i = 0; i < inputSelect.options.length; i++) {
      if (inputSelect.options[i].selected) {
        options.view = inputSelect.options[i].value;
      }
    }
  };


  let checkBoxSelect = () => {
    checkbox[1].addEventListener('change', function () {
      checkbox[0].checked = !checkbox[1].checked;
    });
    checkbox[0].addEventListener('change', function () {
      checkbox[1].checked = !checkbox[0].checked;
    });
  };


  let deleteOptions = () => {
    for (let key in options) {
      delete options[key];
    }
  };

  let previewImage = () => {
    let smallImagesParent = document.querySelectorAll('.balcon_icons img'),
      parent = document.querySelector('.balcon_icons'),
      bigImagesParend = document.querySelectorAll('.big_img img');

    function addClassActive() {
      for (let i = 0; i < smallImagesParent.length; i++) {
        smallImagesParent[i].classList.add('calc-active');
      }
    }
    addClassActive();

    function hide(a) {
      for (let i = a; i < bigImagesParend.length; i++) {
        bigImagesParend[i].style.display = 'none';
        smallImagesParent[i].classList.remove('calc-active');
      }
    }
    hide(1);

    function show(b) {
      if (bigImagesParend[b].style.display == 'none') {
        bigImagesParend[b].style.display = 'inline-block';
        smallImagesParent[b].classList.add('calc-active');
      }
    }

    parent.addEventListener('click', function (event) {
      event.preventDefault();
      let target = event.target;
      for (let i = 0; i < smallImagesParent.length; i++) {
        show(i);
        if (target == smallImagesParent[i]) {
          hide(0);
          show(i);
          break;
        }
      }
    });
  };

  let showPopupCalc = () => {
    for (let i = 0; i < popupCalcShow.length; i++) {
      popupCalcShow[i].addEventListener('click', () => {
        popupCalc.style.display = 'flex';
        scrollHide.style.overflow = '';

        let popupCalcButton = document.querySelector('.popup_calc_button');
        popupCalcButton.addEventListener('click', function () {
          if (inputHeight.value == '' || inputWidth.value == '' || inputHeight.value == '0' || inputWidth.value == '0') {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Введите пожалуйста ширину и высоту окна',
            });
          } else {
            popupCalc.style.display = 'none';
            popupCalcProfile.style.display = 'flex';
            options.height = inputHeight.value;
            options.width = inputWidth.value;
          }
        });
      });
    }


    function showModalCalc(event) {
      let target = event.target;
      scrollHide.style.overflow = '';
      if (target.className == 'popup_calc_close' || target.className == 'closed') {
        popupCalc.style.display = 'none';
        scrollHide.style.overflow = 'scroll';
        deleteOptions();
      }
    }
    popupCalc.addEventListener('click', showModalCalc);

    popupCalcProfile.addEventListener('click', (event) => {
      let target = event.target;
      if (target.className == 'popup_calc_profile_close' || target.className == 'closed') {
        popupCalc.style.display = 'none';
        popupCalcProfile.style.display = 'none';
        scrollHide.style.overflow = 'scroll';
        deleteOptions();
      } else if (target.className == 'button popup_calc_profile_button' && checkbox[0].checked != false) {
        popupCalcEnd.style.display = 'flex';
        popupCalcProfile.style.display = 'none';
        checkboxValue();
        selectValue();
      } else if (target.className == 'button popup_calc_profile_button' && checkbox[1].checked != false) {
        popupCalcEnd.style.display = 'flex';
        popupCalcProfile.style.display = 'none';
        checkboxValue();
        selectValue();
      } else if (target.className == 'button popup_calc_profile_button') {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Выберите тип остекления и его профиль',
        });
      }
    });

    popupCalcEnd.addEventListener('click', (event) => {
      let target = event.target;
      if (target.className == 'popup_calc_end_close' || target.className == 'closed') {
        popupCalcEnd.style.display = 'none';
        scrollHide.style.overflow = 'scroll';
        deleteOptions();
      }
    });
  };

  function clear() {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    setTimeout(() => {
      statusMesage.innerHTML = "";
    }, 5000);
  }

  let form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');

  for (let i = 0; i < form.length; i++) {

    form[i].addEventListener('submit', (event) => {
      event.preventDefault();

      let request = new XMLHttpRequest();
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      let formData = new FormData(form[i]);


      formData.forEach(function (value, key) {
        options[key] = value;
      });

      let json = JSON.stringify(options);

      request.send(json);

      request.addEventListener('readystatechange', () => {
        if (request.readyState < 4) {
          swal('Идет отправка');
        } else if (request.readyState === 4 && request.status == 200) {
          swal(
            'Отправлено!',
            '',
            'success'
          );
          clear();
          deleteOptions();
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Ошибка!'
          });
          clear();
          deleteOptions();
        }
      });

    });

  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keypress', function (e) {
      let key = e.keyCode;
      let atributeName = inputs[i].getAttribute('name'),
        inputId = inputs[i].id;

      if (atributeName == 'user_phone' || inputId == 'width' || inputId == 'height') {
        if (key < 48 || key > 57) {
          e.preventDefault();
        }
      }
    });
  }

  showPopupCalc();
  previewImage();
  checkBoxSelect();

}
module.exports = calc;