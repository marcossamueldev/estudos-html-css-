document.addEventListener("DOMContentLoaded", () => {
    const produtos = [
        { id: 1, nome: "X-Salada", preco: 12.50 },
        { id: 2, nome: "X-Bacon", preco: 15.00 },
        { id: 3, nome: "Coca-Cola Lata", preco: 6.00 },
        { id: 4, nome: "Batata Frita", preco: 10.00 }
    ];

    const lista = document.getElementById("produtos-list");

    produtos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <h3>${prod.nome}</h3>
            <p>R$ ${prod.preco.toFixed(2)}</p>
            <button class="btn-add">Adicionar</button>
        `;
        lista.appendChild(div);
    });
});
let cart = [];

function addToCart(item) {
    const existing = cart.find(p => p.nome === item.nome);

    if (existing) {
        existing.qtd++;
    } else {
        cart.push({ ...item, qtd: 1 });
    }

    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(prod => {
        const li = document.createElement("li");
        const subtotal = prod.preco * prod.qtd;
        total += subtotal;

        li.innerHTML = `
            ${prod.nome} (x${prod.qtd}) - R$ ${subtotal.toFixed(2)}
            <button onclick="removeFromCart('${prod.nome}')">Remover</button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(nome) {
    cart = cart.filter(prod => prod.nome !== nome);
    renderCart();
}
document.getElementById("checkout-btn").addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
});
