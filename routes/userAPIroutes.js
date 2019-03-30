var db = require("../models");

module.exports = function(app) {
  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(newProfile) {
      res.json(newProfile);
    });
  });
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
  //Get or Read All User Information
  app.get("/api/users/", function(req, res) {
    db.User.findAll({
      where: { active: true },
      order: [["id", "DESC"]],
      include: [db.Post]
    }).then(function(allProfiles) {
      res.render(allProfiles);
    });
  });
  //Get or Read One User's Information
  app.get("/api/users/:id", function(req, res) {
    db.User.findByPk(req.params.id).then(function(oneUser) {
      res.json(oneUser);
    });
  });
};
