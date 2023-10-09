const {CatchAsyncErrors} = require("../middlewares/CatchAsyncErrors");
const Student = require("../Models/StudentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const {v4 : uuidv4} = require('uuid');

exports.resume = CatchAsyncErrors(async(req,res,next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({resume , message:"secure resume page"})
})
// ==========================Education==============================================

exports.addeducation = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"Education Added"})
})


exports.editeducation = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i)=> i.id===req.params.eduid)
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex],...req.body,}
    await student.save()
    res.json({message:"Education Updated"})
})


exports.deleteeducation = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filterededucation = student.resume.education.filter((i)=> i.id !==req.params.eduid)
    student.resume.education = filterededucation;
    await student.save()
    res.json({message:"Education Deleted"})
})


// ======================================Job==============================================
exports.addjobs = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"Job Added"})
})


exports.editjobs = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const jobsIndex = student.resume.jobs.findIndex((i)=> i.id===req.params.jobsid)
    student.resume.jobs[jobsIndex] = {...student.resume.jobs[jobsIndex],...req.body}
    await student.save()
    res.json({message:"Job Updated"})
})


exports.deletejobs = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredjobs = student.resume.jobs.filter((i)=> i.id !==req.params.jobsid)
    student.resume.jobs = filteredjobs;
    await student.save()
    res.json({message:"jobs Deleted"})
})


// =================================Internships==========================================


exports.addinternships = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"Internships Added"})
})



exports.editinternships = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const internshipsIndex = student.resume.internships.findIndex((i)=> i.id===req.params.internshipsid)
    student.resume.internships[internshipsIndex] = {...student.resume.internships[internshipsIndex],...req.body}
    await student.save()
    res.json({message:"Internships Updated"})
})


exports.deleteinternships = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredinternships = student.resume.internships.filter((i)=> i.id !==req.params.internshipsid)
    student.resume.internships = filteredinternships;
    await student.save()
    res.json({message:"internships Deleted"})
})


// ====================================courses======================================

exports.addcourses = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"courses Added"})
})


exports.editcourses = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const coursesIndex = student.resume.courses.findIndex((i)=> i.id===req.params.coursesid)
    student.resume.courses[coursesIndex] = {...student.resume.courses[coursesIndex],...req.body}
    await student.save()
    res.json({message:"courses Updated"})
})


exports.deletecourses = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredcourses = student.resume.courses.filter((i)=> i.id !==req.params.coursesid)
    student.resume.courses = filteredcourses;
    await student.save()
    res.json({message:"courses Deleted"})

})


// =======================================responsibilities============================================

exports.addresponsibilities = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"responsibilities Added"})
})


exports.editresponsibilities = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const responsibilitiesIndex = student.resume.responsibilities.findIndex((i)=> i.id===req.params.responsibilitiesid)
    student.resume.responsibilities[responsibilitiesIndex] = {...student.resume.responsibilities[responsibilitiesIndex],...req.body}
    await student.save()
    res.json({message:"responsibilities Updated"})
})


exports.deleteresponsibilities = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredresponsibilities = student.resume.responsibilities.filter((i)=> i.id !==req.params.responsibilitiesid)
    student.resume.responsibilities = filteredresponsibilities;
    await student.save()
    res.json({message:"responsibilities Deleted"})
})


// =======================================projects============================================

exports.addprojects = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"projects Added"})
})


exports.editprojects = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const projectsIndex = student.resume.projects.findIndex((i)=> i.id===req.params.projectsid)
    student.resume.projects[projectsIndex] = {...student.resume.projects[projectsIndex],...req.body}
    await student.save()
    res.json({message:"projects Updated"})
})


exports.deleteprojects = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredprojects = student.resume.projects.filter((i)=> i.id !==req.params.projectsid)
    student.resume.projects = filteredprojects;
    await student.save()
    res.json({message:"projects Deleted"})
})


// =======================================skills============================================

exports.addskills = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"skills Added"})
})


exports.editskills = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const skillsIndex = student.resume.skills.findIndex((i)=> i.id===req.params.skillsid)
    student.resume.skills[skillsIndex] = {...student.resume.skills[skillsIndex],...req.body}
    await student.save()
    res.json({message:"skills Updated"})
})


exports.deleteskills = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredskills = student.resume.skills.filter((i)=> i.id !==req.params.skillsid)
    student.resume.skills = filteredskills;
    await student.save()
    res.json({message:"skills Deleted"})
})


// =======================================accomplishments============================================

exports.addaccomplishments = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body,id:uuidv4()});
    await student.save()
    res.json({message:"accomplishments Added"})
})


exports.editaccomplishments = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const accomplishmentsIndex = student.resume.accomplishments.findIndex((i)=> i.id===req.params.accomplishmentsid)
    student.resume.accomplishments[accomplishmentsIndex] = {...student.resume.accomplishments[accomplishmentsIndex],...req.body}
    await student.save()
    res.json({message:"accomplishments Updated"})
})


exports.deleteaccomplishments = CatchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredaccomplishments = student.resume.accomplishments.filter((i)=> i.id !==req.params.accomplishmentsid)
    student.resume.accomplishments = filteredaccomplishments;
    await student.save()
    res.json({message:"accomplishments Deleted"})
})