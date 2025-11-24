const prisma = require('../prisma');

// GET /api/admin/orders
async function getAllOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (err) {
    console.error("❌ getAllOrders:", err);
    res.status(500).json({ message: 'Error obteniendo pedidos' });
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
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    res.json(updated);

  } catch (err) {
    console.error("❌ updateOrderStatus:", err);
    res.status(500).json({ message: 'Error actualizando estado de pedido' });
  }
}

// GET /api/admin/users
async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json(users);

  } catch (err) {
    console.error("❌ getAllUsers:", err);
    res.status(500).json({ message: 'Error obteniendo usuarios' });
  }
}

module.exports = { getAllOrders, updateOrderStatus, getAllUsers };
