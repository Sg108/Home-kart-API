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
const cors = require("cors")

app.set('trust proxy', 1);
app.use(cors({
    origin:'https://home-kart.vercel.app',
    credentials:true,
    'Access-Control-Allow-Origin': 'https://home-kart.vercel.app'
  
}))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
app.use(express.json())


app.use(function(req, res, next) {
  if(req.headers['x-arr-ssl'] && !req.headers['x-forwarded-proto']) {
    req.headers['x-forwarded-proto'] = 'https';
  }
  return next();
});
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => {
        console.log("error :", err)
    })

app.get("/api/test", (req,res) => {
    console.log("test is successfull")
    res.send("<center><h1>Welcome to our Ecommerce API</h1></center>")
})
app.get("/", (req,res) => {
    console.log("test is successfull")
    res.send("<center><h1>Welcome to our Ecommerce API</h1></center>")
})

app.use("/api/users", userRoute)
app.use("/api/users/auth/", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/payments", paymentRoute)

app.listen(process.env.PORT||3000, (req,res) => {
    console.log("server running");
   
    
    
})


module.exports = app