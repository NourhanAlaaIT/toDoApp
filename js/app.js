//create obj
class Card {
    constructor(title) {
        this.title = title
    }
}
const title = document.querySelector('.field').value;
let card = new Card(title)
class UI {

    //display cards
    displayCards(cards) {
        cards.forEach(card => this.createCard(card))
    }

    //create card
    createCard(data) {
        let {title} = data
    
        let card = document.querySelector('.toDoList')
        let cardItem = this.createElement('li', 'card');
        let cardDesc = this.createElement('p', 'cardTxt', title);
    
        let checkCard = this.createElement('input', 'check')
        checkCard.setAttribute('type', 'checkbox');

        checkCard.addEventListener('change', () => {
            if(checkCard.checked) {
                cardDesc.style.textDecoration = 'line-through';
            } else {
                cardDesc.style.textDecoration = 'none';
            }
          })
    
        let removeCard = this.createElement('button', 'removeCard', '<i class="fa fa-trash-alt"></i>');
          cardItem.appendChild(cardDesc);
          cardItem.appendChild(checkCard);
          cardItem.appendChild(removeCard);
          card.appendChild(cardItem);
    }
    //alert msg
    showAllert(content, className){
        let errMsg = this.createElement('p', `${className}`, `${content}`);
        document
        .querySelector('.container')
        .insertBefore(errMsg, document.querySelector('.formApp'));

        setTimeout(() => document.querySelector(`.${className}`).remove(), 2000);
    }
    

    //create element
    createElement(el, className, content) {
        let element = document.createElement(el);
        element.className = className;
        if (content) element.innerHTML = content;
        
        return element;
    }

    //remove card
    removeElement(target) {
        target.parentElement.remove();
    }
}

//store cards
class Store {
    getCards() {
      let cards;
      if (!localStorage.getItem('cards')) {
        cards = [];
      } else {
        cards = JSON.parse(localStorage.getItem('cards'));
      }
  
      return cards;
    }
  
    saveCard(card) {
      let cards = this.getCards();
  
      cards.push(card);
  
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  
    removeCard(title) {
      let store = this.getCards();
  
      store.forEach((element, i) => {
        if (element.title === title) {
          store.splice(i, 1);
        }
      });
  
      localStorage.setItem("cards", JSON.stringify(store));
    }
  }

//instanitiate UI & Store classes
let ui = new UI();
let store = new Store();

// Display event
document.addEventListener("DOMContentLoaded", () => {
    ui.displayCards(store.getCards());
  });

//submit event 
document.querySelector('.formApp').addEventListener('submit', event => {
    event.preventDefault();

    const title = document.querySelector('.field').value;

    if (title === ''){
        ui.showAllert('please fill this field', 'errMsg');
        return;
    }

    let card = new Card(title, done = false);
    ui.createCard(card);
    store.saveCard(card);
    this.reset();
});

//remove event 
document.querySelector('.toDoList').addEventListener('click', event => {
    if (event.target.classList.contains('fa-trash-alt')) {
        store.removeCard(event.target.parentElement.parentElement.querySelector('.cardTxt')
        .innerText)
        ui.removeElement(event.target.parentElement)
    }
})