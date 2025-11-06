const express=require("express")
const router=express.Router()
const verifyAdmin=require("../middleware/verifyAdmin")
const userController=require("../controllers/userController")

router.post("/",userController.createNewUser)
router.get("/",verifyAdmin,userController.getAllUsers)
module.exports=router