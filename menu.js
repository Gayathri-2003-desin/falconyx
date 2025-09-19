
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



