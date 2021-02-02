function modal(modalSelector) {

    const modalOpenButtons = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector(modalSelector);

    function modalToggle() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = (document.body.style.overflow == 'hidden') ? ('') : ('hidden');
        modalDone();
    }
    function scrollOpenModal() {
        if (document.documentElement.clientHeight + document.documentElement.scrollTop == document.documentElement.scrollHeight) {
            modalToggle();
        }
    }
    function modalDone() {
        if (modalWindow.classList.contains('show')) {
            document.removeEventListener('scroll', scrollOpenModal);
            clearTimeout(modalTimeout);
        }
    }

    const modalTimeout = setTimeout(modalToggle, 3000);
    document.addEventListener('scroll', scrollOpenModal);

    modalOpenButtons.forEach(e => {
        e.addEventListener('click', modalToggle);
    });

    modalWindow.addEventListener('click', (ev) => {
        if (ev.target == modal || ev.target.classList.contains('modal__close')) {
            modalToggle();
        }
    });
    document.addEventListener('keydown', (ev) => {
        if (modalWindow.classList.contains('show') && ev.code === 'Escape') {
            modalToggle();
        }
    });
}

export default modal;