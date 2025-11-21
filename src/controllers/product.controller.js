const productService = require('../services/product.service');

async function getProducts(req, res) {
  try {
    const products = await productService.listProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo productos' });
  }
}

module.exports = { getProducts };
