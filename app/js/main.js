const trends = new Swiper('.trends__sliders', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    spaceBetween: 32,
    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 32
          },
        990: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        599: {
            slidesPerView: 2
          },
        450: {
        slidesPerView: 1.5
        },
        320: {
            slidesPerView: 1.2
        }
        
      },
    
  });

  document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.trends__block_img-favorites img');
    const counterElement = document.querySelector('.nav__block_item-number');
    const navItem = document.querySelector('.nav__block_item-favorites');
    let activeCount = 0;

    function updateCounter() {
        if (activeCount > 0) {
            counterElement.textContent = activeCount;
            counterElement.classList.remove('hidden');
            navItem.classList.remove('hidden');
        } else {
            counterElement.textContent = '';
            counterElement.classList.add('hidden');
            navItem.classList.add('hidden');
        }
    }

    // Set initial filter for all boxes and add click event listeners
    boxes.forEach(function(box) {
        // Set initial filter style
        box.style.filter = 'grayscale(1) brightness(1)';

        box.addEventListener('click', function() {
            console.log('Box clicked');
            if (box.style.filter === 'grayscale(1) brightness(1)') {
                box.style.filter = 'grayscale(0) brightness(1)';
                activeCount++;
            } else {
                box.style.filter = 'grayscale(1) brightness(1)';
                if (activeCount > 0) {
                    activeCount--;
                }
            }
            updateCounter();
        });
    });

    updateCounter();
});

  document.addEventListener('DOMContentLoaded', function() {
    var menuButtons = document.querySelectorAll('.nav__menu_open');
    var header = document.querySelector('.header');
    var body = document.body;

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            header.classList.toggle('open'); 
            body.classList.toggle('open-menu');
        });
    });
});