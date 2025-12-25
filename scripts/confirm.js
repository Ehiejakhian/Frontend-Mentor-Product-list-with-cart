console.clear()
//import { loadData } from "/scripts/main.js";

let The_Boss = document.querySelector('main');
let confirmElem = document.createElement('section');
confirmElem.classList.add('confirmedOrder');
confirmElem.innerHTML = `
  <span class="modal-overlay"></span>
  <div class="modal-content confirmedOrder__content">
    <img src="./assets/images/icon-order-confirmed.svg" alt="icon-order-confirmed" class="confirmOrder__icon"/>
    <h1>Order Confirmed</h1>
    <p>We hope you enjoy your food!</p>
    <div class="confirmedOrder__items">
      
    </div>
    <div class="confirmedOrder__total">
      <span class="confirmedOrder__total__text">Order Total</span>
      <span class="confirmedOrder__total__price">$46.50</span>
    </div>
    <button class="confirmedOrder__btn">Start New Order</button>
  </div>
`;

/* Listen for the press of the confirm Order btn */
document.querySelector('.confirm__order').addEventListener('click', () => {
  console.log('Confirm Order Clicked');
  The_Boss.appendChild(confirmElem)
  let itemList = confirmElem.querySelector('.confirmedOrder__items');
  let cart = JSON.parse(localStorage.getItem('cartItems'));
  itemList.innerHTML = '';
  let orderTotal = 0;
  cart.forEach(item => {
    let itemElem = document.createElement('div');
    itemElem.classList.add('confirmedOrder__item');
    itemElem.innerHTML = `
      <img src="${item.image.thumbnail}" alt="${item.name}" class="thumbnail"/>
      <div class="confirmedOrder__item__description">
        <div class="confirmedOrder__item__description__name">${item.name}</div>
        <div class="confirmedOrder__item__description__times">${item.quantity}x</div>
        <div class="confirmedOrder__item__description__price">@$${item.price}</div>
      </div>
      <div class="confirmedOrder__item__timesPrice">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
    `;
    itemList.appendChild(itemElem);
    orderTotal += parseFloat(item.price) * item.quantity;
  });
  confirmElem.querySelector('.confirmedOrder__total__price').textContent = `$${orderTotal.toFixed(2)}`;
})


let startNeworder = confirmElem.querySelector('.confirmedOrder__btn');
let modalOverlay = confirmElem.querySelector('.modal-overlay');

if (startNeworder) {
  startNeworder.addEventListener('click', ()=>{
    console.log('appear and disappear');
    localStorage.removeItem('cartItems')
    /////////////////////////////////loadData();
    if (confirmElem && The_Boss.contains(confirmElem)) {
      The_Boss.removeChild(confirmElem)
    }
  })
}
if (modalOverlay) {
  ['click', 'dblclick'].forEach(evt=>{
    modalOverlay.addEventListener(evt, ()=>{
      if (confirmElem && The_Boss.contains(confirmElem)) {
        The_Boss.removeChild(confirmElem)
      }
    })
  })
}

console.log('confirm.js loaded');