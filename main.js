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