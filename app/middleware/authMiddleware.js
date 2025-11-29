// app/middleware/authMiddleware.js

// Middleware para verificar se usuário está autenticado
module.exports.verificarAutenticacao = (req, res, next) => {
    if (req.session && req.session.usuario) {
        return next();
    }
    
    console.log('[Auth] Usuário não autenticado, redirecionando para login');
    res.redirect('/login');
};

// Middleware para verificar se é admin
module.exports.verificarAdmin = (req, res, next) => {
    if (req.session && req.session.usuario && req.session.usuario.tipo === 'admin') {
        return next();
    }
    
    console.log('[Auth] Acesso negado - usuário não é admin');
    res.status(403).render('403.ejs', {
        mensagem: 'Acesso negado. Apenas administradores podem acessar esta área.'
    });
};

// Middleware para passar dados do usuário para as views
module.exports.usuarioParaView = (req, res, next) => {
    res.locals.usuario = req.session && req.session.usuario ? req.session.usuario : null;
    next();
};