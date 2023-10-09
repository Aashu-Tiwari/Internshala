const mongoose = require("mongoose");


const internshipsModel = new mongoose.Schema({
    students:[{type:mongoose.Schema.Types.ObjectId, ref:"student"}],
    employe:{type:mongoose.Schema.Types.ObjectId, ref:"employe"},
    profile: String,
    skill:String,
    internshiptype:{type:String,enum:["In Office","Remote"]},
    openings:Number,
    from:String,
    to:String,
    duration:String,
    responsibility:String,
    stipend:{
        status:{
            type:String,
            enum:["Fixed","Negotiable","Performance based","unpaid"]
        },
        amount:Number,
    },
    perks:String,
    assesments:String,

},{timestamps:true}
);

const Internships = mongoose.model("internships",internshipsModel)

module.exports = Internships;