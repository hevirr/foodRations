import {postData} from '../services/services';

function forms(modalSelector) {

    const forms = document.querySelectorAll('form'),
          modalWindow = document.querySelector(modalSelector),
          message = {
              loading: 'img/form/spinner.svg',
              success: 'Form has been sent',
               failure: 'Something gone wrong, try again later'
          };

    forms.forEach(e => {
        bindPostData(e);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const jsonFormData = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', jsonFormData)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        modalWindow.classList.add('show');
        document.body.style.overflow = 'hidden';

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        modalWindow.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();

            modalWindow.classList.remove('show');
            document.body.style.overflow = '';

            prevModalDialog.classList.remove('hide');
        }, 4000);
    }
}

export default forms;