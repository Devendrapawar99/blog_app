const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const path = require("path");                               //


//dotenv config 
dotenv.config();

//Routes import 
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");

//MongoDB connection 
connectDB();

//Rest Object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// //static files
// app.use(express.static(path.join(__dirname, "./client/build")));  //


//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);


// //rest api                                                         //
// app.use("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white);
});