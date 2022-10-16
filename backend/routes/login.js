import User from '../Models/User.js'

// Creating the signin function for the post route
export default function login(req, res) {
    const { email, password} = req.body;
    // Find user by email
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.send({error: err});
        }
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Success", user: user});
            }
            else {
                res.send({ message: "Incorrect Password" });
            }
        }
        else {
            res.send(`${email} isnt a registered email.`);
        }
    });
};