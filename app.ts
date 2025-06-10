const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const serviceRouter = require('./Routs/ServiceRout.js');
const userRouter = require('./Routs/UserRout.js');
const authRouter = require('./Routs/AuthRout.js');
const {authenticateToken , authorizeRoles} = require('./Middlewares/AuthMiddleware.js');
require('dotenv').config();

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGOOSE_URI);
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


app.use('/auth', authRouter); 
app.use('/service',authenticateToken, serviceRouter);
app.use('/user',authenticateToken,authorizeRoles('admin'), userRouter);

app.listen(3000, () => {
    console.log('server is running');
});





