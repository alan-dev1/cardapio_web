// app/models/homeModel.js
module.exports = {
    getProdutosPorCategoria: (db, categoria, limit, callback) => {
        console.log('[HomeModel] Lendo produtos por categoria:', categoria);

        let sql = `
            SELECT id, nome, descricao, preco, imagem, categoria
            FROM produtos
            WHERE categoria = ?
            ORDER BY id
        `;

        // Aplica o LIMIT se for informado
        if (limit && Number.isInteger(limit)) {
            sql += ' LIMIT ' + parseInt(limit, 10);
        }

        db.query(sql, [categoria], callback);
    }
};
