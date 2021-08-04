export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.elem = document.createElement('div');
    this.elem.classList.add("slider"); 
    let elements = ""; 

  for(let i = 0; i <= steps-1; i++) {
    if(i == value) {
      elements += '<span class="slider__step-active"></span>';
    }else{
      elements += '<span></span>';
    }
  }
  this.elem.innerHTML += `
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${elements}
      </div>
  `;

  this.thumb = this.elem.querySelector('.slider__thumb');
  this.progress = this.elem.querySelector('.slider__progress');

  this.thumb.ondragstart = () => {
    return false;
  }
  
  this.thumb.onpointerdown = (event) => {
    this.shiftX = event.clientX - this.thumb.getBoundingClientRect().left;
    document.addEventListener('pointermove',this.onMouseMove);
    document.addEventListener('pointerup', this.onMouseUp);
  };

  this.elem.addEventListener('click',(el)=>{
    const left = el.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const approximateValue = leftRelative * (steps - 1);
    const value = Math.round(approximateValue);
    const valuePercents = value / (steps - 1) * 100;

    this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    this.elem.querySelector(".slider__steps").children[value].classList.add("slider__step-active");
    this.elem.querySelector(".slider__value").innerHTML = value;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
    );
  });
  }

  onMouseMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    
    if (leftRelative < 0) {
      leftRelative = false;
    }
    
    if (leftRelative > 1) {
      leftRelative = true;
    }
    
    const leftPercents = leftRelative * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);

    this.elem.classList.add("slider_dragging");
    this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    this.elem.querySelector(".slider__steps").children[value].classList.add("slider__step-active");
    this.elem.querySelector(".slider__value").innerHTML = value;
  }

  onMouseUp = () => {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: +this.elem.querySelector('.slider__value').innerHTML,
        bubbles: true
      })
    );

    this.elem.classList.remove("slider_dragging");
    document.removeEventListener('pointerup', this.onMouseUp);
    document.removeEventListener('pointermove', this.onMouseMove);
  }
}
