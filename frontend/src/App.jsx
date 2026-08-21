import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro onAdminClick={() => setShowLogin(true)} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </Router>
  );
}

export default App;
