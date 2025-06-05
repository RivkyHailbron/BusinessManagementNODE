const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRouter = require('./Routs/eventRout.js');
const producerRouter = require('./Routs/producerRout.js');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/EventProduction");
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

app.use('/event', eventRouter);
app.use('/producer', producerRouter);

app.listen(3000, () => {
    console.log('server is running');
});





