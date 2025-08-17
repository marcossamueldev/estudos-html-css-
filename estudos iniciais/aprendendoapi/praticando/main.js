const api = "https://fakestoreapi.com/products";
const div = document.getElementById("detalhe");
const categorias = document.querySelectorAll('.menu-categorias a');

async function buscarapi() {
    try {
        const resposta = await fetch(api);
        if (!resposta.ok) {
            throw new Error(`http error! status: ${resposta.status}`);
        }
        const produtos = await resposta.json();
        console.log(produtos);
        exibirProdutos(produtos); // Exibe todos os produtos inicialmente

        // Adiciona evento de clique a cada categoria
        categorias.forEach(categoria => {
            categoria.addEventListener('click', (event) => {
                event.preventDefault(); // Impede o comportamento padrão do link
                const categoriaSelecionada = categoria.getAttribute('data-categoria'); // Obtém a categoria selecionada

                // Filtra os produtos com base na categoria selecionada
                const produtosFiltrados = categoriaSelecionada === 'todos' 
                    ? produtos 
                    : produtos.filter(produto => produto.category === categoriaSelecionada);

                exibirProdutos(produtosFiltrados); // Exibe os produtos filtrados
            });
        });

    } catch (error) {
        console.error("Erro ao buscar a API:", error);
    }
}

// Função para exibir produtos
function exibirProdutos(produtos) {
    div.innerHTML = produtos.map(produto => `
        <a href='detalhesproduto.html?id=${produto.id}' target="_blank" class="cartao">
            <img src="${produto.image}" alt="${produto.title}">
            <h2>${produto.title}</h2>
            <p>${produto.description}</p>
            <p class="preço">Preço: $${produto.price}</p>
        </a>`).join('');
}

buscarapi();
