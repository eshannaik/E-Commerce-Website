import {Router} from 'express';
const itemController = require('../controllers/itemControllers');

const router = Router();

// id passed as paramter
router.get('/items',itemController.get_items); // get all items
router.post('/items',itemController.post_item); // add an item
router.put('/items/:id',itemController.update_item); // update an item
router.delete('/items/:id',itemController.delete_item); // delete an item

module.exports = router;