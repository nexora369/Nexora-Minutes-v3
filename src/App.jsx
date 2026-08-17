import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  Tag,
  UserRound,
  X,
} from 'lucide-react';

const categories = [
  ['Grocery', '🛒'],
  ['Food', '🍱'],
  ['Snacks', '🍿'],
  ['Beverages', '🥤'],
  ['Fruits & Vegetables', '🥬'],
  ['Dairy & Eggs', '🥚'],
  ['Rice, Dal & Atta', '🌾'],
  ['Fish & Meat', '🐟'],
  ['Bakery & Biscuits', '🍪'],
  ['Chocolate & Sweets', '🍫'],
  ['Ice Cream', '🍦'],
  ['Personal Care', '🧴'],
  ['Household', '🧹'],
  ['Kitchen', '🍳'],
  ['Baby Care', '🍼'],
  ['Health & Wellness', '💊'],
];

const products = [
  { id: 1, name: 'Premium Miniket Rice', qty: '5 kg', price: 790, mrp: 890, tag: 'Bestseller', emoji: '🍚' },
  { id: 2, name: 'Fresh Red Lentil', qty: '1 kg', price: 145, mrp: 165, tag: 'Hot', emoji: '🫘' },
  { id: 3, name: 'Potato Chips', qty: '100 g', price: 55, mrp: 60, tag: 'Hot', emoji: '🥔' },
  { id: 4, name: 'Fresh Farm Eggs', qty: '12 pcs', price: 150, mrp: 165, tag: 'Fresh', emoji: '🥚' },
  { id: 5, name: 'Full Cream Milk', qty: '1 L', price: 95, mrp: 105, tag: 'Bestseller', emoji: '🥛' },
  { id: 6, name: 'Premium Cooking Oil', qty: '1 L', price: 185, mrp: 200, tag: 'Deal', emoji: '🫗' },
];

function ProductCard({ product, onAdd }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const [liked, setLiked] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image">
        <span className="discount-badge">-{discount}%</span>
        <button className={`wish-btn ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)} aria-label="Wishlist">
          <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
      </div>
      <div className="product-info">
        <span className="product-tag">{product.tag}</span>
        <h3>{product.name}</h3>
        <p>{product.qty}</p>
        <div className="price-row">
          <strong>৳{product.price}</strong>
          <del>৳{product.mrp}</del>
        </div>
        <div className="stock-row"><span>✓ In Stock</span><button onClick={() => onAdd(product)}>+ Add</button></div>
      </div>
    </article>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => `${p.name} ${p.qty} ${p.tag}`.toLowerCase().includes(q));
  }, [search]);

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing
        ? items.map((item) => item.id === product.id ? { ...item, count: item.count + 1 } : item)
        : [...items, { ...product, count: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="icon-btn mobile-only" aria-label="Menu"><Menu size={21} /></button>
          <a className="brand" href="#home" aria-label="Nexora Minutes home">
            <span className="brand-mark">N</span>
            <span>NEXORA <em>MINUTES</em></span>
          </a>
          <div className="delivery-pill"><MapPin size={15} /><span>Char Aishordi Union</span><b>30–50 min</b></div>
          <div className="header-actions">
            <button className="account-btn"><UserRound size={19} /><span>Account</span></button>
            <button className="cart-btn"><ShoppingCart size={20} /><span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="search-area">
          <div className="search-box">
            <Search size={20} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search milk, rice, eggs, snacks..." />
            {search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={18} /></button>}
          </div>
        </section>

        <section className="hero container">
          <div className="hero-copy">
            <span className="eyebrow">⚡ QUICK COMMERCE FOR YOUR EVERYDAY</span>
            <h1>EVERYDAY ESSENTIALS.<br /><span>DELIVERED FAST.</span></h1>
            <p>Groceries and daily essentials delivered across Char Aishordi Union in approximately 30–50 minutes.</p>
            <button className="primary-btn">START SHOPPING <ArrowRight size={18} /></button>
            <div className="trust-row"><span>⚡ 30–50 Min</span><span>🚚 Local Delivery</span><span>💵 Cash on Delivery</span></div>
          </div>
          <div className="hero-visual"><div className="speed-ring">N<span>⚡</span></div><div className="floating-card"><Clock3 size={17} /> Fast local delivery</div></div>
        </section>

        <section className="quick-categories container">
          <div className="section-heading"><div><span className="section-kicker">SHOP BY</span><h2>Hot Categories</h2></div><button onClick={() => setShowCategories(!showCategories)}>View all <ChevronRight size={17} /></button></div>
          <div className={`category-strip ${showCategories ? 'expanded' : ''}`}>
            {categories.map(([name, icon]) => <button className="category-card" key={name}><span>{icon}</span><strong>{name}</strong></button>)}
          </div>
        </section>

        <section className="promo container">
          <div className="promo-card promo-red"><span><Tag size={17} /> TODAY'S DEAL</span><h2>Fresh essentials,<br />better prices.</h2><p>Save on selected everyday products.</p><button>Shop deals <ArrowRight size={16} /></button></div>
          <div className="promo-card promo-dark"><span><Sparkles size={17} /> NEXORA PICKS</span><h2>Popular products<br />near you.</h2><p>Local favorites, ready to order.</p><button>Explore <ArrowRight size={16} /></button></div>
        </section>

        <section className="products-section container">
          <div className="section-heading"><div><span className="section-kicker">FAST MOVERS</span><h2>Hot Products</h2></div><button>See all <ChevronRight size={17} /></button></div>
          {search && <p className="search-result-label">Showing results for “{search}”</p>}
          <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>
          {!filteredProducts.length && <div className="empty-state"><Search size={32} /><h3>No products found</h3><p>Try another product, brand or category.</p></div>}
        </section>

        <section className="why container"><div><span className="section-kicker">WHY NEXORA MINUTES</span><h2>Built for your everyday rush.</h2></div><div className="why-grid"><div><b>30–50</b><span>Minute delivery</span></div><div><b>৳</b><span>Cash on delivery</span></div><div><b>✓</b><span>Local & reliable</span></div></div></section>
      </main>

      <footer><div className="container footer-inner"><div><a className="brand" href="#home"><span className="brand-mark">N</span><span>NEXORA <em>MINUTES</em></span></a><p>Everyday essentials. Delivered fast.</p></div><div className="footer-links"><a>Categories</a><a>About</a><a>Help & Support</a><a>Delivery Information</a><a>Terms</a><a>Privacy</a></div></div></footer>

      <nav className="bottom-nav"><a className="active"><Home size={20} /><span>Home</span></a><a><Menu size={20} /><span>Categories</span></a><a><Search size={20} /><span>Search</span></a><a><ShoppingCart size={20} /><span>Cart {cartCount ? `(${cartCount})` : ''}</span></a><a><UserRound size={20} /><span>Account</span></a></nav>
    </div>
  );
}
