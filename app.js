require("dotenv").config({path:"./.env"});
const express = require("express")
const app = express();


// db connection 
require("./Models/database").connectDatabase();

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

// logger
const logger = require("morgan");
app.use(logger("tiny"))




// bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// session and cookie   In cookie a code generated in backend and we save that code in browser if code is in browser the user is logged in (that is the reason why user is logged in any platform since long time)
const session = require("express-session")
const cookieparser = require("cookie-parser")
app.use(session({
    resave: true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser());

// express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());


// routes
app.use("/", require("./routes/indexRouter"))
app.use("/resume", require("./routes/resumeRouter"))
app.use("/employe", require("./routes/employeRouter"))



// error handling 
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
// const session = require("express-session");
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`Requested URL Not Found${req.url}`, 404));
})

app.use(generatedErrors)

app.listen(process.env.PORT,console.log(`Server is runing on ${process.env.PORT}`))