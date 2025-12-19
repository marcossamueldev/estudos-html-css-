import { useEffect, useState } from "react";

export default function StockAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/stock-alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando alertas...</p>;

  if (alerts.length === 0) {
    return <p>✅ Nenhum alerta de estoque no momento</p>;
  }

  return (
    <div>
      <h2>🔴 Alertas de Estoque</h2>

      <ul>
        {alerts.map((item, index) => (
          <li key={index}>
            <strong>{item.ingredient}</strong> — Quantidade:{" "}
            {item.current_quantity} (mínimo: {item.min_quantity}) —{" "}
            <span style={{ color: "red" }}>
              Prejuízo potencial: R$ {item.potential_loss}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
