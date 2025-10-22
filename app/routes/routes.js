// app/routes/routes.js
const { home } = require('../controllers/homeController');
const { bebidas } = require('../controllers/bebidasController');
const { lanches } = require('../controllers/lanchesController');
const { localizacao } = require('../controllers/localizacaoController');
const { exibirFormulario, adicionarProduto } = require('../controllers/adicionarProdutoController');
const { login } = require('../controllers/loginController');
const { paginaNaoEncontrada } = require('../controllers/errorController');



module.exports = {
    home: (app) => {
        app.get('/', (req, res) => {
            console.log('Cheguei na rota /');
            home(app, req, res);
        });
    },

    lanches: (app) => {
        app.get('/lanches', (req, res) => {
            console.log('Cheguei na rota /lanches');
            lanches(app, req, res);
        });
    },

    bebidas: (app) => {
        app.get('/bebidas', (req, res) => {
            console.log('Cheguei na rota /bebidas');
            bebidas(app, req, res);
        });
    },

    localizacao: (app) => {
        app.get('/localizacao', (req, res) => {
            console.log('Cheguei na rota /localização');
            localizacao(app, req, res);
        });
    },

    login: (app) => {
        app.get('/login', (req, res) => {
            console.log('Cheguei na rota /login');
            login(app, req, res);
        });
    },

    adicionarProduto: (app) => {
        app.get('/adicionarProduto', (req, res) => {
            console.log('Cheguei na rota /adicionarProduto');
            exibirFormulario(app, req, res);
        });

        app.post('/adicionarProduto/adicionar', (req, res) => {
            console.log('Cheguei na rota POST /adicionarProduto/adicionar');
            adicionarProduto(app, req, res);
        });
    },

    paginaNaoEncontrada: (app) => {
        app.use((req, res) => {
            paginaNaoEncontrada(app, req, res);
        });
    }
};