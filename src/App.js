import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function App() {
  const [nome_produto, setnome_produto] = useState('');
  const [quantidade, setquantidade] = useState('');
  const [preco, setpreco] = useState('');
  const [validade, setvalidade] = useState('');
  const [data_compra, setdata_compra] = useState('');
  const [valor_total, setvalor_total] = useState('');
  const [fornecedor, setfornecedor] = useState('');
  const [contato_fornecedor, setcontato_fornecedor] = useState('');
  const [observacao, setobservacao] = useState('');
  const [lucro_esperado, setlucro_esperado] = useState(0);  // Novo estado para o lucro esperado

  // Função para calcular o lucro esperado
  useEffect(() => {
    if (preco && quantidade) {
      const lucro = (parseFloat(preco) * parseInt(quantidade));
      setlucro_esperado(lucro.toFixed(2));  // Calcula e formata o lucro para 2 casas decimais
    }
  }, [preco, quantidade, valor_total]);  // Recalcula sempre que preco, quantidade ou valor_total mudarem

  const envio = (event) => {
    event.preventDefault();
    const novoproduto = { nome_produto, quantidade, preco, validade, data_compra, valor_total, fornecedor, contato_fornecedor, observacao };

    axios.post('http://localhost:3001/produtos', novoproduto)
      .then(() => {
        alert('Produto cadastrado com sucesso!');
      })
      .catch((erro) => {
        alert('Erro ao cadastrar produto: ' + erro.message);
      });
  };

  return (
    <>
      <Container>
        <h1 className="centro mt-3" style={{ marginBottom: '40px' }}>Cadastro de produtos</h1>
        <Row>
          <Col sm={1}></Col>
          <Col sm={1}></Col>
          <Col sm={8}>
            <div>
              <form onSubmit={envio}>
                <div className='c'>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ flex: 1 }}>
                      <div>Nome do produto:</div>
                      <input name="nome" type="text" placeholder='Digite o nome do produto'
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={nome_produto} onChange={(e) => setnome_produto(e.target.value)}
                        required />
                      <div>Preço:</div>
                      <input name="preco" type="number" placeholder='Informe o preço'
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={preco} onChange={(e) => setpreco(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <label>
                      <div>Quantidade:</div>
                      <input name="quantidade" type="number" placeholder='Insira a quantidade'
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={quantidade} onChange={(e) => setquantidade(e.target.value)}
                        required />
                      <div>Validade:</div>
                      <input name="validade" type="date"
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={validade} onChange={(e) => setvalidade(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <label>
                      <div>Data da compra:</div>
                      <input name="data_compra" type="date"
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={data_compra} onChange={(e) => setdata_compra(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <label>
                      <div>Valor pago no lote:</div>
                      <input name="valor_total" type="number"
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={valor_total} onChange={(e) => setvalor_total(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <label>
                      <div>Nome do fornecedor:</div>
                      <input name="fornecedor" type="text"
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={fornecedor} onChange={(e) => setfornecedor(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <label>
                      <div>Contato do fornecedor:</div>
                      <input name="contato_fornecedor" type="text"
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={contato_fornecedor} onChange={(e) => setcontato_fornecedor(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <label>
                      <div>Observação:</div>
                      <input name="observacao" type="text"
                        style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        value={observacao} onChange={(e) => setobservacao(e.target.value)}
                        required />
                    </label>
                  </div>
                  <div>
                    <Button type="submit" className='button button5'
                      style={{ borderRadius: '4px' }}>Enviar</Button>
                  </div>
                </div>
              </form>
              <div style={{ marginTop: '20px' }}>
                <h4>Lucro Esperado: R$ {lucro_esperado}</h4> {/* Exibe o lucro esperado */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
