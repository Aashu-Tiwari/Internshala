
const {CatchAsyncErrors} = require("../middlewares/CatchAsyncErrors");
const Student = require("../Models/StudentModel");
const Internship = require("../Models/internshipsModel");
const Job = require("../Models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const path = require("path")
const imagekit = require("../utils/imagekit").initImageKit()

exports.homepage = CatchAsyncErrors(async(req,res,next)=>{
        res.json({message:"homepage"})
})

exports.currentuser = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findById(req.id).exec();
        res.json({student})
})

exports.studentsignup = CatchAsyncErrors(async(req,res,next)=>{
        const student = await new Student(req.body).save();
        sendtoken(student,201,res)
})

exports.studentsignin = CatchAsyncErrors(async(req,res,next)=>{
        // register user find
        const student = await Student.findOne({email:req.body.email})
        // get password while finding data 
        .select("+password")
        .exec();

        if(!student) return next(new ErrorHandler("User not found with this email address",404))


        const isMatch = student.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("wrong credentials",500))
        sendtoken(student,200,res)

})

exports.studentsignout = CatchAsyncErrors(async(req,res,next)=>{
        res.clearCookie("token");
        res.json({message:'successfully signout!'})
})


exports.studentsendmail = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findOne({email:req.body.email}).exec()

        if (!student)
                return next(
                        new ErrorHandler("User not found with this email address",404)
        );
        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
        sendmail(req,res,next,url);
        student.resetpasswordToken = "1";
        await student.save()
        res.json({student,url});
})


exports.studentforgetlink = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findById(req.params.id).exec()

        if (!student)
                return next(
                        new ErrorHandler("User not found with this email address",404)
        );
        if(student.resetpasswordToken=="1"){
                student.resetpasswordToken = "0"
                student.password = req.body.password;
        }else{
                return next(
                        new ErrorHandler("Invalid Reset Password Link! Please Try Again",500)
        );
        }
        await student.save();
        res.status(200).json({
                message:"Password has been successfully changed"
        })
})



exports.studentresetpassword = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findById(req.id).exec()
        student.resetpasswordToken = "0"
        student.password = req.body.password;
        await student.save();
        sendtoken(student,201,res)
})


exports.studentupdate = CatchAsyncErrors(async(req,res,next)=>{
        await Student.findByIdAndUpdate(req.params.id,req.body).exec();
        res.status(200).json({
                success:true,
                message:"Student updated successfully"      
        })
})


exports.studentavatar = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findById(req.params.id).exec();
        const file = req.files.avatar;
        const modifiedFilename = `resumebuilder-${Date.now()}${path.extname(
                file.name 
        )}`;

        if(student.avatar.fileId !==""){
                await imagekit.deleteFile(student.avatar.fileId)
        }

        const {fileId,url} = await imagekit.upload({
                file:file.data,
                fileName:modifiedFilename
        })
        student.avatar = {fileId,url}
        await student.save();
        res.status(200).json({
                success:true,
                message:"Profile updated successfully"      
        })
})



// =========================apply internships ===================================


exports.applyinternship = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findById(req.id).exec();
        const internship = await Internship.findById(req.params.internshipid).exec()
        student.internships.push(internship._id);
        internship.students.push(student._id);
        await student.save();
        await internship.save();


        res.json({student, internship})
})


// =========================apply job ===================================


exports.applyjob = CatchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findById(req.id).exec();
        const job = await Job.findById(req.params.jobid).exec()
        student.jobs.push(job._id);
        job.students.push(student._id);
        await student.save();
        await job.save();
        res.json({student,job})
})