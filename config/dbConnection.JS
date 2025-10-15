const mysql = require('mysql2'); // Importa o pacote mysql2 para conectar ao banco de dados MySQL

// Configurações da conexão com o banco de dados
const host = 'localhost'; // O endereço do servidor MySQL (localhost indica que o banco está na mesma máquina)
const database = 'cardapio'; // Nome do banco de dados que será utilizado
const user = 'root'; // Nome do usuário do banco de dados
const password = '1234'; // Senha do usuário do banco de dados

// Exporta uma função que retorna uma nova conexão com o banco de dados
module.exports = () => {
    return dbConn = mysql.createConnection({
        host: host,        // Passa o host para a configuração da conexão
        user: user,        // Passa o usuário para a configuração da conexão
        password: password, // Passa a senha para a configuração da conexão
        database: database  // Passa o nome do banco de dados para a configuração da conexão
    }); 
}
