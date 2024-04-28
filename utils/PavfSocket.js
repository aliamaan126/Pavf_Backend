import { Server } from 'socket.io';
class PavfSocket{ 
    constructor(nodeServer) {
        this.pavfS = new Server(nodeServer)
        this.pavfS.on('connection', (socket) => {
            console.log(socket.id);
        })
    }
}
export default PavfSocket;