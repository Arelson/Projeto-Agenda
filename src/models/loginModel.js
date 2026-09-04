const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.error = [];
        this.user = null;
    }

    async register() {
        this.valida();

        if (this.error.length > 0) {
            return;
        }

        await this.userExist();

        if (this.error.length > 0) {
          return;
        }

        //Criando o hash da senha antes de salva no banco de dados
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

       
        this.user = await LoginModel.create(this.body);

    }

    async userExist() {
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (this.user) this.error.push('Esse e-mail ja esta registrado');

    }

    valida() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) {
            this.error.push('Email invalido')
        }

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.error.push('A senha precisa ter entre 3 a 50 caracteres')
        }

    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
           } 
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

    async login() {
        this.valida();

        if (this.error.length > 0) {
          return;
        }

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.error.push('E-mail não cadastrado');
            return
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.error.push('Campos invalidos');
            this.user = null;
            return;
        }
    }
}

module.exports = Login;
