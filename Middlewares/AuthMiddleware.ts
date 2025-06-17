import { log } from "console";
import { NextFunction } from "express";
import dotenv from 'dotenv';

const jwt = require('jsonwebtoken');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;

// אימות – מוודא שיש טוקן תקין

export const authenticateToken = (req: any, res: any, next: NextFunction) => {
  const authHeader: any = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  console.log('Auth header:', authHeader);
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Decoded token:', decoded);
  
    req.user = decoded; // מכניס את המשתמש המבוזר לתוך הבקשה
    next();
  } catch (err: any) {
    console.error('JWT Error:', err.name, err.message);

    res.status(403).json({ error: 'Token is not valid or expired' });
  }
}

// הרשאה – בודק אם המשתמש הוא מסוג מסוים (למשל admin)
export const authorizeRoles = (...allowedRoles: any) => {
  return (req: any, res: any, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}
// ווידוי המשתמש
export const isAuthorizeUser = (req: any, res: any, next: NextFunction) => {
  const targerEmail = req.params.email;
  const currentUser = req.user
  if (currentUser.role === 'admin' || currentUser.email !== targerEmail) {
    
    return next();
  }
  return res.status(403).json({ error: 'Access Denied: You can only act on your own account. ' });
}



