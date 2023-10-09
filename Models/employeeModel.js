const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const employeModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Firstname is required"],
        minLength:[4,"Firstname should have atleast 4 characters"]
    },
    lastname:{
        type:String,
        required:[true,"Lastname is required"],
        minLength:[4,"Lastname should have atleast 4 characters"]
    },
    contact:{
        type:String,
        required:[true,"Contact is required"],
        maxLength:[10,"Contact must not atleast 10 characters"],
        minLength:[10,"Contact should have atleast 10 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,"Password should not exceed more than 15 characters "],
        minLength:[6,"Password should have 6 characters "],
        // match:[]
    },
    resetpasswordToken:{
        type:String,
        default:"0"
    },
    organizationname:{
        type:String,
        required:[true,"organizationname is required"],
        minLength:[4,"organizationname should have atleast 4 characters"]
    },
    organizationlogo:{
        type:Object,
        default:{
            fileId:'',
            url:"https://images.unsplash.com/photo-1695017144255-5e60e5362fb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        },
    },
    internships:[{
        type:mongoose.Schema.Types.ObjectId, ref:"internships"
    }],
    jobs:[{
        type:mongoose.Schema.Types.ObjectId, ref:"jobs"
    }],

},{timestamps:true})



// password bcrypt 
employeModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})

// comapre password with your password and bcrypt password 

employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

employeModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
const Employe = mongoose.model("employe",employeModel)

module.exports = Employe;