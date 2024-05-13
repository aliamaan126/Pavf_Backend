import websocket from 'websocket';
import fs from 'fs';
class PavfWebSocketServer{
    constructor(nodeServer) {
        const PWS = websocket.server;
        this.pwss = new PWS({
            httpServer: nodeServer,
            autoAcceptConnections: false
        })
        this.pwss.on('connect',(connection)=>{
            console.log(connection);
            // fs.writeFile("/temp/test",JSON.stringify(connection),(e)=>{
            //     if(error)
            //     {
            //         console.log(e);
            //     }

            //     console.log("filesave");
            // });

            //  fs.writeFileSync("/temp/test",new Buffer(connection));
        });
        this.pwss.on('request', async (request) => {
            console.log(request.origin);
            const connection = await request.accept('pavf-control', request.origin);
            connection.on('message', (data) => {
                if (data.type == 'utf8') {
                    console.log("\nMessage : "+data.utf8Data);
                 }
                else if (data.type == 'binary') {
                    console.log("\nBinary Message : "+data.binaryData);
                }
            })
        }
        )
    }
}

export default PavfWebSocketServer;