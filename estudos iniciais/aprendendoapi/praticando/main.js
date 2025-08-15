const api =  "https://fakestoreapi.com/products";
const div = document.getElementById("detalhe");

async function buscarapi () {
    try {
        const resposta = await fetch(api);
        if (!resposta.ok) {
            throw new Error(`http error! status: ${resposta.status}`);
        }
        const produto = await resposta.json();
        console.log(produto);
        div.innerHTML = produto.map(produto =>`
        <div class="cartao">
        <img src="${produto.image}" alt="${produto.title}">
        <h2>${produto.title}</h2>
        <p>${produto.description}</p>
        <p class="preço">Preço: $${produto.price}</p>
        </div>`).join('');

    } catch (error) {
        console.error("Erro ao buscar a API:", error);
    }
}
buscarapi();