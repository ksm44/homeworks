const fontSizers = [...document.querySelectorAll('.font-size')];
let fontSize;

fontSizers.forEach((fontSizer) => {
    fontSizer.addEventListener('click', (e) => {
        e.preventDefault();

        fontSizers.forEach((item) => {
            item.classList.remove('font-size_active');
        });

        fontSizer.classList.add('font-size_active');
        const sizeFontValue = fontSizer.getAttribute('data-size');

        const book = document.querySelector('.book');
        book.className = '';

        if (sizeFontValue === null) {
            book.classList.add('book');
        } else {
            book.classList.add('book', `book_fs-${sizeFontValue}`)
        }
    })
})