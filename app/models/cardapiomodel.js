module.exports = {
    // Função que busca todos os itens do cardápio
    getAllItems: (connection, callback) => {
        const sql = "SELECT * FROM cardapio ORDER BY categoria, nome";
        connection.query(sql, callback);
    },

    // Função que busca itens por categoria
    getItemsByCategory: (connection, categoria, callback) => {
        const sql = "SELECT * FROM cardapio WHERE categoria = ? ORDER BY nome";
        connection.query(sql, [categoria], callback);
    },

    // Função que busca um item específico por ID
    getItemById: (connection, id, callback) => {
        const sql = "SELECT * FROM cardapio WHERE id = ?";
        connection.query(sql, [id], callback);
    },

    // Função que adiciona um novo item ao cardápio
    addItem: (connection, item, callback) => {
        const sql = "INSERT INTO cardapio (nome, descricao, preco, categoria, imagem_url) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, [item.nome, item.descricao, item.preco, item.categoria, item.imagem_url], callback);
    },

    // Função que atualiza um item do cardápio
    updateItem: (connection, id, item, callback) => {
        const sql = "UPDATE cardapio SET nome = ?, descricao = ?, preco = ?, categoria = ?, imagem_url = ? WHERE id = ?";
        connection.query(sql, [item.nome, item.descricao, item.preco, item.categoria, item.imagem_url, id], callback);
    },

    // Função que deleta um item do cardápio
    deleteItem: (connection, id, callback) => {
        const sql = "DELETE FROM cardapio WHERE id = ?";
        connection.query(sql, [id], callback);
    },

    // Função que busca todas as categorias disponíveis
    getCategories: (connection, callback) => {
        const sql = "SELECT DISTINCT categoria FROM cardapio ORDER BY categoria";
        connection.query(sql, callback);
    }
}