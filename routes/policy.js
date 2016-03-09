module.exports = {
  isLoggedin: function (req, res, next) {
    // body...
    if (req.session.user) next();
    else res.redirect('/login');
  }
};
