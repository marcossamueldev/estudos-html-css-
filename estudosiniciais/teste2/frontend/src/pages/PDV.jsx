import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function PDV(){
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    api.get('/products').then(r => setProducts(r.data));
  },[]);

  function addProduct(p){
    setCart([...cart, p]);
  }

  async function finalize(){
    if(cart.length === 0) return alert('Carrinho vazio');
    // transform to minimal items
    const items = cart.map(p => ({ product_id: p.id, quantity:1 }));
    await api.post('/orders', { items });
    setCart([]);
    alert('Pedido enviado para cozinha');
  }

  const total = cart.reduce((s,i)=>s + Number(i.price), 0);

  return (
    <div style={{ padding:20 }}>
      <h1>PDV</h1>
      <h3>Produtos</h3>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {products.map(p => (
          <button key={p.id} onClick={()=> addProduct(p)} style={{ padding:10 }}>
            {p.name} - R$ {p.price}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop:20 }}>Carrinho</h3>
      <ul>
        {cart.map((c,i)=> <li key={i}>{c.name} - R$ {c.price}</li>)}
      </ul>
      <h2>Total: R$ {total.toFixed(2)}</h2>

      <button onClick={finalize} style={{ marginTop: 10, padding:10 }}>Finalizar Pedido</button>
    </div>
  );
}
