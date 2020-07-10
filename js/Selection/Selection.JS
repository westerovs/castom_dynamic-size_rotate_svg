/* eslint-disable no-console */
// =================================================
//                                  selection
// =================================================
class Selection {
    constructor(element) {
        // ===== elem
        this.element = element;
        this.elementWidth = group.getBoundingClientRect().right - group.getBoundingClientRect().left;
        this.elementHeight = group.getBoundingClientRect().bottom - group.getBoundingClientRect().top;
        this.elementTop = this.element.getBoundingClientRect().top;
        this.elementLeft = this.element.getBoundingClientRect().left;
        this.element.style.transform = 'rotate(0deg)'; // !!! warning !!!

        this.scaleOffsetX = this.element.getBBox().x;
        this.scaleOffsetY = this.element.getBBox().y;

        // ===== selection wrap
        this.selection = document.querySelector('.selection');
        this.selectionBtnSize = document.querySelectorAll('.selection__size');
        this.selectionBtnRotate = document.querySelectorAll('.selection__rotate');
        this.outWidth = document.querySelector('.selection__out-text-width');
        this.outHeight = document.querySelector('.selection__out-text-height');
        this.outRotate = document.querySelector('.selection__out-text-rotate');
        this.reset = document.querySelector('.selection__out--reset');

        this.startTouches = 0;
        this.startScaleWidth = 0;
        this.startScaleHeight = 0;
        // this.startRotate = 0;

        // размеры рамки при выборе элемента
        this.selection.style.top = `${this.elementTop}px`;
        this.selection.style.left = `${this.elementLeft}px`;
        this.selection.style.width = `${this.elementWidth}px`;
        this.selection.style.height = `${this.elementHeight}px`;
        // block out
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        // this.outRotate.innerHTML = this.elementHeight;
        this.reset.addEventListener('touchstart', this.resetAll)

        // angle rotate on move
        this.Nex;
        this.degree_angle;
        this.val = 0;
        this.startMouse;
        this.Dist;

        // change size
        this.selectionBtnSize.forEach(item => {
            item.addEventListener('touchstart', this.touchStartSize);
            item.addEventListener('touchmove', this.touchMoveSize);
            item.addEventListener('touchend', this.touchEndSize);
        })

        // change rotate
        this.selectionBtnRotate.forEach(item => {
            item.addEventListener('touchstart', this.touchStartRotate);
            item.addEventListener('touchmove', this.touchMoveRotate);
            item.addEventListener('touchend', this.touchEndRotate);
        })

    } // end constructor

    // =======================================================
    //                          SIZE GROOP
    // =======================================================
    touchStartSize = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouches = event.targetTouches[0];
        this.startScaleWidth = this.elementWidth;
        this.startScaleHeight = this.elementHeight;

        // out
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;

        event.target.style.backgroundColor = 'red';
    }

    touchMoveSize = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.element.style.transformOrigin = `${this.scaleOffsetX}px ${this.scaleOffsetY}px`;
        this.selection.style.transformOrigin = `${this.scaleOffsetX}px ${this.scaleOffsetY}px`;

        let moveTouches = event.targetTouches[0];
        let differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY;
        let differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX;

        // width & height
        this.elementWidth = this.startScaleWidth + differenceStartMoveX;
        this.elementHeight = this.startScaleHeight + differenceStartMoveY;

        this.element.style.transform = `
            scaleX(${this.elementWidth / this.startScaleWidth})
            scaleY(${this.elementHeight / this.startScaleHeight}) `;
        this.selection.style.width = `${Math.trunc(this.elementWidth)}px`;
        this.selection.style.height = `${Math.trunc(this.elementHeight)}px`;

        // out
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;


        console.log(`width:`, this.elementWidth);
        console.log(`height:`, this.elementHeight);
        console.log(``)
        // this.outRotate.innerHTML = this.val;
    }

    touchEndSize = () => {
        event.target.style.backgroundColor = 'blue';
    }

    // =======================================================
    //                         ROTATE SIZE GROOP
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

        // out
        this.outRotate.innerHTML = this.startElementRotate;
        event.target.style.backgroundColor = 'red';
    }

    touchMoveRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.element.style.transformOrigin = `center`;
        this.selection.style.transformOrigin = `center`;

        let mouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };

        let center = {
            x: this.elementLeft + this.elementWidth / 2,
            y: this.elementTop + this.elementHeight / 2
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
        this.selection.style.transform = `rotate(${this.val}deg)`;
        this.outRotate.innerHTML = this.val;
    }

    touchEndRotate = () => {
        event.target.style.backgroundColor = 'transparent';
    }

    // **********************************************************************************

    resetAll = () => {
        console.log(`reset`)
        // this.element.style.transform = `scaleX(${1}) scaleY(${1})`;
        // this.selection.style.width = `${this.startScaleWidth}px`;
        // this.selection.style.height = `${this.startScaleHeight}px`;
        // // this.selection.style.transform = `rotate(${this.startElementRotate}deg)`;
    }

    remove = () => {
        // this.resetAll();

        this.selectionBtnSize.forEach(item => {
            item.removeEventListener('touchstart', this.touchStart);
            item.removeEventListener('touchmove', this.touchMove);
            item.removeEventListener('touchend', this.touchEnd);
        })

        this.selectionBtnRotate.forEach(item => {
            item.removeEventListener('touchstart', this.touchStartRotate);
            item.removeEventListener('touchmove', this.touchMoveRotate);
            item.removeEventListener('touchend', this.touchEndRotate);
        })

        this.reset.removeEventListener('touchstart', this.resetAll)

        // не полный reset
        this.selection.style.width = `${this.startElementWidth}px`;
        this.selection.style.height = `${this.startElementHeight}px`;
        this.selection.style.transform = `rotate(${this.startElementRotate}deg)`;

        // this.elementWidth = this.startElementWidth;
        // this.elementHeight = this.startElementHeight;

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startElementRotate;
    }
} // end selection


// =================================================
const group = document.querySelector('.group');
console.log(group.getBBox());
const selection = new Selection(group);

// document.addEventListener('touchstart', runMagic)
// let selection = null;

// function runMagic(event) {
//     console.log(event.target)

//     if (event.target.tagName === 'IMG') {
//         if (selection) {
//             selection.remove();
//         }
//         else {
//         }
//         selection = new selection(event.target);
//     }
// }