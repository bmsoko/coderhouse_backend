const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
  ];
  
  const Container = require('../../Container');
  const { sqliteOptions } = require('./databases');
  
  const messageContenedor = new Container(sqliteOptions,'messages');
  
  const getMessages = async () => {
    return await messageContenedor.getAll();
  };
  
  const saveMessage = async (message) => {
    const idMessage = await messageContenedor.save(message);
    return idMessage;
  }
  
  module.exports = {
    getMessages,
    saveMessage
  };