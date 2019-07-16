
// Global variables
var qualities = ['Swill','Plausible','Genius'];
var ideas = [];
const titleInput = document.querySelector(".input--title");
const bodyInput = document.querySelector(".textarea--body");
const main = document.querySelector('main');
const cardHolder = document.querySelector('.section--display-ideas');

// Event Listeners
window.addEventListener('load', populateCards);
main.addEventListener('click', ideaHandeler);

// Functions
function populateCards(event) {
  var ideas = JSON.parse(localStorage.getItem('ideaArray'));
  console.log(ideas)
  ideas.forEach(function(element) {
    buildCard(element)
    console.log('here')
  });
}

function ideaHandeler(event) {
  event.preventDefault();
  if (event.target.classList.contains('button--save-idea')) {
    populateNewIdea();
  }
}

function populateNewIdea() {
  var ideaText = {};
  ideaText.id = Date.now();
  ideaText.title = titleInput.value;
  ideaText.body = bodyInput.value;
  console.log(ideaText)
  var idea = new Idea(ideaText);
  idea.saveToStorage(ideas);
  buildCard(idea);
}

function buildCard(idea) {
  cardHolder.insertAdjacentHTML('afterbegin', `
    ${idea.title}`
  )
}

function insertCard(idea) {

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