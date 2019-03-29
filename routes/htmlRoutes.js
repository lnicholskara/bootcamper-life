/* eslint-disable prettier/prettier 
var db = require("../models");*/

module.exports = function(app) {
  // Default Code - Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  app.get("/createpost", function(req, res) {
    res.render("createpost", {});
  });

  app.get("/posts=:id", function(req, res) {
    res.render("single-post", { postID: req.params.id });
  });

  // "/myaccount" - Page with form to update existing profile
  // "/network" - Load table of user profiles
  // "/posts" - Load main page with a table of posts
  // "/createpost" - Page with form to create new post
  // "/updatepost" - Page with form to update existing post

  app.get("/posts", function(req, res) {
    res.render("posts", {});
  });

  //************************************************/
  // Render 404 page for any unmatched routes

  app.get("*", function(req, res) {
    res.render("404");
  });
};
