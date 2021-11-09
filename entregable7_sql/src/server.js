const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const express = require('express');

const productRouter = require('./routers/');
const { saveMessage, getMessages } = require('./models/messagess');

const app = express();
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.use(express.static('public'))

const PORT = 8081


io.on('connection', async (socket) => {
  console.log(`Nuevo cliente conectado! ${socket.id}`)
  
  const messages = await getMessages()
  socket.emit('messages', messages)

  socket.on('new-message', async (message) => {
    console.log('new-message', message);
    await saveMessage(message)

    const messages = await getMessages()

    // notificará a todos los sockets conectados
    io.sockets.emit('messages', messages)
  })
})

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.get('/', (req,res) => res.send({ data: Date.now() }))

app.use('/api/productos', productRouter);

httpServer.listen(PORT, () => 
  console.log(`Servidor abierto en http://localhost:${PORT}/`)
);