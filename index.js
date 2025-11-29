// index.js
const express = require('express');
const session = require('express-session');
const routes = require('./app/routes/routes');
const { usuarioParaView } = require('./app/middleware/authMiddleware');
const app = express();

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para aceitar JSON (usado no DELETE)
app.use(express.static('./public'));

// Configuração de sessão
app.use(session({
    secret: 'seu-segredo-super-secreto-aqui', // MUDE ISSO em produção!
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Middleware para passar usuário para as views
app.use(usuarioParaView);

// Middleware para definir navActive
app.use((req, res, next) => {
    const mapa = { 
        '/': 'home', 
        '/lanches': 'lanches', 
        '/bebidas': 'bebidas', 
        '/localizacao': 'localizacao'
    };
    
    // Rotas admin
    if (req.path.startsWith('/admin')) {
        res.locals.navActive = 'admin';
    } else {
        res.locals.navActive = mapa[req.path] || '';
    }
    
    next();
});

// Chamada das rotas 
routes.home(app);
routes.lanches(app);
routes.bebidas(app);
routes.localizacao(app);
routes.auth(app);
routes.admin(app);
routes.paginaNaoEncontrada(app);

// Exporta o app
module.exports = app;