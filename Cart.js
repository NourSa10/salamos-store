function renderCart(){
  const container = document.getElementById('cartContainer');
  const cart = getCart();

  if (cart.length === 0){
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <h3>سلتك فارغة</h3>
        <p>لم تقم بإضافة أي منتج بعد.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:20px">ابدأ التسوق</a>
      </div>`;
    return;
  }

  let subtotal = 0;
  const items = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return '';
    const total = p.price * item.qty;
    subtotal += total;
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <div class="cat">${p.category}</div>
          <h4><a href="product.html?id=${p.id}">${p.name}</a></h4>
          <div class="price">${formatPrice(p.price)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-box" style="margin:0">
            <button type="button" class="q-minus">−</button>
            <input type="number" class="q-input" value="${item.qty}" min="1" max="99">
            <button type="button" class="q-plus">+</button>
          </div>
          <button class="remove-btn" data-remove="${p.id}">🗑 حذف</button>
        </div>
      </div>
    `;
  }).join('');

  const shipping = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-list">${items}</div>
      <aside class="summary">
        <h3>ملخّص الطلب</h3>
        <div class="summary-row"><span>المجموع الفرعي</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row">
          <span>الشحن</span>
          <span>${shipping === 0 ? '<span style="color:var(--success)">مجاني</span>' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row total"><span>الإجمالي</span><span class="val">${formatPrice(total)}</span></div>
        <a href="checkout.html" class="btn btn-primary btn-block">متابعة الدفع →</a>
        <a href="shop.html" class="btn btn-ghost btn-block">متابعة التسوق</a>
      </aside>
    </div>
  `;

  bindCartEvents();
}

function bindCartEvents(){
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.onclick = () => {
      removeFromCart(+btn.dataset.remove);
      showToast('تم حذف المنتج من السلة');
      renderCart();
    };
  });

  document.querySelectorAll('.cart-item').forEach(item => {
    const id = +item.dataset.id;
    const input = item.querySelector('.q-input');
    item.querySelector('.q-minus').onclick = () => {
      updateQty(id, +input.value - 1);
      renderCart();
    };
    item.querySelector('.q-plus').onclick = () => {
      updateQty(id, +input.value + 1);
      renderCart();
    };
    input.onchange = () => {
      updateQty(id, +input.value);
      renderCart();
    };
  });
}

document.addEventListener('DOMContentLoaded', renderCart);
