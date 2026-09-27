(function () {
  var grid = document.getElementById('grid');
  var filtersEl = document.getElementById('filters');
  var modal = document.getElementById('modal');
  var modalContent = document.getElementById('modal-content');
  var activeGenre = 'All';

  // New releases first, then by box office rank.
  function sortKey(m) {
    var n = parseInt(String(m.status).replace(/[^0-9]/g, ''), 10);
    return /^Opens/.test(m.status) ? 0 : (isNaN(n) ? 999 : n);
  }
  MOVIES.sort(function (a, b) { return sortKey(a) - sortKey(b); });

  document.getElementById('updated').textContent =
    'Updated ' + SITE.updated + ' · Box office through the ' + SITE.boxOfficeWeekend + ' weekend';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function stars(n) {
    var full = Math.floor(n), half = n - full >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
  }

  function verdictClass(n) {
    return n >= 3.5 ? 'v-good' : n >= 2.5 ? 'v-mixed' : 'v-bad';
  }

  function verdictLabel(n) {
    return n >= 4 ? 'See it' : n >= 3.5 ? 'Worth it' : n >= 2.5 ? 'Maybe' : 'Skip it';
  }

  function scoreChips(m) {
    var out = [];
    if (m.scores.rt) out.push('<span class="score">RT <b>' + esc(m.scores.rt) + '</b></span>');
    if (m.scores.metacritic) out.push('<span class="score">Metacritic <b>' + esc(m.scores.metacritic) + '</b></span>');
    if (m.scores.cinemascore) out.push('<span class="score">CinemaScore <b>' + esc(m.scores.cinemascore) + '</b></span>');
    if (m.scores.audience) out.push('<span class="score">Audience <b>' + esc(m.scores.audience) + '</b></span>');
    return out.join('');
  }

  function renderFilters() {
    var genres = ['All'];
    MOVIES.forEach(function (m) {
      m.genres.forEach(function (g) { if (genres.indexOf(g) === -1) genres.push(g); });
    });
    filtersEl.innerHTML = genres.map(function (g) {
      return '<button class="filter' + (g === activeGenre ? ' active' : '') + '" data-genre="' + esc(g) + '">' + esc(g) + '</button>';
    }).join('');
  }

  function renderGrid() {
    var list = MOVIES.filter(function (m) {
      return activeGenre === 'All' || m.genres.indexOf(activeGenre) !== -1;
    });
    grid.innerHTML = list.map(function (m) {
      return '<article class="card" data-id="' + esc(m.id) + '">' +
        '<div class="card-poster" style="background:' + m.color + '">' +
          (m.poster ? '<img src="' + esc(m.poster) + '" alt="' + esc(m.title) + ' poster" loading="lazy">' : '') +
          '<span class="rank">' + esc(m.status) + '</span>' +
          '<span class="verdict-pill ' + verdictClass(m.rating) + '">' + verdictLabel(m.rating) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<h2>' + esc(m.title) + '</h2>' +
          '<p class="meta">' + esc(m.mpaa) + ' · ' + esc(m.runtime) + ' · ' + esc(m.genres.join(', ')) + '</p>' +
          '<p class="stars" aria-label="' + m.rating + ' out of 5">' + stars(m.rating) + '</p>' +
          '<p class="headline">' + esc(m.headline) + '</p>' +
          '<div class="scores">' + scoreChips(m) + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function openReview(id) {
    var m = MOVIES.filter(function (x) { return x.id === id; })[0];
    if (!m) return;
    modalContent.innerHTML =
      '<div class="review-banner" style="background:' + m.color + '">' +
        (m.poster ? '<img class="review-poster" src="' + esc(m.poster) + '" alt="' + esc(m.title) + ' poster">' : '') +
        '<div>' +
          '<p class="rank-inline">' + esc(m.status) + '</p>' +
          '<h2 id="modal-title">' + esc(m.title) + '</h2>' +
          '<p class="meta" style="color:#ddd">' + esc(m.mpaa) + ' · ' + esc(m.runtime) + ' · Directed by ' + esc(m.director) + '</p>' +
          '<p class="stars">' + stars(m.rating) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="review-content">' +
        '<p class="headline" style="font-size:1.2rem">' + esc(m.headline) + '</p>' +
        m.review.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        '<h3>Bottom line</h3><div class="bottom-line">' + esc(m.bottomLine) + '</div>' +
        '<h3>The scores</h3><div class="scores">' + scoreChips(m) + '</div>' +
        '<h3>The details</h3><dl class="facts">' +
          '<dt>Director</dt><dd>' + esc(m.director) + '</dd>' +
          '<dt>Starring</dt><dd>' + esc(m.cast.join(', ')) + '</dd>' +
          (m.studio ? '<dt>Studio</dt><dd>' + esc(m.studio) + '</dd>' : '') +
          '<dt>Box office</dt><dd>' + esc(m.boxOffice) + '</dd>' +
        '</dl>' +
      '</div>';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeReview() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  filtersEl.addEventListener('click', function (e) {
    var g = e.target.getAttribute('data-genre');
    if (!g) return;
    activeGenre = g;
    renderFilters();
    renderGrid();
  });

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (card) openReview(card.getAttribute('data-id'));
  });

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) closeReview();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeReview();
  });

  renderFilters();
  renderGrid();
})();
