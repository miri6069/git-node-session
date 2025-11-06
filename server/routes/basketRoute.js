const express=require("express")
const basketController=require("../controllers/basketController")
const verify=require("../middleware/verifyJWT")
const verifyAdmin=require("../middleware/verifyAdmin")
const router=express.Router()
router.get("/getAll",verifyAdmin,basketController.getAllBasket)
router.post("/",verify,basketController.addItem)
router.delete("/",verify,basketController.deleteItem)
router.get("/",verify,basketController.getBasket)
router.put("/reduce",verify,basketController.reduceItem)
router.put("/increase",verify,basketController.increaseItem)

module.exports=router