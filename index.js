// index.js
const express = require('express');
const routes = require('./app/routes/routes'); // Importa as rotas

const app = express();
const port = 3000;

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', './app/views'); // Local das views

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')); // Pasta de arquivos estáticos (CSS, imagens, etc.)

// Chamada das rotas 
routes.home(app);
routes.lanches(app);
routes.bebidas(app);
routes.localizacao(app);
routes.paginaNaoEncontrada(app);


// Inicialização do servidor
app.listen(port, function () {
  console.log('Servidor rodando na porta:', port);
});
