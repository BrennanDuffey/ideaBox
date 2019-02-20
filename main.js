var bodyInput = document.querySelector('#body-input');
var cardSection = document.querySelector('.card-section');
var saveBtn = document.querySelector('.save-btn');
var searchBtn = document.querySelector('.search-btn');
var searchInput = document.querySelector('.search-input');
var titleInput = document.querySelector('#title-input');
var showMoreBtn = document.querySelector('#show-more-btn');
var filterBtns = document.querySelector('.filter-buttons');
var ideaArray = [] ;
var qualityArray = ['Swill', 'Plausible', 'Genius'];

showMoreBtn.addEventListener('click', showMore);
cardSection.addEventListener('click', editCard);
saveBtn.addEventListener('click', saveIdea);
searchBtn.addEventListener('click', searchIdeas);
searchInput.addEventListener('input', typeSearch);
window.addEventListener('load', onPageLoad);
filterBtns.addEventListener('click', filterByQuality);


function onPageLoad() {
  if (localStorage.hasOwnProperty("storedIdeas")){
      var parsedArray = JSON.parse(localStorage.getItem("storedIdeas"));
      ideaArray = parsedArray;
      if (parsedArray.length > 10) {
        parsedArray = parsedArray.splice(-10) 
      }
      parsedArray.forEach(function(idea) {
        var oldIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
        appendCard(oldIdea);
        ideaArray.push(oldIdea);
        // oldIdea.saveToStorage(ideaArray);
      });
  }
}

function saveIdea(e) {
  e.preventDefault();
  var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  appendCard(newIdea);
  ideaArray.push(newIdea);
  newIdea.saveToStorage(ideaArray);
  clearInputs();
}

function showMore(e) {
    e.preventDefault();
  // var parsedArray = JSON.parse(localStorage.getItem("storedIdeas"));
  // console.log(parsedArray);
  
  if (showMoreBtn.innerText === 'Show More...') {
    cardSection.innerHTML = '';
    ideaArray.forEach(function(idea) {
      var showIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
      appendCard(showIdea);
    });
    showMoreBtn.innerText = 'Show Less...';
  } else {
    cardSection.innerHTML = '';
    var topTen = ideaArray.slice(-10);
    topTen.forEach(function(idea) {
      var topTenIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
      appendCard(topTenIdea);
    });
    showMoreBtn.innerText = 'Show More...';
  }
}

function typeSearch() {
  var filterIdeas = ideaArray.filter(function(idea) {
    return idea.body.includes(searchInput.value) || idea.title.includes(searchInput.value);
  });
  cardSection.innerHTML = '';
  filterIdeas.forEach(function(idea) {
    appendCard(idea);
  });
}

function searchIdeas(e) {
  e.preventDefault();
  var filterIdeas = ideaArray.filter(function(idea) {
    return idea.body.includes(searchInput.value) || idea.title.includes(searchInput.value);
  });
  cardSection.innerHTML = '';
  filterIdeas.forEach(function(idea) {
    appendCard(idea);
  });
  searchInput.value = '';
}

function appendCard(idea) {
  cardSection.innerHTML += 
  `<article data-id=${idea.id} class="idea-card">
    <div class="card-main">
      <h2 class="card-text" id="card-title" contenteditable="true">
        ${idea.title}
      </h2>
      <p class="card-text" id="card-body" contenteditable="true">
        ${idea.body}
      </p>
    </div>
    <div class="card-footer">
      <button class="card-btn" id="upvote-btn">
        <img alt="increase quality rating" src="images/upvote.svg" id="upvote" class="card-btn">
      </button>
      <button class="card-btn" id="downvote-btn">
        <img alt="decrease quality rating" src="images/downvote.svg" id="downvote" class="card-btn">
      </button>
      <button class="card-btn" id="delete-btn">
        <img alt="Delete idea card" class="card-btn" id="delete" src="images/delete.svg" >
      </button>
      <p class="quality-label">
        Quality: 
        <span class="card-quality">${idea.quality}</span>
      </p>
    </div>
  </article>`;
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function filterByQuality(e) {
  if (e.target.classList.contains('filter-btn')){
  let filteredIdeas = ideaArray.filter(idea => idea.quality === e.target.innerText);
  cardSection.innerHTML = '';
  filteredIdeas.forEach(idea => 
    appendCard(idea));
  }
}


function editCard(e) {
  console.log(e.target)
  var clickedElement = e.target;
  var targetCard = e.target.closest('.idea-card');
  var targetCardId = parseInt(targetCard.dataset.id);
  var targetObj = ideaArray.find(idea => idea.id === targetCardId);
  var objIndex = ideaArray.indexOf(targetObj);
  var targetIdea = new Idea(targetObj.id, targetObj.title, targetObj.body, targetObj.quality);
  if (e.target.matches('.card-btn')) {
    cardButtons(clickedElement, targetCard, targetCardId, targetIdea, objIndex);
  }
  if (e.target.matches('.card-text')) {
    editCardText(clickedElement, targetIdea, objIndex);
  }
}

function cardButtons (button, card, cardId, idea, index){
var cardQuality = card.lastElementChild.lastElementChild.lastElementChild;
  if (button.id === 'delete') {
    deleteCard(cardId, card);
  }
  if (button.id === 'upvote') {
    increaseQuality(card, idea, index, cardQuality);
  }
  if (button.id === 'downvote') {
    decreaseQuality(card, idea, index, cardQuality);
  }
}

function deleteCard(id, card) {
  var ideaToDelete = new Idea(id);
  card.remove();
  ideaArray = ideaArray.filter(obj => obj.id !=ideaToDelete.id);
  ideaToDelete.deleteFromStorage(ideaArray);
}

function increaseQuality(card, idea, index, quality) {
  var updatedIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  if (idea.quality === 'Swill') {
    updatedIdea.quality = qualityArray[1];
  }
  if (idea.quality === 'Plausible') {
    updatedIdea.quality = qualityArray[2];
  }
  quality.innerText = updatedIdea.quality;
  ideaArray.splice(index, 1, updatedIdea);
  updatedIdea.updateQuality(ideaArray);
}

function decreaseQuality(card, idea, index, quality) {
  var updatedIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  if (idea.quality === 'Genius') {
    updatedIdea.quality = qualityArray[1];
  }
  if (idea.quality === 'Plausible') {
    updatedIdea.quality = qualityArray[0];
  }
  quality.innerText = updatedIdea.quality;
  ideaArray.splice(index, 1, updatedIdea);
  updatedIdea.updateQuality(ideaArray);
}

function editCardText(field, idea, index) {
  var updatedIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  field.addEventListener('input', function(){
    if (field.id === 'card-title') {
      updatedIdea.title = field.innerText;
    } else if (field.id ==='card-body') {
      updatedIdea.body = field.innerText;
    }
  ideaArray.splice(index, 1, updatedIdea);
  updatedIdea.updateContent(ideaArray);
  });
}


