var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  var User = user;

  var LocalStrategy = require("passport-local").Strategy;
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
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

              firstname: req.body.firstname,

              lastname: req.body.lastname
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
};
/*passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id = ?", [id], function(
      err,
      rows
    ) {
      done(err, rows[0]);
    });
  });

  passport.use(
    "local-signup",
    new localStrategy(
      {
        emailField: "email",
        passwordField: "password_hash",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        connection.query(
          "SELECT * FROM users WHERE email = ? ",
          [email],
          function(err, rows) {
            if (err) {
              return done(err);
            }
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That is already taken")
              );
            } else {
              var newUserMysql = {
                email: email,
                password: bcrypt.hashSync(password, null, null)
              };

              var insertQuery =
                "INSERT INTO users (email, password_hash) values (?,?)";

              connection.query(
                insertQuery,
                [newUserMysql.email, newUserMysql.password_hash],
                function(err, rows) {
                  newUserMysql.id = rows.insertId;

                  return done(null, newUserMysql);
                }
              );
            }
          }
        );
      }
    )
  );

  passport.use(
    "local-login",
    new localStrategy(
      {
        emailField: "email",
        passwordField: "password_hash",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        connection.query(
          "SELECT * FROM users WHERE email = ? ",
          [email],
          function(err, rows) {
            if (err) {
              return done(err);
            }
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No User Found")
              );
            }
            if (!bcrypt.compareSync(password, rows[0].password_hash)) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Wrong Password")
              );
            }

            return done(null, rows[0]);
          }
        );
      }
    )
  );*/
