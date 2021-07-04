const calculator = {
  read(one, two) {
    this.a = one;
    this.b = two;
  },

  sum() {
    return this.a + this.b;
  },
    
  mul() {
    return this.a * this.b;
  }
};



// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
