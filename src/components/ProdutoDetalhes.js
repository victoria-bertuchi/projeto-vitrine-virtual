import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { produtos } from '../data';

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === parseInt(id));
  
  const [cep, setCep] = useState('');
  
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cidade: '',
    estado: ''
  });
  const [erroCep, setErroCep] = useState('');

  const buscarFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      alert('Por favor, digite o CEP completo (8 números).');
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setErroCep('CEP não encontrado.');
        setEndereco({ rua: '', numero: '', cidade: '', estado: '' });
      } else {
        setErroCep('');
        setEndereco({
          rua: dados.logradouro,
          numero: '', 
          cidade: dados.localidade,
          estado: dados.uf
        });
      }
    } catch (error) {
      setErroCep('Erro de conexão ao buscar o CEP.');
    }
  };

  const realizarCompra = () => {
    if (endereco.rua === '' || endereco.numero === '') {
        alert("Por favor, preencha o CEP e o número da residência antes de comprar.");
        return;
    }
    alert(`🎉 Compra realizada com sucesso!\nEnviaremos para: ${endereco.rua}, ${endereco.numero} - ${endereco.cidade}`);
  };

  if (!produto) return <h2 className="text-center mt-5">Produto não encontrado!</h2>;

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-5">
            <img src={produto.imagem} className="img-fluid rounded-start w-100 h-100" style={{objectFit: 'cover'}} alt={produto.nome} />
          </div>
          
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title">{produto.nome}</h3>
              <h4 className="text-primary my-3">R$ {produto.preco.toFixed(2)}</h4>
              <p><strong>Descrição:</strong> {produto.descricao}</p>
              <p><strong>Fabricante:</strong> {produto.fabricante}</p>
              <p><strong>Especificação:</strong> {produto.especificacao}</p>
              <hr />
              
              <div className="bg-light p-3 rounded mb-3">
                <h5 className="mb-3">Endereço de Entrega</h5>
                
                <div className="input-group mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Digite seu CEP" 
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9} 
                  />
                  <button className="btn btn-primary" onClick={buscarFrete}>
                    Buscar
                  </button>
                </div>

                {erroCep && <div className="alert alert-danger">{erroCep}</div>}

                <div className="row g-2">
                    <div className="col-9">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rua / Logradouro" 
                            value={endereco.rua} 
                            disabled 
                        />
                    </div>
                    <div className="col-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nº" 
                            value={endereco.numero}
                            onChange={(e) => setEndereco({...endereco, numero: e.target.value})} 
                        />
                    </div>

                    <div className="col-8">
                        <input type="text" className="form-control" placeholder="Cidade" value={endereco.cidade} disabled />
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" placeholder="Estado" value={endereco.estado} disabled />
                    </div>
                </div>
                
                {endereco.cidade && <p className="text-success mt-2 small">✅ Entrega disponível para esta região.</p>}
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-success btn-lg" onClick={realizarCompra}>
                    Finalizar Compra
                </button>
                <Link to="/" className="btn btn-outline-secondary">
                    Continuar Comprando
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhes;