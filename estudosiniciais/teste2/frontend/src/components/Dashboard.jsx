import { useEffect, useState } from "react";

function Dashboard() {
  const [alertsCount, setAlertsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/stock/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlertsCount(data.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
      <div
        style={{
          padding: 20,
          borderRadius: 8,
          background: alertsCount > 0 ? "#ffe0e0" : "#e0ffe0",
          minWidth: 200,
        }}
      >
        <h3>Alertas de Estoque</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <p style={{ fontSize: 24, fontWeight: "bold" }}>
            {alertsCount}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
