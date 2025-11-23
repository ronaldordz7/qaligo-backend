const prisma = require('../prisma');

// GET /api/admin/orders
async function getAllOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo pedidos' });
  }
}

// GET /api/admin/users
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo usuarios' });
  }
}

// PUT /api/admin/orders/:orderId/status
async function updateOrderStatus(req, res) {
  const orderId = Number(req.params.orderId);
  const { status } = req.body;

  const allowed = ['PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Estado no permitido' });
  }

  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando estado de pedido' });
  }
}

module.exports = { getAllOrders, getAllUsers, updateOrderStatus };
