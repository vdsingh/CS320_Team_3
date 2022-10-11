/*
    Using JSON web tokens, one a user is logged in,
    each subsequent request will include the JWT,
    allowing the user to access routes, services, and resources
    that are permitted with that token.
*/
import User from '../Models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Another auth file in a new utils folder will set the parameters
// for the JWT, including expiration time
import { createJWT } from '../utils/auth';

// Sign in method TODO
exports.signin = (req, res) => {
    let { email, password } = req.body
    
    User.findone({email: email}).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found"}]
            });
        }
        else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.satus(400).json({ errors: [{ password: "incorrect" }]});
                }
            });
        }
        let accessToken = createJWT(user.email, user._id, 3600);
    })
}