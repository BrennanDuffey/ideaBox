var searchInput = document.querySelector('.search-input');
var newIdeaForm = document.querySelector('.new-idea-form');
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('.save-btn');
var cardSection = document.querySelector('.card-section');
var ideaCard = document.querySelector('.idea-card');
var ideaArray = [];

window.addEventListener('load', onPageLoad)
saveBtn.addEventListener('click', saveIdea)

function onPageLoad() {

}

function saveIdea(e) {
  e.preventDefault();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  // newIdeaObject();
  appendCard(newIdea);
  console.log(newIdea);
}

function appendCard(idea) {
  cardSection.innerHTML += `<article data-id=${idea.id} class="idea-card demo-card">
        <h2 class="card-title" contenteditable="true">
          ${idea.title}
        </h2>
        <p class="card-body" contenteditable="true">
          ${idea.body}
        </p>
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

// function newIdeaObject() {
//   return newIdea;
// }