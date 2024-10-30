const express = require("express");
const {
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,
    deleteBlogController,
    userBlogController } = require("../controllers/blogController");

//Router Object
const router = express.Router();

//routes
//get all Blogs || METHOD : GET
router.get("/all-blog", getAllBlogsController);

//Create blog || METHOD : POST
router.post("/create-blog", createBlogController);

//Updating the Blog || METHOD : PUT
router.put("/update-blog/:id", updateBlogController);

//Get single blog details || METHOD || GET
router.get("/get-blog/:id", getBlogByIdController);

//Delete Blog || METHOD : DELETE 
router.delete("/delete-blog/:id", deleteBlogController);

//To get user blog || METHOD : GET
router.get("/user-blog/:id", userBlogController);

module.exports = router;