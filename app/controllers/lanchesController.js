const dbConn = require('../../config/dbConnection');
const { getProdutosPorCategoria } = require('../models/homeModel');

module.exports.lanches = (app, req, res) => {
    console.log('[Controller Lanches]');
    const db = dbConn();

    getProdutosPorCategoria(db,'Lanches', null, (error, result) => {
        if(error) {
            console.log('Erro ao buscar lanches: ', error);
            res.send('Erro ao buscar lanches no banco de dados.');
            return;
        }

        res.render('lanches.ejs', { lanches: result });
    });
};

