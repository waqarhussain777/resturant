import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './api/authRoutes.js';
import dishRoutes from './api/dishRoutes.js';
import {PORT,MONGO_URL} from './config.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/dishes', dishRoutes);
app.use('/', authRoutes);
// Database connection
mongoose.connect(MONGO_URL, {
    tls: true
})     
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    });})
.catch((error) => console.log(error.message)
    );
