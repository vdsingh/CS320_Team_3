import User from '../Models/User.js'

export default function read_user(req, res){
    const {email, password} = req.body;

    User.findOne({email: email}, (err, user) =>{
        if (err) return res.status(500).send(err)
        return res.status(200).send(user);
    });
}