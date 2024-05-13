import { Server } from 'socket.io';
class PavfSocket{ 
    constructor(nodeServer) {
        this.pavfS = new Server(nodeServer)
        this.pavfS.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);
          
            socket.on('sensorData', (data) => {
              console.log(`Received sensor data from ${socket.id}:`, data);
              // Process the received data here
            });
          });
    }
}
export default PavfSocket;