const app = require('./config/serve');
const routes = require('./app/routes/routes');

// ==================== ROTAS DO CARDÁPIO ====================
routes.cardapioList(app);
routes.cardapioByCategory(app);
routes.cardapioItem(app);
routes.cardapioAddForm(app);
routes.cardapioSave(app);
routes.cardapioEditForm(app);
routes.cardapioUpdate(app);
routes.cardapioDelete(app);