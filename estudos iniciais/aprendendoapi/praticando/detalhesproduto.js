const api = "https://fakestoreapi.com/products";
const div = document.getElementById("detalhes-produtos");

function obteridproduto( ) {
    const params = new URLSearchParams(window.location.search);
    return params.get("id")
}
async function buscardetalhesprodutos() {
    const id = obteridproduto();
    try {
        const resposta = await fetch(`${api}/${id}`);
        if (!resposta.ok) {
            throw new Error (`http error! status: ${resposta.status}`);
        }
        const produto = await resposta.json();
        div.innerHTML = `
        <div class="imagem-produto">
        <img src="${produto.image}" alt="${produto.title}"></div>
        <div class="info-produto">
        <h2>${produto.title}</h2>
        <p>${produto.description}</p>
        <p class="preço">Preço: R$ ${produto.price}</p>
        <button class="btn-comprar">Comprar</button>
        </div>`;
    } catch (error) {
    console.error("Erro ao buscar detalhes do produto:", error);
}
} 
buscardetalhesprodutos();