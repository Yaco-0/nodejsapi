const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'email is require'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'the email is invalid']
    },
    password:{
        type : String,
        required:[true,'password is require'],
        minlength:[8,'password must has 8 characher or above']
    }

},{timeseries:true});

userSchema.index({ email: 1}, { unique: true })

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);

    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email:email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }else{
            throw Error('wrong password');
        }
    }else{
        throw Error('wrong email');
    }
}

const User = mongoose.model("User",userSchema);
module.exports = User;