
let dataData;
fetch('./data.json')
.then(response => response.json())
.then(data => {
  dataData = data;
  setupEventListeners(data);
});


function setupEventListeners(data) {
  // Add properties to each item object
  data.forEach((item, index) => {
    item.id = index;
    item.inCart = false;
    item.quantity = 0;
  });

  // Wait for DOM to be ready, then add listeners
  setTimeout(() => {
    const itemsElem = document.querySelectorAll('.item');

    itemsElem.forEach((itemElement, index) => {
      const item = data[index];
      const checkbox = itemElement.querySelector('.cart-checkbox');
      const addBtn = itemElement.querySelector('#add');
      const removeBtn = itemElement.querySelector('#remove');

      // Listen to checkbox (Add to Cart)
      checkbox.addEventListener('change', () => {
        itemElement.querySelector('.counter').classList.add('counter-ON')
        item.inCart = true;
        item.quantity = checkbox.checked ? 1 : 0;
        console.log(cartItems)
        // console.log(`${item.name}: inCart=${item.inCart}, quantity=${item.quantity}`);
        displayCart(item)
      });

      // Listen to increment button
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          item.inCart = true;
          if (item.inCart) {
            item.quantity++;
            itemElement.querySelector('.amount').textContent = item.quantity;
            console.log(`${item.name}: quantity=${item.quantity}`);
          }
          displayCart(item)
        });
      }

      // Listen to decrement button
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          console.log(item)
          if (item.inCart && item.quantity > 1) {
            item.quantity--;
            itemElement.querySelector('.amount').textContent = item.quantity;
            console.log(`${item.name}: quantity=${item.quantity}`);
            displayCart(item)
          } else if(item.quantity == 1) {
            item.quantity--;
            item.inCart = false;
            itemElement.querySelector('.counter').classList.remove('counter-ON')
            console.log(`${item.name}: quantity=${item.quantity}`);
            displayCart(item)
          }
        });
      }

    });
  }, 100);
}

let cartItems = [];
let cartItemTemplate = document.querySelector('template#cartItemTemplate');
let cartTemplateContent = cartItemTemplate.content;

function displayCart(item) {
  let cartHeading = document.querySelector('.cart>h2');
  let cartGrid = document.querySelector('.cart__items')
  cartGrid.innerHTML = "";
  let total = 0;

  /* If item is still in cart */
  if (item.inCart == true) {
    console.log('The item is in the cart induction process now')
    /* Check If the Item is already there in cart then update it */
      if (cartItems.some(obj=> obj.id == item.id && obj.name == item.name)) {
        cartItems[cartItems.findIndex(obj=> obj.id == item.id && obj.name == item.name)] = item
        console.log('The item was already in the cart and is now updated')
        /* Or else push it in */
      } else {
        cartItems.push(item)
        console.log('This item has been added to the cart')
      }
  }/* else if item is not in cart */
  else if (item.inCart == false) {
    /* Find it and remove it if it is in the cart */
    cartItems = cartItems.filter(obj=> obj.id !== item.id && obj.name !== item.name);
    console.log('Removing ', item.name, ' from cart')
  }


  console.log(cartItems)

  cartHeading.textContent =`Your Cart (${cartItems.length})`;
  if (cartItems.length > 0) {
    cartItems.forEach((item,index)=>{
      /* Show the cart DOM Elements */
      document.querySelector('.cart__items').classList.remove('hidden');
      document.querySelector('.cart__order').classList.remove('hidden');
      document.querySelector('.cart__tip').classList.remove('hidden');
      document.querySelector('.confirm__order').classList.remove('hidden');
      document.querySelector('.no__order').classList.remove('show');

      /* Start Cloning */
      let clone = document.importNode(cartTemplateContent, true);
      total += item.price * item.quantity;
      clone.querySelector('.cart__item').id = index;
      clone.querySelector('.cart__item').dataset.id = item.id;
      console.log(clone.querySelector('.cart__item'))
  
      clone.querySelector('h4').textContent = item.name;
      clone.querySelector('.cart__item__description__times').textContent = item.quantity + 'x';
      clone.querySelector('.cart__item__description__price').textContent = '@$' + item.price;
      clone.querySelector('.cart__item__description__times-price').textContent = '$' + (item.price * item.quantity);
      /* Setting the remove btn */
      clone.querySelector('.cart__item__remove').addEventListener('click', ()=>{

      })
      /* Setting the order-price */
      document.querySelector('.cart__order__price').textContent = '$' + total
      console.log(total)
      if (item.quantity > 0) {
        cartGrid.appendChild(clone);
      }
    });
  } else {
    document.querySelector('.cart__items').classList.add('hidden');
    document.querySelector('.cart__order').classList.add('hidden');
    document.querySelector('.cart__tip').classList.add('hidden');
    document.querySelector('.confirm__order').classList.add('hidden');
    document.querySelector('.no__order').classList.add('show');
  }
}

function removeItemFromCart(btn) {
  /** Continue from here. let the btn remove its entire item(itsparent fron the cart, from the cart dom and the checked states  of the store elements) */
  console.log(btn)
  let itemId = btn.parentNode.dataset.id;
  dataData[itemId].inCart = false;
  dataData[itemId].quantity = 0;
  displayCart(dataData);
}