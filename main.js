
// Global variables
var qualities = ['Swill','Plausible','Genius'];
var ideas = [];
const titleInput = document.querySelector(".input--title");
const bodyInput = document.querySelector(".textarea--body");
const main = document.querySelector('main');
const cardHolder = document.querySelector('.section--display-ideas');
const editModal = document.querySelector('.div--modal-popup');
const modal = document.querySelector('.div--modal');
// Event Listeners
window.addEventListener('load', populateCards);
window.addEventListener('click', hideModal);
document.addEventListener('keypress', hideModal);
main.addEventListener('click', ideaHandler);
cardHolder.addEventListener('click', cardHandler);
cardHolder.addEventListener('click', displayModal);

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
  ideaIndex.saveToStorage(ideas);
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
  var idea = new Idea(ideaText);
  idea.saveToStorage(ideas);
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
        <p class="p p--idea-body">${idea.body}</p>
      </article>
      <article class="article article--idea-footer">
        <img id="img img--upvote" src="images/upvote.svg" alt="upvote icon">
        <p>Quality: Swill</p>
        <img id="img img--downvote" src="images/downvote.svg" alt="downvote icon">
      </article>
    </section>`
  )
}

function deleteIdea(event) {
  var card = event.target.parentNode.parentNode;
  cardHolder.removeChild(card);
  var ideaIndex = locateIdea(card);
  ideaIndex.deleteFromStorage(ideas);
}

function locateIdea(card) {
  var index = ideas.findIndex(function(element) {
    return element.id == card.dataset.id
  });

  return ideas[index];
}

// basham functions
function editCard(event) {
	// locateIdea(card); isn't firing here.
	editModal.insertAdjacentHTML('afterbegin', `
    <section class="section section--idea-card" data-id="1563336219774">
      <article class="article article--idea-header">
        <img id="img img--star-icon" src= alt="star icon">
        <img id="img img--delete-icon" src="images/delete.svg" alt="delete icon">
      </article>
      <article class="article article--idea-content">
        <input type="text" value="asdfa">
        <textarea class="textarea textarea--edit">sdf</textarea>
      </article>
      <article class="article article--idea-footer">
        <img src="images/upvote.svg" alt="upvote icon">
        <p>Quality: Swill</p>
        <img src="images/downvote.svg" alt="downvote icon">
      </article>
    </section>`
  ) 
}

function displayModal(event) {
	if (event.target.classList.contains('h3--idea-header' || 'p--idea-body')) {
		modal.style.display = 'block';
		editCard(event);
	}
}

function hideModal(event) {
	if (event.target.id === 'edit-box' || event.key === 'Enter') {
		console.log('click');
		modal.style.display = 'none';
		console.log('click2')
		//will need to call a function that 1) replaces this card without changing time stamp? 2)pushes back into array/localStorage
	}
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