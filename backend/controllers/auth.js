/*
    Using JSON web tokens, one a user is logged in,
    each subsequent request will include the JWT,
    allowing the user to access routes, services, and resources
    that are permitted with that token.
*/
import User from "../Models/User";
import jwt from "jsonwebtoken";

// Another auth file in a new utils folder will set the parameters
// for the JWT, including expiration time
import { createJWT } from "../utils/auth";

// This email regular expression will let us return better error messages if a person tries to sign in with an invalid email
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Sign in method
exports.signin = (req, res) => {
  let { email, password } = req.body;

  // Check validity of inputs, check if password and email fails are filled
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ passowrd: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  
  User.findone({ email: email })
    .then((user) => {
      // If user is not found return error
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
        // If user is found but the passwords don't match return error
      } else {
        if (password !== user.password) {
          return res.satus(400).json({ errors: [{ password: "incorrect" }] });
        }
      }
      // Create our jwt access token since the user does exist and inputed valid password
      let access_token = createJWT(user.email, user._id, 3600);
      jwt
        .verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
            res.status(500).json({ errors: err });
          }
          if (decoded) {
            return res
              .status(200)
              .json({ success: true, token: access_token, message: user });
          }
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};
