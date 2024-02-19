let currentScale = 1;
const defaultScale = 1;
let originalStrokeWidth = 250; // Valor original de stroke-width
let isDragging = false;
let startX, startY, offsetX = 0, offsetY = 0;
let sensitivity = 1; // Sensibilidade de arrastar

// Desabilita o evento de rolagem do mouse para evitar zoom
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
    svgElement.style.transition = 'transform 0.2s ease'; // Adiciona uma transição suave
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
    if (e.button === 0) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    }
}

function stopDragging() {
    if (isDragging) {
        isDragging = false;
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

        const deltaX = newX - startX;
        const deltaY = newY - startY;

        startX = newX;
        startY = newY;

        
        offsetX += deltaX * 0.5; 
        offsetY += deltaY * 0.5; 
        
        applyTransform();
    }
}

document.addEventListener('wheel', handleZoom);
document.addEventListener('mousedown', startDragging);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('mousemove', handleDrag);
document.addEventListener('touchstart', startDragging);
document.addEventListener('touchend', stopDragging);
document.addEventListener('touchmove', handleDrag);