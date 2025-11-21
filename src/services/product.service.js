const prisma = require('../prisma');

async function listProducts() {
  return prisma.product.findMany();
}

module.exports = { listProducts };
