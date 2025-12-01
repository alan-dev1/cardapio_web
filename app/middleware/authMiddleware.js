// app/middleware/authMiddleware.js

// Middleware para verificar se usuário está autenticado
module.exports.verificarAutenticacao = (req, res, next) => {
    console.log('[AuthMiddleware] Verificando autenticação');
    console.log('[AuthMiddleware] Session ID:', req.sessionID);
    console.log('[AuthMiddleware] Usuário na sessão:', req.session.usuario);
    
    if (req.session && req.session.usuario) {
        console.log('[AuthMiddleware] Usuário autenticado:', req.session.usuario.email);
        return next();
    }
    
    console.log('[Auth] Usuário não autenticado, redirecionando para login');
    res.redirect('/login');
};

// Middleware para verificar se é admin
module.exports.verificarAdmin = (req, res, next) => {
    console.log('[AuthMiddleware] Verificando se é admin');
    
    if (req.session && req.session.usuario && req.session.usuario.tipo === 'admin') {
        console.log('[AuthMiddleware] Usuário é admin');
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
