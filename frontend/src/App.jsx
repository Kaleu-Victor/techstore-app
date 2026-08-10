import { useEffect } from "react";
import { useState } from "react";
import "./App.css"

function App() {
  // Criando estado para guardar os produtos
  const [produtos, setProdutos] = useState([])

  // Estados para controlar os campos do formulário
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('')
  const [quantidade, setQuantidade] = useState('')

  // Estado para saber qual produto está sendo editado
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null)

  // Estado para controlar o modal de exclusão
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null)

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


  // 2. Abre o modal de exclusão guardando o produto selecionado
  const confirmarExclusao = (produto) => {
    setProdutoParaExcluir(produto)
  }  

  // 3. Deletar Produto
  const deletarProduto = () => {
    if (!produtoParaExcluir) return

    fetch(`http://localhost:3001/api/produtos/${produtoParaExcluir.id}`, {
      method: 'DELETE',
    })
    .then((res) => res.json())
    .then(() => {
      carregarProdutos()
      setProdutoParaExcluir(null)
    })
    .catch((error) => console.error("Erro ao deletar produto:", error))
  }

  // 3. Cadastrar Produto
  const cadastrarProduto = (e) => {
    e.preventDefault() // Evita que a página recarregue ao enviar o formulário

    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco),
      categoria: categoria,
      quantidade: parseInt(quantidade)
    }

    fetch('http://localhost:3001/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoProduto)
    })
      .then((res) => res.json())
      .then(() => {
        carregarProdutos()
        setNome('')
        setPreco('')
        setCategoria('')
        setQuantidade('')
      })
      .catch((error) => console.error("Erro ao cadastrar produto:", error))
  }

  // 4. Iniciar Edição
  const iniciarEdicao = (produto) => {
    setProdutoEmEdicao(produto)
    setNome(produto.nome) 
    setPreco(produto.preco)
    setCategoria(produto.categoria)
    setQuantidade(produto.quantidade)
  }

  // 5. Atualizar Produto
  const atualizarProduto = (e) => {
  e.preventDefault()

  const produtoAtualizado = {
    nome: nome,
    preco: parseFloat(preco),
    categoria: categoria,
    quantidade: parseInt(quantidade)
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
      carregarProdutos()  
      setProdutoEmEdicao(null) 
      setNome('')
      setPreco('')
      setCategoria('')
      setQuantidade('')
    })
    .catch((error) => console.error("Erro ao atualizar produto:", error))
  }
  
  return (
    <div className="app-container">
      <h1 className="titulo-principal">
        <span className="destaque">TechStock</span> - <span className="subtitulo">Controle de Estoque</span>
      </h1>

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

        <div className="form-group">
          <input
            type="number"
            min="0"
            placeholder="Quantidade em estoque"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
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

      <h3>Produtos Disponíveis:</h3>

      {/* LISTA DE PRODUTOS */}
      <ul className="produtos-lista">
        {produtos.map((produto) => (
          <li key={produto.id} className="produto-item">
            <div className="produto-info">
              <strong>{produto.nome}</strong>
              <p>Categoria: {produto.categoria}</p>
              <p className="quantidade">Quantidade: {produto.quantidade}</p>
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
                onClick={() => confirmarExclusao(produto)}
                className="btn-excluir"
              >
                🗑️ Excluir
              </button>
            </div>

          </li>
        ))}
      </ul>
      {/* MODAL CUSTOMIZADO DE CONFIRMAÇÃO */}
      {produtoParaExcluir && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Confirmar Exclusão</h3>
          <p>
            Tem certeza que deseja excluir o produto{' '}
            <strong>"{produtoParaExcluir.nome}"</strong>?
          </p>
          <div className="button-group">
            <button className="btn-excluir" onClick={deletarProduto}>
              Sim, Excluir
            </button>
            <button
              className="btn-cancelar"
              onClick={() => setProdutoParaExcluir(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default App