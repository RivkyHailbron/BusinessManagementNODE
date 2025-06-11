
import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const businessSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: String,
    description: String,
    managerEmail: {
        type: String,
        required: true
    }

});
const Business = mongoose.model('Business', businessSchema);
export default Business;


