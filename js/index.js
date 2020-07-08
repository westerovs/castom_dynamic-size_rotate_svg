// =============================================================================
//                                  megaclass
// =============================================================================
function magaclass(element) {
    let startTouches = 0;
    let startWidth = 0;
    let startHeight = 0;
    let elementWidth = element.offsetWidth;
    let elementHeight = element.offsetHeight;
    let elementRotate = element.style.transform;


    const megaclassBody = document.querySelector('.megaclass');
    const megaclassSize = document.querySelectorAll('.megaclass__size');
    const megaclassRotate = document.querySelectorAll('.megaclass__rotate');

    const outWidth = document.querySelector('.megaclass__out-text-width');
    const outHeight = document.querySelector('.megaclass__out-text-height');
    const outRotate = document.querySelector('.megaclass__out-text-rotate');


    // ***
    element.before(megaclassBody)
    megaclassBody.style.top = `${element.offsetTop}px`;
    megaclassBody.style.left = `${element.offsetLeft}px`;
    megaclassBody.style.width = `${element.offsetWidth}px`;
    megaclassBody.style.height = `${element.offsetHeight}px`;

    megaclassSize.forEach(item => {
        item.addEventListener('touchstart', touchStart);
        item.addEventListener('touchmove', touchMove);
        item.addEventListener('touchend', touchEnd);
    })

    function touchStart(event) {
        event.stopPropagation();
        event.preventDefault();

        startTouches = event.targetTouches[0];
        startWidth = elementWidth;
        startHeight = elementHeight;

        outWidth.innerHTML = elementWidth;
        outHeight.innerHTML = elementHeight;
        outRotate.innerHTML = elementRotate;
    }

    function touchMove(event) {
        event.stopPropagation();
        event.preventDefault();
        this.style.background = 'green'

        outWidth.innerHTML = elementWidth;
        outHeight.innerHTML = elementHeight;
        outRotate.innerHTML = elementRotate;


        let moveTouches = event.targetTouches[0];

        // height
        let differenceStartMoveY = moveTouches.pageY - startTouches.pageY;
        elementHeight = startHeight + differenceStartMoveY;
        element.style.height = `${elementHeight}px`;
        megaclassBody.style.height = `${elementHeight}px`;

        // width
        let differenceStartMoveX = moveTouches.pageX - startTouches.pageX;
        elementWidth = startWidth + differenceStartMoveX;
        element.style.width = `${elementWidth}px`;
        megaclassBody.style.width = `${elementWidth}px`;

    }

    function touchEnd(event) {
        event.stopPropagation();
        event.preventDefault();
        this.style.background = 'blue'
    }
}

// =============================================================================
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const svg = document.querySelector('.svg');

magaclass(img1)

















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