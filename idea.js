class Idea {
  constructor(obj) {
    this.id = obj.id; //can use id making function or Date.now()
    this.title = obj.title; //string
    this.body = obj.body; //string
    this.star = obj.star || false; //boolean
    this.quality = obj.quality || 0;  //integer specifying a quality in array
  }

  saveToStorage(array) {
    array = array.filter(element => element.id !== this.id);
    array.push(this); 
    localStorage.setItem('ideaArray', JSON.stringify(array));
    return array;
  }

  deleteFromStorage(array) {
    array = array.filter(element => element.id !== this.id);
    localStorage.setItem('ideaArray', JSON.stringify(array));
    return array;
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

  updateQuality(direction) {
    if (direction === 'up') {
      this.quality = this.quality === this.quality.length + 1 ? this.quality.length + 1 : this.quality++;
    } else if (direction === 'down') {
      this.quality = this.quality === 0 : 0 : this.quality--;
    }
  }

  updateTitle(title) {
    this.title = title;
  }

  updateBody(body) {
    this.body = body;
  }

  updateStar() {
    this.star = !this.star;
  }
}




