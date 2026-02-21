const rotators = [...document.querySelectorAll('.rotator__case')];
const defaulttimer = 1000;
let timer;
let colorRotator;
let next;
let intervalId;

function change() {
    let firsTimeFlag = true;
    rotators.forEach((rotator) => {

        if (firsTimeFlag) {
            if (rotator.classList.contains('rotator__case_active')) {
                firsTimeFlag = false;
                rotator.classList.remove('rotator__case_active');
                next = rotators[(rotators.indexOf(rotator) + 1) % rotators.length];
                colorRotator = next.getAttribute('data-color');
                timer = next.getAttribute('data-speed');
                next.classList.add('rotator__case_active');
                next.style.color = colorRotator;
                if (intervalId) clearInterval(intervalId);
                intervalId = setInterval(change, timer || defaulttimer);
            }            
        }
    });
}

change();