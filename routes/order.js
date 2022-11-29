const router = require("express").Router()
const Order = require("../models/Order")

const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken")

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// // delete user

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted successfully!")
    } catch (err) {
        res.status(500).send(err)
    }
})

// get User Orders
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.params.id })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).send(err)
    }
})

//
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get monthly income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    )

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    $sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
