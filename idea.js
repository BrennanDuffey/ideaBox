class Idea {
    constructor(id, title, body, quality) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quality = quality || 'Swill';
        // this.qualityArray = ['Swill', 'Plausible', 'Genius'];
    }
    saveToStorage(ideaArray) {
        localStorage.setItem("storedIdeas", JSON.stringify(ideaArray));
    }

    deleteFromStorage(index) {
        ideaArray.splice(index, 1)
        this.saveToStorage(ideaArray);
    }

    updateContent(index, idea) {
        ideaArray.splice(index, 1, idea);
        this.saveToStorage(ideaArray);
    }

    updateQuality(index, idea) {
      ideaArray.splice(index, 1, idea);
        this.saveToStorage(ideaArray);
    }
}