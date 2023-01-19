const User = require('../models/user')
const users_list = (req,res)=>{
    User.find()
        .then((result)=>{
            res.json(result);
        })
        .catch(err => console.log(err))
}
const user_add = (req,res)=>{
    const user = new User(req.body)
    user.save()
        .then(()=>{
            res.json({message : "success"})
        })
        .catch((err)=>{
            console.log(err);
        })
}
module.exports = {
    users_list,
    user_add
}