(function () {
  'use strict'

  function ready() {
    const thanksModal = new bootstrap.Modal('#thanksModal', {});
    const forms = document.querySelectorAll('.form-callback')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {

        event.preventDefault()
        event.stopPropagation()

        const url = form.action;
        const formData = new FormData(form);

        if ((formData.get("required")).length > 0) { // проверка на спамботов
          return;
        }

        const params = Array.from(formData);
        let query = new URLSearchParams(params);
        let queryString = query.toString();

        const req = new XMLHttpRequest();
        req.open("GET", url + '?' + queryString, false);
        req.send();

        form.phone.classList.remove('is-invalid');  
        if (form.message !== undefined) {
          form.message.classList.remove('is-invalid'); 
        }

        if (req.status == 200) {          
          form.reset();
          thanksModal.show();
        } else if (req.status == 202) {                
          let invalidInput = form.elements[req.responseText]; 
          invalidInput.classList.add('is-invalid'); 
        } else if (req.status == 503) {
          alert('Сервис доставки сообщений временно не доступен.');
        } else {
          alert('Ошибка HTTP ' + req.status);
        }        

      }, false)
    })
  }

  document.addEventListener("DOMContentLoaded", ready);
})()