const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: 'tailored-indian-dresses-secret',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 6 }, // 6 hours
	})
);

// Initialize session containers
app.use((req, _res, next) => {
	if (!req.session.cart) req.session.cart = [];
	if (!req.session.watchlist) req.session.watchlist = [];
	next();
});

// Static
app.use(express.static(path.join(__dirname, '..', 'public')));

// Load catalog data
const catalog = require(path.join(__dirname, '..', 'data', 'catalog.json'));
app.locals.store = catalog.store;
app.locals.categories = catalog.categories;
app.locals.products = catalog.products;

// Helpers
function findProduct(productId) {
	return catalog.products.find(p => p.id === productId);
}
function productsByCategory(categoryId) {
	return catalog.products.filter(p => p.categoryId === categoryId);
}

// Routes
app.get('/', (req, res) => {
	const featuredCategories = catalog.categories;
	const featuredProducts = catalog.products.slice(0, 6);
	res.render('pages/home', {
		title: 'Home',
		session: req.session,
		featuredCategories,
		featuredProducts,
	});
});

app.get('/categories', (req, res) => {
	res.render('pages/categories', {
		title: 'Categories',
		session: req.session,
		categories: catalog.categories,
	});
});

app.get('/category/:id', (req, res) => {
	const category = catalog.categories.find(c => c.id === req.params.id);
	if (!category) return res.status(404).render('pages/404', { title: 'Not found', session: req.session });
	const items = productsByCategory(category.id);
	res.render('pages/category', {
		title: category.name,
		session: req.session,
		category,
		items,
	});
});

app.get('/product/:id', (req, res) => {
	const product = findProduct(req.params.id);
	if (!product) return res.status(404).render('pages/404', { title: 'Not found', session: req.session });
	res.render('pages/product', { title: product.name, session: req.session, product });
});

// Cart
app.get('/cart', (req, res) => {
	const cartItems = req.session.cart.map(ci => ({ ...ci, product: findProduct(ci.productId) }));
	const subtotal = cartItems.reduce((sum, ci) => sum + (ci.product?.price || 0) * ci.qty, 0);
	res.render('pages/cart', { title: 'Your Cart', session: req.session, cartItems, subtotal });
});

app.post('/cart/add', (req, res) => {
	const { productId, qty } = req.body;
	const product = findProduct(productId);
	if (!product) return res.status(400).json({ ok: false, message: 'Invalid product' });
	const quantity = Math.max(1, parseInt(qty || '1', 10));
	const existing = req.session.cart.find(ci => ci.productId === productId);
	if (existing) existing.qty += quantity; else req.session.cart.push({ productId, qty: quantity });
	res.json({ ok: true, cartCount: req.session.cart.reduce((n, ci) => n + ci.qty, 0) });
});

app.post('/cart/update', (req, res) => {
	const { productId, qty } = req.body;
	const quantity = Math.max(0, parseInt(qty || '1', 10));
	req.session.cart = req.session.cart.filter(ci => ci.productId !== productId).concat(quantity > 0 ? [{ productId, qty: quantity }] : []);
	res.json({ ok: true });
});

app.post('/cart/remove', (req, res) => {
	const { productId } = req.body;
	req.session.cart = req.session.cart.filter(ci => ci.productId !== productId);
	res.json({ ok: true });
});

// Watchlist
app.get('/watchlist', (req, res) => {
	const items = req.session.watchlist.map(pid => findProduct(pid)).filter(Boolean);
	res.render('pages/watchlist', { title: 'Your Watchlist', session: req.session, items });
});

app.post('/watchlist/toggle', (req, res) => {
	const { productId } = req.body;
	const exists = req.session.watchlist.includes(productId);
	if (exists) {
		req.session.watchlist = req.session.watchlist.filter(id => id !== productId);
	} else {
		if (!findProduct(productId)) return res.status(400).json({ ok: false, message: 'Invalid product' });
		req.session.watchlist.push(productId);
	}
	res.json({ ok: true, watching: !exists });
});

// 404
app.use((_req, res) => {
	res.status(404).render('pages/404', { title: 'Not found', session: {} });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
