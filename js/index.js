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

        // для зеркальности
        // this.startProgressW = 0;
        // this.startProgressH = 0;
        // this.progressW = 0;
        // this.progressH = 0;
        // this.scaleX = 1;
        // this.scaleY = 1;

        // for angle
        this.Nex;
        this.degree_angle;
        this.val = 0;
        this.startMouse;
        this.Dist;

        this.reset.addEventListener('touchstart', this.resetAll)
        // ======================================================================
        //                            <g> GROUP </g>
        // ======================================================================
        // this.element.style.transform = 'scale(1) rotateX(0deg)'
        this.startScaleWidth = 1;
        this.startScaleHeight = 1;
        this.scaleOffsetX = this.element.getBBox().x;
        this.scaleOffsetY = this.element.getBBox().y;

        this.element.style.transformOrigin = `${this.scaleOffsetX}px ${this.scaleOffsetY}px`;

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

        // rotate groop
        this.megaclassRotate.forEach(item => {
            item.addEventListener('touchstart', this.touchStartGrRotate);
            item.addEventListener('touchmove', this.touchMoveGrRotate);
            item.addEventListener('touchend', this.touchEndGrRotate);
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

        // width & height
        this.elementGroupWidth = this.startScaleWidth + differenceStartMoveX;
        this.elementGroupHeight = this.startScaleHeight + differenceStartMoveY;

        this.element.style.transform = `
            scaleX(${this.elementGroupWidth / this.startScaleWidth})
            scaleY(${this.elementGroupHeight / this.startScaleHeight}) `;
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

    // =======================================================
    //                         ROTATE SIZE GROOP
    // =======================================================
    touchStartGrRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();
        // this.Nex = this.element.style.transform; // this.Nex  -  текущий градус поворода при touchstart
        // this.Nex = parseFloat(this.Nex.slice(7));

        // this.startMouse = {
        //     x: event.changedTouches[0].pageX,
        //     y: event.changedTouches[0].pageY
        // };

        // this.outWidth.innerHTML = this.elementWidth;
        // this.outHeight.innerHTML = this.elementHeight;
        // this.outRotate.innerHTML = this.startElementRotate;

        event.target.style.backgroundColor = 'red';
    }

    touchMoveGrRotate = (event) => {
        event.stopPropagation();
        event.preventDefault();

        // let mouse = {
        //     x: event.changedTouches[0].pageX,
        //     y: event.changedTouches[0].pageY
        // };

        // let center = {
        //     x: this.element.offsetLeft + this.element.offsetWidth / 2,
        //     y: this.element.offsetTop + this.element.offsetHeight / 2
        // };

        // this.Dist = Math.atan2(
        //     (center.x - mouse.x) * (center.y - this.startMouse.y) -
        //     (center.y - mouse.y) * (center.x - this.startMouse.x),
        //     (center.x - mouse.x) * (center.x - this.startMouse.x) +
        //     (center.y - mouse.y) * (center.y - this.startMouse.y)
        // );

        // this.Dist *= -1;

        // this.degree_angle = this.Dist * (180 / Math.PI);
        // this.val = this.degree_angle + this.Nex;
        // this.element.style.transform = `rotate(${this.val}deg)`;
        // this.megaclassBody.style.transform = `rotate(${this.val}deg)`;
        // this.outRotate.innerHTML = this.val;
    }

    touchEndGrRotate = () => {
        event.target.style.backgroundColor = 'transparent';
    }

    // **********************************************************************************

    resetAll = () => {
        console.log(`reset`)
        // this.element.style.transform = `scaleX(${1}) scaleY(${1})`;
        // this.megaclassBody.style.width = `${this.startScaleWidth}px`;
        // this.megaclassBody.style.height = `${this.startScaleHeight}px`;
        // // this.megaclassBody.style.transform = `rotate(${this.startElementRotate}deg)`;

        // this.elementWidth = this.startScaleWidth;
        // this.elementHeight = this.startScaleHeight;

        // this.outWidth.innerHTML = this.elementWidth;
        // this.outHeight.innerHTML = this.elementHeight;
        // this.outRotate.innerHTML = this.startElementRotate;
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
const group = document.querySelector('.group');
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