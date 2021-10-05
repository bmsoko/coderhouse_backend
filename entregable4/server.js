const express = require('express');

const productosRouter = require('./routers/productos');

const server = express();

const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/static', express.static('public'));

server.get('/', (req, res) => {
    res.send({ message: new Date().toLocaleString() });
})

server.use('/api/productos', productosRouter);

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocurrio un error al manejar la peticion!');
});


server.listen(PORT, () => console.log(`Servidor corriendo en: ${PORT}`));


server.on('error', (error) => console.log('Error: ', error));