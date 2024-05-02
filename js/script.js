'use strict';

const titleClickHandler = function(event) {
    event.preventDefault();
    console.log('Link was clicked!');
    const allActiveLinks = document.querySelectorAll('.titles a.active');
    allActiveLinks.forEach((link) => link.classList.remove('active'));
    this.classList.add('active');
    const linkAttribute = this.getAttribute('href');
    console.log(linkAttribute);
    document.querySelectorAll('.post.active').forEach((article) => article.classList.remove('active'));
    //const foundAttribute = this.getAttribute('href').replace(/^#/, '');
    document.querySelector(this.getAttribute('href')).classList.add('active');
}

const allLinks = document.querySelectorAll('.titles a');

for(let link of allLinks) {
    link.addEventListener('click', titleClickHandler);
}