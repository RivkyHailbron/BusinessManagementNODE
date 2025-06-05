const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRouter = require('./Routs/ServiceRout.js');
const userRouter = require('./Routs/UserRout.js');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/BusinessManagement", );
        console.log('connect to DB');

    }
    catch (error) {
        console.log(error);
    }
};

connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/service', serviceRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('server is running');
});





