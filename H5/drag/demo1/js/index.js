const sortableList = document.getElementById('sortableList');
let dragSourceDom = null;

sortableList.addEventListener('dragstart', (e) => {
    const dragDom = e.target;
    dragSourceDom = dragDom;

    if (dragDom.tagName !== 'LI') return;

    e.dataTransfer.effectAllowed = 'move';
    dragDom.classList.add('dragging');
});


sortableList.addEventListener('dragend', (e) => {
    const dragDom = e.target;

    if (dragDom.tagName !== 'LI') return;

    dragDom.classList.remove('dragging');
});

sortableList.addEventListener('dragover', (e) => {
    const targetDom = e.target;

    if (targetDom.tagName !== 'LI') return;
    if (targetDom.classList.contains('dragging')) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const {
        top,
        height
    } = targetDom.getBoundingClientRect();

    const inTargetDomYPos = e.clientY - top;
    // 鼠标在目标项目垂直中心线的上方位置，在目标项目的上方位置插入
    // 鼠标在目标项目垂直中心线的下方位置，在目标项目的下方位置插入
    if (inTargetDomYPos < height / 2) {
        // 上方位置插入
        targetDom.parentNode.insertBefore(dragSourceDom, targetDom);
    } else {
        // 下方位置插入
        targetDom.parentNode.insertBefore(dragSourceDom, targetDom.nextElementSibling);
    }
});
