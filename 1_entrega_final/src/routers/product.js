
const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const { getAllProducts, createProduct, updateById, deleteById } = require('../models/product');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const data = await getAllProducts();
  res.send({ data });
});

// isAdmin  es un middleware local 
productRouter.post('/', isAdmin, async (req, res) => {
  const nuevoProducto = req.body;

  const idProductsaved = await createProduct(nuevoProducto);

  res.send({ data: idProductsaved });
});


productRouter.get('/:id', async (req, res) => {
    const producto = await productosContenedor.getById(req.params.id);
    console.log(producto)
    if(!producto){
        res.send({
            message: 'No products were found with that Id',
          });
    } else {
        res.send({
            message: 'success',
            data: producto
        });
    }

})


productRouter.delete('/:id', async (req, res) => {
  const idProductoBorrado = await deleteById(req.params.id);

  if (idProductoBorrado){
    res.send({
        message: 'success',
        data: {
          id: idProductoBorrado
        }
    
      });
  }else{
      res.send({
          message: `Error al eliminar el ${id} o no existe en el archivo`
      })
  }

})

productRouter.put('/:id', async (req, res) => {
    const productoId = req.params.id;
    const productoCambios = req.body;
    const productoActualizado = await updateById(productoId, productoCambios);
    if (!productoActualizado){
        res.send({
            message: `Error, no se pudo actualizar el producto`
        })
    }else {
        res.send({
            message: `success`,
            data: productoActualizado
        })
    }

})

module.exports = productRouter;