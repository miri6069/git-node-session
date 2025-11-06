const Products = require("../models/products")

const getAllProducts = async (req, res) => {
    const products = await Products.find().lean()
    console.log("mnhfbg")
    if (!products?.length)
        return res.status(401).json("no products")
    res.json(products)
}
const addProduct = async (req, res) => {
    const { name, description, category, price, imageUrl, inventoryStatus, rating } = req.body
    if (!name || !description || !category || !price || !imageUrl)
        return res.status(401).json("all the fieldes are required")
    const add = await Products.create({ name, description, category, price, imageUrl, inventoryStatus, rating })
    if (add)
        res.status(201).json("the product is added")
}
const deleteProduct = async (req, res) => {
    const { name } = req.body
    const found = await Products.findOne({ name: name }).lean()
    if (!found)
        res.status(401).json("the product undefind")
    await Products.deleteOne(found)
    res.json("the product is deleted")
}
const updateProduct = async (req, res) => {
    const { id } = req.params
    const updateProduct = req.body
    const found = await Products.findOneAndUpdate({ _id: id }, updateProduct, { new: true, runValidators: true }).lean()
    if (!found)
        return res.status(400).json("the product is undefind")
    res.json("complete")
}
const getCategory = async (req, res) => {
    const { category } = req.params
    const product = await Products.find({ category: category })
    res.json(product)
}
const getTheProduct = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const product = await Products.findById(id)
    res.json(product)
}
module.exports = { getAllProducts, addProduct, deleteProduct, updateProduct, getCategory, getTheProduct }