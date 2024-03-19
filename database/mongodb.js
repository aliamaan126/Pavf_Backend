import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import dbConfig from '../config/db.config.js';

// const server = dbConfig.local.mongo.uri;
const server = dbConfig.server.mongo.uri;
const mongodbConnect = () => {
  mongoose.connect(
    server
  );
};

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDb Connection error: ${err}`);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  logger.info('MongoDb Connected Successfully');
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose connection is disconnected due to application termination'
    );
  });
});

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}
export default mongodbConnect;
