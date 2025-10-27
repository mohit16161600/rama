# Sartaj Tailored Indian Dresses (Session-based Catalog)

A simple product catalog for tailored Indian dresses built with Node.js, Express, EJS, and session-based cart and watchlist. No login/registration. All customer actions are stored temporarily in their session.

## Features
- Elegant home page with hero, categories, and featured items
- Category listing and product detail pages
- Session-based cart (add, update quantity, remove)
- Session-based watchlist (toggle add/remove)
- JSON catalog for easy updates (no database needed)

## Quick Start
```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Project Structure
```
- src/server.js          # Express app and routes
- data/catalog.json      # Store, categories, products
- views/                 # EJS templates
  - partials/layout.ejs  # Page layout and header/footer
  - pages/               # Page content blocks
- public/css/styles.css  # Minimal styles
```

## Managing Your Store
- Edit `data/catalog.json` to add or update categories/products
  - `categories[]`: id, name, heroImage, description
  - `products[]`: id, categoryId, name, price, images[], description, options{...}
- Put your images in `public/img/` and reference as `/img/your-file.jpg`
- Update `store.name`, `store.tagline`, `store.currency`

## Scripts
- `npm start`: run server
- `npm run dev`: run with nodemon for auto-reload

## Notes
- All cart/watchlist data is stored in-memory per session and resets after a while or when the server restarts.
- This is a starter you can customize further (SEO, forms, measurement intake, etc.).
