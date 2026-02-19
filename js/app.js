/**
 * AAE Guestbook · Neural web graph + detail overlay
 * Mobile-first: swipe/pan, pinch-zoom, tap node → see contributions + add yours
 */

(function () {
  const STORAGE_KEY = 'aae-guestbook-contributions';
  const { artworks, contributions: initialContributions } = window.AAE_DATA || { artworks: [], contributions: [] };

  // Persist contributions in localStorage (merge with initial)
  let contributions = loadContributions();

  function loadContributions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];
      const byId = new Map();
      initialContributions.forEach((c) => byId.set(c.id, c));
      stored.forEach((c) => byId.set(c.id, c));
      return Array.from(byId.values());
    } catch {
      return [...initialContributions];
    }
  }

  function saveContributions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contributions));
    } catch (_) {}
  }

  function getContributionsForArtwork(artworkId) {
    return contributions
      .filter((c) => c.artworkId === artworkId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function addContribution(artworkId, author, text, gameType) {
    const c = {
      id: 'c-' + Date.now(),
      artworkId,
      author: author || 'Anonymous',
      date: new Date().toISOString().slice(0, 10),
      text,
      gameType: gameType || '—',
    };
    contributions.push(c);
    saveContributions();
    return c;
  }

  // —— Graph layout: place nodes in a loose circle + edges for neural look ——
  const n = artworks.length;
  const radius = 1.2;
  const nodePositions = {};
  artworks.forEach((a, i) => {
    const angle = (2 * Math.PI * i) / n + 0.1 * Math.PI;
    nodePositions[a.id] = {
      x: radius * Math.cos(angle) + (Math.random() - 0.5) * 0.3,
      y: radius * Math.sin(angle) + (Math.random() - 0.5) * 0.3,
    };
  });

  const Graph = window.graphology;
  const Sigma = window.Sigma;
  if (!Graph || !Sigma) {
    document.getElementById('graph-container').innerHTML =
      '<p style="padding:2rem;color:#8b8685;">Failed to load graph library. Check script tags.</p>';
    return;
  }

  const graph = new Graph.Graph({ type: 'undirected' });

  const nodeColor = '#c9a227';
  artworks.forEach((a) => {
    const pos = nodePositions[a.id];
    graph.addNode(a.id, {
      label: a.title || a.id,
      x: pos.x,
      y: pos.y,
      size: 12 + getContributionsForArtwork(a.id).length * 2,
      color: nodeColor,
    });
  });

  // Edges: connect some nodes for neural-web effect (same contributor or ring)
  for (let i = 0; i < n; i++) {
    const id1 = artworks[i].id;
    const id2 = artworks[(i + 1) % n].id;
    if (!graph.hasEdge(id1, id2)) graph.addEdge(id1, id2, { size: 0.5, color: '#3d3d4a' });
  }
  graph.addEdge(artworks[0].id, artworks[2].id, { size: 0.5, color: '#3d3d4a' });
  graph.addEdge(artworks[1].id, artworks[4].id, { size: 0.5, color: '#3d3d4a' });
  graph.addEdge(artworks[3].id, artworks[6].id, { size: 0.5, color: '#3d3d4a' });

  const container = document.getElementById('graph-container');
  const sigma = new Sigma(graph, container);

  // —— Detail overlay ——
  const overlay = document.getElementById('detail-overlay');
  const closeBtn = document.getElementById('close-detail');
  const detailImage = document.getElementById('detail-image');
  const detailImageAlt = detailImage.alt;
  const connectionHint = document.getElementById('connection-hint');
  const contributionsList = document.getElementById('contributions-list');
  const form = document.getElementById('add-contribution');
  const yourName = document.getElementById('your-name');
  const yourText = document.getElementById('your-text');

  function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const months = (now - d) / (30 * 24 * 60 * 60 * 1000);
    if (months >= 1) return `${Math.round(months)} month${Math.round(months) !== 1 ? 's' : ''} ago`;
    const days = Math.round((now - d) / (24 * 60 * 60 * 1000));
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return 'Today';
  }

  function openDetail(artwork) {
    const list = getContributionsForArtwork(artwork.id);
    detailImage.src = artwork.imageUrl;
    detailImage.alt = artwork.title || 'Artwork';

    const count = list.length;
    if (count > 1) {
      connectionHint.textContent = `${count} people chose this artwork. You're not alone.`;
      connectionHint.style.display = '';
    } else if (count === 1) {
      connectionHint.textContent = '1 person chose this artwork. Add your response.';
      connectionHint.style.display = '';
    } else {
      connectionHint.textContent = 'Be the first to leave a response.';
      connectionHint.style.display = '';
    }

    contributionsList.innerHTML = '';
    if (list.length === 0) {
      contributionsList.innerHTML = '<li class="empty-contributions">No responses yet.</li>';
    } else {
      list.forEach((c) => {
        const li = document.createElement('li');
        li.innerHTML =
          `<span class="contribution-meta"><span class="game">${escapeHtml(c.gameType)}</span> · ${escapeHtml(c.author)} · ${formatDate(c.date)}</span>` +
          `<p>${escapeHtml(c.text)}</p>`;
        contributionsList.appendChild(li);
      });
    }

    form.dataset.artworkId = artwork.id;
    yourName.value = '';
    yourText.value = '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeDetail() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  sigma.on('clickNode', ({ node }) => {
    const artwork = artworks.find((a) => a.id === node);
    if (artwork) openDetail(artwork);
  });

  closeBtn.addEventListener('click', closeDetail);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDetail();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const artworkId = form.dataset.artworkId;
    if (!artworkId) return;
    const author = yourName.value.trim() || 'Anonymous';
    const text = yourText.value.trim();
    if (!text) return;

    addContribution(artworkId, author, text, '—');

    const list = getContributionsForArtwork(artworkId);
    const artwork = artworks.find((a) => a.id === artworkId);
    connectionHint.textContent = `${list.length} people chose this artwork.`;
    connectionHint.style.display = '';

    contributionsList.innerHTML = '';
    list.forEach((c) => {
      const li = document.createElement('li');
      li.innerHTML =
        `<span class="contribution-meta"><span class="game">${escapeHtml(c.gameType)}</span> · ${escapeHtml(c.author)} · ${formatDate(c.date)}</span>` +
        `<p>${escapeHtml(c.text)}</p>`;
      contributionsList.appendChild(li);
    });

    yourText.value = '';
    yourName.value = '';

    // Update node size in graph
    graph.setNodeAttribute(artworkId, 'size', 12 + list.length * 2);
    sigma.refresh();
  });

  // Keyboard: Escape closes overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeDetail();
  });
})();
