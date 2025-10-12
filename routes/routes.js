// Importação dos controladores que gerenciarão a lógica de cada rota
const Joi = require('joi');
const { home, addComment, addPainting, getPaintingController, updatePaintingController, editPaintingController } = require('../controllers/home');
const { portinari } = require('../controllers/portinari');
const { tarsila } = require('../controllers/tarsila');

// Importação dos controladores do cardápio
const { 
    listAllItems, 
    listByCategory, 
    viewItem, 
    showAddForm, 
    addNewItem, 
    showEditForm, 
    updateItemController,
    deleteItemController 
} = require('../controllers/cardapio');

const schema = Joi.object({
    nome: Joi.string().min(5).max(100).required().messages({
        'string.empty': 'O nome é obrigatório',
        'string.min': 'O nome deve ter no mínimo 5 caracteres',
        'string.max': 'O nome deve ter no máximo 100 caracteres',
        'any.required': 'O nome é obrigatório'
    }),
    ano: Joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
        'number.base': 'O ano deve ser um número',
        'number.min': 'O ano deve ser maior ou igual a 1900',
        'number.max': `O ano deve ser menor ou igual a ${new Date().getFullYear()}`,
        'any.required': 'O ano é obrigatório'
    }),
    artista: Joi.string().min(5).max(100).required().messages({
        'string.empty': 'O artista é obrigatório',
        'string.min': 'O nome do artista deve ter no mínimo 5 caracteres',
        'string.max': 'O nome do artista deve ter no máximo 100 caracteres',
        'any.required': 'O artista é obrigatório'
    }),
    urlimagem: Joi.string().uri().required().messages({
        'string.empty': 'A URL da imagem é obrigatória',
        'string.uri': 'A URL da imagem deve ser válida',
        'any.required': 'A URL da imagem é obrigatória'
    })
});

// Schema de validação para itens do cardápio
const cardapioSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'O nome é obrigatório',
        'string.min': 'O nome deve ter no mínimo 3 caracteres',
        'string.max': 'O nome deve ter no máximo 100 caracteres',
        'any.required': 'O nome é obrigatório'
    }),
    descricao: Joi.string().min(5).max(500).required().messages({
        'string.empty': 'A descrição é obrigatória',
        'string.min': 'A descrição deve ter no mínimo 5 caracteres',
        'string.max': 'A descrição deve ter no máximo 500 caracteres',
        'any.required': 'A descrição é obrigatória'
    }),
    preco: Joi.number().positive().precision(2).required().messages({
        'number.base': 'O preço deve ser um número',
        'number.positive': 'O preço deve ser maior que zero',
        'any.required': 'O preço é obrigatório'
    }),
    categoria: Joi.string().valid('Entradas', 'Pratos Principais', 'Pratos Executivos', 'Bebidas', 'Sobremesas').required().messages({
        'string.empty': 'A categoria é obrigatória',
        'any.only': 'Categoria inválida',
        'any.required': 'A categoria é obrigatória'
    }),
    imagem_url: Joi.string().uri().required().messages({
        'string.empty': 'A URL da imagem é obrigatória',
        'string.uri': 'A URL da imagem deve ser válida',
        'any.required': 'A URL da imagem é obrigatória'
    })
});

const validatePainting = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.render('insertPaintings.ejs', { errors: error.details, painting: req.body });
    }
    next();
};

const validateCardapio = (req, res, next) => {
    const { error } = cardapioSchema.validate(req.body);
    if (error) {
        return res.render('inserirItemCardapio.ejs', { errors: error.details, item: req.body, categorias: [] });
    }
    next();
};

// Exportação do módulo que define as rotas do aplicativo
module.exports = {
    // ==================== ROTAS DO MUSEU ====================
    
    // Página inicial
    home: (app) => {
        app.get('/', (req, res) => {
            home(app, req, res);
        });
    },

    // Salvar comentários
    saveComment: (app) => {
        app.post('/comentario/salvar', (req, res) => {
            addComment(app, req, res);
        });
    },

    // Página Tarsila
    tarsila: (app) => {
        console.log('[routes.js] criando rota/tarsila');
        app.get('/tarsila', (req, res) => {
            tarsila(app, req, res);
        });
    },

    // Página Portinari
    portinari: (app) => {
        console.log('[routes.js] criando rota/portinari');
        app.get('/portinari', (req, res) => {
            portinari(app, req, res);
        });
    },

    // Form inserir obra
    insertPaintings: (app) => {
        app.get('/inserirobra', (req, res) => {
            res.render('insertPaintings', { errors: [], painting: {} });
        });
    },

    // Salvar obra
    savePaintings: (app) => {
        app.post('/obra/salvar', validatePainting, (req, res) => {
            console.log('Rota add paintings chamada');
            addPainting(app, req, res);
        });
    },

    // Mostrar obra individual
    getPainting: (app) => {
        app.get('/obradearte', (req, res) => {
            getPaintingController(app, req, res);
        });
    },

    editPainting: (app) => {
        app.get('/paintings/:idobra/edit', (req, res) => {
            editPaintingController(app, req, res);
        });
    },

    updatePainting: (app) => {
        app.post('/paintings/:idobra/atualizar', (req, res) => {
            updatePaintingController(app, req, res);
        });
    },

    // ==================== ROTAS DO CARDÁPIO ====================

    // Listar todos os itens do cardápio
    cardapioList: (app) => {
        app.get('/cardapio', (req, res) => {
            listAllItems(app, req, res);
        });
    },

    // Listar itens por categoria
    cardapioByCategory: (app) => {
        app.get('/cardapio/categoria', (req, res) => {
            listByCategory(app, req, res);
        });
    },

    // Visualizar um item específico
    cardapioItem: (app) => {
        app.get('/cardapio/item', (req, res) => {
            viewItem(app, req, res);
        });
    },

    // Exibir formulário para adicionar novo item
    cardapioAddForm: (app) => {
        app.get('/cardapio/novo', (req, res) => {
            showAddForm(app, req, res);
        });
    },

    // Salvar novo item (com validação)
    cardapioSave: (app) => {
        app.post('/cardapio/salvar', validateCardapio, (req, res) => {
            addNewItem(app, req, res);
        });
    },

    // Exibir formulário de edição
    cardapioEditForm: (app) => {
        app.get('/cardapio/:id/editar', (req, res) => {
            showEditForm(app, req, res);
        });
    },

    // Atualizar item (com validação)
    cardapioUpdate: (app) => {
        app.post('/cardapio/:id/atualizar', validateCardapio, (req, res) => {
            updateItemController(app, req, res);
        });
    },

    // Deletar item
    cardapioDelete: (app) => {
        app.post('/cardapio/:id/deletar', (req, res) => {
            deleteItemController(app, req, res);
        });
    }
};