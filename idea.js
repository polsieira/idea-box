class Idea {
  constructor(id, title, body, star, quality) {
    this.id = id; //can use id making function or Date.now()
    this.title = title; //string
    this.body = body; //string
    this.star = star || false; //boolean
    this.quality = quality || 0;  //integer specifying a quality in array
  }

  saveToStorage(array) {
    array.push(this); 
    localStorage.setItem('ideaArray', JSON.stringify(array));
  }

  deleteFromStorage(array) {
    for (var i = array.length - 1; i >= 0; --i) {
      if (array[i].id === this.id) {
        array.splice(i,1);
      }
    }
    localStorage.setItem('ideaArray', JSON.stringify(array));
  }

  updateIdea(info, property) {     //would be great if we could use the input class or id to know what property to update
    if (property === 'title') {
      this.updateTitle(info);
    }
    if (property === 'body') {
      this.updateBody(info);
    }
    if (property === 'star') {
      this.updateStar(info);
    }
  }

  updateQuality(quality) {
    this.quality = quality;
  }

  updateTitle(title) {
    this.title = title;
  }

  updateBody(body) {
    this.body = body;
  }

  updateStar() {
    this.star ^= true;
  }
}
