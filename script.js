'use strict';
const data = {
    nodeList: document.querySelectorAll('.pic'),
    btnNext: document.querySelector('.btn-next'),
    btnPrev: document.querySelector('.btn-prev'),
    item: document.querySelector('.pic'),
    num: 0,
    itemIndex: 5,
    clickActive: true,
    widthComp: function () {
        return getComputedStyle(this.item).getPropertyValue('width');
    },
    marginComp: function () {
        return getComputedStyle(this.item).getPropertyValue('margin');
    }
};

const slideWidth = parseInt(data.widthComp(), 10) + parseInt(data.marginComp(), 10) * 2;

 
function translateToZero() {
    console.log('transitionend');
    for (const el of data.nodeList) {
        el.style.transition = 'transform 0s';
        el.style.transform = `translate(${0}px)`;
    }
    data.num = 0;
    data.itemIndex = 5;
}

const resetTransition = () => {
    console.log('transitionCancel');
    for (const el of data.nodeList) {
        el.style.transition = 'transform 0.3s';
    }
};

const btnNextMethod = () => {
    if (data.itemIndex < 11) {
        data.itemIndex++;
    }
    data.num -= slideWidth;
    for (const el of data.nodeList) {
        el.style.transform = `translate(${data.num}px)`;
    }

    if (data.itemIndex === 10) {
        data.item.addEventListener('transitionend', translateToZero);
        data.item.addEventListener('transitioncancel', resetTransition);
    } else {
        data.item.removeEventListener('transitionend', translateToZero);
    }
    data.clickActive = false;
    console.log(data.itemIndex);
};

const btnPrevMethod = () => {
    if (data.itemIndex > 0) {
        data.itemIndex--;
    }
    data.num += slideWidth;
    for (const el of data.nodeList) {
        el.style.transform = `translate(${data.num}px)`;
    }

    if (data.itemIndex === 0) {
        data.item.addEventListener('transitionend', translateToZero);
        data.item.addEventListener('transitioncancel', resetTransition);
    } else {
        data.item.removeEventListener('transitionend', translateToZero);
    }
    data.clickActive = false;
};


// BUTTON LISTENERS
data.btnNext.addEventListener('click', () => {
    if (data.clickActive) {
        requestAnimationFrame(btnNextMethod);
        data.item.addEventListener('transitionend', () => {
            data.clickActive = true;
        });
    }
});

data.btnPrev.addEventListener('click', () => {
    if (data.clickActive) {
        requestAnimationFrame(btnPrevMethod);
        data.item.addEventListener('transitionend', () => {
            data.clickActive = true;
        });
    }
});
