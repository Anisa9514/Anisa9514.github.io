/* TODO: 
    - recenter carousel on resize
    - debounce/throttle scroll event
*/
// Home and Nav functionalities
function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
}

const throttledScrollEvent = throttled(200, handleScrollEvent);
window.addEventListener("scroll", throttledScrollEvent, false);

var nav = document.querySelector('.nav');
var navInitScrollTop = nav.getBoundingClientRect().top;

function moveTo(selector){
    let elem = document.querySelector(selector);
    elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    });
}

// Carousel functionalities
var carouselItems = document.querySelectorAll('.about-carousel-item');
var activeCarouselItem = 0;

function handleScrollEvent(){
    let navClassList = nav.classList;
    let navScrollTop = nav.getBoundingClientRect().top;
    if(window.scrollY < navInitScrollTop) {
        navClassList.remove('nav-fixed');
    } else if (navScrollTop < 0 && (!navClassList.contains('nav-fixed'))) {
        navClassList.add('nav-fixed');
    }
}

function scrollCarouselLeft(){
    if (activeCarouselItem <= 0){
        return;
    }
    activeCarouselItem--;
    let elem = carouselItems[activeCarouselItem];
    elem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'        
    });
}

function scrollCarouselRight(){
    if(activeCarouselItem >= carouselItems.length - 1){
        return;
    }
    activeCarouselItem++;
    let elem = carouselItems[activeCarouselItem];
    elem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'        
    });
}

// Accordion functionalities
var accordionItems = document.querySelectorAll('.accordion-item');
var accordionHiddenItems = document.querySelectorAll('.accordion-item .collapsible');
var accordionItemHeights = calcAccordionHeights();

function expandAccordionItem(e){
    console.log(e);    
    const classes = e.target.classList;
    const headerClasses = [
        'accordion-header',
        'header-title',
        'job-title',
        'company',
        'dates'
    ]
    const notHeader = headerClasses.every((item) => !classes.contains(item));

    if(notHeader){
        return;
    }    
    const length = accordionHiddenItems.length;
    accordionHiddenItems.forEach(element => {
        element.classList.remove('show');
        element.style.height = (accordionItemHeights.expanded - accordionItemHeights.collapsed - 20) + 'px';
    });

    accordionItems.forEach(element => {
        element.style.height = accordionItemHeights.collapsed + 'px';
    })

    const selectedItem = e.currentTarget.querySelector('.collapsible');
    selectedItem.classList.add('show');
    e.currentTarget.style.height = accordionItemHeights.expanded + 'px';
}

function calcAccordionHeights() {
    const accordionWrapperHeight = document.querySelector('.accordion-wrapper').getBoundingClientRect().height;
    const accordionItem = document.querySelector('.accordion-item');
    const accordionItemHeight = accordionItem.getBoundingClientRect().height;
    return { 
            collapsed: accordionItemHeight, 
            expanded: accordionWrapperHeight - (accordionItemHeight * (accordionHiddenItems.length - 1))
        };
}

// Render Skills Ratings
var scores = document.querySelectorAll('.score');
for(let score of scores){
    let scoreArr = score.textContent.split('/');
    let scoreNum = scoreArr[0];
    let total = scoreArr[1];

    let newElem = document.createElement('div');

    for(let i = 1; i <= total; i++){
        let newSpan = document.createElement('span');
        if(i <= Math.floor(scoreNum)){
            newSpan.className = 'fa fa-circle';
        } else if( i > scoreNum && i - 1 < scoreNum ){
            newSpan.className = 'fa fa-adjust';
        } else {
            newSpan.className = 'far fa-circle';/*  */
        }
            newElem.appendChild(newSpan);
    }
    score.textContent = '';
    score.appendChild(newElem);
}