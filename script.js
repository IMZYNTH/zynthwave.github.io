const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
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


  updateDescription() {
    const currentIndex = this.carouselArray.findIndex(item => item.classList.contains('gallery-item-selected'));
    const descriptionItems = document.querySelectorAll('.description-item');
    const backgroundImages = [
      'url("images/dead_bg.png")', // Dead Pirates Card
      'url("images/merc_bg.png")', // Pour Bastards Card
      'url("images/setup_pic2.png")', // Zynth Card
      'url("images/pbb_bg.png")', // Real Pour Bastards Card
      'url("images/gb_bg.png")' // Art Book
    ];
  
    descriptionItems.forEach(description => {
      description.style.display = 'none'; // Hide all descriptions initially
    });
  
    if (currentIndex !== -1) {
      const selectedDescription = document.querySelector(`.description-item-${currentIndex + 1}`);
      if (selectedDescription) {
        selectedDescription.style.display = 'block'; // Show the description for the selected item
  
        // Get the wrapper container (the parent element of the gallery)
        const wrapperContainer = document.querySelector('.wrapper'); // Assuming the wrapper has the class 'wrapper'
  
        // Apply the background to the wrapper container (not the gallery)
        if (window.innerWidth >= 1080) {
          wrapperContainer.style.backgroundImage = backgroundImages[currentIndex];
          wrapperContainer.style.backgroundPosition = 'center'; // Center the background image
          wrapperContainer.style.backgroundSize = 'cover'; // Ensure the background covers the container
        } else {
          // Remove the background image on smaller screens
          wrapperContainer.style.backgroundImage = 'none';
        }
      }
    }
  }



  setCurrentState(direction) {
    if (direction.className == 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }


    this.updateGallery();
    this.updateDescription();
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

    let wheel_timeout = 0;
    let skip_wheel = false;
   
    this.carouselContainer.addEventListener('mouseenter', this.handleMouseEnter);
    this.carouselContainer.addEventListener('mouseleave', this.handleMouseLeave);
    this.carouselContainer.addEventListener('wheel', event => {
      
      // If user tries to use wheel more than once per second, skip updating carousel
      if(skip_wheel == true) return;
      
      skip_wheel = true;
      setTimeout(() => {
        skip_wheel = false;
      }, 1000);
      
      console.log(event)


      if (this.isHovered) {
        event.preventDefault();
        const direction = event.deltaY > 0 ? 'next' : 'previous';
        this.setCurrentState({ className: `gallery-controls-${direction}` });
          // Add the click event listener for image selection
   
   
   
          this.carouselContainer.addEventListener('click', event => {
      if (event.target.classList.contains('gallery-item')) {
        const selectedIndex = event.target.dataset.index;
        this.setCurrentState({ className: `gallery-controls-next` }); // You can use any control here
      }
    });
   
      }
     
    }, { passive: false });
  }


}


























const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);


exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.setupEventListeners();


 // Initial update of description
 exampleCarousel.updateDescription();


const projectDescription = document.getElementById('project-description');


galleryItems.forEach(item => {
  item.addEventListener('click', () => {
   // Prevent changing the selected item on click
    event.stopPropagation();
   
  });
});


function updateProjectDescription(selectedIndex) {
  switch (selectedIndex) {
    case '1':
      projectDescription.textContent = "This is the description for item 1.";
      break;
    case '2':
      projectDescription.textContent = "This is the description for item 2.";
      break;
    // Add more cases as needed
    case '3':
      projectDescription.textContent = "This is the description for item 3.";
      break; case '4':
      projectDescription.textContent = "This is the description for item 4.";
      break; case '5':
      projectDescription.textContent = "This is the description for item 5.";
      break;
  }
}

