/* eslint-disable prettier/prettier */
var db = require("../models");

// var authController = require("../controllers/authcontroller.js");

module.exports = function (app) {
  // Default Code - Load index page
  app.get("/", function (req, res) {
    res.render("index", {});
  });

  // "/reset" - Page where user resets the password
  app.get("/reset", function (req, res) {
    res.render("reset", {});
  });

  // "/profile" - Page where user lands after login
  app.get("/profile", isLoggedIn, function (req, res) {
    res.render("profile", {
      user: req.user
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  function isLoggedIn(req, res, next) {
    if (req.isauthenticated()) {
      return next();
    }
    res.redirect("/");
  }

  // "/updateprofile" - Page with form to update existing profile
  // "/network" - Load table of user profiles
  // "/posts" - Load main page with a table of posts
  app.get("/posts", function (req, res) {
    res.render("posts", {});
  });
  // "/createpost" - Page with form to create new post
  // "/updatepost" - Page with form to update existing post

  //************************************************/
  // Load single profile by id

  app.get("/profile/:id", function (req, res) {
    db.Profile.findOne({ where: { id: req.params.id } }).then(function (
      oneProfile
    ) {
      res.render("singleProfile", {
        profile: oneProfile
      });
    });
  });

  // Load single post by id
  app.get("/posts/:id", function (req, res) {
    db.Profile.findOne({
      where: { id: req.params.id },
      include: [db.Profile]
    }).then(function (onePost) {
      res.render("singleProfile", {
        post: onePost
      });
    });
    // Add in code to findAll Comments associated with the post
  });
  //************************************************/
  // Render 404 page for any unmatched routes

  app.get("*", function (req, res) {
    res.render("404");
  });
};
