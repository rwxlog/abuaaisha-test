// js/main.js
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu toggle
  const btn = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');

  if (btn && navList) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });

    // Close menu on link click (mobile)
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navList.classList.remove('show'));
    });
  }

  // Share Button
  const wraps = document.querySelectorAll('.share-btn-wrap');

  wraps.forEach(wrap => {
    const btn = wrap.querySelector('.share-btn');
    const menu = wrap.querySelector('.share-menu');
    const nativeBtn = wrap.querySelector('.share-native');
    const copyBtn = wrap.querySelector('.share-copy');
    const twitter = wrap.querySelector('.share-twitter');
    const facebook = wrap.querySelector('.share-facebook');
    const linkedin = wrap.querySelector('.share-linkedin');

    const pageUrl = wrap.getAttribute('data-url') || window.location.href;
    const pageTitle = wrap.getAttribute('data-title') || document.title || '';

    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(pageTitle);

    twitter.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    function openMenu() {
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', outsideListener);
    }

    function closeMenu() {
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', outsideListener);
    }

    function outsideListener(e) {
      if (!wrap.contains(e.target)) closeMenu();
    }

    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else openMenu();
    });

    nativeBtn.addEventListener('click', async function () {
      if (navigator.share) {
        try {
          await navigator.share({ title: pageTitle, url: pageUrl });
          closeMenu();
        } catch (err) {
          console.debug('Native share canceled or failed', err);
        }
      } else {
        alert('Native sharing not supported on this browser.');
      }
    });

    copyBtn.addEventListener('click', async function () {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(pageUrl);
        } else {
          const t = document.createElement('textarea');
          t.value = pageUrl;
          t.style.position = 'absolute';
          t.style.left = '-9999px';
          document.body.appendChild(t);
          t.select();
          document.execCommand('copy');
          document.body.removeChild(t);
        }
        copyBtn.textContent = 'Link copied ✓';
        setTimeout(() => (copyBtn.textContent = 'Copy link'), 1500);
        closeMenu();
      } catch (e) {
        alert('Could not copy link.');
      }
    });

    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const first = menu.querySelector('[role=\"menuitem\"]');
        if (first) first.focus();
      }
    });

    menu.querySelectorAll('[role=\"menuitem\"]').forEach(el => (el.tabIndex = 0));
  });
});
