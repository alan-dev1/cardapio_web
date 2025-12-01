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
        
        // ← ADICIONE ESTE LOG
        console.log('[Auth] Sessão criada:', req.session.usuario);
        console.log('[Auth] Session ID:', req.sessionID);
        
        // IMPORTANTE: Salvar sessão antes de redirecionar
        req.session.save((err) => {
            if (err) {
                console.error('[Auth] Erro ao salvar sessão:', err);
                return res.status(500).render('admin/login.ejs', {
                    erro: 'Erro ao criar sessão. Tente novamente.',
                    email: value.email
                });
            }
            
            console.log('[Auth] Login realizado com sucesso:', usuario.email);
            console.log('[Auth] Redirecionando para:', usuario.tipo === 'admin' ? '/admin/gerenciar' : '/');
            
            // Redirecionar conforme tipo de usuário
            if (usuario.tipo === 'admin') {
                res.redirect('/admin/gerenciar');
            } else {
                res.redirect('/');
            }
        });
    });
};