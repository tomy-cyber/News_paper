async function loadArticles() {
  try {
    const res = await fetch('articles.json');
    const articles = await res.json();

    if (!articles.length) return;

    // Top story
    const hero = document.getElementById('top-story');
    const top = articles[0];
    hero.innerHTML = `
      <img src="${top.image}" alt="${top.title}">
      <div class="overlay">
        <h2>${top.title}</h2>
        <p>${top.description}</p>
      </div>
    `;

    // Remaining articles
    const container = document.getElementById('articles');
    articles.slice(1).forEach(article => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <div class="card-content">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.link}" target="_blank" rel="noopener">Read more</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load articles', err);
  }
}

function setupMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.site-nav');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

function setYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setYear();
  loadArticles();
});
