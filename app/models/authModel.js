// app/models/authModel.js

module.exports = {
    // Buscar usuário por email
    buscarPorEmail: (db, email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        console.log('[authModel] Buscando usuário por email:', email);
        db.query(sql, [email], callback);
    },

    // Criar novo usuário
    criarUsuario: (db, usuario, callback) => {
        const sql = `
            INSERT INTO usuarios (nome, email, senha, tipo)
            VALUES (?, ?, ?, ?)
        `;
        const { nome, email, senha, tipo } = usuario;
        console.log('[authModel] Criando novo usuário:', email);
        db.query(sql, [nome, email, senha, tipo], callback);
    },

    // Buscar usuário por ID
    buscarPorId: (db, id, callback) => {
        const sql = 'SELECT id, nome, email, tipo FROM usuarios WHERE id = ?';
        console.log('[authModel] Buscando usuário por ID:', id);
        db.query(sql, [id], callback);
    }
};