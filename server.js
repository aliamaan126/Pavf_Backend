import App from './app/App.js';
import PavfSocket from './utils/PavfSocket.js'
import mongodbConnect from './database/mongodb.js';

const myServer = new App({ port: process.env.PORT || 3000 });
const pavfSocketServer = new PavfSocket(myServer.server)
pavfSocketServer.socket.on('connection', (socket) => {
    console.log("A user Connected");
    console.log(socket.id);
})
mongodbConnect();
myServer.startServer();
