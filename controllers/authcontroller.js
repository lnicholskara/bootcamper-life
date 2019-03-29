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

exports.createpost = function(req, res) {
  res.render("createpost");
};

exports.singlepost = function(req, res) {
  res.render("single-post");
};

exports.network = function(req, res) {
  res.render("network");
};

exports.myaccount = function(req, res) {
  res.render("myaccount");
};

exports.logout = function(req, res) {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
