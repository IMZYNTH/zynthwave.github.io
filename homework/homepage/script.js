const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 2;
let startX;

function setSelectedItem(index) {
  items.forEach((item) => {
    item.classList.remove('selected');
    item.style.transform = 'scale(0.9)';
  });
  items[index].classList.add('selected');
  items[index].style.transform = 'scale(1.1)';
}

function handleSwipeStart(event) {
  startX = event.touches[0].clientX;
}

function handleSwipeMove(event) {
  event.preventDefault();
}

function handleSwipeEnd(event) {
  const endX = event.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX > 50) {
    // Swipe right, go to the previous item
    currentIndex = Math.max(0, currentIndex - 1);
  } else if (deltaX < -50) {
    // Swipe left, go to the next item
    currentIndex = Math.min(items.length - 1, currentIndex + 1);
  }

  setSelectedItem(currentIndex);
}

function handleMouseWheel(event) {
  event.preventDefault();
  currentIndex += event.deltaY > 0 ? 1 : -1;

  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  }

  if (currentIndex >= items.length) {
    currentIndex = 0;
  }

  setSelectedItem(currentIndex);
}

carousel.addEventListener('touchstart', handleSwipeStart);
carousel.addEventListener('touchmove', handleSwipeMove);
carousel.addEventListener('touchend', handleSwipeEnd);

carousel.addEventListener('wheel', handleMouseWheel);

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    setSelectedItem(index);
  });
});

// Set the default selected item when the page loads
setSelectedItem(currentIndex);
