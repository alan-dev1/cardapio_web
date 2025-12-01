// index.js
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const routes = require('./app/routes/routes');
const { usuarioParaView } = require('./app/middleware/authMiddleware');
const app = express();

// Configurações básicas
app.set('view engine', 'ejs');
app.set('views', './app/views');

// IMPORTANTE: Trust proxy no Render
app.set('trust proxy', 1); // ← ADICIONE ESTA LINHA!

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// Configuração de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'seu-segredo-super-secreto-aqui',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        secure: false, // ← MUDE PARA FALSE TEMPORARIAMENTE
        httpOnly: true,
        sameSite: 'lax' // ← ADICIONE ESTA LINHA
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

module.exports = app;