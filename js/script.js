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
const optArticleTagsSelector = '.post-tags .list';
const optTagLink = 'a[href^="#tag-"]';
const optAuthorLink = 'a[href^="#author-"]';
const optPostAuthor = '.post-author';

const generateTitleLinks = function (customSelector = '') {
    let titleList = document.querySelector(optLinksSelector);
    
    titleList.innerHTML = '';

    const allArticles = document.querySelectorAll(optPostSelector + customSelector);

    let articleLinks = '';

    allArticles.forEach((article) => {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;
        const htmlLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'

        articleLinks = articleLinks + htmlLink;
    });

    titleList.innerHTML = articleLinks;

    //document.querySelector(optLinksSelector).insertAdjacentHTML("beforeend", articleLinks);

    const allLinks = document.querySelectorAll('.titles a');

    for (let link of allLinks) {
        link.addEventListener('click', titleClickHandler);
    }
    
}

generateTitleLinks(); 

function generateTags(){
    const allArticles = document.querySelectorAll(optPostSelector);

    allArticles.forEach((article) => {
        const articleTag = article.querySelector(optArticleTagsSelector);
        let html = '';
        const tags = article.getAttribute('data-tags').split(' ');
        tags.forEach((tag) => {
            console.log('tag', tag);
            html += ' <li><a href="#tag-'+tag+'">' + tag + '</a></li>';
        })
        console.log('tags', tags);
        console.log('html', html);
        articleTag.insertAdjacentHTML('beforeend', html);

    })
  }
  
  generateTags();

  function tagClickHandler(e) {
    e.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    activeTags.forEach((activeTag) => activeTag.classList.remove('active'));
    const allTagLinks = document.querySelectorAll('a[href="'+ href +'"]');
    allTagLinks.forEach((tagLink) => tagLink.classList.add('active'));
    console.log('tagClickHandler sie uruchamia');
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll(optTagLink);
    tagLinks.forEach((tagLink) => tagLink.addEventListener('click', tagClickHandler));
  }

  addClickListenersToTags(); 


  function generateAuthors() {
    const allArticles = document.querySelectorAll(optPostSelector);
    allArticles.forEach((article) => {
        const authorContainer = article.querySelector(optPostAuthor);
        let html = '';
        const author = article.getAttribute('data-author');
        html = '<a href="#author-'+author+'"> '+author+'</a>';
        authorContainer.insertAdjacentHTML('beforeend', html);
    })
  }

  generateAuthors();

  function authorClickHandler(e) {
    e.preventDefault(); 
    const clickedElement = this; 
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    generateTitleLinks('[data-author="'+author+'"]');
    console.log('authorClickHandler się uruchamia');
  }

  const addClickListenersToAuthors = () => {
    const authorLinks = document.querySelectorAll(optAuthorLink);
    authorLinks.forEach((authorLink) => authorLink.addEventListener('click', authorClickHandler));
    console.log('authorLinks', authorLinks);
  }

  addClickListenersToAuthors();