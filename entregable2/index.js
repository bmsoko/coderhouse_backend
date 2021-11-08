const Contenedor = require('./Contenedor');

const miCont = new Contenedor('./productos.json');

// const producto = {
//     'title': "Jabon Liquido",
//     'price': 8.9,
//     'thumbnail': 'http://google.com'
// }

// miCont.save(producto)

async function nombre() {
    const element  = await miCont.getById(3)
    console.log('element')
    console.log(element)    
}
nombre()

//miCont.getAll()

// miCont.deleteById(5);

// miCont.deleteAll()