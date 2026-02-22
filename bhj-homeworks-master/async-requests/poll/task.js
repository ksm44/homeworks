const title = document.getElementById('poll__title');
const answers = document.getElementById('poll__answers');

const xhr = new XMLHttpRequest();
const URL = 'https://students.netoservices.ru/nestjs-backend/poll';


xhr.open('GET', URL);
xhr.responseType = 'json';
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
        response = xhr.response;

        title.innerHTML = response.data.title;
        response.data.answers.forEach(item => {
            answers.insertAdjacentHTML('afterbegin',
                `<button class="poll__answer">
                    ${item}
                </button>
            `);
        })

        const answerBtns = [...document.querySelectorAll('.poll__answer')];

        answerBtns.forEach((btn, indexBtn) => {
            btn.addEventListener('click', () => {
                alert('Спасибо, ваш голос засчитан!');
                getStatistic(indexBtn);
            })
        })
    }
};

function getStatistic(indexBtn) {
    xhr.onreadystatechange = null;
    xhr.onload = null;
    xhr.onerror = null;

    xhr.open('POST', URL);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    body = `vote=${response.id}&answer=${indexBtn}`;
    xhr.send(body);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            const response = xhr.response;
            answers.replaceChildren();

            let sum = 0;
            response.stat.forEach(answer => sum += answer.votes);

            response.stat.forEach(answer => {
                answers.insertAdjacentHTML('afterbegin',
                    `<div>
                        ${answer.answer}: <strong>${(100 / sum * answer.votes).toFixed(2)}%</strong>
                    </div>`
                );
            });
        };
    };
};