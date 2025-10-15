let express = require('express'); // Importa o framework Express
let app = express(); // Cria uma nova instância do Express
let port = 3000; // Define a porta que o servidor irá escutar

// Configuração do servidor
app.set('view engine', 'ejs'); // Define o motor de visualização como EJS (Embedded JavaScript)
app.set('views', './views'); // Define o diretório onde as views (templates) estão armazenadas
app.use('/public', express.static('public')); // Define o diretório 'public' como estático para servir arquivos CSS, JS, imagens, etc.
app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados de formulários URL-encoded (como aqueles enviados por POST)
app.use(express.json()); 
// Coloca o servidor no ar
app.listen(port, function() {
    console.log('Servidor rodando com express na porta', port); // Log para confirmar que o servidor está em execução
});

// Exporta a instância do aplicativo para que possa ser usada em outros módulos
module.exports = app;
