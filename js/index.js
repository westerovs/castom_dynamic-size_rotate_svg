// =============================================================================
//                                  megaclass
// =============================================================================
class Megaclass {
    constructor(element) {
        // ===== elem
        this.element = element;
        this.elementWidth = element.offsetWidth;
        this.elementHeight = element.offsetHeight;
        this.elementRotate = element.style.transform;
        this.elementRotate = 0;
        this.centerElTop = this.element.getBoundingClientRect().top + this.element.offsetHeight / 2;
        this.centerElLeft = this.element.getBoundingClientRect().left + this.element.offsetWidth / 2;
        // for reset
        this.startElementWidth = element.offsetWidth;
        this.startElementHeight = element.offsetHeight;
        this.startElementRotate = element.style.transform;

        // ===== megaclass
        this.megaclassBody = document.querySelector('.megaclass');
        this.megaclassSize = document.querySelectorAll('.megaclass__size');
        this.megaclassRotate = document.querySelectorAll('.megaclass__rotate');
        this.outWidth = document.querySelector('.megaclass__out-text-width');
        this.outHeight = document.querySelector('.megaclass__out-text-height');
        this.outRotate = document.querySelector('.megaclass__out-text-rotate');
        this.reset = document.querySelector('.megaclass__out--resete');

        this.startWidth = 0;
        this.startHeight = 0;
        this.startRotate = 0;
        this.startTouchesRotateX = 0;
        this.startTouchesRotateY = 0;

        this.element.before(this.megaclassBody)
        this.megaclassBody.style.top = `${element.offsetTop}px`;
        this.megaclassBody.style.left = `${element.offsetLeft}px`;
        this.megaclassBody.style.width = `${element.offsetWidth}px`;
        this.megaclassBody.style.height = `${element.offsetHeight}px`;

        this.startTouches = 0;

        // size
        this.megaclassSize.forEach(item => {
            item.addEventListener('touchstart', this.touchStart);
            item.addEventListener('touchmove', this.touchMove);
            item.addEventListener('touchend', this.touchEnd);
        })

        // rotate
        this.megaclassRotate.forEach(item => {
            item.addEventListener('touchstart', this.touchStartRotate);
            item.addEventListener('touchmove', this.touchMoveRotate);
            item.addEventListener('touchend', this.touchEndRotate);
        })

        this.reset.addEventListener('touchstart', this.resetAll)
    }

    // ======================== SIZE ========================
    touchStart = (event) => {
        event.stopPropagation();
        event.preventDefault();

        event.target.style.backgroundColor = 'red';

        this.startTouches = event.targetTouches[0];
        this.startWidth = this.elementWidth;
        this.startHeight = this.elementHeight;

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.elementRotate;
    }

    touchMove = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let moveTouches = event.targetTouches[0];

        let differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY;
        let differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX;

        // height
        this.elementHeight = this.startHeight + differenceStartMoveY;
        this.element.style.height = `${this.elementHeight}px`;
        this.megaclassBody.style.height = `${this.elementHeight}px`;

        // width
        this.elementWidth = this.startWidth + differenceStartMoveX;
        this.element.style.width = `${this.elementWidth}px`;
        this.megaclassBody.style.width = `${this.elementWidth}px`;

        // out
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.elementRotate;
        this.outRotate.innerHTML = `${this.elementRotate}`;

    }

    touchEnd = () => {
        event.target.style.backgroundColor = 'blue';
    }

    // ======================== ROTATE ========================
    touchStartRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouchesRotateX = this.centerElLeft;
        this.startTouchesRotateY = this.centerElTop;
        console.log(this.startTouchesRotateX)
        console.log(this.startTouchesRotateY)


        // ======================================================
        // this.startTouches = event.targetTouches[0];
        // this.startRotate = this.elementRotate;
        // this.outRotate.innerHTML = `${this.elementRotate}`;
        event.target.style.opacity = '1';
    }

    touchMoveRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        // get center element !!
        // let centerElTop = this.element.getBoundingClientRect().top + this.element.offsetHeight / 2;
        // let centerElLeft = this.element.getBoundingClientRect().left + this.element.offsetWidth / 2;

        console.log(this.element.offsetTop)
        // ======================================================
        // let moveTouches = event.targetTouches[0];
        // let differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY;
        // let differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX;


        // // rotate
        // if (differenceStartMoveY > 0 && differenceStartMoveX > 0) {
        //     this.elementRotate = this.startRotate + differenceStartMoveY;
        //     this.element.style.transform = `rotate(${this.elementRotate}deg)`;
        //     this.megaclassBody.style.transform = `rotate(${this.elementRotate}deg)`;
        // }
        // else {
        //     this.elementRotate = this.startRotate + differenceStartMoveY;
        //     this.element.style.transform = `rotate(${this.elementRotate}deg)`;
        //     this.megaclassBody.style.transform = `rotate(${this.elementRotate}deg)`;
        // }

        // // out
        // this.outWidth.innerHTML = this.elementWidth;
    }

    touchEndRotate = () => {
        event.target.style.opacity = '0.5';
    }

    resetAll = () => {
        this.element.style.width = `${this.startElementWidth}px`;
        this.element.style.height = `${this.startElementHeight}px`;
        this.megaclassBody.style.width = `${this.startElementWidth}px`;
        this.megaclassBody.style.height = `${this.startElementHeight}px`;

        this.elementWidth = this.startElementWidth;
        this.elementHeight = this.startElementHeight;

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.elementRotate;
    }
} // end megaclass

// =============================================================================
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const svg = document.querySelector('.svg');

const megaclass = new Megaclass(img1);

// console.warn(getComputedStyle(img1).transform);














// function size(container) {
//     const div = document.createElement('div');
//     div.style.cssText = `
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 40px;
//     height: 40px;
//     background: blue;`
//     container.prepend(div);
// }


// document.addEventListener('click', outline);

// let flag = false;
// let set = new Set();

// function outline(event) {
//     flag = !flag;
//     if (
//         event.target.tagName === 'IMG' ||
//         event.target.tagName === 'PNG' ||
//         event.target.tagName === 'path' ||
//         event.target.tagName === 'SVG'
//     ) {
//         if (!flag) {
//             event.target.classList.add('outline');
//             set.add(event.target);
//             size(event.target)
//             console.log(event.target.getBoundingClientRect())
//         } else {
//             event.target.classList.remove('outline');
//         }
//     }
// }