class Idea {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star || false;
    this.quality = obj.quality || 0; 
  }

  saveToStorage(array) {
    console.log(array);
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

  updateIdea(obj, ideas) {    
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star;
    console.log(this.title, this.body, this.star);
    this.saveToStorage(ideas);
    return ideas;
  }

  updateQuality(direction, nQualities, array) {
    if (direction === 'up' && this.quality !== nQualities) {
        this.quality++;
    } else if (direction === 'down' && this.quality !== 0) {  
        this.quality--;
    }

    this.saveToStorage(array);
    return array;
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




