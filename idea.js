class Idea {
  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || 'Swill';
  }
  
  saveToStorage(ideaArray) {
    localStorage.setItem("storedIdeas", JSON.stringify(ideaArray));
  }

  deleteFromStorage(index) {
    ideaArray.splice(index, 1)
    this.saveToStorage(ideaArray);
  }

  updateContent(index) {
    ideaArray.splice(index, 1, this);
    this.saveToStorage(ideaArray);
  }

  updateQuality(index) {
    ideaArray.splice(index, 1, this);
    this.saveToStorage(ideaArray);
  }
}