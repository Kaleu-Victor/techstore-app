import { useEffect } from "react";
import { useState } from "react";

function App() {
  // Criando estado para guardar os produtos
  const [produtos, setProdutos] = useState([])

  // O useEffect roda uma vez assim que o componente carrega na tela
  useEffect(() => {
    // Busca os dados da API 
    fetch('http://localhost:3001/api/produtos')
    .then((response) => response.json()) // Transforma a resposta em JSON
    .then((dados) => {
      setProdutos(dados) // Guarda o array de dados
    })
    .catch((error) => console.error("Erro ao buscar produtos: ", error))
  }, [])

  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif', maxWidth:'600px', margin: '0 auto'}}>
      <h1>🛒 TechStore - Catálogo</h1>

      <h3>Produtos Disponíveis:</h3>

      {/* Mapeia o array de produtos para exibir cada um na tela */}
      <ul style={{listStyle: 'none', padding: 0}}>
        {produtos.map((produto) => (
          <li
            key={produto.id}
            style={{
              border: '1px solid #dddddd',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <strong style={{color: '#333'}}>{produto.nome}</strong>
            <p style={{margin: '5px 0', color: '#666'}}>Categoria: {produto.categoria}</p>
            <span style={{fontWeight: 'bold', color: '#2e7d32'}}>
              R$ {produto.preco.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App