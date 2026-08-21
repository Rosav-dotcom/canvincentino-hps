import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <nav style={{ backgroundColor: '#34495e', padding: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Registro</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
