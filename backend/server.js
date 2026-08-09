const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares (Configurações da API)
app.use(cors()); // Libera conexões externas (como o React)
app.use(express.json()); // Permite que a API entenda dados em formato JSON

// "Banco de dados" temporário em memória
const produtos = [
  { id: 1, nome: "Fone Bluetooth Noise Canceling", preco: 299.90, categoria: "Audio" },
  { id: 2, nome: "Teclado Mecânico RGB", preco: 180.00, categoria: "Periféricos" },
  { id: 3, nome: "Mouse Sem Fio Ergonômico", preco: 120.00, categoria: "Periféricos" }
];

// 1. GET
app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

// 2. GET: Simulando uma recomendação de produto
app.get('/api/recomendacao', (req, res) => {
    const produtoAleatorio = produtos[Math.floor(Math.random() * produtos.length)];
    res.json({
        mensagem: "Sugestão inteligente com base em suas preferências: ",
        produto: produtoAleatorio
    });
});

// 3. POST
app.post('/api/produtos', (req, res) => {
    const {nome, preco, categoria} = req.body;
    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco: parseFloat(preco),
        categoria
    };
    produtos.push(novoProduto);
    res.status(201).json({mensagem: "Produto cadastrado com sucesso!", produto: novoProduto});
});

// 4. DELETE
app.delete('/api/produtos/:id', (req, res) => {
    const {id} = req.params;

    const idNumero = parseInt(id);
    const indice = produtos.findIndex(p => p.id === idNumero)

    if(indice == -1){
        return res.status(404).json({message: "Produto não encontrado"})
    }

    // Remove o produto do array
    produtos.splice(indice, 1);

    res.json({message: "Produto deletado"});
});

// 5. PUT
app.put('/api/produtos/:id', (req,res) => {
    const {id} = req.params;
    const {nome, preco, categoria} = req.body;

    const idNumero = parseInt(id);
    const produto = produtos.find(p => p.id === idNumero)

    if(!produto){
        return res.status(404).json({message: "Produto não encontrado"})
    }

    produto.nome = nome || produto.nome;
    produto.preco = preco || produto.preco;
    produto.categoria = categoria || produto.categoria;

    res.json({message: "Produto atualizado com sucesso", produto});
});

// Ligando o servidor
app.listen(3001, () => {
    console.log("✅ Servidor rodando na porta 3001!");
});