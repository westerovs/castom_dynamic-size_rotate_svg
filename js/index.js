// =================================================
//                                  megaclass
// =================================================
class Megaclass2 {
    constructor(element) {
        // ===== elem
        this.element = element;
        this.element.style.transform = "rotate(0deg)";
        this.elementWidth = element.offsetWidth;
        this.elementHeight = element.offsetHeight;

        // this.elementBoundingTop = this.element.getBoundingClientRect().top;
        // this.elementBoundingLeft = this.element.getBoundingClientRect().left;

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

        this.startTouches = 0;
        this.startWidth = 0;
        this.startHeight = 0;
        this.startRotate = 0;
        this.startTouchesRotateX = 0;
        this.startTouchesRotateY = 0;

        // // out img
        // this.outWidth.innerHTML = this.elementWidth;
        // this.outHeight.innerHTML = this.elementHeight;
        // this.outRotate.innerHTML = this.startElementRotate;

        // для зеркальности
        this.startProgressW = 0;
        this.startProgressH = 0;
        this.progressW = 0;
        this.progressH = 0;
        this.scaleX = 1;
        this.scaleY = 1;

        // img
        // this.megaclassBody.style.top = `${this.element.offsetTop}px`;
        // this.megaclassBody.style.left = `${this.element.offsetLeft}px`;
        // this.megaclassBody.style.width = `${this.element.offsetWidth}px`;
        // this.megaclassBody.style.height = `${this.element.offsetHeight}px`;
        // this.elementBoundingTop = this.element.getBoundingClientRect().top;
        // this.elementBoundingLeft = this.element.getBoundingClientRect().left;


        // for angle
        this.Nex;
        this.degree_angle;
        this.val = 0;
        this.startMouse;
        this.Dist;

        // size
        // this.megaclassSize.forEach(item => {
        //     item.addEventListener('touchstart', this.touchStart);
        //     item.addEventListener('touchmove', this.touchMove);
        //     item.addEventListener('touchend', this.touchEnd);
        // })

        // // rotate
        // this.megaclassRotate.forEach(item => {
        //     item.addEventListener('touchstart', this.touchStartRotate);
        //     item.addEventListener('touchmove', this.touchMoveRotate);
        //     item.addEventListener('touchend', this.touchEndRotate);
        // })

        // this.reset.addEventListener('touchstart', this.resetAll)
        // ======================================================================
        //                              GROUP
        // ======================================================================
        // this.element.style.transform = 'scale(1) rotateX(0deg)'
        this.startScaleWidth = 1;
        this.startScaleHeight = 1;

        this.elementGroupWidth = group.getBoundingClientRect().right - group.getBoundingClientRect().left;
        this.elementGroupHeight = group.getBoundingClientRect().bottom - group.getBoundingClientRect().top;
        this.elementBoundingTop = this.element.getBoundingClientRect().top;
        this.elementBoundingLeft = this.element.getBoundingClientRect().left;
        this.megaclassBody.style.top = `${this.elementBoundingTop}px`;
        this.megaclassBody.style.left = `${this.elementBoundingLeft}px`;
        this.megaclassBody.style.width = `${this.elementGroupWidth}px`;
        this.megaclassBody.style.height = `${this.elementGroupHeight}px`;

        // out groop
        this.outWidth.innerHTML = this.elementGroupWidth;
        this.outHeight.innerHTML = this.elementGroupHeight;

        // size groop
        this.megaclassSize.forEach(item => {
            item.addEventListener('touchstart', this.touchStartGr);
            item.addEventListener('touchmove', this.touchMoveGr);
            item.addEventListener('touchend', this.touchEndGr);
        })
    } // end constructor
    // =======================================================
    //                          SIZE GROOP
    // =======================================================
    touchStartGr = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.startTouches = event.targetTouches[0];
        this.startScaleWidth = this.elementGroupWidth;
        this.startScaleHeight = this.elementGroupHeight;

        // this.element.style.transformOrigin = '50% 50%';
        // out
        this.outWidth.innerHTML = this.elementGroupWidth;
        this.outHeight.innerHTML = this.elementGroupHeight;

        event.target.style.backgroundColor = 'red';
    }

    touchMoveGr = (event) => {
        event.stopPropagation();
        event.preventDefault();

        let moveTouches = event.targetTouches[0];
        let differenceStartMoveY = moveTouches.pageY - this.startTouches.pageY;
        let differenceStartMoveX = moveTouches.pageX - this.startTouches.pageX;

        // width
        this.elementGroupWidth = this.startScaleWidth + differenceStartMoveX;
        this.elementGroupHeight = this.startScaleHeight + differenceStartMoveY;

        this.element.style.transform = `
            scaleX(${this.elementGroupWidth / this.startScaleWidth})
            scaleY(${this.elementGroupHeight / this.startScaleHeight})`;
        this.megaclassBody.style.width = `${Math.trunc(this.elementGroupWidth)}px`;
        this.megaclassBody.style.height = `${Math.trunc(this.elementGroupHeight)}px`;

        // out
        this.outWidth.innerHTML = this.elementGroupWidth;
        this.outHeight.innerHTML = this.elementGroupHeight;
        // this.outRotate.innerHTML = this.val;
    }

    touchEndGr = () => {
        event.target.style.backgroundColor = 'blue';
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

    remove = () => {
        // this.resetAll();

        this.megaclassSize.forEach(item => {
            item.removeEventListener('touchstart', this.touchStart);
            item.removeEventListener('touchmove', this.touchMove);
            item.removeEventListener('touchend', this.touchEnd);
        })

        this.megaclassRotate.forEach(item => {
            item.removeEventListener('touchstart', this.touchStartRotate);
            item.removeEventListener('touchmove', this.touchMoveRotate);
            item.removeEventListener('touchend', this.touchEndRotate);
        })

        this.reset.removeEventListener('touchstart', this.resetAll)

        // не полный reset
        this.megaclassBody.style.width = `${this.startElementWidth}px`;
        this.megaclassBody.style.height = `${this.startElementHeight}px`;
        this.megaclassBody.style.transform = `rotate(${this.startElementRotate}deg)`;

        // this.elementWidth = this.startElementWidth;
        // this.elementHeight = this.startElementHeight;

        this.outWidth.innerHTML = this.elementWidth;
        this.outHeight.innerHTML = this.elementHeight;
        this.outRotate.innerHTML = this.startElementRotate;
    }
} // end megaclass

// =================================================
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');
const svg = document.querySelector('.svg');
const group = document.querySelector('.group');

// console.log(`width:`, group.getBoundingClientRect().right - group.getBoundingClientRect().left);
// console.log(`height:`, group.getBoundingClientRect().bottom - group.getBoundingClientRect().top);
console.log(group.getBBox());

const megaclass2 = new Megaclass2(group);


// document.addEventListener('touchstart', runMagic)
// let megaclass = null;

// function runMagic(event) {
//     console.log(event.target)

//     if (event.target.tagName === 'IMG') {
//         if (megaclass) {
//             megaclass.remove();
//         }
//         else {
//         }
//         megaclass = new Megaclass(event.target);
//     }
// }