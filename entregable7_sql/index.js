const Contenedor = require('./Contenedor');

const miCont = new Contenedor('./data/productos.json');

// const producto = {
//     'title': "Jabon Liquido",
//     'price': 8.9,
//     'thumbnail': 'http://google.com'
// }

// miCont.save(producto)


// miCont.getById(4)

// miCont.getAll()

miCont.deleteById(5);

// miCont.deleteAll()