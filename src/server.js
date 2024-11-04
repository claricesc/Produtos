const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
300
// Conexão com o banco de dados MySQL
const conexao = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'produtos'
});
conexao.connect((erro) => {
 if (erro) {
 console.error('Erro ao conectar com o banco de dados:', erro);
 } else {
 console.log('Conectado ao banco de dados MySQL.');
 }
});
 
// Rota para inserir um novo produto
app.post('/produtos', (req, res) => {
 const {nome_produto, quantidade, preco, validade, data_compra, valor_total, fornecedor, contato_fornecedor, observacao} = req.body;
 const query = 'INSERT INTO produtos (nome_produto, quantidade, preco, validade, data_compra, valor_total, fornecedor, contato_fornecedor, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
 conexao.query(query, [nome_produto, quantidade, preco, validade, data_compra, valor_total, fornecedor, contato_fornecedor, observacao], (erro) => {
 if (erro) {
 res.status(500).send('Erro ao cadastrar produto');
 } else {
 res.send('Produto cadastrado com sucesso!');
 }
 });
});
// Inicializa o servidor
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
   });