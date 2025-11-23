const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const requireAuth = require('../middlewares/auth.middleware');
const requireAdmin = require('../middlewares/admin.middleware');
// Crear una orden
router.post('/', orderController.createOrder);

// Obtener órdenes por usuario
router.get('/:userId', orderController.getOrdersByUser);



router.get('/admin/all', requireAuth, requireAdmin, orderController.getAllOrders);

router.put('/admin/status/:orderId', requireAuth, requireAdmin, orderController.updateOrderStatus);

module.exports = router;