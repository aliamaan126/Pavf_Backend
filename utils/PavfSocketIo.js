import { Server, Socket } from 'socket.io';
class PavfSocketIo{ 
    devices = [];
    constructor(nodeServer) {
        this.pavfS = new Server(nodeServer, {
            cors: {
                origin:"*"
            }
        })
        this.pavfS.on('connection', (socket) => {
            console.log(socket.id);
            console.log("User Connected");
            this.devices.forEach((device)=>{
                this.pavfS.emit('arduino-status', device);
            })
            socket.on('send-sheld-data', (data) => {
                console.log("Join Room");
                console.log(data);
                
            })
            socket.on('arduino-notification', (data) => {
                this.pavfS.emit('flutterNotification', data); 
            })
            socket.on('controlAction', (data) => {
                console.log("controlAction");
                this.pavfS.emit('controll-action',data);
                console.log(data);
            })
            socket.on('join-room', (data) => {
                const divObj = data
                divObj.socketId = socket.id
                divObj.status = true
                this.devices.push(divObj);
                this.pavfS.emit('arduino-status', divObj);
                this.pavfS.emit('flutterNotification',{
                    title:"Device Online",
                    message:`DEVICE: ${divObj.deviceName} is online`
                  }); 
                console.log(this.devices);
            })
            socket.on('disconnect', () => {
                console.log("disconnect socket");
                console.log(socket.id);
                const found = this.devices.find((device) => device.socketId == socket.id);
                if (found) {
                    found.status=false;
                    this.pavfS.emit('arduino-status', found);
                    this.pavfS.emit('flutterNotification',{
                        title:"Device Offline",
                        message:`DEVICE: ${found.deviceName} is offline`
                      }); 
                    this.devices = this.devices.filter((device)=> device.socketId != socket.id)
                    console.log(found);
                }
            })
        }) 
    }
}
export default PavfSocketIo;