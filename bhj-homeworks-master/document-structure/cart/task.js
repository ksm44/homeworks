let quantityBtn = document.querySelectorAll('.product__quantity-control');
let addBtn = document.querySelectorAll('.product__add');
let productQuantities = document.querySelectorAll('.product__quantity-value');
let cartProducts = document.querySelector('.cart__products');
let images = {
    0: 'https://pokushai.kz/uploads/files/640x480_f8f13b9f33dbb71ced4a24d4a9e09c89.jpg',
    1: 'https://cs8.pikabu.ru/post_img/2017/09/21/6/150598626812465714.jpg',
    2: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Esox_lucius1.jpg',
    3: 'https://web-zoopark.ru/wp-content/uploads/2018/06/5-48.jpg'
};
let basket = document.querySelector('.cart__title');
basket.style.visibility = 'hidden';


quantityBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let count = btn.parentElement.querySelector('.product__quantity-value').innerText;
        if (btn.classList.contains('product__quantity-control_dec') && count > 1) {
            btn.parentElement.querySelector('.product__quantity-value').innerText = Number(count) - 1;
        }

        if (btn.classList.contains('product__quantity-control_inc')) {
            btn.parentElement.querySelector('.product__quantity-value').innerText = Number(count) + 1;
        }
    })
});

addBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {

        let cart = document.createElement('div');
        let img = document.createElement('img');
        let cartCount = document.createElement('div');
        let cartDelete = document.createElement('div');

        cart.classList.add('cart__product');
        img.classList.add('cart__product-image');
        cartCount.classList.add('cart__product-count');
        cartCount.innerText = productQuantities[index].innerText;
        cartDelete.classList.add('cart__product-delete');
        cart.setAttribute('data-id', index + 1);
        img.src = images[index];

        cart.appendChild(img);
        cart.appendChild(cartDelete);
        cart.appendChild(cartCount);


        //проверяем наличие добавленной карточки
        if (cartProducts.querySelector('[data-id="' + (index + 1) + '"]')) {
            let count = Number(document.querySelector('[data-id="' + (index + 1) + '"]').lastChild.innerText);
            cartProducts.querySelector('[data-id="' + (index + 1) + '"]').lastChild.innerText = count + Number(productQuantities[index].innerText);
        } else {
            cartProducts.appendChild(cart);
            basket.style.visibility = 'visible';
        }

        //нажатие кнопки удаления карточки
        cartDelete.addEventListener('click', () => {
            cartProducts.removeChild(cart);

            if (!cartProducts.querySelector('.cart__product')) {
                basket.style.visibility = 'hidden';
            }
        });

    });
});