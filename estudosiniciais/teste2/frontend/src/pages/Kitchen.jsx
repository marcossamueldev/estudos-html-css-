import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Kitchen(){
  const [orders, setOrders] = useState([]);

  async function load(){
    const r = await api.get('/kitchen/orders');
    setOrders(r.data);
  }

  useEffect(()=>{
    load();
    const t = setInterval(load, 3000);
    return ()=>clearInterval(t);
  },[]);

  async function setStatus(id, status){
    await api.patch(`/kitchen/orders/${id}/status`, { status });
    load();
  }

  return (
    <div style={{ padding:20 }}>
      <h1>Cozinha</h1>
      {orders.map(o => (
        <div key={o.id} style={{ border:'1px solid #333', padding:10, marginBottom:10 }}>
          <div>Pedido #{o.id} — {o.status}</div>
          <ul>
            {o.items.map((it,idx)=> <li key={idx}>{it.name} x {it.quantity}</li>)}
          </ul>
          <button onClick={()=> setStatus(o.id,'PREPARING')}>Preparar</button>
          <button onClick={()=> setStatus(o.id,'DONE')}>Pronto</button>
        </div>
      ))}
    </div>
  );
}
