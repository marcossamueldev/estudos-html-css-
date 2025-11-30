// Recebe o carrinho vindo da página anterior
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Renderiza o resumo do pedido
function renderResumo() {
    const resumo = document.getElementById("resumo");
    const totalFinal = document.getElementById("total-final");

    resumo.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        const subtotal = item.preco * item.qtd;
        total += subtotal;

        li.textContent = `${item.nome} x${item.qtd} - R$ ${subtotal.toFixed(2)}`;
        resumo.appendChild(li);
    });

    totalFinal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

renderResumo();


// Envio do pedido ao backend
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const pedido = {
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        pagamento: document.getElementById("pagamento").value,
        obs: document.getElementById("obs").value,
        itens: cart
    };

    try {
        const response = await fetch("http://localhost:3000/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });

        alert("Pedido enviado com sucesso!");

        // limpa o carrinho
        localStorage.removeItem("cart");

        window.location.href = "index.html";

    } catch (error) {
        alert("Erro ao enviar pedido.");
        console.error(error);
    }
});
