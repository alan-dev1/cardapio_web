// app/routes/routes.js
const { home } = require('../controllers/homeController');
const { bebidas } = require('../controllers/bebidasController');
const { lanches } = require('../controllers/lanchesController');
const { localizacao } = require('../controllers/localizacaoController');
const { exibirFormulario, adicionarProduto } = require('../controllers/adicionarProdutoController');
const { 
    exibirLogin, 
    processarLogin, 
    exibirRegistro, 
    processarRegistro, 
    logout 
} = require('../controllers/authController');
const { 
    listarProdutos, 
    exibirEdicao, 
    editarProduto, 
    deletarProduto 
} = require('../controllers/produtoController');
const { paginaNaoEncontrada } = require('../controllers/errorController');
const { verificarAutenticacao, verificarAdmin } = require('../middleware/authMiddleware');

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
            console.log('Cheguei na rota /localizacao');
            localizacao(app, req, res);
        });
    },

    // Rotas de autenticação
    auth: (app) => {
        // Login
        app.get('/login', (req, res) => {
            console.log('Cheguei na rota /login');
            exibirLogin(app, req, res);
        });

        app.post('/login', (req, res) => {
            console.log('Cheguei na rota POST /login');
            processarLogin(app, req, res);
        });

        // Registro
        app.get('/registro', (req, res) => {
            console.log('Cheguei na rota /registro');
            exibirRegistro(app, req, res);
        });

        app.post('/registro', (req, res) => {
            console.log('Cheguei na rota POST /registro');
            processarRegistro(app, req, res);
        });

        // Logout
        app.get('/logout', (req, res) => {
            console.log('Cheguei na rota /logout');
            logout(app, req, res);
        });
    },

    // Rotas administrativas (protegidas)
    admin: (app) => {
        // Listar/gerenciar produtos
        app.get('/admin/gerenciar', verificarAutenticacao, verificarAdmin, (req, res) => {
            console.log('Cheguei na rota /admin/gerenciar');
            listarProdutos(app, req, res);
        });

        // Adicionar produto - GET
        app.get('/admin/adicionar', verificarAutenticacao, verificarAdmin, (req, res) => {
            console.log('🟢 GET /admin/adicionar - Exibindo formulário');
            exibirFormulario(app, req, res);
        });

        // Adicionar produto - POST
        app.post('/admin/adicionar', verificarAutenticacao, verificarAdmin, (req, res) => {
            console.log('🟢🟢🟢 POST /admin/adicionar - Processando adição');
            console.log('Body recebido:', req.body);
            adicionarProduto(app, req, res);
        });

        // Editar produto
        app.get('/admin/editar/:id', verificarAutenticacao, verificarAdmin, (req, res) => {
            console.log('Cheguei na rota /admin/editar/:id');
            exibirEdicao(app, req, res);
        });

        app.post('/admin/editar/:id', verificarAutenticacao, verificarAdmin, (req, res) => {
            console.log('Cheguei na rota POST /admin/editar/:id');
            editarProduto(app, req, res);
        });

        // Deletar produto
        app.delete('/admin/deletar/:id', verificarAutenticacao, verificarAdmin, (req, res) => {
            console.log('Cheguei na rota DELETE /admin/deletar/:id');
            deletarProduto(app, req, res);
        });
    },

    paginaNaoEncontrada: (app) => {
        app.use((req, res) => {
            paginaNaoEncontrada(app, req, res);
        });
    }
};