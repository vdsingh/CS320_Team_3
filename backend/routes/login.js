import User from '../Models/User.js'

// Creating the signin function for the post route
export const signin = (req, res) => {
    const { email, password} = req.body;
    // Find user by email
    User.findone({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Success", user: user});
            }
            else {
                res.send({ message: "Incorrect Password" });
            }
        }
        else {
            res.send("Couldn't find user");
        }
    });
};