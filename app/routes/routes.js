// app/routes/routes.js
const { home } = require('../controllers/homeController');
const { bebidas } = require('../controllers/bebidasController');
const { lanches } = require('../controllers/lanchesController');
const { localizacao } = require('../controllers/localizacaoController');
const { paginaNaoEncontrada } = require('../controllers/errorController');
const { exibirFormulario, adicionarProduto } = require('../controllers/dminController');

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

    admin: (app) => {
        // Rota para exibir o formulário
        app.get('/admin', (req, res) => {
            console.log('Cheguei na rota /admin');
            exibirFormulario(app, req, res);
        });

        // Rota para processar o formulário
        app.post('/admin/adicionar', (req, res) => {
            console.log('Cheguei na rota POST /admin/adicionar');
            adicionarProduto(app, req, res);
        });
    },

    paginaNaoEncontrada: (app) => {
        app.use((req, res) => {
            paginaNaoEncontrada(app, req, res);
        });
    }
};