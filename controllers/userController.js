const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");


//register user 
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //validation 
        if (!username || !email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Fill All Fields"
            });
        }

        //existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User allready exist"
            });
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save new user 
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();

        //if all successfull
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Register callback",
            success: false,
            error
        });
    }
};



//get all users 
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get All Users"
        });
    }
};


//login 
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validations
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please Proide Email or Password"
            });
        }

        //For email
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(500).send({
                success: false,
                message: "Email is Not Registerd"
            });
        }

        //For comaparing  password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Username or Password"
            });
        }

        //if all condition is true then send this 
        return res.status(200).send({
            success: true,
            message: "Login Successfull",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callback",
            error
        });
    }
};


/*
hash password:
to hash the password we use bcrypt liabrary. in that we use hash() function.
in hash() function first argument is password and second argument is salt value.
and then next pass this hash password to the {password : hashedPassword}
*/