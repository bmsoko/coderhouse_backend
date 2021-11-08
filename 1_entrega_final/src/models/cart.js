const Contenedor = require('../../Contenedor');

const cartContenedor = new Contenedor('./data/carts.json');

const createCart = async (cart) => {
  const idCartSaved = await cartContenedor.save(cart);
  return idCartSaved;
};

const deleteCart = async (idCart) => {
  await cartContenedor.deleteById(idCart);
  return idCart;
};

const getProductsByIdCart = async (id) => {
  const cart = await cartContenedor.getById(id);
  const { products } = cart;
  return products;
};

const addProductsToCart = async (id, listProducts) =>  {
  const cartUpdated = await cartContenedor.updateById(id, listProducts);
  return cartUpdated;
};

const deleteProductFromCart = async (id, idProduct) =>  {
  const cart = await cartContenedor.getById(id);
  const { products } = cart;
  products.splice(parseInt(idProduct), 1);
  const newCart = {
    products
  }
  const cartUpdated = await cartContenedor.updateById(id, newCart);
  return cartUpdated;
};

module.exports = {
  createCart,
  deleteCart,
  getProductsByIdCart,
  addProductsToCart,
  deleteProductFromCart
};