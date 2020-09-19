import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes';

dotenv.config;

const port = 5000;
const app = express ();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.use("/api/users", userRoute)

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({msg: "Product Not Found."})
    }
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`) 
});