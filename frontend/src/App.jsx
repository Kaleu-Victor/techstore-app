import { useEffect } from "react";
import { useState } from "react";
import "./App.css"

function App() {
  // Criando estado para guardar os produtos
  const [produtos, setProdutos] = useState([])
  const [recomendacao, setRecomendacao] = useState(null)

  // Estados para controlar os campos do formulário
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('')

  // Estado para saber qual produto está sendo editado
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null)

  // 1. Buscar a lista de produtos
  const carregarProdutos = () => {
    fetch('http://localhost:3001/api/produtos')
    .then((res) => res.json())
    .then((dados) => setProdutos(dados))
    .catch((error) => console.error("Erro ao carregar produtos:", error))
  }
      useEffect(() => {
      carregarProdutos()
    }, [])

  // 2. Recomendação de Produto
  const buscarRecomendacao = () => {
    fetch('http://localhost:3001/api/recomendacao')
    .then((res) => res.json())
    .then((dados) => setRecomendacao(dados.produto))
    .catch((error) => console.error("Erro ao buscar recomendação:", error))
  }

  // 3. Deletar Produto
  const deletarProduto = (id) => {
    fetch(`http://localhost:3001/api/produtos/${id}`, {
      method: 'DELETE',
    })
    .then((res) => res.json())
    .then(() => carregarProdutos())
    .catch((error) => console.error("Erro ao deletar produto:", error))
  }

  // 4. Cadastrar Produto
  const cadastrarProduto = (e) => {
    e.preventDefault() // Evita que a página recarregue ao enviar o formulário

    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco),
      categoria: categoria
    }

    fetch('http://localhost:3001/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Avisa a API o envio dos dados em JSON
      },
      body: JSON.stringify(novoProduto) // Converte o objeto JS em texto JSON
    })
      .then((res) => res.json())
      .then(() => {
        carregarProdutos()
        setNome('')
        setPreco('')
        setCategoria('')
      })
      .catch((error) => console.error("Erro ao cadastrar produto:", error))
  }

  // 5. Iniciar Edição
  const iniciarEdicao = (produto) => {
    setProdutoEmEdicao(produto) // Guarda o produto (e o id dele)
    setNome(produto.nome)       // Coloca o nome no input
    setPreco(produto.preco)     // Coloca o preço no input
    setCategoria(produto.categoria) // Coloca a categoria no input
  }

  // 6. Atualizar Produto
  const atualizarProduto = (e) => {
  e.preventDefault()

  const produtoAtualizado = {
    nome: nome,
    preco: parseFloat(preco),
    categoria: categoria
  }
  fetch(`http://localhost:3001/api/produtos/${produtoEmEdicao.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produtoAtualizado)
  })
    .then((res) => res.json())
    .then(() => {
      carregarProdutos()       // Atualiza a lista
      setProdutoEmEdicao(null) // Sai do modo de edição
      setNome('')
      setPreco('')
      setCategoria('')
    })
    .catch((error) => console.error("Erro ao atualizar produto:", error))
  }
  
  return (
    <div className="app-container">
      <h1>TechStore - Catálogo</h1>

      {/* FORMULÁRIO DE CADASTRO / EDIÇÃO */}

      <form
        onSubmit={produtoEmEdicao ? atualizarProduto : cadastrarProduto}
        className={`form-container ${produtoEmEdicao ? 'em-edicao' : ''}`}
      >
        <h3>{produtoEmEdicao ? 'Alterar Produto' : 'Cadastrar Novo Produto'}</h3>

        <div className="form-group">
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            step="1"
            placeholder="Preço (ex: 99.90)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Categoria (ex: Periféricos)"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            className={produtoEmEdicao ? 'btn-salvar' : 'btn-cadastrar'}
          >
            {produtoEmEdicao ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </button>

          {produtoEmEdicao && (
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => {
                setProdutoEmEdicao(null)
                setNome('')
                setPreco('')
                setCategoria('')
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* SEÇÃO DE RECOMENDAÇÃO */}
      <div className="recomendacao-card">
        <button onClick={buscarRecomendacao} className="btn-sugestao">
          Pedir Sugestão Inteligente
        </button>

        {recomendacao && (
          <div className="recomendacao-resultado">
            <p>Sugestão para você:</p>
            <span>{recomendacao.nome} - R$ {recomendacao.preco.toFixed(2)}</span>
          </div>
        )}
      </div>

      <h3>Produtos Disponíveis:</h3>

      {/* LISTA DE PRODUTOS */}
      <ul className="produtos-lista">
        {produtos.map((produto) => (
          <li key={produto.id} className="produto-item">
            <div className="produto-info">
              <strong>{produto.nome}</strong>
              <p>Categoria: {produto.categoria}</p>
              <span className="preco">
                R$ {produto.preco.toFixed(2)}
              </span>
            </div>

            {/* ÁREA DOS BOTÕES */}

            <div className="acoes-btn">
              <button
                onClick={() => iniciarEdicao(produto)}
                className="btn-editar"
              >
                ✏️
              </button>

              <button
                onClick={() => deletarProduto(produto.id)}
                className="btn-excluir"
              >
                🗑️ Excluir
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default App