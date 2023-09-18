const bigHOne = document.querySelector('.big-h1');
let isNegative = false;

// Patrick's code with some additions and minor modifications by myself
class Time {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    addTimes(time2) {
        let sumSeconds = this.seconds + time2.seconds;
        let sumMinutes = this.minutes + time2.minutes;
        let sumHours = this.hours + time2.hours;

        if (sumSeconds >= 60) {
            sumMinutes += Math.floor(sumSeconds / 60);
            sumSeconds %= 60;
        }

        if (sumMinutes >= 60) {
            sumHours += Math.floor(sumMinutes / 60);
            sumMinutes %= 60;
        }

        return new Time(sumHours, sumMinutes, sumSeconds);
    }

    subTimes(time3) {
        let subSeconds = time3.seconds - this.seconds;
        let subMinutes = time3.minutes - this.minutes;
        let subHours = time3.hours - this.hours;

        console.log(`time3: ${time3.hours}:${time3.minutes}:${time3.seconds}`);
        console.log(`this: ${this.hours}:${this.minutes}:${this.seconds}`);
        console.log(`subSeconds: ${subSeconds}`);
        console.log(`subMinutes: ${subMinutes}`);

        if (subSeconds >= 60) {
            subMinutes -= Math.floor(subSeconds / 60);
            subSeconds %= 60;
        }

        if (subMinutes >= 60) {
            subHours -= Math.floor(subMinutes / 60);
            subMinutes %= 60;
        }

        return new Time(subHours, subMinutes, subSeconds);
    }

    printTime() {
        if (this.hours < 10) {
            this.hours = '0' + this.hours;

            if (isNegative) {
                this.hours = '-' + this.hours;
            }
        }

        if (this.minutes < 10) {
            this.minutes = '0' + this.minutes;
        }

        if (this.seconds < 10) {
            this.seconds = '0' + this.seconds;
        }

        //console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
        bigHOne.innerText = `${this.hours}:${this.minutes}:${this.seconds}`;
    }
}

function sumVideos(myArr) {
    let sumTotalTime = new Time(0, 0, 0);

    sumTotalTime = myArr.reduce((totalTime, element) => {
        let arrTemp = element.toString().split(':');
        let [vidHours, vidMins, vidSecs] = arrTemp.map(Number);

        let sumNewTime = new Time(vidHours, vidMins, vidSecs);

        return totalTime.addTimes(sumNewTime);
    }, new Time(0, 0, 0));

    sumTotalTime.printTime();
}

function subVideos(myArr) {
    let vidHours = 0;
    let vidMins = 0;
    let vidSecs = 0;
    let tempSecsArr = [];

    for (let i = 0; i < myArr.length; i++) {
        vidHours = (+myArr[i][0] * 3600);
        vidMins = vidHours + (+myArr[i][1] * 60);
        vidSecs = vidMins + +myArr[i][2];

        tempSecsArr.push(vidSecs);
    }

    vidSecs = tempSecsArr[0];

    for (let j = 1; j < tempSecsArr.length; j++) {
        vidSecs -= tempSecsArr[j];
    }

    if (vidSecs < 0) {
        isNegative = true;
        vidSecs *= -1;
    } else {
        isNegative = false;
    }

    vidHours = (vidSecs - (vidSecs % 3600)) / 3600;
    vidSecs -= (vidHours * 3600);
    vidMins = (((vidSecs - (vidSecs % 60))) / 60);
    vidSecs -= (vidMins * 60);

    let subTotalTime = new Time(vidHours, vidMins, vidSecs);

    subTotalTime.printTime();
}

// const videoLengths = ['0:16:29', '0:14:59', '0:14:24', '0:3:53', '0:19:44', '0:16:44'];

//sumVideos(videoLengths);

// My code
inputContainer = document.querySelector('.input-container');
inputGroups = document.getElementsByClassName('input-group');
incBtn = document.querySelector('.inc-btn');
decBtn = document.querySelector('.dec-btn');
addBtn = document.querySelector('.add-btn');
subBtn = document.querySelector('.sub-btn');
clrBtn = document.querySelector('.clr-btn');

function incBtnLogic() {
    const clone = inputGroups[0].cloneNode(true);
    const inputs = clone.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    clone.setAttribute('style', 'display: none');
    inputContainer.appendChild(clone);
    setTimeout(() => clone.classList.add('animate-in1'));
    setTimeout(() => clone.setAttribute('style', 'display: absolute'));
    setTimeout(() => clone.classList.add('animate-in2'), 100);
}

function decBtnLogic() {
    inputToDel = inputGroups[inputGroups.length - 1];
    inputToDel.classList.remove('animate-in1', 'animate-in2');

    if (inputGroups.length > 2) {
        setTimeout(() => inputToDel.classList.add('animate-out1'));
        setTimeout(() => inputToDel.classList.add('animate-out2'));

        setTimeout(() => inputToDel.remove(), 500);
    }
}

function addBtnLogic() {
    let inputArr = [];
    let sumArr = [];

    for (let i = 0; i < inputGroups.length; i++) {
        const inputs = inputGroups[i].getElementsByTagName('input');
        inputArr = [`${inputs[0].value}:${inputs[1].value}:${inputs[2].value}`];
        sumArr.push(inputArr);
    }

    sumVideos(sumArr);
}

function subBtnLogic() {
    let inputArr = [];
    let sumArr = [];

    for (let i = 0; i < inputGroups.length; i++) {
        const inputs = inputGroups[i].getElementsByTagName('input');
        inputArr = [inputs[0].value, inputs[1].value, inputs[2].value];
        sumArr.push(inputArr);
    }

    subVideos(sumArr);
}

function clrBtnLogic() {
    const inputs = inputContainer.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

incBtn.addEventListener('click', incBtnLogic);
decBtn.addEventListener('click', decBtnLogic);
addBtn.addEventListener('click', addBtnLogic);
subBtn.addEventListener('click', subBtnLogic);
clrBtn.addEventListener('click', clrBtnLogic);