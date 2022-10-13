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

// Sign in method TODO
exports.signin = (req, res) => {
  let { email, password } = req.body;

  User.findone({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        if (password !== user.password) {
          return res.satus(400).json({ errors: [{ password: "incorrect" }] });
        }
      }
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
