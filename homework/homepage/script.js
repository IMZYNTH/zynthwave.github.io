const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth;

// Set the default selected index (e.g., the first item)
let currentIndex = 2;

// Function to update the selected item's styles
function setSelectedItem(index) {
  items.forEach((item) => {
    item.classList.remove('selected');
    
    item.style.transform = 'scale(0.9)'; // Reset the scale for all items
  });
  items[index].classList.add('selected');
  items[index].style.transform = 'scale(1.1)'; // Scale the selected item by 10%
}

// Set the default selected item when the page loads
setSelectedItem(currentIndex);

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    setSelectedItem(index); // Update styles when an item is clicked
  });
});



