import User from '../Models/User.js'

// Creating the signin function for the post route
export default function login(req, res) {
    const { email, password } = req.body;
    // Find user by email
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(400).send(err);
        }
        // If the user is found
        if (user) {
            if (password === user.password) {
                res.status(200).send({ message: "Login Success", user: user});
            }
            else {
                res.status(401).send({
                    "error": "auth-0001",
                    "message": "Incorrect username or password",
                    "detail": "Ensure that the username and password included in the request are correct"
                });
            }
        }
        else {
            res.status(401).send({
                "error": "auth-0001",
                "message": "Incorrect username or password",
                "detail": "Ensure that the username and password included in the request are correct"
            });;
        }
    });
};