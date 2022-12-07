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

export function findUserByManagerIDandCompanyID(req, res){
    const {managerId, companyId} = req.params;
    User.find({"managerId": managerId, "companyId": companyId}, (err, users) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send({message: "success", user: users});
        }
    })
}

export async function findUserbyUserIdAndCompanyId(req, res) {
    const {employeeId, companyId} = req.params;
    await User.findOne({ employeeId: employeeId, companyId: companyId }).then((user) => {
        if (user) {
            res.status(200).send({ message: "Successfully retrieved users", user: user });
        }
        else {
            res.status(404).send({ message: "No such user exists" });
        }
    });
}