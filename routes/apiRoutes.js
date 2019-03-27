var db = require("../models");

module.exports = function(app) {
  //******************** READ ****************************/
  // Get all users
  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findAll({ include: [db.Profile, db.Comment] }).then(function(
      allProfiles
    ) {
      res.json(allProfiles);
    });
  });

  // Get all posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(allPosts) {
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
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(newProfile) {
      res.json(newProfile);
    });
  });

  // Create a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
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
  app.put("/api/users/:id", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(updatedProfile) {
      res.json(updatedProfile);
    });
  });

  // Update post
  app.put("/api/posts/:id", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(updatedPost) {
      res.json(updatedPost);
    });
  });
};
