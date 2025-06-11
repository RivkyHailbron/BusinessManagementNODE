
import { Request, Response, NextFunction } from 'express';
import businessService from '../Services/BusinessService';

export const getBusiness = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const business = await businessService.getBusiness();
        if (!business) {
            next({ statusCode: 404, message: 'Service not found' });
        }
        res.status(200).json(business);
    } catch (error: any) {
        next({ statusCode: 500, message: 'Error fetching businesses: ' + error.message });
    }
}

export const putBusiness = async (req: Request, res: Response,next: NextFunction) => {
    try {
        await businessService.updateBusiness(req.params.id, req.body);
        res.send('business updated');
    } catch {
        next({ statusCode: 400, message: 'Error updating service' });
    }
};



