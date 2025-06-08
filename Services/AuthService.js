const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

async function signUp(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    return await newUser.save();
}

async function signIn(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    return { user, token };
}

module.exports = { signUp, signIn };
