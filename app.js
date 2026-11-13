(function () {
  var grid = document.getElementById('grid');
  var filtersEl = document.getElementById('filters');
  var statusEl = document.getElementById('results-status');
  var modal = document.getElementById('modal');
  var modalBody = modal.querySelector('.modal-body');
  var modalContent = document.getElementById('modal-content');
  var pageRegions = document.querySelectorAll('.skip-link, .site-header, main');
  var activeGenre = 'All';
  var lastFocused = null;

  var isArchivePage = window.location.pathname.includes('archive.html');

  // New releases first, then by box office rank.
  function sortKey(m) {
    var n = parseInt(String(m.status).replace(/[^0-9]/g, ''), 10);
    return /^Opens/.test(m.status) ? 0 : (isNaN(n) ? 999 : n);
  }
  MOVIES.sort(function (a, b) { return sortKey(a) - sortKey(b); });

  if (document.getElementById('updated')) {
    document.getElementById('updated').textContent =
      'Updated ' + SITE.updated + ' · Box office through the ' + SITE.boxOfficeWeekend + ' weekend';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Star glyphs are hidden from screen readers; the visually hidden text says the rating in words.
  function stars(n) {
    var full = Math.floor(n), half = n - full >= 0.5;
    var glyphs = '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
    return '<span aria-hidden="true">' + glyphs + '</span>' +
      '<span class="visually-hidden">Rated ' + n + ' out of 5 stars</span>';
  }

  function verdictClass(n) {
    return n >= 3.5 ? 'v-good' : n >= 2.5 ? 'v-mixed' : 'v-bad';
  }

  function verdictLabel(n) {
    return n >= 4 ? 'Flick it' : n >= 3.5 ? 'Worth it' : n >= 2.5 ? 'Maybe' : 'Skip it';
  }

  function scoreChips(m) {
    var out = [];
    if (m.scores.rt) out.push('<li class="score"><abbr title="Rotten Tomatoes">RT</abbr> <b>' + esc(m.scores.rt) + '</b></li>');
    if (m.scores.metacritic) out.push('<li class="score">Metacritic <b>' + esc(m.scores.metacritic) + '</b></li>');
    if (m.scores.cinemascore) out.push('<li class="score">CinemaScore <b>' + esc(m.scores.cinemascore) + '</b></li>');
    if (m.scores.audience) out.push('<li class="score">Audience <b>' + esc(m.scores.audience) + '</b></li>');
    return out.length ? '<ul class="scores" aria-label="Scores">' + out.join('') + '</ul>' : '';
  }

  function pageMovies() {
    return MOVIES.filter(function (m) { return isArchivePage ? m.archived : !m.archived; });
  }

  function renderFilters() {
    var genres = ['All'];
    pageMovies().forEach(function (m) {
      m.genres.forEach(function (g) { if (genres.indexOf(g) === -1) genres.push(g); });
    });

    filtersEl.innerHTML = genres.map(function (g) {
      var on = g === activeGenre;
      return '<button type="button" class="filter' + (on ? ' active' : '') + '" data-genre="' + esc(g) +
        '" aria-pressed="' + on + '">' + esc(g) + '</button>';
    }).join('');
  }

  // Update the pressed state in place so keyboard focus stays on the button that was activated.
  function syncFilters() {
    var buttons = filtersEl.querySelectorAll('.filter');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-genre') === activeGenre;
      buttons[i].classList.toggle('active', on);
      buttons[i].setAttribute('aria-pressed', String(on));
    }
  }

  function renderGrid() {
    var list = pageMovies().filter(function (m) {
      return activeGenre === 'All' || m.genres.indexOf(activeGenre) !== -1;
    });
    grid.innerHTML = list.map(function (m) {
      return '<li class="card">' +
        '<article aria-labelledby="card-title-' + esc(m.id) + '">' +
        '<div class="card-poster" style="background:' + m.color + '">' +
          (m.poster ? '<img src="' + esc(m.poster) + '" alt="' + esc(m.title) + ' poster" loading="lazy">' : '') +
          '<span class="rank">' + esc(m.status) + '</span>' +
          '<span class="verdict-pill ' + verdictClass(m.rating) + '">' +
            '<span class="visually-hidden">Verdict: </span>' + verdictLabel(m.rating) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<h2 id="card-title-' + esc(m.id) + '">' +
            '<button type="button" class="card-link" data-id="' + esc(m.id) + '" aria-haspopup="dialog">' +
              esc(m.title) + '<span class="visually-hidden"> - read the review</span>' +
            '</button>' +
          '</h2>' +
          '<p class="meta">' + esc(m.mpaa) + ' · ' + esc(m.runtime) + ' · ' + esc(m.genres.join(', ')) + '</p>' +
          '<p class="stars">' + stars(m.rating) + '</p>' +
          '<p class="headline">' + esc(m.headline) + '</p>' +
          scoreChips(m) +
        '</div>' +
        '</article>' +
      '</li>';
    }).join('');
    return list.length;
  }

  function focusableIn(el) {
    return Array.prototype.filter.call(
      el.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (n) { return n.offsetParent !== null; }
    );
  }

  // While the dialog is open, hide the page behind it from screen readers and keyboard focus.
  function setBackgroundInert(on) {
    for (var i = 0; i < pageRegions.length; i++) {
      if (on) {
        pageRegions[i].setAttribute('aria-hidden', 'true');
        pageRegions[i].inert = true;
      } else {
        pageRegions[i].removeAttribute('aria-hidden');
        pageRegions[i].inert = false;
      }
    }
  }

  function openReview(id) {
    var m = MOVIES.find(function (x) { return x.id === id; });
    if (!m) return;
    modalContent.innerHTML =
      '<div class="review-banner" style="background:' + m.color + '">' +
        (m.poster ? '<img class="review-poster" src="' + esc(m.poster) + '" alt="' + esc(m.title) + ' poster">' : '') +
        '<div class="review-info">' +
          '<p class="rank-inline">' + esc(m.status) + '</p>' +
          '<h2 id="modal-title" tabindex="-1">' + esc(m.title) + '</h2>' +
          '<p class="meta review-meta">' + esc(m.mpaa) + ' · ' + esc(m.runtime) + ' · Directed by ' + esc(m.director) + '</p>' +
          '<p class="stars">' + stars(m.rating) + '</p>' +
          '<p class="review-verdict"><span class="verdict-pill ' + verdictClass(m.rating) + '">' +
            '<span class="visually-hidden">Verdict: </span>' + verdictLabel(m.rating) + '</span></p>' +
        '</div>' +
      '</div>' +
      '<div class="review-content">' +
        '<p class="headline review-headline">' + esc(m.headline) + '</p>' +
        m.review.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        '<h3>Bottom line</h3><p class="bottom-line">' + esc(m.bottomLine) + '</p>' +
        '<h3>The scores</h3>' + scoreChips(m) +
        '<h3>The details</h3><dl class="facts">' +
          '<dt>Director</dt><dd>' + esc(m.director) + '</dd>' +
          '<dt>Starring</dt><dd>' + esc(m.cast.join(', ')) + '</dd>' +
          (m.studio ? '<dt>Studio</dt><dd>' + esc(m.studio) + '</dd>' : '') +
          '<dt>Box office</dt><dd>' + esc(m.boxOffice) + '</dd>' +
        '</dl>' +
      '</div>';
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setBackgroundInert(true);
    modal.scrollTop = 0;
    document.getElementById('modal-title').focus();
  }

  function closeReview() {
    modal.hidden = true;
    document.body.style.overflow = '';
    setBackgroundInert(false);
    if (lastFocused && document.body.contains(lastFocused)) lastFocused.focus();
    lastFocused = null;
  }

  filtersEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter');
    if (!btn) return;
    activeGenre = btn.getAttribute('data-genre');
    syncFilters();
    var count = renderGrid();
    statusEl.textContent = 'Showing ' + count + ' ' + (count === 1 ? 'review' : 'reviews') +
      (activeGenre === 'All' ? '' : ' in ' + activeGenre) + '.';
  });

  // The whole card is clickable for mouse users; keyboard and screen reader users get the title button.
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (!card) return;
    var btn = card.querySelector('.card-link');
    openReview(btn.getAttribute('data-id'));
    lastFocused = btn; // return focus to the card's button when the dialog closes
  });

  // The focus ring outlines the whole card, so scroll the whole card into view (scroll-padding keeps it clear of the sticky header).
  // If the card is taller than the space left, align its top under the header so the header never covers it.
  var header = document.querySelector('.site-header');
  grid.addEventListener('focusin', function (e) {
    var card = e.target.closest('.card');
    if (!card || !card.scrollIntoView) return;
    var top = getComputedStyle(header).position === 'sticky' ? header.getBoundingClientRect().bottom : 0;
    var r = card.getBoundingClientRect();
    if (r.top < top || r.bottom > window.innerHeight) {
      card.scrollIntoView({ block: r.height > window.innerHeight - top ? 'start' : 'nearest' });
    }
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeReview();
  });

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') {
      closeReview();
      return;
    }
    // Keep Tab inside the dialog while it is open.
    if (e.key === 'Tab') {
      var items = focusableIn(modalBody);
      if (!items.length) { e.preventDefault(); return; }
      var first = items[0], last = items[items.length - 1];
      var active = document.activeElement;
      if (!modalBody.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active.id === 'modal-title')) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  renderFilters();
  renderGrid();
})();
