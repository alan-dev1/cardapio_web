// app/controllers/authController.js
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const authModel = require('../models/authModel');
const dbConn = require('../../config/dbConnection');

// Schema de validação para login
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'Email é obrigatório',
            'any.required': 'Email é obrigatório'
        }),
    senha: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Senha é obrigatória',
            'string.min': 'Senha deve ter pelo menos 6 caracteres',
            'any.required': 'Senha é obrigatória'
        })
});

// Schema de validação para registro
const registroSchema = Joi.object({
    nome: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Nome é obrigatório',
            'string.min': 'Nome deve ter pelo menos 3 caracteres',
            'any.required': 'Nome é obrigatório'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email inválido',
            'string.empty': 'Email é obrigatório',
            'any.required': 'Email é obrigatório'
        }),
    senha: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Senha é obrigatória',
            'string.min': 'Senha deve ter pelo menos 6 caracteres',
            'any.required': 'Senha é obrigatória'
        }),
    confirmarSenha: Joi.string()
        .valid(Joi.ref('senha'))
        .required()
        .messages({
            'any.only': 'As senhas não coincidem',
            'any.required': 'Confirmação de senha é obrigatória'
        })
});

// Exibir página de login
module.exports.exibirLogin = (app, req, res) => {
    console.log('[Controller] Exibindo página de login');
    res.render('admin/login.ejs', { erro: null });
};

// Processar login
module.exports.processarLogin = (app, req, res) => {
    console.log('[Controller] Processando login');
    
    // Validação
    const { error, value } = loginSchema.validate(req.body);
    
    if (error) {
        const erros = error.details.map(err => err.message);
        return res.status(400).render('admin/login.ejs', {
            erro: erros[0],
            email: req.body.email
        });
    }
    
    const db = dbConn();
    
    authModel.buscarPorEmail(db, value.email, async (error, results) => {
        if (error) {
            console.log('Erro ao buscar usuário:', error);
            return res.status(500).render('admin/login.ejs', {
                erro: 'Erro no servidor. Tente novamente.',
                email: value.email
            });
        }
        
        if (results.length === 0) {
            return res.status(401).render('admin/login.ejs', {
                erro: 'Email ou senha incorretos',
                email: value.email
            });
        }
        
        const usuario = results[0];
        
        // Verificar senha
        const senhaCorreta = await bcrypt.compare(value.senha, usuario.senha);
        
        if (!senhaCorreta) {
            return res.status(401).render('admin/login.ejs', {
                erro: 'Email ou senha incorretos',
                email: value.email
            });
        }
        
        // Criar sessão
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        };
        
        console.log('[Auth] Login realizado com sucesso:', usuario.email);
        
        // Redirecionar conforme tipo de usuário
        if (usuario.tipo === 'admin') {
            res.redirect('/admin/gerenciar');
        } else {
            res.redirect('/');
        }
    });
};

// Exibir página de registro
module.exports.exibirRegistro = (app, req, res) => {
    console.log('[Controller] Exibindo página de registro');
    res.render('registro.ejs', { erros: null, dados: {} });
};

// Processar registro
module.exports.processarRegistro = (app, req, res) => {
    console.log('[Controller] Processando registro');
    
    // Validação
    const { error, value } = registroSchema.validate(req.body, {
        abortEarly: false
    });
    
    if (error) {
        const erros = error.details.map(err => err.message);
        return res.status(400).render('registro.ejs', {
            erros: erros,
            dados: req.body
        });
    }
    
    const db = dbConn();
    
    // Verificar se email já existe
    authModel.buscarPorEmail(db, value.email, async (error, results) => {
        if (error) {
            console.log('Erro ao verificar email:', error);
            return res.status(500).render('registro.ejs', {
                erros: ['Erro no servidor. Tente novamente.'],
                dados: req.body
            });
        }
        
        if (results.length > 0) {
            return res.status(400).render('registro.ejs', {
                erros: ['Este email já está cadastrado'],
                dados: req.body
            });
        }
        
        // Hash da senha
        const senhaHash = await bcrypt.hash(value.senha, 10);
        
        const novoUsuario = {
            nome: value.nome,
            email: value.email,
            senha: senhaHash,
            tipo: 'usuario'
        };
        
        authModel.criarUsuario(db, novoUsuario, (error, result) => {
            if (error) {
                console.log('Erro ao criar usuário:', error);
                return res.status(500).render('registro.ejs', {
                    erros: ['Erro ao criar usuário. Tente novamente.'],
                    dados: req.body
                });
            }
            
            console.log('[Auth] Usuário registrado com sucesso:', value.email);
            
            // Criar sessão automaticamente
            req.session.usuario = {
                id: result.insertId,
                nome: value.nome,
                email: value.email,
                tipo: 'usuario'
            };
            
            res.redirect('/');
        });
    });
};

// Logout
module.exports.logout = (app, req, res) => {
    console.log('[Auth] Logout do usuário:', req.session.usuario?.email);
    req.session.destroy((err) => {
        if (err) {
            console.log('Erro ao destruir sessão:', err);
        }
        res.redirect('/');
    });
};