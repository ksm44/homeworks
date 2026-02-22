let editor = document.getElementById('editor');

if (localStorage.cashed) {
    editor.value = localStorage.cashed;
}

window.addEventListener('beforeunload', (e) => {
    if (editor.value.trim()) {
        localStorage.setItem('cashed', editor.value.trim())
    }
})

editor.insertAdjacentHTML('afterend', '<button>Очистить</button>')
document.querySelector('button').addEventListener('click', () => {
    editor.value = '';
});