
console.clear()

let The_Boss = document.querySelector('main');
console.log(The_Boss)
let confirmElem = document.createElement('section');
confirmElem.classList.add('confirmedOrder');
confirmElem.innerHTML = `
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
`;
//console.log(confirmElem.outerHTML)
let confirmedOrder__btn = confirmElem.querySelector('.confirmedOrder__btn');

/* Listen for the press of the confirm Order btn */
document.querySelector('.confirm__order').addEventListener('click', () => {
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

  //confirmedOrder__btn = confirmElem.querySelector('.confirmedOrder__btn');
})

if (confirmedOrder__btn) {
  confirmedOrder__btn.addEventListener('click', ()=>{
    console.log('appear and disappear')
    localStorage.setItem('cartItems', {})
    /////Continue from here
    // fetch('scripts/data.json')
    // .then(response => response.json())
    // .then(data => {
    //   setupExtraProps(data);
    //   //localStorage.setItem('data', JSON.stringify(data));
    // });
  })
}