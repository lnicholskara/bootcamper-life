require("dotenv").config();
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  var User = user;

  // var LocalStrategy = require("passport-local").Strategy;
  var HerokuStrategy = require("passport-heroku").Strategy;

  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  //LOCAL SIGNUP
  passport.use(
    new HerokuStrategy(
      {
        clientID: "b24ac9ad-f474-4ba2-a2c6-331b4c745ebb",
        clientSecret: "340ee250-8900-4a62-80cc-943bff810519",
        callbackURL: "http://127.0.0.1:3000/auth/heroku/callback"
      },

      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            var userPassword = generateHash(password);

            var data = {
              email: email,

              password: userPassword,

              first_name: req.body.first_name,

              last_name: req.body.last_name,

              school: req.body.school,

              graduated_yet: req.body.graduated_yet,

              city: req.body.city,

              state: req.body.state,

              github_link: req.body.github_link
            };

            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }

              console.log(created);
            });
          }
        });
      }
    )
  );
  //LOCAL SIGNIN
  passport.use(
    new HerokuStrategy(
      {
        clientID: "b24ac9ad-f474-4ba2-a2c6-331b4c745ebb",
        clientSecret: "340ee250-8900-4a62-80cc-943bff810519",
        callbackURL: "http://127.0.0.1:3000/auth/heroku/callback"
      },

      function(req, email, password, done) {
        var User = user;

        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};
