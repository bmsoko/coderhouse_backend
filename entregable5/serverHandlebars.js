
const express = require('express');

const Contenedor = require('./Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');

const app = express();

const handlebars = require('express-handlebars');

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
    })
)

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.set("view engine", "hbs");

app.set("views", "./views/layouts");

app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("main", {title: "Ingreso de Producto"})
  })

app.post('/', async (req, res) => {
    const nuevoProducto = req.body;  
    console.log(req.body)
    const idProductoGuardado = await productosContenedor.save(nuevoProducto);

    res.render("main", {id: idProductoGuardado})
  })

app.get("/productos", async (req, res) => {
    const allProducts = await productosContenedor.getAllJSON();
    res.render("productos", {title: "Lista De Products", productos: allProducts, listExists: true})
  })
  

app.listen(8080, () => console.log('Running in 8080'));