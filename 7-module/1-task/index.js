import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add("ribbon");

    let menuEls = this.categories
      .map(value => {
      return `<a href="#" class="${value.id == '' ?
      "ribbon__item ribbon__item_active" :
      "ribbon__item"}" data-id="${value.id}">${value.name}</a>`
      })
      .join('');
    
    this.elem.innerHTML += `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${menuEls}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    this.elem.querySelector(".ribbon__arrow_left").classList.remove("ribbon__arrow_visible");

    this.elem.querySelector(".ribbon__arrow_right").addEventListener('click', () => {
      this.elem.querySelector(".ribbon__inner").scrollBy(350,0);
    });

    this.elem.querySelector(".ribbon__arrow_left").addEventListener('click', () => {
      this.elem.querySelector(".ribbon__inner").scrollBy(-350,0);
    });

    this.elem.querySelector(".ribbon__inner").addEventListener('scroll',() =>{
      if(this.elem.querySelector(".ribbon__inner").scrollLeft == 0){
         this.elem.querySelector(".ribbon__arrow_left").classList.remove("ribbon__arrow_visible");
      }else{
         this.elem.querySelector(".ribbon__arrow_left").classList.add("ribbon__arrow_visible");
      }
  
      if((this.elem.querySelector(".ribbon__inner").scrollWidth - this.elem.querySelector(".ribbon__inner").scrollLeft - 
          this.elem.querySelector(".ribbon__inner").clientWidth) == 0){
          this.elem.querySelector(".ribbon__arrow_right").classList.remove("ribbon__arrow_visible");
      }else{
        this.elem.querySelector(".ribbon__arrow_right").classList.add("ribbon__arrow_visible");
      }
    }); 

    this.elem.querySelector(".ribbon__inner").addEventListener('click',(el) => {
      if(el.target.tagName != "A");
      el.target.parentElement.querySelector(".ribbon__item_active").classList.remove("ribbon__item_active");
      el.target.classList.add("ribbon__item_active");
      el.target.dispatchEvent(new CustomEvent("ribbon-select", {
        detail: el.target.getAttribute("data-id"),
        bubbles: true
      }));
    }); 
  }
}
