document.querySelectorAll('path').forEach(element => {
    element.addEventListener('mouseover', function() {
        const classes = Array.from(element.classList);
        document.querySelectorAll('path').forEach(otherElement => {
            if (!classes.some(className => otherElement.classList.contains(className))) {
                otherElement.classList.add('transparent');
            } else {
                otherElement.classList.remove('transparent');
            }
        });
    });

    element.addEventListener('mouseout', function() {
        document.querySelectorAll('path').forEach(otherElement => {
            otherElement.classList.remove('transparent');
        });
    });
});
