// app/controllers/produtoController.js
const Joi = require('joi');
const produtoModel = require('../models/produtoModel');
const dbConn = require('../../config/dbConnection');

// Schema de validação (mesmo do adicionarProdutoController)
const produtoSchema = Joi.object({
    nome: Joi.string().trim().min(3).max(100).required()
        .messages({
            'string.empty': 'O nome do produto é obrigatório',
            'string.min': 'O nome deve ter pelo menos 3 caracteres',
            'any.required': 'O nome do produto é obrigatório'
        }),
    descricao: Joi.string().trim().min(10).max(500).required()
        .messages({
            'string.empty': 'A descrição é obrigatória',
            'string.min': 'A descrição deve ter pelo menos 10 caracteres',
            'any.required': 'A descrição é obrigatória'
        }),
    preco: Joi.number().positive().precision(2).required()
        .messages({
            'number.base': 'O preço deve ser um número válido',
            'number.positive': 'O preço deve ser maior que zero',
            'any.required': 'O preço é obrigatório'
        }),
    imagem: Joi.string().uri().required()
        .messages({
            'string.empty': 'A URL da imagem é obrigatória',
            'string.uri': 'A URL da imagem deve ser válida',
            'any.required': 'A imagem é obrigatória'
        }),
    categoria: Joi.string().trim().required()
        .messages({
            'string.empty': 'A categoria é obrigatória',
            'any.required': 'A categoria é obrigatória'
        })
});

// Listar todos os produtos (área admin)
module.exports.listarProdutos = (app, req, res) => {
    console.log('[Controller] Listando produtos para gerenciar');
    const db = dbConn();
    
    produtoModel.listarTodos(db, (error, produtos) => {
        if (error) {
            console.log('❌ Erro ao listar produtos:', error);
            return res.status(500).send('Erro ao carregar produtos');
        }
        
        console.log(`✅ ${produtos.length} produtos encontrados`);
        db.end();
        res.render('admin/gerenciarProdutos.ejs', { produtos });
    });
};

// Exibir formulário de edição
module.exports.exibirEdicao = (app, req, res) => {
    console.log('[Controller] Exibindo formulário de edição');
    const id = req.params.id;
    console.log('[Controller] ID do produto:', id);
    
    const db = dbConn();
    
    produtoModel.buscarPorId(db, id, (error, results) => {
        if (error) {
            console.log('❌ Erro ao buscar produto:', error);
            db.end();
            return res.status(500).send('Erro ao buscar produto');
        }
        
        if (results.length === 0) {
            console.log('❌ Produto não encontrado');
            db.end();
            return res.status(404).send('Produto não encontrado');
        }
        
        console.log('✅ Produto encontrado:', results[0].nome);
        db.end();
        
        res.render('admin/editarProduto.ejs', {
            produto: results[0],
            erros: null
        });
    });
};

// Processar edição
module.exports.editarProduto = (app, req, res) => {
    console.log('[Controller] ========================================');
    console.log('[Controller] Editando produto');
    const id = req.params.id;
    console.log('[Controller] ID do produto:', id);
    console.log('[Controller] Dados recebidos:', req.body);
    
    // Validação
    const { error, value } = produtoSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });
    
    if (error) {
        const erros = error.details.map(err => err.message);
        console.log('[Controller] ❌ Erros de validação:', erros);
        
        return res.status(400).render('admin/editarProduto.ejs', {
            erros: erros,
            produto: { id, ...req.body }
        });
    }
    
    console.log('[Controller] ✅ Validação passou!');
    console.log('[Controller] Dados validados:', value);
    
    const db = dbConn();
    
    produtoModel.atualizarProduto(db, id, value, (error, result) => {
        if (error) {
            console.log('[Controller] ❌ Erro ao atualizar produto:', error);
            console.log('[Controller] Detalhes do erro:', JSON.stringify(error, null, 2));
            
            db.end();
            
            return res.status(500).render('admin/editarProduto.ejs', {
                erros: ['Erro ao atualizar produto no banco de dados: ' + error.message],
                produto: { id, ...req.body }
            });
        }
        
        if (result.affectedRows === 0) {
            console.log('[Controller] ⚠️ Nenhuma linha foi atualizada');
            db.end();
            
            return res.status(404).render('admin/editarProduto.ejs', {
                erros: ['Produto não encontrado para atualização'],
                produto: { id, ...req.body }
            });
        }
        
        console.log('[Controller] ✅ Produto atualizado com sucesso!');
        console.log('[Controller] Linhas afetadas:', result.affectedRows);
        console.log('[Controller] Redirecionando para /admin/gerenciar');
        console.log('[Controller] ========================================');
        
        db.end();
        res.redirect('/admin/gerenciar');
    });
};

// Deletar produto
module.exports.deletarProduto = (app, req, res) => {
    console.log('[Controller] Deletando produto');
    const id = req.params.id;
    console.log('[Controller] ID do produto:', id);
    
    const db = dbConn();
    
    produtoModel.deletarProduto(db, id, (error, result) => {
        if (error) {
            console.log('❌ Erro ao deletar produto:', error);
            db.end();
            return res.status(500).json({ 
                sucesso: false, 
                mensagem: 'Erro ao deletar produto: ' + error.message
            });
        }
        
        if (result.affectedRows === 0) {
            console.log('⚠️ Produto não encontrado');
            db.end();
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: 'Produto não encontrado' 
            });
        }
        
        console.log('✅ Produto deletado com sucesso! ID:', id);
        db.end();
        
        res.json({ 
            sucesso: true, 
            mensagem: 'Produto deletado com sucesso' 
        });
    });
};