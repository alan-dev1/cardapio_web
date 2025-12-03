const dbConn = require('../../config/dbConnection');
const { getProdutosPorCategoria } = require('../models/homeModel');

module.exports.home = (app, req, res) => {
    console.log('[Controller da Home]');

    const db = dbConn();

    // Busca 2 lanches
    getProdutosPorCategoria(db, 'Lanches', 4, (error, lanches) => {
        if (error) {
            console.log('Erro ao buscar lanches:', error);
            res.send('Erro ao buscar lanches no banco de dados.');
            return;
        }

        // Busca 2 bebidas
        getProdutosPorCategoria(db, 'Bebidas', 4, (error, bebidas) => {
            if (error) {
                console.log('Erro ao buscar bebidas:', error);
                res.send('Erro ao buscar bebidas no banco de dados.');
                return;
            }

            // Renderiza a view home.ejs
            res.render('home.ejs', { lanches, bebidas });
        });
    });
};
