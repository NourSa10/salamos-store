let state = {
  category: 'all',
  search: '',
  sort: 'default'
};

function renderShop(){
  let list = [...PRODUCTS];

  if (state.category !== 'all'){
    list = list.filter(p => p.category === state.category);
  }

  if (state.search.trim()){
    const q = state.search.trim().toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  switch (state.sort){
    case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
    case 'price-desc': list.sort((a,b) => b.price - a.price); break;
    case 'rating':     list.sort((a,b) => b.rating - a.rating); break;
    case 'name':       list.sort((a,b) => a.name.localeCompare(b.name, 'ar')); break;
  }

  const grid = document.getElementById('shopGrid');
  const empty = document.getElementById('emptyState');

  if (list.length === 0){
    grid.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = list.map(productCardHTML).join('');
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat');
  if (cat){
    state.category = cat;
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.cat === cat);
    });
  }

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.category = tab.dataset.cat;
      renderShop();
    });
  });

  const search = document.getElementById('searchInput');
  let searchTimer;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = search.value;
      renderShop();
    }, 250);
  });

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderShop();
  });

  renderShop();
});
