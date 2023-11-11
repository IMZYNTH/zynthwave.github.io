const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentIndex = 2;

function setSelectedItem(index) {
  const middleIndex = Math.floor(items.length / 2);
  const distanceFromMiddle = index - middleIndex;

  items.forEach((item, i) => {
    const distance = i - distanceFromMiddle;
    const spacing = 0;
    const translateX = distance * (100 + spacing);
    const scale = i === index ? 1.1 : 0.9;

    item.style.transform = `translateX(${translateX}%) scale(${scale})`;

    if (i === index) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });

  currentIndex = index;
}

function updateCarousel() {
  const itemCount = items.length;
  currentIndex = (currentIndex + itemCount) % itemCount;
  setSelectedItem(currentIndex);
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

carousel.addEventListener('wheel', (event) => {
  event.preventDefault();
  currentIndex += event.deltaY > 0 ? 1 : -1;
  updateCarousel();
});

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Initial setup
setSelectedItem(currentIndex);

// Center the carousel initially
const containerWidth = carousel.offsetWidth;
const totalWidth = containerWidth * items.length;
const initialTranslateX = (containerWidth - totalWidth) ;
carousel.style.transform = `translateX(${initialTranslateX}px)`;
