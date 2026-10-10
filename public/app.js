const SAMPLE_ITEMS = [
  { _id: '1', name: 'Desk Lamp', category: 'Furniture', description: 'A working desk lamp for home office use.' },
  { _id: '2', name: 'Water Bottle', category: 'Kitchen', description: 'Reusable stainless water bottle.' },
  { _id: '3', name: 'Running Shoes', category: 'Clothing', description: 'Slightly used shoes, size 8.' },
  { _id: '4', name: 'Laptop Stand', category: 'Electronics', description: 'Portable aluminum laptop stand.' },
  { _id: '5', name: 'Board Game', category: 'Entertainment', description: 'Family-friendly strategy board game.' },
  { _id: '6', name: 'Backpack', category: 'School Supplies', description: 'Blue backpack with multiple pockets.' },
  { _id: '7', name: 'Cookware Set', category: 'Kitchen', description: 'Complete beginner cookware set.' },
  { _id: '8', name: 'Winter Jacket', category: 'Clothing', description: 'Warm insulated jacket in good condition.' },
  { _id: '9', name: 'Bicycle', category: 'Transportation', description: 'A city bike with a basket.' },
  { _id: '10', name: 'Monitor', category: 'Electronics', description: '27-inch monitor with HDMI connection.' },
  { _id: '11', name: 'Bookshelf', category: 'Furniture', description: 'Wood bookshelf with three shelves.' },
  { _id: '12', name: 'Tent', category: 'Outdoor', description: 'Two-person hiking tent.' },
  { _id: '13', name: 'Desk Chair', category: 'Furniture', description: 'Ergonomic desk chair.' },
  { _id: '14', name: 'Microwave', category: 'Kitchen', description: 'Compact microwave oven.' },
  { _id: '15', name: 'Study Lamp', category: 'School Supplies', description: 'LED desk lamp with adjustable brightness.' },
  { _id: '16', name: 'Yoga Mat', category: 'Health', description: 'Non-slip exercise mat.' }
];

function renderUserBadge() {
  const badge = document.getElementById('userBadge');
  if (!badge) return;
  const username = localStorage.getItem('secondChanceUser');
  badge.textContent = username ? `Hi, ${username}` : 'Guest';
}

async function loadItems() {
  const grid = document.getElementById('itemsGrid');
  if (!grid) return;

  try {
    const response = await fetch('/api/secondchance/items');
    const items = response.ok ? await response.json() : SAMPLE_ITEMS;
    grid.innerHTML = items.map((item) => `
      <article class="item-card">
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category || 'General'}</p>
        <p>${item.description || 'No description provided.'}</p>
        <a href="/item?id=${item._id}" class="link-btn">View Details</a>
      </article>
    `).join('');
  } catch (error) {
    grid.innerHTML = SAMPLE_ITEMS.map((item) => `
      <article class="item-card">
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p>${item.description}</p>
        <a href="/item?id=${item._id}" class="link-btn">View Details</a>
      </article>
    `).join('');
  }
}

async function loadItemDetails() {
  const container = document.getElementById('itemDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id') || '1';

  try {
    const response = await fetch(`/api/secondchance/items/${itemId}`);
    const item = response.ok ? await response.json() : SAMPLE_ITEMS.find((entry) => String(entry._id) === String(itemId)) || SAMPLE_ITEMS[0];

    container.innerHTML = `
      <div class="detail-hero">
        <h1>${item.name}</h1>
        <span class="pill">${item.category || 'General'}</span>
      </div>
      <p>${item.description || 'No description available.'}</p>
      <p><strong>Availability:</strong> Available to the community</p>
      <p><strong>Location:</strong> Community Resource Center</p>
      <a href="/main" class="primary-btn">Back to listings</a>
    `;
  } catch (error) {
    const item = SAMPLE_ITEMS[0];
    container.innerHTML = `
      <div class="detail-hero">
        <h1>${item.name}</h1>
        <span class="pill">${item.category}</span>
      </div>
      <p>${item.description}</p>
      <p><strong>Availability:</strong> Available to the community</p>
      <p><strong>Location:</strong> Community Resource Center</p>
      <a href="/main" class="primary-btn">Back to listings</a>
    `;
  }
}

function bindRegisterForm() {
  const form = document.getElementById('registerForm');
  const message = document.getElementById('registerMessage');
  if (!form || !message) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const response = await fetch('/api/secondchance/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    message.textContent = result.message || 'Registration complete.';
    message.style.color = response.ok ? '#0c6b35' : '#9b1c1c';
  });
}

function bindLoginForm() {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');
  if (!form || !message) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const response = await fetch('/api/secondchance/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('secondChanceUser', result.user.username);
      renderUserBadge();
      message.textContent = 'Login successful!';
      message.style.color = '#0c6b35';
      setTimeout(() => window.location.href = '/main', 600);
    } else {
      message.textContent = result.message || 'Login failed.';
      message.style.color = '#9b1c1c';
    }
  });
}

function bindSearchForm() {
  const form = document.getElementById('searchForm');
  const results = document.getElementById('searchResults');
  if (!form || !results) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.trim();
    const category = document.getElementById('searchCategory').value;

    const url = `/api/secondchance/search?${new URLSearchParams({ q: query, category }).toString()}`;
    const response = await fetch(url);
    const items = response.ok ? await response.json() : SAMPLE_ITEMS.filter((item) => {
      const matchesQuery = !query || item.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || item.category === category;
      return matchesQuery && matchesCategory;
    });

    results.innerHTML = items.map((item) => `
      <article class="item-card">
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p>${item.description}</p>
        <a href="/item?id=${item._id}" class="link-btn">View Details</a>
      </article>
    `).join('');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderUserBadge();
});
