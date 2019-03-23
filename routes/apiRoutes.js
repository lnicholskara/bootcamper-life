var db = require("../models");

module.exports = function(app) {
  //******************** READ ****************************/
  // Get all users
  app.get("/api/profiles", function(req, res) {
    db.Profile.findAll({ include: [db.Post, db.Comment] }).then(function(
      allProfiles
    ) {
      res.json(allProfiles);
    });
  });

  // Get all posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({ include: [db.Profile, db.Comment] }).then(function(
      allPosts
    ) {
      res.json(allPosts);
    });
  });

  // Get all comments
  app.get("/api/comments", function(req, res) {
    db.Comment.findAll({ include: [db.Profile, db.Post] }).then(function(
      allComments
    ) {
      res.json(allComments);
    });
  });
  //******************** CREATE ****************************/
  // Create a new user
  app.post("/api/profiles", function(req, res) {
    db.Profile.create(req.body).then(function(newProfile) {
      res.json(newProfile);
    });
  });

  // Create a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(newPost) {
      res.json(newPost);
    });
  });

  // Create a new comment
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(newComment) {
      res.json(newComment);
    });
  });
  //********************* UPDATE ***************************/
  // Update user
  app.put("/api/profiles", function(req, res) {
    db.Profile.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(updatedProfile) {
      res.json(updatedProfile);
    });
  });

  // Update post
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(updatedPost) {
      res.json(updatedPost);
    });
  });
  //******************** DELETE ****************************/
  // Default Example - Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
