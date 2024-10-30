const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");

//Get all blogs
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found"
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blogs Lists",
            blogs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error While Getting Blogs",
            error
        });
    }
};

//Create Blogs
exports.createBlogController = async (req, res) => {

    try {

        const { title, description, image, user } = req.body;


        //validations
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields"
            });
        }

        //Check exixting user
        const existingUser = await userModel.findById(user);
        //validations for existing user
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user"
            });
        }

        //Save the blog
        const newBlog = new blogModel({ title, description, image, user });
        await newBlog.save();
        existingUser.blogs.push(newBlog);
        await existingUser.save();

        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Creating Blog",
            error
        });
    }
};

//Update Blog 
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Updating Blog",
            error
        });
    }
};

//Single Blog 
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        //validation
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog Not Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Fetch Single Blog",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While getting Single Blog"
        });
    }
};


//Delete Blog 
exports.deleteBlogController = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId).populate("user");

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog Not Found"
            });
        }

        const userId = blog.user._id;
        await blogModel.deleteOne({ _id: blogId });
        await userModel.updateOne({ _id: userId }, { $pull: { blogs: blogId } });

        return res.status(200).send({
            success: true,
            message: "Blog Deleted!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deleting Blog",
            error
        });
    }
};



//here i change the code of delete blog, if in future it wont work then change the code here


// Old Delete Blog code
/*Delete Blog 
exports.deleteBlogController = async (req, res) => {
    try {
        //here we directly passing the id for delete or we can also take the id by using destructuring
        const blog = await blogModel.findOneAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deleting Blog",
            error
        });
    }
};
*/


//Get user Blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        //validations
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blogs not found with this id"
            });
        }
        return res.status(200).send({
            success: true,
            message: "User Blogs",
            userBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in User Blog",
            error
        });
    }
};