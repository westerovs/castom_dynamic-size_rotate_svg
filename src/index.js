import subjx from 'subjx';
import 'subjx/dist/style/subjx.css';
console.log('test commit')
// Event names
const EVENTS = [
    'dragStart',
    'drag',
    'dragEnd',
    'resizeStart',
    'resize',
    'resizeEnd',
    'rotateStart',
    'rotate',
    'rotateEnd'
];

const xElem = subjx('.group');
const xDraggables = xElem.drag(); // перетаскивание


// getter возвращает обложку перетаскивания
const [xDraggable] = xDraggables;
xDraggable.controls
console.log(' --------------------- ');
console.log(xDraggable);
console.log(' --------------------- ');

// предоставляет доступ к полезным параметрам
// например: получить ссылку на любой дескриптор DOM
xDraggable.storage;
const {
  handles: { tl, tr, br, bl, tc}
} = xDraggable.storage;


// отключает перетаскивание, удаляет элементы управления и ручки
// xDraggable.disable();


// добавляет прослушиватель для некоторых событий
xDraggable.on(EVENTS[1], ()=> console.log(EVENTS[1]));
// удаляет прослушиватель событий для некоторых
// xDraggable.off(EVENTS[0], ()=> console.log(777));

// задать координаты вручную
xDraggable.exeDrag({
    dx: 0,
    dy: 0,
    // revX,
    // revY,
    // doW,
    // doH
});

// выполнить вращение вручную
// xDraggable.exeRotate({
//     // delta или radians
// });

// ------------ SVG methods ------------
// Полезно, когда контейнер элемента SVG трансформировался извне
// вызываем этот метод при применении масштабирования или изменения значений viewBox
xDraggable.fitControlsToSize();
