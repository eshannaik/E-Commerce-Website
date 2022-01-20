const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('config');
const stripe = require('stripe')(config.get('StripeAPIKey'));

module.exports.get_orders = async (req,res) => {
    const userId = req.params.id; // got as parameter
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders)); // send back orders
}

module.exports.checkout = async (req,res) => {
    try{
        const userId = req.params.id;
        const {source} = req.body // handle payments via stripe, got from the frontend

        let cart = await Cart.findOne({userId}); // find cart of user
        let user = await User.findOne({_id:userId}) // find user
        const email = user.email;

        if(cart){
            const charge = await stripe.charges.create({ // setting up online payment
                amount: cart.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) // if not charge
                throw Error ('Payment Failed')

            if(charge){ // if charge
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                });
                const data = await Cart.findByIdAndDelete({_id:cart.id}); // removing ordered items from the cart
                return res.status(201).send(order);
            }
        }
        else{
            res.status(500).send("You do not have items in cart");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong")
    }
}