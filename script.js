'use strict';
const data = {
    num: 0,
    itemIndex: 5,
    clickActive: true,
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
};

const slideWidth = parseInt(data.widthComp(), 10) + parseInt(data.marginComp(), 10) * 2;

const btnNextMethod = () => {
    if (data.itemIndex < 11) {
        data.itemIndex++;
    }

    data.num -= slideWidth;
    data.nodeArr.forEach(el => {
        el.style.transform = `translate(${data.num}px)`;
    });

    if (data.itemIndex === 10) {
        setTimeout(() => {
            data.nodeArr.forEach(el => {
                el.style.transition = 'all 0s';
                el.style.transform = `translate(${0}px)`;

            })
            data.num = 0;
        }, 500);
        setTimeout(() => {
            data.nodeArr.forEach(el => {
                el.style.transition = 'transform 0.5s';
            })
        }, 520);
        data.itemIndex = 5;
    }
    data.clickActive = false;
};

data.btnNext.addEventListener('click', () => {
    if (data.clickActive) {
        requestAnimationFrame(btnNextMethod);

        setTimeout(() => {
            data.clickActive = true;
        }, 600);
    }
});

const btnPrevMethod = () => {
    if (data.itemIndex > 0) {
        data.itemIndex--;
    }

    data.num += slideWidth;

    data.nodeArr.forEach(el => {
        el.style.transform = `translate(${data.num}px)`;
    });

    if (data.itemIndex === 0) {
        setTimeout(() => {
            data.nodeArr.forEach(el => {
                el.style.transition = 'all 0s';
                el.style.transform = `translate(${0}px)`;
            });
            data.num = 0;
        }, 500);

        setTimeout(() => {
            data.nodeArr.forEach(el => {
                el.style.transition = 'transform 0.5s';
            });

        }, 520);
        data.itemIndex = 5;
    }
    data.clickActive = false;
};

data.btnPrev.addEventListener('click', () => {
    if (data.clickActive) {
        requestAnimationFrame(btnPrevMethod);

        setTimeout(() => {
            data.clickActive = true;
        }, 600);
    }
});
