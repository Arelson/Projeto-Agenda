const Login = require('../models/loginModel.js')


exports.index = (req, res) => {
    res.render('login')
};

exports.register = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.register();

        if (login.error.length > 0) {
          req.flash('error', login.error);
          req.session.save(function () {
            return res.redirect("/login/");
          });
          return;
        }

         req.flash('success', 'Seu usuario foi criado com sucesso');
         req.session.save(function () {
           return res.redirect('/login/');
         });
    } catch (error) {
        console.log(error)
        return res.render('404');
    }

};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.error.length > 0) {
      req.flash("error", login.error);
      req.session.save(function () {
        return res.redirect("/login/");
      });
      return;
    }

    req.flash("success", "Voce esta logado");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.logout = (req, res) => {

  req.session.destroy();
  res.redirect('/');

}
