var db = require("../models");

module.exports = function(app) {
  // Default Code - Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // "/network" - Load table of user profiles
  // "/createprofile" - Page with form to create new profile
  // "/updateprofile" - Page with form to update existing profile

  // "/posts" - Load main page with a table of posts
  // "/createpost" - Page with form to create new post
  // "/updatepost" - Page with form to update existing post

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
  app.get("/post/:id", function(req, res) {
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
