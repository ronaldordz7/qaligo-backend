const prisma = require('../prisma');

async function createOrder({ userId, items }) {

  const subtotalItems = await Promise.all(
    items.map(async item => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      return {
        productId: item.productId,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      };
    })
  );

  const total = subtotalItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      orderItems: {
        create: subtotalItems
      }
    },
    include: { orderItems: true }
  });

  return order;
}

async function getOrdersByUser(userId) {
  return prisma.order.findMany({
    where: { userId: Number(userId) },
    include: { orderItems: true }
  });
}

module.exports = { createOrder, getOrdersByUser };
