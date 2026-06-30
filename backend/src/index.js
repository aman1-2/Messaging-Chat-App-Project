import express from 'express';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';


const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true}));

app.get('/ping', (req, res) => {
  return res.status(200).json({
    message: 'Testing the Server. A Ping Route.'
  });
});

app.listen(PORT, () => {
  console.log('Started the server at Port:', PORT);
  connectDB();
});