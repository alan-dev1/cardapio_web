// app/routes/routes.js
const { bebidas } = require('../controllers/bebidasController');
const { home } = require('../controllers/homeController');
const { lanches } = require('../controllers/lanchesController');

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
        }
};
