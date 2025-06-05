
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: String,
    description: String,
    producerEmail: {
        type: String,
        required: true
    }

});
module.exports= mongoose.model('Service', serviceSchema);



