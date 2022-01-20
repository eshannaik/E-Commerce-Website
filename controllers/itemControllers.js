const Item = require('../models/Item') // calling the schema

// get all items and sort them in decreasing order of date added and then return them in JSON format
module.exports.get_items = (req,res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
}

// adding item to cart
module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body); // get the item as a request
    newItem.save().then(item => res.json(item)); // save item in database
}

//updating the item and return updated cart
module.exports.update_item = (req,res) => {
    Item.findByIdAndUpdate({ _id: // search for the item
    req.params.id},req.body).then(function(item){ // id passed as paramter
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        })
    })
}

//deleting an item and return a success response
module.exports.delete_item = (req,res) => {
    Item.findByIdAndUpdate({ _id :
        req.params.id
    }).then(function(item){
        res.json({success:true});
    });
}
