import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/User';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const signUp = async(name: string, email: string, password: string)=> {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  return await newUser.save();
}

const signIn = async (email: string, password: string) => {
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

export default {
  signUp,
  signIn,
};

