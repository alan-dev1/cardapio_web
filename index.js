// index.js
const express = require('express');
const routes = require('./app/routes/routes'); // Importa as rotas
const app = express();

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', './app/views'); // Local das views

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')); // Pasta de arquivos estáticos (CSS, imagens, etc.)

app.use((req, res, next) => {
  // mapeia o path para uma chave que bate com a navbar
  const mapa = { 
    '/': 'home', 
    '/lanches': 'lanches', 
    '/bebidas': 'bebidas', 
    '/localizacao': 'localizacao', 
    '/adicionarProduto': 'admin' 
  };
  
  res.locals.navActive = mapa[req.path] || '';
  next();
});


// Chamada das rotas 
routes.home(app);
routes.lanches(app);
routes.bebidas(app);
routes.localizacao(app);
routes.adicionarProduto(app);
routes.login(app); 
routes.paginaNaoEncontrada(app);

// Exporta o app, sem subir o servidor
module.exports = app;