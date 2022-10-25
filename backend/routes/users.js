import User from '../Models/User.js'

export default function readUserById(req, res){
    const { userId } = req.params;
   
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else if (user) {
            res.status(200).send({ message: "Successfully retrieved user", user: user });
        } else {
            res.status(404).send("The user does not exist.");
        }
    })
}

export default function updateUser(req, res){
    const {userId} = req.params;
    const {
        firstName, 
        lastName, 
        email, 
        password,
    } = req.body;
    
    User.findByIdAndUpdate(
        userId,  
        { "firstName": firstName, "lastName": lastName, "email": email, "password": password}, 
        (err, user) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else if (user){
            res.status(200).send({message: "Successfully updated user.", user: user});
        } else {
            res.status(404).send("The user does not exist.");
        }
     });
}


