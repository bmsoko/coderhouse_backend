const Contenedor = require('../../Contenedor');

const productosContenedor = new Contenedor('./data/products.json');

const getAllProducts = async () => {
  const list = await productosContenedor.getAllJSON();
  return list;
};

const createProduct = async (product) => {
  const idProductoGuardado = await productosContenedor.save(product);
  return idProductoGuardado;
};

const updateById = async (product, cambios) => {
  const updatedElement = await productosContenedor.updateById(product, cambios);
  return updatedElement;
};

const deleteById = async (product) => {
  const deleteId = await productosContenedor.deleteById(product);
  return deleteId;
};

module.exports = {
  getAllProducts,
  createProduct,
  updateById,
  deleteById
};