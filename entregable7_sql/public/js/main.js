
const socket = io.connect();


const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementsByName('title')[1].value;
  const price = document.getElementsByName('price')[1].value;
  const thumbnail = document.getElementsByName('thumbnail')[1].value;
  
  socket.emit('new-product', {title, price, thumbnail});
});

socket.on('products', (products) => {
  console.log(products);
  
  const productList = products.map((product) => `
    <li>Title: ${product.articulo} - Precio: ${product.price}</li>
  `).join(' ');

  const list = document.getElementById('real-time-products');

  list.innerHTML = `<ul>${productList}</ul>`;
})

function render(data) {
    const html = data.map((elem, index) =>{
        return (`<div>
        <strong>$(elem.author)</strong>:
        <em>$(elem.text)</em></div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) {render(data);});

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}