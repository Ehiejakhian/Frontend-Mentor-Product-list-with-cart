
fetch('scripts/data.json')
.then(response => response.json())
.then(data => {
  setupExtraProps(data);
  //localStorage.setItem('data', JSON.stringify(data));
});

function setupExtraProps(data) {
  // Add properties to each item object
  data.forEach((item, index) => {
    item.id = index;
    item.inCart = false;
    item.quantity = 0;
  });
  setUpEventListeners(data)
}

function setUpEventListeners(data) {
  // Wait for DOM to be ready, then add listeners
  setTimeout(() => {
    const itemsElem = document.querySelectorAll('.item');
    itemsElem.forEach((itemElement, index) => {
      const item = data[index];
      const checkbox = itemElement.querySelector('.cart-checkbox');
      const addBtn = itemElement.querySelector('#add');
      const removeBtn = itemElement.querySelector('#remove');

      setTheButtons(itemElement, index, item, checkbox, addBtn, removeBtn, 'listen');
      localStorage.setItem('data', JSON.stringify(data));
    });
  }, 100);
}

function setTheButtons(itemElement, index, item, checkbox, addBtn, removeBtn, whatToDo) {
  if (whatToDo == 'listen') {
    // Listen to checkbox (Add to Cart)
    checkbox.addEventListener('change', () => {
      itemElement.querySelector('.counter').classList.add('counter-ON')
      item.inCart = true;
      item.quantity = 1//checkbox.checked ? 1 : 0;
      console.log(cartItems)
      console.log(`${item.name}: inCart=${item.inCart}, quantity=${item.quantity}`);
      displayCart(item)
      checkbox.parentNode.parentNode.classList.add('selected')
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
          checkbox.parentNode.parentNode.classList.remove('selected')
          displayCart(item)
        }
      });
    }
  } else if (whatToDo == 'remove') {
    itemElement.querySelector('.counter').classList.remove('counter-ON')
    item.inCart = false;
    item.quantity = 0;
    displayCart(item)
    checkbox.parentNode.parentNode.classList.remove('selected')
  } else if (whatToDo == 'display') {
    checkbox.parentNode.parentNode.classList.add('selected')
    itemElement.querySelector('.counter').classList.add('counter-ON')
    itemElement.querySelector('.amount').textContent = item.quantity;

    checkbox.addEventListener('change', () => {
      itemElement.querySelector('.counter').classList.add('counter-ON')
      item.inCart = true;
      item.quantity = 1//checkbox.checked ? 1 : 0;
      console.log(cartItems)
      console.log(`${item.name}: inCart=${item.inCart}, quantity=${item.quantity}`);
      displayCart(item)
      checkbox.parentNode.parentNode.classList.add('selected')
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
          checkbox.parentNode.parentNode.classList.remove('selected')
          displayCart(item)
        }
      });
    }
  }
}

let cartItems = [];
//Check if local storage has the cartdata already and fetch it from there
setTimeout(()=>{
  console.log(JSON.parse(localStorage.getItem('cartItems')))
  if (localStorage.getItem('cartItems')) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let DOMItemElements = document.querySelectorAll('.item');
    cartItems.forEach(item=>{
      console.log(item.id)
      const DOMElem = DOMItemElements[item.id];
      const DOMElemCheckbox = DOMElem.querySelector('.cart-checkbox');
      const DOMAddbtn = DOMElem.querySelector('#add');
      const DOMRemoveBtn = DOMElem.querySelector('#remove');
      
      setTheButtons(DOMElem, item.id, item, DOMElemCheckbox, DOMAddbtn, DOMRemoveBtn, 'display');
      displayCart(item)
    })
  }
}, 100)
let cartItemTemplate = document.querySelector('template#cartItemTemplate');
let cartTemplateContent = cartItemTemplate.content;

function displayCart(item) {
  let cartHeading = document.querySelector('.cart>h2');
  let cartGrid = document.querySelector('.cart__items')
  cartGrid.innerHTML = "";

  addOrRemoveItem__Cart(item);
  renderCartItemsOnDOM(cartHeading, cartGrid, cartItems)
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //console.log((localStorage.getItem('cartItems')));
}

function addOrRemoveItem__Cart(item) {
  /* If item is still in cart */
  if (item.inCart == true) {
    //console.log('The item is in the cart induction process now')
    /* Check If the Item is already there in cart then update it */
      if (cartItems.some(obj=> obj.id == item.id && obj.name == item.name)) {
        cartItems[cartItems.findIndex(obj=> obj.id == item.id && obj.name == item.name)] = item
        //console.log('The item was already in the cart and is now updated')
        /* Or else push it in */
      } else {
        cartItems.push(item)
        //console.log('This item has been added to the cart')
      }
  }/* else if item is not in cart */
  else if (item.inCart == false) {
    /* Find it and remove it if it is in the cart */
    cartItems = cartItems.filter(obj=> obj.id !== item.id && obj.name !== item.name);
    //console.log('Removing ', item.name, ' from cart')
  }
  return item;
}

function renderCartItemsOnDOM(cartHeading, cartGrid, cartItems) {
  let total = 0;
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
      //console.log(clone.querySelector('.cart__item'))
  
      clone.querySelector('h4').textContent = item.name;
      clone.querySelector('.cart__item__description__times').textContent = item.quantity + 'x';
      clone.querySelector('.cart__item__description__price').textContent = '@$' + item.price;
      clone.querySelector('.cart__item__description__times-price').textContent = '$' + (item.price * item.quantity);
      /* Setting the remove btn */
      clone.querySelector('.cart__item__remove').addEventListener('click', (e)=>{
        removeItemFromDOM(item);
      })
      /* Setting the order-price */
      document.querySelector('.cart__order__price').textContent = '$' + total
      //console.log(total)
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

function removeItemFromDOM(item) {
  //From the DOM
  const itemsElem = document.querySelectorAll('.item');
  let itemElement = itemsElem[item.id];
  let itemElemIndex = item.id;
  const dataItem = item;
  const checkbox = itemElement.querySelector('.cart-checkbox');
  const addBtn = itemElement.querySelector('#add');
  const removeBtn = itemElement.querySelector('#remove')

  setTheButtons(itemElement, itemElemIndex, dataItem, checkbox, addBtn, removeBtn, 'remove');
}

