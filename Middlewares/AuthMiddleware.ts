import { NextFunction } from "express";

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY ;

// אימות – מוודא שיש טוקן תקין
function authenticateToken(req:Request, res :Response, next :NextFunction) {
  const authHeader : any  = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // מכניס את המשתמש המבוזר לתוך הבקשה
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token is not valid or expired' });
  }
}

// הרשאה – בודק אם המשתמש הוא מסוג מסוים (למשל admin)
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
