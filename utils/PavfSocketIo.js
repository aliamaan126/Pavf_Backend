import { Server } from 'socket.io';
class PavfSocketIo{ 
    constructor(nodeServer) {
        this.pavfS = new Server(nodeServer)
        this.pavfS.on('connection', (socket) => {
            console.log(socket.id);
        })
    }
}
export default PavfSocketIo;