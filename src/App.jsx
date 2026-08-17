import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Tag,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';

const primaryCategories = [
  ['Grocery', '🛒'],
  ['Food', '🍱'],
  ['Snacks', '🍿'],
  ['Hot Products', '🔥'],
];

const categories = [
  ['Vegetables & Fruits', '🥬'], ['Dairy & Eggs', '🥚'], ['Rice, Dal & Atta', '🌾'],
  ['Fish & Meat', '🐟'], ['Bakery & Biscuits', '🍪'], ['Chocolate & Sweets', '🍫'],
  ['Ice Cream', '🍦'], ['Beverages', '🥤'], ['Personal Care', '🧴'], ['Household', '🧹'],
  ['Kitchen', '🍳'], ['Baby Care', '🍼'], ['Health & Wellness', '💊'], ['Frozen Food', '🧊'],
  ['Tea & Coffee', '☕'], ['Oil, Ghee & Masala', '🫙'],
];

const products = [
  { id: 1, name: 'Premium Miniket Rice', qty: '5 kg', price: 790, mrp: 890, tag: 'Bestseller', emoji: '🍚', category: 'Rice, Dal & Atta' },
  { id: 2, name: 'Fresh Red Lentil', qty: '1 kg', price: 145, mrp: 165, tag: 'Hot', emoji: '🫘', category: 'Rice, Dal & Atta' },
  { id: 3, name: 'Potato Chips', qty: '100 g', price: 55, mrp: 60, tag: 'Hot', emoji: '🥔', category: 'Snacks' },
  { id: 4, name: 'Fresh Farm Eggs', qty: '12 pcs', price: 150, mrp: 165, tag: 'Fresh', emoji: '🥚', category: 'Dairy & Eggs' },
  { id: 5, name: 'Full Cream Milk', qty: '1 L', price: 95, mrp: 105, tag: 'Bestseller', emoji: '🥛', category: 'Dairy & Eggs' },
  { id: 6, name: 'Premium Cooking Oil', qty: '1 L', price: 185, mrp: 200, tag: 'Deal', emoji: '🫗', category: 'Oil, Ghee & Masala' },
  { id: 7, name: 'Fresh Bananas', qty: '1 dozen', price: 90, mrp: 105, tag: 'Fresh', emoji: '🍌', category: 'Vegetables & Fruits' },
  { id: 8, name: 'Chicken Breast', qty: '1 kg', price: 340, mrp: 370, tag: 'Fresh', emoji: '🍗', category: 'Fish & Meat' },
  { id: 9, name: 'Chocolate Cookies', qty: '120 g', price: 75, mrp: 85, tag: 'Trending', emoji: '🍪', category: 'Bakery & Biscuits' },
  { id: 10, name: 'Orange Drink', qty: '500 ml', price: 45, mrp: 50, tag: 'Hot', emoji: '🥤', category: 'Beverages' },
];

function ProductCard({ product, onAdd }) {
  const [liked, setLiked] = useState(false);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <article className="product-card">
      <div className="product-image">
        <span className="discount-badge">-{discount}%</span>
        <button className={`wish-btn ${liked ? 'liked' : ''}`} onClick={() => setLiked((value) => !value)} aria-label={`Wishlist ${product.name}`}>
          <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
      </div>
      <div className="product-info">
        <span className="product-tag">{product.tag}</span>
        <h3>{product.name}</h3><p>{product.qty}</p>
        <div className="price-row"><strong>৳{product.price}</strong><del>৳{product.mrp}</del></div>
        <div className="stock-row"><span>✓ In Stock</span><button onClick={() => onAdd(product)}>+ Add</button></div>
      </div>
    </article>
  );
}

function SectionHeading({ kicker, title, onSeeAll }) {
  return <div className="section-heading"><div><span className="section-kicker">{kicker}</span><h2>{title}</h2></div>{onSeeAll && <button onClick={onSeeAll}>See all <ChevronRight size={17} /></button>}</div>;
}

function CartDrawer({ cart, onClose, onChange, onRemove, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const delivery = subtotal >= 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal + delivery;
  return (
    <>
      <button className="cart-backdrop" onClick={onClose} aria-label="Close cart" />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-header"><div><span className="section-kicker">YOUR BASKET</span><h2>Shopping Cart</h2></div><button className="drawer-close" onClick={onClose}><X size={20} /></button></div>
        {cart.length === 0 ? (
          <div className="cart-empty"><ShoppingCart size={42} /><h3>Your cart is waiting.</h3><p>Add some everyday essentials to get started.</p><button className="primary-btn" onClick={onClose}>START SHOPPING <ArrowRight size={17} /></button></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => <div className="cart-item" key={item.id}>
                <div className="cart-item-image">{item.emoji}</div>
                <div className="cart-item-info"><h3>{item.name}</h3><p>{item.qty}</p><strong>৳{item.price}</strong>
                  <div className="qty-control"><button onClick={() => onChange(item.id, -1)}><Minus size={14} /></button><b>{item.count}</b><button onClick={() => onChange(item.id, 1)}><Plus size={14} /></button></div>
                </div>
                <button className="remove-item" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={16} /></button>
              </div>)}
            </div>
            <div className="cart-summary"><div><span>Subtotal</span><b>৳{subtotal}</b></div><div><span>Delivery fee</span><b>{delivery ? `৳${delivery}` : 'FREE'}</b></div><div className="cart-total"><span>Total</span><b>৳{total}</b></div></div>
            <button className="checkout-btn" onClick={onCheckout}>PROCEED TO CHECKOUT <ArrowRight size={17} /></button>
            <p className="cod-note">💵 Cash on Delivery available in Char Aishordi Union.</p>
          </>
        )}
      </aside>
    </>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nexora-cart') || '[]'); } catch { return []; }
  });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { localStorage.setItem('nexora-cart', JSON.stringify(cart)); }, [cart]);

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing ? items.map((item) => item.id === product.id ? { ...item, count: item.count + 1 } : item) : [...items, { ...product, count: 1 }];
    });
    setCartOpen(true);
  };
  const changeQuantity = (id, delta) => setCart((items) => items.map((item) => item.id === id ? { ...item, count: item.count + delta } : item).filter((item) => item.count > 0));
  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !q || `${product.name} ${product.qty} ${product.tag} ${product.category}`.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || product.category === selectedCategory || (selectedCategory === 'Hot Products' && ['Hot', 'Bestseller', 'Trending'].includes(product.tag)) || (selectedCategory === 'Grocery' && ['Rice, Dal & Atta', 'Dairy & Eggs', 'Vegetables & Fruits', 'Oil, Ghee & Masala'].includes(product.category)) || (selectedCategory === 'Snacks' && product.category === 'Snacks') || (selectedCategory === 'Food' && ['Fish & Meat', 'Bakery & Biscuits'].includes(product.category));
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const chooseCategory = (name) => { setSelectedCategory(name); setSearch(''); document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' }); };
  const hotProducts = products.slice(0, 6);
  const trendingProducts = products.slice(4, 10);

  return (
    <div className="app-shell">
      <header className="topbar"><div className="topbar-inner">
        <button className="icon-btn mobile-only" aria-label="Open menu"><Menu size={21} /></button>
        <a className="brand" href="#home"><span className="brand-mark">N</span><span>NEXORA <em>MINUTES</em></span></a>
        <div className="delivery-pill"><MapPin size={15} /><span>Char Aishordi Union</span><b>30–50 min</b></div>
        <div className="header-actions"><button className="account-btn"><UserRound size={19} /><span>Account</span></button><button className="cart-btn" onClick={() => setCartOpen(true)}><ShoppingCart size={20} /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button></div>
      </div></header>

      <main id="home">
        <section className="search-area"><div className="search-box"><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search milk, rice, eggs, snacks..." aria-label="Search products" />{(search || selectedCategory) && <button onClick={() => { setSearch(''); setSelectedCategory(''); }} aria-label="Clear filters"><X size={18} /></button>}</div></section>

        <section className="hero container"><div className="hero-copy"><span className="eyebrow">⚡ QUICK COMMERCE • CHAR AISHORDI UNION</span><h1>EVERYDAY ESSENTIALS.<br /><span>DELIVERED FAST.</span></h1><p>Groceries and daily essentials delivered to your doorstep across Char Aishordi Union in approximately 30–50 minutes.</p><button className="primary-btn" onClick={() => document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' })}>START SHOPPING <ArrowRight size={18} /></button><div className="trust-row"><span>⚡ 30–50 Min</span><span>🚚 Local Delivery</span><span>💵 Cash on Delivery</span></div></div><div className="hero-visual"><div className="speed-ring">N<span>⚡</span></div><div className="floating-card"><Clock3 size={17} /> Fast local delivery</div></div></section>

        <section className="category-area container"><SectionHeading kicker="BROWSE & SHOP" title="Categories" /><div className="primary-category-row">{primaryCategories.map(([name, icon]) => <button key={name} className={`primary-category ${selectedCategory === name ? 'active' : ''}`} onClick={() => chooseCategory(name)}><span>{icon}</span><strong>{name}</strong><ChevronRight size={15} /></button>)}</div><div className={`secondary-category-row ${showAllCategories ? 'expanded' : ''}`}>{categories.map(([name, icon]) => <button key={name} className={`secondary-category ${selectedCategory === name ? 'active' : ''}`} onClick={() => chooseCategory(name)}><span>{icon}</span><strong>{name}</strong></button>)}</div><button className="category-toggle" onClick={() => setShowAllCategories((value) => !value)}>{showAllCategories ? 'Show less' : 'Explore all categories'} <ChevronRight size={16} /></button></section>

        <section className="promo container"><div className="promo-card promo-red"><span><Tag size={17} /> SPECIAL OFFER</span><h2>Fresh essentials,<br />better prices.</h2><p>Save on selected everyday products today.</p><button onClick={() => chooseCategory('Hot Products')}>Shop deals <ArrowRight size={16} /></button></div><div className="promo-card promo-dark"><span><Sparkles size={17} /> TRENDING NOW</span><h2>Popular products<br />near you.</h2><p>Local favorites, ready to order.</p><button onClick={() => document.querySelector('#trending')?.scrollIntoView({ behavior: 'smooth' })}>Explore <ArrowRight size={16} /></button></div></section>

        <section className="products-section container"><SectionHeading kicker="FAST MOVERS" title={selectedCategory || 'Hot Products'} onSeeAll={() => { setSelectedCategory(''); setSearch(''); }} />{(search || selectedCategory) && <p className="search-result-label">{search ? `Showing results for “${search}”` : `Showing products from ${selectedCategory}`}</p>}<div className="product-grid">{(selectedCategory || search ? filteredProducts : hotProducts).map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>{!filteredProducts.length && (search || selectedCategory) && <div className="empty-state"><Search size={32} /><h3>No products found</h3><p>Try another product or category.</p></div>}</section>

        {!search && !selectedCategory && <><section id="trending" className="products-section container"><SectionHeading kicker="TRENDING NEAR YOU" title="Trending Products" /><div className="product-grid">{trendingProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div></section><section className="wide-offer container"><div><span>🔥 LIMITED-TIME DEAL</span><h2>Save more on your everyday basket.</h2><p>Fresh groceries, snacks and essentials at prices made for your local community.</p></div><button onClick={() => chooseCategory('Hot Products')}>VIEW HOT PRODUCTS <ArrowRight size={17} /></button></section></>}

        <section className="why container"><div><span className="section-kicker">WHY NEXORA MINUTES</span><h2>Built for your everyday rush.</h2></div><div className="why-grid"><div><b>30–50</b><span>Minute delivery</span></div><div><b>৳</b><span>Cash on delivery</span></div><div><b>✓</b><span>Local & reliable</span></div></div></section>
      </main>

      <footer><div className="container footer-inner"><div><a className="brand" href="#home"><span className="brand-mark">N</span><span>NEXORA <em>MINUTES</em></span></a><p>Everyday essentials. Delivered fast.</p><small>Serving Char Aishordi Union.</small></div><div className="footer-links"><a href="#home">Categories</a><a href="#home">About</a><a href="#home">Help & Support</a><a href="#home">Delivery Information</a><a href="#home">Terms</a><a href="#home">Privacy</a></div></div></footer>

      <nav className="bottom-nav"><a className="active" href="#home"><Home size={20} /><span>Home</span></a><a href="#categories" onClick={() => document.querySelector('.category-area')?.scrollIntoView({ behavior: 'smooth' })}><Menu size={20} /><span>Categories</span></a><a href="#search" onClick={() => document.querySelector('.search-box input')?.focus()}><Search size={20} /><span>Search</span></a><a href="#cart" onClick={(e) => { e.preventDefault(); setCartOpen(true); }}><ShoppingCart size={20} /><span>Cart {cartCount ? `(${cartCount})` : ''}</span></a><a href="#account"><UserRound size={20} /><span>Account</span></a></nav>
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onChange={changeQuantity} onRemove={removeFromCart} onCheckout={() => alert('Checkout flow will be connected in the next phase.')} />}
    </div>
  );
}
