const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const studentModel = new mongoose.Schema({
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
    city:{
        type:String,
        required:[true,"City is required"],
        minLength:[3,"City should have atleast 3 characters"]
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
        enum:["Male","Female","Others"]
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
    avatar:{
        type:Object,
        default:{
            fileId:'',
            url:"https://images.unsplash.com/photo-1695017144255-5e60e5362fb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
        },
    },
    resume:{
        education:[],
        jobs:[],
        internships:[],
        responsibilities:[],
        courses:[],
        projects:[],
        skills:[],
        accomplishments:[]
    },
    internships:[{
        type:mongoose.Schema.Types.ObjectId, ref:"internships"
    }],
    jobs:[{
        type:mongoose.Schema.Types.ObjectId, ref:"jobs"
    }],


},{timestamps:true})



// password bcrypt 
studentModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})

// comapre password with your password and bcrypt password 

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
const student = mongoose.model("student",studentModel)

module.exports = student;