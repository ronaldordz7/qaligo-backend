const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const adminController = require('../controllers/admin.controller');

// Pedidos
router.get('/orders',
  authMiddleware,
  adminMiddleware,
  adminController.getAllOrders
);

router.put('/orders/:orderId/status',
  authMiddleware,
  adminMiddleware,
  adminController.updateOrderStatus
);

// Usuarios
router.get('/users',
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsers
);

module.exports = router;
