// Bento — small enhancements shared by every page. Pages work without it.
(function () {
  // Mumbai clock
  var clock = document.querySelector('[data-clock]');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
    var tick = function () { clock.textContent = fmt.format(new Date()) + ' IST'; };
    tick(); setInterval(tick, 30000);
  }

  // Georgia Tech M.S. progress, Aug 2026 → Aug 2028
  var fill = document.querySelector('[data-progress]');
  if (fill) {
    var start = Date.UTC(2026, 7, 15), end = Date.UTC(2028, 7, 15);
    var pct = Math.max(2, Math.min(100, Math.round((Date.now() - start) / (end - start) * 100)));
    fill.style.width = pct + '%';
    fill.parentElement.setAttribute('aria-valuenow', pct);
  }

  // Mobile menu
  var nav = document.querySelector('.pillnav'), btn = nav && nav.querySelector('.menu-btn');
  if (btn) {
    var setOpen = function (o) {
      nav.classList.toggle('is-open', o);
      btn.setAttribute('aria-expanded', String(o));
      btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    nav.querySelectorAll('.sheet a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); } });
  }

  // Copy email
  var toast = document.querySelector('[data-toast]'), timer;
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.copy;
      if (!navigator.clipboard || !toast) { location.href = 'mailto:' + text; return; }
      navigator.clipboard.writeText(text).then(function () {
        toast.textContent = 'Email copied';
        toast.classList.add('show');
        clearTimeout(timer);
        timer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
      }, function () { location.href = 'mailto:' + text; });
    });
  });
})();
