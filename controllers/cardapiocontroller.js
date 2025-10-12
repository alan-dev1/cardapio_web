const dbConnection = require('../../config/dbConnection');
const { 
    getAllItems, 
    getItemsByCategory, 
    getItemById, 
    addItem, 
    updateItem, 
    deleteItem,
    getCategories 
} = require('../models/cardapiomodel');

// Controlador para listar todos os itens do cardápio
module.exports.listAllItems = (app, req, res) => {
    console.log('[Controller Cardapio - List All]');
    const dbConn = dbConnection();

    getAllItems(dbConn, (error, results) => {
        if (error) {
            console.error('Erro ao buscar itens:', error);
            return res.status(500).send('Erro ao buscar itens do cardápio');
        }

        // Organiza itens por categoria
        const itemsByCategory = {};
        results.forEach(item => {
            if (!itemsByCategory[item.categoria]) {
                itemsByCategory[item.categoria] = [];
            }
            itemsByCategory[item.categoria].push(item);
        });

        res.render('cardapio.ejs', { itemsByCategory, items: results });
    });
};

// Controlador para listar itens por categoria
module.exports.listByCategory = (app, req, res) => {
    console.log('[Controller Cardapio - List By Category]');
    const { categoria } = req.query;
    const dbConn = dbConnection();

    getItemsByCategory(dbConn, categoria, (error, results) => {
        if (error) {
            console.error('Erro ao buscar itens por categoria:', error);
            return res.status(500).send('Erro ao buscar itens');
        }

        res.render('cardapioCategoria.ejs', { items: results, categoria });
    });
};

// Controlador para visualizar um item específico
module.exports.viewItem = (app, req, res) => {
    console.log('[Controller Cardapio - View Item]');
    const { id } = req.query;
    const dbConn = dbConnection();

    getItemById(dbConn, id, (error, results) => {
        if (error) {
            console.error('Erro ao buscar item:', error);
            return res.status(500).send('Erro ao buscar item');
        }

        if (results.length === 0) {
            return res.status(404).send('Item não encontrado');
        }

        res.render('itemCardapio.ejs', { item: results[0] });
    });
};

// Controlador para exibir formulário de novo item
module.exports.showAddForm = (app, req, res) => {
    console.log('[Controller Cardapio - Show Add Form]');
    const dbConn = dbConnection();

    getCategories(dbConn, (error, results) => {
        const categorias = results ? results.map(r => r.categoria) : [];
        res.render('inserirItemCardapio.ejs', { 
            errors: [], 
            item: {},
            categorias 
        });
    });
};

// Controlador para adicionar novo item
module.exports.addNewItem = (app, req, res) => {
    console.log('[Controller Cardapio - Add New Item]');
    const item = req.body;
    const dbConn = dbConnection();

    addItem(dbConn, item, (error, result) => {
        if (error) {
            console.error('Erro ao adicionar item:', error);
            return res.status(500).send('Erro ao adicionar item');
        }

        console.log('Item adicionado com sucesso!');
        res.redirect('/cardapio');
    });
};

// Controlador para exibir formulário de edição
module.exports.showEditForm = (app, req, res) => {
    console.log('[Controller Cardapio - Show Edit Form]');
    const { id } = req.params;
    const dbConn = dbConnection();

    getItemById(dbConn, id, (error, results) => {
        if (error) {
            console.error('Erro ao buscar item:', error);
            return res.status(500).send('Erro ao buscar item');
        }

        if (results.length === 0) {
            return res.status(404).send('Item não encontrado');
        }

        getCategories(dbConn, (error, categorias) => {
            const categoriasLista = categorias ? categorias.map(r => r.categoria) : [];
            res.render('editarItemCardapio.ejs', { 
                item: results[0],
                categorias: categoriasLista
            });
        });
    });
};

// Controlador para atualizar item
module.exports.updateItemController = (app, req, res) => {
    console.log('[Controller Cardapio - Update Item]');
    const { id } = req.params;
    const item = req.body;
    const dbConn = dbConnection();

    updateItem(dbConn, id, item, (error, result) => {
        if (error) {
            console.error('Erro ao atualizar item:', error);
            return res.status(500).send('Erro ao atualizar item');
        }

        console.log('Item atualizado com sucesso!');
        res.redirect(`/cardapio/item?id=${id}`);
    });
};

// Controlador para deletar item
module.exports.deleteItemController = (app, req, res) => {
    console.log('[Controller Cardapio - Delete Item]');
    const { id } = req.params;
    const dbConn = dbConnection();

    deleteItem(dbConn, id, (error, result) => {
        if (error) {
            console.error('Erro ao deletar item:', error);
            return res.status(500).send('Erro ao deletar item');
        }

        console.log('Item deletado com sucesso!');
        res.redirect('/cardapio');
    });
};