const router = require("express").Router()
const CryptoJS = require("crypto-js")
const Cart = require("../models/Cart")

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken")

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// // delete user

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted successfully!")
    } catch (err) {
        res.status(500).send(err)
    }
})

// get User Cart
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id })
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
