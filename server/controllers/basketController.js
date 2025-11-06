const Basket = require("../models/basket")
const Products = require("../models/products")

const getAllBasket = async (req, res) => {
    const items = await Basket.find().lean()
    if (!items?.length)
        return res.status(401).send("the basket is empty")
    res.json(items)
}
const addItem = async (req, res) => {
    const { id, quantity } = req.body
    const product = await Products.findById(id)
    console.log(product);
    if (!product)
        return res.status(401).json("the product is undefind")
    console.log(req.user._id)
    const currentBasket = await Basket.findOne({ user: req.user._id })
    if (!currentBasket)
        return res.status(400).json("error")

    const found = currentBasket.items.find(items => items.products.toString() === product._id.toString())
    console.log("f", found)
    if (!found)
        currentBasket.items.push({ products: product._id, quantity })
    else
        found.quantity += quantity
    await currentBasket.save()
    res.json(currentBasket.items)
}
const deleteItem = async (req, res) => {
    const basket = await Basket.findOne({ user: req.user._id })
    const { id } = req.body
    basket.items = basket.items.filter(items => items.products._id.toString() != id)
    await basket.save()
    res.json(basket.items)
}
const getBasket = async (req, res) => {
    const currentBasket = await Basket.findOne({ user: req.user._id }).populate("items.products")
    console.log("gg", currentBasket.items)
    res.json(currentBasket)
}
const reduceItem = async (req, res) => {
    const currentBasket = await Basket.findOne({ user: req.user._id })
    const { _id } = req.body
    const found = currentBasket.items.find(items => items.products._id.toString() === _id)
    if (found.quantity == 1)
        currentBasket.items = currentBasket.items.filter(items => items.products._id.toString() != _id)
    else {
        found.quantity -= 1
    }
    await currentBasket.save()
    res.json(currentBasket.items)
}
const increaseItem = async (req, res) => {
    const currentBasket = await Basket.findOne({ user: req.user._id })
    const { _id } = req.body
    const found = currentBasket.items.find(items => items.products._id.toString() === _id)
    if (found)
        found.quantity += 1
    await currentBasket.save()
    res.json(currentBasket.items)
}
module.exports = { getAllBasket, addItem, deleteItem, getBasket, reduceItem, increaseItem }