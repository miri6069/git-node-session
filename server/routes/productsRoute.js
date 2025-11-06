const express=require("express")
const productController=require("../controllers/productController")
const verifyAdmin=require("../middleware/verifyAdmin")
const router=express.Router()

router.get("/",productController.getAllProducts)
router.post("/",verifyAdmin,productController.addProduct)
router.delete("/",verifyAdmin,productController.deleteProduct)
router.get("/getTheProduct/:id",productController.getTheProduct)
router.put("/:id",verifyAdmin,productController.updateProduct)
router.get("/:category",productController.getCategory)

module.exports=router