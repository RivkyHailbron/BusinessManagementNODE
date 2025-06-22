
import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const serviceSchema = new Schema({
    id: {
        type: String
    },
    name: String,
    description: String,
    producerEmail: {
        type: String,
        required: true
    }

});
const Service = mongoose.model('Service', serviceSchema);
export default Service;


