const express = require('express');
const { getAllProducts, createProduct, getProduct } = require('./contain');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const data = await getAllProducts();
  res.send({ data });
});


productRouter.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const data = await getProduct(productId);
  res.send({ data });
});

productRouter.post('/', async (req, res) => {
  const nuevoProducto = req.body;

  const idProductsaved = await createProduct(nuevoProducto);

  res.send({ data: idProductsaved });
});


module.exports = productRouter;