let currentScale = 1;
const defaultScale = 1;
let originalStrokeWidth = 250;
let isDragging = false;
let startX, startY, offsetX = 0, offsetY = 0;
let sensitivity = 1;

document.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });

function zoomIn() {
    if (currentScale + 1 <= defaultScale + 2) {
        currentScale += 1;
        applyTransform();
        adjustStrokeWidth();
    }
}

function zoomOut() {
    if (currentScale - 1 >= defaultScale) {
        currentScale -= 1;
        applyTransform();
        adjustStrokeWidth();
    }
}

function applyTransform() {
    const svgElement = document.getElementById('svg-map');
    svgElement.style.transform = `scale(${currentScale}) translate(${offsetX}px, ${offsetY}px)`;
}

function adjustStrokeWidth() {
    const paths = document.querySelectorAll('path');
    paths.forEach(path => {
        path.style.strokeWidth = originalStrokeWidth / currentScale;
    });
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
    adjustStrokeWidth();
}

function startDragging(e) {
    if (e.type === 'mousedown' || e.type === 'touchstart') {
        if (e.type === 'mousedown' && e.button !== 0) return;
        isDragging = true;
        if (e.type === 'mousedown') {
            startX = e.clientX;
            startY = e.clientY;
        } else if (e.type === 'touchstart' && e.touches.length === 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        document.getElementById('map').classList.add('dragging');
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('touchmove', handleDrag);
    }
}

function stopDragging() {
    if (isDragging) {
        isDragging = false;
        document.getElementById('map').classList.remove('dragging');
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('touchmove', handleDrag);
    }
}

function handleDrag(e) {
    if (isDragging) {
        let newX, newY;
        if (e.type === 'mousemove') {
            newX = e.clientX;
            newY = e.clientY;
        } else if (e.type === 'touchmove' && e.touches.length === 1) {
            newX = e.touches[0].clientX;
            newY = e.touches[0].clientY;
        } else {
            return;
        }
        const scaledSensitivity = sensitivity / currentScale;
        offsetX += (newX - startX) * scaledSensitivity;
        offsetY += (newY - startY) * scaledSensitivity;
        startX = newX;
        startY = newY;
        applyTransform();
    }
}

document.addEventListener('wheel', handleZoom);
document.addEventListener('mousedown', startDragging);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchstart', startDragging);
document.addEventListener('touchend', stopDragging);
