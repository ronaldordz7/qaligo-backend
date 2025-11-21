const orderService = require('../services/order.service');

async function createOrder(req, res) {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando la orden' });
  }
}

async function getOrdersByUser(req, res) {
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo órdenes' });
  }
}

module.exports = { createOrder, getOrdersByUser };
