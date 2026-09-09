const Contato = require('../models/contatoModel.js')

exports.index = (req, res) => {
    res.render('contato', {cont:{}});
}

exports.register = async (req, res) =>{
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.error.length > 0) {
          req.flash("error", contato.error);
          req.session.save(() => res.redirect("/contato"));
          return;
        }

        req.flash("success", "Contato registrado");
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }  
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    
    try {
        const cont = await Contato.buscaporID(req.params.id);
        
        if (!cont) return res.render('404');

        res.render("contato", { cont });

    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};

exports.edit = async (req, res) => {
    if (!req.params.id) return res.render("404");
    
    try {
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.error.length > 0) {
          req.flash("error", contato.error);
          req.session.save(() => res.redirect("/contato"));
          return;
        }

        req.flash("success", "Contato Atualizado");
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (error) {
        console.log(error);
        return res.render("404");
    }
    
}
