import { Request, Response, NextFunction } from 'express';

export const error = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const statusCode = err.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Something went wrong',
    });
};


