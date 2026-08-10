const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Banco em memória
const produtos = [
  { id: 1, nome: "Fone Bluetooth Noise Canceling", preco: 299.90, categoria: "Audio", quantidade: 15 },
  { id: 2, nome: "Teclado Mecânico RGB", preco: 180.00, categoria: "Periféricos", quantidade: 8 },
  { id: 3, nome: "Mouse Sem Fio Ergonômico", preco: 120.00, categoria: "Periféricos", quantidade: 20 }
];

// 1. GET - Listar
app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

// 2. POST - Cadastrar
app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria, quantidade } = req.body;
    const precoNumero = parseFloat(preco);

    // Validação de Preço Negativo / Inválido
    if (isNaN(precoNumero) || precoNumero < 0) {
        return res.status(400).json({ message: "O preço deve ser um valor positivo." });
    }

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco: precoNumero,
        categoria,
        quantidade: parseInt(quantidade) || 0
    };

    produtos.push(novoProduto);
    res.status(201).json({ message: "Produto cadastrado com sucesso!", produto: novoProduto });
});

// 3. DELETE - Remover
app.delete('/api/produtos/:id', (req, res) => {
    const idNumero = parseInt(req.params.id);
    const indice = produtos.findIndex(p => p.id === idNumero);

    if (indice === -1) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    produtos.splice(indice, 1);
    res.json({ message: "Produto deletado" });
});

// 4. PUT - Atualizar
app.put('/api/produtos/:id', (req, res) => {
    const idNumero = parseInt(req.params.id);
    const { nome, preco, categoria, quantidade } = req.body;

    const produto = produtos.find(p => p.id === idNumero);

    if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (preco !== undefined) {
        const precoNumero = parseFloat(preco);
        if (isNaN(precoNumero) || precoNumero < 0) {
            return res.status(400).json({ message: "O preço deve ser um valor positivo." });
        }
        produto.preco = precoNumero;
    }

    produto.nome = nome || produto.nome;
    produto.categoria = categoria || produto.categoria;
    produto.quantidade = quantidade !== undefined ? parseInt(quantidade) : produto.quantidade;

    res.json({ message: "Produto atualizado com sucesso", produto });
});

app.listen(3001, () => {
    console.log("✅ Servidor rodando na porta 3001!");
});