var db = require("../models");

module.exports = function(app) {
  //******************** READ ****************************/
  // Get all users
  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({
      where: { active: true },
      order: [["id", "DESC"]],
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: { id: req.params.id, active: true },
      include: [db.User]
    }).then(function(onePost) {
      res.json(onePost);
    });
  });

  app.get("/api/users/", function(req, res) {
    db.User.findAll({
      where: { active: true },
      order: [["id", "DESC"]],
      include: [db.Post]
    }).then(function(allProfiles) {
      res.json(allProfiles);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findByPk(req.params.id).then(function(oneUser) {
      res.json(oneUser);
    });
  });

  // Get all comments
  app.get("/api/comments", function(req, res) {
    db.Comment.findAll({
      where: { active: true },
      order: [["votes", "DESC"]]
    }).then(function(allComments) {
      res.json(allComments);
    });
  });
  // Get comments for one specific post
  app.get("/api/comments/:id", function(req, res) {
    db.Comment.findAll({
      where: {
        PostId: req.params.id,
        active: true
      },
      include: [db.User],
      order: [["votes", "DESC"]]
    }).then(function(commentsPerPost) {
      res.json(commentsPerPost);
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
    var newPost = req.body;
    newPost.UserId = req.user.id;
    db.Post.create(newPost).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Create a new comment
  app.post("/api/comments", function(req, res) {
    var newComment = req.body;
    newComment.UserId = req.user.id;
    db.Comment.create(newComment).then(function(dbComment) {
      res.json(dbComment);
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
  //********************* DELETE ***************************/
  //Soft delete for comments
  app.put("/api/comments/:id", function(req, res) {
    db.Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(softDelComment) {
      res.json(softDelComment);
    });
  });
};
