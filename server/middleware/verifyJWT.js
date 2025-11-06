const jwt = require("jsonwebtoken")
const verifyJWT = (req, res, next) => {
    const aurhHeader = req.headers.Authorization || req.headers.authorization
    if (!aurhHeader?.startsWith("Bearer "))
        return res.status(401).json("לא מורשה")
    const token = aurhHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
            if (err) return res.status(401).send("forbidden")
            req.user = decode
            next()
        }
    )
}
module.exports=verifyJWT