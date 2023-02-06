const User = require('../models/user')

//validation
const validation = (err) => {
    const errors = {email:'',password:''}
    console.log(err.code,err.message);
    if(err.message === 'wrong password'){
        errors.password = 'wrong password';
        return errors;
    }
    if(err.message === 'wrong email'){
        errors.email = 'wrong email';
        return errors;
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach((properties)=>{
            errors[properties.path] = properties.message
        })
        return errors;
    }
};

const users_list = (req,res)=>{
    User.find()
        .then((result)=>{
            res.json(result);
        })
        .catch(err => console.log(err))
}
const user_add = async (req,res)=>{
    const user = new User(req.body)
    const checkEmail = await User.find({email:req.body.email})
    if(checkEmail.length != 0){
        res.status(400).json({errors:{eamil:'email already exists'}})
    }else{
    user.save()
        .then(()=>{
            res.status(200).json({user:user._id})
        })
        .catch((err)=>{
            console.log(err);

            const error = validation(err)
            res.status(400).json({ error })
        })
    }
}
const user_login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user= await User.login(email,password);
        res.status(200).json({user:user._id});
    } catch (err) {
        const error = validation(err);
        res.status(400).json({error})
    }

}
module.exports = {
    users_list,
    user_add,
    user_login
}