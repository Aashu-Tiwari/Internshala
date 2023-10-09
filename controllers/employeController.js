
const {CatchAsyncErrors} = require("../middlewares/CatchAsyncErrors");
const Employe = require("../Models/employeeModel");
const Internship = require("../Models/internshipsModel")
const Job = require("../Models/jobModel")
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const path = require("path")
const imagekit = require("../utils/imagekit").initImageKit()

exports.homepage = CatchAsyncErrors(async(req,res,next)=>{
        res.json({message:"Secure Employe homepage"})
})

exports.currentemploye = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.id).exec();
        res.json({employe})
})

exports.employesignup = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await new Employe(req.body).save();
        sendtoken(employe,201,res)
})

exports.employesignin = CatchAsyncErrors(async(req,res,next)=>{
        // register user find
        const employe = await Employe.findOne({email:req.body.email})
        // get password while finding data 
        .select("+password")
        .exec();

        if(!employe) return next(new ErrorHandler("User not found with this email address",404))


        const isMatch = employe.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("wrong credentials",500))
        sendtoken(employe,200,res)

})

exports.employesignout = CatchAsyncErrors(async(req,res,next)=>{
        res.clearCookie("token");
        res.json({message:'successfully signout!'})
})


exports.employesendmail = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findOne({email:req.body.email}).exec()

        if (!employe)
                return next(
                        new ErrorHandler("User not found with this email address",404)
        );
        const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;
        sendmail(req,res,next,url);
        employe.resetpasswordToken = "1";
        await employe.save()
        res.json({employe,url});
})


exports.employeforgetlink = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.params.id).exec()

        if (!employe)
                return next(
                        new ErrorHandler("User not found with this email address",404)
        );
        if(employe.resetpasswordToken=="1"){
                employe.resetpasswordToken = "0"
                employe.password = req.body.password;
        }else{
                return next(
                        new ErrorHandler("Invalid Reset Password Link! Please Try Again",500)
        );
        }
        await employe.save();
        res.status(200).json({
                message:"Password has been successfully changed"
        })
})



exports.employeresetpassword = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.id).exec()
        employe.resetpasswordToken = "0"
        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe,201,res)
})


exports.employeupdate = CatchAsyncErrors(async(req,res,next)=>{
        await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
        res.status(200).json({
                success:true,
                message:"employe updated successfully"      
        })
})


exports.employeavatar = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.params.id).exec();
        const file = req.files.organizationlogo;
        const modifiedFilename = `resumebuilder-${Date.now()}${path.extname(
                file.name 
        )}`;

        if(employe.organizationlogo.fileId !==""){
                await imagekit.deleteFile(employe.organizationlogo.fileId)
        }

        const {fileId,url} = await imagekit.upload({
                file:file.data,
                fileName:modifiedFilename
        })
        employe.organizationlogo = {fileId,url}
        await employe.save();
        res.status(200).json({
                success:true,
                message:"Profile updated successfully"      
        })
})



// ==================================Internships=======================================


exports.createinternship = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.id).exec();
        const internship = await new Internship(req.body)
        internship.employe = employe._id;
        employe.internships.push(internship._id);
        await internship.save();
        await employe.save();
        res.status(201).json({success:true,internship})
})

exports.readinternship = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.id)
        .populate("internships").exec();
        res.status(200).json({success:true,internships})
})

exports.readsingleinternship = CatchAsyncErrors(async(req,res,next)=>{
        const internship = await Internship.findById(req.params.id).exec();
        res.status(200).json({success:true,internship})
})


// ==================================Jobs=======================================


exports.createjob = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.id).exec();
        const job = await new Job(req.body)
        job.employe = employe._id;
        employe.jobs.push(job._id);
        await job.save();
        await employe.save();
        res.status(201).json({success:true,job})
})

exports.readjob = CatchAsyncErrors(async(req,res,next)=>{
        const employe = await Employe.findById(req.id)
        .populate("jobs").exec();
        res.status(200).json({success:true,jobs})
})

exports.readsinglejob = CatchAsyncErrors(async(req,res,next)=>{
        const job = await Job.findById(req.params.id).exec();
        res.status(200).json({success:true,job})
})



