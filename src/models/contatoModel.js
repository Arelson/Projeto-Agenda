const mongoose = require("mongoose");
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, require: false, default: "" },
    email: { type: String, require: false, default: "" },
    tel: { type: String, require: false, default: "" },
    criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);


function Contato(body) {

    this.body = body;
    this.error = [];
    this.contato = null;

}

Contato.prototype.valida = function(){
    this.cleanUp();
    if (!validator.isEmail(this.body.email) && this.body.email) this.error.push('Email invalido')
    if (!this.body.nome) this.error.push('Nome é um campo obrigatorio');
    if (!this.body.email && !this.body.tel) this.error.push('Pelo menos um dos contatos deve ser preenchido');

};

Contato.prototype.register = async function () {
  this.valida();

  if (this.error.length > 0) return;

  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.cleanUp = function(){
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        tel: this.body.tel
    };
};
    
Contato.buscaporID = async function (id) {
    if (typeof id !== 'string') return;

    const cont = await ContatoModel.findById(id);

    return cont;
}


module.exports = Contato;
