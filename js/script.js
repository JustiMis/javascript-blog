'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML)
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
}

/* WYŚWIETLANIE ARTYKUŁU PO KLIKNIĘCIU */

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:' + clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

}


/* GENEROWANIE LISTY TYTUŁÓW*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = ''){
  console.log('GENEROWANIE LISTY TYTUŁÓW');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('utworzono stała o nazwie titleList, która wybiera wszystkie titles i wypełnia je pusta zawartościa(usuwamy titleList)');

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector); //*'.posts article'
  console.log('utworzono stała articles, która skanuje po kolei kazdy article i zapisuje go do zmiennej');


  let html = '';

  for(let post of articles){
    console.log('w petli dla kazdego post w article');

    /* get the article id */
    const articleId = post.getAttribute('id');
    console.log('pobieram id z kazdego article');

    /* find the title element */
    const titleElement = post.querySelector(optTitleSelector);
    console.log('znajduje title w kazdym article');

    /* get the title from the title element */
    const titleValue = titleElement.innerHTML;
    console.log('pobieram title z wnetrza html'); /* w jednej linijce const articleTitle = article.querySelector(optTitleSelector).innerHTML;

     /* create HTML of the link */
    const HTMLData = {id: articleId, title: titleValue};
    const HTML = templates.articleLink(HTMLData);
    //* const HTML = '<li><a href="#' + articleId + '"><span>' + titleValue + '</span></a></li>';
    console.log('utworzono stala html która tworzy linijke listy, wartość atrybutu href to stała: ' + articleId + ' z dodanym tytułem: ' + titleValue);

    /* insert link into html variable */
    html = html + HTML;
    console.log('zmienna html, po każdym obrocie petli dodaje nowy link jesli sie pojawił');
  }
  /* insert link into titleList */
  titleList.innerHTML = html;
  // przed wprowadzeniem zmiennej html: titleList.innerHTML = titleList.innerHTML + HTML
  // alternatywnie: titleList.insertAdjacentHTML('beforeend',HTML);
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}


generateTitleLinks();


/*DODAWANIE TAGÓW DO ARTYKUŁU */

const optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  console.log('TWORZE TAGI ARTYKUŁÓW');

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('stała articles wyszukuje w dokumencie wszystkie artykuły');

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log('szuka w petli article wśród articles');

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    console.log('stała tagList, odnajduje wrapery tagow' + tagList);

    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Odnalezione tagi:' + articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const HTMLData = {id: articleTags, title: tag};
      const HTML = templates.tagLink(HTMLData);
       //const HTML = '<li><a href="#tag-' + tag + '"> ' + tag + ' </a></li>';
      console.log('utworzono stala html która tworzy linijke listy, wartość atrybutu href #tag-: ' + tag + ' i tagiem: ' + tag);

      /* add generated code to html variable */
      html = html + HTML;
      console.log('zmienna html, po każdym obrocie petli dodaje utworzony link HTML z tagiem');
    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    console.log(tagList);
  /* END LOOP: for every article: */
  }

}
generateTags();


//* KLIKNIĘCIE TAGA *//

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag został kliknięty');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('czyta atrybuty href: ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('wydobyto tagi z atrybutu href: ' + tag);

  /* find all tag links with class active */
  const activeTagsLink = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('tagi z aktywna klasa: ' + activeTagsLink);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagsLink){
    console.log('petla szuka kazdego aktywnego linku');

    /* remove class active */
    activeTagLink.classList.remove('active');
    console.log('usuwa klase active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('atrybut href jest taki sam jak kliknietego ' + allTagsLinks);

  /* START LOOP: for each found tag link */
  for(let allTagLink of allTagsLinks ){

    /* add class active */
    allTagLink.classList.add('active');
    console.log('dodaje klase active do każdego znalezionego tagu');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log('');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('.list-horizontal a');

  /* START LOOP: for each link */
  for(let tag of tags){
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


//* DODANIE AUTORA DO ARTYKUŁU *//

const optArticleAuthorSelector = '.post-author';


function generateAuthors(){
  console.log('BEDE TWORZYC AUTOROW');

  /* find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('stała author wyszukuje w dokumencie wszystkich autorów');

  const onlyAuthors = [];
  /* START LOOP: for every author: */
  for(let article of articles){
    console.log('szuka w petli autora wśród wszystkich');

    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('stała authorList, odnajduje wrapery autorow' + authorWrapper);

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log('Odnalezione tagi:' + author);
    if(!onlyAuthors.includes(author)){
      onlyAuthors.push(author);
    }
    /* generate HTML of the link */
     HTMLData = {id: author, title: author};
   const HTML = templates.authorLink(HTMLData);
    //const HTML = '<a href="#author-' + author + '"> ' + author + ' </a>';
    console.log('utworzono stala html która tworzy linijke listy, wartość atrybutu href #tag-: ' + author + ' i tagiem: ' + author);

    /* insert HTML of all the links into the authors wrapper */
    authorWrapper.innerHTML = HTML;
  }
  console.log(onlyAuthors);
  let html = '';
  const authorsList = document.querySelector('.list.authors');
  for( let author of onlyAuthors){
    const authorHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    html = authorHTML + html
  }
  authorsList.innerHTML = html;
}

generateAuthors();


//* KLIKNIĘCIE AUTHORA *//

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Autor został kliknięty');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('czyta atrybuty href: ' + href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('wydobyto autora z atrybutu href: ' + author);

  /* find all author links with class active */
  const activeAuthorsLink = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('autor z aktywna klasa: ' + activeAuthorsLink);

  /* START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorsLink){
    console.log('petla szuka kazdego aktywnego autora');

    /* remove class active */
    activeAuthorLink.classList.remove('active');
    console.log('usuwa klase active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('atrybut href jest taki sam jak kliknietego ' + allAuthorsLinks);

  /* START LOOP: for each found author link */
  for(let allAuthorLink of allAuthorsLinks ){

    /* add class active */
    allAuthorLink.classList.add('active');
    console.log('dodaje klase active do każdego znalezionego autora');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  console.log('');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authors = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */
  for(let author of authors){
    /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();


//* GENEROWANIE CHMURY TAGÓW *//

const optTagsListSelector = '.tags.list';
const params = {max: 0, min: 999999};

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber  = Math.floor( percentage * (optCloudClassCount - 1) + 1);
  console.log(calculateTagClass);

  return optCloudClassPrefix + classNumber;

}


function calculateTagsParams(tags){
  console.log('FUNKCJA OBLICZANIA MAKS I MIN');

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] +' times');
    params.min = Math.min(tags[tag], params.min);
    params.max = Math.max(tags[tag], params.max);
  }
  console.log('max: ' + params.max + 'min: ' + params.min);
  return params;
}
calculateTagsParams();



function generateTagsCloud(){
  console.log('FUNKCJA CHMURA TAGÓW');
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log(allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('znajduje artykuły: ' + articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    console.log('loop dla artykułów');
    /* find tags wrapper */
    const tagWrapper = article.querySelectorAll(optArticleTagsSelector);
    console.log('wrapery tagów' + tagWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tagAttribute = article.getAttribute('data-tags');
    console.log('tagi z wraperów:' + tagAttribute);
    /* split tags into array */
    const splitTags = tagAttribute.split(' ');
    console.log('dzieli tagi:' + splitTags);
    /* START LOOP: for each tag */
    for(let tag of splitTags){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#">' + tag + '</a></li>';
      console.log('generuje link:' + linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('znajduje liste tagow z prawej:' + tagList);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  //let allTagsHTML = '';
  const allTagsData ={tags: []};
  /*[NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a>';
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    console.log(allTagsData);
    /*[NEW] END LOOP: for each tag in allTags: */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}
generateTagsCloud();
