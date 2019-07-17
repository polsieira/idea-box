
// Global variables
var qualities = ['Swill','Plausible','Genius'];
var ideas = [];
const titleInput = document.querySelector(".input--title");
const bodyInput = document.querySelector(".textarea--body");
const main = document.querySelector('main');
const cardHolder = document.querySelector('.section--display-ideas');

// Event Listeners
window.addEventListener('load', populateCards);
main.addEventListener('click', ideaHandler);
cardHolder.addEventListener('click', cardHandler);

// Functions
function populateCards(event) {
  ideasTemp = JSON.parse(localStorage.getItem('ideaArray'));
  ideasTemp.forEach(function(element) {
    element = new Idea(element);
    ideas.push(element);
  })
  if (ideas !== null) {
    ideas.forEach(function(element) {
    buildCard(element)
    });
  }
}

function ideaHandler(event) {
  event.preventDefault();
  if (event.target.classList.contains('button--save-idea')) {
    populateNewIdea();
  }
}

function cardHandler(event) {
  event.preventDefault();
  if (event.target.id === 'img img--delete-icon') {
    deleteIdea(event);
  }

  if (event.target.id === 'img img--star-icon') {
    toggleStar(event);
  }
}

function toggleStar(event) {
  var card = event.target.parentNode.parentNode;
  var ideaIndex = locateIdea(card);
  ideaIndex.updateStar();
  ideas = ideaIndex.saveToStorage(ideas);
  if(ideaIndex.star === true){
    event.target.src = 'images/star-active.svg';
  } else {
    event.target.src = 'images/star.svg';
  }
  
}

function populateNewIdea() {
  var ideaText = {};
  ideaText.id = Date.now();
  ideaText.title = titleInput.value;
  ideaText.body = bodyInput.value;
  clearFields([titleInput, bodyInput]);
  var idea = new Idea(ideaText);
  ideas = idea.saveToStorage(ideas);
  buildCard(idea);
}

function buildCard(idea) {
  var starImage = idea.star === true ? 'images/star-active.svg' : 'images/star.svg';
  cardHolder.insertAdjacentHTML('afterbegin', `
    <section class="section section--idea-card" data-id="${idea.id}">
      <article class="article article--idea-header">
        <img id="img img--star-icon" src=${starImage} alt="star icon">
        <img id="img img--delete-icon" src="images/delete.svg" alt="delete icon">
      </article>
      <article class="article article--idea-content">
        <h3 class="h3 h3--idea-header">${idea.title}</h3>
        <p>${idea.body}</p>
      </article>
      <article class="article article--idea-footer">
        <img src="images/upvote.svg" alt="upvote icon">
        <p>Quality: Swill</p>
        <img src="images/downvote.svg" alt="downvote icon">
      </article>
    </section>`
  )
}

function deleteIdea(event) {
  var card = event.target.parentNode.parentNode;
  cardHolder.removeChild(card);
  var ideaIndex = locateIdea(card);
  ideas = ideaIndex.deleteFromStorage(ideas);
}

function locateIdea(card) {
  var index = ideas.findIndex(function(element) {
    return element.id == card.dataset.id
  });

  return ideas[index];
}

function clearFields(fields) {
  fields.forEach(function(element) {
    element.value = "";
  });
}



function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}