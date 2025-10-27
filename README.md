# Sartaj Tailored Indian Dresses

A beautiful, colorful fashion website for tailored Indian dresses. Built with modern HTML, CSS, and JavaScript with localStorage for cart and watchlist functionality.

## 🌐 Live Demo
Visit: [Your GitHub Pages URL]

## ✨ Features
- **Colorful Fashion Design**: Vibrant gradients, animations, and modern styling
- **Responsive Layout**: Works perfectly on desktop and mobile
- **Shopping Cart**: Add/remove items, update quantities
- **Watchlist**: Save items for later
- **Category Pages**: Browse by dress types (Lehenga, Saree Blouses, Salwar Suits)
- **Product Details**: Detailed product pages with options
- **No Backend Required**: Pure static site using localStorage

## 🚀 Quick Start (Local Development)
```bash
# Clone the repository
git clone [your-repo-url]
cd sub

# For Node.js version (with Express server)
npm install
npm run dev
# Visit http://localhost:3000

# For static version (GitHub Pages)
# Just open index.html in your browser
```

## 📁 Project Structure
```
├── index.html              # Home page
├── categories.html          # Categories listing
├── category-lehenga.html   # Lehenga category
├── product-lehenga-rose-gold.html # Product detail
├── cart.html               # Shopping cart
├── watchlist.html          # Saved items
├── static/
│   └── css/
│       └── styles.css      # Fashionable styling
├── src/                    # Node.js server files
├── views/                  # EJS templates
└── data/
    └── catalog.json       # Product data
```

## 🎨 Customization
- **Colors**: Edit CSS variables in `static/css/styles.css`
- **Products**: Modify the `products` object in each HTML file
- **Images**: Replace Unsplash URLs with your own images
- **Store Info**: Update brand name and tagline in HTML files

## 📱 GitHub Pages Deployment
1. Push your code to GitHub
2. Go to Repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be live at: `https://[username].github.io/[repo-name]`

## 💡 Features Explained
- **localStorage**: Cart and watchlist data persists across browser sessions
- **Responsive Design**: CSS Grid and Flexbox for perfect layouts
- **Modern Animations**: Floating cards, hover effects, smooth transitions
- **Colorful Theme**: Fashion-forward gradients and vibrant colors

## 🔧 Technical Details
- Pure HTML/CSS/JavaScript (no frameworks)
- localStorage for data persistence
- Responsive design with CSS Grid
- Modern CSS features (gradients, animations, backdrop-filter)
- Cross-browser compatible

## 📞 Support
For questions or customization help, please open an issue in the repository.