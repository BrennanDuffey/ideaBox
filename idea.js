class Idea {
    constructor(id, title, body, quality) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.quality = quality || 'GREAT!!';
    }
    saveToStorage(ideaArray) {
        localStorage.setItem("storedIdeas", JSON.stringify(ideaArray));
    }

    deleteFromStorage() {

    }

    updateContent() {

    }

    updateQuality() {
      
    }
}