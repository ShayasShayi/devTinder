const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        requied:true,
        minLength:3,
        maxLength:50,
        trim:true
    },
    lastName:{
        type:String,
        requied:true,
        minLength:3,
        maxLength:50,
        trim:true
    },
    email:{
        type:String,
        requied:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a valid password")
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender found");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
    },
    about:{
        type:String,
        default:"This is sample about me"
    },
    skills:{
        type:[String]
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);