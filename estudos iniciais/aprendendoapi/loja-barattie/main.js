// URL base da API
const API_URL = "https://fakestoreapi.com/products";

// Função para carregar todos os produtos
async function carregarProdutos() {
    try {
        const resposta = await fetch(API_URL);
        const produtos = await resposta.json();
        exibirProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

// Função para carregar produtos por categoria
async function carregarProdutosPorCategoria(categoria) {
    try {
        // encodeURIComponent evita problemas com espaços e apóstrofos na URL
        const resposta = await fetch(`${API_URL}/category/${encodeURIComponent(categoria)}`);
        const produtos = await resposta.json();
        exibirProdutos(produtos);
    } catch (erro) {
        console.error("Erro ao carregar categoria:", erro);
    }
}

// Função para exibir os produtos no HTML
function exibirProdutos(produtos) {
    const container = document.getElementById("produtos");
    container.innerHTML = ""; // Limpa o conteúdo antes de adicionar

    produtos.forEach(produto => {
        const item = document.createElement("div");
        item.classList.add("produto");

        item.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <p>Preço: R$ ${(produto.price * 5.2).toFixed(2)}</p>
            <a href="detalhes.html?id=${produto.id}">Ver Detalhes</a>
        `;

        container.appendChild(item);
    });
}

// Se estiver na página principal, carrega todos os produtos
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    carregarProdutos();
}

// Se estiver na página de categorias
if (window.location.pathname.includes("categoria.html")) {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
    if (categoria) {
        carregarProdutosPorCategoria(categoria);
    }
}

// Se estiver na página de detalhes
if (window.location.pathname.includes("detalhes.html")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
        carregarDetalhesProduto(id);
    }
}

// Função para carregar detalhes do produto
async function carregarDetalhesProduto(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`);
        const produto = await resposta.json();
        const container = document.getElementById("detalhes-produto");

        container.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}">
            <h2>${produto.title}</h2>
            <p>${produto.description}</p>
            <p>Preço: R$ ${(produto.price * 5.2).toFixed(2)}</p>
            <a href="index.html">Voltar</a>
        `;
    } catch (erro) {
        console.error("Erro ao carregar detalhes do produto:", erro);
    }
}