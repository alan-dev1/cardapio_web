// app/models/produtoModel.js

module.exports = {
    // Listar todos os produtos
    listarTodos: (db, callback) => {
        const sql = `
            SELECT id, nome, descricao, preco, imagem, categoria
            FROM produtos
            ORDER BY id DESC
        `;
        console.log('[produtoModel] Listando todos os produtos');
        db.query(sql, callback);
    },

    // Buscar produto por ID
    buscarPorId: (db, id, callback) => {
        const sql = `
            SELECT id, nome, descricao, preco, imagem, categoria
            FROM produtos
            WHERE id = ?
        `;
        console.log('[produtoModel] Buscando produto ID:', id);
        db.query(sql, [id], callback);
    },

    // Atualizar produto
    atualizarProduto: (db, id, produto, callback) => {
        const sql = `
            UPDATE produtos
            SET nome = ?, descricao = ?, preco = ?, imagem = ?, categoria = ?
            WHERE id = ?
        `;
        const { nome, descricao, preco, imagem, categoria } = produto;
        
        console.log('[produtoModel] Atualizando produto ID:', id);
        console.log('[produtoModel] SQL:', sql);
        console.log('[produtoModel] Valores:', [nome, descricao, preco, imagem, categoria, id]);
        
        db.query(sql, [nome, descricao, preco, imagem, categoria, id], callback);
    },

    // Deletar produto
    deletarProduto: (db, id, callback) => {
        const sql = 'DELETE FROM produtos WHERE id = ?';
        console.log('[produtoModel] Deletando produto ID:', id);
        db.query(sql, [id], callback);
    }
};