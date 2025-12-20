import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard(){
  const [expiration, setExpiration] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);

  useEffect(()=>{
    api.get('/alerts/expiration').then(r=>setExpiration(r.data));
    api.get('/stock/alerts').then(r=>setStockAlerts(r.data));
  },[]);

  const loss = expiration.reduce((s,i) => s + (i.loss || 0), 0);

  return (
    <div style={{ padding:20 }}>
      <h1>Dashboard</h1>

      <h3>Alertas de Validade</h3>
      {expiration.map((e, idx)=> (
        <div key={idx} style={{ marginBottom:8 }}>
          {e.ingredient} — Qtd: {e.quantity} — Dias: {e.days_to_expire} — Prejuízo R$ {e.loss.toFixed(2)}
        </div>
      ))}

      <h3 style={{ marginTop:20 }}>Alertas de estoque</h3>
      {stockAlerts.map((s, idx)=> (
        <div key={idx}>{s.ingredient} — atual: {s.current_quantity} — min: {s.min_quantity} — perda: R$ {s.potential_loss}</div>
      ))}

      <h3 style={{ marginTop:20 }}>Prejuízo total estimado: R$ {loss.toFixed(2)}</h3>
    </div>
  );
}
