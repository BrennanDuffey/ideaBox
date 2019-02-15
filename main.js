var bodyInput = document.querySelector('#body-input');
var cardSection = document.querySelector('.card-section');
var ideaCard = document.querySelector('.idea-card');
var saveBtn = document.querySelector('.save-btn');
var searchInput = document.querySelector('.search-input');
var titleInput = document.querySelector('#title-input');
var ideaArray = JSON.parse(localStorage.getItem("storedIdeas")) || [];

cardSection.addEventListener('click', deleteCard);
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
            <img alt="increase quality rating" src="images/upvote.svg" >
          </button>
          <button class="card-btn" id="downvote-btn">
            <img alt="decrease quality rating" src="images/downvote.svg" >
          </button>
          <p class="quality-label">
            Quality: 
            <span class="card-quality">${idea.quality}</span>
          </p>
          <button class="card-btn" id="delete-btn">
            <img alt="Delete idea card" id="delete-img" src="images/delete.svg" >
          </button>
        </div>
      </article>`;
}

function clearInputs() {
    titleInput.value = '';
    bodyInput.value = '';
}

function deleteCard(e) {
  var cardToDelete = e.target.parentElement.parentElement.parentElement;
  var ideaToDelete = new Idea(cardToDelete.dataset.id);
  if (e.target.id === 'delete-btn' || 'delete-img') {
    cardToDelete.remove();
    ideaArray = ideaArray.filter(obj => obj.id != ideaToDelete.id);
    ideaToDelete.deleteFromStorage(ideaArray);
    // console.log(ideaArray);
  }
}

// function updateQuality {

// }