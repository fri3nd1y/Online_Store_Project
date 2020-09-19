import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes';
import productRoute from './routes/productRoutes';

dotenv.config;

const port = 5000;
const app = express ();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.use(bodyParser.json)

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`) 
});