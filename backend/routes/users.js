import User from '../Models/User.js'

export function readUserById(req, res){
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

export function updateUserById(req, res){
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
        {new: true},
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

export async function findUserByManagerIDandCompanyID(req, res){
    const {managerId, companyId} = req.params;
    const users = await User.find({"managerId": managerId, "companyId": companyId});
    if (users.length != 0) {
        res.status(200).send({ message: "Successfully retrieved users", user: users });
    } 
    else {
        res.status(404).send("No such user exists");
    }
}