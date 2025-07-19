🛍️ Loja Simples Desktop (Electron + Node + SQLite)
Este projeto é uma aplicação desktop simples de uma loja virtual, desenvolvida com Electron, Node.js e SQLite3.

🚀 Funcionalidades
Cadastro de Produtos (CRUD)

Carrinho de Compras

Adicionar produtos ao carrinho

Cálculo automático do total e quantidade de itens

Interface simples e intuitiva

🛠️ Tecnologias Utilizadas
Electron – Criação da aplicação desktop

HTML, CSS e JavaScript – Interface e lógica da UI

Node.js – Lógica do CRUD e integração com banco de dados

SQLite3 – Banco de dados local

📂 Estrutura do Projeto
bash
Copiar
Editar
loja-electron/
├── src/
│   ├── index.html          # Tela principal com carrinho
│   ├── crud.html            # Tela de cadastro de produtos
│   ├── renderer.js          # Lógica da interface
│   └── style.css             # Estilos da interface
├── main.js                  # Processo principal do Electron
├── database.js              # Conexão com SQLite e CRUD
├── preload.js               # Comunicação segura frontend/backend
├── package.json             # Configuração do projeto

💾 Banco de Dados
O banco SQLite é criado automaticamente na pasta do projeto com o nome:

Copiar
Editar
loja.db
Tabela produtos:

Campo	Tipo
id	INTEGER (PK)
nome	TEXT
preco	REAL

🖥️ Como Rodar o Projeto
1️⃣ Pré-requisitos
Node.js 20.x LTS
(Baixar em: https://nodejs.org/en/download)

2️⃣ Clone o projeto ou baixe o ZIP
Se for clonar:

bash
Copiar
Editar
git clone https://github.com/seuusuario/loja-electron.git
cd loja-electron
Se for por ZIP, basta extrair e abrir a pasta.

3️⃣ Instale as dependências
bash
Copiar
Editar
npm install
4️⃣ Rode a aplicação
bash
Copiar
Editar
npm start
⚠️ Possíveis Problemas
Se ocorrer erro com o Electron:

bash
Copiar
Editar
npm cache clean --force
rmdir /s /q node_modules
del package-lock.json
npm install
Execute novamente como Administrador se for Windows.

📝 Licença
MIT


