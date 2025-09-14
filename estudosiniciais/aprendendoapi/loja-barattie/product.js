// product.js - exibe detalhe de um produto via ?id=123
const detalheContainer = document.getElementById('detalhe');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  detalheContainer.innerHTML = '<p>Produto não encontrado (id ausente).</p>';
} else {
  carregarProduto(id);
}

async function carregarProduto(idProd) {
  try {
    detalheContainer.innerHTML = '<p>Carregando produto...</p>';
    const url = `https://fakestoreapi.com/products/${encodeURIComponent(idProd)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const prod = await res.json();

    detalheContainer.innerHTML = `
      <button onclick="window.history.back()" style="margin-bottom:12px;padding:8px 10px;border-radius:6px;">← Voltar</button>
      <div style="display:grid;grid-template-columns: 1fr 1fr; gap:20px; align-items:start;">
        <div>
          <img src="${prod.image}" alt="${escapeHtml(prod.title)}" style="width:100%;max-width:520px;height:420px;object-fit:contain;background:#fff;border-radius:8px;border:1px solid rgba(0,0,0,0.04);padding:12px;">
        </div>
        <div>
          <h1 style="margin-bottom:8px;">${escapeHtml(prod.title)}</h1>
          <p style="color:#0f766e;font-weight:700;font-size:20px;">R$ ${(prod.price * 5).toFixed(2)}</p>
          <p style="margin-top:12px;">${escapeHtml(prod.description)}</p>
          <p style="margin-top:12px;color:#6b7280;"><strong>Categoria:</strong> ${escapeHtml(prod.category)}</p>
          <div style="margin-top:18px;">
            <button style="background:#ff7a18;color:#fff;padding:10px 14px;border-radius:8px;border:none;font-weight:700;cursor:pointer;">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    detalheContainer.innerHTML = '<p>Erro ao carregar produto. Confira console.</p>';
    console.error(err);
  }
}

// escape helper
function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;'
  }[s]));
}