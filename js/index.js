const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const svg = document.querySelector('.svg');



// =============================================================================
//                                  megaclass
// =============================================================================
function magaclass(element) {
    const megaclassBody = document.querySelector('.megaclass');
    const megaclassSize = document.querySelectorAll('.megaclass__size');
    const megaclassRotate = document.querySelectorAll('.megaclass__rotate');
    // ***
    element.before(megaclassBody)
    megaclassBody.style.top = `${element.offsetTop}px`;
    megaclassBody.style.left = `${element.offsetLeft}px`;
    megaclassBody.style.width = `${element.offsetWidth}px`;
    megaclassBody.style.height = `${element.offsetHeight}px`;
}

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


