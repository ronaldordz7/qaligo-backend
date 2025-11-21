const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

// Crear una orden
router.post('/', orderController.createOrder);

// Obtener órdenes por usuario
router.get('/:userId', orderController.getOrdersByUser);

module.exports = router;
