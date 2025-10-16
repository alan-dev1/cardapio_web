module.exports.paginaNaoEncontrada = (app, req, res) => {
    console.log('[404] Página não encontrada: ', req.originalUrl);
    res.status(404).render('404.ejs')
}