
console.clear()
console.log(JSON.parse(localStorage.getItem('cartItems')))

let The_Boss = document.querySelector('main');
console.log(The_Boss)
let confirmElem = document.createElement('section');
confirmElem.classList.add('confirm')
confirmElem.innerHTML = `
  <img src="./assets/images/icon-order-confirmed.svg" alt="icon-order-confirmed" class="confirmOrder__icon"/>
  <h1>Order Confirmed</h1>
  <p>We hope you enjoy your food!</p>
  <div class="confirmedOrder__items">
    <div class="confirmedOrder__item">
      <img src="./assets/images/image-tiramisu-mobile.jpg" alt="image-tiramisu-mobile" class="mobile"/>
      <img src="./assets/images/image-tiramisu-desktop.jpg" alt="image-tiramisu-desktop" class="desktop"/>
      <div class="confirmedOrder__item__description">
        <div class="confirmedorder__item__name">Classic Tiramisu</div>
      </div>
    </div>
  </div>
`;
//The_Boss.appendChild(confirmElem)
console.log(confirmElem.outerHTML)