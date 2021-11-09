const Container = require('../../Container');
const { options } = require('./databases');

const productosContainer = new Container(options,'products');

const getAllProducts = async () => {
  const list = await productosContainer.getAll();
  return list;
};

const getProduct = async (id) => {
  const list = await productosContainer.getById(id);
  return list;
};

const createProduct = async (product) => {
  const idProductoGuardado = await productosContainer.save(product);
  return idProductoGuardado;
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct
};