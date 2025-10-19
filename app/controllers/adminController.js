// app/controllers/adminController.js
const Joi = require('joi');
const adminModel = require('../models/adminModel');
const dbConn = require('../../config/dbConnection');

// Schema de validação com Joi
const produtoSchema = Joi.object({
    nome: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'O nome do produto é obrigatório',
            'string.min': 'O nome deve ter pelo menos 3 caracteres',
            'string.max': 'O nome deve ter no máximo 100 caracteres',
            'any.required': 'O nome do produto é obrigatório'
        }),
    
    descricao: Joi.string()
        .trim()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.empty': 'A descrição é obrigatória',
            'string.min': 'A descrição deve ter pelo menos 10 caracteres',
            'string.max': 'A descrição deve ter no máximo 500 caracteres',
            'any.required': 'A descrição é obrigatória'
        }),
    
    preco: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.base': 'O preço deve ser um número válido',
            'number.positive': 'O preço deve ser maior que zero',
            'any.required': 'O preço é obrigatório'
        }),
    
    imagem: Joi.string()
        .uri()
        .required()
        .messages({
            'string.empty': 'A URL da imagem é obrigatória',
            'string.uri': 'A URL da imagem deve ser válida',
            'any.required': 'A imagem é obrigatória'
        }),
    
    categoria: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'A categoria é obrigatória',
            'any.required': 'A categoria é obrigatória'
        })
});

module.exports.exibirFormulario = (app, req, res) => {
    console.log('[Controller Admin] Exibindo formulário');
    res.render('admin.ejs');
};

module.exports.adicionarProduto = (app, req, res) => {
    console.log('[Controller Admin] Adicionando produto');
    
    // Validação com Joi
    const { error, value } = produtoSchema.validate(req.body, {
        abortEarly: false, // Retorna todos os erros, não apenas o primeiro
        stripUnknown: true // Remove campos não especificados no schema
    });

    // Se houver erros de validação
    if (error) {
        const erros = error.details.map(err => err.message);
        console.log('Erros de validação:', erros);
        
        return res.status(400).render('admin.ejs', {
            erros: erros,
            produto: req.body // Mantém os dados preenchidos
        });
    }

    const db = dbConn();

    adminModel.adicionarProduto(db, value, (error, result) =>{
        if(error){
            console.log('Erro ao adicionar produto:', error);

            return res.status(500).render('admin.ejs', {
                error: ['Erro ao adicionar produto ao bando de dados.'],
                produto: req.body
            });
        }

        console.log('Produto adicionado com sucesso! ID: ', result.insertId);
        res.redirect('/');
    });
};