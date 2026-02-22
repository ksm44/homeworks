const signIn = document.getElementById('signin');
const signInBtn = document.getElementById('signin__btn');
const signInForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');

const cashedUserId = localStorage.getItem('user-id');

if (cashedUserId) {
    signIn.classList.remove('signin_active');
    welcome.classList.add('welcome_active');
    userId.innerText = cashedUserId;
}

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(signInForm);
    const xhr = new XMLHttpRequest();
    const URL = 'https://students.netoservices.ru/nestjs-backend/auth';

    xhr.open('POST', URL);
    xhr.send(form)

    xhr.onloadend = () => {
        if (xhr.readyState === xhr.DONE) {
            const response = JSON.parse(xhr.response);

            if (response.success) {
                signInForm.querySelectorAll('input').forEach(input => input.value = '')

                signIn.classList.remove('signin_active');
                welcome.classList.add('welcome_active');
                userId.innerText = response.user_id;
                localStorage.setItem('user-id', response.user_id);
            } else {
                alert('Неверные логин/пароль');
            }
        }
    }
})

welcome.insertAdjacentHTML('beforeend', '<button class="btn" id="signout__btn">Выйти</button>');
document.getElementById('signout__btn').addEventListener('click', () => {
    localStorage.removeItem('user-id');
    signIn.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
})