import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/UserRoute.js';
import adminRouter from './routes/AdminRoute.js';
import movieRouter from './routes/movieRoute.js';
import bookingsRouter from './routes/bookingRoutes.js';
import cors from 'cors'
const app = express();


const corsOptions = {
  origin: '*', // Replace with the origin you want to allow
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
//middleware
app.use(cors(corsOptions));  
app.use(express.json());
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/movie',movieRouter);
app.use('/booking',bookingsRouter)

mongoose.connect('mongodb://127.0.0.1:27017/BookMyShow')
.then(()=>{
  app.listen(5000,()=>{
    console.log('Server is running on port 5000 and Db is also connected');
  })
})
.catch((e)=>console.log(e));


