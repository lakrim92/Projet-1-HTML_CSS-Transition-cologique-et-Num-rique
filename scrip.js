console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
const overlayEl = e.currentTarget;
const x = e.pageX - cardsContainer.offsetLeft;
const y = e.pageY - cardsContainer.offsetTop;

overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
const overlayCta = document.createElement("div");
overlayCta.classList.add("cta");
overlayCta.textContent = ctaEl.textContent;
overlayCta.setAttribute("aria-hidden", true);
overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
entries.forEach((entry) => {
const cardIndex = cards.indexOf(entry.target);
let width = entry.borderBoxSize[0].inlineSize;
let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
    overlay.children[cardIndex].style.width = `${width}px`;
    overlay.children[cardIndex].style.height = `${height}px`;
    }
    });
});

const initOverlayCard = (cardEl) => {
const overlayCard = document.createElement("div");
overlayCard.classList.add("card");
createOverlayCta(overlayCard, cardEl.lastElementChild);
overlay.append(overlayCard);
observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);

(function () {
    document.addEventListener('DOMContentLoaded', function () {

        'use strict';

        Cards.init();
        conf.InfoBox();

    });
}());

const Cards = {

    init: () => {
        Cards.triggerCardChange();
        Cards.directlyClickOnCards();
        Cards.imageHoverPerspective();
    },

    //  Change the active Card on directly clicking on it
    // - - - - - - - - - - - - - - - - - - - - - - - - - -

    directlyClickOnCards: () => {
        let cards = conf.qSA('.card');
        if(cards.length){
            cards.forEach(function(item){
               item.onclick = () => {
                   if(!item.classList.contains('active')){
                       // search the active card
                       for(let i = 0; i < cards.length; i++){
                           if(cards[i].classList.contains('active')){
                               let dataCard = cards[i];
                               dataCard.classList.add('inactive');
                               dataCard.classList.remove('active');
                               break;
                           }
                       }

                       conf.qS('.cards-wrapper').prepend(item);
                       item.classList.remove('inactive');
                       item.classList.add('active');
                   }
               }
            });
        }
    },

    //  Change the active Card
    // - - - - - - - - - - - - - - - - - - - - - - - - - -

    triggerCardChange: () => {

        let arrow = conf.qS('.slide-button'),
            cards = conf.qSA('.card');

        if(arrow){
            arrow.onclick = () => {
                if(cards.length){
                    for(let i = 0; i < cards.length; i++){
                        if(cards[i].classList.contains('active')){
                            let dataCard = cards[i];
                            getNextCard(dataCard);
                            break;
                        }
                    }
                }

                function getNextCard(prevCard){

                    for(let i = 0; i < cards.length; i++){
                        let dataCard = parseInt(prevCard.getAttribute('data-card'), 10),
                            nextCard = parseInt(cards[i].getAttribute('data-card'), 10);

                        if((dataCard + 1) === nextCard){
                            prevCard.classList.add('inactive');
                            prevCard.classList.remove('active');
                            conf.qS('.cards-wrapper').prepend(cards[i]);
                            cards[i].classList.remove('inactive');
                            cards[i].classList.add('active');
                            break;
                        }else if((dataCard + 1) >= cards.length){
                            prevCard.classList.add('inactive');
                            prevCard.classList.remove('active');
                            conf.qS('.cards-wrapper').prepend(cards[i]);
                            cards[0].classList.remove('inactive');
                            cards[0].classList.add('active');
                            break;
                        }
                    }
                }
            };
        }
    },

    //  Change the Image perspective on mouseover
    // - - - - - - - - - - - - - - - - - - - - - - - - - -

    imageHoverPerspective: () => {
        let cards = conf.qSA('.card');
        if(cards.length){
            cards.forEach(function(card){
                let image = conf.CqS(card, '.image-wrapper');
                image.onmousemove = (e) => {

                    let offset      = image.getBoundingClientRect(),
                        elX         = offset.left + document.body.scrollTop,
                        elY         = offset.top + document.body.scrollTop,
                        elWidth     = image.offsetWidth,
                        elHeight    = image.offsetHeight,
                        intensity   = 11,
                        mouseX      = e.pageX,
                        mouseY      = e.pageY,
                        rotateY     = ((elWidth/2 - (mouseX - elX)) / (elWidth/2) * intensity),
                        rotateX     = (elHeight/2 - (mouseY - elY)) / (elHeight/2) * intensity;

                    let style = 'transform: rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
                    image.setAttribute('style', style);
                };
                image.onmouseleave = () => {
                    image.removeAttribute('style');
                };
            });
        }
    },
};

//  Config Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - -

const conf = {
    qS: (selector) => {
        return document.querySelector(selector);
    },
    qSA: (selector) => {
        return document.querySelectorAll(selector);
    },
    CqS: (container, selector) => {
        return container.querySelector(selector);
    },
    InfoBox: () => {
        let toggle = conf.qS('.infobox-container .infobox-toggle'),
            detail = conf.qS('.infobox-container .infobox-detail-container');

        if(toggle){
            toggle.onclick = (e) => {
                e.preventDefault();
                detail.classList.toggle('active');
            }
        }
    }
};

