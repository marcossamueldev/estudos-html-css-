const produtosContainer = document.getElementById("produtos");
const botoes = document.querySelectorAll("nav button");

async function carregarProdutos(categoria = "all") {
    let url = "https://fakestoreapi.com/products";
    if (categoria !== "all") {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(categoria)}`;
    }
    const resposta = await fetch(url);
    const produtos = await resposta.json();

    exibirProdutos(produtos);
}

function exibirProdutos(lista) {
produtosContainer.innerHTML = "";

lista.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("produto");

    div.innerHTML = `
        <img src="${produto.image}" alt="${produto.title}">
        <h3>${produto.title}</h3>
        <p>R$ ${(produto.price * 5).toFixed(2)}</p>
        `;

        div.addEventListener("click", () => {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });
        produtosContainer.appendChild(div);
});
}

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        carregarProdutos(botao.dataset.category);
    });
});
carregarProdutos();