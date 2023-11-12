const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['', ''];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
    this.isHovered = false;

    // Bind the event handlers to the class instance
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(direction) {
    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }

    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
        
      });
    });
  }

  handleMouseEnter() {
    this.isHovered = true;
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
  }

  handleMouseLeave() {
    this.isHovered = false;
    document.body.style.overflow = 'auto'; // Enable page scrolling
  }

  setupEventListeners() {
    this.carouselContainer.addEventListener('mouseenter', this.handleMouseEnter);
    this.carouselContainer.addEventListener('mouseleave', this.handleMouseLeave);

    document.addEventListener('wheel', event => {
      if (this.isHovered) {
        event.preventDefault();
        const direction = event.deltaY > 0 ? 'next' : 'previous';
        this.setCurrentState({ className: `gallery-controls-${direction}` });
      }
    });
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.setupEventListeners();


