import  express from 'express';
import apiRouter from './router/apiRouter.js';
import mongoose  from 'mongoose';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter);

// test the server
app.get('/test', (req, res) => {
  console.log('GET request received (test successful)'  );
  res.send('get request received (test successful)');
});


const PORT = 5000;
app.listen(PORT, ()=>{console.log(`SERVER IS RUNNING ON PORT ${PORT}`)});