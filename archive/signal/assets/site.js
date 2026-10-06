// Signal — small progressive enhancements. Every page works without this file.
(function () {
  var root = document.documentElement;

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked: theme just won't persist */ }
  }

  // Theme toggle (the initial theme is set by the inline script in <head>)
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    function label() {
      btn.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    label();
    btn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      save('jk-theme', next);
      label();
    });
  });

  // Mobile menu
  var header = document.querySelector('.site-header');
  var burger = document.querySelector('.burger');
  if (header && burger) {
    var setOpen = function (open) {
      header.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', function () { setOpen(!header.classList.contains('is-open')); });
    header.querySelectorAll('.mnav a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) { setOpen(false); burger.focus(); }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function (mq) { if (mq.matches) setOpen(false); });
  }

  // Project filters
  var grid = document.querySelector('.grid');
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('[data-cat]');
  var status = document.querySelector('[data-filter-status]');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      var shown = 0;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      items.forEach(function (el) {
        var match = f === 'all' || el.dataset.cat === f;
        el.hidden = !match;
        if (match) shown++;
      });
      if (grid && f !== 'all') grid.classList.add('is-expanded');
      if (status) status.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects');
    });
  });

  var showAll = document.querySelector('.show-all');
  if (showAll && grid) {
    showAll.addEventListener('click', function () {
      grid.classList.add('is-expanded');
      var firstNew = grid.querySelectorAll('.project')[2];
      var link = firstNew && firstNew.querySelector('a');
      if (link) link.focus({ preventScroll: true });
    });
  }

  // Experience: open on wide screens, only the first open on phones
  if (window.matchMedia('(max-width: 720px)').matches) {
    document.querySelectorAll('.xp details').forEach(function (d, i) { if (i > 0) d.open = false; });
  }

  // Highlight the nav link for the section in view
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
