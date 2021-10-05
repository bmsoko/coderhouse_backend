
const express = require('express');

const Contenedor = require('../Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');

const productosRouter = express.Router();

productosRouter.get('/', async (req, res) => {
  const lista = await productosContenedor.getAllJSON();
  res.send({
    message: 'success',
    data: lista
  });
})

productosRouter.get('/:id', async (req, res) => {
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

productosRouter.post('/', async (req, res) => {
  const nuevoProducto = req.body;

  const idProductoGuardado = await productosContenedor.save(nuevoProducto);

  res.send({
    message: 'success',
    data: {
      ...nuevoProducto,
      id: idProductoGuardado
    }

  });
})

productosRouter.delete('/:id', async (req, res) => {
  const idProductoBorrado = await productosContenedor.deleteById(req.params.id);

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

productosRouter.put('/:id', async (req, res) => {
    const productoId = req.params.id;
    const productoCambios = req.body;
    const productoActualizado = await productosContenedor.updateById(productoId, productoCambios);
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

module.exports = productosRouter;