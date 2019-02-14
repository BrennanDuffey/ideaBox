var bodyInput = document.querySelector('#body-input');
var cardSection = document.querySelector('.card-section');
var ideaArray = [];
var ideaCard = document.querySelector('.idea-card');
var newIdeaForm = document.querySelector('.new-idea-form');
var saveBtn = document.querySelector('.save-btn');
var searchInput = document.querySelector('.search-input');
var titleInput = document.querySelector('#title-input');

window.addEventListener('load', onPageLoad)
saveBtn.addEventListener('click', saveIdea)

function onPageLoad() {
  var parsedArray = JSON.parse(localStorage.getItem("storedIdeas"));
  parsedArray.forEach(function(idea) {
  var newIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  appendCard(newIdea);
  ideaArray.push(newIdea);
  newIdea.saveToStorage(ideaArray)
  })
}

function saveIdea(e) {
  e.preventDefault();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  appendCard(newIdea);
  ideaArray.push(newIdea);
  newIdea.saveToStorage(ideaArray);
  clearInputs();
}

function appendCard(idea) {
  cardSection.innerHTML += `<article data-id=${idea.id} class="idea-card demo-card">
        <div class="card-main">
          <h2 class="card-title" contenteditable="true">
            ${idea.title}
          </h2>
          <p class="card-body" contenteditable="true">
            ${idea.body}
          </p>
        </div>
        <div class="card-footer">
          <img alt="upvote btn" src="images/upvote.svg" class="card-btn upvote-btn">
          <img alt="downvote btn" src="images/downvote.svg" class="card-btn downvote-btn">
          <p>
            Quality: 
            <span class="card-quality">idea.quality</span>
          </p>
          <img alt="delete btn" src="images/delete.svg" class="card-btn delete-btn">
        </div>
      </article>`;
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

// function newIdeaObject() {
//   return newIdea;
// }