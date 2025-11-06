const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/users")
const Basket = require("../models/basket")


const register = async (req, res) => {
    const { name, userName, password, email } = req.body
    if (!name || !userName | !password || !email)
        return res.status(400).json("all fieldes are required")
    const duplicateUser = await User.findOne({ userName: userName })
    if (duplicateUser)
        return res.status(409).json("duplicate userName")
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, userName, password: hashPassword, email })
    if (!user)
        return res.status(400).json("bad request")
    const addBasket = await Basket.create({ user: user._id, items: [] })
    console.log(addBasket)
    return res.json("complete")
}


const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(400).json("all fieldes are required")
    const findUser = await User.findOne({ userName: userName }).lean()
    if (!findUser)
        return res.status(401).json("name or password is wrong")
    const compare = await bcrypt.compare(password, findUser.password)
    //console.log(compare)
    if (!compare)
        return res.status(401).json("name or password is wrong")
    const userInfo = {
        _id: findUser._id,
        name: findUser.name,
        userName: findUser.userName,
        email: findUser.email,
        roles: findUser.roles
    }
    const token = await jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    console.log(token);
    // res.json(req.user, token)
    //res.json(token)
    res.json({
        token,
        user: userInfo
    });

}
module.exports = { register, login }
