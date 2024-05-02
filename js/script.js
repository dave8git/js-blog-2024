'use strict';

const titleClickHandler = function (event) {
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



const optLinksSelector = '.titles';
const optPostSelector = '.post';
const optArticleTitleSelector = '.post-title';

const generateTitleLinks = function (event) {
    document.querySelector(optLinksSelector).innerHTML = '';

    const allArticles = document.querySelectorAll(optPostSelector);

    let articleLinks = ' ';

    allArticles.forEach((article) => {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;

        console.log(articleId);
        console.log(articleTitle);

        const htmlLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'

        articleLinks += htmlLink;
    });

    console.log(articleLinks);
    document.querySelector(optLinksSelector).insertAdjacentHTML("beforeend", articleLinks);

    const allLinks = document.querySelectorAll('.titles a');

    for (let link of allLinks) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks(); 