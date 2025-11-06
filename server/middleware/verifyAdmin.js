const jwt = require("jsonwebtoken")
const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (!authHeader?.startsWith("Bearer "))
        return res.status(401).send("לא מורשה")
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
            if (err)
                return res.status(401).send("forbidden")
            if (decode.roles == 'User')
                return res.status(401).send("לא מורשה")
            req.user = decode
            console.log("authHeader:", authHeader);
            console.log("decoded token:", decode);
            next()
        }
    )
}
module.exports = verifyAdmin