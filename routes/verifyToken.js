const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    console.log(req.headers,req.headers.cookie)
    if (authHeader) {
        const token = authHeader.split("=")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                console.log("token is invalid")
                return res.status(403).json("Token is not valid!")
            }
            req.user = user
            next()
        })
    } else {
        console.log("i am here")
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
         console.log(req.user.id)
     console.log(req.params.id)
         if (req.user.id === req.params.id || req.user.isAdmin) {
            console.log("here")
            next()
         } else {
            console.log("no no")
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
}
