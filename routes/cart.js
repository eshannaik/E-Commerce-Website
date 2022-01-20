import {Router} from 'express';

const cartController = require('../controllers/cartControllers');
const router = Router();

//id passed as paramter
router.get('/cart/:id',cartController.get_cart_items);
router.post('/cart/:id',cartController.add_cart_item);
//userId is the cart of that user and itemID is the id of the item
router.delete('/cart/:userId/:itemId',cartController.delete_item); // passing userID and itemId as paramter

module.exports = router