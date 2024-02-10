let currentScale = 1;
const defaultScale = 1;
let isDragging = false;
let isZooming = false;
let startX, startY, offsetX = 0, offsetY = 0;

function zoomIn() {
    currentScale += 1;
    applyTransform();
}

function zoomOut() {
    if (currentScale - 1 >= defaultScale) {
        currentScale -= 1;
        applyTransform();
    }
}

function applyTransform() {
    const svgElement = document.getElementById('svg-map');
    svgElement.style.transform = `scale(${currentScale}) translate(${offsetX / currentScale}px, ${offsetY / currentScale}px)`;
}

function startDragging(e) {
    if (e.button === 0) {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
        document.getElementById('map').classList.add('dragging');
    } else if (e.button === 2) {
        isZooming = true;
        startX = e.clientX;
        startY = e.clientY;
        document.getElementById('map').classList.add('zooming');
    }
}

function stopDragging() {
    if (isDragging) {
        isDragging = false;
        document.getElementById('map').classList.remove('dragging');
    } else if (isZooming) {
        isZooming = false;
        document.getElementById('map').classList.remove('zooming');
    }
}

function handleDrag(e) {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    applyTransform();
}

function handleZoom(e) {
    if (e.deltaY !== 0) {
        zoomWithDelta(e.deltaY > 0 ? -1 : 1);
        e.preventDefault();
    }
}

function zoomWithDelta(delta) {
    currentScale += delta;
    applyTransform();
}

document.addEventListener('mousemove', handleDrag);

