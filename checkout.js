function renderCheckout(){
  const container = document.getElementById('checkoutContainer');
  const cart = getCart();

  if (cart.length === 0){
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🧾</div>
        <h3>لا يمكن إتمام الطلب</h3>
        <p>سلتك فارغة. أضف منتجات أولاً.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:20px">ابدأ التسوق</a>
      </div>`;
    return;
  }

  let subtotal = 0;
  const listHTML = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return '';
    const total = p.price * item.qty;
    subtotal += total;
    return `
      <div class="summary-row">
        <span>${p.name} × ${item.qty}</span>
        <span>${formatPrice(total)}</span>
      </div>`;
  }).join('');

  const shipping = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-layout">
      <form class="form-card" id="orderForm">
        <h3 style="margin-bottom:22px;font-size:1.2rem">معلومات التوصيل</h3>

        <div class="field-row">
          <div class="field">
            <label for="firstName">الاسم الأول</label>
            <input type="text" id="firstName" required placeholder="محمد">
          </div>
          <div class="field">
            <label for="lastName">اسم العائلة</label>
            <input type="text" id="lastName" required placeholder="بن علي">
          </div>
        </div>

        <div class="field">
          <label for="email">البريد الإلكتروني</label>
          <input type="email" id="email" required placeholder="example@mail.com">
        </div>

        <div class="field">
          <label for="phone">رقم الهاتف</label>
          <input type="tel" id="phone" required placeholder="0674218210">
        </div>

        <div class="field">
          <label for="address">العنوان الكامل</label>
          <textarea id="address" required placeholder="الشارع، المدينة، الولاية، الرمز البريدي"></textarea>
        </div>

        <div class="field">
          <label for="payment">طريقة الدفع</label>
          <select id="payment" required>
            <option value="cod">الدفع عند الاستلام</option>
            <option value="card">بطاقة بنكية (CIB / Edahabia)</option>
            <option value="transfer">تحويل بنكي / بريدي</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary btn-block">تأكيد الطلب ✓</button>
      </form>

      <aside class="summary">
        <h3>ملخّص الطلب</h3>
        ${listHTML}
        <div class="summary-row" style="margin-top:14px;border-top:1px solid var(--border);padding-top:14px">
          <span>المجموع الفرعي</span><span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>الشحن</span>
          <span>${shipping === 0 ? '<span style="color:var(--success)">مجاني</span>' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row total"><span>الإجمالي</span><span class="val">${formatPrice(total)}</span></div>
      </aside>
    </div>
  `;

  document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const orderId = 'SAL-' + Date.now().toString().slice(-6);

    localStorage.removeItem(CART_KEY);
    updateCartBadge();

    document.querySelector('.sec-head').style.display = 'none';
    container.innerHTML = `
      <div class="success-box">
        <div class="check">✓</div>
        <h2>تم استلام طلبك بنجاح!</h2>
        <p>رقم طلبك: <strong style="color:var(--accent)">${orderId}</strong><br>
        سنتواصل معك قريباً على رقم هاتفك لتأكيد التفاصيل وإتمام التوصيل.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="shop.html" class="btn btn-primary">مواصلة التسوق</a>
          <a href="index.html" class="btn btn-ghost">العودة للرئيسية</a>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', renderCheckout);
