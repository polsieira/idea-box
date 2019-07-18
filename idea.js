class Idea {
  constructor(obj) {
    this.id = obj.id; //can use id making function or Date.now()
    this.title = obj.title; //string
    this.body = obj.body; //string
    this.star = obj.star || false; //boolean
    this.quality = obj.quality || 0;  //integer specifying a quality in array
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

  updateIdea(obj, ideas) {     //would be great if we could use the input class or id to know what property to update
    this.title = obj.title;
    this.body = obj.body;
    this.star = obj.star;
    console.log(this.title, this.body, this.star);
    this.saveToStorage(ideas);
    return ideas;
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
    this.star = !this.star;
  }
}




