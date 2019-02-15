var bodyInput = document.querySelector('#body-input');
var cardSection = document.querySelector('.card-section');
var ideaCard = document.querySelector('.idea-card');
var saveBtn = document.querySelector('.save-btn');
var searchBtn = document.querySelector('.search-btn');
var searchInput = document.querySelector('.search-input');
var titleInput = document.querySelector('#title-input');
var ideaArray = JSON.parse(localStorage.getItem("storedIdeas")) || [];

cardSection.addEventListener('click', deleteCard)
saveBtn.addEventListener('click', saveIdea);
searchBtn.addEventListener('click', searchIdeas)
window.addEventListener('load', onPageLoad);

function onPageLoad() {
  ideaArray.forEach(function(idea) {
    var newIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
    appendCard(newIdea);
    clearInputs();
  });
}

function searchIdeas(e) {
  e.preventDefault();
  var filterIdeas = ideaArray.filter(function(idea) {
    return idea.body.includes(searchInput.value) || idea.title.includes(searchInput.value);
  });
  cardSection.innerHTML = "";
  filterIdeas.forEach(function(idea) {
    appendCard(idea);
  });
  searchInput.value = '';
}

function saveIdea(e) {
  e.preventDefault();
  debugger;
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  appendCard(newIdea);
  ideaArray.push(newIdea);
  newIdea.saveToStorage(ideaArray);
  clearInputs();
}

function appendCard(idea) {
  cardSection.innerHTML += 
  `<article data-id=${idea.id} class="idea-card">
      <div class="card-main">
        <h2 class="card-title" contenteditable="true">
          ${idea.title}
        </h2>
        <p class="card-body" contenteditable="true">
          ${idea.body}
        </p>
      </div>
      <div class="card-footer">
        <img alt="upvote btn" src="images/upvote.svg" class="card-btn" id="upvote-btn">
        <img alt="downvote btn" src="images/downvote.svg" class="card-btn" id="downvote-btn">
        <p class="quality-label">
          Quality: 
          <span class="card-quality">${idea.quality}</span>
        </p>
        <img alt="delete btn" src="images/delete.svg" class="card-btn" id="delete-btn">
      </div>
    </article>`;
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function deleteCard (e) {
  if (e.target.id === 'delete-btn') {
    e.target.parentElement.parentElement.remove();
    var newIdea = new Idea(e.target.parentElement.parentElement.dataset.id);
    ideaArray = ideaArray.filter(obj => obj.id !== parseInt(newIdea.id));
    newIdea.deleteFromStorage(ideaArray);
  }
}

// function newIdeaObject() {
//   return newIdea;
// }