import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

const cartSchema = new Schema ({
    userId : {
        type: String,
        ref: "user"
    },
    items : [{
        productId : {
            type:String,
            ref:"item"
        },
        name:String,
        quantity: {
            type: Number,
            required: true,
            min: [1,'Quantity can not be less than 1'],
            default: 1
        },
        price: Number
    }],
    bill: {
        type:Number,
        required:true,
        default:0
    }
});

module.exports = Cart = mongoose.model("cart",cartSchema);