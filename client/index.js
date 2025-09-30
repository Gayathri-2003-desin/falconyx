
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