const Contato = require('../models/contatoModel.js')

exports.index = async (req, res) => {
    try {
        const contatos = await Contato.buscaContatos();
        res.render("index", { contatos });
    } catch (error) {
        console.log(error);
        return res.render("404");
    }

}



