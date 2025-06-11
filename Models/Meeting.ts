
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const meetingSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    serviceID:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }

});
const Meeting = mongoose.model('Meeting', meetingSchema);
export default Meeting;


