import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Carregando...");

  useEffect(() => {
    fetch("http://localhost:3001/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus("Erro ao conectar com o backend"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema da Lanchonete</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
