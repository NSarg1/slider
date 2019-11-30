'use strict';
const data = {
    num: 0,
    nodeArr: Array.from(document.querySelectorAll('.pic')),
    btnNext: document.querySelector('.btn-next'),
    btnPrev: document.querySelector('.btn-prev'),
    item: document.querySelector('.pic'),
    widthComp: function () {
        return getComputedStyle(this.item).getPropertyValue('width')
    },
    marginComp: function () {
        return getComputedStyle(this.item).getPropertyValue('margin')
    },

}

let slideWidth = parseInt(data.widthComp(), 10) + parseInt(data.marginComp(), 10) * 2;
let slideEnd = slideWidth * 2;


let btnNextMethod = () => {
    console.log(data.num);
    if (data.num > -slideEnd) {
        data.num -= slideWidth;
    } else {
        data.num = slideEnd;
    }
    data.nodeArr.forEach(el => {
        el.style.transform = `translate(${data.num}px)`;
    });
}

let btnPrevMethod = () => {
    console.log(data.num);
    if (data.num < slideEnd) {
        data.num += slideWidth;
    } else {
        data.num = -slideEnd;
    }

    data.nodeArr.forEach(el => {
        el.style.transform = `translate(${data.num}px)`;
    });
}

data.btnNext.addEventListener('click', btnNextMethod);

data.btnPrev.addEventListener('click', btnPrevMethod);

setInterval(() => {
    btnNextMethod()
}, 4000);

















/*
let num = 1;
let element = document.querySelector('.js--pic-change');
let btnNext = document.querySelector('.btn-next');
let btnPrev = document.querySelector('.btn-prev');


btnNext.addEventListener("click", function (e) {
    if (element.classList.contains("slideFromRightToLeft")) {
        element.classList.remove("slideFromRightToLeft")
    }
    e.preventDefault;
    if (num === 3) {
        num = 1;
    } else {
        num++;
    }
    element.style.backgroundImage = `url(images/pic-${num}.jpg)`;


    element.classList.remove("slideFromLeftToRight");
    void element.offsetWidth;
    element.classList.add("slideFromLeftToRight");
}, false);

btnPrev.addEventListener("click", function (e) {
    if (element.classList.contains("slideFromLeftToRight")) {
        element.classList.remove("slideFromLeftToRight")
    }
    e.preventDefault;
    if (num === 1) {
        num = 3;
    } else {
        num--;
    }
    element.style.backgroundImage = `url(images/pic-${num}.jpg)`;


    element.classList.remove("slideFromRightToLeft");
    void element.offsetWidth;
    element.classList.add("slideFromRightToLeft");
}, false);*/
