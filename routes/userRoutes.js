const express = require("express");
const { getAllUsers,
    registerController,
    loginController } = require("../controllers/userController");

//Router object
const router = express.Router();



//Register Users || METHOD : POST
router.post("/register", registerController);


//Get All users || METHOD : GET
router.get("/all-users", getAllUsers);


//Login || METHOD : POST
router.post("/login", loginController);


module.exports = router;