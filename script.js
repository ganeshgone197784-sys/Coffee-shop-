/* ==========================================================================
   COFFEE SHOP — script.js
   Vanilla JS only. Organised by feature. Read the comments before editing.
   ========================================================================== */

'use strict';

/* Respect users who prefer reduced motion */
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   1. MENU DATA
   Edit this array to change menu items — everything below renders from it.
   ========================================================================== */
const MENU_ITEMS = [
  { id:1, name:'Classic Espresso', cat:'espresso', price:'₹120', rating:4.6, desc:'A tight, syrupy shot pulled from our house blend.', img:'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=500&q=80' },
  { id:2, name:'Double Ristretto', cat:'espresso', price:'₹150', rating:4.7, desc:'Concentrated, short-pulled, intensely aromatic.', img:'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=500&q=80' },
  { id:3, name:'Classic Cappuccino', cat:'cappuccino', price:'₹160', rating:4.8, desc:'Equal parts espresso, steamed milk and airy foam.', img:'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=500&q=80' },
  { id:4, name:'Hazelnut Cappuccino', cat:'cappuccino', price:'₹180', rating:4.5, desc:'Our cappuccino, finished with roasted hazelnut.', img:'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80' },
  { id:5, name:'Cafe Latte', cat:'latte', price:'₹170', rating:4.7, desc:'Silky steamed milk poured over a smooth double shot.', img:'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80' },
  { id:6, name:'Vanilla Bean Latte', cat:'latte', price:'₹190', rating:4.6, desc:'Espresso, milk and real vanilla bean, lightly sweet.', img:'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=500&q=80' },
  { id:7, name:'Classic Americano', cat:'americano', price:'₹130', rating:4.4, desc:'Espresso lengthened with hot water, full body kept.', img:'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=500&q=80' },
  { id:8, name:'Long Black', cat:'americano', price:'₹140', rating:4.5, desc:'Water first, then espresso — for a richer crema.', img:'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=500&q=80' },
  { id:9, name:'Classic Mocha', cat:'mocha', price:'₹200', rating:4.7, desc:'Espresso, steamed milk and Belgian dark chocolate.', img:'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80' },
  { id:10, name:'White Choc Mocha', cat:'mocha', price:'₹210', rating:4.5, desc:'A sweeter take, finished with white chocolate shavings.', img:'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80' },
  { id:11, name:'Cold Coffee Classic', cat:'cold', price:'₹180', rating:4.6, desc:'Chilled coffee blended with milk and ice, lightly sweetened.', img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80' },
  { id:12, name:'Cold Brew, Black', cat:'cold', price:'₹190', rating:4.7, desc:'Steeped for 18 hours — smooth, low-acid, no ice-melt dilution.', img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80' },
  { id:13, name:'Iced Latte', cat:'iced', price:'₹190', rating:4.6, desc:'Espresso poured over cold milk and ice.', img:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80' },
  { id:14, name:'Iced Caramel Latte', cat:'iced', price:'₹210', rating:4.8, desc:'Our iced latte, layered with house caramel.', img:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80' },
  { id:15, name:'Classic Frappe', cat:'frappe', price:'₹220', rating:4.7, desc:'Blended cold coffee, whipped to a thick, icy froth.', img:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=500&q=80' },
  { id:16, name:'Mocha Frappe', cat:'frappe', price:'₹240', rating:4.6, desc:'Frappe base swirled with dark chocolate sauce.', img:'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=500&q=80' },
  { id:17, name:'Masala Chai', cat:'tea', price:'₹90', rating:4.7, desc:'Slow-brewed with whole spices and full-cream milk.', img:'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=500&q=80' },
  { id:18, name:'Green Tea', cat:'tea', price:'₹100', rating:4.3, desc:'Light, grassy and clean — served with honey on the side.', img:'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=500&q=80' },
  { id:19, name:'Grilled Sandwich', cat:'food', price:'₹160', rating:4.5, desc:'Toasted sourdough, cheddar, and roasted vegetables.', img:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80' },
  { id:20, name:'Classic Cheeseburger', cat:'food', price:'₹230', rating:4.6, desc:'Grilled patty, cheddar, house sauce, brioche bun.', img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { id:21, name:'French Fries', cat:'food', price:'₹120', rating:4.4, desc:'Crisp-edged, salted, served with garlic aioli.', img:'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80' },
  { id:22, name:'Margherita Pizza', cat:'food', price:'₹260', rating:4.5, desc:'Wood-fired base, San Marzano tomato, fresh basil.', img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop' },
  { id:23, name:'Chocolate Brownie', cat:'dessert', price:'₹140', rating:4.8, desc:'Fudgy centre, crackled top, served warm.', img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80' },
  { id:24, name:'Red Velvet Cake', cat:'dessert', price:'₹170', rating:4.7, desc:'Cream-cheese frosting, a slice cut fresh to order.', img:'https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=500&q=80' },
  { id:25, name:'Butter Croissant', cat:'dessert', price:'₹110', rating:4.6, desc:'Laminated, baked fresh each morning.', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80' },
];

const GALLERY_ITEMS = [
  { src:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=700&q=80', caption:'Roasted to order', tall:true },
  { src:'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=700&q=80', caption:'Our corner seats' },
  { src:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80', caption:'Latte, every morning' },
  { src:'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=700&q=80', caption:'Room for lingering', tall:true },
  { src:'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=700&q=80', caption:'Fresh from the oven' },
  { src:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80', caption:'Behind the bar' },
  { src:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80', caption:'Latte art in progress' },
  { src:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80', caption:'One more pour' },
];

const REVIEWS = [
  { name:'Aditi Sharma', text:'The cold brew here is unreal — nothing like the syrupy stuff you get elsewhere. Became my Sunday ritual.', stars:5, date:'2 weeks ago' },
  { name:'Rohan Patil', text:'Quiet corner, good wifi, better coffee. I get work done here better than at home.', stars:5, date:'1 month ago' },
  { name:'Sneha Kulkarni', text:'Their cappuccino foam is genuinely the best in Kalyan. Staff remembers my order now.', stars:4, date:'3 weeks ago' },
  { name:'Vikram Joshi', text:'Went for the weekend special — free pastry with my latte was a lovely surprise.', stars:5, date:'5 days ago' },
  { name:'Priya Deshmukh', text:'Cosy ambience, warm lighting, and the masala chai reminds me of home.', stars:4, date:'2 months ago' },
  { name:'Karan Mehta', text:'Solid burger and fries combo, and the iced latte is properly strong, not watered down.', stars:5, date:'1 week ago' },
];

const WHY_ITEMS = [
  { ico:'🌱', title:'Premium Coffee Beans', desc:'Sourced in small batches and roasted in-house.' },
  { ico:'🥗', title:'Fresh Ingredients', desc:'Nothing frozen, nothing sitting under a heat lamp.' },
  { ico:'👨‍🍳', title:'Skilled Baristas', desc:'Every cup pulled and poured with real craft.' },
  { ico:'🛋️', title:'Cozy Atmosphere', desc:'A room built for slow mornings and long chats.' },
  { ico:'⚡', title:'Fast Service', desc:'Quick without ever feeling rushed.' },
  { ico:'📶', title:'Free Wi-Fi', desc:'Fast enough for a call, quiet enough to focus.' },
  { ico:'🍞', title:'Freshly Made Food', desc:'Baked and grilled to order, every single time.' },
  { ico:'💰', title:'Affordable Prices', desc:'Premium quality without the premium markup.' },
];

const FAQ_ITEMS = [
  { q:'Do you take table reservations?', a:'Walk-ins are always welcome. For groups of 6 or more, message us on Instagram or call ahead and we\'ll hold a table.' },
  { q:'Is there parking available?', a:'Yes, there is free parking space right outside for both two-wheelers and cars.' },
  { q:'Do you offer dine-in, takeaway and delivery?', a:'All three. Dine-in and takeaway are available all day; delivery is available through our contact number during operating hours.' },
  { q:'Are the happy-hour and weekend offers combinable?', a:'Offers can\'t be stacked, but you\'re welcome to pick whichever gives you the better deal on your order.' },
  { q:'Do you cater for private events?', a:'Yes — send us your date and headcount through the contact form and we\'ll put together a spread.' },
];

/* ==========================================================================
   2. LOADING SCREEN
   ========================================================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const minDisplay = 900; // ms, so the loader doesn't just flash
  const start = performance.now();
  const finish = () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, minDisplay - elapsed);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
      revealHero();
    }, wait);
  };
  finish();
});

function revealHero(){
  document.querySelectorAll('.reveal-up').forEach(el => {
    el.style.animationPlayState = 'running';
  });
}

/* ==========================================================================
   3. NAVIGATION — sticky glassmorphism, mobile toggle, active link
   ========================================================================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function onScrollNav(){
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScrollNav, { passive:true });
onScrollNav();

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navbar.classList.toggle('menu-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navbar.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Highlight active nav link based on scroll position */
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinkMap = new Map(
  Array.from(navLinks.querySelectorAll('.nav-link')).map(a => [a.getAttribute('href').slice(1), a])
);
function onScrollActiveLink(){
  let current = sections[0]?.id;
  const scrollPos = window.scrollY + 140;
  for (const sec of sections){
    if (sec.offsetTop <= scrollPos) current = sec.id;
  }
  navLinkMap.forEach((a, id) => a.classList.toggle('active', id === current));
}
window.addEventListener('scroll', onScrollActiveLink, { passive:true });
onScrollActiveLink();

/* ==========================================================================
   4. THEME TOGGLE (dark / light, persisted for this session)
   ========================================================================== */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(theme){
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  try { sessionStorage.setItem('coffee-theme', theme); } catch(e) { /* storage unavailable */ }
}

(function initTheme(){
  let stored = null;
  try { stored = sessionStorage.getItem('coffee-theme'); } catch(e) {}
  if (stored){ setTheme(stored); return; }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
})();

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
});

/* ==========================================================================
   5. SCROLL PROGRESS BAR
   ========================================================================== */
const scrollProgress = document.getElementById('scrollProgress');
function onScrollProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}
window.addEventListener('scroll', onScrollProgress, { passive:true });
onScrollProgress();

/* ==========================================================================
   6. BACK TO TOP
   ========================================================================== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 600);
}, { passive:true });
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ==========================================================================
   7. RENDER: MENU CARDS + FILTERS
   ========================================================================== */
const menuGrid = document.getElementById('menuGrid');

function renderMenu(){
  menuGrid.innerHTML = MENU_ITEMS.map(item => `
    <article class="menu-card visible" data-cat="${item.cat}">
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" width="500" height="375">
        <span class="menu-card-rating">★ ${item.rating.toFixed(1)}</span>
      </div>
      <div class="menu-card-body">
        <span class="menu-card-cat">${labelForCat(item.cat)}</span>
        <div class="menu-card-top">
          <h3 class="menu-card-name">${item.name}</h3>
          <span class="menu-card-price">${item.price}</span>
        </div>
        <p class="menu-card-desc">${item.desc}</p>
        <button class="menu-card-order ripple" data-name="${item.name}">Order Now</button>
      </div>
    </article>
  `).join('');
}

function labelForCat(cat){
  const map = { espresso:'Espresso', cappuccino:'Cappuccino', latte:'Latte', americano:'Americano',
    mocha:'Mocha', cold:'Cold Coffee', iced:'Iced Latte', frappe:'Frappe', tea:'Tea', food:'Food', dessert:'Dessert' };
  return map[cat] || cat;
}

const menuFilters = document.getElementById('menuFilters');
menuFilters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  menuFilters.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  const filter = btn.dataset.filter;
  document.querySelectorAll('.menu-card').forEach(card => {
    const match = filter === 'all' || card.dataset.cat === filter;
    card.classList.toggle('hidden-card', !match);
  });
});

/* "Order Now" — placeholder action (no backend ordering system wired up) */
menuGrid?.addEventListener('click', (e) => {
  const btn = e.target.closest('.menu-card-order');
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.style.pointerEvents = 'none';
  setTimeout(() => { btn.textContent = original; btn.style.pointerEvents = ''; }, 1600);
});

renderMenu();

/* ==========================================================================
   8. RENDER: GALLERY
   ========================================================================== */
const galleryGrid = document.getElementById('galleryGrid');
galleryGrid.innerHTML = GALLERY_ITEMS.map(g => `
  <figure class="gallery-item${g.tall ? ' g-tall' : ''}">
    <img src="${g.src}" alt="${g.caption}" loading="lazy">
    <figcaption class="gallery-caption">${g.caption}</figcaption>
  </figure>
`).join('');

/* ==========================================================================
   9. RENDER: REVIEWS (duplicated once for seamless marquee loop)
   ========================================================================== */
const reviewsTrack = document.getElementById('reviewsTrack');
function reviewCard(r){
  const initials = r.name.split(' ').map(w => w[0]).join('');
  return `
    <div class="review-card">
      <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
      <p class="review-text">“${r.text}”</p>
      <div class="review-person">
        <span class="review-avatar">${initials}</span>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
      </div>
    </div>`;
}
reviewsTrack.innerHTML = REVIEWS.map(reviewCard).join('') + REVIEWS.map(reviewCard).join('');

/* ==========================================================================
   10. RENDER: WHY CHOOSE US
   ========================================================================== */
document.getElementById('whyGrid').innerHTML = WHY_ITEMS.map(w => `
  <div class="why-card">
    <div class="why-ico">${w.ico}</div>
    <h3>${w.title}</h3>
    <p>${w.desc}</p>
  </div>
`).join('');

/* ==========================================================================
   11. RENDER: FAQ (accordion)
   ========================================================================== */
const faqList = document.getElementById('faqList');
faqList.innerHTML = FAQ_ITEMS.map((f, i) => `
  <div class="faq-item${i === 0 ? ' open' : ''}">
    <button class="faq-q" aria-expanded="${i === 0}">
      <span>${f.q}</span>
      <span class="faq-icon" aria-hidden="true"></span>
    </button>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>
`).join('');

faqList.addEventListener('click', (e) => {
  const q = e.target.closest('.faq-q');
  if (!q) return;
  const item = q.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  faqList.querySelectorAll('.faq-item').forEach(it => {
    it.classList.remove('open');
    it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen){
    item.classList.add('open');
    q.setAttribute('aria-expanded', 'true');
  }
});

/* ==========================================================================
   12. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

function observeReveals(){
  document.querySelectorAll('.reveal, .gallery-item, .why-card').forEach(el => revealObserver.observe(el));
}
observeReveals();

/* Menu cards fade in as they scroll into view (re-run when filter reveals them) */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.menu-card').forEach(el => cardObserver.observe(el));

/* ==========================================================================
   13. ANIMATED COUNTERS
   ========================================================================== */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

function animateCounter(el){
  const target = parseInt(el.dataset.count, 10);
  if (PREFERS_REDUCED_MOTION){ el.textContent = target; return; }
  const duration = 1600;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

/* ==========================================================================
   14. BUTTON RIPPLE EFFECT
   ========================================================================== */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.className = 'ripple-el';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

/* ==========================================================================
   15. CUSTOM CURSOR (desktop / hover-capable devices only)
   ========================================================================== */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsHover && !PREFERS_REDUCED_MOTION){
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });
  function animateRing(){
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .menu-card, .gallery-item, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

/* ==========================================================================
   16. MOUSE PARALLAX ON HERO BEANS
   ========================================================================== */
const heroBeans = document.querySelector('.hero-beans');
if (heroBeans && !PREFERS_REDUCED_MOTION){
  document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    heroBeans.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
  });
}

/* ==========================================================================
   17. CARD 3D TILT (subtle) — menu cards & why-cards
   ========================================================================== */
if (supportsHover && !PREFERS_REDUCED_MOTION){
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.why-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-6px)`;
  });
  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest?.('.why-card');
    if (card) card.style.transform = '';
  }, true);
}

/* ==========================================================================
   18. AMBIENT 3D-STYLE CANVAS BACKGROUND
   A lightweight, hand-rolled Canvas 2D scene (no heavy 3D model loading):
   layered "depth" particles + rotating bean silhouettes + rising steam +
   a soft glowing gradient mesh that drifts and reacts to the mouse.
   Depth is faked via parallax speed + size + blur per layer, which reads as
   3D without the cost of a WebGL scene graph.
   ========================================================================== */
(function ambientBackground(){
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height, dpr;
  let mouseX = 0.5, mouseY = 0.5; // normalized 0..1
  let targetMouseX = 0.5, targetMouseY = 0.5;
  let isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = e.clientY / window.innerHeight;
  });

  /* ---- Bean particles (three depth layers = fake 3D parallax) ---- */
  function makeBeans(count, layer){
    const beans = [];
    for (let i = 0; i < count; i++){
      beans.push({
        x: Math.random(),
        y: Math.random(),
        size: (layer === 0 ? 10 : layer === 1 ? 16 : 24) + Math.random() * 8,
        speed: (layer === 0 ? 0.06 : layer === 1 ? 0.11 : 0.18) + Math.random() * 0.04,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        drift: Math.random() * Math.PI * 2,
        depth: layer, // 0 = far, 2 = near
        opacity: layer === 0 ? 0.18 : layer === 1 ? 0.28 : 0.4,
      });
    }
    return beans;
  }
  const beanLayers = [ makeBeans(6, 0), makeBeans(5, 1), makeBeans(4, 2) ];

  /* ---- Glow orbs (soft gradient mesh) ---- */
  const orbs = [
    { x:0.18, y:0.25, r:420, hue:'caramel', speed:0.15 },
    { x:0.82, y:0.65, r:480, hue:'gold',    speed:0.11 },
    { x:0.5,  y:0.85, r:380, hue:'espresso',speed:0.08 },
  ];

  /* ---- Steam wisps (rising bezier ribbons) ---- */
  function makeSteam(count){
    const wisps = [];
    for (let i = 0; i < count; i++){
      wisps.push({
        x: Math.random(),
        seed: Math.random() * 1000,
        speed: 0.05 + Math.random() * 0.05,
        offset: Math.random() * Math.PI * 2,
        width: 20 + Math.random() * 30,
      });
    }
    return wisps;
  }
  const steamWisps = makeSteam(5);

  function colorFor(hue, alpha){
    const map = {
      caramel:  `rgba(192,133,82,${alpha})`,
      gold:     `rgba(212,175,55,${alpha})`,
      espresso: `rgba(74,46,32,${alpha})`,
    };
    return map[hue];
  }

  function drawBean(x, y, size, rot, alpha, dark){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    const grad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
    if (dark){
      grad.addColorStop(0, '#C08552');
      grad.addColorStop(1, '#2B1810');
    } else {
      grad.addColorStop(0, '#9C6B3F');
      grad.addColorStop(1, '#3B2417');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.62, size * 0.86, 0, 0, Math.PI * 2);
    ctx.fill();
    // center crease
    ctx.strokeStyle = dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.35)';
    ctx.lineWidth = Math.max(1, size * 0.06);
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.75);
    ctx.quadraticCurveTo(size * 0.1, 0, 0, size * 0.75);
    ctx.stroke();
    ctx.restore();
  }

  function drawSteam(wisp, t, dark){
    const baseX = wisp.x * width;
    const baseY = height * 1.05;
    const riseHeight = height * 0.9;
    const progress = ((t * wisp.speed) + wisp.seed) % 1;
    const y = baseY - progress * riseHeight;
    const sway = Math.sin(t * 0.5 + wisp.offset) * 40;
    const alpha = Math.sin(progress * Math.PI) * (dark ? 0.05 : 0.035);
    if (alpha <= 0.002) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.filter = 'blur(18px)';
    const grad = ctx.createLinearGradient(0, y - wisp.width, 0, y + wisp.width);
    grad.addColorStop(0, dark ? 'rgba(251,243,231,0.9)' : 'rgba(255,255,255,0.9)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(baseX + sway, y, wisp.width, wisp.width * 2.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let t = 0;
  let rafId;
  function frame(){
    t += 0.016;
    mouseX += (targetMouseX - mouseX) * 0.03;
    mouseY += (targetMouseY - mouseY) * 0.03;
    const dark = isDark();

    ctx.clearRect(0, 0, width, height);

    /* Gradient mesh glow orbs, drifting slowly + reacting to mouse */
    orbs.forEach((orb, i) => {
      const px = (orb.x + (mouseX - 0.5) * 0.06 * orb.speed + Math.sin(t * 0.1 + i) * 0.02) * width;
      const py = (orb.y + (mouseY - 0.5) * 0.06 * orb.speed + Math.cos(t * 0.08 + i) * 0.02) * height;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, orb.r);
      grad.addColorStop(0, colorFor(orb.hue, dark ? 0.16 : 0.10));
      grad.addColorStop(1, colorFor(orb.hue, 0));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    /* Steam wisps rising from the bottom */
    steamWisps.forEach(w => drawSteam(w, t, dark));

    /* Bean layers — far (slow, small, faint) to near (fast, big, clearer) */
    beanLayers.forEach(layer => {
      layer.forEach(bean => {
        bean.rot += bean.rotSpeed;
        const parallaxX = (mouseX - 0.5) * (bean.depth + 1) * 22;
        const parallaxY = (mouseY - 0.5) * (bean.depth + 1) * 14;
        const floatY = Math.sin(t * bean.speed * 2 + bean.drift) * 18;
        const x = bean.x * width + parallaxX;
        const y = ((bean.y * height) + floatY + t * bean.speed * 6) % (height + 60) - 30 + parallaxY;
        drawBean(x, y, bean.size, bean.rot, bean.opacity, dark);
      });
    });

    rafId = requestAnimationFrame(frame);
  }

  if (!PREFERS_REDUCED_MOTION){
    rafId = requestAnimationFrame(frame);
  } else {
    // Static single paint for reduced-motion users — ambience without motion
    frame();
    cancelAnimationFrame(rafId);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else if (!PREFERS_REDUCED_MOTION) rafId = requestAnimationFrame(frame);
  });
})();

/* ==========================================================================
   19. EMAILJS INTEGRATION — CONTACT FORM
   ----------------------------------------------------------------------
   TO ACTIVATE THIS FORM:
   1. Create a free account at https://www.emailjs.com
   2. Add the SDK to index.html, just before "</head>" or before this
      script tag:
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"><\/script>
   3. Replace the three placeholders below with your real EmailJS values:
        PUBLIC_KEY   -> from EmailJS Dashboard > Account > General
        SERVICE_ID   -> from EmailJS Dashboard > Email Services
        TEMPLATE_ID  -> from EmailJS Dashboard > Email Templates
   4. In your EmailJS template, use variables matching the field "name"
      attributes below: {{name}}, {{email}}, {{phone}}, {{subject}}, {{message}}
   ========================================================================== */
const EMAILJS_PUBLIC_KEY  = 'yzNF3nxLfpfJDcTww';   // <-- replace me
const EMAILJS_SERVICE_ID  = 'service_gl64en8';   // <-- replace me
const EMAILJS_TEMPLATE_ID = 'template_inl347e';  // <-- replace me

// Initialise EmailJS if the SDK has been loaded (see step 2 above)
if (window.emailjs && typeof window.emailjs.init === 'function'){
  try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch (e) { /* SDK not fully configured yet */ }
}

const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');
const contactSubmit = document.getElementById('contactSubmit');
let contactSubmitting = false; // guards against duplicate submissions

const validators = {
  name: v => v.trim().length >= 2 || 'Please enter your name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
  phone: v => v.trim() === '' || /^[0-9+\-\s()]{7,15}$/.test(v.trim()) || 'Please enter a valid phone number.',
  subject: v => v.trim().length >= 3 || 'Please enter a subject.',
  message: v => v.trim().length >= 10 || 'Please write at least 10 characters.',
};

function validateField(input){
  const rule = validators[input.name];
  if (!rule) return true;
  const result = rule(input.value);
  const errorEl = document.getElementById('err-' + input.name);
  const field = input.closest('.form-field');
  if (result === true){
    field?.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
    return true;
  } else {
    field?.classList.add('invalid');
    if (errorEl) errorEl.textContent = result;
    return false;
  }
}

if (contactForm){
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-field')?.classList.contains('invalid')) validateField(input);
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (contactSubmitting) return; // prevent duplicate submissions

    const inputs = Array.from(contactForm.querySelectorAll('input, textarea'));
    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid){
      showFormMsg(contactMsg, 'Please fix the highlighted fields.', 'error');
      return;
    }

    contactSubmitting = true;
    contactSubmit.classList.add('loading');
    contactSubmit.disabled = true;
    showFormMsg(contactMsg, '', '');

    const params = {
      name: contactForm.querySelector('#cf-name').value.trim(),
      email: contactForm.querySelector('#cf-email').value.trim(),
      phone: contactForm.querySelector('#cf-phone').value.trim(),
      subject: contactForm.querySelector('#cf-subject').value.trim(),
      message: contactForm.querySelector('#cf-message').value.trim(),
    };

    try {
      if (window.emailjs && typeof window.emailjs.send === 'function' && EMAILJS_PUBLIC_KEY !== 'PUBLIC_KEY'){
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      } else {
        // EmailJS credentials not set up yet — simulate the request so the
        // UI/UX can still be reviewed end-to-end during development.
        await new Promise((resolve, reject) => setTimeout(resolve, 1200));
        console.warn('[Coffee Shop] EmailJS credentials are placeholders. Add your real keys in script.js to send real emails.');
      }
      showFormMsg(contactMsg, 'Thanks — your message has been sent! We\'ll get back to you soon.', 'success');
      contactForm.reset();
    } catch (err){
      console.error('EmailJS send failed:', err);
      showFormMsg(contactMsg, 'Something went wrong sending your message. Please try again, or call us directly.', 'error');
    } finally {
      contactSubmit.classList.remove('loading');
      contactSubmit.disabled = false;
      contactSubmitting = false;
    }
  });
}

function showFormMsg(el, text, type){
  if (!el) return;
  el.textContent = text;
  el.className = 'form-msg' + (type ? ' ' + type : '');
}

/* ==========================================================================
   20. NEWSLETTER FORM (front-end only placeholder — wire to EmailJS or a
   list provider such as Mailchimp/ConvertKit as needed)
   ========================================================================== */
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');
let newsletterSubmitting = false;

if (newsletterForm){
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (newsletterSubmitting) return;
    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())){
      showFormMsg(newsletterMsg, 'Please enter a valid email address.', 'error');
      return;
    }

    newsletterSubmitting = true;
    submitBtn.classList.add('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 900)); // placeholder request
      showFormMsg(newsletterMsg, 'You\'re on the list! Look out for your welcome email.', 'success');
      newsletterForm.reset();
    } finally {
      submitBtn.classList.remove('loading');
      newsletterSubmitting = false;
    }
  });
}

/* ==========================================================================
   21. FOOTER YEAR
   ========================================================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ==========================================================================
   22. SMOOTH-SCROLL FOR IN-PAGE ANCHORS (fallback for older browsers)
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ==========================================================================
   23. ROAST CURVE ("HOW IT'S MADE") — data render + scroll-triggered draw-in
   ========================================================================== */
const ROAST_STAGES = [
  { temp:'380°F', title:'Charge', text:'Green beans hit the drum. They\u2019re grassy, dense, and hold most of their moisture \u2014 this is where the batch decides its pace.' },
  { temp:'320°F', title:'Yellowing', text:'Moisture drives off and the beans turn from green to straw. The room smells like toast and cut hay.' },
  { temp:'395°F', title:'First crack', text:'Sugars caramelize and the beans audibly pop. This is the earliest point a roast is drinkable \u2014 where we pull our lightest lots.' },
  { temp:'435°F', title:'Development & drop', text:'Oils surface, body builds, acidity softens. We drop within seconds of our target, then cool the batch fast to lock it in.' },
];

const roastStagesEl = document.getElementById('roastStages');
if (roastStagesEl){
  roastStagesEl.innerHTML = ROAST_STAGES.map(s => `
    <div class="roast-stage">
      <span class="roast-temp">${s.temp}</span>
      <div>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </div>
    </div>
  `).join('');
}

const roastChartWrap = document.querySelector('.roast-chart-wrap');
if (roastChartWrap || roastStagesEl){
  const roastObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      roastObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  if (roastChartWrap) roastObserver.observe(roastChartWrap);
  if (roastStagesEl) roastObserver.observe(roastStagesEl);
}

