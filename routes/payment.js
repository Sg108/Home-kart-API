const router = require("express").Router()
const Razorpay = require("razorpay")

router.get("/get-razorpay-key", (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID })
})

router.post("/create-order", async (req, res) => {
    console.log("here boi")
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        })
        const options = {
            amount: req.body.amount,
            currency: "INR",
        }
        const order = await instance.orders.create(options)
        if (!order) return res.status(500).send("Some error occured")
        res.send(order)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/pay-order", async (req, res) => {
    try {
        const {
            amount,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body

        console.log(amount, razorpayPaymentId, razorpayOrderId)
        // const newOrder = Order({
        //     isPaid: true,
        //     amount: amount,
        //     razorpay: {
        //         orderId: razorpayOrderId,
        //         paymentId: razorpayPaymentId,
        //         signature: razorpaySignature,
        //     },
        // })
        // await newOrder.save()
        res.send({
            msg: "Payment was successfull",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/list-orders", async (req, res) => {
    // const orders = await Order.find()
    // res.send(orders)
    res.send("there you have it!")
})

module.exports = router
