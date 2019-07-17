
// Global variables
var qualities = ['Swill','Plausible','Genius'];
var ideas = [];
const titleInput = document.querySelector('.input--title');
const bodyInput = document.querySelector('.textarea--body');
const saveButton = document.querySelector('.button--save-idea')
const main = document.querySelector('main');
const cardHolder = document.querySelector('.section--display-ideas');

// Event Listeners
window.addEventListener('load', repopulateCards);
main.addEventListener('keyup', createIdeaHandler);
main.addEventListener('click', createIdeaHandler);
cardHolder.addEventListener('click', manageCardHandler);

// Functions
function repopulateCards(event) {
  instantiatePersistedIdeas();
  rebuildPersistedIdeas();
}

function instantiatePersistedIdeas() {
  ideasTemp = JSON.parse(localStorage.getItem('ideaArray'));
  ideasTemp.forEach(function(element) {
    element = new Idea(element);
    ideas.push(element);
  })
}

function rebuildPersistedIdeas() {
  if (ideas !== null) {
    ideas.forEach(function(element) {
    buildCard(element)
    });
  }
}

function createIdeaHandler(event) {
  event.preventDefault();
  if (event.target === titleInput || bodyInput) {
    if (checkFields([titleInput, bodyInput])) {
      enableButton(saveButton);
    } else {
      disableButton(saveButton);
    }
  }
  if (event.target.classList.contains('button--save-idea')) {
    populateNewIdea();
  }
}

function populateNewIdea() {
  var idea = new Idea({id: Date.now(), title: titleInput.value, body: bodyInput.value});
  ideas = idea.saveToStorage(ideas);
  buildCard(idea);
  clearFields([titleInput, bodyInput]);
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
        <img src="images/upvote.svg" alt="upvote icon" data-direction='up' id="img-quality">
        <p>Quality: ${qualities[idea.quality]}</p>
        <img src="images/downvote.svg" alt="downvote icon" data-direction='down' id="img-quality">
      </article>
    </section>`
  )
}

function manageCardHandler(event) {
  event.preventDefault();
  if (event.target.id === 'img img--delete-icon') {
    deleteIdea(event);
  }
  if (event.target.id === 'img img--star-icon') {
    toggleStar(event);
  }
  if (event.target.id === 'img-quality') {
    changeQuality(event);
  }
}

function deleteIdea(event) {
  var card = event.target.parentNode.parentNode;
  cardHolder.removeChild(card);
  var ideaIndex = locateIdea(card);
  ideas = ideaIndex.deleteFromStorage(ideas);
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

function changeQuality(event) {
  var card = event.target.parentNode.parentNode;
  var ideaIndex = locateIdea(card);
  ideas = ideaIndex.updateQuality(event.target.dataset.direction, qualities.length - 1, ideas); 
  changeQualityText(event, ideaIndex); 
}

function changeQualityText(event, ideaIndex) {
  console.log(event)
  event.target.parentNode.children[1].innerText = `Quality: ${qualities[ideaIndex.quality]}`;
}

function locateIdea(card) {
  var index = ideas.findIndex(function(element) {
    return element.id == card.dataset.id
  }); 
  return ideas[index];
}

function checkFields(fields) {
  for (i = 0; i < fields.length; i++) {
    if (fields[i].value === '') {
      return false;
    }
  }
  return true;
}

function enableButton(button) {
  button.disabled = false;
}

function disableButton(button) {
  button.disabled = true;
}

function clearFields(fields) {
  fields.forEach(function(element) {
    element.value = "";
  });
}