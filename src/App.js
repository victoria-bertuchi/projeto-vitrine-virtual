import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProdutoDetalhes from './components/ProdutoDetalhes';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              🛍️ VitrineVirtual
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Produtos</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex-grow-1 py-4 bg-light">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/produto/:id" element={<ProdutoDetalhes />} />
           </Routes>
        </div>

        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0">&copy; 2025 Vitrine Virtual - Trabalho Prático IFPR</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;