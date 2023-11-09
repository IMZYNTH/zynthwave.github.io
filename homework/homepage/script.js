const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth;
const spaceBetweenItems = 10; // Adjust the space between items as needed
const carouselItemCount = items.length;
let currentIndex = 0;
items.forEach((item, index) => {
  item.addEventListener('click', () => {
    items.forEach((item) => {
      item.classList.remove('selected');
      item.style.transform = 'scale(1)'; // Reset the scale for all items
    });
    item.classList.add('selected');
    item.style.transform = 'scale(1.1)'; // Scale the selected item by 10%
  });
});
// Set up click event listeners
items.forEach((item, index) => {
  item.addEventListener('click', () => {
    setCurrentItem(index);
  });
});


let isHovered = false;

// Set up hover event listeners
carousel.addEventListener('mouseenter', () => {
  isHovered = true;
  document.body.style.overflow = 'hidden'; // Prevent page scrolling
});

carousel.addEventListener('mouseleave', () => {
  isHovered = false;
  document.body.style.overflow = 'auto'; // Enable page scrolling
});

function setCurrentItem(index) {
  currentIndex = index;
  const middleIndex = Math.floor(carouselItemCount / 2);
  items.forEach((item, i) => {
    const itemTranslateX = (i - currentIndex) * (itemWidth + spaceBetweenItems);
    item.style.transform = `translateX(${itemTranslateX}px)`;
    item.classList.remove('selected');
  });
  items[middleIndex].classList.add('selected');
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    setCurrentItem(index);
  });
});

carousel.addEventListener('wheel', (event) => {
  if (isHovered) {
    const delta = event.deltaY;
    if (delta > 0) {
      currentIndex = (currentIndex + 1) % carouselItemCount; // Scroll down with looping
    } else {
      currentIndex = (currentIndex - 1 + carouselItemCount) % carouselItemCount; // Scroll up with looping
    }
    setCurrentItem(currentIndex);
  }
});

// Initial position
setCurrentItem(currentIndex);
