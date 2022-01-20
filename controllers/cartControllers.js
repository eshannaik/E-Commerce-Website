const Cart = require('../models/Cart');
const Item = require('../models/Item');

module.exports.get_cart_items = async (req,res) => {
    const userId = req.params.id;

    try {
        let cart = await Cart.findOne({userId}); // get users cart using his id
        if(cart && cart.items.length>0){
            res.send(cart); // return all items in the cart
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}

module.exports.add_cart_item = async (req,res) => {
    const userId = req.params.id;
    const {productId,quantity}=req.body;

    try{
        let cart = await Cart.findOne({userId}); // get that users cart
        let item = await Item.findOne({_id: productId}) // find the item to add

        if(!item){
            res.status(400).send('Item not found')
        }

        const price = item.price;
        const name = item.title;

        if(cart){
            //if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId)

            // product in users cart so we just increase quantity
            if(itemIndex > -1)
            {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity; // add to quantity
                cart.items[itemIndex] = productItem;
            }
            else{
                cart.items.push({productId,name,quantity,price}); // product not in cart so we add it fresh
            }
            cart.bill += quantity*price; // incrementing the bill
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // no cart present for user so create cart and add the items
            const newCart = await Cart.create({
                userId,
                items: [{productId, name, quantity, price}],
                bill: quantity*price
            });
            return res.status(201).send(newCart)
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.delete_item = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;

    try{
        let cart = await Cart.findOne({userId}); // get cart of user
        let itemIndex = cart.items.findIndex(p => p.productId == productId); // find the product

        if(itemIndex > -1){
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity * productItem.price; // reduce number of products
            cart.items.splice(itemIndex,1) // to remove that item from the cart
        }
        cart = await cart.save(); // save to db
        return res.status(201).send(cart);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong")
    }
}
