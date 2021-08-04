import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.elem.classList.add("card");

    this.elem.innerHTML += `
      <div class="card__top">
          <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
          <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${product.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
    `;

    this.elem.addEventListener('click', function(el) {
      if(el.target.tagName != "BUTTON" && !el.target.classList.contains("card__button"));
      this.dispatchEvent(new CustomEvent("product-add", {
        detail: product.id,
        bubbles: true
      }));
    });
  }
}
