const reveals = [ ...document.querySelectorAll('.reveal')];

window.addEventListener('scroll', function () {

    reveals.forEach((reveal) => {
        const position = reveal.getBoundingClientRect();

        if (position.top < window.innerHeight && position.bottom > 0) {
            reveal.classList.add('reveal_active');
        } else {
            reveal.classList.remove('reveal_active');
        }
    })

});