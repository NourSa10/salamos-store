document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(location.search);
        const id = +params.get('id');
          const container = document.getElementById('productContainer');
            const p = PRODUCTS.find(x => x.id === id);

              if (!p){
                  container.innerHTML = `
                        <div class="empty-state">
                                <div class="icon">😕</div>
                                        <h3>المنتج غير موجود</h3>
                                                <p>ربما تم حذفه أو الرابط غير صحيح.</p>
                                                        <a href="shop.html" class="btn btn-primary" style="margin-top:20px">العودة للمتجر</a>
                                                              </div>`;
                                                                  return;
                                                                    }

                                                                      document.title = p.name + " — Salamo's Store";
                                                                        document.getElementById('crumbName').textContent = p.name;

                                                                          const oldHTML = p.oldPrice ? '<span class="old">' + formatPrice(p.oldPrice) + '</span>' : '';
                                                                            const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));

                                                                              const similar = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
                                                                                const similarHTML = similar.length ? `
                                                                                    <section style="padding-top:60px">
                                                                                          <div class="sec-head reveal" style="margin-bottom:40px">
                                                                                                  <div class="kicker">قد يعجبك أيضاً</div>
                                                                                                          <h2>منتجات مشابهة</h2>
                                                                                                                </div>
                                                                                                                      <div class="products-grid">${similar.map(productCardHTML).join('')}</div>
                                                                                                                          </section>
                                                                                                                            ` : '';

                                                                                                                              container.innerHTML = `
                                                                                                                                  <div class="product-detail">
                                                                                                                                        <div class="detail-image">
                                                                                                                                                <img src="${p.image}" alt="${p.name}">
                                                                                                                                                      </div>
                                                                                                                                                            <div class="detail-info">
                                                                                                                                                                    <div class="product-cat">${p.category}</div>
                                                                                                                                                                            <h1>${p.name}</h1>
                                                                                                                                                                                    <div class="product-rating">
                                                                                                                                                                                              <span class="stars">${stars}</span> ${p.rating} (${p.reviews} تقييم)
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                              <div class="detail-price">${formatPrice(p.price)}${oldHTML}</div>
                                                                                                                                                                                                                      <p class="detail-desc">${p.desc}</p>

                                                                                                                                                                                                                              <div class="qty-box">
                                                                                                                                                                                                                                        <button type="button" id="minus">−</button>
                                                                                                                                                                                                                                                  <input type="number" id="qty" value="1" min="1" max="99">
                                                                                                                                                                                                                                                            <button type="button" id="plus">+</button>
                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                            <div class="detail-actions">
                                                                                                                                                                                                                                                                                      <button class="btn btn-primary" id="addBtn">🛒 أضف إلى السلة</button>
                                                                                                                                                                                                                                                                                                <a href="cart.html" class="btn btn-ghost">عرض السلة</a>
                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                <div class="detail-meta">
                                                                                                                                                                                                                                                                                                                          <div class="row">🚚 <span>توصيل سريع خلال 24-48 ساعة</span></div>
                                                                                                                                                                                                                                                                                                                                    <div class="row">↩️ <span>إرجاع مجاني خلال 7 أيام</span></div>
                                                                                                                                                                                                                                                                                                                                              <div class="row">🔒 <span>دفع آمن 100%</span></div>
                                                                                                                                                                                                                                                                                                                                                        <div class="row">📦 <strong>متوفر في المخزون</strong></div>
                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                              ${similarHTML}
                                                                                                                                                                                                                                                                                                                                                                                `;

                                                                                                                                                                                                                                                                                                                                                                                  const qtyInput = document.getElementById('qty');
                                                                                                                                                                                                                                                                                                                                                                                    document.getElementById('minus').onclick = () => qtyInput.value = Math.max(1, +qtyInput.value - 1);
                                                                                                                                                                                                                                                                                                                                                                                      document.getElementById('plus').onclick  = () => qtyInput.value = Math.min(99, +qtyInput.value + 1);

                                                                                                                                                                                                                                                                                                                                                                                        document.getElementById('addBtn').onclick = () => {
                                                                                                                                                                                                                                                                                                                                                                                            addToCart(p.id, +qtyInput.value);
                                                                                                                                                                                                                                                                                                                                                                                              };

                                                                                                                                                                                                                                                                                                                                                                                                container.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
                                                                                                                                                                                                                                                                                                                                                                                                });
})