var authController = require("../controllers/authcontroller");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  //Using LocalStrategy
  // app.post(
  //   "/signup",
  //   passport.authenticate("local-signup", {
  //     successRedirect: "/posts",

  //     failureRedirect: "/signup"
  //   })
  // );

  // Signup using HerokuStrategy
  app.post(
    "/signup",
    passport.authenticate("heroku", {
      successRedirect: "/posts",

      failureRedirect: "/signup"
    })
  );

  // Signin using LocalStrategy
  // app.post(
  //   "/signin",
  //   passport.authenticate("local-signin", {
  //     successRedirect: "/posts",

  //     failureRedirect: "/signin"
  //   })
  // );

  // Signin using HerokuStrategy
  app.post(
    "/signin",
    passport.authenticate("heroku", {
      successRedirect: "/posts",

      failureRedirect: "/signin"
    })
  );

  app.get("/posts", isLoggedIn, authController.posts);
  app.get("/createpost", isLoggedIn, authController.createpost);
  app.get("/single-post", isLoggedIn, authController.singlepost);
  app.get("/myaccount", isLoggedIn, authController.myaccount);
  app.get("/network", isLoggedIn, authController.network);
  app.get("/logout", authController.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};
