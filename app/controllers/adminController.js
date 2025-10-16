// app/controllers/adminController.js
const dbConn = require('../../config/dbConnection');

module.exports.exibirFormulario = (app, req, res) => {
    console.log('[Controller Admin] Exibindo formulário');
    res.render('admin.ejs');
};

module.exports.adicionarProduto = (app, req, res) => {
    console.log('[Controller Admin] Adicionando produto');
    
    const { nome, descricao, preco, imagem, categoria } = req.body;
    
    // Validação básica
    if (!nome || !descricao || !preco || !imagem || !categoria) {
        return res.send('Todos os campos são obrigatórios!');
    }

    const db = dbConn();
    
    const sql = `
        INSERT INTO produtos (nome, descricao, preco, imagem, categoria)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(sql, [nome, descricao, preco, imagem, categoria], (error, result) => {
        if (error) {
            console.log('Erro ao adicionar produto:', error);
            res.send('Erro ao adicionar produto no banco de dados.');
            return;
        }
        
        console.log('Produto adicionado com sucesso! ID:', result.insertId);
        // Redireciona para a home após adicionar
        res.redirect('/');
    });
};