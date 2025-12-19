import { useEffect, useState } from "react";

const cardStyle = {
  flex: 1,
  padding: 20,
  background: "#1e5c3a",
  color: "#fff",
  borderRadius: 8,
  textAlign: "center",
  fontSize: 18
};

function App() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch("http://localhost:3001/alerts/expiration")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro no backend");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Resposta da API:", data);

      // Garante que alerts sempre será array
      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        setAlerts([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setAlerts([]);
      setError("Erro ao carregar alertas");
    });
}, []);


  if (error) return <p>{error}</p>;

  const expired = Array.isArray(alerts)
  ? alerts.filter(a => a.days_to_expire <= 0)
  : [];

const nearExpiration = Array.isArray(alerts)
  ? alerts.filter(a => a.days_to_expire > 0)
  : [];


  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard — Sistema da Lanchonete</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={cardStyle}>
          <h3>Próximos do vencimento</h3>
          <p>{nearExpiration.length}</p>
        </div>

        <div style={{ ...cardStyle, background: "#4a1c1c" }}>
          <h3>Vencidos</h3>
          <p>{expired.length}</p>
        </div>

        <div style={{ ...cardStyle, background: "#1c2e4a" }}>
          <h3>Total em alerta</h3>
          <p>{alerts.length}</p>
        </div>
      </div>

      <h2 style={{ marginTop: 30 }}>Detalhes</h2>

      {alerts.map((item, index) => (
        <div
          key={index}
          style={{
            background: "#222",
            padding: 15,
            marginTop: 10,
            borderRadius: 6
          }}
        >
          <h3>{item.ingredient}</h3>

          <p>Quantidade: {item.quantity}</p>
          <p>Dias para vencer: {item.days_to_expire}</p>

          <p>Custo unitário: R$ {item.unit_cost}</p>

          {item.loss > 0 && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Prejuízo: R$ {item.loss}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
