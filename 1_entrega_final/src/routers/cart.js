const express = require('express');
const { createCart, deleteCart, addProductsToCart, getProductsByIdCart, deleteProductFromCart } = require('../models/cart');

const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
  const cart = req.body;
  console.log(cart)

  const idCartSaved = await createCart(cart);

  res.send({ data: idCartSaved });
});

cartRouter.delete('/:id', async (req, res) => {
  const cart = req.body.id;

  const idCartDeleted = await deleteCart(cart);

  res.send({ data: idCartDeleted });
});

cartRouter.get('/:id/productos', async (req, res) => {
  const cartId = req.params.id;
  const list = await getProductsByIdCart(cartId);
  console.log(typeof{list})
  const propertyNames = Object.entries(list);
  console.log(propertyNames)
  res.send({ data: list });
});

cartRouter.post('/:id/productos', async (req, res) => {
  const cartId = req.params.id; //id del carrito
  let listProducts = await getProductsByIdCart(cartId); // busco los productos del carrito
  listProducts.push(req.body)
  const cart = await addProductsToCart(cartId, listProducts);
  res.send({ data: cart }); 
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.id_prod;

  const cart = await deleteProductFromCart(cartId, productId);

  res.send({ data: cart });
});

module.exports = cartRouter;