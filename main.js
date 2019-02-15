var bodyInput = document.querySelector('#body-input');
var cardSection = document.querySelector('.card-section');
// var ideaCard = document.querySelector('.idea-card');
var saveBtn = document.querySelector('.save-btn');
// var searchInput = document.querySelector('.search-input');
var titleInput = document.querySelector('#title-input');
var ideaArray = JSON.parse(localStorage.getItem("storedIdeas")) || [];
var qualityArray = ['swill', 'plausible', 'genius'];

cardSection.addEventListener('click', cardButtonClick);
window.addEventListener('load', onPageLoad);
saveBtn.addEventListener('click', saveIdea);

function onPageLoad() {
    ideaArray.forEach(function(idea) {
        var oldIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
        appendCard(oldIdea);
        clearInputs();
        // ideaArray.push(newIdea);
        // this just doubles the array size on load for some reason pretty sure we don't need
    });
}

function saveIdea(e) {
    e.preventDefault();
    let newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
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
          <button class="card-btn" id="upvote-btn">
            <img alt="increase quality rating" src="images/upvote.svg" id="upvote">
          </button>
          <button class="card-btn" id="downvote-btn">
            <img alt="decrease quality rating" src="images/downvote.svg" id="downvote">
          </button>
          <p class="quality-label">
            Quality: 
            <span class="card-quality">${idea.quality}</span>
          </p>
          <button class="card-btn" id="delete-btn">
            <img alt="Delete idea card" class="btn-img" id="delete" src="images/delete.svg" >
          </button>
        </div>
      </article>`;
}

function clearInputs() {
    titleInput.value = '';
    bodyInput.value = '';
}

function cardButtonClick(e) {
  var targetCard = e.target.parentElement.parentElement.parentElement;
  if (e.target.id === 'delete') {
    deleteCard(targetCard);
  }
  if (e.target.id === 'upvote' || 'downvote') {
    console.log("change quality");
  }
}

function deleteCard(card) {
  var ideaToDelete = new Idea(card.dataset.id);
  card.remove();
  ideaArray = ideaArray.filter(obj => obj.id !=ideaToDelete.id);
  ideaToDelete.deleteFromStorage(ideaArray);
  console.log(ideaArray);
}

function decreaseQuality() {

}