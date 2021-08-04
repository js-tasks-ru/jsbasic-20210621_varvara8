/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
  this.elem = document.createElement('table');
    
  const thead = `
  <thead>
  <tr>
  <th>Имя</th>
  <th>Возраст</th>
  <th>Зарплата</th>
  <th>Город</th>
  <th></th>
  </tr>
  </thead>
  `;

  let rowsHandler = '';
  rows.forEach(function(item) {
  rowsHandler += `
    <tr>
    <td>${item.name}</td>
    <td>${item.age}</td>
    <td>${item.salary}</td>
    <td>${item.city}</td>
    <td><button>X</button></td>
    </tr>
    `;
  }, this);

  this.elem.innerHTML += thead;
  this.elem.innerHTML += rowsHandler;
  this.elem.addEventListener('click', this.deleteRow);
  }

  deleteRow(el){
    if(el.target.tagName != "BUTTON") return;
    el.target.parentElement.parentElement.remove();
  }
}
