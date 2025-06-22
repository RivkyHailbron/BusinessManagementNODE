import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/User';

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);


const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
  if (!isMatch) throw { message: 'Invalid credentials' };

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    SECRET_KEY,
    //תוקף לשבוע
    { expiresIn: '7d' }
  );

  return { user, token };
}

// Google Sign-In
const googleSignIn = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { email, name } = payload!;

  if (!email) throw new Error('Email not found from Google');

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ name, email, password: 'google-auth', role: 'user' });
    await user.save();
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  return { user, token };
};

export default {
  signUp,
  signIn,
  googleSignIn,
};

