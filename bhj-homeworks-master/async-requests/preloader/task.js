let loader = document.querySelector('#loader');
let items = document.querySelector('#items');
let response;
let cashedData;

cashedData = JSON.parse(localStorage.getItem('lastResponse'));

if (cashedData) {
    loader.classList.remove('loader_active');
    Object.entries(cashedData.response.Valute).forEach((keyValute, dataValute) => {
        let item = document.createElement('div');
        item.classList.add('item');
        items.appendChild(item);
        item.insertAdjacentHTML('afterbegin',
            `<div class="item__code">${keyValute[1].CharCode}</div>
            <div class="item__value">${keyValute[1].Value}</div>
            <div class="item__currency">руб.</div>`
        );
    })
}

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.responseType = 'json';
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
        loader.classList.remove('loader_active');
        response = xhr.response;
        localStorage.setItem('lastResponse', JSON.stringify(response));
        items.replaceChildren();

        Object.entries(response.response.Valute).forEach((keyValute, dataValute) => {
            let item = document.createElement('div');
            item.classList.add('item');
            items.appendChild(item);
            item.insertAdjacentHTML('afterbegin',
                `<div class="item__code">${keyValute[1].CharCode}</div>
                <div class="item__value">${keyValute[1].Value}</div>
                <div class="item__currency">руб.</div>`
            );
        })
    }
}
