const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        require:[true,'no name'],
        minLength:2,
        maxLength:50,
        trim:true
     },
     email:{
        type:String,
        required:[true,'email is mandatory'],
        unique:true,
        trim:true,
     }
})


const Users = mongoose.model('User',userSchema);
module.exports = Users;