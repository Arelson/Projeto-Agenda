exports.middlewareGlobal = (req, res, next) => {
  if (req.body?.cliente) {
    console.log(`Eu te vi: ${req.body.cliente}`);
  }
  
  res.locals.Varlocal = 'esse é o valor da var local';
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrf = req.csrfToken();

  next();
}
