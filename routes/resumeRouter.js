const express = require("express")
const router = express.Router();
const {resume , addeducation, editeducation,deleteeducation
    ,addjobs,editjobs,deletejobs,addinternships,editinternships,deleteinternships,
    addresponsibilities,editresponsibilities,deleteresponsibilities,
    addcourses,editcourses,deletecourses
    ,addprojects,editprojects,deleteprojects,
    addskills,editskills,deleteskills,
    addaccomplishments,editaccomplishments,deleteaccomplishments

} = require("../controllers/resumeController");
const {isAuthenticated} = require("../middlewares/auth");


// GET/
router.get("/",isAuthenticated, resume);

// ===================================Education============================================
// POST
router.post("/add-edu",isAuthenticated,addeducation)


// POST
router.post("/edit-edu/:eduid",isAuthenticated,editeducation)


// POST
router.post("/delete-edu/:eduid",isAuthenticated,deleteeducation)



// =====================================Job===============================================

// POST
router.post("/add-jobs", isAuthenticated , addjobs)

// POST
router.post("/edit-jobs/:jobsid", isAuthenticated , editjobs)

// POST
router.post("/delete-jobs/:jobsid",isAuthenticated,deletejobs)


// ===================================Internships===========================================

// POST
router.post("/add-internships", isAuthenticated , addinternships)


// POST
router.post("/edit-internships/:internshipsid", isAuthenticated , editinternships)

// POST
router.post("/delete-internships/:internshipsid", isAuthenticated , deleteinternships)


// ==============================responsibilities==========================================

router.post("/add-responsibilities", isAuthenticated , addresponsibilities)

// POST
router.post("/edit-responsibilities/:responsibilitiesid", isAuthenticated , editresponsibilities)

// POST
router.post("/delete-responsibilities/:responsibilitiesid", isAuthenticated , deleteresponsibilities)


// ===================================courses==============================================

router.post("/add-courses", isAuthenticated , addcourses)

// POST
router.post("/edit-courses/:coursesid", isAuthenticated , editcourses)

// POST
router.post("/delete-courses/:coursesid", isAuthenticated , deletecourses)



// ===================================projects==============================================

router.post("/add-projects", isAuthenticated , addprojects)

// POST
router.post("/edit-projects/:projectsid", isAuthenticated , editprojects)

// POST
router.post("/delete-projects/:projectsid", isAuthenticated , deleteprojects)


// ===================================skills==============================================

router.post("/add-skills", isAuthenticated , addskills)

// POST
router.post("/edit-skills/:skillsid", isAuthenticated , editskills)

// POST
router.post("/delete-skills/:skillsid", isAuthenticated , deleteskills)


// ===================================accomplishments==============================================

router.post("/add-accomplishments", isAuthenticated , addaccomplishments)

// POST
router.post("/edit-accomplishments/:accomplishmentsid", isAuthenticated , editaccomplishments)

// POST
router.post("/delete-accomplishments/:accomplishmentsid", isAuthenticated , deleteaccomplishments)









module.exports = router;