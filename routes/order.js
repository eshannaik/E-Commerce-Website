import {Router} from 'express';

const orderController = require('../controllers/orderControllers');
const router = Router();

//id passed as paramter
router.get('/order/:id',orderController.get_orders);
router.post('/order/:id',orderController.checkout);

module.exports = router