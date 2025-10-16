// app/models/dbConnection.js
const mysql = require('mysql2');

// Configurações de conexão com o banco de dados
const host = 'localhost';
const database = 'cardapio_restaurante'; // nome do seu banco
const user = 'root'; // altere se necessário
const password = 'coxinha.123'; // coloque sua senha do MySQL, se tiver

// Exporta a função que cria a conexão
module.exports = () => {
    return mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
};
