console.log("hello there")

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const app = express()
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const paymentRoute = require("./routes/payment")
var cors = require("cors")

app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => {
        console.log("error :", err)
    })

app.get("/api/test", () => {
    console.log("test is successfull")
})

app.use("/api/users", userRoute)
app.use("/api/users/auth/", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/payments", paymentRoute)

app.listen(3002, () => {
    console.log("server running")
})
