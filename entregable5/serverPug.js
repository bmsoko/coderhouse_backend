
const express = require('express');

var bodyParser = require('body-parser');

const Contenedor = require('./Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');

const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set("views",  __dirname + "./views");

app.set("view engine", "pug");



app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("crearproducto.pug", {mensaje: "Ingreso de Producto", title: "Creacion de Productos"})
  })

app.post('/', async (req, res) => {
    const nuevoProducto = req.body;  
    console.log(req.body)
    const idProductoGuardado = await productosContenedor.save(nuevoProducto);

    res.render("crearproducto.pug", {id: idProductoGuardado})
  })

app.get("/productos", async (req, res) => {
    const allProducts = await productosContenedor.getAllJSON();
    res.render("productos.pug", {title: "Lista De Productos", productos: allProducts, listExists: true})
  })
  

app.listen(8080, () => console.log('Running in 8080'));