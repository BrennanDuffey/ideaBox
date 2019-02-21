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
  if (localStorage.hasOwnProperty("storedIdeas")) {
    var parsedArray = JSON.parse(localStorage.getItem("storedIdeas"));
    parsedArray.forEach(function(idea) {
      const oldIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
      ideaArray.push(oldIdea);
      });
    console.log(ideaArray)
  }
  if (ideaArray.length >= 11) {
    const tenCards = ideaArray.slice(-10);
    tenCards.forEach(card => appendCard(card))
    // hideFooter()  
  } else {
    ideaArray.forEach(idea => appendCard(idea))
  }
}

function saveIdea(e) {
    e.preventDefault();
    var newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    ideaArray.push(newIdea);
    appendCard(newIdea);
    newIdea.saveToStorage(ideaArray);
    clearInputs();
}

function showMore() {
  if (showMoreBtn.innerText === 'Show More...') {
    cardSection.innerHTML = '';
    ideaArray.forEach(idea => appendCard(idea));
    showMoreBtn.innerText = 'Show Less...';
  } else if (showMoreBtn.innerText === 'Show Less...'){
    cardSection.innerHTML = '';
    var topTen = ideaArray.slice(-10);
    topTen.forEach(function(idea) {
      appendCard(idea);
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
  var targetCard = e.target.closest('.idea-card');
  var targetCardId = parseInt(targetCard.dataset.id);
  var targetIdea = ideaArray.find(idea => idea.id === targetCardId);
  var objIndex = ideaArray.indexOf(targetIdea);
  if (e.target.matches('.card-btn')) {
  cardButtons(e.target, targetCard, targetCardId, targetIdea, objIndex);
  }
  if (e.target.matches('.card-text')) {
      editCardText(e.target, targetIdea, objIndex);
  }
}

function cardButtons (button, card, cardId, idea, index){
var cardQuality = card.lastElementChild.lastElementChild.lastElementChild;
  if (button.id === 'delete') {
    card.remove();
    idea.deleteFromStorage(index);
  }
  if (button.id === 'upvote') {
    increaseQuality(idea, index, cardQuality);
  }
  if (button.id === 'downvote') {
    decreaseQuality(idea, index, cardQuality);
  }
}

function increaseQuality(idea, index, quality) {
  var updatedIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  if (updatedIdea.quality === 'Swill') {
    updatedIdea.quality = qualityArray[1];
  } else if (updatedIdea.quality === 'Plausible') {
    updatedIdea.quality = qualityArray[2];
  }
  quality.innerText = updatedIdea.quality;
  updatedIdea.updateQuality(index);
}

function decreaseQuality(idea, index, quality) {
  var updatedIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  if (updatedIdea.quality === 'Genius') {
    updatedIdea.quality = qualityArray[1];
  } else if (updatedIdea.quality === 'Plausible') {
    updatedIdea.quality = qualityArray[0];
  }
  quality.innerText = updatedIdea.quality;
  updatedIdea.updateQuality(index);
}

function editCardText(field, idea, index) {
  var updatedIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
  field.addEventListener('input', function(){
    if (field.id === 'card-title') {
      updatedIdea.title = field.innerText;
    } else if (field.id ==='card-body') {
      updatedIdea.body = field.innerText;
    }
  updatedIdea.updateContent(index);
  });
}
