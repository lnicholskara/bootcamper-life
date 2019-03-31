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

  app.get("/api/myposts", function(req, res) {
    db.Post.findAll({
      where: { active: true, UserId: req.user.id },
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

  // Get all comments
  app.get("/api/comments", function(req, res) {
    db.Comment.findAll({
      where: { active: true },
      order: [["id", "DESC"]]
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
      order: [["id", "DESC"]]
    }).then(function(commentsPerPost) {
      res.json(commentsPerPost);
    });
  });
  //******************** CREATE ****************************/

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

  // Update post
  app.put("/api/posts/:id", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.params.id
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
        id: req.params.id
      }
    }).then(function(softDelComment) {
      res.json(softDelComment);
    });
  });
};
