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

// Sign up method
export function signup(req, res, next) {
    let { 
        firstName,
        lastName, 
        email,
        password,
        password_confirmation,
        isManager
    } = req.body
    // Check if user already exists
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists"}]});
            }
            // If user doesn't exist, make a new user
            else {
                const user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    isManager: isManager
                });
            }
            // We don't need to hash passwords right???
        });
}

// Sign in method TODO
