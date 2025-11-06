const User = require("../models/users")
const Basket=require("../models/basket")

const createNewUser = async (req, res) => {
    const { name, userName, password, email } = req.body
    if (!name || !userName || !password || !email)
        return res.status(400).json("the fileds are required")
    const user = await User.create({name, userName, password, email})

    if (user){
        const addBasket= await Basket.create({user:user._id,items:[]})
        console.log(addBasket)
    
        return res.status(201).json("user created")
    }
}
const getAllUsers=async (req,res)=>{
    const users=await User.find().lean()
    if(!users?.length)
        return res.status(400).json("esers not found")
    res.json(users)
}
module.exports={createNewUser,getAllUsers}