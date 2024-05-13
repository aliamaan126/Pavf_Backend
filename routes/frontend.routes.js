import express from 'express';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const frontend = new express.Router();
// Add routes
frontend.get('/', async (req, res, next) => {
  return res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

export default frontend;