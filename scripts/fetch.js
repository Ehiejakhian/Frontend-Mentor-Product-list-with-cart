

fetch('scripts/data.json')
.then(response => response.json())
.then(data => {
  render(data);
});

let template = document.querySelector('template#grid-elem');
let templateContent = template.content;

function render(data) {
  const gridContainer = document.querySelector('.grid');
  
  data.forEach((item, index) => {
    // Create a fresh clone for each item
    let clone = document.importNode(templateContent, true);
    
    // Set image sources
    clone.querySelector('img.mobile').src = item.image.mobile;
    clone.querySelector('img.tab').src = item.image.tablet;
    clone.querySelector('img.desktop').src = item.image.desktop;
    clone.querySelector('.cart-label').setAttribute('for', `tick__${index}`)
    clone.querySelector('.cart-checkbox').setAttribute('id', `tick__${index}`)
    
    // Set product information
    clone.querySelector('.item__description__category').textContent = item.category;
    clone.querySelector('.item__description__name').textContent = item.name;
    clone.querySelector('.item__description__price').textContent = `$${item.price.toFixed(2)}`;
    
    // Append the clone to the grid
    gridContainer.appendChild(clone);
  });
}

