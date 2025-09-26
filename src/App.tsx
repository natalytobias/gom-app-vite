import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GomForm from './components/formulario';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/formulario" element={<GomForm />} />
      </Routes>
    </Router>
  )
}

export default App;
