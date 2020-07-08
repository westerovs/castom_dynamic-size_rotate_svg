// =============================================================================
//                                  megaclass
// =============================================================================
class Megaclass {
    constructor(element) {
        // elem на котором происходит магия
        this.element = element;

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
        this.elementWidth = element.offsetWidth;
        this.elementHeight = element.offsetHeight;
        this.elementRotate = element.style.transform;

        // for reset
        this.startElementWidth = element.offsetWidth;
        this.startElementHeight = element.offsetHeight;
        this.startElementRotate = element.style.transform;

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

    // ======================== size ========================
    touchStart = (event) => {
        event.stopPropagation();
        event.preventDefault();

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

        event.target.style.backgroundColor = 'red';

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.elementRotate;

        // height
        let differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY;
        this.elementHeight = this.startHeight + differenceStartMoveY;
        this.element.style.height = `${this.elementHeight}px`;
        this.megaclassBody.style.height = `${this.elementHeight}px`;

        // width
        let differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX;
        this.elementWidth = this.startWidth + differenceStartMoveX;
        this.element.style.width = `${this.elementWidth}px`;
        this.megaclassBody.style.width = `${this.elementWidth}px`;
    }

    touchEnd = () => {
        event.target.style.backgroundColor = 'blue';
    }

    // ======================== rotate ========================
    touchStartRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouches = event.targetTouches[0];
    }

    touchMoveRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let moveTouches = event.targetTouches[0];
        event.target.style.opacity = '1';
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