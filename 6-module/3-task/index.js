import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add("carousel");

    this.slidesHandler = '';
    this.slides.forEach(function(item) {
      this.slidesHandler += `
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;
    }, this);

    this.elem.innerHTML += `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slidesHandler}
      </div>
      </div>
      </div>
      </div>
    `;

    this.elementCount = 0;
    this.allSlides = slides.length-1;

    this.elem.querySelector(".carousel__arrow_left").style.display = "none";
    this.elem.querySelector(".carousel__arrow_right").addEventListener('click', (event) => {
      this.elementCount ++;
      if(this.elementCount == 1){
        document.querySelector(".carousel__arrow_left").style.display = "";
      }
    
      if(this.elementCount == this.allSlides){
        document.querySelector(".carousel__arrow_right").style.display = "none";
      }
      document.querySelector(".carousel__inner").style.transform = 
        'translateX(-'+document.querySelector('.carousel__slide').offsetWidth*this.elementCount+'px)';
    });
  
    this.elem.querySelector(".carousel__arrow_left").addEventListener('click', () => {
      this.elementCount --;
      if(this.elementCount == 0){
        document.querySelector(".carousel__arrow_left").style.display = "none";
      }
    
      if(this.elementCount == this.allSlides - 1){
        document.querySelector(".carousel__arrow_right").style.display = "";
      }
        document.querySelector(".carousel__inner").style.transform = 
          'translateX(-'+document.querySelector('.carousel__slide').offsetWidth*this.elementCount+'px)';
    });

    this.elem.addEventListener('click', function(el) {
      if(el.target.tagName != "BUTTON" && !el.target.classList.contains("carousel__button")) return;
      this.dispatchEvent(new CustomEvent("product-add", {
        detail: el.target.parentElement.parentElement.getAttribute("data-id"),
        bubbles: true
      }));
    });
  }
}
