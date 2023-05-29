const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const dbConnection = require("../scripts/database");
const ObjectId = require("mongodb").ObjectId;

const configurePassport = (passport, db) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const db = await dbConnection();
          const usersCollection = db.collection("users");
          const user = await usersCollection.findOne({ email });
          // If no user by that name throw error.
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          //If password is wrong throw an error
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          // Set the current user to the logged in user
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const db = await dbConnection();
      const usersCollection = db.collection("users");
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = configurePassport;
