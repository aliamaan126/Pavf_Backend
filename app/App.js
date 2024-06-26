import https from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import routes from '../routes/routes.js';
import logger from '../utils/logger.js';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  routeNotFoundMiddleware,
  defaultErrorHandler,
} from '../middlewares/middleware.js';
import frontend from '../routes/frontend.routes.js';

class App {
  constructor({ port }) {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

    this.PORT = port;
    this.serverInit();
    this.loadPlugins();
    this.loadRoutes();
    this.loadExceptionMiddlewares();
  }
  serverInit() {
    this.app = express();
    this.server = https.createServer(
          this.app
    );
  }
  loadDevPlugins() {}
  loadPlugins() {
    this.app.use(express.json());
    this.app.use(express.static(path.resolve(__dirname,'../public')))
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(mongoSanitize());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(fileUpload({ useTempFiles: true }));
  }
  loadRoutes() {
    this.app.use('/api/v1', routes);
    this.app.use('/*', frontend);
  }
  loadExceptionMiddlewares() {
    this.app.use(routeNotFoundMiddleware);
    this.app.use(defaultErrorHandler);
  }
  startServer() {
    this.server.listen(this.PORT, () => {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(`[Server]: Running On http://localhost:${this.PORT}`);
       }
       else{ 
        logger.info(`[Server]: Running On https://pavf-gelj.onrender.com`);
      }
      logger.info(`[Process Id]: PID ${process.ppid}`);
    });
  }
}

export default App;
