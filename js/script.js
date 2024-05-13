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
const optAuthorListSelector = '.authors';
const optArticleTitleSelector = '.post-title';
const optArticleTagsSelector = '.post-tags .list';
const optTagsListselector = '.tags';
const optTagLink = 'a[href^="#tag-"]';
const optAuthorLink = 'a[href^="#author-"]';
const optPostAuthor = '.post-author';
const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size-';

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

function calculateTagsParams(tagsParams) {
    let highestValue = 0;
    let smallestValue = 9999999;

    const tagsWeighed = {max: highestValue, min: smallestValue};

    for (const key in tagsParams) {
        if (tagsParams.hasOwnProperty(key)) {
            const value = tagsParams[key];

            if (value > tagsWeighed.max) {
                tagsWeighed.max = tagsParams[key];
            } 

            if (value < tagsWeighed.min) {
                tagsWeighed.min = tagsParams[key];
            }
            console.log(tagsWeighed);
        }
    }
    console.log('tagsWeighed', tagsWeighed);
    return tagsWeighed;
}

function calculateTagClass(count, params) {
    return Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
}

function generateTags(){
    const allArticles = document.querySelectorAll(optPostSelector);
    let allTags = {};
    allArticles.forEach((article) => {
        const articleTag = article.querySelector(optArticleTagsSelector);
        let html = '';
        const tags = article.getAttribute('data-tags').split(' ');
        tags.forEach((tag) => {
            console.log('tag', tag);
            let htmlLink = ' <li><a href="#tag-'+tag+'">' + tag + '</a></li>';
            html += htmlLink;
            if(!allTags[tag]){ 
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            
        })
        articleTag.insertAdjacentHTML('beforeend', html);
        const tagList = document.querySelector(optTagsListselector);
        // tagList.innerHTML = allTags.join(' ');

        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams);

        let allTagsHTML = '';
    
        for(let tag in allTags) {
            // let tagLinkHTML = tag + ' (' + allTags[tag] + ') ';
            let tagLinkHTML = ' <li><a class="tag-size-'+ calculateTagClass(allTags[tag], tagsParams)+'" href="#tag-'+tag+'">' + tag + /* allTags[tag] + */ '</a></li> ';
            allTagsHTML += tagLinkHTML;
            console.log('calculateTagClass(allTags[tag], tagsParams)',calculateTagClass(allTags[tag], tagsParams));
            // console.log('tag', tag);
            // console.log('allTags[tag]', allTags[tag]);
            // console.log('params', tagsParams);
        }
    
        tagList.innerHTML = allTagsHTML;
        
       
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
    const allAuthors = [];
    let html = '';
    allArticles.forEach((article) => {
        const author = article.getAttribute('data-author');
        let htmlLink = ' <li><a href="#author-'+author+'"> '+author+'</a></li>';
        html += htmlLink;
        const authorContainer = article.querySelector(optPostAuthor);
        authorContainer.insertAdjacentHTML('beforeend', htmlLink);

        if(allAuthors.indexOf(htmlLink) == -1) {
            allAuthors.push(htmlLink);
        };

        //console.log('allAuthors', allAuthors);
    });
  
    const authorListContainer = document.querySelector(optAuthorListSelector);

    authorListContainer.innerHTML = allAuthors.join(' ');
    // authorListContainer.insertAdjacentHTML('beforebegin', htmlLink);
    // console.log(html);
    // const allAuthorsHTML = '';



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