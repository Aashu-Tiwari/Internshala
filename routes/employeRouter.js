const express = require("express");
const { homepage ,
    employesignup,
    employesignin,
    employesignout,
    currentemploye,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob
    
 } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();



router.get("/", homepage)


// post/employe
router.post("/current",isAuthenticated, currentemploye)



// POST /employe/signup
router.post("/signup",employesignup);

// // POST /employe/signin
router.post("/signin",employesignin);

// // GET /employe/signout
router.get("/signout",isAuthenticated ,employesignout);

// // POST/employe/send-mail
router.post("/send-mail" ,employesendmail);

// // GET / employes/forget-link/employe:id
router.get("/forget-link/:id" ,employeforgetlink);

// // POST /employe/reset-password
router.post("/reset-password/:id" ,isAuthenticated ,employeresetpassword);

// // POST /employe/update/employe:id
router.post("/update/:id" ,isAuthenticated ,employeupdate);

// // POST /employe/avatar/employe:id
router.post("/avatar/:id" ,isAuthenticated ,employeavatar);





// ========================================Internships===============================================


// // POST /employe/internship/create
router.post("/internship/create" ,isAuthenticated ,createinternship);


// // POST /employe/internship/read/
router.post("/internship/read/" ,isAuthenticated ,readinternship);



// // POST /employe/internship/read/:id
router.post("/internship/read/:id" ,isAuthenticated ,readsingleinternship);



// ========================================Job===============================================


// // POST /employe/job/create
router.post("/job/create" ,isAuthenticated ,createjob);


// // POST /employe/job/read/
router.post("/job/read/" ,isAuthenticated ,readjob);



// // POST /employe/job/read/:id
router.post("/job/read/:id" ,isAuthenticated ,readsinglejob);




















module.exports = router;