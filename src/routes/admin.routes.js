const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const requireAuth = require('../middlewares/auth.middleware');
const requireAdmin = require('../middlewares/admin.middleware');

// Pedidos (admin)
router.get('/orders', requireAuth, requireAdmin, adminController.getAllOrders);
router.put(
  '/orders/:orderId/status',
  requireAuth,
  requireAdmin,
  adminController.updateOrderStatus
);

// Usuarios (admin)
router.get('/users', requireAuth, requireAdmin, adminController.getAllUsers);

module.exports = router;
