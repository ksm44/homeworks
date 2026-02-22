let input = document.querySelector('.tasks__input');
let tasksList = document.querySelector('.tasks__list');
let btn = document.querySelector('.tasks__add');
let form = document.querySelector('form');

input.focus();

//достаём информацию из хранилища
let keys = Object.keys(localStorage).sort((a, b) => a - b);
for (key of keys) {
    if (localStorage.hasOwnProperty(key)) {
        addTask(key, isReadOfLocalStorage = true);
    }
}

//отключаем дефолтную перезагрузку
form.addEventListener('submit', (e) => {
    e.preventDefault();
});


//добавление тасков по Enter
document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && input.value) {
        addTask();
    }
});

//добавление тасков по кнопке
btn.addEventListener('click', () => {
    if (input.value) {
        addTask();
        input.focus();
    }
});

function writingInLocalStorage() {
    let tasks = document.querySelectorAll('.task__title');
    localStorage.clear();
    tasks.forEach((task, index) => localStorage.setItem(index, task.innerText));
}

function addTask(key, isReadOfLocalStorage) {
    let newTask = document.createElement('div');
    let newTaskTitle = document.createElement('div');
    let newTaskRemoveLink = document.createElement('a');

    newTask.classList.add('task');
    newTaskTitle.classList.add('task__title');
    newTaskRemoveLink.classList.add('task__remove');
    newTaskRemoveLink.innerHTML = '&times;';

    newTaskRemoveLink.addEventListener('click', (e) => {

        //находим номер удаляемого таска и убираем его же из хранилища
        let tasks = document.querySelectorAll('.task__title');
        tasks.forEach((task, index) => {
            if (task === e.target.previousElementSibling) {
                console.log(index);
                localStorage.removeItem(index);
            }
        })

        tasksList.removeChild(newTask);

        //перезапись в хранилище по новому порядку {0:task1, 1:task2, 2:task3 и т.д.}
        writingInLocalStorage();
    });

    newTask.appendChild(newTaskTitle);
    newTask.appendChild(newTaskRemoveLink);

    newTaskTitle.innerText = input.value || localStorage[key];
    tasksList.appendChild(newTask);

    //запись в хранилище при создании таска
    if (!isReadOfLocalStorage) {
        writingInLocalStorage();
    }

    input.value = '';
}