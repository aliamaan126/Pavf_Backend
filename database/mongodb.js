import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const mongodbConnect = () => {
  mongoose.connect(
    `mongodb+srv://aliamaan126:f5UkKvxM5rNAWm3N@pavf.xdyjfey.mongodb.net/PAVF_Mobile?retryWrites=true&w=majority`
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
