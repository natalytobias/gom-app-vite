import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GomForm from "./components/pages/formulario";
import Dashboard from "./components/pages/dashboard/dashboard";
import Home from "./components/pages/home";
import Documentacao from "./components/pages/documentacao";
import Sobre from "./components/pages/sobre";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<GomForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documentacao" element={<Documentacao />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
};

export default App;
