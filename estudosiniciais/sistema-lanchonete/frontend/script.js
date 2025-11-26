// Lista de produtos (por enquanto fixa)
const produtos = [
    { id: 1, nome: "X-Salada", preco: 12.90 },
    { id: 2, nome: "X-Bacon", preco: 15.90 },
    { id: 3, nome: "Açaí 500ml", preco: 18.00 },
    { id: 4, nome: "Batata Frita", preco: 10.00 }
];

const listaProdutos = document.getElementById("lista-produtos");
const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const modalCarrinho = document.getElementById("modal-carrinho");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalEl = document.getElementById("total");

let carrinho = [];

// Carregar produtos na tela
produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card-produto");

    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="addCarrinho(${produto.id})">Adicionar</button>
    `;

    listaProdutos.appendChild(card);
});

// Função adicionar ao carrinho
function addCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    itensCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco;

        const li = document.createElement("li");
        li.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        itensCarrinho.appendChild(li);
    });

    totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Abrir e fechar modal
abrirCarrinho.onclick = () => modalCarrinho.classList.remove("hidden");
fecharCarrinho.onclick = () => modalCarrinho.classList.add("hidden");
