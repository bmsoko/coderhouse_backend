
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Contenedor = require('./Contenedor');


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;
const productosContenedor = new Contenedor('./data/productos.json');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set("views", __dirname + "/views");

app.set("view engine", "ejs");

io.on('connection', async socket => {
  console.log(`Nuevo cliente conectado! socketid: ${socket.id}`);

  socket.on('new-product',async product => {
    await productosContenedor.save(product);
    const products = await productosContenedor.getAll();

    io.sockets.emit('products', products);
  });
});


app.use(express.static('public') );


app.get("/", (req, res) => {
    res.render("../views/pages/index", {mensaje: "Ingreso de Producto", title: "Creacion de Productos"})
  })

app.post('/creacion_productos', async (req, res) => {
    const nuevoProducto = req.body;  
    console.log(req.body)
    const idProductoGuardado = await productosContenedor.save(nuevoProducto);

    res.render("../views/pages/index", {id: idProductoGuardado})
  })

app.get("/productos", async (req, res) => {
    const allProducts = await productosContenedor.getAllJSON();
    res.render("../views/pages/listado_productos", {title: "Lista De Productos", data: allProducts})
  })



app.get('/creacion_productos', async (req, res) => {
    res.render('../views/pages/creacion_productos');
  })
  
app.use((req, res, next) => {
  res.status(404).render('./pages/404')
})  

// socket.on('messages', data => {
//   console.log(data)
// })

app.listen(PORT, () => console.log('Running in 8080'));