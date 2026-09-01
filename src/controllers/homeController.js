exports.paginaInicial = (req, res) => {
    // req.flash('info', 'Ola mundo');
    // req.flash('error', 'errorerrorerrorerrorerror');
    // req.flash('success', 'yayayayayayyayayayaya');
    console.log(req.flash('error'), req.flash('success'), req.flash('info'));
    req.session.usuario = { nome: 'Arlison', logado: true };

    res.render('index', {
        titulo: 'Titulo de exmplo para teste',
        numero: [1,2,3,4,5,6]
    });

    return;
}

exports.trataPost = (req, res) => {
    res.send(req.body);
    console.log(req.body)
    return;
};

