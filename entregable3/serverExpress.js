const express = require('express');
const server = express();
const Contenedor = require('./Contenedor');
const miCont = new Contenedor('./productos.json');

const PORT = 3000;

const randomNumber = (min, max) => Math.round(Math.random() * (max - min + 1)) + min;

server.get('/', (request, response, next) => {
    response.send(`<h1>Hola Mundo ${PORT}</h1>`);
});

server.listen(PORT, () => {
    console.log(`El server express esta corriendo en el puerto ${PORT}`);
})

server.get('/productos', async (request, response, next) => {
    const productos = await miCont.getAllJSON();
    response.send(productos);
});

server.get('/productosRandom', async (request, response, next) => {
    const productos = await miCont.getAllJSON();
    const id = randomNumber(1, productos.length)

    const productoRandom = await miCont.getById(id);
    response.send(productoRandom);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

