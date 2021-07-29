import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = document.createElement('div');
    this.elem.classList.add("products-grid");

    const cards = products.map((product) => {
      return `<div class="card">
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
    </div>`;
  }).join('');
  this.elem.innerHTML = `<div class="products-grid__inner">
      ${cards}
    </div>`;

  this.elem.addEventListener('click', function(el) {
    if(el.target.tagName != "BUTTON" && !el.target.classList.contains("card__button")){
      if(el.target.tagName == "IMG" && el.target.parentElement.classList.contains("card__button")){
        this.dispatchEvent(new CustomEvent("product-add", {
          detail: el.target.closest("div[data-id]").getAttribute('data-id'),
          bubbles: true
    }));
  }else{
    return;
  }
}
this.dispatchEvent(new CustomEvent("product-add", {
  detail: product.id,
  bubbles: true
}));
  });
}

updateFilter(filter) {
this.filters = Object.assign(this.filters,filter);
let filteredProducts = this.products;
if(this.filters.noNuts){
filteredProducts = filteredProducts.filter((item)=>{
  if(item.nuts === undefined || item.nuts === false) return true;
});
}
if(this.filters.vegeterianOnly){
filteredProducts = filteredProducts.filter((item)=>{
  return item.vegeterian === true;
});
}
if(this.filters.maxSpiciness >= 0 && this.filters.maxSpiciness <= 4) {
filteredProducts = filteredProducts.filter((item)=> {
  return item.spiciness <= this.filters.maxSpiciness;
});
}
if(this.filters.category && this.filters.category != ""){
filteredProducts = filteredProducts.filter((item)=> {
  return item.category === this.filters.category;
});
}

let cards = filteredProducts.map((product) => {
return `<div class="card" data-id=${product.id}>
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
</div>`;
}).join('');
this.elem.querySelector('.products-grid__inner').innerHTML = cards;
}
}