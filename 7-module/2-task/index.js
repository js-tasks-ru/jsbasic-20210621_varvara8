import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add("modal");
    
    this.modal.innerHTML += `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    `;

    this.modal.querySelector(".modal__close").addEventListener('click',(el) => this.close());
    document.addEventListener("keydown",(el) => {
      if(el.code === "Escape"){
        this.close();
      }
    });
  }
  open(){
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
  }

  setTitle(title){
    this.modal.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node){
    this.modal.querySelector('.modal__body').innerHTML = node.outerHTML;
  }

  close(){
    this.modal.remove();
    document.body.classList.remove("is-modal-open");
  }
}
