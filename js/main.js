document.addEventListener('DOMContentLoaded', () => {
  // Helper: fetch and inject component
  function loadComponent(selector, url) {
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Could not fetch ${url}`);
        return res.text();
      })
      .then(html => {
        document.querySelector(selector).innerHTML = html;
      })
      .catch(err => console.error(err));
  }
  // Hamburger menu initialization
  function initHamburger() {
    const btn = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    if (!btn || !navList) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });

    // Close menu on link click
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navList.classList.remove('show'));
    });
  }
  // Scroll to top initialization
  function initScrollToTop() {
    const scrollBtn = document.querySelector('#scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // Load header and footer, then init hamburger
  loadComponent('#header', '/components/header.html')
    .then(initHamburger);

  loadComponent('#footer', '/components/footer.html');

  // Initialize scroll-to-top button
  initScrollToTop();

});
