
    document.addEventListener('DOMContentLoaded', () => {
      const menuBtn = document.getElementById('menu-btn');
      const closeBtn = document.getElementById('close-btn');
      const nav = document.getElementById('nav');
      const overlay = document.getElementById('nav-overlay');
      const mq = window.matchMedia('(min-width:769px)');

      function openMenu() {
        nav.classList.add('open');
        nav.setAttribute('aria-hidden', 'false');
        menuBtn.hidden = true;
        closeBtn.hidden = false;
        overlay.hidden = false;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        menuBtn.setAttribute('aria-expanded', 'true');
      }

      function closeMenu() {
        nav.classList.remove('open');
        nav.setAttribute('aria-hidden', 'true');
        menuBtn.hidden = false;
        closeBtn.hidden = true;
        overlay.hidden = true;
        overlay.classList.remove('show');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
      }

      menuBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', closeMenu);

      // Close when a nav link is clicked (useful on mobile)
      document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', closeMenu));

      // Keep state consistent when resizing between mobile and desktop
      function handleMqChange(e) {
        if (e.matches) {
          // Desktop
          nav.classList.remove('open');
          nav.setAttribute('aria-hidden', 'false');
          menuBtn.hidden = true;
          closeBtn.hidden = true;
          overlay.hidden = true;
          document.body.style.overflow = '';
        } else {
          // Mobile
          nav.setAttribute('aria-hidden', 'true');
          menuBtn.hidden = false;
          closeBtn.hidden = true;
        }
      }

      handleMqChange(mq); // initial
      if (mq.addEventListener) mq.addEventListener('change', handleMqChange);
      else mq.addListener(handleMqChange); // fallback
    });
    
    // const testimonials = document.querySelectorAll(".testimonial");
    // const dotsContainer = document.getElementById("dots");
    // const prevBtn = document.getElementById("prev");
    // const nextBtn = document.getElementById("next");
    // let current = 0;
    // let autoSlide;

    // // Create dots dynamically
    // testimonials.forEach((_, index) => {
    //   const dot = document.createElement("button");
    //   if (index === 0) dot.classList.add("active");
    //   dot.addEventListener("click", () => {
    //     goToSlide(index);
    //   });
    //   dotsContainer.appendChild(dot);
    // });

    // const dots = dotsContainer.querySelectorAll("button");

    // function updateSlider() {
    //   testimonials.forEach((testimonial, index) => {
    //     testimonial.classList.remove("active");
    //     dots[index].classList.remove("active");
    //   });
    //   testimonials[current].classList.add("active");
    //   dots[current].classList.add("active");
    // }

    // function goToSlide(index) {
    //   current = index;
    //   updateSlider();
    //   resetAutoSlide();
    // }

    // function nextSlide() {
    //   current = (current + 1) % testimonials.length;
    //   updateSlider();
    // }

    // function prevSlide() {
    //   current = (current - 1 + testimonials.length) % testimonials.length;
    //   updateSlider();
    // }

    // function startAutoSlide() {
    //   autoSlide = setInterval(nextSlide, 5000);
    // }

    // function resetAutoSlide() {
    //   clearInterval(autoSlide);
    //   startAutoSlide();
    // }

    // // Event listeners
    // nextBtn.addEventListener("click", () => {
    //   nextSlide();
    //   resetAutoSlide();
    // });

    // prevBtn.addEventListener("click", () => {
    //   prevSlide();
    //   resetAutoSlide();
    // });

    // // Initialize
    // startAutoSlide();

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.backgroundColor = isError ? "#e74c3c" : "#2ecc71"; // red for error, green for success
  toast.className = "show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000); // Hide after 3 seconds
}

  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log('Form submitted');

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    console.log("Form", formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
     showToast(data.message);
    } catch (error) {
      console.error(error);
      alert('Error sending form data');
    }
  });




  // List of logo images
const logos = [
  "images/voltex.jpg",
  "images/ledvance.png",
  "images/map.jpg",
  "images/jotun.jpg",
  "images/rexton.jpg",
  "images/belden.png",
  "images/decoduct.jpg",
  "images/osram.png",
  "images/fischer.png",
  "images/forsroc.png",
  "images/philips.png",
  "images/abb.png",
  "images/mk-logo.png",
  "images/hp-logo.png",
  "images/lenovo.png",
  "images/apple.jpeg",
  "images/dell-logo.png",
  "images/seagate.png",
  "images/sandisk.jpg",
  "images/asus.jpg",
  "images/wd-logo.jpg",
  "images/dahua.png",
  "images/hikvision.jpg",
  "images/d-link.png",
  "images/tp-link.jpg",
  "images/unv-logo.png"
];

// Select container
const marquee = document.querySelector('.marquee');

// Create inner wrapper dynamically
const inner = document.createElement('div');
inner.className = 'marquee-inner';

// Add all logos dynamically
logos.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = src.split('/').pop().split('.')[0];
  img.loading = 'lazy';
  inner.appendChild(img);
});

// Duplicate the logos for seamless effect
inner.innerHTML += inner.innerHTML;

// Add the inner div to marquee
marquee.appendChild(inner);

// Animate marquee
let scrollX = 0;
const speed = 1.5; // Adjust speed

function animateMarquee() {
  scrollX -= speed;
  if (Math.abs(scrollX) >= inner.scrollWidth / 2) {
    scrollX = 0; // Reset for seamless loop
  }
  inner.style.transform = `translateX(${scrollX}px)`;
  requestAnimationFrame(animateMarquee);
}

animateMarquee();
