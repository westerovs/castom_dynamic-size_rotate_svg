// =================================================
//                                  megaclass
// =================================================
class Megaclass {
    constructor(element) {
        // ===== elem
        this.element = element;
        this.element.style.transform = "rotate(0deg)";
        this.elementWidth = element.offsetWidth;
        this.elementHeight = element.offsetHeight;
        this.elementBoundingTop = this.element.getBoundingClientRect().top;
        this.elementBoundingLeft = this.element.getBoundingClientRect().left;
        this.elementRotate = element.style.transform;
        this.elementRotate = 0;
        this.centerElTop = 0;
        this.centerElLeft = 0;
        // for reset
        this.startElementWidth = element.offsetWidth;
        this.startElementHeight = element.offsetHeight;
        this.startElementRotate = 0;

        // ===== megaclass
        this.megaclassBody = document.querySelector('.megaclass');
        this.megaclassSize = document.querySelectorAll('.megaclass__size');
        this.megaclassRotate = document.querySelectorAll('.megaclass__rotate');
        this.outRow = document.querySelector('.megaclass__out-row');
        this.outWidth = document.querySelector('.megaclass__out-text-width');
        this.outHeight = document.querySelector('.megaclass__out-text-height');
        this.outRotate = document.querySelector('.megaclass__out-text-rotate');
        this.reset = document.querySelector('.megaclass__out--reset');

        this.startWidth = 0;
        this.startHeight = 0;
        this.startRotate = 0;
        this.startTouchesRotateX = 0;
        this.startTouchesRotateY = 0;

        // для зеркальности
        this.startProgressW = 0;
        this.startProgressH = 0;
        this.progressW = 0;
        this.progressH = 0;
        this.scaleX = 1;
        this.scaleY = 1;

        this.element.before(this.megaclassBody)
        this.megaclassBody.style.top = `${element.offsetTop}px`;
        this.megaclassBody.style.left = `${element.offsetLeft}px`;
        this.megaclassBody.style.width = `${element.offsetWidth}px`;
        this.megaclassBody.style.height = `${element.offsetHeight}px`;

        this.startTouches = 0;

        // for angle
        this.Nex;
        this.degree_angle;
        this.val = 0;
        this.startMouse;
        this.Dist;

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

    // =======================================================
    //                          SIZE
    // =======================================================
    touchStart = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouches = event.targetTouches[0];
        this.startWidth = this.elementWidth;
        this.startHeight = this.elementHeight;

        // out
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startElementRotate;

        // зеркальность
        this.startProgressW = this.progressW;
        this.startProgressР = this.progressР;
        this.progressW = this.startWidth;
        this.progressР = this.startHeight;
        event.target.style.backgroundColor = 'red';
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
        this.outRotate.innerHTML = this.val;

        // зеркальность
        this.progressW = this.elementWidth;
        this.progressH = this.elementHeight;

        if (this.progressW <= 1) {
            this.element.style.width = `${Math.abs(this.elementWidth)}px`;
            this.scaleX =- 1;
            this.element.style.transform = `scaleX(${this.scaleX}) scaleY(${this.scaleY})`;
            this.megaclassBody.style.width = `${Math.abs(this.elementWidth)}px`;

            // this.megaclassBody.style.transform = `scaleX(-1)`;
            // this.megaclassBody.style.transform = `translateX(${this.progressW}) scaleX(-1)`;
            // console.log(Math.abs(this.progressW))
        }
        if (this.progressH <= 1) {
            this.element.style.height = `${Math.abs(this.elementHeight)}px`;
            this.scaleY =- 1;
            console.warn(this.scaleY);
            this.element.style.transform = `scaleX(${this.scaleX}) scaleY(${this.scaleY})`;
            this.megaclassBody.style.height = `${Math.abs(this.elementHeight)}px`;

            // this.megaclassBody.style.transform = `translateX(-) scaleY(-1)`;
        }
        // if (this.progressW > 1) {
        //     this.element.style.transform = `scaleX(${Math.abs(this.scaleX)}) scaleY(${Math.abs(this.scaleY)})`;
        // }
        // if (this.progressH > 1) {
        //     this.element.style.transform = `scaleX(${Math.abs(this.scaleX)}) scaleY(${Math.abs(this.scaleY)})`;
        // }
    }

    touchEnd = () => {
        event.target.style.backgroundColor = 'blue';
    }

    // =======================================================
    //                          ROTATE
    // =======================================================
    touchStartRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.Nex = this.element.style.transform; // this.Nex  -  текущий градус поворода при touchstart
        this.Nex = parseFloat(this.Nex.slice(7));

        this.startMouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startElementRotate;

        event.target.style.backgroundColor = 'red';
    }

    touchMoveRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let mouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };

        let center = {
            x: this.element.offsetLeft + this.element.offsetWidth / 2,
            y: this.element.offsetTop + this.element.offsetHeight / 2
        };

        this.Dist = Math.atan2(
            (center.x - mouse.x) * (center.y - this.startMouse.y) -
            (center.y - mouse.y) * (center.x - this.startMouse.x),
            (center.x - mouse.x) * (center.x - this.startMouse.x) +
            (center.y - mouse.y) * (center.y - this.startMouse.y)
        );

        this.Dist *= -1;

        this.degree_angle = this.Dist * (180 / Math.PI);
        this.val = this.degree_angle + this.Nex;
        this.element.style.transform = `rotate(${this.val}deg)`;
        this.megaclassBody.style.transform = `rotate(${this.val}deg)`;
        this.outRotate.innerHTML = this.val;
    }

    touchEndRotate = () => {
        event.target.style.backgroundColor = 'transparent';
    }

    resetAll = () => {
        this.element.style.width = `${this.startElementWidth}px`;
        this.element.style.height = `${this.startElementHeight}px`;
        this.element.style.transform = `rotate(${this.startElementRotate}deg)`;

        this.megaclassBody.style.width = `${this.startElementWidth}px`;
        this.megaclassBody.style.height = `${this.startElementHeight}px`;
        this.megaclassBody.style.transform = `rotate(${this.startElementRotate}deg)`;

        this.elementWidth = this.startElementWidth;
        this.elementHeight = this.startElementHeight;

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startElementRotate;
    }
} // end megaclass

// =================================================
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