const express = require("express");
const { homepage , studentsignup,studentsignin,studentsignout,currentuser,studentsendmail,
    studentforgetlink,studentresetpassword,studentupdate,studentavatar,applyinternship,applyjob,
    readalljobs,readallinternships} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();



router.get("/", homepage)


// post/student
router.post("/student",isAuthenticated, currentuser)



// POST /student/signup
router.post("/student/signup",studentsignup);

// POST /student/signin
router.post("/student/signin",studentsignin);

// GET /student/signout
router.get("/student/signout",isAuthenticated ,studentsignout);

// POST/student/send-mail
router.post("/student/send-mail" ,studentsendmail);

// GET / students/forget-link/student:id
router.get("/student/forget-link/" ,studentforgetlink);

// POST /student/reset-password
router.post("/student/reset-password/:id" ,isAuthenticated ,studentresetpassword);

// POST /student/update/student:id
router.post("/student/update/:id" ,isAuthenticated ,studentupdate);

// POST /student/avatar/student:id
router.post("/student/avatar/:id" ,isAuthenticated ,studentavatar);

// ===========================read all jobs===============================
router.post("/student/alljobs/",isAuthenticated,readalljobs);



// ===========================read all internships===============================
router.post("/student/allinternships/",isAuthenticated,readallinternships);




// ===========================apply internship=============================

// POST/student/apply/:internshipid
router.post("/student/apply/internship/:internshipid" ,isAuthenticated ,applyinternship);



// ===========================apply job=============================

// POST/student/apply/:jobid
router.post("/student/apply/job/:jobid" ,isAuthenticated ,applyjob);






module.exports = router;