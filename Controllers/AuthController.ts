import { Request, Response } from 'express';
import {signIn, signUp} from '../Services/AuthService';

export async function postSignUp(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;
  try {
    const user = await signUp(name, email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function postSignIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const { user, token } = await signIn(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
