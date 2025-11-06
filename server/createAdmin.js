const User = require("./models/users")
const bcrypt = require("bcrypt")
const Basket = require("./models/basket")
const createAdmin = async (req, res) => {
    const existingAdmin = await User.findOne({ roles: 'Admin', isAdmin: true })
    if (existingAdmin)
        return
    const password = await bcrypt.hash("329372809", 10)
    const addAdmin = await User.create({
        name: "miri grozovsky",
        userName: "miri grozovsky",
        password: password,
        email: "g025379396@gmail.com",
        isAdmin: true,
        roles: "Admin",
    })
    const addBasket = await Basket.create({
        user: addAdmin._id,
         items: []
    })
}
module.exports = createAdmin