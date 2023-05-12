const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {
    console.log(req.body)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN

router.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({
            username: req.body.username,
        })

        if(!user)
        {
            console.log("Wrong User Name")
            return res.status(401).json("Wrong User Name")}

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        const inputPassword = req.body.password

        if(originalPassword != inputPassword)
        { 
            console.log("Wrong password")
        return res.status(401).json("Wrong Password")
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        )
        console.log(accessToken)
        const { password, ...others } = user._doc
        //console.log(password)
       
      
        res.setHeader('Set-Cookie','jwt='+accessToken+";path=/;SameSite=None;Secure")

        res.status(200).json({ ...others, accessToken })
        
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post("/logout", (req, res) => {
    //req.logout();
    //console.log(req)
   //console.log(req)
   //res.header('Access-Control-Allow-Origin':"*")
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    //.redirect("http://localhost:3000/");
    let token=req.headers.cookie
    //console.log(req.headers)
    token=token.slice(4,token.length)
    //const expiresDate = new Date(new Date().getTime() + 1000); 
    console.log("log out",token)
    res.setHeader('Set-Cookie','jwt=0;Max-Age=1;path=/;SameSite=None;Secure')
    //res.redirect('http://localhost:3000')
    res.send("logged out")
  });
  

module.exports = router
