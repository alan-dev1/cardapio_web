// app/routes/routes.js
const { home } = require('../controllers/homeController');
const { bebidas } = require('../controllers/bebidasController');
const { lanches } = require('../controllers/lanchesController');
const { localizacao } = require('../controllers/localizacaoController');
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

    paginaNaoEncontrada: (app) => {
        app.use((req,res) => {
            paginaNaoEncontrada(app, req, res);
        });
    }

};
