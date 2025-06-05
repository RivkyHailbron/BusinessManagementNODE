
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const producerSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    phone: String,
    description: String,
});
module.exports= mongoose.model('Producer', producerSchema);


