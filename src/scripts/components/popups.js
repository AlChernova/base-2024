/* ==== попапы ==== */

/* = Нативный dialog Модальное окно = */
const listBtnPopup = document.querySelectorAll('[data-modal]');
const listCloseBtnPopup = document.querySelectorAll('[data-modal-close]');
const listPopup = document.querySelectorAll('.winModal');

// открыть
if (listBtnPopup.length != 0) {
    listBtnPopup.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-modal]');
            if (!thisBtn) return;
            let target = thisBtn.getAttribute('data-modal');
            document.querySelector(`#${target}`).showModal();
            document.body.classList.add("scroll-lock");
        });
    });
}

// анимация закрытия 
function animateCloseModal(modal) {
    modal.classList.add("hide");
    let onAnimationEnd = () => {
        modal.classList.remove("hide");
        modal.close();
        modal.removeEventListener("animationend", onAnimationEnd);
    };            
    
    modal.addEventListener("animationend", onAnimationEnd);
    document.body.classList.remove("scroll-lock");
};

// закрыть кнопкой
if (listCloseBtnPopup.length != 0) {
    listCloseBtnPopup.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-modal-close]');
            if (!thisBtn) return;
            let thisPopup = thisBtn.closest('dialog');
            animateCloseModal(thisPopup);
            // thisPopup.close();
        });
    });
}

// закрыть кликом по фону
const handleModalClick = ({ currentTarget, target }) => {
    const isClickedOnBackdrop = target === currentTarget;
    if (isClickedOnBackdrop) {
        animateCloseModal(currentTarget);
    }
};
/*  */
if (listPopup.length != 0) {
    listPopup.forEach(popup => {
        let blocker = popup.hasAttribute('data-blocker');
        if (!blocker) {
            /* если просто модалка, то вешаем закрытие по фону */
            popup.addEventListener("click", handleModalClick);
        } else {
            /* если блокирующая модалка, то сразу открываем и убираем закрытие по отмене */
            popup.showModal();
            popup.addEventListener('cancel', (event) => {
                event.preventDefault();
            });
        }
    });
}

/* = FANCYBOX =*/
// отключаем функции карусели для текстовых окон,
// а то когда их несколько, он объединяет их в карусель 
Fancybox.bind("[data-fancybox='dialog']", {
    groupAttr: false,
    infinite: false,
    // этот пункт сделать для картинок чтобы отключить превью
    Thumbs: {
        autoStart: false
    }
}); 


/* = Нативный dialog просто поп-ап (типа ушек алертов) = */
const listBtnAlert = document.querySelectorAll('[data-popup]');
const listCloseBtnAlert = document.querySelectorAll('[data-popup-close]');

// открыть
if (listBtnAlert.length != 0) {
    listBtnAlert.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-popup]');
            if (!thisBtn) return;
            let target = thisBtn.getAttribute('data-popup');
            document.querySelector(`#${target}`).show();
        });
    });
}

// закрыть
if (listCloseBtnAlert.length != 0) {
    listCloseBtnAlert.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-popup-close]');
            if (!thisBtn) return;
            let thisPopup = thisBtn.closest('dialog');
            animateCloseModal(thisPopup);
            // thisPopup.close();
        });
    });
}

/* ==END == попапы ==== */

