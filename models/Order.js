import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

const Schema = new Schema ({
    userId : {
        type: String,
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
        },
        price: Number
    }],
    bill: {
        type:Number,
        required:true,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model("cart",cartSchema);