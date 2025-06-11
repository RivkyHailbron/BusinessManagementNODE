import { Request, Response } from 'express';
import authService from '../Services/AuthService';

export const postSignUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.signUp(name, email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err: any) {
    throw { statusCode: 400, message: err.message };
  }
}

export const postSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.signIn(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err: any) {
    throw { statusCode: 401, message: err.message };
  }
}
