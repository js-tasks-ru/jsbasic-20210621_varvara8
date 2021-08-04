import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    const currentItem;
    currentItem = this.cartItems.findIndex(() => {
      return this.cartItems.product.id == product.id;
    });
    if (currentItem !== -1) {
      this.cartItems[currentItem].count ++;
      this.onProductUpdate(currentItem);
    }else{
      this.cartItems.push({
        "product" : product,
        "count" : 1,
      })
      this.onProductUpdate(product);
    }
  }

  updateProductCount(productId, amount) {
    const currentItem;
    currentItem = this.cartItems.findIndex (() => {
      return this.product.id == productId;
    });
      if(currentItem !== -1) {
        amount > 0 ? this.cartItems[currentItem].count ++ : 
        this.cartItems[currentItem].count --;
        if(this.cartItems[currentItem].count == 0) {
          this.cartItems.splice(currentItem, 1);
        }
        this.onProductUpdate(currentItem);
      }
  }

  isEmpty() {
    if (this.cartItems.length > 0) return false;
    return true;
  }

  getTotalCount() {
    return this.cartItems.reduce(function(sum, current) {
      return sum + current.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(function(sum, current) {
      return sum + (current.count * current.product.price);
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let cardProducts = this.cartItems.map((item)=> {
      return this.renderProduct(item.product,item.count).outerHTML
    })
    .join('');
    let coreDiv = document.createElement('div');
    coreDiv.innerHTML = `
      ${cardProducts}
      ${this.renderOrderForm().outerHTML}
    `;
    this.modal.setBody(coreDiv);
    this.modal.open();
    this.modal.modal.addEventListener("click",(el)=> { 
      if(el.target.tagName !== "BUTTON" && !(el.target.classList.contains("cart-counter__button_minus") || el.target.classList.contains("cart-counter__button_plus"))){
        if(el.target.parentElement.tagName !== "BUTTON" && !(el.target.parentElement.classList.contains("cart-counter__button_minus") || el.target.parentElement.classList.contains("cart-counter__button_plus"))) return;
        let value2 = el.target.closest("div[data-product-id]").getAttribute("data-product-id");
        if(el.target.parentElement.classList.contains("cart-counter__button_minus")) {
          this.updateProductCount(value2,-1);
        }else{
          this.updateProductCount(value2,1);
        }
      }else{
        let value1 = el.target.closest("div[data-product-id]").getAttribute("data-product-id");
        if(el.target.classList.contains("cart-counter__button_minus")){
          this.updateProductCount(value1,-1);
        }else{
          this.updateProductCount(value1,1);
        }
      }
    });

    this.modal.modal.querySelector(".cart-form").addEventListener("submit",(el)=> {
      this.onSubmit(el);
    });
  }

  onProductUpdate(cartItem) {
    if(document.body.classList.contains("is-modal-open")) {
      if(!this.isEmpty()) {
        let product = this.cartItems[cartItem];
        let productId = this.cartItems[cartItem].product.id;
        let modalBody = document.querySelector('.modal__body');
  
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`).innerHTML = product.count;
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`).innerHTML = `€${(product.product.price * product.count).toFixed(2)}`;
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }else{
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector("button[type='submit']").classList.add("is-loading");
    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('.cart-form'))
    }).then(response => {
      if (response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        let newModalBody = document.createElement("div");
        newModalBody.classList.add("modal__body-inner");
        newModalBody.innerHTML = `
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        `;
        this.modal.setBody(newModalBody);
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

