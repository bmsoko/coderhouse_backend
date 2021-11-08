const express = require('express');
const cartRouter = require('./routers/cart');
const productRouter = require('./routers/product');
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => res.send({message: 'Server up & Running', data: Date.now()}))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => console.log('Running in 8080'));