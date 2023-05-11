const router = require("express").Router()
const CryptoJS = require("crypto-js")
const Cart = require("../models/Cart")

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken")

// router.post("/", async (req, res) => {
//     const newCart = new Cart(req.body)
//     try {
//         const savedCart = await newCart.save()
//         res.status(200).json(savedCart)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// update
router.post("/:id",verifyTokenAndAuthorization,async (req, res) => {
    try {
         //console.log("add")
         updatedCart = await Cart.findOneAndUpdate(
            {
            userId:req.params.id},
            {
                $push: { products:req.body.products},
            },
            { new: true }
        )
        if(!updatedCart)
        {
            
            const newCart = new Cart({userId:req.params.id,products:req.body.products})
            updatedCart=await newCart.save()
           // res.status(200).json(updatedCart)
        }
        console.log(updatedCart._id.toString())
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// // delete user

router.delete("/:id/:itemId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        let Singlecart = await Cart.findOne({userId:req.params.id})
        let updatedproducts = Singlecart.products.filter((obj)=>{
              return  obj.itemId!==req.params.itemId
        })
        console.log("SingleCart: ",Singlecart)
        console.log(updatedproducts)
        await Cart.findOneAndUpdate(
            {
                userId:req.params.id},
                {
                    $set: { products:updatedproducts},
                },
                { new: true }
        )
    
        res.status(200).json("Cart item has been deleted successfully!")
    } catch (err) {
        res.status(500).send(err)
    }
})

// get User Cart
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        //console.log("p")
        const cart = await Cart.findOne({ userId: req.params.id })
        //console.log(cart)

        res.status(200).json(cart)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
       
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router
