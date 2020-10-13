'use strict';
/*wyświetlanie artykułu po kliknieciu  */
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


/* generowanie listy tytułów */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
console.log('utworzono funkcje generateTitleLinks')

  /* remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
console.log('utworzono stała o nazwie titleList, która wybiera wszystkie titles i wypełnia je pusta zawartościa(usuwamy titleList)')

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector); //*'.posts article'
  console.log('utworzono stała articles, która skanuje po kolei kazdy article i zapisuje go do zmiennej')
  
  let html = '';

  for(let post of articles){
  console.log('w petli dla kazdego post w article') 
    
     /* get the article id */
     const articleId = post.getAttribute('id');
     console.log('pobieram id z kazdego article')
    
     /* find the title element */
     const titleElement = post.querySelector(optTitleSelector);
     console.log('znajduje title w kazdym article')

     /* get the title from the title element */
     const titleValue = titleElement.innerHTML;
     console.log('pobieram title z wnetrza html') /* w jednej linijce const articleTitle = article.querySelector(optTitleSelector).innerHTML;

     /* create HTML of the link */
     const HTML = '<li><a href="#' + articleId + '"><span>' + titleValue + '</span></a></li>';
     console.log('utworzono stala html która tworzy linijke listy, wartość atrybutu href to stała: ' + articleId + ' z dodanym tytułem: ' + titleValue);
    
     /* insert link into html variable */
     html = html + HTML;
     console.log('zmienna html, po każdym obrocie petli dodaje nowy link jesli sie pojawił')
  }
    /* insert link into titleList */
  titleList.innerHTML = html;
    // przed wprowadzeniem zmiennej html: titleList.innerHTML = titleList.innerHTML + HTML
    // alternatywnie: titleList.insertAdjacentHTML('beforeend',HTML);
  }


generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
