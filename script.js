'use strict';
const data = {
    mouseDownX: '',
    mouseUpX: '',
    sliderContainer: document.querySelector('.slider_container--list'),
    nodeList: document.querySelectorAll('.pic'),
    btnNext: document.querySelector('.btn-next'),
    btnPrev: document.querySelector('.btn-prev'),
    item: document.querySelector('.pic'),
    num: 0,
    itemIndex: 5,
    clickActive: true,
    widthComp: function() {
        return getComputedStyle(this.item).getPropertyValue('width');
    },
    marginComp: function() {
        return getComputedStyle(this.item).getPropertyValue('margin');
    },
};

const slideWidth = parseInt(data.widthComp(), 10) + parseInt(data.marginComp(), 10) * 2;

const translateToZero = () => {
    for (const el of data.nodeList) {
        el.style.transition = 'transform 0s';
        el.style.transform = `translate(${0}px)`;
    }
    data.num = 0;
    data.itemIndex = 5;
};

const resetTransition = () => {
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
        data.item.addEventListener('transitionend', () => {
            data.clickActive = true;
        });
    }
    data.clickActive = false;
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
        data.item.addEventListener('transitionend', () => {
            data.clickActive = true;
        });
    }
    data.clickActive = false;
};

// BUTTON LISTENERS
data.btnNext.addEventListener('click', () => {
    if (data.clickActive) {
        requestAnimationFrame(btnNextMethod);
    }
});

data.btnPrev.addEventListener('click', () => {
    if (data.clickActive) {
        requestAnimationFrame(btnPrevMethod);
    }
});

// SWIPE LISTENERS

data.sliderContainer.addEventListener('mousedown', e => {
    data.mouseDownX = e.clientX;
});

data.sliderContainer.addEventListener('mouseup', e => {
    data.mouseUpX = e.clientX;
    if (data.mouseDownX < data.mouseUpX && data.clickActive) {
        requestAnimationFrame(btnPrevMethod);
    } else if (data.mouseDownX > data.mouseUpX && data.clickActive) {
        requestAnimationFrame(btnNextMethod);
    }
});
