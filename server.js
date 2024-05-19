import App from './app/App.js';
import mongodbConnect from './database/mongodb.js';
import PavfSocketIo from './utils/PavfSocketIo.js';
import PavfWebSocketServer from './utils/PavfWebSocketServer.js';

const myServer = new App({ port: process.env.PORT || 3000 });
// export const pavfSoc = new PavfWebSocketServer(myServer.server);

 const pavfSoc = new PavfSocketIo(myServer.server);

// const dataTemp = {
//     action: 'shelf_light',
//     value:1
// }
// setInterval(() => {
//     pwsss.pwss.broadcast(JSON.stringify(dataTemp));
//  }, 5000);
mongodbConnect();
myServer.startServer();
