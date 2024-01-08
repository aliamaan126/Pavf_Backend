import { createServer } from 'http';
import express from 'express';
import mainRouter from '../routes/mainRouter.js';
import authRouter from '../routes/authRouter.js';
import cors from 'cors';
import { corsOptions } from '../config/settings.js';
// import { config } from 'dotenv';

export default class App {
  constructor() {
    this.initServer();
    this.loadPlugins();
    this.loadRoutes();
    this.startServer();
  }
  initServer() {
    this.app = express();
    this.server = createServer(this.app);
    this.PORT = process.env.PORT || 8000;
  }
  loadPlugins() {
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
  }
  loadRoutes() {
    this.app.use('/api', mainRouter);
    this.app.use('/api/auth', authRouter);
  }
  startServer() {
    this.server.listen(this.PORT, () => {
      console.info(`[Server]: Running On https://pavf-gelj.onrender.com`);
    });
  }
  startServerDev() {
    this.server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.error('Address in use, retrying...');
        setTimeout(() => {
          this.PORT = this.PORT + 1;
          this.server.close();
          this.server.listen(this.PORT, () => {
            console.info(`[Server]: Running On https://pavf-gelj.onrender.com`);
          });
        }, 1000);
      }
    });
    this.server.listen(this.PORT, () => {
      console.info(`[Server]: Running On https://pavf-gelj.onrender.com`);
    });
  }
}
