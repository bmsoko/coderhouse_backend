const Contenedor = require('./Contenedor');

const miCont = new Contenedor('./productos.json');

const producto = {
    'title': "Jabon Liquido",
    'price': 8.9,
    'thumbnail': 'http://google.com'
}

miCont.save(producto)

// miCont.save({
//     'title': "Papel Higienico",
//     'price': 100.9,
//     'thumbnail': 'http://google.com'
// })