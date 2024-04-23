import { Server } from 'socket.io';
class PavfSocket{ 
    constructor(nodeServer) {
        this.socket = new Server(nodeServer)
    }
}
export default PavfSocket;