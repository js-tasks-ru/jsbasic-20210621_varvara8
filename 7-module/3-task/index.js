export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.classList.add("slider"); 
    let elements = ""; 

  for(let i = 0; i <= steps-1; i++) {
    if(i === value) {
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

  this.elem.addEventListener('click',(el) => {
    const left = el.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const approximateValue = leftRelative * (steps - 1);
    const value = Math.round(approximateValue);
    const valuePercents = value / (steps - 1) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    this.elem.querySelector(".slider__steps").children[value].classList.add("slider__step-active");
    this.elem.querySelector(".slider__value").innerHTML = value;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
    );
  });
  }
}
