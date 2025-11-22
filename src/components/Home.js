import React from 'react';
import { Link } from 'react-router-dom';
import { produtos } from '../data'; 

const Home = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Vitrine Virtual</h2>
      <div className="row">
        {produtos.map((produto) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={produto.id}>
            <div className="card shadow-sm h-100">
              <img 
                src={produto.imagem} 
                className="card-img-top" 
                alt={produto.nome}
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text text-muted">{produto.descricao}</p>
                <h4 className="card-text text-primary">R$ {produto.preco.toFixed(2)}</h4>
                
                <Link to={`/produto/${produto.id}`} className="btn btn-primary mt-auto">
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;