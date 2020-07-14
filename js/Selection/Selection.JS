/* eslint-disable no-param-reassign */
class Selection {
    constructor(element) {
        // ===== element
        this.element = element;
        this.elementWidth = this.element.getBoundingClientRect().right - this.element.getBoundingClientRect().left;
        this.elementHeight = this.element.getBoundingClientRect().bottom - this.element.getBoundingClientRect().top;
        this.elementNewWidth = this.elementWidth;
        this.elementNewHeight = this.elementHeight;
        this.elementTop = this.element.getBoundingClientRect().top;
        this.elementLeft = this.element.getBoundingClientRect().left;
        this.elementTranslateOffsetX = this.element.getBBox().x;
        this.elementTranslateOffsetY = this.element.getBBox().y;
        this.startRotate = 0; // ! warning !
        this.element.style.opacity = '0.5';
        // this.element.style.outline = '0';


        // ===== selection
        this.selection = document.querySelector('.selection');
        this.selectionBtnSize = document.querySelectorAll('.selection__size');
        this.selectionBtnRotate = document.querySelectorAll('.selection__rotate');

        // ===== reset
        this.reset = document.querySelector('.selection__out--reset');
        this.reset.addEventListener('touchstart', this.resetAll);
        this.resetElementWidth = this.elementWidth;
        this.resetElementHeight = this.elementHeight;
        this.resetElementRotate = this.startRotate;
        this.resetSelectionWidth = this.resetElementWidth;
        this.resetSelectionHeight = this.resetElementHeight;
        this.resetSelectionRotate = this.resetElementRotate;

        // ===== размеры рамки при выборе элемента
        this.selection.style.top = `${this.elementTop}px`;
        this.selection.style.left = `${this.elementLeft}px`;
        this.selection.style.width = `${this.resetElementWidth}px`;
        this.selection.style.height = `${this.resetElementHeight}px`;

        // ===== row out
        this.outWidth = document.querySelector('.selection__out-text-width');
        this.outHeight = document.querySelector('.selection__out-text-height');
        this.outRotate = document.querySelector('.selection__out-text-rotate');
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startRotate;

        // ===== for atan function
        this.startTouches = 0;
        this.Nex = 0;
        this.degreeAngle = 0;
        this.val = 0;
        this.startMouse = 0;
        this.Dist = 0;
        this.element.style.transform = `rotate(${this.startRotate}deg)`;

        // ===== progress
        this.progressDeg = 0;
        this.progressDegStart = 0;
        this.progressW = 0;
        this.progressH = 0;

        // change size
        this.selectionBtnSize.forEach(item => {
            item.addEventListener('touchstart', this.touchStartSize);
            item.addEventListener('touchmove', this.touchMoveSize);
            item.addEventListener('touchend', this.touchEndSize);
        });

        // change rotate
        this.selectionBtnRotate.forEach(item => {
            item.addEventListener('touchstart', this.touchStartRotate);
            item.addEventListener('touchmove', this.touchMoveRotate);
            item.addEventListener('touchend', this.touchEndRotate);
        });

        this.scale = {
            x: 1,
            y: 1
        };
    } // end constructor


    // =======================================================
    //                          SIZE
    // =======================================================
    touchStartSize = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouches = event.targetTouches[0];
        this.startElementWidth = this.elementNewWidth;
        this.startElementHeight = this.elementNewHeight;

        event.target.style.backgroundColor = 'red';
    }

    touchMoveSize = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.progressW = this.elementNewWidth;
        this.progressH = this.elementNewHeight;

        console.log(this.progressW);

        // offset
        this.element.style.transformOrigin = `${this.elementTranslateOffsetX}px ${this.elementTranslateOffsetY}px`;

        const moveTouches = event.targetTouches[0];
        const differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX;
        const differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY;
        this.elementNewWidth = (this.startElementWidth + differenceStartMoveX);
        this.elementNewHeight = (this.startElementHeight + differenceStartMoveY);

        this.scale = {
            x:  this.elementNewWidth / this.elementWidth,
            y:  this.elementNewHeight / this.elementHeight
        };
        console.log(this.startElementWidth, differenceStartMoveX, this.elementWidth)
        console.log(this.elementWidth , this.startElementWidth)

        this.element.style.transform = `
            rotate(${this.val}deg)
            scaleX(${this.scale.x})
            scaleY(${this.scale.y})
            `;

        this.selection.style.width = `${this.elementNewWidth}px`;
        this.selection.style.height = `${this.elementNewHeight}px`;
        this.selection.style.transform = `rotate(${this.val}deg)`;

        // out
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
    }

    touchEndSize = (event) => {
        event.target.style.backgroundColor = 'blue';
    }

    // =======================================================
    //                         ROTATE SIZE GROOP
    // =======================================================
    touchStartRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouchVal = this.val;
        this.progressDegStart = this.progressDeg;
        this.Nex = this.val ? this.val : parseFloat(this.element.style.transform.slice(7)); // парксинг ротейта // this.Nex  -  текущий градус поворода при touchstart

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

        //this.element.style.transformOrigin = `center`;

        const mouse = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };

        const center = {
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
        this.degreeAngle = this.Dist * (180 / Math.PI);
        this.val = this.degreeAngle + this.Nex;
        // this.element.style.transform = `rotate(${this.val}deg)`;
        this.element.style.transform = `
            rotate(${this.val}deg)
            scaleX(${this.scale.x})
            scaleY(${this.scale.y})
            `;

        this.selection.style.transform = `rotate(${this.val}deg)`;

        // progress
        this.progressDeg = this.val;
        this.outRotate.innerHTML = this.val;
    }

    touchEndRotate = (event) => {
        event.target.style.backgroundColor = 'transparent';
    }

    // **********************************************************************************
    resetAll = () => {
        console.log(`reset`);
    }

    remove = () => {
        // this.resetAll();
        this.selectionBtnSize.forEach(item => {
            item.removeEventListener('touchstart', this.touchStart);
            item.removeEventListener('touchmove', this.touchMove);
            item.removeEventListener('touchend', this.touchEnd);
        });

        this.selectionBtnRotate.forEach(item => {
            item.removeEventListener('touchstart', this.touchStartRotate);
            item.removeEventListener('touchmove', this.touchMoveRotate);
            item.removeEventListener('touchend', this.touchEndRotate);
        });

        this.reset.removeEventListener('touchstart', this.resetAll);

        // не полный reset
        // this.selection.style.transform = `rotate(${this.startElementRotate}deg)`;
        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startElementRotate;
    }
} // end selection


// =================================================
const group = document.querySelector('.group');
console.log(group.getBBox());
// eslint-disable-next-line no-unused-vars
const selection = new Selection(group);


// document.addEventListener('touchstart', runMagic);
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