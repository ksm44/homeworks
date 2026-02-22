let closeBtn = document.querySelector('.modal__close');
let modal = document.querySelector('#subscribe-modal');

const setCookie = function (name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}`;
}

const getCookie = function (name) {
    for (const item of document.cookie.split('; ')) {
        const [nameItem, valueItem] = item.split('=');

        if (decodeURIComponent(nameItem) === name) {
            return valueItem;
        }
    }
}

const isHideModal = getCookie('hide-modal');

if (isHideModal) {
    modal.classList.remove('modal_active');
} else {
    modal.classList.add('modal_active');
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    setCookie('hide-modal', 'true');
})