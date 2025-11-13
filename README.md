📋 Passo a Passo para Rodar o Projeto
1️⃣ Pré-requisitos
Certifique-se de ter instalado:

Node.js (versão 14 ou superior) - Download aqui
MySQL (versão 5.7 ou superior) - Download aqui

2️⃣ Configurar o Banco de Dados

Abra o MySQL Workbench ou acesse o MySQL via terminal:

bashmysql -u root -p

Execute o arquivo banco.sql que está no projeto:

No MySQL Workbench: File → Open SQL Script → Selecione banco.sql → Execute
Ou via terminal:



bashmysql -u root -p < banco.sql
Isso vai:

Criar o banco cardapio_restaurante
Criar a tabela produtos
Inserir 4 produtos de exemplo (2 lanches e 2 bebidas)

3️⃣ Configurar a Conexão com o Banco
Abra o arquivo dbConnection.js e ajuste as credenciais se necessário:
javascriptconst host = 'localhost';
const database = 'cardapio_restaurante';
const user = 'root';
const password = ''; // ⚠️ Coloque sua senha do MySQL aqui
4️⃣ Instalar as Dependências
No terminal, navegue até a pasta do projeto e execute:
bashnpm install
Ou simplesmente:
bashnpm i
Isso vai instalar todas as dependências necessárias:

express - Framework web
ejs - Template engine
mysql2 - Driver do MySQL
joi - Validação de dados

5️⃣ Executar o Projeto
Inicie o servidor:
bashnode index.js
```

Você verá a mensagem:
```
Servidor rodando na porta: 3000
```

## 6️⃣ Acessar a Aplicação

Abra seu navegador e acesse:

- **Página Principal:** http://localhost:3000/
- **Lanches:** http://localhost:3000/lanches
- **Bebidas:** http://localhost:3000/bebidas
- **Localização:** http://localhost:3000/localizacao
- **Admin (Adicionar Produtos):** http://localhost:3000/admin

## 🎯 Estrutura do Projeto
```
projeto/
├── app/
│   ├── controllers/     # Lógica de controle
│   ├── models/          # Lógica de banco de dados
│   ├── routes/          # Definição de rotas
│   └── views/           # Templates EJS
├── config/
│   └── dbConnection.js  # Configuração do MySQL
├── public/
│   └── styles/          # Arquivos CSS
├── index.js             # Arquivo principal
└── banco.sql            # Script do banco
