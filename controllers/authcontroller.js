var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("signin");
};

exports.posts = function(req, res) {
  res.render("posts");
};

exports.logout = function(req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
