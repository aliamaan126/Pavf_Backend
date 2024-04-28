import App from './app/App.js';
import PavfSocket from './utils/PavfSocket.js'
import mongodbConnect from './database/mongodb.js';

const myServer = new App({ port: process.env.PORT || 3000 });
const pavfSocketServer = new PavfSocket(myServer.server)

mongodbConnect();
myServer.startServer();
