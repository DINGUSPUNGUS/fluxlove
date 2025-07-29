// This file manages the animations defined in animations.css, controlling when and how animations are triggered on the website.

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate');

    animatedElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('animated');
        });

        element.addEventListener('animationend', () => {
            element.classList.remove('animated');
        });
    });
});