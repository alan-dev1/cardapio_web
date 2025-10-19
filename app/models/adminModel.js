module.exports = {
    adicionarProduto: (db, produto, callback ) => {
        const sql = `
            INSERT INTO produtos (nome, descricao, preco, imagem, categoria)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const { nome, descricao, preco, imagem, categoria } = produto;
        console.log('[Admin Model] Adicionando produto no banco');

        db.query(sql, [nome, descricao, preco, imagem, categoria], callback );
    }
};