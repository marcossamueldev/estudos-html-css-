import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PDV from "./pages/PDV";
import Kitchen from "./pages/Kitchen";
import Dashboard from "./pages/Dashboard";

export default function App(){
  return (
    <BrowserRouter>
      <div style={{ padding: 12 }}>
        <nav style={{ marginBottom:12 }}>
          <Link to="/" style={{ marginRight:10 }}>PDV</Link>
          <Link to="/cozinha" style={{ marginRight:10 }}>Cozinha</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PDV />} />
          <Route path="/cozinha" element={<Kitchen />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
