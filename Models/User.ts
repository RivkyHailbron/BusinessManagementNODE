import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true // מונע כפילויות
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);
export default User;
