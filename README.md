* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f7f5f2;
  color: #1f2937;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #173d5f;
  color: white;
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.user-badge {
  background: #e7f4ea;
  color: #0f4a27;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
}

.hero {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
  align-items: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin: 0.5rem 0;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #2d6a4f;
  font-weight: 700;
}

.cta-row {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.primary-btn, .secondary-btn, .link-btn, button {
  display: inline-block;
  padding: 0.9rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.primary-btn, button {
  background: #2d6a4f;
  color: white;
}

.secondary-btn, .link-btn {
  background: #dfeef5;
  color: #173d5f;
}

.hero-card, .item-card, .item-detail-card, .auth-form, .search-form {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.page-shell, .form-shell, .item-shell {
  max-width: 1100px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.item-card {
  border: 1px solid #dfe3e8;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
}

.auth-form label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-weight: 600;
}

.auth-form input, .search-form input, .search-form select {
  padding: 0.8rem 0.9rem;
  border: 1px solid #ccd5df;
  border-radius: 8px;
}

.search-form {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.message {
  margin-top: 1rem;
  font-weight: 600;
}

.pill {
  display: inline-block;
  background: #e7f4ea;
  color: #0c6b35;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}

.detail-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

@media (max-width: 700px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .navbar {
    flex-direction: column;
    gap: 0.75rem;
  }

  .search-form {
    flex-direction: column;
    align-items: stretch;
  }
}
