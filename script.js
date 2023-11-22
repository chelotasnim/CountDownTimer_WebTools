const box = document.querySelector('.box');
const beep = document.querySelector('#beep');
const ssbtn = document.querySelector('#s-s-btn');

let time = {
    m: 0,
    s: 0,
    ms: 0
}
let start = false;
let end = false;
let fn = null;
let use_mouse = false;

function setDisplay(type) {
    document.querySelector(`#${type}`).innerHTML = time[type] < 10 ? `0${time[type]}` : time[type];
};

function setTime(type, dir) {
    dir == 1 ? time[type] < 59 ? time[type]++ : time[type] = 0 : time[type] > 0 ? time[type]-- : time[type] = 59;
    setDisplay(type);
};

function setMs(dir) {
    dir == 1 ? time.ms < 999 ? time.ms += 10 : time.ms = 0 : time.ms > 0 ? time.ms -= 10 : time.ms = 999;
    let digit = time.ms;
    if (time.ms < 100) {
        digit = `0${time.ms}`;
    };

    if (time.ms < 10) {
        digit = `00${time.ms}`;
    };

    if (time.ms <= 0) {
        digit = '000';
    };
    document.querySelector('#ms').innerHTML = digit;
};

function stopTime() {
    start = false;
    box.classList.add('paused');
    ssbtn.innerHTML = `<i class='bx bx-play'></i>`;
    clearInterval(fn);
};

function resetTime() {
    start = false;
    end = false;
    use_mouse = false;

    box.classList.remove('beep');
    box.classList.remove('on-timer');
    box.classList.remove('paused');
    ssbtn.innerHTML = `<i class='bx bx-play'></i>`;

    beep.pause();
    beep.currentTime = 0;

    time.m = 1;
    time.s = 1;
    time.ms = 1;

    setTime('m', 0);
    setTime('s', 0);
    setMs(0);
    clearInterval(fn);
};

function startTime() {
    if (start === false && end === false) {
        if (time.m > 0 || time.s > 0 || time.ms > 0) {
            ssbtn.innerHTML = `<i class='bx bx-pause'></i>`;
            fn = setInterval(() => {
                start = true;
                box.classList.remove('paused');
                box.classList.add('on-timer');
                setMs(0);
                if (time.ms === 999) {
                    setTime('s', 0);
                };

                if (time.ms === 999 && time.s === 59) {
                    setTime('m', 0);
                };

                if (time.m <= 0 && time.s <= 0 && time.ms <= 0) {
                    start = false;
                    end = true;
                    clearInterval(fn);

                    box.classList.add('beep');
                };

                if (time.m <= 0 && time.s <= 0 && time.ms <= 100) {
                    beep.play();
                };
            }, 10);
        };
    } else if (start === false && end === true) {
        resetTime();
    } else if (start === true && end === false) {
        stopTime();
    };
};

ssbtn.addEventListener(
    'click', function () {
        if (time.m > 0 || time.s > 0 || time.ms > 0) {
            startTime();
            use_mouse = true;
        };
    }
);

window.addEventListener(
    'keyup', e => {
        if (use_mouse === false) {
            if (e.key === 'Enter') {
                startTime();
            };
        };

        if (e.key === 'r') {
            resetTime();
        };
    }
);