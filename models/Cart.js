const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        products: [
            {
                id: {
                    type: String,
                },
                title:{
                    type: String,
                },
                description:{ type: String,},
                price:{type: String},
                discountPercentage:{type: String},
                rating:{ 
                    type: String
                },
                stock:{ type: String,},
                brand:{
                    type: String,
                },
                category:{
                    type: String,
                },
                thumbnail:{
                    type: String,
                },
                images:[{type:String}],
                quantity: {
                    type: Number,
                    default: 1,
                },
                itemId:{
                    type: String,
                    required: true,
                    unique: true,
                }
            },
        ],
    },
    { timestamps: true }
)
module.exports = mongoose.model("Cart", CartSchema)
