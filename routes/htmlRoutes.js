var db = require("../models");

module.exports = function(app) {
  // Default Code - Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  app.get("/createpost", function(req, res) {
    res.render("createpost", {});
  });

  // "/updateprofile" - Page with form to update existing profile
  // "/network" - Load table of user profiles
  // "/posts" - Load main page with a table of posts
  // "/createpost" - Page with form to create new post
  // "/updatepost" - Page with form to update existing post

  app.get("/posts", function(req, res) {
    res.render("posts", {});
  });

  //************************************************/
  // Load single profile by id

  app.get("/profile/:id", function(req, res) {
    db.Profile.findOne({ where: { id: req.params.id } }).then(function(
      oneProfile
    ) {
      res.render("singleProfile", {
        profile: oneProfile
      });
    });
  });

  // Load single post by id
  app.get("/posts/:id", function(req, res) {
    db.Profile.findOne({
      where: { id: req.params.id },
      include: [db.Profile]
    }).then(function(onePost) {
      res.render("singleProfile", {
        post: onePost
      });
    });
    // Add in code to findAll Comments associated with the post
  });
  //************************************************/
  // Render 404 page for any unmatched routes

  app.get("*", function(req, res) {
    res.render("404");
  });
};
