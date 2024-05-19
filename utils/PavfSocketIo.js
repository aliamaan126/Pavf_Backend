import { Server, Socket } from 'socket.io';
class PavfSocketIo{ 
    constructor(nodeServer) {
        this.pavfS = new Server(nodeServer,{
            cors : {
                origin:"*"
            }
        })
        this.pavfS.on('connection', (socket) => {
            console.log(socket.id);
            console.log("user connected");
            socket.on('disconnect',()=>{
                console.log("user disconnected");
            })

            socket.on('send-sheld-data', (data) => {
                console.log("Join Room");
                console.log(data);
            })

        })
    }
}
export default PavfSocketIo;