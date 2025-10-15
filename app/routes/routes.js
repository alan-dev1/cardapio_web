// Importação dos controladores do cardápio
const Joi = require('joi');
const { 
    listAllItems, 
    listByCategory, 
    viewItem, 
    showAddForm, 
    addNewItem, 
    showEditForm, 
    updateItemController,
    deleteItemController 
} = require('../controllers/cardapiocontroller');

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

const validateCardapio = (req, res, next) => {
    const { error } = cardapioSchema.validate(req.body);
    if (error) {
        return res.render('inserirItemCardapio.ejs', { errors: error.details, item: req.body, categorias: [] });
    }
    next();
};

// Exportação do módulo que define as rotas do aplicativo
module.exports = {
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