const progress = document.getElementById('progress');
const btn = document.getElementById('file');
const file = btn.files[0];
const form = document.getElementById('form');

progress.style.visibility = 'hidden';

let url = 'https://students.netoservices.ru/nestjs-backend/upload';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            progress.style.visibility = 'visible';
            progress.value = (e.loaded / e.total);
        }
    };

    xhr.upload.onloadend = () => {
        progress.style.visibility = 'hidden';
    }

    xhr.send(formData);
});