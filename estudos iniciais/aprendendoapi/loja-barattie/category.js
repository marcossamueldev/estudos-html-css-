// category.js - carrega produtos de uma categoria (ou todos)
// lê ?cat=<categoria> da URL

const produtosContainer = document.getElementById('produtos');
const titulo = document.getElementById('categoriaTitulo');

// obtém categoria da query string
const params = new URLSearchParams(window.location.search);
let categoria = params.get('cat') || 'all';

// mostra título legível
function legivelCategoria(cat) {
  if (cat === 'all') return 'Todos os produtos';
  if (cat === "men's clothing") return 'Roupas Masculinas';
  if (cat === "women's clothing") return 'Roupas Femininas';
  if (cat === 'electronics') return 'Eletrônicos';
  return cat;
}
titulo.textContent = legivelCategoria(categoria);

// Função: busca produtos (codifica a categoria)
async function fetchByCategory(cat) {
  try {
    let url = 'https://fakestoreapi.com/products';
    if (cat !== 'all') {
      url = `https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`;
    }
    console.log('Buscando URL:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Erro na busca por categoria:', err);
    throw err;
  }
}

// Reusar renderização de cards (mesmo visual do main.js)
function renderProducts(list) {
  produtosContainer.innerHTML = '';
  if (!Array.isArray(list) || list.length === 0) {
    produtosContainer.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
    return;
  }
  list.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${escapeHtml(prod.title)}">
      <h3>${escapeHtml(prod.title)}</h3>
      <p class="price">R$ ${(prod.price * 5).toFixed(2)}</p>
    `;
    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${encodeURIComponent(prod.id)}`;
    });
    produtosContainer.appendChild(card);
  });
}

// escape simples
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[s]));
}

// carregar ao abrir a página
(async function initCategory() {
  try {
    produtosContainer.innerHTML = '<p>Carregando produtos...</p>';
    const produtos = await fetchByCategory(categoria);
    renderProducts(produtos);
  } catch (err) {
    produtosContainer.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
})();