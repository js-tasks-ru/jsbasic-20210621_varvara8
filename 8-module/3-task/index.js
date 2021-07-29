export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    const currentItem;
    debugger;
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
    debugger;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

