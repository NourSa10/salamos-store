const CART_KEY = 'salamos_cart';

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, qty = 1){
  const cart = getCart();
  const found = cart.find(item => item.id === id);
  if (found) found.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  const p = PRODUCTS.find(x => x.id === id);
  showToast('✓ تمت إضافة "' + p.name + '" إلى السلة');
}
function removeFromCart(id){
  saveCart(getCart().filter(item => item.id !== id));
}
function updateQty(id, qty){
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}
function getCartCount(){
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
function getCartTotal(){
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function updateCartBadge(){
  const badge = document.querySelector('.cart-count');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.classList.toggle('show', count > 0);
}

function formatPrice(n){
  return n.toLocaleString('fr-FR') + ' ' + CURRENCY;
}

function showToast(msg, isError = false){
  let toast = document.querySelector('.toast');
  if (!toast){
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  // ===== نظام الثيم =====
  const savedTheme = localStorage.getItem('salamos_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn){
    updateThemeBtn(themeBtn, currentTheme);
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      localStorage.setItem('salamos_theme', currentTheme);
      updateThemeBtn(themeBtn, currentTheme);
    });
  }
  // =====================

  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    const bar = document.getElementById('progress');
    if (bar){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / h * 100) + '%';
    }
  });

  if (burger && navLinks){
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
      })
    );
  }

  updateCartBadge();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});

function productCardHTML(p){
  const badgeHTML = p.badge
    ? '<span class="product-badge ' + (p.badge === 'جديد' ? 'new' : '') + '">' + p.badge + '</span>' : '';
  const oldHTML = p.oldPrice ? '<span class="old">' + formatPrice(p.oldPrice) + '</span>' : '';

  return `
    <article class="product-card reveal">
      <div class="product-thumb">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
        ${badgeHTML}
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <h3 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span>
          ${p.rating} (${p.reviews})
        </div>
        <div class="product-bottom">
          <div class="product-price">${formatPrice(p.price)}${oldHTML}</div>
          <button class="btn btn-primary btn-sm add-btn" data-id="${p.id}">أضف +</button>
        </div>
      </div>
    </article>
  `;
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-btn');
  if (btn){
    e.preventDefault();
    addToCart(+btn.dataset.id, 1);
  }
});

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
}

/* ============ قائمة الإعدادات ============ */
document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsMenu = document.getElementById('settingsMenu');

  if (settingsBtn && settingsMenu){
    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      settingsMenu.classList.remove('open');
    });
  }

  // تغيير اللغة (سنضيفه لاحقاً)
    // ============ الترجمة ============
  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-ar]').forEach(el => {
      const txt = el.getAttribute('data-' + lang);
      if (txt) el.textContent = txt;
    });

    document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
      const txt = el.getAttribute('data-' + lang + '-placeholder');
      if (txt) el.placeholder = txt;
    });
  }

  const savedLang = localStorage.getItem('salamos_lang') || 'ar';
  applyLang(savedLang);

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('salamos_lang', lang);
      applyLang(lang);
      if (settingsMenu) settingsMenu.classList.remove('open');
    });
  });
  // ===================================

  // زر الوضع الليلي
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('salamos_theme', newTheme);
      btn.textContent = newTheme === 'dark' ? '🌙 الوضع الليلي' : '☀️ الوضع النهاري';
      if (settingsMenu) settingsMenu.classList.remove('open');
    });
  });
});
function updateThemeBtn(btn, theme){
  btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  btn.title = theme === 'dark' ? 'التبديل للوضع النهاري' : 'التبديل للوضع الليلي';
}


// ============ نافذة الإعدادات ============
function openSettings(){
  const overlay = document.getElementById('settingsOverlay');
  if (overlay){
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateThemeOptions();
  }
}

function closeSettings(){
  const overlay = document.getElementById('settingsOverlay');
  if (overlay){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateThemeOptions(){
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === current);
  });
}

// إعداد مستمعي الأحداث بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // زر الإعدادات
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn){
    settingsBtn.addEventListener('click', openSettings);
  }

  // زر الإغلاق
  const closeBtn = document.querySelector('.settings-close');
  if (closeBtn){
    closeBtn.addEventListener('click', closeSettings);
  }

  // الضغط على الخلفية يغلق النافذة
  const overlay = document.getElementById('settingsOverlay');
  if (overlay){
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSettings();
    });
  }

  // زر Escape يغلق النافذة
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSettings();
  });

  // خيارات الوضع
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const newTheme = btn.dataset.theme;
      applyTheme(newTheme);
      localStorage.setItem('salamos_theme', newTheme);
      updateThemeOptions();

      // تحديث أي زر تبديل قديم إن وُجد
      const oldBtn = document.getElementById('themeToggle');
      if (oldBtn) updateThemeBtn(oldBtn, newTheme);
    });
  });
});