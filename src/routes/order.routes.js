const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const requireAuth = require('../middlewares/auth.middleware');

// Crear una orden
router.post('/', requireAuth, orderController.createOrder);

// Obtener órdenes por usuario
router.get('/:userId', requireAuth, orderController.getOrdersByUser);

module.exports = router;
