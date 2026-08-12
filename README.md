# 🟠 TechStock - Controle de Estoque Fullstack

> Aplicação Fullstack para gerenciamento de estoque de produtos tecnológicos, desenvolvida com JavaScript, React, Node.js, Express, Cors e Vite.

---

## 📌 Sobre o Projeto

O **TechStock** foi desenvolvido como um projeto de aprendizado prático para dominar a construção de uma aplicação Fullstack, realizando a comunicação completa entre o **Front-end** e o **Back-end** via API REST (utilizando consumo de rotas com `fetch`, controle de estado no React e regras de CORS).

A interface possui um design moderno no estilo *Dark Theme* com destaques em laranja, trazendo feedback visual para edições e um **modal customizado de confirmação** para evitar exclusões acidentais.

---

## 🛠️ Funcionalidades

* 📋 **Listagem de Produtos:** Exibição dinâmica dos itens cadastrados (nome, categoria, quantidade e preço).
* ➕ **Cadastro com Validação:** Adição de novos produtos garantindo validações de segurança (como impedir preços negativos).
* ✏️ **Edição em Tempo Real:** Alteração dos dados de um produto existente com mudança de estado no formulário.
* 🗑️ **Exclusão Segura:** Remoção de itens acompanhada de um **modal de confirmação customizado**.
* 🌐 **API REST Integrada:** Endpoints estruturados para operações completas de CRUD.

---

## 💻 Tecnologias Utilizadas

### **Back-end**
* **Node.js** (Ambiente de execução)
* **Express** (Framework para construção da API REST)
* **CORS** (Middleware para liberação de requisições Cross-Origin)

### **Front-end**
* **React** (Biblioteca para construção da interface)
* **Vite** (Build tool e servidor de desenvolvimento rápido)
* **JavaScript (ES6+)**
* **CSS3** (Estilização customizada em Dark Mode e responsiva com fonte Inter)

---

## ⚙️ Como Executar o Projeto

Como o repositório é dividido em duas pastas principais (`/backend` e `/frontend`), siga os passos abaixo:

### 1. Clonar o repositório

```bash
git clone https://github.com/Kaleu-Victor/tech-stock.git
cd tech-stock
```

### 2. Rodar o Back-end
Em um terminal, acesse a pasta do servidor e inicie o Node:

```bash
cd backend
npm install
node server.js
```

> O servidor rodará na porta 3001 (http://localhost:3001)

### 3. Rodar o Front-end
Em outro terminal paralelo, acesse a pasta da aplicação cliente e inicie o servidor do Vite:

```bash
cd frontend
npm install
npm run dev
```

> O Vite fornecerá o link local (geralmente http://localhost:5173) para acessar a interface no seu navegador.
---
<div align="center">
  <h2>✒️ Autor</h2>
  <a href="https://github.com/Kaleu-Victor">
    <img src="https://github.com/Kaleu-Victor.png" width="130" alt="Foto de Kaléu Victor"/>
    <br/>
    <h3><b>Kaléu Victor</b></h3>
  </a>
</div>
