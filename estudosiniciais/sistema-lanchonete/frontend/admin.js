// Buscar pedidos do backend
async function carregarPedidos() {
    const res = await fetch("http://localhost:3001/pedidos");
    const pedidos = await res.json();

    const tabela = document.getElementById("lista-pedidos");
    tabela.innerHTML = "";

    pedidos.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.mesa}</td>
            <td>R$ ${p.total}</td>
            <td>
                <select onchange="atualizarStatus(${p.id}, this.value)">
                    <option value="recebido" ${p.status === "recebido" ? "selected" : ""}>Recebido</option>
                    <option value="preparando" ${p.status === "preparando" ? "selected" : ""}>Preparando</option>
                    <option value="entrega" ${p.status === "entrega" ? "selected" : ""}>Saiu p/ Entrega</option>
                    <option value="concluido" ${p.status === "concluido" ? "selected" : ""}>Concluído</option>
                </select>
            </td>
            <td>
                <button onclick="verItens(${p.id})">Ver Itens</button>
            </td>
            <td>
                <button class="danger" onclick="excluirPedido(${p.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(tr);
    });
}

carregarPedidos();

// Atualizar status
async function atualizarStatus(id, novoStatus) {
    await fetch(`http://localhost:3001/pedidos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus })
    });

    alert("Status atualizado!");
}

// Mostrar itens do pedido
async function verItens(id) {
    const res = await fetch(`http://localhost:3001/pedidos/${id}`);
    const pedido = await res.json();

    let texto = `Itens do Pedido ${id}\n\n`;

    pedido.itens.forEach(i => {
        texto += `${i.nome} x${i.quantidade} - R$ ${i.preco}\n`;
    });

    alert(texto);
}

// Excluir pedido
async function excluirPedido(id) {
    const confirmar = confirm("Deseja realmente excluir este pedido?");
    if (!confirmar) return;

    await fetch(`http://localhost:3001/pedidos/${id}`, {
        method: "DELETE"
    });

    alert("Pedido removido!");
    carregarPedidos();
}
