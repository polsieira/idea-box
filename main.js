
// Global variables
var qualities = ['Swill','Plausible','Genius'];
var ideas = [];
var idea;
const titleInput = document.querySelector('.input--title');
const bodyInput = document.querySelector('.textarea--body');
const qualityInput = document.querySelector('.input--new-quality');
const saveButton = document.querySelector('.button--save-idea')
const main = document.querySelector('main');
const aside = document.querySelector('aside');
const cardHolder = document.querySelector('.section--display-ideas');
const editModal = document.querySelector('.div--modal-popup');
const modal = document.querySelector('.div--modal');
const showAllQualities = document.querySelector('.show-all')

// Event Listeners
window.addEventListener('load', repopulateCards);
window.addEventListener('click', hideModal);
window.addEventListener('resize', displayAside)
document.addEventListener('keypress', hideModal);
main.addEventListener('keyup', createIdeaHandler);
main.addEventListener('click', createIdeaHandler);
cardHolder.addEventListener('click', manageCardHandler);
cardHolder.addEventListener('click', displayModal);
aside.addEventListener('click', filterHandler);


// Functions
function filterHandler (event) {
  if (event.target.classList.contains('button--starred-ideas')) {
    filterByFavorite(event); 
  }
  if (event.target.classList.contains('li--qualities')) {
    filterByQuality(event); 
    showAll(event);
  }
  addQuality(event);
}

function filterByFavorite(event) {
  var currentFavorite = document.querySelectorAll('.img--star-icon');
  if (event.target.innerText === 'Show Starred Ideas') {
    handleNoStarredIdeas(ideas);
    for (var i = currentFavorite.length - 1; i >= 0; i--) {
      changeText(event.target, 'View All Ideas');
      var card = currentFavorite[i].parentNode.parentNode;
      if (currentFavorite[i].src.includes('images/star-active.svg')) {
        card.style.display = 'flex';
        card.classList.add('display');
      } else {
        card.style.display = 'none';
        card.classList.remove('display');
      }
    }
  } else { 
    removeNoStarsMessage();
    showAll(event);
    changeText(event.target, 'Show Starred Ideas');
  }
}

function handleNoStarredIdeas(ideas) {

  if(checkForStars(ideas)) {
    removeNoStarsMessage();
  } else {
    displayNoStarsMessage();
  }

}

function displayNoStarsMessage() {
  cardHolder.insertAdjacentHTML('afterbegin',
    `<p id="no-stars-message">There are no starred ideas to display!</p>
    <img id="lightbulb-img" src="images/lightbulb-idea.svg" alt="lightbulb image">
    `);
}

function removeNoStarsMessage() {
  var noStarsMessage = document.getElementById('no-stars-message');
  var lightbulbImg = document.getElementById('lightbulb-img');

  if(noStarsMessage !== null && lightbulbImg !== null) {
    noStarsMessage.remove();
    lightbulbImg.remove();
  }

}

function checkForStars(ideas) {
  var starredCount = 0;

  for(var i = 0; i < ideas.length; i++) {
    
    if(ideas[i].star === true) {
      starredCount++;
    }
  }

  if(starredCount === 0) {
    return false;
  } else {
    return true;
  }
}

function changeText(element, text) {
  element.innerText = text;
}

function showAll(event) {
  if (event.target.classList.contains('show-all') || event.target.classList.contains('button--starred-ideas')) {
  var currentQualities = document.querySelectorAll(".p--quality");
    for (var i = currentQualities.length - 1; i >= 0; i--) {
      var card = currentQualities[i].parentNode.parentNode;
      card.style.display = 'flex';
      card.classList.add('display');
    }
  }
}

function filterByQuality(event) {
  var qualityIndex = qualities.indexOf(event.target.innerText);
  var currentQualities = document.querySelectorAll(".p--quality");
  for (var i = currentQualities.length - 1; i >= 0; i--) {
    var card = currentQualities[i].parentNode.parentNode;
    if (currentQualities[i].dataset.quality == qualityIndex) {
      card.style.display = 'flex';
      card.classList.add('display');
    } else {
      card.style.display = 'none';
      card.classList.remove('display');
    }
  }
}

function repopulateCards(event) {
  instantiatePersistedIdeas();
  rebuildPersistedIdeas();
  toggleNoIdeasDisplay();
}

function toggleNoIdeasDisplay() {
  var localArray = localStorage.getItem('ideaArray');
  if(localArray === "[]") {
    addNoIdeasDisplay();
  } else {
    removeNoIdeasDisplay();
  }    
}

function addNoIdeasDisplay() {
  cardHolder.insertAdjacentHTML('afterbegin',`
    <p id="section--no-ideas">To add an idea fill out the form above!</p>
    <img id="lightbulb-img" src="images/lightbulb-idea.svg" alt="lightbulb image">
  `);
}

function removeNoIdeasDisplay() {
  var noIdeas = document.getElementById('section--no-ideas');
  var lightbulbImg = document.getElementById('lightbulb-img');

  if(noIdeas === null || lightbulbImg === null) {
    return;
  } else {
    noIdeas.remove();
    lightbulbImg.remove();
  }
}

function instantiatePersistedIdeas() {
  ideasTemp = JSON.parse(localStorage.getItem('ideaArray'));
  if (ideasTemp !== null) {
    ideasTemp.forEach(element => ideas.push(new Idea(element)))
  }  
}

function rebuildPersistedIdeas() {
  if (ideas !== null) {
    ideas.sort(chronologicalSort);
    ideas.forEach(element => buildCard(element));
  }
}

function createIdeaHandler(event) {
  event.preventDefault();
  if (checkFields([titleInput, bodyInput]) && (event.target === titleInput || bodyInput)) {
    enableButton(saveButton);
  } else {
    disableButton(saveButton);
  }
  if (event.target.classList.contains('button--save-idea')) {
    populateNewIdea();
    disableButton(saveButton);
  }
  if (event.target.classList.contains('input--search-ideas')) {
  	searchCards(event);
  }
  characterCounter(event);
}  

function characterCounter(event) {
  if(event.target.classList.contains('textarea--body')){
  var currentInput = event.target.value.length;
  document.querySelector('.character-count').innerText = `${currentInput} out of 120 characters`;
  };
  if(bodyInput.value === '') {
    document.querySelector('.character-count').innerText = '';
  };
};

function searchCards(event) {
	var searchInput = event.target.value;
	var searchTitles = document.querySelectorAll('.h3--idea-header');
	var searchBodies = document.querySelectorAll('.p--idea-body');
	for (var i = searchTitles.length - 1; i >= 0; i--) {
		var ideaCard = searchBodies[i].parentNode.parentNode;
		if (searchTitles[i].innerText.toUpperCase().indexOf(searchInput.toUpperCase()) > -1 || searchBodies[i].innerText.toUpperCase().indexOf(searchInput.toUpperCase()) > -1) {
      ideaCard.classList.contains('display') ? ideaCard.style.display = 'flex' : ideaCard.style.display = 'none';
		} else {
			ideaCard.style.display = 'none';
		}
	}
}

function populateNewIdea() {
  var idea = new Idea({id: Date.now(), title: titleInput.value, body: bodyInput.value});
  ideas = idea.saveToStorage(ideas);
  buildCard(idea);
  clearFields([titleInput, bodyInput]);
  toggleNoIdeasDisplay();
}

function buildCard(idea) {
  var starImage = idea.star === true ? 'images/star-active.svg' : 'images/star.svg';
  cardHolder.insertAdjacentHTML('afterbegin', `
    <section class="section section--idea-card display" data-id="${idea.id}">
      <article class="article article--idea-header">
        <img class="img--star-icon" id="img img--star-icon" src=${starImage} alt="star icon">
        <img class="img img--delete-icon" id="img img--delete-icon" src="images/delete.svg" onmouseover="this.src='images/delete-active.svg'" onmouseout="this.src='images/delete.svg'" alt="delete icon">
      </article>
      <article class="article article--idea-content">
        <h3 class="h3 h3--idea-header">${idea.title}</h3>
        <p class="p p--idea-body">${idea.body}</p>
      </article>
      <article class="article article--idea-footer">
        <img class="img img--upvote" src="images/upvote.svg" alt="upvote icon" data-direction='up' id="img-quality" onmouseover="this.src='images/upvote-active.svg'" onmouseout="this.src='images/upvote.svg'">
        <p class="p--quality" data-quality=${idea.quality} >Quality: ${qualities[idea.quality]}</p>
        <img class="img img--downvote" src="images/downvote.svg" alt="downvote icon" data-direction='down' id="img-quality" onmouseover="this.src='images/downvote-active.svg'" onmouseout="this.src='images/downvote.svg'">
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
  toggleNoIdeasDisplay();
}

function locateIdea(card) {
  var index = ideas.findIndex(element => element.id == card.dataset.id);
  return ideas[index];
}

function editCard(event) {
  var card = event.target.parentNode.parentNode;
  idea = locateIdea(card);
  var starImage = idea.star === true ? 'images/star-active.svg' : 'images/star.svg';
  editModal.insertAdjacentHTML('afterbegin', `
    <section class="section--edit section--idea-card" data-id="${idea.id}">
      <article class="article article--idea-header">
        <img class="updated-star"id="img img--star-icon" src=${starImage} alt="star icon">
        <h5>Edit Your Idea</h5>
      </article>
      <article class="article article--idea-content">
        <label for="idea-edit-title">Title</label><br>
          <input class="updated-title" type="text" name="idea-edit-title" value="${idea.title}"><br>
        <label for="idea-edit-body">Body</label><br>  
          <textarea class="textarea textarea--edit" name="idea-edit-body">${idea.body}</textarea>
      </article>
      <article class="article article--idea-footer">
        <h5>Hit "Return" To Submit Your Changes"</h5>
      </article>
    </section>`
  ); 
}

function newValues() {
  var editIdea = {
    title: document.querySelector('.updated-title').value,
    body: document.querySelector('.textarea--edit').value,
    star: document.querySelector('.updated-star').src.split('').reverse()[4] === 'e' ? true: false,
  };
  idea.updateIdea(editIdea, ideas);
}

function displayModal(event) {
	if (event.target.classList.contains('h3--idea-header') || event.target.classList.contains('p--idea-body')) {
		modal.style.display = 'block';
		editCard(event);
	}
}

function hideModal(event) {
	if (event.target.id === 'edit-box' || event.key === 'Enter') {
    modal.style.display = 'none';
    newValues();
    location.reload();
  }
  openHamburger(event);
  hamburgerExit(event);
}

function openHamburger(event) {
  if(event.target.classList.contains('hamburger-icon')) {
    aside.style.display = 'flex';
    modal.style.display = 'block';

  }
}

function hamburgerExit() {
  if (event.target.classList.contains('close-hamburger')) {
    aside.style.display = 'none';
    modal.style.display = 'none';
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

function changeQuality(event) {
  var card = event.target.parentNode.parentNode;
  var ideaIndex = locateIdea(card);
  ideas = ideaIndex.updateQuality(event.target.dataset.direction, qualities.length - 1, ideas); 
  changeQualityText(event, ideaIndex); 
  changeQualityData(event, ideaIndex)
}

function changeQualityText(event, ideaIndex) {
  event.target.parentNode.children[1].innerText = `Quality: ${qualities[ideaIndex.quality]}`;
}

function changeQualityData(event, ideaIndex) {
  event.target.parentNode.children[1].dataset.quality = ideaIndex.quality;
}

function addQuality(event) {
  event.preventDefault();
  var newQuality = qualityInput.value;
  var card = event.target.parentNode.parentNode;
  var ideaIndex = locateIdea(card);
  var dataCounter = 2;
  if(event.target.classList.contains('button--new-quality')) {
    dataCounter++;
    console.log(showAllQualities)
    showAllQualities.insertAdjacentHTML('beforebegin', `
      <li class="li--qualities li${dataCounter + 1}" data-index="${dataCounter}">${newQuality}</li>`)
  }
  // clearFields(qualityInput);
}

function checkFields(fields) {
  for (i = 0; i < fields.length; i++) {
    if (fields[i].value === '' || bodyInput.value.length > 120) {
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
  fields.forEach(element => element.value = "");
}

function chronologicalSort(a,b) {
  if(a.id < b.id) {
    return -1;
  } else {
    return 1;
  }
}

function displayAside(event) {  
  if (window.innerWidth > 770) {
    console.log('fire')
    aside.style.display = 'flex';
    modal.style.display = 'none';
  }
}