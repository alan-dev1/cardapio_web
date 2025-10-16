const dbConn = require('../../config/dbConnection');
const { getProdutosPorCategoria } = require('../models/homeModel');

module.exports.bebidas = (app, req, res) => {
    console.log('[Controller Bebidas}');
    const db = dbConn();

    getProdutosPorCategoria(db,'Bebidas', null, (error, result) => {
        if(error) {
            console.log('Erro ao buscar bebidas: ', error);
            res.send('Erro ao buscar bebidas no banco de dados.');
            return;
        }

        res.render('bebidas.ejs', { bebidas: result});
    });
};