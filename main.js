
// Global variables
var qualities = ['Swill','Plausible','Genius'];
var ideas = [];
const titleInput = document.querySelector(".input--title");
const bodyInput = document.querySelector(".textarea--body");
const main = document.querySelector('main');

// Event Listeners
main.addEventListener('click', ideaHandeler);

// Functions
function ideaHandeler(event) {
  console.log('In ideaHandeler')
  event.preventDefault();
  if (event.target.classList.contains('button--save-idea')) {
    console.log('In conditional')
    buildCard();
  }
}

function buildCard() {
  var ideaText = {};
  ideaText.id = Date.now();
  ideaText.title = titleInput.value;
  ideaText.body = bodyInput.value;
  console.log(ideaText)
  var idea = new Idea(ideaText);
  idea.saveToStorage(ideas);
  insertCard(idea);
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